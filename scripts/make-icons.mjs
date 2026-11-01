// Renders Pip onto a green tile and writes PWA + Capacitor source icons.  Run: node scripts/make-icons.mjs
import { createRequire } from 'module';
const { chromium } = createRequire(import.meta.url)('playwright'); // resolves local or NODE_PATH install
import { mascot } from '../www/js/mascot.js';
const out = [
  ['www/icons/icon-192.png', 192, 0.78, 0.22], ['www/icons/icon-512.png', 512, 0.78, 0.22],
  ['www/icons/apple-touch-icon.png', 180, 0.78, 0], ['www/icons/icon-maskable-512.png', 512, 0.6, 0],
  ['assets/icon-only.png', 1024, 0.72, 0], ['assets/icon-foreground.png', 1024, 0.5, 0, true],
  ['assets/icon-background.png', 1024, 0, 0], ['assets/splash.png', 2732, 0.22, 0], ['assets/splash-dark.png', 2732, 0.22, 0, false, '#14121f'],
];
const b = await chromium.launch(); const p = await b.newPage();
for (const [file, size, scale, radius, transparent, bg = '#6c4ce0'] of out) {
  await p.setViewportSize({ width: size, height: size });
  const m = scale ? mascot('happy', Math.round(size * scale)) : '';
  await p.setContent(`<body style="margin:0;background:transparent"><div style="width:${size}px;height:${size}px;display:grid;place-items:center;
    background:${transparent ? 'transparent' : bg};border-radius:${radius * 100}%">${m}</div></body>`);
  await p.screenshot({ path: file, omitBackground: true });
  console.log('wrote', file);
}
await b.close();
