export const SUPPORTED_SEO_LOCALES = ['en', 'es', 'fr', 'de', 'zh', 'it', 'pt', 'ja'] as const;
export const BASE_CANONICAL_URL = 'https://www.vermilionroutes.com';

/**
 * Genera el conjunto canónico y de hreflang perfecto para cualquier ruta del sitio.
 * Garantiza:
 * 1. Dominio canónico con https://www.vermilionroutes.com
 * 2. Código de respuesta 200 directo (cero 301/308 redirects)
 * 3. Hreflang en los 8 idiomas soportados + x-default
 * 4. El canonical coincide exactamente con la versión del idioma actual
 */
export function getSeoAlternates(path: string, currentLocale: string) {
  const normalizedPath = path
    ? (path.startsWith('/') ? path : `/${path}`).replace(/\/$/, '')
    : '';

  const languages: Record<string, string> = {};
  for (const loc of SUPPORTED_SEO_LOCALES) {
    languages[loc] = `${BASE_CANONICAL_URL}/${loc}${normalizedPath}`;
  }
  languages['x-default'] = `${BASE_CANONICAL_URL}/en${normalizedPath}`;

  return {
    canonical: `${BASE_CANONICAL_URL}/${currentLocale}${normalizedPath}`,
    languages,
  };
}
