// Board sounds made with the Web Audio API: wooden "tock" moves, sharper captures, a check ding, and so on.
import { S } from './store.js';

let AC = null; let noise = null;
function ctx() {
  if (!AC) {
    AC = new (window.AudioContext || window.webkitAudioContext)();
    noise = AC.createBuffer(1, AC.sampleRate * 0.25, AC.sampleRate);
    const d = noise.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3);
  }
  if (AC.state === 'suspended') AC.resume();
  return AC;
}

// A short knock: filtered noise + a low thump.
function knock(t, { freq = 1700, q = 1.4, gain = 0.5, thump = 170, len = 0.07 } = {}) {
  const a = ctx();
  const src = a.createBufferSource(); src.buffer = noise;
  const bp = a.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = freq; bp.Q.value = q;
  const g = a.createGain(); g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.001, t + len);
  src.connect(bp); bp.connect(g); g.connect(a.destination); src.start(t); src.stop(t + len + 0.02);
  const o = a.createOscillator(); const og = a.createGain();
  o.type = 'sine'; o.frequency.setValueAtTime(thump, t); o.frequency.exponentialRampToValueAtTime(thump * 0.6, t + 0.05);
  og.gain.setValueAtTime(gain * 0.5, t); og.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
  o.connect(og); og.connect(a.destination); o.start(t); o.stop(t + 0.08);
}
function tone(t, f, len, type = 'sine', gain = 0.12) {
  const a = ctx(); const o = a.createOscillator(); const g = a.createGain();
  o.type = type; o.frequency.value = f; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + len);
  o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + len + 0.02);
}

const play = (fn) => { if (!S.sound) return; try { fn(ctx().currentTime); } catch { /* audio unavailable */ } };

export const chessSound = {
  move: () => play((t) => knock(t)),
  capture: () => play((t) => { knock(t, { freq: 2600, gain: 0.65, len: 0.05 }); knock(t + 0.045, { freq: 1500, gain: 0.45, thump: 140 }); }),
  castle: () => play((t) => { knock(t); knock(t + 0.11, { freq: 1500 }); }),
  check: () => play((t) => { knock(t, { gain: 0.4 }); tone(t + 0.02, 988, 0.35, 'triangle', 0.12); tone(t + 0.02, 1976, 0.25, 'sine', 0.04); }),
  promote: () => play((t) => { knock(t); [784, 988, 1319].forEach((f, i) => tone(t + 0.06 + i * 0.07, f, 0.18, 'triangle', 0.09)); }),
  start: () => play((t) => { tone(t, 659, 0.18, 'triangle'); tone(t + 0.12, 988, 0.3, 'triangle'); }),
  end: () => play((t) => { [523, 659, 784, 1047].forEach((f, i) => tone(t + i * 0.1, f, 0.3, 'triangle', 0.1)); }),
  illegal: () => play((t) => tone(t, 130, 0.14, 'square', 0.06)),
  notify: () => play((t) => { tone(t, 1319, 0.12, 'sine', 0.08); tone(t + 0.08, 1760, 0.16, 'sine', 0.06); }),
};

export function soundFor(move, inCheck) {
  if (inCheck) return chessSound.check();
  if (move.promotion) return chessSound.promote();
  if (move.flags.includes('k') || move.flags.includes('q')) return chessSound.castle();
  if (move.captured) return chessSound.capture();
  return chessSound.move();
}
