// Course definitions and question generators.
import G from './gambits.js';
import { Chess } from '../vendor/chess.js';
import { LANGS, LANG_UNITS, wordsOf } from './content/languages.js';
import { SUBJECTS } from './content/gcse.js';
import { SUBJECTS_MORE, GCSE_MFL, CORE_BOARDS } from './content/gcse-more.js';
import { BSL, SIGNS } from './content/bsl.js';
import { BIOLOGY, CHEMISTRY, PHYSICS } from './content/gcse-science.js';
import { MATHS, ENGLISH_LANG, ENGLISH_LIT } from './content/gcse-core.js';
import { GEOGRAPHY, RS, HISTORY_MORE } from './content/gcse-humanities.js';
import { MORE } from './content/gcse-other.js';

// Full-specification units, added after each subject's starter units (so existing lesson ids and progress stay the same).
const tag = (prefix, units) => units.map((u) => ({ ...u, title: `${prefix}: ${u.title}` }));
const EXTRA = {
  maths: MATHS, 'english-lang': ENGLISH_LANG, 'english-lit': ENGLISH_LIT,
  biology: BIOLOGY, chemistry: CHEMISTRY, physics: PHYSICS,
  'combined-science': [...tag('Biology', BIOLOGY), ...tag('Chemistry', CHEMISTRY), ...tag('Physics', PHYSICS)],
  geography: GEOGRAPHY, rs: RS, ...MORE,
};
export { GCSE_MFL };

const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a, n) => shuffle(a).slice(0, n);
const chunk = (a, n) => { const out = []; for (let i = 0; i < a.length; i += n) out.push(a.slice(i, i + n)); return out; };

/* ---------------- Chess ---------------- */

export function movesText(moves) {
  return moves.map((m, i) => (i % 2 === 0 ? `${i / 2 + 1}.${m}` : m)).join(' ');
}

function boardAfter(moves, side) {
  const c = new Chess();
  let last = null;
  for (const m of moves) last = c.move(m);
  return { board: c.board(), last: last ? [last.from, last.to] : [], flip: side === 'Black', turn: c.turn() };
}

const CHESS_UNITS = [
  { title: 'First Gambits', desc: 'Classic pawn offers every player meets', color: 'green',
    keys: ['kings_gambit', 'queens_gambit', 'danish_gambit', 'smith_morra', 'wing_gambit', 'blackmar_diemer'] },
  { title: 'Italian Fireworks', desc: 'Attack f7 with bishops and knights', color: 'purple',
    keys: ['evans_gambit', 'fried_liver', 'jerome', 'scotch_gambit', 'goring_gambit', 'halloween', 'urusov', 'nakhmanson', 'center_game'] },
  { title: 'Black Strikes Back', desc: 'Gambits for the second player', color: 'blue',
    keys: ['stafford_gambit', 'latvian_gambit', 'elephant_gambit', 'englund_gambit', 'budapest_gambit', 'albin_counter', 'benko_gambit', 'from_gambit', 'kieninger'] },
  { title: 'Romantic Era', desc: 'King hunts from the 1800s', color: 'red',
    keys: ['muzio', 'allgaier', 'kieseritzky', 'rice', 'cochrane', 'lisitsin'] },
  { title: 'Sharp Defenses', desc: 'Counterattacks and sneaky sidelines', color: 'yellow',
    keys: ['traxler', 'ulvestad', 'rousseau', 'jaenisch', 'marshall', 'riga', 'icelandic', 'portuguese', 'von_hennig', 'morra_declined', 'milner_barry', 'wing_french'] },
];

const ALL_KEYS = Object.keys(G).filter((k) => k !== 'calabrese'); // same moves as Rousseau

