/**
 * ════════════════════════════════════════════════════════════════
 *  TAMAÑO DE LAS TARJETAS DEL HERO (escritorio)  ←  CAMBIA AQUÍ
 * ════════════════════════════════════════════════════════════════
 *
 *  HERO_CARD_SCALE = 1     → tamaño original (144 x 208 px)
 *  HERO_CARD_SCALE = 0.85  → 15 % más pequeñas
 *  HERO_CARD_SCALE = 0.72  → 28 % más pequeñas
 *
 *  Cambia el número, guarda y recarga la página (con `npm run dev` se ve al instante).
 *  Todo lo demás (alto, separación, letras y posición) se calcula solo.
 *
 *  HERO_VISIBLE_CARDS = cuántas tarjetas se ven a la derecha del hero.
 */
export const HERO_CARD_SCALE = 0.85;
export const HERO_VISIBLE_CARDS = 4;

const BASE_WIDTH = 144;
const BASE_HEIGHT = 208;
const BASE_GAP = 20;

export const HERO_CARD = {
  width: Math.round(BASE_WIDTH * HERO_CARD_SCALE),
  height: Math.round(BASE_HEIGHT * HERO_CARD_SCALE),
  gap: Math.round(BASE_GAP * HERO_CARD_SCALE),
  /** Margen entre la última tarjeta visible y el borde derecho. */
  rightMargin: 40,
  /** Letras de dentro de la tarjeta (px). */
  titleSize: Math.max(9, Math.round(12 * HERO_CARD_SCALE * 10) / 10),
  subtitleSize: Math.max(10, Math.round(14 * HERO_CARD_SCALE * 10) / 10),
  padding: Math.round(16 * HERO_CARD_SCALE),
};
