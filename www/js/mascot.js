// Hana — Sprout's guide, from the character sheet — and Bit, her floating triangle robot.
// mood: 'happy' | 'cheer' | 'think' | 'sad' | 'wave' (full body)
const POSE = { happy: 'hana-happy', cheer: 'hana-happy', think: 'hana-think', sad: 'hana-annoyed', wave: 'hana-full', full: 'hana-full' };

export function mascot(mood = 'happy', size = 120, { bit = true } = {}) {
  const pose = POSE[mood] || POSE.happy;
  const full = pose === 'hana-full';
  return `<span class="mascot m-${mood} ${full ? 'is-full' : ''}" style="--s:${size}px" role="img" aria-label="Hana${bit && !full ? ' and Bit' : ''}">
    <img class="hana-img" src="img/${pose}.webp" alt="" draggable="false" data-hana="1">
    ${bit && !full && size >= 56 ? '<img class="bit-img" src="img/bit.webp" alt="" draggable="false" data-bit="1">' : ''}
  </span>`;
}

export function bitIcon(size = 40) {
  return `<span class="bit-solo" style="--s:${size}px"><img src="img/bit.webp" alt="Bit" draggable="false" data-bit="1"></span>`;
}