function chessQuestions(lesson) {
  const qs = [];
  const keys = lesson.keys;
  for (const k of keys) {
    const g = G[k];
    const others = ALL_KEYS.filter((x) => x !== k);

    // 1. Name that opening
    const nameOpts = shuffle([g.name, ...pick(others, 3).map((x) => G[x].name)]);
    qs.push({ type: 'mc', prompt: 'Which opening is this?', sub: movesText(g.moves),
      board: boardAfter(g.moves, g.side), options: nameOpts.map((label) => ({ label })), answer: nameOpts.indexOf(g.name) });

    // 2. Find the key move
    const pre = g.moves.slice(0, -1);
    const key = g.moves[g.moves.length - 1];
    const pos = new Chess(); pre.forEach((m) => pos.move(m));
    const alts = pick(pos.moves().filter((m) => m !== key), 3);
    const mvOpts = shuffle([key, ...alts]);
    const who = pos.turn() === 'w' ? 'White' : 'Black';
    qs.push({ type: 'mc', prompt: `${who} to move. Play the ${g.name}!`, sub: movesText(pre) || 'Starting position',
      board: boardAfter(pre, g.side), options: mvOpts.map((label) => ({ label })), answer: mvOpts.indexOf(key), mono: true });

    // 3. Build the move order (short lines) or pick the idea
    if (g.moves.length <= 8) {
      const extra = pick(new Chess().moves().filter((m) => !g.moves.includes(m)), 2);
      qs.push({ type: 'build', prompt: `Put the ${g.name} in order`, tiles: shuffle([...g.moves, ...extra]), answer: g.moves, mono: true });
    }
    const ideaOpts = shuffle([g.idea, ...pick(others, 2).map((x) => G[x].idea)]);
    qs.push({ type: 'mc', prompt: `What's the idea behind the ${g.name}?`, options: ideaOpts.map((label) => ({ label })), answer: ideaOpts.indexOf(g.idea) });
  }
  // Side question
  const sk = keys[Math.floor(Math.random() * keys.length)];
  qs.push({ type: 'pics', prompt: `Who plays the ${G[sk].name}?`,
    options: [{ label: 'White', emoji: '♔' }, { label: 'Black', emoji: '♚' }], answer: G[sk].side === 'White' ? 0 : 1 });
  // Match names to signature moves
  const mk = [...keys, ...pick(ALL_KEYS.filter((x) => !keys.includes(x)), Math.max(0, 4 - keys.length))].slice(0, 4);
  const seen = new Set();
  const pairs = mk.map((x) => [G[x].name, movesText(G[x].moves).split(' ').slice(-3).join(' ')])
    .filter((p) => !seen.has(p[1]) && seen.add(p[1]));
  qs.push({ type: 'match', prompt: 'Match each opening to its moves', pairs });
  return shuffle(qs.slice(0, -1)).concat(qs.slice(-1));
}

const UNIT_LEVEL = [1, 1, 2, 2, 3];
const LEVEL_NAME = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };

// Every opening is a game against the AI that starts from the gambit position.
// Each unit ends with one short quiz to review the move orders.
function buildChess() {
  return CHESS_UNITS.map((u, ui) => ({
    title: u.title, desc: u.desc, color: u.color,
    guide: u.keys.map((k) => ({ term: G[k].name, def: `${movesText(G[k].moves)} — ${G[k].idea}` })),
    lessons: [
      ...u.keys.map((k) => ({ id: `chess2:${k}`, title: `Play the ${G[k].name}`, kind: 'play',
        play: { key: k, level: UNIT_LEVEL[ui], levelName: LEVEL_NAME[UNIT_LEVEL[ui]] } })),
      { id: `chess2:quiz:${ui}`, title: `${u.title} review quiz`, kind: 'quiz', keys: u.keys.slice(0, 3) },
    ],
  }));
}

export function gambitStart(key) {
  const g = G[key];
  const c = new Chess(); g.moves.forEach((m) => c.move(m));
  return { fen: c.fen(), moves: g.moves, side: g.side === 'White' ? 'w' : 'b', name: g.name, idea: g.idea };
}
export { G as GAMBITS };

