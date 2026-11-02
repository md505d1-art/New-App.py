// "Call Hana": a voice call where Hana talks, listens, chats and teaches.
import { mascot } from './mascot.js';
import { S, save, esc, toast } from './store.js';
import { createTutor } from './tutor.js';
import { say, canListen, listen, stopListening, stopSpeaking, hanaVoice } from './speech.js';
import { HANA_PITCH } from './voice.js';

let C = null;

export function startCall(callbacks) {
  C = { cb: callbacks, started: 0, timer: null, listening: false, speaking: null, typing: !canListen(), captions: [], mood: 'happy', ended: false, muted: !S.voice };
  // Messages typed while it's still ringing wait here until Hana picks up and has said hello.
  C.queue = new Promise((r) => { C.pickUp = r; });
  render(); ring();
}
export const callActive = () => !!C;

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

function render() {
  const app = document.getElementById('app');
  const connected = C.started > 0;
  const ai = S.aiOn && S.aiKey;
  app.innerHTML = `<div class="call ${connected ? 'live' : 'ringing'}">
    <div class="call-bg"><i></i><i></i><i></i><span class="sparks">${'<b></b>'.repeat(14)}</span></div>
    <header class="call-top">
      <span class="call-status"><i class="dot"></i><span id="call-time">${connected ? fmt(Math.round((Date.now() - C.started) / 1000)) : 'Calling…'}</span></span>
      <span class="call-mode">${ai ? '✨ Hana AI' : '📚 Offline tutor'}</span>
    </header>
    <div class="call-stage">
      <div class="hana-wrap"><div class="rings ${C.speaking ? `on ${C.speaking}` : ''}" id="rings"><i></i><i></i><i></i></div>
        <div class="call-hana" id="call-hana">${mascot(C.mood, 210)}</div></div>
      <h2 class="call-name">Hana <small>and Bit</small></h2>
      <p class="call-sub" id="call-sub">${connected ? (C.listening ? 'Listening…' : C.speaking ? (C.speaking === 'bit' ? 'Bit is talking' : 'Hana is talking') : 'Your turn') : 'Ringing…'}</p>
    </div>
    <div class="captions" id="captions">${C.captions.slice(-6).map(capHTML).join('')}</div>
    ${C.typing ? `<form class="call-type" id="call-type"><input id="call-input" autocomplete="off" placeholder="${canListen() ? 'Type a message' : 'Type here, or use your keyboard\'s mic'}" aria-label="Message to Hana"><button class="send" aria-label="Send">➤</button></form>` : ''}
    <footer class="call-ctrl">
      <button class="cc ${C.muted ? 'off' : ''}" data-call="speaker" aria-label="Hana's voice on or off"><span>${C.muted ? '🔇' : '🔊'}</span><small>${C.muted ? 'Muted' : 'Voice'}</small></button>
      <button class="cc mic ${C.listening ? 'live' : ''}" data-call="mic" ${canListen() ? '' : 'disabled'} aria-label="Talk"><span>${C.listening ? waves() : '🎙️'}</span><small>${C.listening ? 'Listening' : 'Talk'}</small></button>
      <button class="cc ${C.typing ? 'on' : ''}" data-call="type" aria-label="Type instead"><span>⌨️</span><small>Type</small></button>
      <button class="cc end" data-call="end" aria-label="End call"><span>📞</span><small>End</small></button>
    </footer>
  </div>`;
  const cap = document.getElementById('captions'); if (cap) cap.scrollTop = cap.scrollHeight;
  fit();
  if (C.typing) setTimeout(() => document.getElementById('call-input')?.focus({ preventScroll: true }), 50);
}
const waves = () => '<i class="wv"></i><i class="wv"></i><i class="wv"></i><i class="wv"></i>';
const capHTML = (c) => `<div class="cap ${c.who}"><b>${c.who === 'you' ? 'You' : c.who === 'bit' ? 'Bit' : 'Hana'}</b><p${c.lang ? ` lang="${c.lang}" dir="auto"` : ''}>${esc(c.text)}</p></div>`;

function addCaption(who, text, lang) {
  C.captions.push({ who, text, lang });
  const box = document.getElementById('captions'); if (!box) return;
  box.insertAdjacentHTML('beforeend', capHTML({ who, text, lang }));
  while (box.children.length > 6) box.firstElementChild.remove();
  box.scrollTop = box.scrollHeight;
  fit();
}

// Size Hana to the space that's left, so she never overlaps the top bar or the captions
// (short phones, landscape, or the keyboard being open).
function fit() {
  const stage = document.querySelector('.call-stage'); const m = document.querySelector('.call-hana .mascot');
  if (!stage || !m) return;
  const below = [...stage.children].filter((el) => !el.classList.contains('hana-wrap')).reduce((h, el) => h + el.offsetHeight + 6, 0);
  const size = Math.round(Math.max(72, Math.min(210, stage.clientHeight - below - 24)));
  m.style.setProperty('--s', `${size}px`);
  stage.classList.toggle('tight', size < 120);
}
window.addEventListener('resize', () => C && fit());
window.visualViewport?.addEventListener('resize', () => C && fit());
function setStatus() {
  const sub = document.getElementById('call-sub'); if (sub) sub.textContent = C.listening ? 'Listening…' : C.speaking ? (C.speaking === 'bit' ? 'Bit is talking' : 'Hana is talking') : 'Your turn';
  const rings = document.getElementById('rings'); if (rings) rings.className = `rings ${C.speaking ? `on ${C.speaking}` : ''}`;
  const mic = document.querySelector('[data-call="mic"]');
  if (mic) { mic.classList.toggle('live', C.listening); mic.innerHTML = `<span>${C.listening ? waves() : '🎙️'}</span><small>${C.listening ? 'Listening' : 'Talk'}</small>`; }
}
function setMood(m) {
  if (C.mood === m) return; C.mood = m;
  const h = document.getElementById('call-hana'); if (h) { h.innerHTML = mascot(m, 210); fit(); h.classList.remove('swap'); void h.offsetWidth; h.classList.add('swap'); }
}

