import { PdfImage, safeAddImage } from './pdf-images';

// Estado compartido de la pagina en curso (posicion vertical y utilidades de salto de pagina).
export interface PdfCtx {
  doc: any;
  family: string;
  logo: PdfImage | null;
  y: number;
  readonly pageWidth: number;
  readonly pageHeight: number;
  readonly marginX: number;
  readonly contentWidth: number;
  newPage(): void;
  ensure(neededHeight: number): void;
}

function paintBackground(ctx: PdfCtx): void {
  ctx.doc.setFillColor(250, 249, 246);
  ctx.doc.rect(0, 0, ctx.pageWidth, ctx.pageHeight, 'F');
}

export function createCtx(doc: any, family: string, logo: PdfImage | null): PdfCtx {
  const ctx: PdfCtx = {
    doc,
    family,
    logo,
    y: 32,
    pageWidth: 210,
    pageHeight: 297,
    marginX: 14,
    contentWidth: 182,
    newPage() {
      doc.addPage();
      paintBackground(ctx);
      drawHeaderBand(ctx);
      ctx.y = 35;
    },
    ensure(neededHeight: number) {
      if (ctx.y + neededHeight > ctx.pageHeight - 16) ctx.newPage();
    },
  };
  paintBackground(ctx);
  drawHeaderBand(ctx);
  return ctx;
}

export function drawHeaderBand(ctx: PdfCtx): void {
  const doc = ctx.doc;
  const { pageWidth, marginX, family } = ctx;
  const headerH = 28;
  doc.setFillColor(27, 67, 50);
  doc.rect(0, 0, pageWidth, 3.5, 'F');
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 3.5, pageWidth, headerH - 3.5, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(0, headerH, pageWidth, headerH);

  if (ctx.logo) {
    const logoW = 46;
    const logoH = 15;
    const logoY = 3.5 + ((headerH - 3.5 - logoH) / 2);
    safeAddImage(doc, ctx.logo, marginX, logoY, logoW, logoH);
  }

  const cX = 142;
  const cY0 = 9.0;
  const cGap = 6.2;

  // Telefono
  doc.setFillColor(27, 67, 50);
  doc.roundedRect(cX, cY0 - 3.0, 3.8, 3.8, 0.7, 0.7, 'F');
  doc.setFillColor(255, 255, 255);
  doc.rect(cX + 1.1, cY0 - 2.3, 1.6, 2.0, 'F');
  doc.setFillColor(27, 67, 50);
  doc.circle(cX + 1.9, cY0 - 0.7, 0.25, 'F');
  doc.setFont(family, 'normal');
  doc.setFontSize(7.6);
  doc.setTextColor(30, 41, 59);
  doc.text('+(593) 96-003-9156', cX + 5.5, cY0);

  // Email
  doc.setFillColor(27, 67, 50);
  doc.roundedRect(cX, cY0 + cGap - 3.0, 3.8, 3.0, 0.5, 0.5, 'F');
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.28);
  doc.line(cX + 0.3, cY0 + cGap - 2.8, cX + 1.9, cY0 + cGap - 1.4);
  doc.line(cX + 3.5, cY0 + cGap - 2.8, cX + 1.9, cY0 + cGap - 1.4);
  doc.setFont(family, 'normal');
  doc.setFontSize(7.6);
  doc.setTextColor(30, 41, 59);
  doc.text('info@vermilionroutes.com', cX + 5.5, cY0 + cGap);

  // Web
  doc.setFillColor(27, 67, 50);
  doc.circle(cX + 1.9, cY0 + (cGap * 2) - 1.4, 1.9, 'F');
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.22);
  doc.line(cX, cY0 + (cGap * 2) - 1.4, cX + 3.8, cY0 + (cGap * 2) - 1.4);
  doc.line(cX + 1.9, cY0 + (cGap * 2) - 3.3, cX + 1.9, cY0 + (cGap * 2) + 0.5);
  doc.setFont(family, 'normal');
  doc.setFontSize(7.6);
  doc.setTextColor(30, 41, 59);
  doc.text('www.vermilionroutes.com', cX + 5.5, cY0 + (cGap * 2));
}