/* ---------------- GCSE History: Cold War (from your "Cold War Revision Starter" note) ---------------- */

const CW_UNITS = [
  { title: 'Origins of the Cold War', desc: '1945–1949: from allies to rivals', color: 'red', lessons: [
    { items: [
      { year: '1945', event: 'Yalta Conference', detail: 'Feb 1945: Stalin, Roosevelt and Churchill agree to split Germany into four zones.' },
      { year: 'Jul 1945', event: 'Potsdam Conference', detail: 'Truman and Attlee now attend; arguments over Poland and German reparations.' },
      { year: '1946', event: 'Iron Curtain speech', detail: 'Churchill warns that an "iron curtain" has come down across Europe.' },
      { year: '1947', event: 'Truman Doctrine', detail: 'The USA promises to help countries resist communism (containment).' },
    ], whys: [
      { q: 'Why did relations worsen after World War II?', a: 'Rival ideologies, plus disputes over Germany and Poland once the common enemy was gone',
        wrong: ['The USA and USSR both wanted to restore the Russian Tsar', 'Britain refused to join the United Nations'] },
    ] },
    { items: [
      { year: '1947', event: 'Marshall Plan', detail: 'About $13 billion of US aid to rebuild Europe and stop communism spreading.' },
      { year: '1948', event: 'Berlin Blockade begins', detail: 'Stalin cuts road, rail and canal links to West Berlin (June 1948).' },
      { year: '1949', event: 'NATO established', detail: 'A Western military alliance: an attack on one is an attack on all.' },
      { year: 'Aug 1949', event: 'USSR tests an atomic bomb', detail: 'The US nuclear monopoly ends and the arms race begins.' },
    ], whys: [
      { q: 'What caused the Berlin Blockade?', a: 'The West merged its zones and introduced a new currency, the Deutschmark, in 1948',
        wrong: ['The Berlin Wall was built across the city', 'The USSR wanted to join NATO'] },
      { q: 'How did the West respond to the Berlin Blockade?', a: 'The Berlin Airlift flew supplies into West Berlin for about 11 months',
        wrong: ['It invaded East Germany', 'It handed West Berlin to the USSR'] },
    ] },
  ] },
  { title: 'Crisis Points', desc: '1955–1968: walls, missiles and tanks', color: 'blue', lessons: [
    { items: [
      { year: '1955', event: 'Warsaw Pact formed', detail: 'Soviet-led military alliance, set up after West Germany joined NATO.' },
      { year: '1956', event: 'Hungarian Uprising', detail: 'Soviet tanks crush Imre Nagy\'s attempt to leave the Warsaw Pact.' },
      { year: '1961', event: 'Berlin Wall built', detail: 'August 1961: built to stop East Germans escaping to the West.' },
      { year: '1962', event: 'Cuban Missile Crisis', detail: 'October 1962: 13 days of stand-off over Soviet missiles in Cuba.' },
    ], whys: [
      { q: 'Why was the Cuban Missile Crisis significant?', a: 'It was the closest the world came to nuclear war, and it led to the hotline and the 1963 Test Ban Treaty',
        wrong: ['It ended the Cold War immediately', 'It caused the Berlin Blockade'] },
      { q: 'Why was the Berlin Wall built?', a: 'To stop skilled East Germans fleeing to the West through Berlin',
        wrong: ['To keep NATO troops out of West Germany', 'To celebrate the end of World War II'] },
    ] },
    { items: [
      { year: '1963', event: 'Hotline and Test Ban Treaty', detail: 'A direct Washington–Moscow link, and a ban on nuclear tests in the atmosphere.' },
      { year: '1968', event: 'Prague Spring', detail: 'Dubček\'s reforms in Czechoslovakia are crushed by Warsaw Pact troops.' },
      { year: 'Nov 1968', event: 'Brezhnev Doctrine', detail: 'The USSR claims the right to intervene if communism is threatened in Eastern Europe.' },
      { year: '1972', event: 'SALT 1 signed', detail: 'The first agreement to limit nuclear weapons, during détente.' },
    ], whys: [
      { q: 'How did Kennedy respond to missiles in Cuba?', a: 'A naval blockade ("quarantine") of Cuba, while negotiating with Khrushchev',
        wrong: ['He immediately bombed Moscow', 'He removed all US troops from Europe'] },
    ] },
  ] },
  { title: 'The End of the Cold War', desc: '1979–1991: the USSR collapses', color: 'purple', lessons: [
    { items: [
      { year: '1979', event: 'Soviet invasion of Afghanistan', detail: 'Ends détente; the USA boycotts the 1980 Moscow Olympics.' },
      { year: '1985', event: 'Gorbachev becomes Soviet leader', detail: 'Introduces glasnost (openness) and perestroika (restructuring).' },
      { year: '1987', event: 'INF Treaty', detail: 'Reagan and Gorbachev scrap intermediate-range nuclear missiles.' },
      { year: '1989', event: 'Berlin Wall falls', detail: '9 November 1989: East Germans cross freely; revolutions sweep Eastern Europe.' },
      { year: '1991', event: 'Soviet Union dissolves', detail: 'December 1991: the USSR breaks into 15 independent states.' },
    ], whys: [
      { q: 'How did the Cold War end?', a: 'Gorbachev\'s reforms, Soviet economic weakness and the 1989 revolutions in Eastern Europe',
        wrong: ['A nuclear war between the USA and USSR', 'The USA joined the Warsaw Pact'] },
    ] },
  ] },
];
const CW_ALL = CW_UNITS.flatMap((u) => u.lessons.flatMap((l) => l.items));
const yr = (y) => +y.replace(/\D/g, '');

