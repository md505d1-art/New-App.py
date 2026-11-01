// Hand-drawn flat illustrations for Sprout: subject icons, the home scene, garden plants.
const W = '#ffffff';

// Each icon is drawn on a 64×64 canvas in white and soft tints, meant to sit on a coloured tile.
const ICONS = {
  math: (c) => `
    <rect x="7" y="7" width="22" height="22" rx="7" fill="${W}"/><rect x="35" y="7" width="22" height="22" rx="7" fill="${W}" opacity=".85"/>
    <rect x="7" y="35" width="22" height="22" rx="7" fill="${W}" opacity=".85"/><rect x="35" y="35" width="22" height="22" rx="7" fill="${W}"/>
    <path d="M18 12v12M12 18h12M40 18h12M41 41l10 10M51 41l-10 10M12 46h12" stroke="${c}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="18" cy="40.5" r="2.4" fill="${c}"/><circle cx="18" cy="51.5" r="2.4" fill="${c}"/>`,
  english: (c) => `
    <path d="M8 14q0-7 7-7h34q7 0 7 7v22q0 7-7 7H28l-11 10v-10h-2q-7 0-7-7z" fill="${W}"/>
    <text x="32" y="33" text-anchor="middle" font-family="Fredoka, Nunito, sans-serif" font-weight="700" font-size="21" fill="${c}">Aa</text>`,
  literature: (c) => `
    <path d="M32 16C24 10 14 10 6 12v38c8-2 18-2 26 4z" fill="${W}"/><path d="M32 16c8-6 18-6 26-4v38c-8-2-18-2-26 4z" fill="${W}" opacity=".85"/>
    <path d="M32 16v38" stroke="${c}" stroke-width="3"/>
    <path d="M12 22c5-1 10-1 14 1M12 30c5-1 10-1 14 1M12 38c5-1 10-1 14 1M38 23c4-2 9-2 14-1M38 31c4-2 9-2 14-1" stroke="${c}" stroke-width="2.6" stroke-linecap="round" opacity=".7"/>`,
  biology: (c) => `
    <path d="M30 58C8 50 6 22 52 6c6 30-4 48-22 52z" fill="${W}"/>
    <path d="M30 58C34 40 40 26 50 10M33 44l-10-4M37 34l12-2M41 25l-9-6" stroke="${c}" stroke-width="3" stroke-linecap="round" fill="none"/>`,
  chemistry: (c) => `
    <path d="M24 6h16M27 6v16L12 50q-3 8 6 8h28q9 0 6-8L37 22V6" fill="${W}" stroke="${W}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M16 44q8-5 16 0t16 0l4 7q2 5-5 5H17q-7 0-5-5z" fill="${c}" opacity=".8"/>
    <circle cx="26" cy="36" r="3" fill="${c}" opacity=".6"/><circle cx="35" cy="30" r="2.2" fill="${c}" opacity=".5"/><circle cx="38" cy="40" r="2.6" fill="${W}"/>`,
  physics: (c) => `
    <ellipse cx="32" cy="32" rx="26" ry="10" fill="none" stroke="${W}" stroke-width="4"/>
    <ellipse cx="32" cy="32" rx="26" ry="10" fill="none" stroke="${W}" stroke-width="4" transform="rotate(60 32 32)"/>
    <ellipse cx="32" cy="32" rx="26" ry="10" fill="none" stroke="${W}" stroke-width="4" transform="rotate(-60 32 32)"/>
    <circle cx="32" cy="32" r="6.5" fill="${W}"/><circle cx="32" cy="32" r="3" fill="${c}"/>`,
  geography: (c) => `
    <circle cx="32" cy="28" r="22" fill="${W}"/>
    <path d="M18 18q6-4 10 1t-2 9q-5 3-3 9-7-3-8-10t3-9zM36 12q8 1 12 8-5 1-6 6t4 8q-4 5-9 4 2-6-3-9t2-10q-2-4 0-7z" fill="${c}" opacity=".75"/>
    <path d="M32 50v8M22 58h20" stroke="${W}" stroke-width="4" stroke-linecap="round"/>`,
  history: (c) => `
    <rect x="12" y="12" width="40" height="40" rx="4" fill="${W}"/>
    <rect x="6" y="8" width="52" height="10" rx="5" fill="${W}" stroke="${c}" stroke-width="2.4"/><rect x="6" y="46" width="52" height="10" rx="5" fill="${W}" stroke="${c}" stroke-width="2.4"/>
    <path d="M20 26h24M20 32h24M20 38h16" stroke="${c}" stroke-width="2.6" stroke-linecap="round" opacity=".75"/>`,
  cs: (c) => `
    <rect x="10" y="10" width="44" height="30" rx="5" fill="${W}"/><rect x="15" y="15" width="34" height="20" rx="2" fill="${c}" opacity=".2"/>
    <path d="M4 46h56l-4 8H8z" fill="${W}"/>
    <path d="M26 20l-6 5 6 5M38 20l6 5-6 5M34 18l-4 14" stroke="${c}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  chess: () => `
    <text x="32" y="50" text-anchor="middle" font-size="46" fill="${W}" font-family="'Segoe UI Symbol','DejaVu Sans','Noto Sans Symbols 2',sans-serif">♞︎</text>
    <rect x="12" y="53" width="40" height="6" rx="3" fill="${W}"/>`,
  habit: (c) => `<circle cx="32" cy="32" r="24" fill="${W}"/><path d="M21 33l8 8 15-17" stroke="${c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  book: (c) => `<rect x="14" y="8" width="36" height="48" rx="5" fill="${W}"/><rect x="14" y="8" width="8" height="48" rx="3" fill="${c}" opacity=".35"/><path d="M28 20h16M28 27h12" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`,
};

