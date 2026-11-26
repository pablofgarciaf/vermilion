import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';

// Imagen ya preparada para jsPDF: JPEG/PNG real (las fuentes del proyecto son .webp).
export interface PdfImage {
  dataUrl: string;
  format: 'JPEG' | 'PNG';
  width: number;
  height: number;
  hash: string; // sha1 del archivo original: dos archivos con el mismo contenido cuentan como una sola foto
}

export const COVER_IMAGE_OPTS = { maxWidth: 1200, quality: 75, format: 'jpeg' as const };
export const DAY_IMAGE_OPTS = { maxWidth: 1200, quality: 75, format: 'jpeg' as const };
export const LOGO_IMAGE_OPTS = { maxWidth: 600, quality: 90, format: 'png' as const };

type ImageOpts = { maxWidth: number; quality: number; format: 'jpeg' | 'png' };

const cache = new Map<string, PdfImage | null>();

function resolvePublicPath(p: string): string {
  let clean = p;
  if (clean.startsWith('/')) clean = path.join('public', clean.slice(1));
  return path.resolve(clean);
}

// Carga, redimensiona (sin ampliar) y recomprime la imagen. Cacheado por ruta y opciones.
export async function loadPdfImage(p: string, opts: ImageOpts): Promise<PdfImage | null> {
  const key = `${p}|${opts.format}|${opts.maxWidth}|${opts.quality}`;
  if (cache.has(key)) return cache.get(key) ?? null;
  let result: PdfImage | null = null;
  try {
    const full = resolvePublicPath(p);
    if (fs.existsSync(full)) {
      const src = fs.readFileSync(full);
      const hash = crypto.createHash('sha1').update(src).digest('hex');
      let pipeline = sharp(src).rotate().resize({ width: opts.maxWidth, withoutEnlargement: true });
      if (opts.format === 'jpeg') {
        pipeline = pipeline.flatten({ background: '#ffffff' }).jpeg({ quality: opts.quality, mozjpeg: true });
      } else {
        pipeline = pipeline.png({ compressionLevel: 9 });
      }
      const { data, info } = await pipeline.toBuffer({ resolveWithObject: true });
      const isJpeg = opts.format === 'jpeg';
      result = {
        dataUrl: `data:image/${isJpeg ? 'jpeg' : 'png'};base64,${data.toString('base64')}`,
        format: isJpeg ? 'JPEG' : 'PNG',
        width: info.width,
        height: info.height,
        hash,
      };
    }
  } catch {
    result = null;
  }
  cache.set(key, result);
  return result;
}

// Control de repeticion: una misma foto (por contenido) nunca se usa dos veces en el PDF.
export class ImageUsage {
  private seen = new Set<string>();

  mark(img: PdfImage | null): void {
    if (img) this.seen.add(img.hash);
  }

  // Devuelve la imagen si aun no se uso en este PDF (y la marca), o null si ya estaba.
  claim(img: PdfImage | null): PdfImage | null {
    if (!img || this.seen.has(img.hash)) return null;
    this.seen.add(img.hash);
    return img;
  }
}

export function safeAddImage(doc: any, img: PdfImage | null, x: number, y: number, w: number, h: number): void {
  if (!img) return;
  try {
    doc.addImage(img.dataUrl, img.format, x, y, w, h);
  } catch {
    // imagen invalida: se omite sin romper el PDF
  }
}

// Dibuja la imagen cubriendo la caja (recorte centrado, sin deformar).
export function drawImageCover(doc: any, img: PdfImage, x: number, y: number, w: number, h: number): void {
  const scale = Math.max(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  const dx = x + (w - dw) / 2;
  const dy = y + (h - dh) / 2;
  doc.saveGraphicsState();
  doc.rect(x, y, w, h, null); // trayectoria de recorte: "re W n" (rect 'n' no emite W)
  doc.internal.write('W n');
  safeAddImage(doc, img, dx, dy, dw, dh);
  doc.restoreGraphicsState();
}