function factsQuestions(lesson) {
  const qs = [];
  const items = lesson.items;
  for (const it of items) {
    const others = CW_ALL.filter((x) => x.event !== it.event);
    const evOpts = shuffle([it, ...pick(others.filter((x) => yr(x.year) !== yr(it.year)), 3)]);
    qs.push({ type: 'mc', prompt: `What happened in ${it.year}?`, options: evOpts.map((x) => ({ label: x.event })), answer: evOpts.indexOf(it), explain: it.detail });
    const years = [...new Set(CW_ALL.map((x) => String(yr(x.year))))].filter((y) => y !== String(yr(it.year)));
    const yOpts = shuffle([String(yr(it.year)), ...pick(years, 3)]);
    qs.push({ type: 'mc', prompt: `When was the ${it.event}?`, sub: it.detail.replace(/\d{4}/g, '____'), options: yOpts.map((label) => ({ label })), answer: yOpts.indexOf(String(yr(it.year))), explain: it.detail });
  }
  const wf = items[Math.floor(Math.random() * items.length)];
  qs.push({ type: 'wordfill', kicker: 'Wordfill', prompt: 'Type the year', before: `The ${wf.event}: `, after: '', answer: String(yr(wf.year)), explain: wf.detail });
  for (const w of lesson.whys) {
    const o = shuffle([w.a, ...w.wrong]);
    qs.push({ type: 'mc', prompt: w.q, options: o.map((label) => ({ label })), answer: o.indexOf(w.a) });
  }
  const uniq = items.filter((x, i) => items.findIndex((y) => yr(y.year) === yr(x.year)) === i);
  const ordered = [...uniq].sort((a, b) => yr(a.year) - yr(b.year)).map((x) => x.event);
  qs.push({ type: 'build', prompt: 'Put these events in time order', sub: 'Earliest first', tiles: shuffle(ordered), answer: ordered, vertical: true });
  qs.push({ type: 'match', prompt: 'Match each year to its event', pairs: uniq.map((x) => [String(yr(x.year)), x.event]) });
  return shuffle(qs.slice(0, -1)).concat(qs.slice(-1));
}

