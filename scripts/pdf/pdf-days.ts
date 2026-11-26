import { PdfImage, drawImageCover } from './pdf-images';
import { PdfCtx, drawLabelValue, drawLines } from './pdf-layout';

export interface DayData {
  day: string | number;
  title: string;
  desc: string;
  meals: string;
  accommodation: string;
  transport: string;
  activity: string;
  img: PdfImage | null; // foto propia del dia (o null: el bloque va sin foto)
}

type Labels = Record<string, string>;

const IMG_W = 52;
const IMG_GAP = 6;

function splitParagraphs(raw: string): string[] {
  const rawText = raw.trim();
  return rawText.includes('\n')
    ? rawText.split(/\n\s*\n|\r\n\r\n|\n/).map((p) => p.trim()).filter(Boolean)
    : [rawText];
}

// Dibuja (draw=true) o solo mide (draw=false) el texto de un dia. Devuelve la altura total usada.
function renderDayText(ctx: PdfCtx, d: DayData, x: number, top: number, w: number, draw: boolean, t: Labels): number {
  const doc = ctx.doc;
  let y = top;

  doc.setFont(ctx.family, 'bold');
  doc.setFontSize(8.5);
  if (draw) {
    doc.setTextColor(6, 78, 59);
    doc.text(`${t.day.toUpperCase()} ${d.day}`, x, top + 5.5);
  }

  doc.setFontSize(10);
  const titleLines: string[] = doc.splitTextToSize(d.title, w);
  if (draw) {
    doc.setTextColor(15, 23, 42);
    drawLines(doc, titleLines, x, top + 11, 4.6);
  }
  y = top + 11 + titleLines.length * 4.6;

  doc.setFont(ctx.family, 'normal');
  doc.setFontSize(9.0);
  for (const para of splitParagraphs(d.desc)) {
    const lines: string[] = doc.splitTextToSize(para, w);
    if (draw) {
      doc.setTextColor(51, 65, 85);
      drawLines(doc, lines, x, y, 4.2);
    }
    y += lines.length * 4.2 + 2.6;
  }

  doc.setFontSize(8.2);
  if (d.accommodation) y = drawLabelValue(ctx, t.accommodation, d.accommodation, x, y, w, draw);
  if (d.transport) y = drawLabelValue(ctx, t.transport, d.transport, x, y, w, draw);
  if (d.meals) y = drawLabelValue(ctx, t.meals, d.meals, x, y, w, draw);
  if (d.activity) y = drawLabelValue(ctx, t.activity, d.activity, x, y, w, draw);
  return y - top;
}

// Bloque de dia con foto: la foto alterna izquierda/derecha. Sin foto propia, el texto ocupa todo el ancho.
export function drawDayBlock(ctx: PdfCtx, d: DayData, imageOnLeft: boolean, t: Labels): void {
  const hasImg = d.img !== null;
  const textW = hasImg ? ctx.contentWidth - IMG_W - IMG_GAP : ctx.contentWidth;
  const textH = renderDayText(ctx, d, 0, 0, textW, false, t);
  const blockH = hasImg ? Math.max(textH + 4, 52) : textH + 4;

  ctx.ensure(blockH + 8);
  const top = ctx.y;
  const imgX = imageOnLeft ? ctx.marginX : ctx.marginX + ctx.contentWidth - IMG_W;
  const textX = !hasImg
    ? ctx.marginX
    : imageOnLeft ? ctx.marginX + IMG_W + IMG_GAP : ctx.marginX;

  if (d.img) {
    drawImageCover(ctx.doc, d.img, imgX, top, IMG_W, blockH);
    ctx.doc.setDrawColor(226, 232, 240);
    ctx.doc.setLineWidth(0.3);
    ctx.doc.roundedRect(imgX, top, IMG_W, blockH, 2, 2, 'D');
  }
  renderDayText(ctx, d, textX, top, textW, true, t);
  ctx.y = top + blockH + 8;
}

// Dia de logistica o excursion de un dia: tarjeta blanca con la descripcion y una linea de metadatos.
export function drawCardDayBlock(ctx: PdfCtx, headerText: string, title: string, desc: string, metaLine: string): void {
  const doc = ctx.doc;
  const width = ctx.contentWidth - 14;
  doc.setFont(ctx.family, 'normal');
  doc.setFontSize(9.0);
  const descLines: string[] = doc.splitTextToSize(desc, width);
  doc.setFont(ctx.family, 'bold');
  doc.setFontSize(8.2);
  const metaLines: string[] = metaLine ? doc.splitTextToSize(metaLine, width) : [];
  const blockH = 16 + descLines.length * 4.2 + (metaLines.length ? 3 + metaLines.length * 4 : 0);

  ctx.ensure(blockH + 4);
  const top = ctx.y;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(ctx.marginX, top, ctx.contentWidth, blockH, 2, 2, 'FD');

  doc.setFont(ctx.family, 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(headerText, ctx.marginX + 6, top + 6);

  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(title, ctx.marginX + 6, top + 12);

  doc.setFont(ctx.family, 'normal');
  doc.setFontSize(9.0);
  doc.setTextColor(51, 65, 85);
  const descY = top + 17;
  drawLines(doc, descLines, ctx.marginX + 6, descY, 4.2);

  if (metaLines.length) {
    doc.setFont(ctx.family, 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(71, 85, 105);
    drawLines(doc, metaLines, ctx.marginX + 6, descY + descLines.length * 4.2 + 2, 4);
  }
  ctx.y = top + blockH + 6;
}

