// Pip the sprout — Sprout's original mascot, drawn as inline SVG.
// mood: 'happy' | 'cheer' | 'sad' | 'think'
export function mascot(mood = 'happy', size = 120) {
  const mouth = {
    happy: '<path d="M48 78 Q60 90 72 78" stroke="#3d2b1f" stroke-width="4" fill="#ff7a8a" stroke-linecap="round"/>',
    cheer: '<path d="M44 74 Q60 98 76 74 Z" fill="#3d2b1f"/><path d="M52 84 Q60 92 68 84 Q60 80 52 84Z" fill="#ff7a8a"/>',
    sad: '<path d="M50 86 Q60 78 70 86" stroke="#3d2b1f" stroke-width="4" fill="none" stroke-linecap="round"/>',
    think: '<path d="M52 82 L68 80" stroke="#3d2b1f" stroke-width="4" stroke-linecap="round"/>',
  }[mood];
  const arms = mood === 'cheer'
    ? '<path d="M22 70 Q8 52 12 38" stroke="#46a302" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M98 70 Q112 52 108 38" stroke="#46a302" stroke-width="9" fill="none" stroke-linecap="round"/>'
    : '<path d="M22 76 Q10 84 14 96" stroke="#46a302" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M98 76 Q110 84 106 96" stroke="#46a302" stroke-width="9" fill="none" stroke-linecap="round"/>';
  const pupilY = mood === 'sad' ? 62 : mood === 'think' ? 56 : 60;
  const brows = mood === 'sad'
    ? '<path d="M34 44 L50 48" stroke="#3d2b1f" stroke-width="4" stroke-linecap="round"/><path d="M86 44 L70 48" stroke="#3d2b1f" stroke-width="4" stroke-linecap="round"/>'
    : '';
  return `<svg class="mascot mascot-${mood}" width="${size}" height="${size}" viewBox="0 0 120 130" role="img" aria-label="Pip the sprout">
    <ellipse cx="60" cy="124" rx="34" ry="5" fill="rgba(0,0,0,.12)"/>
    <path d="M60 30 Q58 16 60 8" stroke="#46a302" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path class="leaf-l" d="M60 12 Q38 -2 28 14 Q44 26 60 12Z" fill="#89e219" stroke="#46a302" stroke-width="3" stroke-linejoin="round"/>
    <path class="leaf-r" d="M60 12 Q82 -2 92 14 Q76 26 60 12Z" fill="#89e219" stroke="#46a302" stroke-width="3" stroke-linejoin="round"/>
    ${arms}
    <path d="M60 26 C92 26 104 52 104 78 C104 106 86 120 60 120 C34 120 16 106 16 78 C16 52 28 26 60 26Z" fill="#58cc02" stroke="#46a302" stroke-width="4"/>
    <ellipse cx="60" cy="96" rx="26" ry="18" fill="#a5ed6e"/>
    <path d="M34 108 Q30 122 40 122" stroke="#46a302" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M86 108 Q90 122 80 122" stroke="#46a302" stroke-width="7" fill="none" stroke-linecap="round"/>
    ${brows}
    <ellipse cx="44" cy="60" rx="12" ry="13" fill="#fff"/>
    <ellipse cx="76" cy="60" rx="12" ry="13" fill="#fff"/>
    <circle cx="${mood === 'think' ? 48 : 46}" cy="${pupilY}" r="6.5" fill="#3d2b1f"/>
    <circle cx="${mood === 'think' ? 80 : 78}" cy="${pupilY}" r="6.5" fill="#3d2b1f"/>
    <circle cx="${mood === 'think' ? 50 : 48}" cy="${pupilY - 3}" r="2.2" fill="#fff"/>
    <circle cx="${mood === 'think' ? 82 : 80}" cy="${pupilY - 3}" r="2.2" fill="#fff"/>
    <ellipse cx="30" cy="76" rx="6" ry="4" fill="#ff9eb0" opacity=".8"/>
    <ellipse cx="90" cy="76" rx="6" ry="4" fill="#ff9eb0" opacity=".8"/>
    ${mouth}
  </svg>`;
}