function buildFacts(prefix, units) {
  return units.map((u, ui) => ({
    title: u.title, desc: u.desc, color: u.color,
    guide: u.lessons.flatMap((l) => l.items.map((it) => ({ term: `${it.year} · ${it.event}`, def: it.detail }))),
    lessons: u.lessons.map((l, li) => ({ id: `${prefix}:${ui}:${li}`, title: l.items.map((x) => x.event).join(', '), ...l })),
  }));
}

/* ---------------- Languages ---------------- */

let seg = null;
function graphemes(str) {
  try { seg = seg || new Intl.Segmenter(undefined, { granularity: 'grapheme' }); return [...seg.segment(str)].map((x) => x.segment); } catch { return [...str]; }
}

function langQuestions(lesson, course) {
  const all = course.words; const words = lesson.words;
  const qs = [];
  // Unique by spelling, so words like French "bonjour" (hello / good morning) never appear twice.
  const others = (w) => all.filter((x, i) => x.t !== w.t && x.en !== w.en && all.findIndex((y) => y.t === x.t) === i);
  const opt = (x) => ({ label: x.t, sub: x.rom, speak: x.t, native: true });
  words.forEach((w, i) => {
    const pics = shuffle([w, ...pick(others(w), 3)]);
    qs.push({ type: 'pics', kicker: 'Picture match', prompt: `Which picture is “${w.t}”?`, sub: w.rom, speak: w.t, native: true,
      options: pics.map((x) => ({ label: x.en, emoji: x.emoji })), answer: pics.indexOf(w) });
    const o = shuffle([w, ...pick(others(w), 3)]);
    const mode = i % 3;
    if (mode === 0) qs.push({ type: 'mc', kicker: 'Translate', prompt: `How do you say “${w.en}”?`, emoji: w.emoji, options: o.map(opt), answer: o.indexOf(w) });
    else if (mode === 1) qs.push({ type: 'mc', kicker: 'Listen', listen: w.t, fallback: `What does “${w.t}” mean?`, prompt: 'What do you hear?', options: o.map((x) => ({ label: x.en })), answer: o.indexOf(w) });
    else qs.push({ type: 'mc', kicker: 'Translate', prompt: `What does “${w.t}” mean?`, sub: w.rom, speak: w.t, native: true, options: o.map((x) => ({ label: x.en })), answer: o.indexOf(w) });
    const g = graphemes(w.t);
    if (i % 2 === 0 && !w.t.includes(' ') && g.length >= 2 && g.length <= 9) {
      const pool = [...new Set(all.flatMap((x) => graphemes(x.t.replace(/\s/g, ''))))].filter((c) => !g.includes(c));
      qs.push({ type: 'build', kicker: 'Spell it', prompt: `Spell “${w.en}”`, emoji: w.emoji, sub: w.rom, tiles: shuffle([...g, ...pick(pool, 3)]), answer: g, join: '', native: true });
    }
  });
  const latin = !words.some((w) => w.rom) && !course.rtl;
  if (latin) { const w = words[Math.floor(Math.random() * words.length)]; qs.push({ type: 'wordfill', kicker: 'Wordfill', prompt: `Type the ${course.name} for “${w.en}”`, emoji: w.emoji, before: '', after: '', answer: w.t, native: true }); }
  for (const [en, tr] of lesson.phrases || []) {
    const toks = tr.split(' ');
    const extra = pick([...new Set(all.map((x) => x.t))].filter((t) => !t.includes(' ') && !toks.includes(t)), 3);
    qs.push({ type: 'build', kicker: 'Build the sentence', prompt: 'Translate this sentence', sub: en, speak: tr, tiles: shuffle([...toks, ...extra]), answer: toks, join: ' ', native: true });
  }
  const seen = new Set();
  qs.push({ type: 'match', kicker: 'Pairs', prompt: 'Tap the matching pairs', native: true,
    pairs: words.filter((w) => !seen.has(w.t) && seen.add(w.t)).map((w) => [w.t, w.en]) });
  return shuffle(qs.slice(0, -1)).concat(qs.slice(-1));
}

