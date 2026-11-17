import fs from 'fs';
import path from 'path';
import { jsPDF } from 'jspdf';
import { mockTours } from '../data/mock';
import { dailyTours } from '../data/dailyToursData';
import { Tour } from '../types';
import { PDF_TRANSLATIONS } from './pdf/pdf-translations';
import {
  PdfImage, ImageUsage, loadPdfImage, drawImageCover, safeAddImage,
  COVER_IMAGE_OPTS, DAY_IMAGE_OPTS, LOGO_IMAGE_OPTS,
} from './pdf/pdf-images';
import { createCtx, drawSectionTitle, drawTwoColumnList, drawLines } from './pdf/pdf-layout';
import { drawDayBlock, drawCardDayBlock } from './pdf/pdf-days';

// Salida: por defecto la carpeta de produccion. Para pruebas usar PDF_OUTPUT_DIR.
const DEFAULT_OUTPUT_DIR = 'C:/Users/pablo/hermes/projects/vermilion/tours-pdf';
const OUTPUT_DIR = path.resolve(process.env.PDF_OUTPUT_DIR || DEFAULT_OUTPUT_DIR);
const CJK_FONT_PATH = 'C:/Users/pablo/hermes/projects/vermilion/tours-pdf/_fonts/simsun-subset.ttf';

function registerCjkFont(doc: any) {
  const b64 = fs.readFileSync(CJK_FONT_PATH).toString('base64');
  doc.addFileToVFS('cjk.ttf', b64);
  doc.addFont('cjk.ttf', 'cjk', 'normal');
  doc.addFont('cjk.ttf', 'cjk', 'bold');
}

function getLocalized(obj: any, locale: string = 'es'): string {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[locale] || obj['es'] || obj['en'] || Object.values(obj)[0] || '';
}

function isFunctionalDay(title: string, desc: string): boolean {
  const t = title.toLowerCase();
  if (/crater|cráter|gemelos|primicias|tortuga|tortoise|tintoreras|lobería|loberia|grietas|waterfall|cascada|pailón|pailon|volcan|volcán|cotopaxi|quilotoa|chimborazo|yanacocha|amazon|rainforest|equator|mitad del mundo|city tour|panecillo|otavalo|papallacta|mindo|antisana|cajas|ingapirca/i.test(t)) {
    return false;
  }
  return /libre|free day|vuelo de retorno|departure.*flight|salida internacional|international departure/i.test(t);
}

function isGalapagosRegion(title: string, desc: string): boolean {
  const combined = `${title} ${desc}`.toLowerCase();
  return /galápagos|galapagos|baltra|santa cruz|isabela|san cristóbal|san cristobal|tintoreras/i.test(combined);
}

// Asigna a cada dia SU foto: primero la del itinerario; si no tiene (o ya se uso), la de la galeria
// en la misma posicion. Nunca se repite una foto dentro del PDF ni se usa la portada como relleno.
async function assignDayImages(itinerary: any[], gallery: string[], usage: ImageUsage): Promise<(PdfImage | null)[]> {
  const result: (PdfImage | null)[] = itinerary.map(() => null);
  for (let i = 0; i < itinerary.length; i++) {
    const own = itinerary[i]?.image;
    if (own) result[i] = usage.claim(await loadPdfImage(own, DAY_IMAGE_OPTS));
  }
  for (let i = 0; i < itinerary.length; i++) {
    if (!result[i] && gallery[i]) result[i] = usage.claim(await loadPdfImage(gallery[i], DAY_IMAGE_OPTS));
  }
  return result;
}

