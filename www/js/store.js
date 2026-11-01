// Shared state, persistence, sound, speech and small animation helpers.
export const KEY = 'sprout.v1';
export const today = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const dayOffset = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return today(d); };
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const DEFAULT = {
  onboarded: false, tab: 'home', course: null, lib: 'all', name: '',
  xp: 0, seeds: 300, streak: 0, lastDay: null, xpByDay: {}, timeByDay: {}, done: {},
  dailyGoal: 20, sound: true, voice: true, hanaVoice: '', hanaPitch: 'bright', handsFree: true, aiOn: false, aiKey: '', board: 'all', mem: {}, avatar: null, wins: 0, perfect: false,
  habits: [
    { id: 'h1', name: 'Drink water', emoji: '💧', color: 'blue', log: {} },
    { id: 'h2', name: 'Revise for 20 minutes', emoji: '📚', color: 'purple', log: {} },
    { id: 'h3', name: 'Stretch', emoji: '🧘', color: 'green', log: {} },
  ],
  books: [],
  games: [],
};

function load() {
  let s;
  try { s = { ...structuredClone(DEFAULT), ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { s = structuredClone(DEFAULT); }
  // Migrate from the first version (gems + hearts, done = true).
  if (s.gems != null) { s.seeds = Math.max(s.seeds ?? 0, s.gems); delete s.gems; }
  delete s.hearts; delete s.heartsAt; delete s.chests;
  if (['learn', 'habits', 'profile'].includes(s.tab)) s.tab = { learn: 'learn', habits: 'today', profile: 'me' }[s.tab];
  for (const k of Object.keys(s.done)) if (s.done[k] === true) s.done[k] = 1;
  s.timeByDay = s.timeByDay || {};
  if (['today', 'learn', 'garden', 'me'].includes(s.tab)) s.tab = { today: 'home', learn: 'explore', garden: 'progress', me: 'profile' }[s.tab];
  return s;
}
export const S = load();
export function reset() { for (const k of Object.keys(S)) delete S[k]; Object.assign(S, structuredClone(DEFAULT)); save(); }
export function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* storage unavailable */ } }

// Seconds spent learning, per day (for the activity chart). Capped so an idle screen doesn't count for hours.
export function addTime(secs) { const t = today(); S.timeByDay[t] = (S.timeByDay[t] || 0) + Math.min(Math.max(0, secs), 1800); save(); }

export function streakAlive() { return S.lastDay === today() || S.lastDay === dayOffset(-1); }
export function addXP(n) {
  S.xp += n;
  S.xpByDay[today()] = (S.xpByDay[today()] || 0) + n;
  if (S.lastDay !== today()) { S.streak = S.lastDay === dayOffset(-1) ? S.streak + 1 : 1; S.lastDay = today(); }
  save();
}

/* ---- sound ---- */
let AC;
function tone(notes) {
  if (!S.sound) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    let t = AC.currentTime;
    for (const [f, d, type = 'sine'] of notes) {
      const o = AC.createOscillator(); const g = AC.createGain();
      o.type = type; o.frequency.value = f; o.connect(g); g.connect(AC.destination);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.16, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.start(t); o.stop(t + d + 0.02); t += d * 0.8;
    }
  } catch { /* no audio */ }
}
export const sfx = {
  good: () => { tone([[660, 0.1], [990, 0.2]]); navigator.vibrate?.(15); },
  combo: (n) => tone([[660 + n * 40, 0.08], [990 + n * 40, 0.18]]),
  bad: () => { tone([[240, 0.16, 'triangle'], [180, 0.22, 'triangle']]); navigator.vibrate?.([30, 40, 30]); },
  tap: () => tone([[520, 0.04, 'triangle']]),
  pop: () => tone([[880, 0.06, 'triangle']]),
  win: () => tone([[523, 0.1], [659, 0.1], [784, 0.1], [1047, 0.32]]),
};

/* ---- speech (lesson audio in each language) ---- */
import { say, hasVoiceFor } from './speech.js';
export const canSpeak = (lang) => hasVoiceFor(lang);
export function speak(text, lang, rate = 0.85) { return say(text, { lang, rate }); }

/* ---- little animations ---- */
const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export function burst(el, colors = ['#58cc02', '#ffc800', '#1cb0f6', '#ff9eb0', '#ce82ff']) {
  if (!el || reduced()) return;
  const r = el.getBoundingClientRect();
  const b = document.createElement('div'); b.className = 'burst';
  b.style.left = `${r.left + r.width / 2}px`; b.style.top = `${r.top + r.height / 2}px`;
  b.innerHTML = [...Array(14)].map((_, i) => {
    const a = (i / 14) * Math.PI * 2; const d = 40 + Math.random() * 40;
    return `<i style="--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px;--c:${colors[i % colors.length]};--s:${0.6 + Math.random() * 0.8}"></i>`;
  }).join('');
  document.body.appendChild(b); setTimeout(() => b.remove(), 800);
}

export function floatText(el, text) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  const f = document.createElement('div'); f.className = 'float-text'; f.textContent = text;
  f.style.left = `${r.left + r.width / 2}px`; f.style.top = `${r.top}px`;
  document.body.appendChild(f); setTimeout(() => f.remove(), 1000);
}

export function countUp(root = document) {
  root.querySelectorAll('[data-count]').forEach((el) => {
    const to = +el.dataset.count; const suffix = el.dataset.suffix || '';
    if (reduced() || to === 0) { el.textContent = to + suffix; return; }
    const start = performance.now(); const dur = 700 + Math.min(600, to * 4);
    const step = (now) => {
      const p = Math.min(1, (now - start) / dur); const e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * e) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

let toastT;
export function toast(msg) {
  document.querySelector('.toast')?.remove(); clearTimeout(toastT);
  const el = document.createElement('div'); el.className = 'toast'; el.textContent = msg; document.body.appendChild(el);
  toastT = setTimeout(() => el.remove(), 2200);
}
