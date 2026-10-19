import { allowedAmounts, getCatalog, isAllowedUrl, type CatalogEntry } from './catalog';
import { LIMITS } from './config';
import { sanitizeUntrusted } from './security';

/**
 * Guarda de SALIDA: se aplica a todo texto generado por la IA antes de enviarlo.
 *
 * Suponemos que el modelo puede ser manipulado (inyección de prompt). Por eso la
 * respuesta solo sale si:
 *  - no menciona descuentos, cupones, promociones ni precios gratis,
 *  - todo porcentaje es el 30 % del depósito,
 *  - todo importe de dinero es un precio "desde" del catálogo o su 30 %,
 *  - todo enlace apunta a una ficha real de la web o al wa.me de la empresa,
 *  - no se presenta como confirmación de reserva o pago (eso lo hace un humano).
 */

export type GuardViolation = 'discount' | 'percentage' | 'amount' | 'url' | 'commitment' | 'empty';

export interface GuardResult {
  ok: boolean;
  text: string;
  violations: GuardViolation[];
}

const DISCOUNT_WORDS = new RegExp(
  [
    'descuento', 'rebaja', 'cupon', 'promocion', 'promo', 'oferta especial', 'gratis',
    'discount', 'coupon', 'voucher code', 'promo code', 'free of charge', 'for free', 'special offer',
    'remise', 'reduction', 'rabais', 'gratuit',
    'rabatt', 'gutschein', 'kostenlos', 'gratis',
    'sconto', 'gratuito',
    'desconto', 'cupom', 'promocao',
    '割引', 'クーポン', '無料', 'セール',
    '折扣', '优惠', '打折', '免费', '优惠券',
  ]
    .map((w) => (/^[a-z ]+$/.test(w) ? `\\b${w}\\b` : w))
    .join('|'),
  'i'
);

/** Frases que comprometerían a la empresa: confirmar reserva/pago, garantizar plazas o reembolsos. */
const COMMITMENT_WORDS =
  /\b(reserva (esta )?confirmada|pago (recibido|confirmado)|te garantizo|garantizad[oa]|booking (is )?confirmed|payment (received|confirmed)|i guarantee|guaranteed|reembolso garantizado|full refund)\b/i;

/** "30%", "30 %", "30 por ciento"... */
const PERCENT = /(\d+(?:[.,]\d+)?)\s*(%|％|por ?ciento|percent|pour ?cent|prozent|per ?cento|por ?cento)/gi;

/** Importes: $1,790 · US$ 1.790 · 1790 USD · 1.790 dólares · €500 · 500 euros */
const MONEY =
  /(?:US\$|USD|\$|€|EUR|£|¥|S\/\.?)\s?(\d[\d.,\s]*\d|\d)|(\d[\d.,\s]*\d|\d)\s?(?:USD|US\$|\$|dolares|dólares|dollars|dollar|dolares americanos|euros?|€|eur|ドル|美元|美金)/gi;

const URL_RE = /\bhttps?:\/\/[^\s<>()"'`]+|\b(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|net|org|io|co|ec|me|ly|app|link|site|info|biz|xyz|page|shop|store)(?:\/[^\s<>()"'`]*)?/gi;

/** "1,790" / "1.790" / "1 790" / "537.00" / "537,5" -> número. */
export function parseAmount(raw: string): number | null {
  let s = raw.replace(/\s/g, '');
  if (/^\d{1,3}([.,]\d{3})+$/.test(s)) s = s.replace(/[.,]/g, '');
  else if (/^\d{1,3}(,\d{3})+\.\d{1,2}$/.test(s)) s = s.replace(/,/g, '');
  else if (/^\d{1,3}(\.\d{3})+,\d{1,2}$/.test(s)) s = s.replace(/\./g, '').replace(',', '.');
  else s = s.replace(',', '.');
  const n = Number(s);
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : null;
}

export function guardReply(input: string, catalog: CatalogEntry[] = getCatalog()): GuardResult {
  const text = sanitizeUntrusted(input, LIMITS.maxReplyChars);
  const violations = new Set<GuardViolation>();
  if (!text) violations.add('empty');

  const folded = text.normalize('NFD').replace(/[̀-ͯ]/g, '');
  if (DISCOUNT_WORDS.test(folded)) violations.add('discount');
  if (COMMITMENT_WORDS.test(folded)) violations.add('commitment');

  for (const m of text.matchAll(PERCENT)) {
    if (parseAmount(m[1]) !== 30) violations.add('percentage');
  }

  const allowed = allowedAmounts(catalog);
  for (const m of text.matchAll(MONEY)) {
    const n = parseAmount((m[1] || m[2] || '').trim());
    if (n === null || !allowed.has(n)) violations.add('amount');
  }

  for (const m of text.matchAll(URL_RE)) {
    const raw = m[0].replace(/[.,;:!?)]+$/, '');
    const withProto = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    if (!isAllowedUrl(withProto, catalog)) violations.add('url');
  }

  return { ok: violations.size === 0, text, violations: [...violations] };
}