// Titulo de seccion con filete verde; avanza ctx.y.
export function drawSectionTitle(ctx: PdfCtx, text: string, size: number, advance: number): void {
  const doc = ctx.doc;
  doc.setFont(ctx.family, 'bold');
  doc.setFontSize(size);
  doc.setTextColor(6, 78, 59);
  doc.text(text, ctx.marginX, ctx.y);
  doc.setDrawColor(167, 243, 208);
  doc.setLineWidth(0.8);
  doc.line(ctx.marginX, ctx.y + 2, ctx.marginX + ctx.contentWidth, ctx.y + 2);
  ctx.y += advance;
}

// Dibuja lineas con interlineado fijo (no el de jsPDF) para que coincida con el calculo de altura.
export function drawLines(doc: any, lines: string[], x: number, y: number, lineH: number): void {
  lines.forEach((line, i) => doc.text(line, x, y + i * lineH));
}

// Etiqueta en negrita + valor. El valor empieza despues del ancho REAL de la etiqueta (getTextWidth)
// y, si es largo, se parte dentro del ancho restante. Devuelve la nueva posicion Y.
export function drawLabelValue(
  ctx: PdfCtx, label: string, value: string, x: number, y: number, maxW: number, draw: boolean
): number {
  const doc = ctx.doc;
  doc.setFont(ctx.family, 'bold');
  doc.setFontSize(8.2);
  const labelText = `${label}: `;
  const labelW = doc.getTextWidth(labelText);
  doc.setFont(ctx.family, 'normal');
  const valueW = Math.max(maxW - labelW, 20);
  const lines: string[] = doc.splitTextToSize(value, valueW);
  if (draw) {
    doc.setFont(ctx.family, 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(labelText, x, y);
    doc.setFont(ctx.family, 'normal');
    doc.setTextColor(71, 85, 105);
    lines.forEach((line, i) => doc.text(line, x + labelW, y + i * 3.8));
  }
  return y + 4.6 + Math.max(0, lines.length - 1) * 3.8;
}

// Lista de inclusiones/exclusiones en DOS COLUMNAS, orden por columnas:
// la columna izquierda contiene la primera mitad de la lista y la derecha la segunda.
export function drawTwoColumnList(ctx: PdfCtx, items: string[], kind: 'include' | 'exclude'): void {
  if (items.length === 0) return;
  const doc = ctx.doc;
  const gap = 8;
  const colW = (ctx.contentWidth - gap) / 2;
  const textW = colW - 8;
  const half = Math.ceil(items.length / 2);
  doc.setFont(ctx.family, 'normal');
  doc.setFontSize(9.0);
  const wrapped = items.map((it) => doc.splitTextToSize(it, textW) as string[]);
  const itemH = (lines: string[]) => lines.length * 4.3 + 2.5;

  for (let r = 0; r < half; r++) {
    const left = wrapped[r];
    const right = r + half < items.length ? wrapped[r + half] : null;
    const rowH = Math.max(itemH(left), right ? itemH(right) : 0);
    ctx.ensure(rowH);
    const rowY = ctx.y;
    drawListItem(ctx, ctx.marginX, rowY, left, kind);
    if (right) drawListItem(ctx, ctx.marginX + colW + gap, rowY, right, kind);
    ctx.y += rowH;
  }
}

function drawListItem(ctx: PdfCtx, x: number, y: number, lines: string[], kind: 'include' | 'exclude'): void {
  const doc = ctx.doc;
  if (kind === 'include') {
    doc.setFillColor(16, 185, 129);
    doc.circle(x + 2.5, y + 2, 2.0, 'F');
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.5);
    doc.line(x + 1.5, y + 2, x + 2.3, y + 2.8);
    doc.line(x + 2.3, y + 2.8, x + 3.5, y + 1.1);
    doc.setTextColor(30, 41, 59);
  } else {
    doc.setFillColor(225, 29, 72);
    doc.circle(x + 2.5, y + 2, 2.0, 'F');
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.5);
    doc.line(x + 1.6, y + 1.1, x + 3.4, y + 2.9);
    doc.line(x + 3.4, y + 1.1, x + 1.6, y + 2.9);
    doc.setTextColor(100, 116, 139);
  }
  doc.setFont(ctx.family, 'normal');
  doc.setFontSize(9.0);
  drawLines(doc, lines, x + 7, y + 3, 4.3);
}
