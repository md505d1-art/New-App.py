// Mental reset: guided breathing with Hana (box, 4-7-8, quick reset) and a 5-4-3-2-1 grounding exercise.
// Timing uses real timestamps, so it stays in step even if the phone stutters.
import { mascot } from './mascot.js';
import { hanaSay } from './voice.js';
import { S, save, esc, today } from './store.js';

export const PATTERNS = {
  box: { name: 'Box breathing', blurb: 'In 4 · hold 4 · out 4 · hold 4', steps: [['in', 4], ['hold', 4], ['out', 4], ['hold', 4]] },
  calm: { name: 'Calm 4-7-8', blurb: 'In 4 · hold 7 · out 8. Great before sleep or exams', steps: [['in', 4], ['hold', 7], ['out', 8]] },
  quick: { name: 'Quick reset', blurb: 'In 4 · out 6. Easy and quick', steps: [['in', 4], ['out', 6]] },
};
const WORD = { in: 'Breathe in', hold: 'Hold', out: 'Breathe out' };
const GROUND = [
  ['👀', 'Look around. Name 5 things you can see.'],
  ['✋', 'Notice 4 things you can feel, like your feet on the floor or your sleeves.'],
  ['👂', 'Listen. What are 3 things you can hear?'],
  ['👃', 'Find 2 things you can smell, or 2 smells you like.'],
  ['👅', 'Notice 1 thing you can taste. Then take one slow breath.'],
];
const pick = (a) => a[Math.floor(Math.random() * a.length)];

let B = null;
export const breatheActive = () => !!B;

// why: optional reason shown at the top ("You've been studying for 30 minutes")
export function startBreathe({ onDone, onCalm, why = '' } = {}) {
  B = { onDone, onCalm, why, mode: 'pick', pattern: S.calmPattern || 'quick', mins: S.calmMins || 1, step: 0, phaseEnd: 0, end: 0, raf: 0, breaths: 0, started: 0, g: 0, paused: false };
  render();
  say(pick(['Let\'s take a little break together. Pick one and get comfy.', 'Time to reset. Shoulders down, jaw relaxed. Ready?']), true);
}

function say(text, speak = false) {
  B.line = text; const el = document.getElementById('br-say'); if (el) el.textContent = text;
  if (speak) hanaSay(text);
}

function render() {
  const app = document.getElementById('app');
  const p = PATTERNS[B.pattern];
  app.innerHTML = `<div class="breathe ${B.mode}">
    <div class="br-bg"><i></i><i></i><i></i></div>
    <header class="bar-head"><button class="nav-ic" data-br="close" aria-label="Close">✕</button><b>${B.mode === 'ground' ? 'Grounding' : 'Breathe with Hana'}</b><span class="nav-ic ghost"></span></header>
    ${B.why && B.mode === 'pick' ? `<p class="br-why">${esc(B.why)}</p>` : ''}
    <div class="br-stage">${stage()}</div>
    <div class="br-hana">${mascot(B.mode === 'done' ? 'cheer' : 'happy', 74, { bit: B.mode !== 'run' })}<p class="cg-say" id="br-say">${esc(B.line || '')}</p></div>
    <div class="br-ctrl">${controls(p)}</div>
  </div>`;
}

function stage() {
  if (B.mode === 'pick') {
    return `<div class="br-pick">${Object.entries(PATTERNS).map(([k, p]) => `<button class="br-opt ${B.pattern === k ? 'on' : ''}" data-br-pattern="${k}"><b>${p.name}</b><small>${p.blurb}</small></button>`).join('')}
      <button class="br-opt ground" data-br="ground"><b>🌿 5-4-3-2-1 grounding</b><small>Use your senses to come back to the present</small></button></div>`;
  }
  if (B.mode === 'ground') {
    const [e, t] = GROUND[B.g];
    return `<div class="br-ground"><span class="br-num">${5 - B.g}</span><span class="br-emoji">${e}</span><p>${esc(t)}</p><div class="br-dots">${GROUND.map((_, i) => `<i class="${i <= B.g ? 'on' : ''}"></i>`).join('')}</div></div>`;
  }
  if (B.mode === 'done') {
    return `<div class="br-done"><span class="br-leaf">🌿</span><h2>Reset complete</h2><p>${B.breaths ? `${B.breaths} calm breath${B.breaths === 1 ? '' : 's'}` : 'Nicely done'}${(S.calm?.mins || 0) ? ` · ${Math.round(S.calm.mins)} calm minute${Math.round(S.calm.mins) === 1 ? '' : 's'} so far` : ''}</p></div>`;
  }
  return `<div class="br-circle-wrap"><div class="br-ring"></div><div class="br-circle" id="br-circle"></div>
    <div class="br-mid"><b id="br-word">Get ready</b><span id="br-count"></span></div></div>
    <p class="br-left" id="br-left"></p>`;
}

function controls(p) {
  if (B.mode === 'pick') return `<div class="seg-tabs">${[1, 3, 5].map((m) => `<button class="${B.mins === m ? 'on' : ''}" data-br-mins="${m}">${m} min</button>`).join('')}</div>
    <button class="primary-btn" data-br="start">Start ${esc(p.name.toLowerCase())}</button>`;
  if (B.mode === 'run') return `<button class="primary-btn ghost-btn" data-br="pause">${B.paused ? '▶ Carry on' : '⏸ Pause'}</button><button class="text-btn" data-br="finish">I feel better</button>`;
  if (B.mode === 'ground') return `<button class="primary-btn" data-br="gnext">${B.g < GROUND.length - 1 ? 'Next' : 'Done'}</button>`;
  return `<button class="primary-btn" data-br="close">Back to it</button><button class="text-btn" data-br="again">Another round</button>`;
}

