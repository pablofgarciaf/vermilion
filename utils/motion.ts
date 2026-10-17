/**
 * true si el visitante pidio "reducir movimiento" en su sistema.
 * Los carruseles automaticos lo consultan para no rotar solos.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
