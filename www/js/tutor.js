// Hana's brain for calls.
// Offline: understands simple requests and teaches from the app's own lessons (key terms, words, events,
// signs, openings), then quizzes you and checks your spoken answers.
// Online (optional): if you add your own Anthropic API key, free conversation goes to Claude.
import { COURSES, GAMBITS, movesText } from './courses.js';
import { S, streakAlive } from './store.js';
import { dueCount } from './srs.js';

const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pickOne = (a) => a[Math.floor(Math.random() * a.length)];
const norm = (x) => String(x).toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/['’]/g, '').replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim();
const lessonsOf = (c) => c.units.flatMap((u, ui) => u.lessons.map((l) => ({ ...l, unit: u, ui })));

/* ---------- knowledge index ---------- */
let INDEX = null;
function index() {
  if (INDEX) return INDEX;
  const facts = [];
  for (const c of Object.values(COURSES)) {
    for (const l of lessonsOf(c)) {
      l.terms?.forEach(([t, d]) => facts.push({ key: norm(t), title: t, text: `${t} means ${d.charAt(0).toLowerCase()}${d.slice(1)}.`, c, l }));
      l.items?.forEach((it) => facts.push({ key: norm(it.event), title: it.event, text: `The ${it.event}, ${it.year}. ${it.detail}`, c, l }));
      l.signs?.forEach((it) => facts.push({ key: norm(`${it.word} sign`), title: `${it.word} in BSL`, text: `To sign ${it.word} in British Sign Language: ${it.desc}`, c, l }));
    }
  }
  Object.values(GAMBITS).forEach((g) => facts.push({ key: norm(g.name), title: g.name, text: `The ${g.name} starts ${movesText(g.moves).replace(/\./g, '. ')}. ${g.idea}`, c: COURSES.chess }));
  const ALIAS = { bio: 'gcse:biology', biology: 'gcse:biology', chem: 'gcse:chemistry', chemistry: 'gcse:chemistry', physics: 'gcse:physics', maths: 'gcse:maths', math: 'gcse:maths',
    english: 'gcse:english-lang', 'english language': 'gcse:english-lang', 'english literature': 'gcse:english-lit', literature: 'gcse:english-lit', 'english lit': 'gcse:english-lit',
    history: 'history', 'cold war': 'history', geography: 'gcse:geography', 'computer science': 'gcse:compsci', computing: 'gcse:compsci', science: 'gcse:combined-science',
    'sign language': 'bsl', bsl: 'bsl', chess: 'chess', pe: 'gcse:pe', 're': 'gcse:rs', 'religious studies': 'gcse:rs' };
  const courses = Object.values(COURSES).map((c) => ({ key: norm(c.name), c }));
  INDEX = { facts, ALIAS, courses };
  return INDEX;
}

function findCourse(text) {
  const t = norm(text); const { ALIAS, courses } = index();
  for (const [k, id] of Object.entries(ALIAS)) if (new RegExp(`\\b${k}\\b`).test(t) && COURSES[id]) return COURSES[id];
  return courses.filter((x) => t.includes(x.key)).sort((a, b) => b.key.length - a.key.length)[0]?.c || null;
}
function findFact(text) {
  const t = norm(text); if (t.length < 3) return null;
  const { facts } = index();
  const exact = facts.filter((f) => t.includes(f.key) && f.key.length > 2).sort((a, b) => b.key.length - a.key.length)[0];
  if (exact) return exact;
  const words = t.split(' ').filter((w) => w.length > 3);
  let best = null; let score = 0;
  for (const f of facts) { const s = words.filter((w) => f.key.includes(w)).length / Math.max(1, f.key.split(' ').length); if (s > score) { score = s; best = f; } }
  return score >= 0.5 ? best : null;
}
function findWord(text) {
  // "how do you say cat in french"
  const m = norm(text).match(/(?:how (?:do|would) (?:you|i) say|what(?:'s| is)|translate|say) (.+?) in ([a-z ]+)$/);
  if (!m) return null;
  const [, phrase, langName] = m;
  const c = Object.values(COURSES).find((x) => x.cat === 'language' && x.words && norm(x.name).startsWith(langName.trim().split(' ')[0]));
  if (!c) return { missing: langName };
  const w = c.words.find((x) => norm(x.en) === phrase.replace(/^(a|an|the) /, '').trim());
  return w ? { c, w } : { c, unknown: phrase };
}

// Find a lesson whose questions, terms or title mention a word from the request (e.g. "photosynthesis").
function findLessonByWord(text) {
  const stop = new Set(['teach', 'learn', 'about', 'what', 'does', 'mean', 'tell', 'explain', 'lesson', 'please', 'study', 'there', 'their', 'which']);
  const words = norm(text).split(' ').filter((w) => w.length > 4 && !stop.has(w));
  if (!words.length) return null;
  for (const c of Object.values(COURSES)) for (const l of lessonsOf(c)) {
    const hay = norm([l.title, ...(l.qs || []).flatMap((q) => [q[0], q[1], q[3] || '']), ...(l.terms || []).flat()].join(' '));
    if (words.some((w) => hay.includes(w))) return { c, l };
  }
  return null;
}

/* ---------- the tutor ---------- */
export function createTutor({ say, action }) {
  // say(text, { who: 'hana'|'bit', mood, lang, speakText }) → Promise (resolves after speaking)
  let mode = 'chat'; let session = null; let last = ''; const history = [];

  const hana = async (text, opts = {}) => { last = text; history.push({ role: 'assistant', content: text }); await say(text, { who: 'hana', ...opts }); };
  const bit = (text, opts = {}) => say(text, { who: 'bit', ...opts });

  async function greet() {
    const name = S.name ? `, ${S.name}` : '';
    const due = dueCount();
    await hana(`Hi${name}! It's Hana. ${due ? `You've got ${due} fact${due === 1 ? '' : 's'} to revise today. ` : ''}What would you like to do? I can teach you a topic, quiz you, or just chat.`, { mood: 'happy' });
  }

  // Build a teaching session from a lesson.
  function plan(c, l) {
    const items = []; const qs = [];
    if (l.terms) {
      l.terms.forEach(([t, d]) => items.push({ text: `${t}. ${d}.` }));
      shuffle(l.qs || []).slice(0, 4).forEach(([q, a, wrong, ex]) => { const o = shuffle([a, ...wrong]); qs.push({ q, options: o, answer: o.indexOf(a), explain: ex }); });
    } else if (l.words) {
      l.words.forEach((w) => items.push({ text: `${w.en}.`, native: w.t, lang: c.tts, rom: w.rom }));
      shuffle(l.words).slice(0, 4).forEach((w) => { const o = shuffle([w.en, ...shuffle(c.words.filter((x) => x.en !== w.en && x.t !== w.t)).slice(0, 2).map((x) => x.en)]); qs.push({ q: 'What does this mean?', native: w.t, lang: c.tts, options: o, answer: o.indexOf(w.en) }); });
    } else if (l.items) {
      l.items.forEach((it) => items.push({ text: `${it.year}: the ${it.event}. ${it.detail}` }));
      (l.whys || []).forEach((wq) => { const o = shuffle([wq.a, ...wq.wrong]); qs.push({ q: wq.q, options: o, answer: o.indexOf(wq.a) }); });
    } else if (l.signs) {
      l.signs.forEach((it) => items.push({ text: `${it.word}. ${it.desc}` }));
      shuffle(l.signs).slice(0, 3).forEach((it) => { const o = shuffle([it.word, ...shuffle(l.signs.filter((x) => x.word !== it.word)).slice(0, 2).map((x) => x.word)]); qs.push({ q: `Which sign is this? ${it.desc}`, options: o, answer: o.indexOf(it.word) }); });
    } else if (l.kind === 'play') {
      const g = GAMBITS[l.play.key];
      items.push({ text: `The ${g.name}. It starts ${movesText(g.moves).replace(/\./g, '. ')}. ${g.idea}` });
    }
    return { c, l, items, qs, step: 0, qi: 0, right: 0, phase: 'teach' };
  }

  async function startTeaching(c, l) {
    session = plan(c, l); mode = 'teach';
    await hana(`Let's learn ${c.name}: ${l.title}. I'll explain ${session.items.length} thing${session.items.length === 1 ? '' : 's'}, then quiz you. Say "next" when you're ready for each one.`, { mood: 'cheer' });
    await teachStep();
  }

  async function teachStep() {
    const s = session; const it = s.items[s.step];
    if (!it) return startQuiz();
    if (it.native) {
      await hana(`${s.step === 0 ? 'First' : 'Next'}: ${it.text} In ${s.c.name}, that's:`, { mood: 'happy' });
      await say(it.native, { who: 'hana', lang: it.lang, speakOnly: true, caption: `${it.native}${it.rom ? ` (${it.rom})` : ''}` });
    } else {
      await hana(`${s.step === 0 ? 'First' : s.step === s.items.length - 1 ? 'Last one' : 'Next'}: ${it.text}`, { mood: 'happy' });
    }
    s.step++;
    if (s.step % 3 === 0 && s.step < s.items.length) bit('Beep! Memory saved. Say next for more.');
  }

  async function startQuiz() {
    const s = session;
    if (!s.qs.length) { await hana(s.l.kind === 'play' ? 'Now try it on the board! Say "play chess" and I\'ll set it up.' : 'That\'s everything in this lesson. Want another?', { mood: 'cheer' }); mode = 'chat'; session = null; return; }
    s.phase = 'quiz';
    await hana(`Quiz time! ${s.qs.length} question${s.qs.length === 1 ? '' : 's'}. You can say the answer or the letter.`, { mood: 'think' });
    await askQ();
  }

  async function askQ() {
    const s = session; const q = s.qs[s.qi];
    const opts = q.options.map((o, i) => `${'ABCD'[i]}: ${o}`).join('. ');
    if (q.native) {
      await hana(`Question ${s.qi + 1}. What does this mean?`, { mood: 'think' });
      await say(q.native, { who: 'hana', lang: q.lang, speakOnly: true, caption: q.native });
      await hana(`Is it ${opts}?`, { mood: 'think' });
    } else await hana(`Question ${s.qi + 1}. ${q.q} ${opts}.`, { mood: 'think' });
  }

  function matchAnswer(text, q) {
    const t = norm(text);
    const letter = t.match(/^(?:its |it is |the answer is |answer |i think )?(?:option )?([abcd])\b/) || t.match(/\b(?:letter|option) ([abcd])\b/);
    if (letter) return 'abcd'.indexOf(letter[1]);
    const ord = { first: 0, second: 1, third: 2, fourth: 3, one: 0, two: 1, three: 2, four: 3 };
    for (const [k, v] of Object.entries(ord)) if (new RegExp(`\\b(the )?${k}( one)?$`).test(t) && v < q.options.length) return v;
    let best = -1; let score = 0;
    q.options.forEach((o, i) => {
      const on = norm(o); if (!on) return;
      if (t === on || t.includes(on)) { if (on.length > score) { score = on.length; best = i; } return; }
      const words = on.split(' ').filter((w) => w.length > 2); const hit = words.filter((w) => t.includes(w)).length;
      const sc = words.length ? hit / words.length : 0; if (sc >= 0.6 && sc * 10 > score) { score = sc * 10; best = i; }
    });
    return best;
  }

  async function answer(text) {
    const s = session; const q = s.qs[s.qi];
    const k = matchAnswer(text, q);
    if (k < 0) { await hana(`Hmm, I didn't catch which one. Say A, B, C${q.options.length > 3 ? ' or D' : ''}.`, { mood: 'think' }); return; }
    const ok = k === q.answer;
    if (ok) { s.right++; await hana(`${pickOne(['Yes!', 'Correct!', 'Spot on!', 'You got it!'])} ${q.explain || ''}`, { mood: 'cheer' }); if (Math.random() < 0.4) await bit('Boop! Point scored!'); }
    else await hana(`Not quite. It's ${'ABCD'[q.answer]}: ${q.options[q.answer]}. ${q.explain || ''}`, { mood: 'sad' });
    s.qi++;
    if (s.qi < s.qs.length) return askQ();
    const stars = s.right === s.qs.length ? 3 : s.right >= s.qs.length - 1 ? 2 : 1;
    action('lessonDone', { c: s.c, l: s.l, stars, right: s.right, total: s.qs.length });
    await hana(`Lesson done! You got ${s.right} out of ${s.qs.length}. ${stars === 3 ? 'Perfect score!' : 'Nice work.'} I've added it to your progress and Smart revise. Want to keep going?`, { mood: 'cheer' });
    mode = 'chat'; session = { c: s.c, l: s.l, finished: true };
  }

  async function quizMe(text) {
    const c = findCourse(text) || (S.course && COURSES[S.course]);
    if (!c || c.id === 'chess') return hana('Which subject should I quiz you on? Say something like "quiz me on biology".', { mood: 'think' });
    const done = lessonsOf(c).filter((l) => S.done[l.id] && l.kind !== 'play');
    const l = (done.length ? pickOne(done) : lessonsOf(c).find((x) => !S.done[x.id] && x.kind !== 'play')) || lessonsOf(c)[0];
    session = plan(c, l); mode = 'teach';
    if (!session.qs.length) return startTeaching(c, l);
    await hana(`Okay, a quick ${c.name} quiz on ${l.title}!`, { mood: 'cheer' });
    session.phase = 'quiz'; return askQ();
  }

  async function teach(text) {
    const fact = findFact(text);
    const c = findCourse(text);
    if (c) {
      const ls = lessonsOf(c);
      const l = ls.find((x) => norm(text).includes(norm(x.title))) || ls.find((x) => !S.done[x.id]) || ls[0];
      return startTeaching(c, l);
    }
    if (fact) { await hana(fact.text, { mood: 'happy' }); session = fact.l ? { c: fact.c, l: fact.l, offer: true } : null; return hana(fact.l ? `Want me to teach the whole lesson on ${fact.l.title}?` : 'Want to hear another?', { mood: 'happy' }); }
    const hit = findLessonByWord(text);
    if (hit) { await hana(`That's covered in ${hit.c.name}. Let me teach you that lesson.`, { mood: 'happy' }); return startTeaching(hit.c, hit.l); }
    return hana('What would you like to learn? Try "teach me biology", "teach me French", or "teach me the Cold War".', { mood: 'think' });
  }

  async function stats() {
    const lessons = Object.keys(S.done).length; const st = streakAlive() ? S.streak : 0;
    await hana(`You've finished ${lessons} lesson${lessons === 1 ? '' : 's'}, you're on a ${st}-day streak, and you have ${S.xp} XP. ${st >= 3 ? 'Brilliant consistency!' : 'Let\'s grow that streak!'}`, { mood: 'cheer' });
  }

  async function local(text) {
    const t = norm(text);
    if (!t) return hana('I didn\'t hear anything. Try again?', { mood: 'think' });
    if (/\b(bye|goodbye|good bye|end (the )?call|hang up|see you|got to go|gotta go)\b/.test(t)) { await hana(pickOne(['Bye! Great studying with you.', 'See you soon! Keep that streak going.', 'Bye for now!']), { mood: 'happy' }); return action('end'); }
    if (/\b(repeat|say that again|pardon|come again)\b/.test(t) && last) return hana(last);
    if (mode === 'teach' && session?.phase === 'quiz') {
      if (/\b(stop|quit|cancel|enough)\b/.test(t)) { mode = 'chat'; session = null; return hana('No problem, we can stop there.', { mood: 'happy' }); }
      const interrupt = /\b(how do you say|teach me|what is|what does|quiz me|tell me|play chess|joke)\b/.test(t);
      if (!(interrupt && matchAnswer(text, session.qs[session.qi]) < 0)) return answer(text);
      mode = 'chat'; session = null;
    }
    if (mode === 'teach' && session?.phase === 'teach') {
      if (/\b(stop|quit|cancel|enough|no)\b/.test(t)) { mode = 'chat'; session = null; return hana('Okay, we\'ll pause the lesson. What next?', { mood: 'happy' }); }
      if (/\b(quiz|test me|skip)\b/.test(t) && !/quiz me on/.test(t)) return startQuiz();
      if (!/\b(how do you say|teach me|what is|what does|quiz me on|tell me|play chess|joke|my streak)\b/.test(t)) return teachStep();
      mode = 'chat'; session = null;
    }
    if (session?.offer && /\b(yes|yeah|yep|sure|ok|okay|please|go on|go ahead)\b/.test(t)) { const s = session; session = null; return startTeaching(s.c, s.l); }
    if (session?.finished && /\b(yes|yeah|yep|sure|ok|okay|keep going|next|another)\b/.test(t)) { const ls = lessonsOf(session.c); const nx = ls[ls.findIndex((x) => x.id === session.l.id) + 1]; const c = session.c; session = null; return nx ? startTeaching(c, nx) : hana(`You've finished every ${c.name} lesson! Want to try another subject?`, { mood: 'cheer' }); }
    if (/^(hi|hello|hey|hiya|yo|good (morning|afternoon|evening))\b/.test(t)) return hana(pickOne(['Hey! Lovely to hear from you.', 'Hi there! What shall we learn today?', 'Hello! Bit says hi too.']), { mood: 'happy' });
    if (/how are you|how's it going|how are things/.test(t)) return hana('I\'m great, thanks! Bit\'s been charging all day. How about you?', { mood: 'happy' });
    if (/\b(i'?m|i am) (good|great|fine|ok|okay|alright|tired|sad|stressed|nervous|worried)\b/.test(t)) return hana(/tired|sad|stressed|nervous|worried/.test(t) ? 'That\'s okay. Let\'s do something small together. Even five minutes counts. Want a quick quiz?' : 'Love that! Shall we learn something?', { mood: /tired|sad|stressed|nervous|worried/.test(t) ? 'think' : 'cheer' });
    if (/who is bit|what is bit|about bit/.test(t)) { await bit('Beep! I am Bit, Hana\'s robot assistant. I store memories and love quizzes!'); return; }
    if (/who are you|what('?s| is) your name|tell me about you/.test(t)) return hana('I\'m Hana, your study buddy! I tinker with gadgets, play chess, and help you learn. This is Bit, my little robot.', { mood: 'happy' });
    if (/\b(joke|funny)\b/.test(t)) return hana(pickOne(['Why did the student eat their homework? The teacher said it was a piece of cake!', 'Why was the maths book sad? It had too many problems.', 'What do you call a sleeping dinosaur? A dino-snore!', 'Why do chess players love parks? Because of all the checks... and the castles!']), { mood: 'cheer' });
    if (/\b(thank|thanks|cheers)\b/.test(t)) return hana('Any time! That\'s what I\'m here for.', { mood: 'happy' });
    if (/\b(help|what can you do|what do you do)\b/.test(t)) return hana('I can teach you any topic in the app, quiz you, translate words, explain key terms, and tell you how you\'re doing. Try "teach me photosynthesis" or "how do you say cat in Spanish".', { mood: 'happy' });
    if (/\b(streak|xp|progress|how am i doing|my stats)\b/.test(t)) return stats();
    if (/\b(play chess|open chess|chess game)\b/.test(t)) { await hana('Let\'s play! Setting up the board.', { mood: 'cheer' }); return action('chess'); }
    if (/\b(revise|revision|smart revise)\b/.test(t) && !/teach/.test(t)) { await hana('Opening Smart revise for you!', { mood: 'cheer' }); return action('revise'); }
    const wq = findWord(text);
    if (wq) {
      if (wq.missing) return hana(`I don't have ${wq.missing} yet, sorry!`, { mood: 'sad' });
      if (wq.unknown) return hana(`I only know beginner words in ${wq.c.name} so far, and "${wq.unknown}" isn't one of them yet.`, { mood: 'think' });
      await hana(`In ${wq.c.name}, ${wq.w.en} is:`, { mood: 'happy' });
      return say(wq.w.t, { who: 'hana', lang: wq.c.tts, speakOnly: true, caption: `${wq.w.t}${wq.w.rom ? ` (${wq.w.rom})` : ''}` });
    }
    if (/\b(quiz|test) me\b/.test(t)) return quizMe(text);
    if (/\b(teach|learn|lesson|study|explain|tell me about|what is|what's|what are|what does|define|meaning)\b/.test(t)) return teach(text);
    const fact = findFact(text); if (fact) return teach(text);
    return null; // not understood
  }

  async function aiReply(text) {
    const { askHanaAI } = await import('./hana-ai.js');
    const reply = await askHanaAI(history.slice(-16), context());
    await hana(reply, { mood: 'happy' });
  }
  function context() {
    const started = Object.values(COURSES).filter((c) => lessonsOf(c).some((l) => S.done[l.id])).map((c) => c.name);
    return { name: S.name, board: S.board, streak: streakAlive() ? S.streak : 0, courses: started, due: dueCount() };
  }

  async function hear(text) {
    history.push({ role: 'user', content: text });
    const useAI = S.aiOn && S.aiKey && navigator.onLine;
    // Built-in commands (ending the call, lessons in progress, quizzes) are always handled locally.
    const t = norm(text);
    const command = /\b(bye|goodbye|end (the )?call|hang up|repeat|pardon|play chess|open chess|smart revise)\b/.test(t) || (mode === 'teach' && session);
    if (useAI && !command) {
      try { return await aiReply(text); } catch (e) {
        await bit(e?.message === 'key' ? 'Beep! Your API key did not work. Check it in Profile settings.' : 'Bzzt. Online brain unreachable. Switching to offline mode.');
      }
    }
    const handled = await local(text);
    if (handled === null) {
      await hana(pickOne(['I\'m not sure about that one yet.', 'Hmm, that\'s outside what I know offline.']) + ' Try "teach me biology", "quiz me on French", or "what does osmosis mean".', { mood: 'think' });
    }
  }

  return { greet, hear, get mode() { return mode; } };
}