/* ---------- breathing loop ---------- */
function begin() {
  B.mode = 'run'; B.step = -1; B.breaths = 0; B.started = Date.now(); B.end = Date.now() + B.mins * 60000 + 3000; B.paused = false;
  render(); say(pick(['Sit back. Follow the circle with your breath.', 'Just follow the circle. In through your nose, out through your mouth.']), true);
  B.phaseEnd = Date.now() + 3000; // a moment to settle in
  tick();
}

function nextPhase() {
  const steps = PATTERNS[B.pattern].steps;
  if (B.step === steps.length - 1) B.breaths++; // a full breath cycle just finished
  B.step = (B.step + 1) % steps.length;
  if (B.step === 0 && Date.now() > B.end) return finish(true);
  const [kind, secs] = steps[B.step];
  B.phaseEnd = Date.now() + secs * 1000; B.kind = kind; B.secs = secs;
  const c = document.getElementById('br-circle');
  if (c) { c.style.transitionDuration = `${secs}s`; c.className = `br-circle ${kind === 'in' ? 'big' : kind === 'out' ? '' : c.classList.contains('big') ? 'big hold' : 'hold'}`; }
  const w = document.getElementById('br-word'); if (w) w.textContent = WORD[kind];
  if (S.voice) hanaSay(WORD[kind]);
  chime(kind);
  navigator.vibrate?.(kind === 'hold' ? 10 : 25);
}

function tick() {
  if (!B || B.mode !== 'run') return;
  if (!B.paused) {
    const now = Date.now();
    if (now >= B.phaseEnd) nextPhase();
    if (!B || B.mode !== 'run') return;
    const cnt = document.getElementById('br-count'); if (cnt && B.kind) cnt.textContent = Math.max(1, Math.ceil((B.phaseEnd - now) / 1000));
    const left = document.getElementById('br-left');
    if (left) { const s = Math.max(0, Math.ceil((B.end - now) / 1000)); left.textContent = s > 3 ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')} left` : 'Last breath…'; }
  }
  B.raf = requestAnimationFrame(tick);
}

let AC;
function chime(kind) {
  if (!S.sound) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    const t = AC.currentTime; const f = kind === 'in' ? 528 : kind === 'out' ? 396 : 440;
    const o = AC.createOscillator(); const g = AC.createGain(); o.type = 'sine'; o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.06, t + 0.08); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
    o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + 1.5);
  } catch { /* no audio */ }
}

function finish(complete) {
  cancelAnimationFrame(B.raf);
  const mins = B.started ? (Date.now() - B.started) / 60000 : 0;
  logCalm(mins);
  B.mode = 'done';
  render();
  say(complete ? pick(['Lovely. Notice how you feel now. Ready when you are.', 'That was great. Your brain will thank you. Eureka, calmly.']) : pick(['Good choice. Even a minute helps.', 'Nice. Come back any time you need a reset.']), true);
}

function logCalm(mins) {
  if (mins < 0.2) return;
  S.calm = S.calm || { sessions: 0, mins: 0, days: {} };
  S.calm.sessions++; S.calm.mins += mins; S.calm.days[today()] = (S.calm.days[today()] || 0) + mins; S.calm.last = Date.now();
  save(); B.onCalm?.(mins);
}

function close() {
  if (!B) return;
  cancelAnimationFrame(B.raf);
  if (B.mode === 'run') logCalm((Date.now() - B.started) / 60000);
  const cb = B.onDone; B = null; cb?.();
}

document.addEventListener('click', (e) => {
  if (!B) return;
  const t = e.target.closest('[data-br], [data-br-pattern], [data-br-mins]'); if (!t) return;
  if (t.dataset.brPattern) { B.pattern = t.dataset.brPattern; S.calmPattern = B.pattern; save(); return render(); }
  if (t.dataset.brMins) { B.mins = +t.dataset.brMins; S.calmMins = B.mins; save(); return render(); }
  const a = t.dataset.br;
  if (a === 'close') return close();
  if (a === 'start' || a === 'again') return begin();
  if (a === 'finish') return finish(false);
  if (a === 'pause') {
    const c = document.getElementById('br-circle');
    if (B.paused) { // carry on: the circle finishes its movement in the time that was left
      const extra = Date.now() - B.pausedAt; B.phaseEnd += extra; B.end += extra; B.paused = false;
      if (c) { c.style.transitionDuration = `${Math.max(0.1, (B.phaseEnd - Date.now()) / 1000)}s`; c.style.transform = ''; }
    } else { // freeze the circle where it is
      B.paused = true; B.pausedAt = Date.now();
      if (c) { c.style.transform = getComputedStyle(c).transform; c.style.transitionDuration = '0s'; }
    }
    t.textContent = B.paused ? '▶ Carry on' : '⏸ Pause'; return;
  }
  if (a === 'ground') { B.mode = 'ground'; B.g = 0; B.started = Date.now(); render(); say(GROUND[0][1], true); return; }
  if (a === 'gnext') {
    if (B.g < GROUND.length - 1) { B.g++; render(); say(GROUND[B.g][1], true); return; }
    return finish(true);
  }
});
