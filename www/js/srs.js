// Smart Revise: spaced repetition across every course, in the spirit of Seneca.
// Each fact sits in a box 1–6; a right answer moves it up (seen again later), a wrong one sends it back to box 1.
import { COURSES } from './courses.js';
import { S, save, today, dayOffset } from './store.js';

const INTERVAL = [0, 1, 2, 4, 7, 14, 30];
const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a, n) => shuffle(a).slice(0, n);
const mc = (prompt, right, wrong, extra = {}) => { const o = shuffle([right, ...wrong]); return { type: 'mc', prompt, options: o.map((label) => ({ label })), answer: o.indexOf(right), ...extra }; };

// Facts for one lesson: [{ id, make() → question }]
export function lessonFacts(c, l) {
  if (l.qs) {
    const qf = l.qs.map(([q, a, wrong, explain], i) => ({ id: `${l.id}:q${i}`, make: () => mc(q, a, wrong, { kicker: c.name, explain }) }));
    const tf = l.terms.map(([t, d], j) => ({ id: `${l.id}:t${j}`, make: () => {
      const r = Math.random();
      if (r < 0.34) return { type: 'flash', kicker: `${c.name} · flashcard`, prompt: 'Do you know what this means?', front: `<b>${t}</b>`, back: d };
      if (r < 0.67) return { type: 'wordfill', kicker: `${c.name} · wordfill`, prompt: 'Type the missing key term', before: '', after: ` means: ${d.charAt(0).toLowerCase()}${d.slice(1)}.`, answer: t };
      return mc(`What does “${t}” mean?`, d, pick(l.terms.filter((x) => x[0] !== t).map((x) => x[1]), 3), { kicker: c.name });
    } }));
    return [...qf, ...tf];
  }
  if (l.words) {
    const all = c.words.filter((x, i) => c.words.findIndex((y) => y.t === x.t) === i);
    return l.words.map((w) => ({ id: `${c.id}:${w.en}`, make: () => {
      const others = pick(all.filter((x) => x.t !== w.t && x.en !== w.en), 3);
      const r = Math.random();
      if (r < 0.3) return { type: 'flash', kicker: `${c.name} · flashcard`, prompt: `How do you say this in ${c.name}?`, front: `<span class="fl-emoji">${w.emoji}</span><b>${w.en}</b>`, back: `<b lang="${c.tts}" dir="auto">${w.t}</b>${w.rom ? `<small>${w.rom}</small>` : ''}`, speak: w.t };
      const o = shuffle([w, ...others]);
      if (r < 0.65) return { type: 'mc', kicker: c.name, prompt: `How do you say “${w.en}”?`, emoji: w.emoji, options: o.map((x) => ({ label: x.t, sub: x.rom, native: true, speak: x.t })), answer: o.indexOf(w), native: true };
      return { type: 'mc', kicker: c.name, prompt: `What does “${w.t}” mean?`, sub: w.rom, native: true, options: o.map((x) => ({ label: x.en })), answer: o.indexOf(w) };
    } }));
  }
  if (l.items) {
    const all = c.units.flatMap((u) => u.lessons.flatMap((x) => x.items));
    return l.items.map((it, k) => ({ id: `${l.id}:i${k}`, make: () => (Math.random() < 0.5
      ? mc(`What happened in ${it.year}?`, it.event, pick(all.filter((x) => x.event !== it.event && x.year.replace(/\D/g, '') !== it.year.replace(/\D/g, '')).map((x) => x.event), 3), { kicker: c.name, explain: it.detail })
      : { type: 'wordfill', kicker: `${c.name} · wordfill`, prompt: 'Type the year', before: `The ${it.event}: `, after: '', answer: it.year.replace(/\D/g, ''), explain: it.detail }) }));
  }
  if (l.signs) {
    const pool = c.units.flatMap((u) => u.lessons.flatMap((x) => x.signs)).filter((x) => !x.svg);
    return l.signs.filter((x) => !x.svg).map((it) => ({ id: `${l.id}:${it.word}`, make: () => mc(`How do you sign “${it.word}”?`, it.desc, pick(pool.filter((x) => x.word !== it.word).map((x) => x.desc), 3), { kicker: c.name, emoji: it.emoji }) }));
  }
  return [];
}

const lessonsOf = (c) => c.units.flatMap((u) => u.lessons);

// Called when a lesson is finished: its facts join the review schedule.
export function learnLesson(c, l) {
  S.mem = S.mem || {};
  for (const f of lessonFacts(c, l)) if (!S.mem[f.id]) S.mem[f.id] = { box: 1, due: dayOffset(1) };
  save();
}

export function recordAnswer(factId, ok) {
  if (!factId) return;
  S.mem = S.mem || {};
  const m = S.mem[factId] || { box: 0 };
  m.box = ok ? Math.min(6, (m.box || 0) + 1) : 1;
  m.due = ok ? dayOffset(INTERVAL[m.box]) : today();
  S.mem[factId] = m; save();
}

function allLearnedFacts() {
  const out = [];
  for (const c of Object.values(COURSES)) for (const l of lessonsOf(c)) {
    if (!S.done[l.id]) continue;
    for (const f of lessonFacts(c, l)) if (S.mem?.[f.id]) out.push({ ...f, c, mem: S.mem[f.id] });
  }
  return out;
}

export function dueCount() { const t = today(); return allLearnedFacts().filter((f) => f.mem.due <= t).length; }

// Up to `limit` facts: everything due first (oldest first), then the weakest ones.
export function buildReview(limit = 10) {
  const t = today(); const facts = allLearnedFacts();
  const due = facts.filter((f) => f.mem.due <= t).sort((a, b) => (a.mem.due < b.mem.due ? -1 : 1));
  const rest = facts.filter((f) => f.mem.due > t).sort((a, b) => a.mem.box - b.mem.box);
  const chosen = shuffle([...due.slice(0, limit), ...rest.slice(0, Math.max(0, Math.min(5, limit) - due.length))].slice(0, limit));
  if (!chosen.length) return null;
  const qs = chosen.map((f) => ({ ...f.make(), fact: f.id, tts: f.c.tts }));
  return {
    course: { id: 'review', name: 'Smart revise', color: 'purple', questions: () => qs, tts: null },
    lesson: { id: 'review', title: 'Smart revise', noIntro: true, unit: { desc: 'Facts you are about to forget' } },
    count: qs.length, due: due.length,
  };
}

// Memory strength for a course: how far its learned facts have climbed the boxes
// (just learned = 20%, remembered over a few weeks = 100%).
export function memoryScore(c) {
  const ids = lessonsOf(c).filter((l) => S.done[l.id]).flatMap((l) => lessonFacts(c, l).map((f) => f.id)).filter((id) => S.mem?.[id]);
  if (!ids.length) return null;
  return Math.round((ids.reduce((sum, id) => sum + Math.min(5, Math.max(1, S.mem[id].box || 1)), 0) / ids.length / 5) * 100);
}
