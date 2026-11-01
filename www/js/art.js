// Flat pastel illustrations for Sprout: topic icons, card thumbnails, the key-idea scene, the medal, garden plants.

// name → [solid, deep, pastel]
export const COLORS = {
  purple: ['#6c4ce0', '#5136c4', '#ede7ff'],
  blue: ['#3b82f6', '#2563d8', '#e3eefe'],
  green: ['#2fa36b', '#21865a', '#e1f5ea'],
  red: ['#ef5a5a', '#d63f3f', '#fde6e4'],
  yellow: ['#f0a020', '#d98a0b', '#fff1d6'],
};
export const col = (name) => COLORS[name] || COLORS.purple;

// Icons on a 64×64 canvas. m = main shape colour, c = detail colour.
const ICONS = {
  math: (m, c) => `
    <rect x="7" y="7" width="22" height="22" rx="7" fill="${m}"/><rect x="35" y="7" width="22" height="22" rx="7" fill="${m}" opacity=".75"/>
    <rect x="7" y="35" width="22" height="22" rx="7" fill="${m}" opacity=".75"/><rect x="35" y="35" width="22" height="22" rx="7" fill="${m}"/>
    <path d="M18 12v12M12 18h12M40 18h12M41 41l10 10M51 41l-10 10M12 46h12" stroke="${c}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="18" cy="40.5" r="2.4" fill="${c}"/><circle cx="18" cy="51.5" r="2.4" fill="${c}"/>`,
  english: (m, c) => `
    <path d="M8 14q0-7 7-7h34q7 0 7 7v22q0 7-7 7H28l-11 10v-10h-2q-7 0-7-7z" fill="${m}"/>
    <text x="32" y="33" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="20" fill="${c}">Aa</text>`,
  literature: (m, c) => `
    <path d="M32 16C24 10 14 10 6 12v38c8-2 18-2 26 4z" fill="${m}"/><path d="M32 16c8-6 18-6 26-4v38c-8-2-18-2-26 4z" fill="${m}" opacity=".8"/>
    <path d="M32 16v38" stroke="${c}" stroke-width="3"/>
    <path d="M12 22c5-1 10-1 14 1M12 30c5-1 10-1 14 1M12 38c5-1 10-1 14 1M38 23c4-2 9-2 14-1M38 31c4-2 9-2 14-1" stroke="${c}" stroke-width="2.6" stroke-linecap="round" opacity=".85"/>`,
  biology: (m, c) => `
    <path d="M30 58C8 50 6 22 52 6c6 30-4 48-22 52z" fill="${m}"/>
    <path d="M30 58C34 40 40 26 50 10M33 44l-10-4M37 34l12-2M41 25l-9-6" stroke="${c}" stroke-width="3" stroke-linecap="round" fill="none"/>`,
  chemistry: (m, c) => `
    <path d="M24 6h16M27 6v16L12 50q-3 8 6 8h28q9 0 6-8L37 22V6" fill="${m}" stroke="${m}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M16 44q8-5 16 0t16 0l4 7q2 5-5 5H17q-7 0-5-5z" fill="${c}" opacity=".75"/>
    <circle cx="26" cy="36" r="3" fill="${c}"/><circle cx="35" cy="30" r="2.2" fill="${c}" opacity=".8"/>`,
  physics: (m, c) => `
    <ellipse cx="32" cy="32" rx="26" ry="10" fill="none" stroke="${m}" stroke-width="4"/>
    <ellipse cx="32" cy="32" rx="26" ry="10" fill="none" stroke="${m}" stroke-width="4" transform="rotate(60 32 32)"/>
    <ellipse cx="32" cy="32" rx="26" ry="10" fill="none" stroke="${m}" stroke-width="4" transform="rotate(-60 32 32)"/>
    <circle cx="32" cy="32" r="6.5" fill="${m}"/><circle cx="32" cy="32" r="2.6" fill="${c}"/>`,
  geography: (m, c) => `
    <circle cx="32" cy="28" r="22" fill="${m}"/>
    <path d="M18 18q6-4 10 1t-2 9q-5 3-3 9-7-3-8-10t3-9zM36 12q8 1 12 8-5 1-6 6t4 8q-4 5-9 4 2-6-3-9t2-10q-2-4 0-7z" fill="${c}" opacity=".85"/>
    <path d="M32 50v8M22 58h20" stroke="${m}" stroke-width="4" stroke-linecap="round"/>`,
  history: (m, c) => `
    <rect x="12" y="12" width="40" height="40" rx="4" fill="${m}" opacity=".85"/>
    <rect x="6" y="8" width="52" height="10" rx="5" fill="${m}"/><rect x="6" y="46" width="52" height="10" rx="5" fill="${m}"/>
    <path d="M20 26h24M20 32h24M20 38h16" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/>`,
  cs: (m, c) => `
    <rect x="10" y="10" width="44" height="30" rx="5" fill="${m}"/><rect x="15" y="15" width="34" height="20" rx="2" fill="${c}" opacity=".35"/>
    <path d="M4 46h56l-4 8H8z" fill="${m}"/>
    <path d="M26 20l-6 5 6 5M38 20l6 5-6 5M34 18l-4 14" stroke="${c}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  chess: (m) => `
    <text x="32" y="50" text-anchor="middle" font-size="46" fill="${m}" font-family="'Segoe UI Symbol','DejaVu Sans','Noto Sans Symbols 2',sans-serif">♞︎</text>
    <rect x="12" y="53" width="40" height="6" rx="3" fill="${m}"/>`,
  habit: (m, c) => `<circle cx="32" cy="32" r="24" fill="${m}"/><path d="M21 33l8 8 15-17" stroke="${c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  book: (m, c) => `<path d="M32 16C24 10 14 10 6 12v38c8-2 18-2 26 4z" fill="${m}"/><path d="M32 16c8-6 18-6 26-4v38c-8-2-18-2-26 4z" fill="${m}" opacity=".75"/><path d="M32 16v38" stroke="${c}" stroke-width="3"/>`,
  target: (m) => `<circle cx="32" cy="32" r="24" fill="none" stroke="${m}" stroke-width="5"/><circle cx="32" cy="32" r="14" fill="none" stroke="${m}" stroke-width="5"/><circle cx="32" cy="32" r="5" fill="${m}"/><path d="M34 30l18-18M46 10h8v8" stroke="${m}" stroke-width="4" stroke-linecap="round" fill="none"/>`,
  flame: (m) => `<path d="M32 6c4 10 16 16 16 32a16 16 0 01-32 0c0-8 4-12 8-16 0 6 3 9 6 9-2-9 0-17 2-25z" fill="${m}"/><path d="M32 34c3 4 7 6 7 12a7 7 0 01-14 0c0-4 3-6 4-9 1 3 2 4 3 4 0-3-1-5 0-7z" fill="#ffd2a8"/>`,
};

