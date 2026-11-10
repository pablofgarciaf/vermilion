// Reporta textos de tours (incluye, no incluye, descripcion corta) que superan el limite.
// Uso: node scripts/check-tour-text-length.mjs
// Limites de referencia: item de incluye/no incluye <= 110 caracteres; descripcion corta <= 200.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FILE = join(ROOT, 'data', 'mock.ts');
const LIMITS = { inclusions: 110, exclusions: 110, description: 200 };
const LANGS = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'zh'];
const STR_RE = /\b(en|es|fr|de|it|pt|ja|zh): '((?:[^'\\]|\\.)*)'/g;

const lines = readFileSync(FILE, 'utf8').split(/\r?\n/);
let tourId = '?';
let section = '';
const over = [];
const counts = {};
for (const l of LANGS) counts[l] = { checked: 0, over: 0 };

lines.forEach((line, idx) => {
  const idMatch = line.match(/^ {4}id: '([^']+)'/);
  if (idMatch) tourId = idMatch[1];
  const keyMatch = line.match(/^ {4}(\w+): [[{]/);
  if (keyMatch) section = keyMatch[1];
  if (!(section in LIMITS)) return;
  for (const m of line.matchAll(STR_RE)) {
    const [, lang, raw] = m;
    const text = raw.replace(/\\(.)/g, '$1');
    const len = [...text].length;
    counts[lang].checked++;
    if (len > LIMITS[section]) {
      counts[lang].over++;
      over.push({ tourId, section, lang, len, limit: LIMITS[section], line: idx + 1, text });
    }
  }
});

console.log('Idioma | revisados | por encima del limite');
for (const l of LANGS) console.log(`${l.padEnd(6)} | ${String(counts[l].checked).padStart(9)} | ${counts[l].over}`);
console.log(`\nTotal por encima del limite: ${over.length}`);
for (const o of over) {
  console.log(`- [${o.lang}] ${o.tourId} / ${o.section} linea ${o.line}: ${o.len}>${o.limit} :: ${o.text}`);
}
process.exitCode = over.length ? 1 : 0;
