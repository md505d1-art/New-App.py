// One speech layer for the whole app.
// In the Android app (Capacitor) it uses the phone's native text-to-speech, because Android's WebView
// has no Web Speech API. In browsers it uses speechSynthesis.
const cap = typeof window !== 'undefined' ? window.Capacitor : null;
const isNative = !!cap?.isNativePlatform?.();
const plugin = (name) => (isNative && cap?.isPluginAvailable?.(name) ? (cap.registerPlugin ? cap.registerPlugin(name) : cap.Plugins?.[name]) : null);
const TTS = plugin('TextToSpeech');

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
      let started = false;
      u.onstart = () => { started = true; speakingCount++; onStart?.(); };
      u.onend = u.onerror = () => { if (started && speakingCount) done(); resolve(); };
      speechSynthesis.speak(u);
      // Safety nets: some browsers silently drop an utterance (it never starts), or never fire onend.
      setTimeout(() => { if (!started) resolve(); }, 4000);
      setTimeout(resolve, 15000 + t.length * 90);
    });
  } catch { if (speakingCount) done(); }
}
export function stopSpeaking() {
  try { if (TTS) TTS.stop(); else if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch { /* ignore */ }
  speakingCount = 0;
}
