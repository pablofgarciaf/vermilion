import { ItineraryDay } from '@/types';
import { getLocalizedText } from '@/utils/i18nHelper';
import { getItineraryDayTitle, getItineraryDayDescription } from '@/data/itineraryTranslations';

/** Quita un prefijo tipo "Día 3 -" del título para no repetir el número de día. */
export function removeRepeatedDayPrefix(title: string, dayLabel: string): string {
  const escaped = dayLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return title.replace(new RegExp(`^${escaped}\\s*[-–—:]\\s*`, 'i'), '').trim();
}

/** Separa la descripción en párrafos (saltos de línea o líneas en blanco). */
export function splitParagraphs(text: string): string[] {
  if (!text.includes('\n')) return [text];
  return text.split(/\n\s*\n|\r\n\r\n|\n/).map((p) => p.trim()).filter(Boolean);
}

/** Resuelve título y descripción: primero el dato del tour, luego el diccionario, luego el texto genérico. */
export function resolveDayText(item: ItineraryDay, tourId: string | undefined, locale: string) {
  const dictTitle = getItineraryDayTitle(tourId, item.day, locale);
  const title = item.title && typeof item.title === 'object' && item.title[locale]
    ? item.title[locale]
    : (dictTitle || getLocalizedText(item.title, locale));

  const dictDesc = getItineraryDayDescription(tourId, item.day, locale);
  const description = item.description && typeof item.description === 'object' && item.description[locale]
    ? item.description[locale]
    : (dictDesc || getLocalizedText(item.description, locale));

  return { title, description };
}