export function icon(name, color = 'purple', size = 56, onSolid = false) {
  const [solid, , pastel] = col(color);
  const draw = ICONS[name] || ICONS.book;
  return `<svg class="ico" width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true">${onSolid ? draw('#fff', solid) : draw(solid, pastel)}</svg>`;
}

// Course badge: a pastel rounded square with the course icon (or flag).
export function badge(course, size = 56) {
  const [, , pastel] = col(course.color);
  const inner = (course.flag || course.glyph)
    ? `<span class="flag-badge" style="font-size:${Math.round(size * 0.5)}px">${course.flag || course.glyph}</span>`
    : icon(course.icon, course.color, Math.round(size * 0.58));
  return `<span class="badge-tile" style="background:${pastel};width:${size}px;height:${size}px">${inner}</span>`;
}

// Card thumbnail: layered hills and a sun in the course's colours.
let tid = 0;
export function thumb(color = 'purple') {
  const [solid, deep, pastel] = col(color); const id = `t${++tid}`;
  return `<svg class="thumb" viewBox="0 0 120 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${pastel}"/><stop offset="1" stop-color="#fff4ec"/></linearGradient></defs>
    <rect width="120" height="100" fill="url(#${id})"/>
    <circle class="sun-dot" cx="64" cy="46" r="18" fill="#ffb08a" opacity=".9"/>
    <path d="M0 62 Q30 40 62 58 T120 50 V100 H0Z" fill="${solid}" opacity=".35"/>
    <path d="M0 74 Q40 54 78 70 T120 66 V100 H0Z" fill="${solid}" opacity=".6"/>
    <path d="M0 86 Q36 72 70 84 T120 82 V100 H0Z" fill="${deep}"/>
  </svg>`;
}

// Wide "key idea" scene: soft hills, a sun, steps and a sprout on the top step.
export function ideaScene(color = 'purple') {
  const [solid, deep, pastel] = col(color);
  return `<svg class="idea-scene" viewBox="0 0 340 110" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <circle class="sun-dot" cx="120" cy="74" r="28" fill="#ffd3b4"/>
    <path d="M0 80 Q70 40 150 72 T340 58 V110 H0Z" fill="${solid}" opacity=".22"/>
    <path d="M0 96 Q90 66 180 90 T340 84 V110 H0Z" fill="${solid}" opacity=".4"/>
    <path d="M170 110 V98 H210 V86 H250 V74 H290 V62 H340 V110Z" fill="${deep}" opacity=".85"/>
    <g class="sprout-grow" transform="translate(312 62)">
      <path d="M0 0 V-24" stroke="#2fa36b" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M0 -14 Q-16 -18 -20 -32 Q-4 -30 0 -14Z" fill="#45c07f"/><path d="M0 -20 Q14 -26 22 -40 Q4 -40 0 -20Z" fill="#2fa36b"/>
    </g>
    <rect width="340" height="110" fill="${pastel}" opacity="0"/>
  </svg>`;
}

