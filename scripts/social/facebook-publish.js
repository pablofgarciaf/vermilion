#!/usr/bin/env node
/**
 * facebook-publish.js
 *
 * Publica contenido (texto, foto, video) en la página de Facebook de Vermilion Routes.
 * Usa la Graph API v21.0 con un Page Access Token almacenado en .env
 *
 * USO:
 *   node scripts/social/facebook-publish.js \
 *     --type post \
 *     --message "Texto del post" \
 *     --image "ruta/imagen.jpg"  (opcional)
 *
 *   node scripts/social/facebook-publish.js \
 *     --type video \
 *     --title "Título del video" \
 *     --description "Descripción" \
 *     --video "C:\ruta\video.mp4"
 *
 * REQUIERE en .env:
 *   FACEBOOK_PAGE_ACCESS_TOKEN=<token permanente de la página>
 *   FACEBOOK_PAGE_ID=<ID numérico de la página>
 *
 * VER: docs/runbooks/facebook-publish.md para cómo obtener el token.
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const https = require('https');
const FormData = require('form-data');

// === CONFIGURACIÓN ===
const PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
const PAGE_ID = process.env.FACEBOOK_PAGE_ID;
const GRAPH_API_VERSION = 'v21.0';
const GRAPH_API_BASE = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

// === VALIDACIÓN ===
if (!PAGE_ACCESS_TOKEN) {
  console.error('❌ FACEBOOK_PAGE_ACCESS_TOKEN no encontrado en .env');
  console.error('   Ver: docs/runbooks/facebook-publish.md para obtenerlo');
  process.exit(1);
}
if (!PAGE_ID) {
  console.error('❌ FACEBOOK_PAGE_ID no encontrado en .env');
  console.error('   Busca el ID numérico en: Facebook > Tu página > Acerca de > ID de página');
  process.exit(1);
}

// === PARSEAR ARGUMENTOS ===
const args = process.argv.slice(2);
const getArg = (name) => {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 ? args[idx + 1] : null;
};

const type = getArg('type') || 'post';
const message = getArg('message') || '';
const imagePath = getArg('image');
const videoPath = getArg('video');
const title = getArg('title') || '';
const description = getArg('description') || message;

// === HELPER: llamada a Graph API ===
function graphApiPost(endpoint, params) {
  return new Promise((resolve, reject) => {
    const url = `${GRAPH_API_BASE}/${endpoint}`;
    const body = JSON.stringify({ ...params, access_token: PAGE_ACCESS_TOKEN });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) {
            reject(new Error(`Graph API error: ${json.error.message} (code: ${json.error.code})`));
          } else {
            resolve(json);
          }
        } catch (e) {
          reject(new Error(`Parse error: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// === HELPER: subir foto a Facebook ===
async function uploadPhoto(imagePath, caption) {
  const form = new FormData();
  form.append('source', fs.createReadStream(imagePath));
  form.append('caption', caption);
  form.append('access_token', PAGE_ACCESS_TOKEN);

  const url = `${GRAPH_API_BASE}/${PAGE_ID}/photos`;

  return new Promise((resolve, reject) => {
    form.submit(url, (err, res) => {
      if (err) return reject(err);
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) {
            reject(new Error(`Upload error: ${json.error.message}`));
          } else {
            resolve(json);
          }
        } catch (e) {
          reject(new Error(`Parse error: ${data}`));
        }
      });
    });
  });
}

// === PUBLICAR SEGÚN TIPO ===
async function publish() {
  console.log(`📘 Publicando en Facebook (tipo: ${type})...`);
  console.log(`📄 Mensaje: ${message.substring(0, 60)}...`);

  let result;

  if (type === 'post' && !imagePath) {
    // === POST DE TEXTO ===
    if (!message) {
      console.error('❌ Se requiere --message para posts de texto');
      process.exit(1);
    }
    result = await graphApiPost(`${PAGE_ID}/feed`, { message });
    console.log(`✅ Post publicado: https://facebook.com/${result.id}`);

  } else if (type === 'post' && imagePath) {
    // === POST CON IMAGEN ===
    if (!fs.existsSync(imagePath)) {
      console.error(`❌ Imagen no encontrada: ${imagePath}`);
      process.exit(1);
    }
    const sizeMB = fs.statSync(imagePath).size / (1024 * 1024);
    if (sizeMB > 4) {
      console.error(`❌ Imagen demasiado grande: ${sizeMB.toFixed(1)}MB (máx 4MB)`);
      process.exit(1);
    }
    result = await uploadPhoto(imagePath, message);
    console.log(`✅ Foto publicada: https://facebook.com/${result.id}`);

  } else if (type === 'video') {
    // === VIDEO ===
    if (!videoPath || !fs.existsSync(videoPath)) {
      console.error(`❌ Video no encontrado: ${videoPath}`);
      process.exit(1);
    }
    const form = new FormData();
    form.append('source', fs.createReadStream(videoPath));
    form.append('title', title);
    form.append('description', description);
    form.append('access_token', PAGE_ACCESS_TOKEN);

    const url = `${GRAPH_API_BASE}/${PAGE_ID}/videos`;
    result = await new Promise((resolve, reject) => {
      form.submit(url, (err, res) => {
        if (err) return reject(err);
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          const json = JSON.parse(data);
          if (json.error) reject(new Error(json.error.message));
          else resolve(json);
        });
      });
    });
    console.log(`✅ Video publicado: ID ${result.id}`);

  } else {
    console.error(`❌ Tipo no reconocido: ${type}. Usa: post | video`);
    process.exit(1);
  }

  return result;
}

// === MAIN ===
publish()
  .then((result) => {
    console.log('\n✅ Publicación exitosa en Facebook');
    console.log('📊 Resultado:', JSON.stringify(result, null, 2));
    console.log('\n📌 Ver: docs/runbooks/facebook-publish.md');
  })
  .catch((err) => {
    console.error('\n❌ Error al publicar:', err.message);
    process.exit(1);
  });
