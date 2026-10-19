import type { WaLocale } from './config';

/**
 * Reglas DETERMINISTAS que se evalúan antes de la IA. No dependen del modelo,
 * así que un intento de inyección no puede desactivarlas.
 */

const fold = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();

/** Baja: el mensaje es exactamente una de estas palabras (con o sin puntuación). */
const OPT_OUT_WORDS = new Set([
  'stop', 'baja', 'darme de baja', 'dar de baja', 'unsubscribe', 'cancelar suscripcion',
  'arret', 'arreter', 'stopp', 'abmelden', 'parar', 'sair', 'cancella', 'disiscriviti',
  '配信停止', '停止', '退订', '取消订阅',
]);

const OPT_IN_WORDS = new Set(['start', 'alta', 'iniciar', 'reanudar', 'unstop', 'demarrer', 'inizia', 'começar', 'comecar', '開始', '订阅']);

function bareCommand(text: string): string {
  return fold(text).replace(/[.!¡¿?,;:'"`´()\s]+$/g, '').replace(/^[.!¡¿?,;:'"`´()\s]+/g, '').replace(/\s+/g, ' ');
}

export function isOptOut(text: string): boolean {
  return OPT_OUT_WORDS.has(bareCommand(text));
}

export function isOptIn(text: string): boolean {
  return OPT_IN_WORDS.has(bareCommand(text));
}

export type HandoffReason = 'human_requested' | 'ready_to_pay' | 'complaint' | 'ai_unsure' | 'ai_error' | 'guard_blocked' | 'owner_replied';

const HUMAN_PATTERNS: RegExp[] = [
  /\b(humano|persona real|asesor(a)?|agente|operador(a)?|alguien real|hablar con alguien|llamada|llamame|llamenme)\b/,
  /\b(human|real person|agent|representative|someone real|talk to (a|someone)|call me)\b/,
  /\b(humain|conseiller|conseillere|vraie personne|appelez-moi)\b/,
  /\b(mensch|berater(in)?|mitarbeiter(in)?|echte person|rufen sie mich an)\b/,
  /\b(umano|operatore|consulente|persona vera|chiamatemi)\b/,
  /\b(atendente|pessoa real|consultor(a)?|me liga|ligue-me)\b/,
  /(担当者|人間|オペレーター|スタッフと話|电话|人工|客服|真人)/,
];

const PAY_PATTERNS: RegExp[] = [
  /\b(quiero (pagar|reservar)|como pago|como (puedo )?pagar|listo para (pagar|reservar)|enviame (el )?(link|enlace) de pago|transferencia|tarjeta de credito|pagar (ya|ahora)|reservo|confirmo la reserva)\b/,
  /\b(i want to (pay|book)|how (do|can) i pay|ready to (pay|book)|payment link|bank transfer|wire transfer|pay (now|the deposit)|book it|i'?ll book)\b/,
  /\b(je veux (payer|reserver)|comment payer|lien de paiement|virement)\b/,
  /\b(ich mochte (bezahlen|buchen)|wie bezahle ich|zahlungslink|uberweisung|jetzt buchen)\b/,
  /\b(voglio (pagare|prenotare)|come pago|link di pagamento|bonifico)\b/,
  /\b(quero (pagar|reservar)|como pago|link de pagamento|transferencia bancaria|pix)\b/,
  /(支払いたい|予約したい|支払い方法|振込|付款|支付|预订)/,
];

const COMPLAINT_PATTERNS: RegExp[] = [
  /\b(queja|reclamo|reclamacion|estafa|fraude|reembolso|devolucion|denuncia|pesimo|abogado|cancelaron|no me (respondieron|devolvieron))\b/,
  /\b(complaint|complain|scam|fraud|refund|chargeback|lawyer|terrible service|cancelled my)\b/,
  /\b(plainte|arnaque|remboursement|avocat)\b/,
  /\b(beschwerde|betrug|ruckerstattung|anwalt)\b/,
  /\b(reclamo|truffa|rimborso|avvocato)\b/,
  /\b(reclamacao|golpe|reembolso|advogado)\b/,
  /(苦情|詐欺|返金|投诉|诈骗|退款)/,
];

/** Motivo de paso a humano detectado por reglas, o null. */
export function detectHandoff(text: string): HandoffReason | null {
  const t = fold(text);
  if (COMPLAINT_PATTERNS.some((r) => r.test(t))) return 'complaint';
  if (HUMAN_PATTERNS.some((r) => r.test(t))) return 'human_requested';
  if (PAY_PATTERNS.some((r) => r.test(t))) return 'ready_to_pay';
  return null;
}

const LOCALE_HINTS: Array<[WaLocale, RegExp]> = [
  ['es', /\b(hola|buen(os|as)|quiero|viaje|gracias|cuanto|precio|personas|fechas|islas|necesito|somos|por favor)\b/],
  ['pt', /\b(ola|bom dia|boa tarde|quero|viagem|obrigad[oa]|quanto|preco|pessoas|voces|gostaria)\b/],
  ['fr', /\b(bonjour|salut|je|voudrais|voyage|merci|combien|prix|personnes|nous sommes)\b/],
  ['de', /\b(hallo|guten|ich|mochte|reise|danke|wie viel|preis|personen|wir sind)\b/],
  ['it', /\b(ciao|buongiorno|vorrei|viaggio|grazie|quanto costa|prezzo|persone|siamo)\b/],
  ['en', /\b(hi|hello|hey|i|we|want|trip|travel|thanks|how much|price|people|would like)\b/],
];

/** Idioma probable del mensaje; `fallback` si no hay pistas. */
export function detectLocale(text: string, fallback: WaLocale = 'es'): WaLocale {
  if (/[぀-ヿ]/.test(text)) return 'ja';
  if (/[一-鿿]/.test(text)) return 'zh';
  const t = fold(text);
  let best: WaLocale = fallback;
  let bestScore = 0;
  for (const [loc, re] of LOCALE_HINTS) {
    const score = (t.match(new RegExp(re.source, 'g')) || []).length;
    if (score > bestScore) {
      best = loc;
      bestScore = score;
    }
  }
  return best;
}
