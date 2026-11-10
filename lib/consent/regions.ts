/**
 * Región de consentimiento según el país del visitante.
 *
 * - `optin`: Unión Europea, Reino Unido, Suiza, Noruega, Islandia y Liechtenstein. Los datos de
 *   seguimiento solo se guardan tras aceptar.
 * - `notice`: resto del mundo. Aviso con opción de rechazar desde el primer momento; por defecto
 *   solo se guarda lo necesario.
 *
 * El país llega del encabezado `x-vercel-ip-country` (Vercel). Si no existe (desarrollo, otro
 * hosting), se usa el idioma como respaldo: los idiomas con mercado mayoritariamente europeo
 * (es, de, fr, it, pt) reciben la regla más estricta.
 */
import type { ConsentRegion, SupportedLocale } from './constants';

const EU_COUNTRIES = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV',
  'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
];

const OPT_IN_COUNTRIES = new Set<string>([...EU_COUNTRIES, 'GB', 'CH', 'NO', 'IS', 'LI']);

const OPT_IN_FALLBACK_LOCALES = new Set<string>(['es', 'de', 'fr', 'it', 'pt']);

/** Devuelve el código de país de 2 letras, o null si el encabezado no es válido. */
export function normalizeCountry(raw: string | null | undefined): string | null {
  const code = (raw || '').trim().toUpperCase();
  return /^[A-Z]{2}$/.test(code) ? code : null;
}

export function resolveConsentRegion(country: string | null | undefined, locale: SupportedLocale | string): ConsentRegion {
  const code = normalizeCountry(country);
  if (code) return OPT_IN_COUNTRIES.has(code) ? 'optin' : 'notice';
  return OPT_IN_FALLBACK_LOCALES.has(locale) ? 'optin' : 'notice';
}
