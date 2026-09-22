import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\pablo\\.gemini\\antigravity\\brain\\69bf51f5-a3ae-4e4a-8f35-b7d0a1821fd4';
const dest169 = path.resolve('public/images/tours/16-9');
const dest916 = path.resolve('public/images/tours/9-16');

const image169Mappings = [
  {
    src: 'hero_galapagos_giant_tortoise_16_9_1787445749716.webp',
    target: 'galapagos-tortuga-gigante-16-9.webp'
  },
  {
    src: 'hero_quito_san_francisco_16_9_1787445778848.webp',
    target: 'quito-iglesia-de-san-francisco-16-9.webp'
  },
  {
    src: 'hero_pailon_del_diablo_waterfall_16_9_1787445802283.webp',
    target: 'pailon-del-diablo-16-9.webp'
  },
  {
    src: 'hero_cotopaxi_volcano_16_9_1787445837130.webp',
    target: 'cotopaxi-volcano-16-9.webp'
  },
  {
    src: 'hero_quilotoa_crater_lake_16_9_1787445859664.webp',
    target: 'quilotoa-16-9.webp'
  },
  {
    src: 'hero_amazon_rainforest_canoe_16_9_1787445885061.webp',
    target: 'amazon-river-canoe-16-9.webp'
  },
  {
    src: 'hero_isabela_tintoreras_wildlife_16_9_1787445895780.webp',
    target: 'isabela-island-16-9.webp'
  },
  {
    src: 'hero_cajas_cuenca_lakes_16_9_1787445902127.webp',
    target: 'cajas-national-park-16-9.webp'
  },
  {
    src: 'hero_chimborazo_summit_16_9_1787445907327.webp',
    target: 'chimborazo-volcano-16-9.1.webp'
  },
  {
    src: 'hero_las_grietas_galapagos_16_9_1787445963537.webp',
    target: 'las-grietas-canyon-16-9.webp'
  }
];

const image916Mappings = [
  {
    src: 'hero_galapagos_tortoise_9_16_1787446077583.webp',
    target: 'galapagos-tortuga-gigante-9-16.webp'
  },
  {
    src: 'hero_quito_san_francisco_9_16_1787446098048.webp',
    target: 'quito-plaza-independencia-9-16.webp'
  },
  {
    src: 'hero_pailon_del_diablo_9_16_1787446124707.webp',
    target: 'banos-cascada-9-16.webp'
  },
  {
    src: 'hero_cotopaxi_volcano_9_16_1787446144133.webp',
    target: 'cotopaxi-volcano-9-16.webp'
  },
  {
    src: 'hero_quilotoa_9_16_1787446162602.webp',
    target: 'quilotoa-9-16.webp'
  },
  {
    src: 'hero_amazon_9_16_1787446182181.webp',
    target: 'amazon-river-canoe-9-16.webp'
  },
  {
    src: 'hero_isabela_9_16_1787446200256.webp',
    target: 'isabela-island-9-16.webp'
  },
  {
    src: 'hero_cajas_9_16_1787446220815.webp',
    target: 'cajas-national-park-9-16.webp'
  },
  {
    src: 'hero_chimborazo_9_16_1787446241315.webp',
    target: 'chimborazo-volcano-9-16.webp'
  },
  {
    src: 'hero_las_grietas_9_16_1787446260904.webp',
    target: 'las-grietas-canyon-9-16.webp'
  }
];

console.log('=== COPYING EXACT 10 HERO SLIDE IMAGES ===');

image169Mappings.forEach(m => {
  const sourcePath = path.join(brainDir, m.src);
  const targetPath = path.join(dest169, m.target);
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`[16:9 OK] ${m.target} <= ${m.src}`);
  } else {
    console.error(`[16:9 MISSING] ${sourcePath}`);
  }
});

image916Mappings.forEach(m => {
  const sourcePath = path.join(brainDir, m.src);
  const targetPath = path.join(dest916, m.target);
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`[9:16 OK] ${m.target} <= ${m.src}`);
  } else {
    console.error(`[9:16 MISSING] ${sourcePath}`);
  }
});
