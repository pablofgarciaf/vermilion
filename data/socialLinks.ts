/**
 * Cuentas de redes sociales por idioma.
 *
 * - `DEFAULT_SOCIAL` es la cuenta principal (hoy: inglés) y sirve de respaldo.
 * - `LOCALE_SOCIAL` solo lista las cuentas que YA existen para un idioma concreto.
 *   Cuando se cree, por ejemplo, la cuenta alemana de TikTok, basta con añadir
 *   `de: { tiktok: 'https://www.tiktok.com/@...' }`: la web empieza a usarla sola.
 * - Solo URLs públicas. Nada de tokens ni credenciales aquí.
 */
export type SocialNetwork = 'instagram' | 'tiktok' | 'facebook' | 'youtube';
export type SocialLinks = Record<SocialNetwork, string>;

export const DEFAULT_SOCIAL: SocialLinks = {
  instagram: 'https://www.instagram.com/vermilionsouthamericanroutes/',
  tiktok: 'https://www.tiktok.com/@vermilionroutes',
  facebook: 'https://www.facebook.com/VermilionSouthAmericanRoutes',
  youtube: 'https://www.youtube.com/@VermilionSouthAmericanRoutes',
};

export const LOCALE_SOCIAL: Partial<Record<string, Partial<SocialLinks>>> = {
  // es: { tiktok: '...', instagram: '...' },
  // de: { tiktok: '...', instagram: '...' },
};

/** URL de una red para un idioma: cuenta del idioma > override opcional (Firestore) > cuenta principal. */
export function socialUrl(network: SocialNetwork, locale: string, override?: string): string {
  return LOCALE_SOCIAL[locale]?.[network] || override || DEFAULT_SOCIAL[network];
}

/** Todas las cuentas distintas (para `sameAs` del JSON-LD). */
export function allSocialUrls(networks: SocialNetwork[]): string[] {
  const urls = new Set<string>();
  for (const n of networks) {
    urls.add(DEFAULT_SOCIAL[n]);
    for (const l of Object.values(LOCALE_SOCIAL)) if (l?.[n]) urls.add(l[n] as string);
  }
  return [...urls];
}
