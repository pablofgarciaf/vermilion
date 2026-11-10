import fs from 'fs';
import path from 'path';
import { mockTours } from '../data/mock';
import { dailyTours } from '../data/dailyToursData';

const KB = path.resolve('C:/Users/pablo/hermes/projects/vermilion/tours-pdf');
const loc = (o: any, l = 'es') => (typeof o === 'string' ? o : o?.[l] || o?.es || o?.en || '');

function typeOf(t: any): string {
  if (t.durationDays === 1 || dailyTours.some(d => d.id === t.id)) return 'un-dia';
  const text = `${loc(t.title)} ${loc(t.title, 'en')}`;
  const gal = /galap/i.test(`${text} ${t.destination}`);
  if (gal && /andes|ecuador|amaz/i.test(text)) return 'combinados';
  if (gal) return 'galapagos';
  return 'ecuador';
}

for (const lang of ['es', 'en']) {
  let moved = 0;
  for (const t of mockTours) {
    const base = `Vermilion-Routes-${loc(t.title).replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-')}.pdf`;
    const src = path.join(KB, lang, base);
    if (!fs.existsSync(src)) { console.log('missing', lang, base); continue; }
    const dir = path.join(KB, lang, typeOf(t));
    fs.mkdirSync(dir, { recursive: true });
    fs.renameSync(src, path.join(dir, base));
    moved++;
  }
  console.log(lang, 'movidos:', moved);
}
