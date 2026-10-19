import { mockTours } from '@/data/mock';
import type { Tour } from '@/types';
import { PUBLIC_SITE_URL, type WaLocale } from './config';

/**
 * Catálogo de solo lectura para el asistente de WhatsApp.
 *
 * Fuente: `data/mock.ts` (`mockTours`), el mismo array con el que se generan
 * las fichas estáticas `/{locale}/tours/{id}`. Así cada enlace que enviamos
 * existe y cada precio es el "desde" que muestra la web (`priceFromUSD || price`).
 * No se modifica ni se copia: solo se lee.
 */

export interface CatalogEntry {
  id: string;
  /** Precio "desde" por persona en USD, el mismo que muestra la ficha. */
  fromPriceUsd: number;
  destination: string;
  durationDays: number | null;
  title: (locale: WaLocale) => string;
  duration: (locale: WaLocale) => string;
  highlights: (locale: WaLocale) => string[];
  url: (locale: WaLocale) => string;
}

type Localizable = string | Partial<Record<string, string>> | undefined | null;

function pick(value: Localizable, locale: WaLocale): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[locale] || value.en || value.es || Object.values(value).find(Boolean) || '';
}

function toEntry(t: Tour): CatalogEntry {
  const fromPriceUsd = Number(t.priceFromUSD || t.price) || 0;
  const days = Number(t.durationDays) || Number(/(\d+)/.exec(pick(t.duration as Localizable, 'en'))?.[1]) || null;
  return {
    id: t.id,
    fromPriceUsd,
    destination: t.destination,
    durationDays: days,
    title: (l) => pick(t.title as Localizable, l),
    duration: (l) => pick(t.duration as Localizable, l),
    highlights: (l) => (t.highlights || []).map((h) => pick(h as Localizable, l)).filter(Boolean).slice(0, 3),
    url: (l) => `${PUBLIC_SITE_URL}/${l}/tours/${encodeURIComponent(t.id)}`,
  };
}

let cached: CatalogEntry[] | null = null;

export function getCatalog(): CatalogEntry[] {
  if (!cached) cached = mockTours.filter((t) => t.id && (t.priceFromUSD || t.price)).map(toEntry);
  return cached;
}

export function findTour(id: unknown): CatalogEntry | undefined {
  if (typeof id !== 'string') return undefined;
  return getCatalog().find((t) => t.id === id);
}

/** Depósito de reserva: 30 % (igual que /checkout/payment). */
export const DEPOSIT_RATE = 0.3;

/**
 * Importes en USD que la IA puede mencionar: los "desde" del catálogo y el 30 % de cada uno.
 * Cualquier otra cifra de dinero en la respuesta se bloquea.
 */
export function allowedAmounts(catalog: CatalogEntry[] = getCatalog()): Set<number> {
  const set = new Set<number>();
  for (const t of catalog) {
    set.add(round2(t.fromPriceUsd));
    set.add(round2(t.fromPriceUsd * DEPOSIT_RATE));
    set.add(Math.round(t.fromPriceUsd * DEPOSIT_RATE));
  }
  return set;
}

/** URLs que pueden aparecer en una respuesta: fichas de tours, listado y el wa.me de la empresa. */
export function isAllowedUrl(raw: string, catalog: CatalogEntry[] = getCatalog()): boolean {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return false;
  }
  if (url.protocol !== 'https:') return false;
  const host = url.hostname.toLowerCase();
  if (host === 'wa.me') return url.pathname.replace(/\/+$/, '') === '/593960039156';
  if (host !== 'www.vermilionroutes.com' && host !== 'vermilionroutes.com') return false;
  if (url.search || url.hash) return false;
  const path = url.pathname.replace(/\/+$/, '');
  if (path === '') return true;
  const m = /^\/(es|en|fr|de|it|pt|ja|zh)(?:\/tours(?:\/([^/]+))?)?$/.exec(path);
  if (!m) return false;
  return !m[2] || catalog.some((t) => t.id === decodeURIComponent(m[2]));
}

const round2 = (n: number) => Math.round(n * 100) / 100;

const PRICE_LINE: Record<WaLocale, (price: string) => string> = {
  es: (p) => `desde ${p} USD por persona`,
  en: (p) => `from ${p} USD per person`,
  fr: (p) => `à partir de ${p} USD par personne`,
  de: (p) => `ab ${p} USD pro Person`,
  it: (p) => `da ${p} USD a persona`,
  pt: (p) => `a partir de ${p} USD por pessoa`,
  ja: (p) => `1名あたり ${p} USD〜`,
  zh: (p) => `每人 ${p} USD 起`,
};

export function formatUsd(n: number): string {
  return `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
}

/** Línea de precio localizada: "desde $1,790 USD por persona". */
export function priceLine(entry: CatalogEntry, locale: WaLocale): string {
  return PRICE_LINE[locale](formatUsd(entry.fromPriceUsd));
}

/**
 * Bloque de recomendación construido por CÓDIGO (no por la IA): título, duración,
 * precio "desde" y enlace con el locale del cliente. Así precio y enlace no se pueden alucinar.
 */
export function recommendationBlock(ids: string[], locale: WaLocale): string {
  const lines: string[] = [];
  for (const id of ids) {
    const t = findTour(id);
    if (!t) continue;
    lines.push(`• ${t.title(locale)} (${t.duration(locale)}) — ${priceLine(t, locale)}\n${t.url(locale)}`);
  }
  return lines.join('\n\n');
}

/** Resumen del catálogo para el system prompt. Datos públicos, sin URLs internas. */
export function catalogForPrompt(locale: WaLocale): string {
  return getCatalog()
    .map((t) => {
      const hl = t.highlights(locale).join('; ');
      return `- id="${t.id}" | ${t.title(locale)} | ${t.destination} | ${t.duration(locale)} | desde ${formatUsd(t.fromPriceUsd)} USD/persona${hl ? ` | ${hl}` : ''}`;
    })
    .join('\n');
}
