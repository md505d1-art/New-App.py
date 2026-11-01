// Voices for Hana (warm and friendly) and Bit (a chirpy little robot), using the phone's own voices.
// Works offline on most phones because the voices are installed on the device.
import { S } from './store.js';

let voices = [];
function load() { try { voices = speechSynthesis.getVoices() || []; } catch { voices = []; } }
if ('speechSynthesis' in window) { load(); speechSynthesis.addEventListener?.('voiceschanged', load); }

const FEMALE = /female|samantha|karen|serena|moira|tessa|fiona|victoria|zira|aria|jenny|libby|sonia|hazel|susan|kate|emma|amy|olivia|natasha|catherine|allison|ava|google uk english female|google us english/i;
function english(prefer) {
  const en = voices.filter((v) => /^en[-_]/i.test(v.lang) || v.lang === 'en');
  return en.find((v) => prefer.test(v.name) && /gb|uk/i.test(v.lang)) || en.find((v) => prefer.test(v.name)) || en.find((v) => /gb/i.test(v.lang)) || en[0] || null;
}

const clean = (t) => String(t).replace(/<[^>]+>/g, ' ').replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '').replace(/\s+/g, ' ').trim();

function say(text, { pitch, rate, voice }) {
  if (!S.voice || !('speechSynthesis' in window)) return;
  const t = clean(text); if (!t) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    const v = voice(); if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'en-GB';
    u.pitch = pitch; u.rate = rate;
    speechSynthesis.speak(u);
  } catch { /* speech unavailable */ }
}

export function hanaSay(text) { say(text, { pitch: 1.12, rate: 1.02, voice: () => english(FEMALE) }); }

// Bit chirps, then speaks in a high robotic voice.
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
export function bitSay(text) { chirp(); setTimeout(() => say(text, { pitch: 1.95, rate: 1.18, voice: () => english(/./) }), 260); }

const HANA_LINES = ['Hi! Ready to learn something new?', 'One small step a day. You\'ve got this!', 'Let\'s smash a lesson together.', 'I believe in you!', 'Want to play some chess later?', 'Your garden is looking good!'];
const BIT_LINES = ['Beep boop! Systems ready!', 'Processing awesomeness.', 'Bit online. Let\'s learn!', 'Boop! Did someone say quiz?', 'My circuits love a streak.'];
export const hanaRandom = () => HANA_LINES[Math.floor(Math.random() * HANA_LINES.length)];
export const bitRandom = () => BIT_LINES[Math.floor(Math.random() * BIT_LINES.length)];
