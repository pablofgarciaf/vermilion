/**
 * Precio de partida (USD) por categoria de destino. Fuente unica para las
 * tarjetas de destinos y la linea "Desde $X USD" del hero.
 */
export const DESTINATION_STARTING_PRICES: Record<string, number> = {
  ecuador: 950,
  galapagos: 1050,
  combined: 2290,
  'full-day': 85,
};

/** Precio mas bajo de una excursion de un dia. */
export const FULL_DAY_FROM_PRICE = DESTINATION_STARTING_PRICES['full-day'];

/** Precio mas bajo de un viaje de varios dias. */
export const MULTI_DAY_FROM_PRICE = Math.min(
  DESTINATION_STARTING_PRICES.ecuador,
  DESTINATION_STARTING_PRICES.galapagos,
  DESTINATION_STARTING_PRICES.combined,
);
