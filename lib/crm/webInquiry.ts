/**
 * ¿Un documento de la colección `bookings` es una SOLICITUD (lead) y no una reserva?
 *
 * El formulario de contacto (/api/leads) y el bot (/api/concierge) guardan en `bookings`,
 * junto a las reservas pagadas. El CRM usa esta función para mostrarlas como leads
 * "Nuevos" en el pipeline y sacarlas de reservas y finanzas.
 *
 * Módulo puro (sin Firebase) para poder probarlo con vitest.
 */

/** `tourId` que escriben los puntos de entrada de leads. Amplíala si aparece otro formulario. */
export const WEB_INQUIRY_TOUR_IDS: readonly string[] = ['general-inquiry', 'ai-concierge-lead'];

const hasValue = (v: unknown): boolean => v !== undefined && v !== null && String(v).trim() !== '';

/**
 * true si:
 *  - el `tourId` es de un formulario de leads conocido, o
 *  - no hay ninguna señal de pago: sin `paymentMethod`, importe (amountPaid/paidAmount/totalAmount)
 *    no mayor que 0 y sin id de captura/transacción del procesador.
 *
 * Así, los documentos antiguos del respaldo del cliente (con `refCode` y
 * `paymentStatus: 'pending_verification'` pero sin importe ni método) cuentan como solicitud,
 * y una transferencia real pendiente de verificar sigue siendo reserva porque lleva `paymentMethod`.
 */
export function isWebInquiry(raw: Record<string, unknown> | null | undefined): boolean {
  if (!raw) return false;

  if (WEB_INQUIRY_TOUR_IDS.includes(String(raw.tourId ?? ''))) return true;

  const amount = Math.max(
    Number(raw.amountPaid) || 0,
    Number(raw.paidAmount) || 0,
    Number(raw.totalAmount) || 0
  );
  const hasPaymentSignal =
    hasValue(raw.paymentMethod) ||
    amount > 0 ||
    hasValue(raw.paymentProcessorCaptureId) ||
    hasValue(raw.paymentProcessorTransactionId);

  return !hasPaymentSignal;
}
