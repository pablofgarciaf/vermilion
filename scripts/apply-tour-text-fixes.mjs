// Aplica en data/mock.ts (CRLF se conserva) tres ajustes de textos de tours:
//  1. Niveles de hotel: 3★/4★ (y 3*/4*, 3星级/4星级, 3-star) pasan a "Club" / "VIP" en los 8 idiomas.
//  2. Elimina el item "Autobús Lobito Eco-Shuttle" de incluye (solo ese bloque de objeto).
//  3. Sustituye textos largos por las versiones acortadas de scripts/tour-text-shortening.json
//     (clave = texto visible sin escapar, valor = nuevo texto visible sin escapar).
// Uso: node scripts/apply-tour-text-fixes.mjs
// Es idempotente: si ya se aplico, no encuentra nada que cambiar y no toca el archivo.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FILE = join(ROOT, 'data', 'mock.ts');
const SHORTEN = join(ROOT, 'scripts', 'tour-text-shortening.json');

const HOTEL_RULES = [
  // Forma japonesa con espacio antes de la palabra "ホテル" y de los parentesis
  ['3★または4★', 'Club または VIP'],
  ['4★ホテル', 'VIP ホテル'],
  ['3★ホテル', 'Club ホテル'],
  // Chino
  ['3星级或4星级', 'Club 或 VIP'],
  ['4星级', 'VIP '],
  ['3星级', 'Club '],
  // Estrellas numericas
  ['3★', 'Club'],
  ['4★', 'VIP'],
  ['3*', 'Club'],
  ['4*', 'VIP'],
  ['3-star', 'Club'],
  ['4-star', 'VIP'],
];

const lines = readFileSync(FILE, 'utf8').split('\r\n');
let changes = { hotel: 0, lobito: 0, shorten: 0 };

// 1. Niveles de hotel
for (let i = 0; i < lines.length; i++) {
  if (!/★|\*|星级|-star/.test(lines[i])) continue;
  let next = lines[i];
  for (const [from, to] of HOTEL_RULES) next = next.split(from).join(to);
  // Colapsa espacios dobles que deja el cambio, sin tocar la sangria inicial de la linea
  next = next.replace(/(\S) {2,}/g, '$1 ').replace(/ ([）)])/g, '$1');
  if (next !== lines[i]) {
    lines[i] = next;
    changes.hotel++;
  }
}

// 2. Quitar "Autobús Lobito Eco-Shuttle" de incluye (bloque de objeto de 8 idiomas)
for (let i = 0; i < lines.length; i++) {
  if (!/^\s+en: 'Autobús Lobito Eco-Shuttle/.test(lines[i])) continue;
  const open = i - 1;
  const close = i + 8;
  if (lines[open].trim() !== '{' || !/^\s+\}/.test(lines[close])) {
    throw new Error(`Estructura inesperada del bloque Lobito en linea ${i + 1}`);
  }
  lines.splice(open, close - open + 1);
  i = open - 1;
  changes.lobito++;
}

let text = lines.join('\r\n');

// 3. Textos acortados (clave y valor sin escapar; en el archivo las comillas simples van como \')
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const shorten = JSON.parse(readFileSync(SHORTEN, 'utf8'));
for (const [oldText, newText] of Object.entries(shorten)) {
  const from = esc(oldText);
  const to = esc(newText);
  const count = text.split(from).length - 1;
  if (count === 0) {
    // Ya aplicado (el texto nuevo ya existe) o clave mal copiada: se avisa para revisar
    if (!text.includes(to)) console.warn(`AVISO: no encontrado: ${oldText.slice(0, 80)}...`);
    continue;
  }
  text = text.split(from).join(to);
  changes.shorten += count;
}

const original = readFileSync(FILE, 'utf8');
if (text !== original) {
  writeFileSync(FILE, text, 'utf8');
}
console.log(`Lineas con niveles de hotel cambiadas: ${changes.hotel}`);
console.log(`Bloques Lobito eliminados: ${changes.lobito}`);
console.log(`Ocurrencias acortadas: ${changes.shorten}`);
console.log(text !== original ? 'data/mock.ts actualizado (CRLF conservado).' : 'Sin cambios.');
