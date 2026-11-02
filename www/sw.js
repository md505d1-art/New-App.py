// Offline support: everything the app needs is cached on install, so lessons, chess and
// Hana all work with no connection.
const CACHE = 'sprout-v10';
const SHELL = [
 "./",
 "css/fonts.css",
 "css/style.css",
 "fonts/dmmono-latin-ext.woff2",
 "fonts/dmmono-latin.woff2",
 "fonts/plusjakartasans-latin-ext.woff2",
 "fonts/plusjakartasans-latin.woff2",
 "icons/apple-touch-icon.png",
 "icons/icon-192.png",
 "icons/icon-512.png",
 "icons/icon-maskable-512.png",
 "img/bit.webp",
 "img/hana-annoyed.webp",
 "img/hana-full.webp",
 "img/hana-happy.webp",
 "img/hana-think.webp",
 "img/pieces/bb.svg",
 "img/pieces/bk.svg",
 "img/pieces/bn.svg",
 "img/pieces/bp.svg",
 "img/pieces/bq.svg",
 "img/pieces/br.svg",
 "img/pieces/wb.svg",
 "img/pieces/wk.svg",
 "img/pieces/wn.svg",
 "img/pieces/wp.svg",
 "img/pieces/wq.svg",
 "img/pieces/wr.svg",
 "index.html",
 "js/app.js",
 "js/art.js",
 "js/avatar.js",
 "js/call.js",
 "js/chess-analysis.js",
 "js/chess-sound.js",
 "js/content/bsl.js",
 "js/content/gcse-more.js",
 "js/content/gcse.js",
 "js/content/languages.js",
 "js/courses.js",
 "js/engine-worker.js",
 "js/gambits.js",
 "js/game.js",
 "js/hana-ai.js",
 "js/lesson.js",
 "js/mascot.js",
 "js/persona.js",
 "js/review.js",
 "js/speech.js",
 "js/srs.js",
 "js/store.js",
 "js/tutor.js",
 "js/voice.js",
 "manifest.webmanifest",
 "vendor/chess.js"
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// Network first (so updates show up straight away), falling back to the cache when
// offline or when the connection is too slow to answer within a few seconds.
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const res = await Promise.race([fetch(req), new Promise((_, no) => setTimeout(() => no(new Error('slow')), 4000))]);
      if (res.ok) cache.put(req, res.clone());
      return res;
    } catch {
      const hit = await cache.match(req, { ignoreSearch: true });
      return hit || (req.mode === 'navigate' ? cache.match('index.html') : Response.error());
    }
  })());
});
