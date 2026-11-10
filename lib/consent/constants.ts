/**
 * Constantes de consentimiento compartidas por servidor y cliente (sin dependencias de Node).
 *
 * - `vr_consent`: elección del visitante (`accepted` | `rejected`). La escribe el banner en el
 *   navegador y la leen las rutas del servidor para decidir si se guarda algún dato.
 * - `vr_vid`: identificador anónimo aleatorio (UUID). Solo lo crea el servidor, en cookie
 *   HttpOnly, y únicamente si el visitante aceptó. Nunca se lee desde JavaScript del navegador.
 */

export const CONSENT_COOKIE = 'vr_consent';
export const VISITOR_COOKIE = 'vr_vid';

/** Elección de consentimiento: 180 días. */
export const CONSENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 180;
/** Identificador anónimo: 90 días. */
export const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 90;

export const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'de', 'zh', 'it', 'pt', 'ja'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export type ConsentChoice = 'accepted' | 'rejected';

/** `optin`: consentimiento previo (UE, Reino Unido, Suiza, Noruega, Islandia, Liechtenstein). `notice`: resto del mundo. */
export type ConsentRegion = 'optin' | 'notice';

export function isSupportedLocale(value: unknown): value is SupportedLocale {
  return typeof value === 'string' && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

/** Guarda la elección en una cookie legible por el servidor (no identifica al visitante). */
export function setConsentCookie(choice: ConsentChoice): void {
  try {
    if (typeof document === 'undefined') return;
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${CONSENT_COOKIE}=${choice}; Path=/; Max-Age=${CONSENT_COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
  } catch {
    // Sin cookies disponibles el servidor simplemente no registrará datos de visitante.
  }
}
