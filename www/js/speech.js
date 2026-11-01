// One speech layer for the whole app.
// In the Android app (Capacitor) it uses the phone's native text-to-speech and speech recognition,
// because Android's WebView has no Web Speech API. In browsers it uses speechSynthesis / SpeechRecognition.
const cap = typeof window !== 'undefined' ? window.Capacitor : null;
const isNative = !!cap?.isNativePlatform?.();
const plugin = (name) => (isNative && cap?.isPluginAvailable?.(name) ? (cap.registerPlugin ? cap.registerPlugin(name) : cap.Plugins?.[name]) : null);
const TTS = plugin('TextToSpeech');
const STT = plugin('SpeechRecognition');
const WebRec = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;

// voices: [{ name, lang, index (native) | voice (web) }]
let voices = [];
let readyResolve; export const voicesReady = new Promise((r) => { readyResolve = r; });
async function loadVoices() {
  try {
    if (TTS) {
      const { voices: list } = await TTS.getSupportedVoices();
      voices = (list || []).map((v, index) => ({ name: v.name || v.voiceURI, lang: (v.lang || '').replace('_', '-'), index }));
    } else if ('speechSynthesis' in window) {
      voices = speechSynthesis.getVoices().map((v) => ({ name: v.name, lang: v.lang.replace('_', '-'), voice: v }));
    }
  } catch { voices = []; }
  if (voices.length) readyResolve(voices);
}
if (typeof window !== 'undefined') {
  loadVoices();
  if (!TTS && 'speechSynthesis' in window) speechSynthesis.addEventListener?.('voiceschanged', loadVoices);
  setTimeout(() => readyResolve(voices), 2500);
}

export const allVoices = () => voices;
export function voiceForLang(lang) {
  if (!lang) return null;
  const want = lang.toLowerCase(); const base = want.split('-')[0];
  return voices.find((v) => v.lang.toLowerCase() === want) || voices.find((v) => v.lang.toLowerCase().startsWith(base)) || null;
}
export const hasVoiceFor = (lang) => !!voiceForLang(lang);

// Hana: the most "Kimberly"-like voice available — a bright US English female voice.
const KIMBERLY = [/kimberly/i, /ava|samantha|allison|joanna|salli|kendra|zoe|susan|nicky|aria|jenny|michelle|emma \(|google us english|en-us-x-(sfg|tpc|iob|iog|tpf)/i, /female/i];
export function hanaVoice(preferName) {
  if (preferName) { const v = voices.find((x) => x.name === preferName); if (v) return v; }
  const us = voices.filter((v) => /^en-us/i.test(v.lang)); const en = voices.filter((v) => /^en/i.test(v.lang));
  for (const re of KIMBERLY) { const v = us.find((x) => re.test(x.name)) || en.find((x) => re.test(x.name)); if (v) return v; }
  return us.find((v) => !/male|david|mark|guy|daniel|fred|alex|tpd|iom|iol/i.test(v.name)) || us[0] || en[0] || null;
}
export const englishVoices = () => voices.filter((v) => /^en/i.test(v.lang));

let speakingCount = 0;
export const isSpeaking = () => speakingCount > 0;

// Speak text. Resolves when finished (or immediately if speech isn't available).
export async function say(text, { lang = 'en-US', voice = null, pitch = 1, rate = 1, onStart, onEnd } = {}) {
  const t = String(text || '').trim(); if (!t) return;
  const v = voice || voiceForLang(lang);
  const done = () => { speakingCount = Math.max(0, speakingCount - 1); onEnd?.(); };
  try {
    if (TTS) {
      speakingCount++; onStart?.();
      await TTS.stop().catch(() => {});
      await TTS.speak({ text: t, lang: v?.lang || lang, rate, pitch, volume: 1, voice: v?.index, queueStrategy: 0 });
      done();
      return;
    }
    if (!('speechSynthesis' in window)) return;
    await new Promise((resolve) => {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(t);
      if (v?.voice) { u.voice = v.voice; u.lang = v.voice.lang; } else u.lang = lang;
      u.pitch = pitch; u.rate = rate;
      u.onstart = () => { speakingCount++; onStart?.(); };
      u.onend = u.onerror = () => { if (speakingCount) done(); resolve(); };
      speechSynthesis.speak(u);
      setTimeout(resolve, 15000 + t.length * 90); // safety net if onend never fires
    });
  } catch { if (speakingCount) done(); }
}
export function stopSpeaking() {
  try { if (TTS) TTS.stop(); else if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch { /* ignore */ }
  speakingCount = 0;
}

/* ---------- listening ---------- */
export const canListen = () => !!STT || !!WebRec;
let webRec = null;
export async function listen({ lang = 'en-GB' } = {}) {
  if (STT) {
    const ok = await STT.available().catch(() => ({ available: false }));
    if (!ok.available) throw new Error('unavailable');
    const perm = await STT.requestPermissions().catch(() => null);
    if (perm && perm.speechRecognition && perm.speechRecognition !== 'granted') throw new Error('denied');
    const res = await STT.start({ language: lang, maxResults: 3, partialResults: false, popup: false });
    return (res?.matches || [])[0] || '';
  }
  if (!WebRec) throw new Error('unavailable');
  return new Promise((resolve, reject) => {
    webRec = new WebRec(); webRec.lang = lang; webRec.interimResults = false; webRec.maxAlternatives = 3;
    let got = '';
    webRec.onresult = (e) => { got = e.results[0][0].transcript; };
    webRec.onerror = (e) => reject(new Error(e.error || 'error'));
    webRec.onend = () => { webRec = null; resolve(got); };
    webRec.start();
  });
}
export function stopListening() {
  try { if (STT) STT.stop(); else webRec?.stop(); } catch { /* ignore */ }
}
