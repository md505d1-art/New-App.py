// App icons and splash screens: Hana in front of a warm halo on a purple gradient, a sprout growing from her hair,
// Bit floating beside her. Writes the web app icons and the Capacitor sources (assets/), from which the Android
// icons are generated in CI.  Run: NODE_PATH=$(npm root -g) node scripts/make-icons.mjs
import { createRequire } from 'module';
import fs from 'fs';
const { chromium } = createRequire(import.meta.url)('playwright'); // resolves local or NODE_PATH install
const b64 = (f) => `data:image/png;base64,${fs.readFileSync(new URL(`../${f}`, import.meta.url)).toString('base64')}`;
const hana = b64('assets/hana-icon.png'), bit = b64('assets/bit-icon.png'); // full-resolution cut-outs of the character art
// layout: content scale k (1 = full icon), bg on/off, rounded corners r
const html = (size, { k = 1, bg = true, fg = true, r = 0 } = {}) => `<!doctype html><html><body style="margin:0;background:transparent">
<div style="--z:${size / 100}px;width:${size}px;height:${size}px;position:relative;overflow:hidden;border-radius:${r}%;
  ${bg ? `background:
    radial-gradient(circle at 82% 96%, rgba(255,146,92,.55) 0, rgba(255,146,92,0) 42%),
    radial-gradient(circle at 26% 18%, #a68bff 0, #7352ec 38%, #4a2bc4 72%, #2f1a8c 100%);` : ''}">
  ${bg ? `<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.16),rgba(255,255,255,0) 38%)"></div>` : ''}
  ${fg ? `<div style="position:absolute;inset:0;transform:scale(${k});transform-origin:50% 50%">
    <!-- halo -->
    <div style="position:absolute;left:50%;top:47%;width:calc(var(--z)*72);height:calc(var(--z)*72);transform:translate(-50%,-50%);border-radius:50%;
      background:radial-gradient(circle at 38% 32%, #fff6e6 0, #ffe0ad 42%, #ffb874 78%, #ff9d5c 100%);
      box-shadow:0 0 calc(var(--z)*8) calc(var(--z)*1) rgba(255,190,120,.55), inset 0 calc(var(--z)*-2) calc(var(--z)*4) rgba(255,120,60,.35)"></div>
    <div style="position:absolute;left:50%;top:47%;width:calc(var(--z)*84);height:calc(var(--z)*84);transform:translate(-50%,-50%);border-radius:50%;border:calc(var(--z)*.9) solid rgba(255,255,255,.22)"></div>
    <!-- sprout -->
    <svg viewBox="0 0 100 100" style="position:absolute;left:calc(var(--z)*60);top:calc(var(--z)*1);width:calc(var(--z)*28);height:calc(var(--z)*28);transform:rotate(14deg)">
      <defs><linearGradient id="lf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8ff0a8"/><stop offset="1" stop-color="#1fa45f"/></linearGradient>
        <linearGradient id="lf2" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b6f7c4"/><stop offset="1" stop-color="#2bb36c"/></linearGradient></defs>
      <path d="M48 96 C48 78 50 62 56 48" stroke="#1d8f52" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M55 50 C40 50 16 42 10 14 C38 12 56 28 55 50 Z" fill="url(#lf)" stroke="#167a45" stroke-width="2.5"/>
      <path d="M56 48 C62 28 78 14 96 18 C94 42 76 54 56 48 Z" fill="url(#lf2)" stroke="#167a45" stroke-width="2.5"/>
      <path d="M53 47 C40 40 26 30 18 20" stroke="#ffffff" stroke-opacity=".55" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    </svg>
    <!-- Hana -->
    <img src="${hana}" style="position:absolute;left:50%;bottom:calc(var(--z)*-13);width:calc(var(--z)*92);transform:translateX(-50%);filter:drop-shadow(0 calc(var(--z)*1.2) calc(var(--z)*2) rgba(30,10,90,.35))">
    <!-- Bit -->
    <img src="${bit}" style="position:absolute;left:calc(var(--z)*4);top:calc(var(--z)*12);width:calc(var(--z)*26);transform:rotate(-10deg);filter:drop-shadow(0 0 calc(var(--z)*2.4) rgba(80,230,255,.75))">
    <!-- sparkles -->
    ${[[86, 46, 5.5], [9, 52, 4], [30, 6, 3.2], [92, 72, 3]].map(([x, y, s]) => `<svg viewBox="0 0 10 10" style="position:absolute;left:calc(var(--z)*${x});top:calc(var(--z)*${y});width:calc(var(--z)*${s});height:calc(var(--z)*${s})"><path d="M5 0 Q5.6 4.4 10 5 Q5.6 5.6 5 10 Q4.4 5.6 0 5 Q4.4 4.4 5 0Z" fill="#fff"/></svg>`).join('')}
  </div>` : ''}
</div></body></html>`;

const splash = (size, bg, tile) => `<body style="margin:0"><div style="width:${size}px;height:${size}px;display:grid;place-items:center;background:${bg}">
  <img src="${tile}" style="width:${Math.round(size * 0.24)}px;border-radius:22.5%;box-shadow:0 ${size / 80}px ${size / 25}px rgba(20,8,70,.45)"></div></body>`;
const OUT = [ // file, size, options
  // Home screen icons must be solid edge to edge: iOS rounds the corners itself and turns see-through pixels black.
  ['www/icons/apple-touch-icon-v2.png', 180, {}], ['www/icons/icon-192-v2.png', 192, {}], ['www/icons/icon-512-v2.png', 512, {}],
  ['www/icons/icon-maskable-512-v2.png', 512, { k: 0.8 }], // Android may crop to a circle: keep everything in the safe zone
  ['assets/icon-only.png', 1024, {}], ['assets/icon-foreground.png', 1024, { bg: false, k: 0.62 }], ['assets/icon-background.png', 1024, { fg: false }],
];
const b = await chromium.launch(); const p = await b.newPage();
for (const [file, size, opts] of OUT) {
  await p.setViewportSize({ width: size, height: size }); await p.setContent(html(size, opts)); await p.waitForTimeout(50);
  await p.screenshot({ path: file, omitBackground: true }); console.log('wrote', file);
}
await p.setViewportSize({ width: 1024, height: 1024 }); await p.setContent(html(1024)); await p.waitForTimeout(50);
const tile = `data:image/png;base64,${(await p.screenshot()).toString('base64')}`;
for (const [file, bg] of [['assets/splash.png', 'radial-gradient(circle at 50% 40%, #f4efff, #e4dafd)'], ['assets/splash-dark.png', 'radial-gradient(circle at 50% 40%, #241f3a, #14121f)']]) {
  await p.setViewportSize({ width: 2732, height: 2732 }); await p.setContent(splash(2732, bg, tile)); await p.waitForTimeout(80);
  await p.screenshot({ path: file }); console.log('wrote', file);
}
// Older file names keep working (with the new picture) in case a phone still has an old copy of the page.
for (const n of ['apple-touch-icon', 'icon-192', 'icon-512', 'icon-maskable-512']) fs.copyFileSync(new URL(`../www/icons/${n}-v2.png`, import.meta.url), new URL(`../www/icons/${n}.png`, import.meta.url));
fs.copyFileSync(new URL('../www/icons/apple-touch-icon-v2.png', import.meta.url), new URL('../www/apple-touch-icon.png', import.meta.url));
await b.close();