// The "Great job!" medal with sparkles.
export function medal(text = 'Great job!', size = 120) {
  return `<svg class="medal" width="${size}" height="${size}" viewBox="0 0 120 120" aria-hidden="true">
    <g class="sparks" stroke-linecap="round" stroke-width="3.5">
      <path d="M22 26l6 6" stroke="#5b3fd6"/><path d="M98 26l-6 6" stroke="#5b3fd6"/><path d="M60 4v8" stroke="#ffb02e"/><path d="M14 54h8" stroke="#ffb02e"/><path d="M106 54h-8" stroke="#ffb02e"/><path d="M34 10l3 7" stroke="#ff7a59"/><path d="M86 10l-3 7" stroke="#ff7a59"/>
    </g>
    <path d="M30 70 Q60 84 90 70 L96 92 Q60 104 24 92Z" fill="#cdbdff"/>
    <circle cx="60" cy="50" r="30" fill="#ffb02e"/><circle cx="60" cy="50" r="23" fill="#ffc94d" stroke="#f29a10" stroke-width="3"/>
    <path d="M60 34l5 10.5 11.5 1.5-8.5 8 2.2 11.5L60 60l-10.2 5.5L52 54l-8.5-8L55 44.5z" fill="#fff4d6" stroke="#f29a10" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M18 84 Q60 98 102 84 L98 104 Q60 116 22 104Z" fill="#ffe9cf"/>
    <text x="60" y="103" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="12.5" fill="#3b2a12">${text}</text>
  </svg>`;
}

export function sun(size = 34) {
  return `<svg class="sun-ico" width="${size}" height="${size}" viewBox="0 0 40 40" aria-hidden="true"><g class="rays" stroke="#ffb02e" stroke-width="3" stroke-linecap="round">
    <path d="M20 2v5M20 33v5M2 20h5M33 20h5M7 7l3.5 3.5M29.5 29.5L33 33M7 33l3.5-3.5M29.5 10.5L33 7"/></g><circle cx="20" cy="20" r="9" fill="#ffc94d"/></svg>`;
}

// A plant that grows with progress. stage 0..4 (seed → bloom).
export function plant(stage, color = 'green', size = 70) {
  const [c, d] = col(color);
  const soil = '<ellipse cx="40" cy="92" rx="24" ry="6" fill="#d9cbb8"/><ellipse cx="40" cy="90" rx="18" ry="3.5" fill="#e8dccb"/>';
  const leaf = (x, y, r, flip) => {
    const dx = flip ? -22 : 22;
    return `<path d="M${x} ${y} q${dx * 0.8} -4 ${dx} ${-r} q${-dx * 0.2} ${r + 4} ${-dx} ${r}z" fill="#45c07f"/>`;
  };
  let body = '';
  if (stage === 0) body = '<ellipse cx="40" cy="86" rx="6" ry="4" fill="#a07b5a"/><path d="M40 84q-1-5 2-7" stroke="#2fa36b" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
  if (stage >= 1) body += `<path d="M40 90V${stage === 1 ? 72 : stage === 2 ? 56 : 42}" stroke="#2fa36b" stroke-width="4" stroke-linecap="round"/>`;
  if (stage === 1) body += leaf(40, 76, 8, true) + leaf(40, 76, 8, false);
  if (stage >= 2) body += leaf(40, 80, 10, true) + leaf(40, 70, 10, false);
  if (stage >= 3) body += leaf(40, 60, 9, true);
  if (stage === 3) body += `<path d="M40 30q-8 6-6 14h12q2-8-6-14z" fill="${c}"/>`;
  if (stage >= 4) {
    body += [0, 72, 144, 216, 288].map((a) => `<ellipse cx="40" cy="26" rx="7" ry="12" fill="${c}" transform="rotate(${a} 40 38)"/>`).join('');
    body += `<circle cx="40" cy="38" r="7" fill="#ffc94d" stroke="${d}" stroke-width="1.5"/>`;
  }
  return `<svg class="plant stage-${stage}" width="${size}" height="${size * 1.25}" viewBox="0 0 80 100" aria-hidden="true">${soil}<g class="sway">${body}</g></svg>`;
}
