import { describe, it, expect } from 'vitest';
import { isWebInquiry, WEB_INQUIRY_TOUR_IDS } from '@/lib/crm/webInquiry';

describe('isWebInquiry', () => {
  it('formulario de contacto (/api/leads) es solicitud', () => {
    expect(
      isWebInquiry({
        tourId: 'general-inquiry',
        tourTitle: 'Custom Trip to Galapagos',
        customerName: 'PRUEBA Claude',
        customerEmail: 'test@example.com',
        status: 'pending',
        createdAt: '2026-10-17T12:00:00.000Z',
      })
    ).toBe(true);
  });

  it('lead del bot (/api/concierge) es solicitud', () => {
    expect(
      isWebInquiry({
        tourId: 'ai-concierge-lead',
        customerName: 'Valued Guest',
        customerEmail: 'pending@guest.com',
        status: 'pending',
      })
    ).toBe(true);
  });

  it('reserva pagada con Stripe NO es solicitud', () => {
    expect(
      isWebInquiry({
        tourId: 'galapagos-island-hopping',
        refCode: 'R-2026-GAL-81',
        paymentMethod: 'card',
        paymentProcessor: 'stripe',
        paymentProcessorTransactionId: 'pi_123',
        amountPaid: 500,
        totalAmount: 3580,
        paymentStatus: 'confirmed',
        status: 'confirmed',
      })
    ).toBe(false);
  });

  it('transferencia pendiente de verificar con método de pago NO es solicitud', () => {
    expect(
      isWebInquiry({
        tourId: 'andes-volcano-trek',
        refCode: 'R-2026-AND-82',
        paymentMethod: 'bank_wire',
        transferRef: 'TRX-998',
        amountPaid: 0,
        paymentStatus: 'pending_verification',
        status: 'pending',
      })
    ).toBe(false);
  });

  it('documento antiguo del respaldo del cliente sin importe ni método cuenta como solicitud', () => {
    expect(
      isWebInquiry({
        tourId: 'general',
        refCode: 'R-2026-GEN-80',
        paymentStatus: 'pending_verification',
        paymentVerificationStatus: 'unverified',
        amountPaid: 0,
        totalAmount: 0,
      })
    ).toBe(true);
  });

  it('expone la lista de tourId ampliable', () => {
    expect(WEB_INQUIRY_TOUR_IDS).toEqual(['general-inquiry', 'ai-concierge-lead']);
  });
});
