import type { ConsentChoice } from './constants';

export type ServerConsent = ConsentChoice | 'none';

/**
 * Decide qué puede guardar el servidor para este visitante.
 * - Global Privacy Control (`Sec-GPC: 1`) equivale a rechazar: no se guarda ningún identificador.
 * - Sin elección previa ('none') tampoco se guarda ningún dato de visitante.
 */
export function readServerConsent(cookieValue: string | undefined, secGpc: string | null): ServerConsent {
  if (secGpc === '1') return 'rejected';
  if (cookieValue === 'accepted' || cookieValue === 'rejected') return cookieValue;
  return 'none';
}
