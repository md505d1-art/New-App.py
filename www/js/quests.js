// Daily quests: three small goals a day, each worth seeds. Finish all three for a bonus.
import { S, save, today } from './store.js';

const POOL = [
  { id: 'lessons2', ev: 'lesson', goal: 2, reward: 15, icon: '📘', text: 'Finish 2 lessons' },
  { id: 'lessons3', ev: 'lesson', goal: 3, reward: 25, icon: '📚', text: 'Finish 3 lessons' },
  { id: 'xp30', ev: 'xp', goal: 30, reward: 15, icon: '⚡', text: 'Earn 30 XP' },
  { id: 'xp60', ev: 'xp', goal: 60, reward: 25, icon: '⚡', text: 'Earn 60 XP' },
  { id: 'perfect', ev: 'perfect', goal: 1, reward: 20, icon: '⭐', text: 'Get 3 stars on a lesson' },
  { id: 'revise', ev: 'revise', goal: 8, reward: 20, icon: '🧠', text: 'Answer 8 Smart revise questions', need: () => Object.keys(S.mem || {}).length > 0 },
  { id: 'breathe', ev: 'breathe', goal: 1, reward: 10, icon: '🌿', text: 'Take a breathing break' },
  { id: 'focus2', ev: 'focusmin', goal: 40, reward: 25, icon: '🎯', text: 'Focus for 40 minutes' },
  { id: 'chess', ev: 'chess', goal: 1, reward: 15, icon: '♞', text: 'Play a game of chess' },
  { id: 'habit', ev: 'habit', goal: 2, reward: 10, icon: '✅', text: 'Tick off 2 habits', need: () => S.habits.length >= 2 },
  { id: 'focus', ev: 'focus', goal: 1, reward: 20, icon: '⏱️', text: 'Finish a focus session' },
  { id: 'cards', ev: 'cards', goal: 1, reward: 10, icon: '🃏', text: 'Study your own flashcards', need: () => (S.cards || []).length >= 2 },
];
export const DAILY_BONUS = 20;

const seedOf = (s) => { let h = 11; for (const ch of s) h = (h * 33 + ch.charCodeAt(0)) >>> 0; return h; };

// Today's three quests (picked the same way all day, never two of the same kind).
export function todaysQuests() {
  const t = today();
  if (!S.quests || S.quests.day !== t) {
    const pool = POOL.filter((q) => !q.need || q.need());
    let h = seedOf(t); const items = []; const evs = new Set();
    for (let tries = 0; items.length < 3 && tries < 60; tries++) {
      h = (h * 1103515245 + 12345) >>> 0;
      const q = pool[h % pool.length];
      if (!evs.has(q.ev)) { evs.add(q.ev); items.push({ id: q.id, prog: 0, claimed: false }); }
    }
    S.quests = { day: t, items, bonus: false }; save();
  }
  return S.quests.items.map((it) => {
    const q = POOL.find((p) => p.id === it.id) || POOL[0];
    const prog = Math.min(q.goal, q.ev === 'xp' ? (S.xpByDay[today()] || 0) : q.ev === 'habit' ? S.habits.filter((h) => h.log[today()]).length : it.prog);
    return { ...q, prog, done: prog >= q.goal, claimed: it.claimed };
  });
}

// Something happened (a lesson, a focus session...). Returns quests that just became complete.
export function questEvent(ev, n = 1) {
  const before = todaysQuests().filter((q) => q.done).map((q) => q.id);
  for (const it of S.quests.items) { const q = POOL.find((p) => p.id === it.id); if (q?.ev === ev) it.prog += n; }
  save();
  return todaysQuests().filter((q) => q.done && !before.includes(q.id));
}
// Quests that are complete but not counted as "just finished" yet (xp and habits update on their own).
export function questsReady() { return todaysQuests().filter((q) => q.done && !q.claimed); }

export function claimQuest(id) {
  const q = todaysQuests().find((x) => x.id === id);
  if (!q || !q.done || q.claimed) return null;
  S.quests.items.find((x) => x.id === id).claimed = true;
  let seeds = q.reward; let bonus = false;
  if (!S.quests.bonus && S.quests.items.every((x) => x.claimed)) { S.quests.bonus = true; seeds += DAILY_BONUS; bonus = true; }
  S.seeds += seeds; save();
  return { seeds, bonus };
}