export const COLORS = {
  green: ['#58cc02', '#46a302'], blue: ['#1cb0f6', '#1899d6'], purple: ['#ce82ff', '#a568cc'],
  red: ['#ff4b4b', '#ea2b2b'], yellow: ['#ffc800', '#e5a500'],
};

export function icon(name, color = 'green', size = 56) {
  const c = (COLORS[color] || COLORS.green)[1];
  const draw = ICONS[name] || ICONS.book;
  return `<svg class="ico" width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true">${draw(c)}</svg>`;
}

// Course badge: a tilted blob tile with the course's icon (or flag) on top.
export function badge(course, size = 64) {
  const [c, d] = COLORS[course.color] || COLORS.green;
  const inner = course.flag
    ? `<span class="flag-badge" style="font-size:${Math.round(size * 0.5)}px">${course.flag}</span>`
    : icon(course.icon, course.color, Math.round(size * 0.62));
  return `<span class="badge-tile" style="--bc:${c};--bd:${d};width:${size}px;height:${size}px">${inner}</span>`;
}

// Sky, sun, clouds and hills for the home screen. `hour` picks morning, day, evening or night.
export const isNight = (hour = new Date().getHours()) => hour < 6 || hour >= 21;

export function homeScene(hour = new Date().getHours()) {
  const t = hour < 6 || hour >= 21 ? 'night' : hour < 11 ? 'morning' : hour < 17 ? 'day' : 'evening';
  const sky = { morning: ['#bfe9ff', '#fff3c4'], day: ['#84d8ff', '#d6f3ff'], evening: ['#ffb38a', '#ffe0b3'], night: ['#1b2a4a', '#3b4f7a'] }[t];
  const orb = t === 'night'
    ? '<circle cx="300" cy="46" r="20" fill="#fff6d6"/><circle cx="310" cy="40" r="18" fill="#2a3a60"/><g class="twinkle" fill="#fff"><circle cx="60" cy="30" r="1.6"/><circle cx="120" cy="18" r="1.2"/><circle cx="210" cy="40" r="1.4"/><circle cx="250" cy="20" r="1"/><circle cx="350" cy="80" r="1.2"/></g>'
    : `<g class="sun"><circle cx="305" cy="48" r="22" fill="${t === 'evening' ? '#ff8a4c' : '#ffd23f'}"/><g class="rays" stroke="${t === 'evening' ? '#ff8a4c' : '#ffd23f'}" stroke-width="4" stroke-linecap="round" opacity=".7">
        <path d="M305 14v-8M305 90v-8M271 48h-8M347 48h-8M281 24l-6-6M335 78l-6-6M281 72l-6 6M335 18l-6 6"/></g></g>`;
  const cloud = (x, y, s, cls) => `<g class="cloud ${cls}" transform="translate(${x} ${y}) scale(${s})"><path d="M0 20q0-12 14-12 4-10 16-8 10 2 12 10 12 0 12 10z" fill="#fff" opacity="${t === 'night' ? 0.25 : 0.95}"/></g>`;
  const hillA = t === 'night' ? '#2f5d3a' : '#7ed957'; const hillB = t === 'night' ? '#244a2e' : '#58cc02';
  return `<svg class="scene" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><linearGradient id="skyg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient></defs>
    <rect width="400" height="200" fill="url(#skyg)"/>${orb}
    ${cloud(30, 30, 1.3, 'c1')}${cloud(170, 14, 0.9, 'c2')}${cloud(230, 70, 1.1, 'c3')}
    <path d="M0 150q80-50 170-20t230-10v80H0z" fill="${hillA}"/>
    <path d="M0 175q120-40 230-10t170 0v35H0z" fill="${hillB}"/>
    <g class="flowers">${[40, 95, 150, 330, 370].map((x, i) => `<g transform="translate(${x} ${178 + (i % 2) * 6})"><path d="M0 0v-10" stroke="#46a302" stroke-width="2"/><circle cy="-12" r="4" fill="${['#ff9eb0', '#ffc800', '#fff', '#ce82ff', '#ff9eb0'][i]}"/><circle cy="-12" r="1.6" fill="#ffc800"/></g>`).join('')}</g>
  </svg>`;
}

