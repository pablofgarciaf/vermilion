import fs from 'fs';
import path from 'path';

const tempDir = path.resolve('public/temp_catalog');
const dir169 = path.resolve('public/images/tours/16-9');
const dir916 = path.resolve('public/images/tours/9-16');

const realPhotoMappings = [
  {
    target169: 'galapagos-tortuga-gigante-16-9.webp',
    target916: 'galapagos-tortuga-gigante-9-16.webp',
    source: '16as-07-1.webp',
    backupSource: 'galatoursopt-01.webp',
    title: 'Galapagos Giant Tortoises'
  },
  {
    target169: 'quito-iglesia-de-san-francisco-16-9.webp',
    target916: 'quito-plaza-independencia-9-16.webp',
    source: 'plaza-san-francisco-casco-antiguo-quito-ecuador-1-2.webp',
    backupSource: 'nrew-11.webp',
    title: 'Quito Historic Center'
  },
  {
    target169: 'pailon-del-diablo-16-9.webp',
    target916: 'banos-cascada-9-16.webp',
    source: 'nrew-09.webp',
    backupSource: 'nrew-09.webp',
    title: 'Baños Pailón del Diablo'
  },
  {
    target169: 'cotopaxi-volcano-16-9.webp',
    target916: 'cotopaxi-volcano-9-16.webp',
    source: 'blogvolcan1.webp',
    backupSource: 'nrew-03.webp',
    title: 'Cotopaxi Volcano'
  },
  {
    target169: 'quilotoa-16-9.webp',
    target916: 'quilotoa-9-16.webp',
    source: 'banner_aboutus-2.webp',
    backupSource: 'nrew-02.webp',
    title: 'Quilotoa Crater Lagoon'
  },
  {
    target169: 'amazon-river-canoe-16-9.webp',
    target916: 'amazon-river-canoe-9-16.webp',
    source: 'blogvermi1.webp',
    backupSource: 'nrew-07.webp',
    title: 'Amazon Rainforest'
  },
  {
    target169: 'isabela-island-16-9.webp',
    target916: 'isabela-island-9-16.webp',
    source: 'SAN-CRISTOBAL-GALAPAGOS-2.webp',
    backupSource: '16as-09-1.webp',
    title: 'Isabela Island & Wildlife'
  },
  {
    target169: 'cajas-national-park-16-9.webp',
    target916: 'cajas-national-park-9-16.webp',
    source: 'nrew-05.webp',
    backupSource: 'nrew-06.webp',
    title: 'Cuenca Colonial & Cajas'
  },
  {
    target169: 'chimborazo-volcano-16-9.1.webp',
    target916: 'chimborazo-volcano-9-16.webp',
    source: '16as-05.webp',
    backupSource: 'nrew-04.webp',
    title: 'Chimborazo Volcano'
  },
  {
    target169: 'las-grietas-canyon-16-9.webp',
    target916: 'las-grietas-canyon-9-16.webp',
    source: '20170406_104637-2.webp',
    backupSource: 'galatoursopt-03.webp',
    title: 'Las Grietas Galapagos'
  }
];

console.log('=== DEPLOYING 100% AUTHENTIC COMPANY PHOTOS TO HERO SLIDES ===');

realPhotoMappings.forEach(m => {
  let srcFile = path.join(tempDir, m.source);
  if (!fs.existsSync(srcFile) && m.backupSource) {
    srcFile = path.join(tempDir, m.backupSource);
  }

  if (fs.existsSync(srcFile)) {
    const stat = fs.statSync(srcFile);
    // Copy to 16:9
    const dst169 = path.join(dir169, m.target169);
    fs.copyFileSync(srcFile, dst169);

    // Copy to 9:16
    const dst916 = path.join(dir916, m.target916);
    fs.copyFileSync(srcFile, dst916);

    console.log(`✅ [${m.title}] -> Deployed ${m.source} (${(stat.size / 1024).toFixed(1)} KB) to ${m.target169} & ${m.target916}`);
  } else {
    console.error(`❌ [${m.title}] Missing source file: ${m.source}`);
  }
});