/* ---------- ringing ---------- */
let AC;
function ringTone(t0) {
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    const t = AC.currentTime + t0;
    for (const [f, d] of [[440, 0], [480, 0]]) {
      const o = AC.createOscillator(); const g = AC.createGain(); o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t + d); g.gain.exponentialRampToValueAtTime(0.05, t + d + 0.05); g.gain.setValueAtTime(0.05, t + 0.9); g.gain.exponentialRampToValueAtTime(0.0001, t + 1);
      o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + 1.05);
    }
  } catch { /* no audio */ }
}
function ring() {
  if (S.sound) { ringTone(0); ringTone(1.6); }
  setTimeout(connect, 2400);
}

async function connect() {
  if (!C || C.ended) return;
  C.started = Date.now();
  C.timer = setInterval(() => { const el = document.getElementById('call-time'); if (el && C) el.textContent = fmt(Math.round((Date.now() - C.started) / 1000)); }, 1000);
  render();
  C.tutor = createTutor({ say: speakLine, action: onAction });
  const call = C;
  call.pickUp(call.tutor.greet().catch((e) => console.error('Hana greeting failed', e)));
  await call.queue;
  if (C === call) autoListen();
}

// Hana or Bit speaks a line (with captions, mood and speaking rings).
async function speakLine(text, { who = 'hana', mood, lang, speakOnly, caption } = {}) {
  if (!C || C.ended) return;
  if (mood) setMood(mood);
  addCaption(who, caption || text, speakOnly ? lang : null);
  if (C.muted) { await new Promise((r) => setTimeout(r, Math.min(2500, 400 + text.length * 25))); return; }
  C.speaking = who; setStatus();
  const voice = speakOnly ? null : hanaVoice(S.hanaVoice);
  const pitch = who === 'bit' ? 2 : speakOnly ? 1.05 : (HANA_PITCH[S.hanaPitch] || HANA_PITCH.bright);
  await say(text, { voice, lang: lang || 'en-US', pitch, rate: who === 'bit' ? 1.15 : speakOnly ? 0.8 : 0.98 });
  if (!C) return;
  C.speaking = null; setStatus();
}

async function onAction(a, d) {
  if (a === 'end') return end(true);
  if (a === 'lessonDone') return C.cb.onLessonDone?.(d);
  if (a === 'chess' || a === 'revise' || a === 'breathe') { const cb = C.cb; await new Promise((r) => setTimeout(r, 600)); end(false); setTimeout(() => cb[a]?.(), 60); }
}

// Messages are handled one at a time, so typing fast never makes Hana talk over herself.
function heard(text) {
  if (!C || !text?.trim()) return;
  addCaption('you', text.trim());
  const call = C;
  call.queue = call.queue.then(async () => { if (C === call && !call.ended) await call.tutor?.hear(text.trim()); })
    .catch((e) => console.error('Hana could not answer', e)); // keep the queue going for the next message
  return call.queue.then(() => { if (C === call) autoListen(); });
}

function autoListen() {
  if (!C || C.ended || C.typing || !S.handsFree || !canListen()) return;
  setTimeout(() => { if (C && !C.listening && !C.speaking) startListening(); }, 350);
}

async function startListening() {
  if (!C || C.listening) return;
  stopSpeaking(); C.speaking = null;
  C.listening = true; setStatus();
  try {
    const text = await listen({ lang: 'en-GB' });
    if (!C) return;
    C.listening = false; setStatus();
    if (text) await heard(text);
    else if (C && !C.ended) { const sub = document.getElementById('call-sub'); if (sub) sub.textContent = 'I didn\'t hear anything. Tap Talk to try again.'; }
  } catch (e) {
    if (!C) return;
    C.listening = false; setStatus();
    if (e?.message === 'denied') toast('Microphone permission is off. You can type instead.');
    else if (e?.message === 'unavailable') { toast('Voice input isn\'t available here. You can type instead.'); C.typing = true; render(); }
    else if (!C.ended) { const sub = document.getElementById('call-sub'); if (sub) sub.textContent = 'I didn\'t catch that. Tap Talk to try again, or type.'; }
  }
}

function end(spoken) {
  if (!C || C.ended) return;
  C.ended = true; clearInterval(C.timer); stopListening(); if (!spoken) stopSpeaking();
  const secs = C.started ? Math.round((Date.now() - C.started) / 1000) : 0;
  const cb = C.cb;
  setTimeout(() => { C = null; cb.onEnd?.(secs); }, spoken ? 900 : 0);
}

document.addEventListener('click', (e) => {
  if (!C) return;
  const t = e.target.closest('[data-call]'); if (!t) return;
  const a = t.dataset.call;
  if (a === 'end') return end(false);
  if (a === 'mic') { if (C.listening) { stopListening(); C.listening = false; setStatus(); } else startListening(); return; }
  if (a === 'type') { C.typing = !C.typing; render(); return; }
  if (a === 'speaker') { C.muted = !C.muted; S.voice = !C.muted; save(); if (C.muted) stopSpeaking(); render(); }
});
document.addEventListener('submit', (e) => {
  if (!C || e.target.id !== 'call-type') return;
  e.preventDefault(); e.stopImmediatePropagation();
  const inp = document.getElementById('call-input'); const v = inp.value; inp.value = '';
  heard(v);
}, true);
