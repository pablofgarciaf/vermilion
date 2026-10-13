#!/usr/bin/env node
/**
 * IndexNow: avisa a Bing, Yandex, Seznam y otros buscadores de que las URLs del sitemap
 * cambiaron (resuelve el aviso "Changed pages not submitted to IndexNow" de Ahrefs).
 *
 * Uso:
 *   npm run indexnow                 -> DRY-RUN: lista cuantas URLs enviaria, no envia nada
 *   npm run indexnow -- --submit     -> envia de verdad a https://api.indexnow.org/IndexNow
 *   npm run indexnow -- --submit --only=/en/tours   (filtra por prefijo de ruta)
 *
 * Ejecutar DESPUES de desplegar a produccion, para que el archivo de clave y las paginas
 * ya respondan en https://www.vermilionroutes.com.
 *
 * La clave NO es secreta: IndexNow la publica a proposito como public/<clave>.txt para que
 * el buscador verifique que el dominio es tuyo.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HOST = 'www.vermilionroutes.com';
const SITE = `https://${HOST}`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';
const BATCH_SIZE = 10000;

const publicDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

/** Encuentra public/<32 hex>.txt cuyo contenido es exactamente su nombre. */
function findKey() {
  for (const file of readdirSync(publicDir)) {
    const match = file.match(/^([a-f0-9]{32})\.txt$/);
    if (match && readFileSync(join(publicDir, file), 'utf8').trim() === match[1]) return match[1];
  }
  throw new Error('No hay archivo de clave IndexNow en public/ (<clave>.txt con la clave dentro).');
}

async function readSitemapUrls() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml respondio ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const args = process.argv.slice(2);
const submit = args.includes('--submit');
const only = (args.find((a) => a.startsWith('--only=')) || '').replace('--only=', '');

const key = findKey();
let urls = await readSitemapUrls();
if (only) urls = urls.filter((u) => new URL(u).pathname.startsWith(only));
urls = urls.filter((u) => new URL(u).hostname === HOST);

console.log(`Clave IndexNow : ${key}`);
console.log(`keyLocation    : ${SITE}/${key}.txt`);
console.log(`URLs a enviar  : ${urls.length}`);

if (!submit) {
  console.log('\nDRY-RUN: no se envio nada. Agrega --submit para enviar de verdad.');
  process.exit(0);
}

for (let i = 0; i < urls.length; i += BATCH_SIZE) {
  const batch = urls.slice(i, i + BATCH_SIZE);
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key, keyLocation: `${SITE}/${key}.txt`, urlList: batch }),
  });
  // 200/202 = aceptado. 422 = URLs que no pertenecen al host; 403 = clave no verificable.
  console.log(`Lote ${i / BATCH_SIZE + 1}: ${batch.length} URLs -> HTTP ${res.status}`);
  if (![200, 202].includes(res.status)) {
    console.error(await res.text());
    process.exit(1);
  }
}
console.log('Listo.');
