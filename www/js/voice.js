// Voices for Hana (bright, feminine, US English — as close to "Kimberly" as the phone allows)
// and Bit (a chirpy little robot). Uses the phone's own voices, so it works offline.
import { S } from './store.js';
import { say, hanaVoice, stopSpeaking } from './speech.js';

const clean = (t) => String(t).replace(/<[^>]+>/g, ' ').replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, '').replace(/\s+/g, ' ').trim();
const listeners = new Set();
export const onSpeaking = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };
const emit = (who, on) => listeners.forEach((fn) => fn(who, on));

export const HANA_PITCH = { soft: 1.1, bright: 1.25, sweet: 1.38 };

export function hanaSay(text, { force = false } = {}) {
  if (!S.voice && !force) return Promise.resolve();
  return say(clean(text), { voice: hanaVoice(S.hanaVoice), lang: 'en-US', pitch: HANA_PITCH[S.hanaPitch] || HANA_PITCH.bright, rate: 0.98,
    onStart: () => emit('hana', true), onEnd: () => emit('hana', false) });
}

let AC;
function chirp() {
  if (!S.sound) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    let t = AC.currentTime;
    for (const f of [1320, 990, 1760]) {
      const o = AC.createOscillator(); const g = AC.createGain();
      o.type = 'square'; o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f * 1.3, t + 0.05);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.05, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
      o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + 0.08); t += 0.08;
    }
  } catch { /* no audio */ }
}
export async function bitSay(text, { force = false } = {}) {
  if (!S.voice && !force) return;
  chirp();
  await new Promise((r) => setTimeout(r, 260));
  return say(clean(text), { voice: hanaVoice(S.hanaVoice), lang: 'en-US', pitch: 2, rate: 1.18, onStart: () => emit('bit', true), onEnd: () => emit('bit', false) });
}
export const hush = () => stopSpeaking();

const HANA_LINES = ['Hi! Ready to learn something new?', 'One small step a day. You\'ve got this!', 'Want to call me? I can teach you anything in the app.', 'I believe in you!', 'Fancy a game of chess later?', 'Your garden is looking good!'];
const BIT_LINES = ['Beep boop! Systems ready!', 'Processing awesomeness.', 'Bit online. Let\'s learn!', 'Boop! Did someone say quiz?', 'My circuits love a streak.'];
export const hanaRandom = () => HANA_LINES[Math.floor(Math.random() * HANA_LINES.length)];
export const bitRandom = () => BIT_LINES[Math.floor(Math.random() * BIT_LINES.length)];