export async function buildPDFForTour(tour: Tour, locale: string = 'es'): Promise<Buffer> {
  const t = PDF_TRANSLATIONS[locale] || PDF_TRANSLATIONS['es'];
  const family = locale === 'zh' ? 'cjk' : 'helvetica';
  const isDailyTour = tour.durationDays === 1 || dailyTours.some(d => d.id === tour.id);

  const title = getLocalized(tour.title, locale);
  const destination = getLocalized(tour.destination, locale) || 'Ecuador';
  const duration = getLocalized(tour.duration, locale) || (isDailyTour ? t.oneDay : t.sevenDays);
  const category = getLocalized(tour.category, locale) || (isDailyTour ? t.dailyCat : t.privateCat);
  const description = getLocalized(tour.description, locale);

  const price3Star = tour.price3Star ?? tour.price;
  const price4Star = tour.price4Star ?? Math.round((price3Star ?? 0) * 1.15);
  const singlePrice = tour.price || 89;

  const itinerary: any[] = tour.itinerary || [];
  const highlights = tour.highlights || [];
  const inclusions = tour.inclusions || [];
  const exclusions = tour.exclusions || [];
  const gallery: string[] = (tour.gallery || []).filter(Boolean);

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  if (locale === 'zh') registerCjkFont(doc);

  const logo = await loadPdfImage('/logo_inicio.png', LOGO_IMAGE_OPTS);
  const ctx = createCtx(doc, family, logo);
  const { pageWidth, pageHeight, marginX, contentWidth } = ctx;
  const marginRight = 14;

  const usage = new ImageUsage();
  const coverPath = tour.desktopImage || tour.imageUrl || '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.webp';
  const cover = await loadPdfImage(coverPath, COVER_IMAGE_OPTS);
  usage.mark(cover); // la portada cuenta como usada: ningun dia la repite
  const dayImages = await assignDayImages(itinerary, gallery, usage);

  // Portada
  if (cover) {
    const coverHeight = 70;
    drawImageCover(doc, cover, 0, ctx.y, pageWidth, coverHeight);
    doc.setFillColor(0, 0, 0);
    doc.setGState(new (doc as any).GState({ opacity: 0.72 }));
    doc.rect(0, ctx.y + 44, pageWidth, 26, 'F');
    doc.setGState(new (doc as any).GState({ opacity: 1.0 }));

    doc.setFont(family, 'bold');
    doc.setFontSize(12.5);
    doc.setTextColor(255, 255, 255);
    doc.text(title.toUpperCase(), marginX, ctx.y + 53);

    const bY = ctx.y + 59;
    const badgeHeight = 6.8;
    const badgePaddingX = 4;
    const badges = [
      `[ ${destination.toUpperCase()} ]`,
      `[ ${category.toUpperCase()} ]`,
      isDailyTour ? '[ 1 DÍA (FULL DAY) ]' : `[ ${duration.toUpperCase()} ]`,
    ];
    doc.setFont(family, 'bold');
    doc.setFontSize(7.2);
    let badgeX = marginX;
    badges.forEach((bText) => {
      const bW = doc.getTextWidth(bText) + (badgePaddingX * 2);
      doc.setFillColor(30, 41, 59);
      doc.setGState(new (doc as any).GState({ opacity: 0.78 }));
      doc.roundedRect(badgeX, bY, bW, badgeHeight, 1.8, 1.8, 'F');
      doc.setGState(new (doc as any).GState({ opacity: 1.0 }));
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(0.3);
      doc.roundedRect(badgeX, bY, bW, badgeHeight, 1.8, 1.8, 'D');
      doc.setTextColor(255, 255, 255);
      doc.text(bText, badgeX + badgePaddingX, bY + 4.6);
      badgeX += bW + 2.8;
    });
    ctx.y += coverHeight + 7;
  } else {
    doc.setFont(family, 'bold');
    doc.setFontSize(15);
    doc.setTextColor(2, 44, 34);
    doc.text(title.toUpperCase(), marginX, ctx.y + 6);
    ctx.y += 14;
  }

  // Precio
  if (isDailyTour) {
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(0.8);
    doc.roundedRect(marginX, ctx.y, contentWidth, 16, 2, 2, 'FD');
    doc.setFont(family, 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(22, 101, 52);
    doc.text(t.fixedPrice.toUpperCase(), marginX + 6, ctx.y + 5.8);
    doc.setFontSize(12.5);
    doc.setTextColor(6, 95, 70);
    doc.text(`$${singlePrice} USD`, marginX + 6, ctx.y + 12.5);
    doc.setFont(family, 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(71, 85, 105);
    doc.text(t.fixedPriceSub, pageWidth - marginRight - 6, ctx.y + 9.5, { align: 'right' });
    ctx.y += 22;
  } else {
    const cardWidth = (contentWidth - 6) / 2;
    const cardHeight = 17;
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(167, 243, 208);
    doc.roundedRect(marginX, ctx.y, cardWidth, cardHeight, 2, 2, 'FD');
    doc.setFont(family, 'bold');
    doc.setFontSize(8);
    doc.setTextColor(22, 101, 52);
    doc.text(t.hotel3star.toUpperCase(), marginX + 6, ctx.y + 5.5);
    doc.setFontSize(12);
    doc.setTextColor(4, 120, 87);
    doc.text(`$${price3Star} USD`, marginX + 6, ctx.y + 12.5);

    const card2X = marginX + cardWidth + 6;
    doc.setFillColor(250, 245, 255);
    doc.setDrawColor(233, 213, 255);
    doc.roundedRect(card2X, ctx.y, cardWidth, cardHeight, 2, 2, 'FD');
    doc.setFont(family, 'bold');
    doc.setFontSize(8);
    doc.setTextColor(126, 34, 206);
    doc.text(t.hotel4star.toUpperCase(), card2X + 6, ctx.y + 5.5);
    doc.setFontSize(12);
    doc.text(`$${price4Star} USD`, card2X + 6, ctx.y + 12.5);
    ctx.y += cardHeight + 8;
  }

  // Descripcion
  if (description) {
    doc.setFont(family, 'normal');
    doc.setFontSize(9.0);
    const paddingX = 6;
    const splitDesc: string[] = doc.splitTextToSize(description, contentWidth - paddingX * 2);
    const descBoxHeight = (splitDesc.length * 4.2) + 9;
    doc.setFillColor(255, 255, 255);
    doc.rect(marginX, ctx.y, contentWidth, descBoxHeight, 'F');
    doc.setFillColor(16, 185, 129);
    doc.rect(marginX, ctx.y, 2.5, descBoxHeight, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.rect(marginX, ctx.y, contentWidth, descBoxHeight, 'D');
    doc.setTextColor(51, 65, 85);
    drawLines(doc, splitDesc, marginX + paddingX + 1, ctx.y + 5.8, 4.2);
    ctx.y += descBoxHeight + 8;
  }

  // Highlights (tours de 1 dia)
  if (isDailyTour && highlights.length > 0) {
    ctx.ensure(25);
    drawSectionTitle(ctx, t.highlights.toUpperCase(), 10.5, 7);
    doc.setFont(family, 'normal');
    doc.setFontSize(9.0);
    highlights.forEach((h) => {
      const lines: string[] = doc.splitTextToSize(getLocalized(h, locale), contentWidth - 12);
      const hHeight = (lines.length * 4.2) + 2;
      ctx.ensure(hHeight);
      doc.setFillColor(16, 185, 129);
      doc.circle(marginX + 2.5, ctx.y + 2, 1.8, 'F');
      doc.setTextColor(30, 41, 59);
      drawLines(doc, lines, marginX + 7, ctx.y + 3, 4.2);
      ctx.y += hHeight;
    });
    ctx.y += 4;
  }

  // Itinerario dia por dia
  if (itinerary.length > 0) {
    ctx.ensure(15);
    drawSectionTitle(ctx, t.dayByDay.toUpperCase(), 11, 9);

    let mainDayIndex = 0;
    let currentRegionIsGalapagos = false;
    const hasAndes = itinerary.some(d => {
      const tText = getLocalized(d.title, locale).toLowerCase();
      const dText = getLocalized(d.description, locale).toLowerCase();
      return /quito|baños|banos|amazon|tena|puyo|quilotoa|cotopaxi|cuenca|otavalo/i.test(`${tText} ${dText}`);
    });
    const hasGalapagos = itinerary.some(d => isGalapagosRegion(getLocalized(d.title, locale), getLocalized(d.description, locale)));
    const isMultiRegionCombo = hasAndes && hasGalapagos;

    for (let i = 0; i < itinerary.length; i++) {
      const dayItem = itinerary[i];
      const dayTitle = getLocalized(dayItem.title, locale);
      const rawDayDesc = getLocalized(dayItem.description, locale);
      const dayMeals = dayItem.meals ? getLocalized(dayItem.meals, locale) : '';
      const dayAcc = dayItem.accommodation ? getLocalized(dayItem.accommodation, locale) : '';
      const dayTrans = dayItem.transportation ? getLocalized(dayItem.transportation, locale) : '';
      const dayAct = dayItem.activity ? getLocalized(dayItem.activity, locale) : '';

      const isFunctional = isFunctionalDay(dayTitle, rawDayDesc);
      const isGalapagos = isGalapagosRegion(dayTitle, rawDayDesc);

      if (isMultiRegionCombo && isGalapagos && !currentRegionIsGalapagos) {
        currentRegionIsGalapagos = true;
        ctx.ensure(22);
        ctx.y += 3;
        doc.setFillColor(236, 253, 245);
        doc.setDrawColor(167, 243, 208);
        doc.roundedRect(marginX, ctx.y, contentWidth, 16, 2, 2, 'FD');
        doc.setFont(family, 'bold');
        doc.setFontSize(10);
        doc.setTextColor(6, 78, 59);
        doc.text(t.galapagosChapterTitle.toUpperCase(), marginX + 6, ctx.y + 10);
        ctx.y += 22;
      }

      if (isDailyTour || isFunctional) {
        const metaParts: string[] = [];
        if (dayTrans) metaParts.push(`${t.transport.toUpperCase()}: ${dayTrans}`);
        if (dayMeals) metaParts.push(`${t.meals.toUpperCase()}: ${dayMeals}`);
        if (dayAct) metaParts.push(`${t.activity.toUpperCase()}: ${dayAct}`);
        drawCardDayBlock(
          ctx,
          `${t.day.toUpperCase()} ${dayItem.day} • [ ${isDailyTour ? t.dayProgram : t.dayFree} ]`,
          dayTitle,
          rawDayDesc,
          metaParts.join('  •  '),
        );
      } else {
        const imageOnLeft = mainDayIndex % 2 === 0;
        mainDayIndex++;
        drawDayBlock(ctx, {
          day: dayItem.day,
          title: dayTitle,
          desc: rawDayDesc,
          meals: dayMeals,
          accommodation: dayAcc,
          transport: dayTrans,
          activity: dayAct,
          img: dayImages[i],
        }, imageOnLeft, t);
      }
    }
  }

  // Incluye / No incluye (dos columnas)
  if (inclusions.length > 0 || exclusions.length > 0) {
    ctx.ensure(35);
    ctx.y += 3;
    drawSectionTitle(ctx, t.inclusions.toUpperCase(), 10.5, 7);
    drawTwoColumnList(ctx, inclusions.map((x: any) => getLocalized(x, locale)), 'include');
    if (exclusions.length > 0) {
      ctx.y += 6;
      ctx.ensure(25);
      drawSectionTitle(ctx, t.exclusions.toUpperCase(), 10.5, 7);
      drawTwoColumnList(ctx, exclusions.map((x: any) => getLocalized(x, locale)), 'exclude');
    }
  }

  // Anexo fotografico: solo fotos que aun no aparecen en el PDF
  const annex: PdfImage[] = [];
  for (const g of gallery) {
    const img = usage.claim(await loadPdfImage(g, DAY_IMAGE_OPTS));
    if (img) annex.push(img);
  }
  if (annex.length > 0) {
    ctx.ensure(65);
    ctx.y += 5;
    drawSectionTitle(ctx, t.annexTitle || 'ANEXO FOTOGRÁFICO — DESTINOS Y LUGARES DESTACADOS', 10.5, 8);
    const colWidth = (contentWidth - 6) / 2;
    const colHeight = 50;
    for (let k = 0; k < annex.length; k += 2) {
      ctx.ensure(colHeight + 6);
      [annex[k], annex[k + 1]].forEach((img, col) => {
        if (!img) return;
        const x = marginX + col * (colWidth + 6);
        doc.setFillColor(241, 245, 249);
        doc.roundedRect(x, ctx.y, colWidth, colHeight, 1.5, 1.5, 'F');
        drawImageCover(doc, img, x, ctx.y, colWidth, colHeight);
        doc.setDrawColor(203, 213, 225);
        doc.setLineWidth(0.2);
        doc.roundedRect(x, ctx.y, colWidth, colHeight, 1.5, 1.5, 'D');
      });
      ctx.y += colHeight + 5;
    }
  }

  // Concierge
  ctx.ensure(28);
  ctx.y += 5;
  doc.setFillColor(236, 253, 245);
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(marginX, ctx.y, contentWidth, 20, 2, 2, 'FD');
  doc.setFont(family, 'bold');
  doc.setFontSize(9);
  doc.setTextColor(6, 78, 59);
  doc.text(t.conciergeTitle, marginX + 6, ctx.y + 7);
  doc.setFont(family, 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text(t.conciergeDesc, marginX + 6, ctx.y + 13.5);

  // Pie y marca de agua
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    if (logo) {
      doc.setGState(new (doc as any).GState({ opacity: 0.05 }));
      safeAddImage(doc, logo, (pageWidth - 100) / 2, (pageHeight - 40) / 2, 100, 40);
      doc.setGState(new (doc as any).GState({ opacity: 1.0 }));
    }
    doc.setFont(family, 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(t.footerText, marginX, pageHeight - 7);
    doc.text(`${p} / ${totalPages}`, pageWidth - marginRight, pageHeight - 7, { align: 'right' });
  }

  return Buffer.from(doc.output('arraybuffer'));
}

// Filtros opcionales para pruebas: PDF_LOCALES=en  PDF_TOUR_IDS=galapagos-8days,ecuador-fantastic-8days
const LOCALES = (process.env.PDF_LOCALES || 'es,en').split(',').map(s => s.trim()).filter(Boolean);
const ONLY_IDS = process.env.PDF_TOUR_IDS
  ? new Set(process.env.PDF_TOUR_IDS.split(',').map(s => s.trim()))
  : null;

async function main() {
  const tours = ONLY_IDS ? mockTours.filter(tour => ONLY_IDS.has(tour.id)) : mockTours;
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  for (const loc of LOCALES) {
    const dir = path.join(OUTPUT_DIR, loc);
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Generating ${tours.length} PDFs [${loc}] to ${dir}...`);
    for (const tour of tours) {
      const cleanFilename = getLocalized(tour.title, 'es').replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
      const filePath = path.join(dir, `Vermilion-Routes-${cleanFilename}.pdf`);
      const pdfBuffer = await buildPDFForTour(tour, loc);
      fs.writeFileSync(filePath, pdfBuffer);
      console.log(`[${loc}] ${path.basename(filePath)} (${(pdfBuffer.length / 1024).toFixed(1)} KB)`);
    }
  }
  console.log(`Done: ${tours.length} tours x ${LOCALES.length} languages in ${OUTPUT_DIR}`);
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal error generating PDFs:', err);
  process.exit(1);
});