// A plant that grows with progress. stage 0..4 (seed → bloom). colour names the flower.
export function plant(stage, color = 'green', size = 88) {
  const [c, d] = COLORS[color] || COLORS.green;
  const soil = '<ellipse cx="40" cy="92" rx="26" ry="7" fill="#a0673c"/><ellipse cx="40" cy="90" rx="20" ry="4" fill="#c2834f"/>';
  const leaf = (x, y, r, flip) => {
    const dx = flip ? -22 : 22;
    return `<path d="M${x} ${y} q${dx * 0.8} -4 ${dx} ${-r} q${-dx * 0.2} ${r + 4} ${-dx} ${r}z" fill="#7ed957" stroke="#46a302" stroke-width="2" stroke-linejoin="round"/>`;
  };
  let body = '';
  if (stage === 0) body = '<ellipse cx="40" cy="86" rx="6" ry="4" fill="#7a4a26"/><path d="M40 84q-1-5 2-7" stroke="#58cc02" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
  if (stage >= 1) body += `<path d="M40 90V${stage === 1 ? 72 : stage === 2 ? 56 : 42}" stroke="#46a302" stroke-width="4" stroke-linecap="round"/>`;
  if (stage === 1) body += leaf(40, 76, 8, true) + leaf(40, 76, 8, false);
  if (stage >= 2) body += leaf(40, 80, 10, true) + leaf(40, 70, 10, false);
  if (stage >= 3) body += leaf(40, 60, 9, true);
  if (stage === 3) body += `<path d="M40 30q-8 6-6 14h12q2-8-6-14z" fill="${c}" stroke="${d}" stroke-width="2"/>`;
  if (stage >= 4) {
    body += [0, 72, 144, 216, 288].map((a) => `<ellipse cx="40" cy="26" rx="7" ry="12" fill="${c}" stroke="${d}" stroke-width="2" transform="rotate(${a} 40 38)"/>`).join('');
    body += '<circle cx="40" cy="38" r="7" fill="#ffc800" stroke="#e5a500" stroke-width="2"/>';
  }
  return `<svg class="plant stage-${stage}" width="${size}" height="${size * 1.25}" viewBox="0 0 80 100" aria-hidden="true">${soil}<g class="sway">${body}</g></svg>`;
}

// Decorative wavy band in a unit's colour, for chapter headers.
export function waves(color = 'green') {
  const [c, d] = COLORS[color] || COLORS.green;
  return `<svg class="waves" viewBox="0 0 300 40" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 20q37-14 75 0t75 0 75 0 75 0v20H0z" fill="${d}" opacity=".35"/><path d="M0 28q37-12 75 0t75 0 75 0 75 0v12H0z" fill="${c}"/></svg>`;
}
