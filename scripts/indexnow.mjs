#!/usr/bin/env node
/**
 * Avisa a Bing (y a los buscadores que usan IndexNow: Yandex, Seznam, Naver)
 * de todas las URLs del sitemap de producción. ChatGPT y Copilot buscan con el
 * índice de Bing, así que esto acelera que las páginas nuevas aparezcan ahí.
 *
 * Uso:  npm run indexnow
 * La clave pública es el archivo public/<clave>.txt (no es un secreto: debe
 * poder leerse desde la web para que Bing verifique que el sitio es nuestro).
 */
const HOST = 'www.vermilionroutes.com';
const KEY = '1d2998eb0bce3ac9a1ac143e67be90f0';
const SITEMAP = `https://${HOST}/sitemap.xml`;

const xml = await (await fetch(SITEMAP)).text();
const urlList = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()))];
if (urlList.length === 0) {
  console.error('[IndexNow] El sitemap no tiene URLs; no se envía nada.');
  process.exit(1);
}

// IndexNow acepta hasta 10.000 URLs por envío.
const res = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});

if (res.ok) {
  console.log(`[IndexNow] ${urlList.length} URLs enviadas (HTTP ${res.status}).`);
} else {
  console.error(`[IndexNow] Error HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  process.exit(1);
}