const PALETTE = ['green', 'blue', 'purple', 'red', 'yellow'];

function buildLanguage(lang, idx) {
  const words = wordsOf(lang);
  const course = { id: `lang:${lang.code}`, cat: 'language', name: lang.name, sub: lang.native, flag: lang.flag, icon: 'language',
    color: PALETTE[idx % PALETTE.length], tts: lang.tts, rtl: !!lang.rtl, note: lang.note, words };
  course.units = LANG_UNITS.map((u, ui) => {
    const uw = words.slice(u.from, u.from + 8);
    return { title: u.title, desc: u.desc, color: u.color,
      guide: uw.map((w) => ({ term: `${w.emoji} ${w.t}${w.rom ? ` (${w.rom})` : ''}`, def: w.en })),
      lessons: [0, 1].map((li) => ({ id: `${course.id}:${ui}:${li}`, title: `${u.title} ${li + 1}`, words: uw.slice(li * 4, li * 4 + 4),
        phrases: lang.phrases?.[ui] ? [lang.phrases[ui][li]] : [] })) };
  });
  course.questions = (l) => langQuestions(l, course);
  return course;
}

/* ---------------- GCSE subjects ---------------- */

function quizQuestions(lesson) {
  const qs = lesson.qs.map(([q, a, wrong, explain], i) => {
    const o = shuffle([a, ...wrong]);
    return { type: 'mc', kicker: lesson.title, prompt: q, options: o.map((label) => ({ label })), answer: o.indexOf(a), explain, fact: `${lesson.id}:q${i}` };
  });
  const [term, def] = lesson.terms[Math.floor(Math.random() * lesson.terms.length)];
  const defs = shuffle(lesson.terms.map((t) => t[1]));
  qs.push({ type: 'mc', kicker: 'Key term', prompt: `What does “${term}” mean?`, options: defs.map((label) => ({ label })), answer: defs.indexOf(def) });
  qs.push(toggleQ(lesson.terms));
  const [wt, wd] = lesson.terms[Math.floor(Math.random() * lesson.terms.length)];
  qs.push({ type: 'wordfill', kicker: 'Wordfill', prompt: 'Type the missing key term', before: '', after: ` means: ${wd.charAt(0).toLowerCase()}${wd.slice(1)}.`, answer: wt });
  qs.push({ type: 'match', kicker: 'Key terms', prompt: 'Match each term to its meaning', pairs: lesson.terms });
  return shuffle(qs.slice(0, -1)).concat(qs.slice(-1));
}

// Seneca-style toggles: pick the right word in each line.
export function toggleQ(terms) {
  const rows = pick(terms, 2).map(([t, d]) => {
    const other = pick(terms.filter((x) => x[0] !== t), 1)[0][0];
    const opts = shuffle([t, other]);
    return { options: opts, answer: opts.indexOf(t), after: d };
  });
  return { type: 'toggle', kicker: 'Toggles', prompt: 'Choose the right word in each line', rows };
}

function buildSubject(s, idx) {
  s = { ...s, units: [...s.units, ...(EXTRA[s.id] || [])] };
  return { id: `gcse:${s.id}`, cat: 'school', name: s.name, sub: s.sub || 'GCSE', icon: s.icon, glyph: s.glyph, color: s.color, note: s.note,
    boards: s.boards || CORE_BOARDS[s.id] || ['AQA', 'Edexcel', 'Eduqas'],
    units: s.units.map((u, ui) => ({ title: u.title, desc: u.desc, color: PALETTE[(idx + ui) % PALETTE.length],
      guide: u.lessons.flatMap((l) => l.terms.map(([term, def]) => ({ term, def }))),
      lessons: u.lessons.map((l, li) => ({ id: `gcse:${s.id}:${ui}:${li}`, ...l })) })),
    questions: quizQuestions };
}

/* ---------------- British Sign Language ---------------- */

