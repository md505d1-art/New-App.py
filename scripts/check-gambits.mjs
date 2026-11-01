import { Chess } from '../www/vendor/chess.js';
import fs from 'fs';
const d = JSON.parse(fs.readFileSync(new URL('./gambits_data.json', import.meta.url)));
let bad = 0;
for (const [k, g] of Object.entries(d)) {
  const c = new Chess();
  try { for (const m of g.moves) c.move(m); } catch (e) { bad++; console.log('ILLEGAL', k, e.message); }
}
console.log('checked', Object.keys(d).length, 'bad', bad);
