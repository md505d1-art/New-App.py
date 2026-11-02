// Focus timer: a study session with Hana keeping you company (Pomodoro style).
// Time counts from real timestamps, so it stays right if the phone sleeps or the app goes to the background.
import { mascot } from './mascot.js';
import { hanaSay } from './voice.js';
import { S, save, sfx, esc } from './store.js';

let F = null;
const LENGTHS = [15, 25, 45];
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const fmt = (ms) => { const s = Math.max(0, Math.ceil(ms / 1000)); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };

const LINES = {
  start: ['Phones face down! I\'ll keep Bit quiet.', 'Focus mode on. I\'ll be right here tinkering quietly.', 'Let\'s do this! One thing at a time.'],
  half: ['Halfway there! You\'re doing brilliantly.', 'Half done. Keep going, I\'m proud of you!'],
  near: ['Five minutes left. Finish strong!', 'Nearly there! Five more minutes.'],
  done: ['Session complete! Eureka! Take a proper break now.', 'You did it! Stretch, drink some water, then come back.'],
  breakDone: ['Break over! Ready for another round?', 'Welcome back! Shall we go again?'],
  idle: ['Bit is pretending to sleep so he doesn\'t distract you.', 'I\'m sketching a new gadget while you work.', 'Small steps add up. You\'ve got this.', 'If you get stuck, write down the question and keep moving.'],
};

export function startFocus(callbacks) {
  F = { cb: callbacks, phase: 'pick', mins: S.focusMins || 25, end: 0, left: 0, paused: false, timer: null, said: {}, line: pick(['Pick a session length. I\'ll keep you company!', 'How long shall we focus for?']), studied: 0, wake: null };
  render();
}
export const focusActive = () => !!F;

function render() {
  const app = document.getElementById('app');
  const total = (F.phase === 'break' ? 5 : F.mins) * 60000;
  const left = F.phase === 'pick' ? total : F.paused ? F.left : F.end - Date.now();
  const pct = F.phase === 'pick' ? 0 : 1 - Math.max(0, left) / total;
  const R = 108; const C = 2 * Math.PI * R;
  app.innerHTML = `<div class="focus ${F.phase}">
    <div class="call-bg"><i></i><i></i><i></i></div>
    <header class="bar-head"><button class="nav-ic" data-focus="quit" aria-label="Leave focus timer">✕</button><b>${F.phase === 'break' ? 'Break time' : 'Focus'}</b><span class="nav-ic ghost"></span></header>
    <div class="fc-ring"><svg viewBox="0 0 240 240" aria-hidden="true"><circle cx="120" cy="120" r="${R}" class="trk"/><circle id="fc-arc" cx="120" cy="120" r="${R}" class="arc" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - pct)}"/></svg>
      <div class="fc-mid"><b id="fc-time">${fmt(left)}</b><small>${F.phase === 'pick' ? 'minutes of focus' : F.phase === 'break' ? 'break' : F.paused ? 'paused' : 'focus'}</small></div></div>
    <div class="fc-hana">${mascot(F.phase === 'done' ? 'cheer' : F.phase === 'run' ? 'think' : 'happy', 88)}<p class="cg-say" id="fc-say">${esc(F.line)}</p></div>
    <div class="fc-ctrl">${controls()}</div>
  </div>`;
}

function controls() {
  if (F.phase === 'pick') return `<div class="seg-tabs">${LENGTHS.map((m) => `<button class="${F.mins === m ? 'on' : ''}" data-focus-len="${m}">${m} min</button>`).join('')}</div>
    <button class="primary-btn" data-focus="go">Start focusing</button>`;
  if (F.phase === 'run' || F.phase === 'break') return `<button class="primary-btn ghost-btn" data-focus="pause">${F.paused ? '▶ Resume' : '⏸ Pause'}</button>
    <button class="text-btn" data-focus="${F.phase === 'break' ? 'skip-break' : 'finish'}">${F.phase === 'break' ? 'Skip break' : 'End session'}</button>`;
  return `<button class="primary-btn" data-focus="break">☕ Take a 5 minute break</button><button class="primary-btn ghost-btn" data-focus="again">Go again</button><button class="text-btn" data-focus="quit">Done</button>`;
}

