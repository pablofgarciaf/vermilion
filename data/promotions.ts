/**
 * Promociones por festivos. Fuente única: banner, etiquetas de tarjetas/fichas
 * y el cálculo real del precio en la reserva y el checkout leen de aquí.
 *
 * Reglas (aprobadas por el dueño el 19-oct-2026):
 *  - Descuento real sobre el precio publicado de la web. Nunca se sube un
 *    precio para tacharlo (FTC 16 CFR 233, Directiva Ómnibus UE, CMA Reino Unido).
 *  - Máximo 5 % en Halloween y 10 % en Black Friday.
 *  - Sin valor añadido: el traslado privado de aeropuerto que aprobó el dueño ya
 *    viene incluido en los itinerarios, así que anunciarlo como extra gratis
 *    sería engañoso. `valueAdds` queda vacío hasta que se apruebe otro extra real.
 *  - No se acumula: gana el mayor entre descuento de grupo y promo; con código
 *    de embajador (10 %) la promo no se aplica.
 *  - Solo viajes de varios días (las excursiones de un día quedan fuera).
 *
 * Las fechas llevan zona horaria de Ecuador (-05:00). `endsAt` es exclusivo:
 * la promo deja de existir sola en ese instante, sin redesplegar.
 */
export type PromotionValueAdd = 'privateTransfer';

export interface Promotion {
  /** Identificador en minúsculas; viaja al checkout como ?promo=. */
  id: string;
  /** Clave dentro de messages/*.json → promotions.items.<messageKey>. */
  messageKey: string;
  startsAt: string;
  endsAt: string;
  /** 0.05 = 5 %. */
  discountRate: number;
  valueAdds: PromotionValueAdd[];
  /** Último día visible para el cliente (fecha local de Ecuador). */
  lastDay: string;
  /** Icono decorativo del banner. */
  emoji: string;
}

export const PROMOTIONS: Promotion[] = [
  {
    id: 'halloween-2026',
    messageKey: 'halloween',
    startsAt: '2026-10-19T00:00:00-05:00',
    endsAt: '2026-11-01T00:00:00-05:00',
    discountRate: 0.05,
    valueAdds: [],
    lastDay: '2026-10-31',
    emoji: '🎃',
  },
  {
    id: 'black-friday-2026',
    messageKey: 'blackFriday',
    startsAt: '2026-11-27T00:00:00-05:00',
    endsAt: '2026-12-01T00:00:00-05:00',
    discountRate: 0.10,
    valueAdds: [],
    lastDay: '2026-11-30',
    emoji: '🛍️',
  },
];
