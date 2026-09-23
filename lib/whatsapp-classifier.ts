export interface IntentResult {
  intent: 'quote' | 'complaint' | 'confirmation' | 'booking_change' | 'payment' | 'info' | 'other';
  confidence: number;
  entities: Record<string, any>;
}

const INTENT_PATTERNS = {
  quote: [
    /\b(cotiza|precio|costo|cuanto|costo|presupuesto|quote|price)\b/i,
    /\b(quiero|me gustaria|gustaria).*(viajar|ir|tour|paquete)\b/i,
  ],
  complaint: [
    /\b(problema|queja|reclamo|mal|pesimo|terrible|enojado|molesto)\b/i,
    /\b(no funciona|no llego|retraso|cancelaron)\b/i,
  ],
  confirmation: [
    /\b(confirmo|confirmado|ok|dale|si|si|listo|hecho)\b/i,
    /\b(pagado|pague|transfiri|transfieri|comprobante)\b/i,
  ],
  booking_change: [
    /\b(cambiar|modificar|reprogramar|mover|fecha|dia)\b/i,
    /\b(cancelar|anular|ya no|no voy)\b/i,
  ],
  payment: [
    /\b(pagar|pago|transferencia|deposito|tarjeta|paypal|payoneer)\b/i,
    /\b(referencia|comprobante|voucher)\b/i,
  ],
  info: [
    /\b(horario|donde|donde|direccion|ubicacion|que incluye|includes)\b/i,
    /\b(como|como|informacion|info|detalles)\b/i,
  ],
};

export function classifyIntent(text: string, context: any = {}): IntentResult {
  if (!text) return { intent: 'other', confidence: 0, entities: {} };

  const lower = text.toLowerCase();
  let bestIntent: IntentResult = { intent: 'other', confidence: 0, entities: {} };

  for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
    for (const pattern of patterns) {
      const match = lower.match(pattern);
      if (match) {
        const confidence = Math.min(0.6 + (match[0].length / text.length) * 0.4, 0.95);
        if (confidence > bestIntent.confidence) {
          bestIntent = { intent: intent as any, confidence, entities: { matched: match[0] } };
        }
      }
    }
  }

  if (context.parentData?.conversation_state === 'ai_active' && bestIntent.confidence < 0.7) {
    bestIntent.confidence = Math.min(bestIntent.confidence + 0.15, 0.95);
  }

  return bestIntent;
}