function say(kind) { F.line = pick(LINES[kind]); const el = document.getElementById('fc-say'); if (el) el.textContent = F.line; hanaSay(F.line); }

async function keepAwake(on) {
  try {
    if (on && !F.wake && navigator.wakeLock) F.wake = await navigator.wakeLock.request('screen');
    if (!on && F.wake) { await F.wake.release(); F.wake = null; }
  } catch { /* not supported here */ }
}

function begin(phase) {
  F.phase = phase; F.paused = false; F.said = {};
  F.end = Date.now() + (phase === 'break' ? 5 : F.mins) * 60000;
  clearInterval(F.timer); F.timer = setInterval(tick, 250);
  keepAwake(true);
  if (phase === 'break') { F.line = 'Break time! Stretch, get some water, look out of a window.'; render(); hanaSay(F.line); } else { render(); say('start'); }
}

function tick() {
  if (!F || F.paused) return;
  const total = (F.phase === 'break' ? 5 : F.mins) * 60000; const left = F.end - Date.now();
  const t = document.getElementById('fc-time'); if (t) t.textContent = fmt(left);
  const arc = document.getElementById('fc-arc'); if (arc) arc.style.strokeDashoffset = String(2 * Math.PI * 108 * Math.max(0, left) / total);
  if (F.phase === 'run') {
    if (!F.said.half && left <= total / 2) { F.said.half = true; say('half'); }
    else if (!F.said.near && F.mins > 10 && left <= 5 * 60000) { F.said.near = true; say('near'); }
    else if (!F.said.idle && left <= total * 0.75) { F.said.idle = true; F.line = pick(LINES.idle); const el = document.getElementById('fc-say'); if (el) el.textContent = F.line; }
  }
  if (left <= 0) finishPhase(true);
}

function finishPhase(complete) {
  clearInterval(F.timer); keepAwake(false);
  if (F.phase === 'break') { F.phase = 'pick'; sfx.pop(); say('breakDone'); render(); return; }
  const total = F.mins * 60000; const left = F.paused ? F.left : F.end - Date.now();
  const secs = Math.round((total - Math.max(0, left)) / 1000);
  F.studied += secs;
  F.phase = complete ? 'done' : 'pick';
  if (complete) { sfx.win(); F.cb.onSession?.(secs, true); say('done'); }
  else if (secs >= 60) { F.cb.onSession?.(secs, false); F.line = `Nice, that's ${Math.round(secs / 60)} minute${Math.round(secs / 60) === 1 ? '' : 's'} of focus. Want to go again?`; }
  else F.line = 'No worries. Ready when you are!';
  render();
}

function quit() {
  if (!F) return;
  if (F.phase === 'run') finishPhase(false);
  clearInterval(F.timer); keepAwake(false);
  const cb = F.cb; F = null; cb.onQuit?.();
}

document.addEventListener('click', (e) => {
  if (!F) return;
  const t = e.target.closest('[data-focus], [data-focus-len]'); if (!t) return;
  if (t.dataset.focusLen) { F.mins = +t.dataset.focusLen; S.focusMins = F.mins; save(); sfx.tap(); return render(); }
  const a = t.dataset.focus;
  if (a === 'go' || a === 'again') return begin('run');
  if (a === 'break') return begin('break');
  if (a === 'skip-break') return finishPhase(true);
  if (a === 'finish') return finishPhase(false);
  if (a === 'quit') return quit();
  if (a === 'pause') {
    if (F.paused) { F.end = Date.now() + F.left; F.paused = false; keepAwake(true); } else { F.left = F.end - Date.now(); F.paused = true; keepAwake(false); }
    return render();
  }
});
// The wake lock is dropped when the app is hidden; take it again when it comes back.
document.addEventListener('visibilitychange', () => { if (F && !F.paused && (F.phase === 'run' || F.phase === 'break') && document.visibilityState === 'visible') { F.wake = null; keepAwake(true); tick(); } });