function bslQuestions(lesson) {
  const items = lesson.signs; const qs = [];
  const pool = BSL.units.flatMap((u) => u.items);
  for (const it of items) {
    if (it.svg) {
      const others = pick(pool.filter((x) => x.svg && x.word !== it.word && /^\d$/.test(x.word) === /^\d$/.test(it.word)), 3);
      const o = shuffle([it, ...others]);
      qs.push({ type: 'mc', kicker: 'Read the hand', prompt: /^\d$/.test(it.word) ? 'Which number is this?' : 'Which letter is this?', art: it.svg(150),
        options: o.map((x) => ({ label: x.word })), answer: o.indexOf(it), explain: it.desc, fact: `${lesson.id}:${it.word}` });
      const o2 = shuffle([it, ...others]);
      qs.push({ type: 'pics', kicker: 'Find the sign', prompt: `Which picture shows ${it.word}?`, options: o2.map((x) => ({ label: '', svg: x.svg(90) })), answer: o2.indexOf(it), explain: it.desc });
    } else {
      const others = pick(SIGNS.filter((x) => x.word !== it.word), 3);
      const o = shuffle([it, ...others]);
      qs.push({ type: 'mc', kicker: 'How to sign it', prompt: `How do you sign “${it.word}”?`, emoji: it.emoji, options: o.map((x) => ({ label: x.desc })), answer: o.indexOf(it), fact: `${lesson.id}:${it.word}` });
      const o2 = shuffle([it, ...others]);
      qs.push({ type: 'mc', kicker: 'What does it mean?', prompt: 'Which word matches this sign?', sub: it.desc, options: o2.map((x) => ({ label: x.word, emoji: x.emoji })), answer: o2.indexOf(it) });
    }
  }
  if (!items[0].svg) qs.push({ type: 'match', kicker: 'Pairs', prompt: 'Match each sign to its picture', pairs: items.slice(0, 4).map((x) => [x.word, x.emoji]) });
  return items[0].svg ? shuffle(qs) : shuffle(qs.slice(0, -1)).concat(qs.slice(-1));
}

function buildBSL() {
  return { ...BSL, units: BSL.units.map((u, ui) => ({ title: u.title, desc: u.desc, color: u.color,
    guide: u.items.map((it) => ({ term: it.word, def: it.desc })),
    lessons: chunk(u.items, u.items[0].svg ? 5 : 4).map((signs, li) => ({ id: `bsl:${ui}:${li}`, title: `${u.title}${u.items.length > 5 ? ` ${li + 1}` : ''}`, signs })) })),
  questions: bslQuestions };
}

/* ---------------- Catalogue ---------------- */

const history = { id: 'history', cat: 'school', name: 'History', sub: 'Cold War, Germany, Medicine, Elizabethans, WWI, America', icon: 'history', color: 'red', boards: CORE_BOARDS.history,
  units: buildFacts('cw', [...CW_UNITS, ...HISTORY_MORE]), questions: factsQuestions,
  note: 'The Cold War units come from your Cold War Revision Starter note. Topics differ by exam board: revise the ones on your specification.' };
const subjects = [...SUBJECTS, ...SUBJECTS_MORE].map(buildSubject);
subjects.splice(subjects.findIndex((c) => c.id === 'gcse:geography'), 0, history);

export const COURSES = Object.fromEntries([
  { id: 'chess', cat: 'chess', name: 'Chess', sub: 'Play gambits vs Hana', icon: 'chess', color: 'green', units: buildChess(), questions: chessQuestions },
  ...subjects,
  ...LANGS.map(buildLanguage),
  buildBSL(),
].map((c) => [c.id, c]));

export const CATEGORIES = [
  { id: 'school', name: 'School', blurb: 'Every GCSE subject from AQA, Edexcel and Eduqas' },
  { id: 'language', name: 'Languages', blurb: `${LANGS.length} languages and BSL` },
  { id: 'chess', name: 'Chess', blurb: 'Train against an AI coach' },
];
