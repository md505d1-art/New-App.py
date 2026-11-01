// Offline support: everything the app needs is cached on install, so lessons, chess and
// Hana all work with no connection. Cache-first, refreshed in the background when online.
const CACHE = 'sprout-v6';
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
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.open(CACHE).then(async (cache) => {
    const hit = await cache.match(e.request, { ignoreSearch: true });
    const net = fetch(e.request).then((res) => {
      if (res.ok || res.type === 'opaque') cache.put(e.request, res.clone());
      return res;
    }).catch(() => hit || (e.request.mode === 'navigate' ? cache.match('index.html') : undefined));
    return hit || net;
  }));
});
