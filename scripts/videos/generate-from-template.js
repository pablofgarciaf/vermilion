#!/usr/bin/env node
/**
 * generate-from-template.js
 *
 * Genera un video MP4 a partir de un template HTML existente.
 * Diseñado para ser usado por modelos pequeños (Haiku) sin necesitar HyperFrames skills.
 *
 * USO:
 *   node scripts/videos/generate-from-template.js \
 *     --template bf-announcement \
 *     --output output/mi-video.mp4 \
 *     --vars '{"headline":"30% OFF","deadline":"Nov 30"}'
 *
 * TEMPLATES DISPONIBLES (en scratchpad o en scripts/videos/templates/):
 *   - bf-announcement   → 30% OFF con 3 imágenes de fondo
 *   - bf-countdown      → "X HOURS LEFT" con urgencia
 *   - bf-testimonial    → Review de viajero con precio
 *
 * REQUIERE:
 *   - Node.js
 *   - npx hyperframes (instalado en el proyecto)
 *   - ffmpeg en PATH
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// === CONFIGURACIÓN ===
const TEMPLATES_DIR = path.join(__dirname, 'templates');
// Videos van a Redes Sociales, NO dentro del repo (son archivos grandes)
const OUTPUT_DIR = 'C:\\Users\\pablo\\OneDrive\\Desktop\\Redes Sociales\\Vermilion Routes\\TikTok_Campañas';

// === PARSEAR ARGUMENTOS ===
const args = process.argv.slice(2);
const getArg = (name) => {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 ? args[idx + 1] : null;
};

const templateName = getArg('template');
const outputPath = getArg('output') || path.join(OUTPUT_DIR, `${templateName}-${Date.now()}.mp4`);
const varsStr = getArg('vars') || '{}';
const vars = JSON.parse(varsStr);

if (!templateName) {
  console.error('❌ Error: --template es requerido');
  console.error('   Ejemplo: node generate-from-template.js --template bf-announcement');
  process.exit(1);
}

// === ENCONTRAR TEMPLATE ===
const templatePath = path.join(TEMPLATES_DIR, templateName, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error(`❌ Template no encontrado: ${templatePath}`);
  console.error(`   Templates disponibles:`);
  if (fs.existsSync(TEMPLATES_DIR)) {
    fs.readdirSync(TEMPLATES_DIR).forEach(d => console.error(`   - ${d}`));
  }
  process.exit(1);
}

// === REEMPLAZAR VARIABLES EN HTML ===
let html = fs.readFileSync(templatePath, 'utf8');

Object.entries(vars).forEach(([key, value]) => {
  // Reemplaza {{key}} en el HTML con el valor
  html = html.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
});

// Crear HTML temporal con variables aplicadas
const tmpDir = path.join(__dirname, '../../.tmp-video-gen');
fs.mkdirSync(tmpDir, { recursive: true });
const tmpHtml = path.join(tmpDir, `${templateName}-${Date.now()}.html`);
fs.writeFileSync(tmpHtml, html);

console.log(`✅ Template cargado: ${templateName}`);
console.log(`📝 Variables aplicadas:`, vars);
console.log(`📁 HTML temporal: ${tmpHtml}`);

// === RENDERIZAR CON HYPERFRAMES ===
console.log(`🎬 Renderizando video...`);
try {
  execSync(`npx hyperframes render --input "${tmpHtml}" --output "${outputPath}"`, {
    stdio: 'inherit',
    cwd: path.join(__dirname, '../..')
  });
  console.log(`✅ Video renderizado: ${outputPath}`);
} catch (err) {
  console.error(`❌ Error en render:`, err.message);
  fs.unlinkSync(tmpHtml);
  process.exit(1);
}

// === COMPRIMIR PARA UPLOAD (si > 10MB) ===
const stats = fs.statSync(outputPath);
const sizeMB = stats.size / (1024 * 1024);
console.log(`📦 Tamaño: ${sizeMB.toFixed(2)} MB`);

if (sizeMB > 9.5) {
  console.log(`⚡ Comprimiendo para upload (> 9.5 MB)...`);
  const compressed = outputPath.replace('.mp4', '-upload.mp4');
  execSync(`ffmpeg -i "${outputPath}" -c:v libx264 -crf 26 -preset fast -c:a aac -b:a 96k "${compressed}" -y`, {
    stdio: 'inherit'
  });
  console.log(`✅ Versión comprimida: ${compressed}`);
  console.log(`📤 Usar este archivo para subir a TikTok: ${compressed}`);
} else {
  console.log(`📤 Usar para subir a TikTok: ${outputPath}`);
}

// Limpiar tmp
fs.unlinkSync(tmpHtml);
console.log(`\n✅ Listo. Seguir runbook: docs/runbooks/tiktok-upload.md`);
