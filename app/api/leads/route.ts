import { NextResponse } from 'next/server';
import { runAfterResponse } from '@/lib/runAfterResponse';
import { withValidation } from '@/lib/apiHandler';
import { leadSchema, sanitizeText, isValidPhone } from '@/lib/validation';
import { leadsRepository } from '@/lib/services/DatabaseService';
import { BookingRequest } from '@/types';
import { notifyNewLead } from '@/lib/email';
import { triggerN8nWebhook } from '@/lib/n8n';
import { toLeadEmailStatus } from '@/lib/crm/leadEmailStatus';
import { getAdminDb } from '@/lib/firebaseAdmin';

export const POST = withValidation(leadSchema, async (req, _ctx, body) => {
  // 🛡️ Honeypot Trap Detection (Python Bot / Automated Form Spammer Neutralizer)
  if (body._hp_trap || body.website_url) {
    console.warn('[SECURITY] Bot / Python spam script trapped via Honeypot. Request neutralised silently.');
    return NextResponse.json({ success: true, bookingId: 'simulated_ok' }, { status: 200 });
  }

  const customerName = sanitizeText(body.customerName || body.name || '');
  const customerEmail = sanitizeText(body.customerEmail || body.email || '');
  const customerPhone = sanitizeText(body.customerPhone || body.phone || '');
  const tourId = sanitizeText(body.tourId || 'general-inquiry');

  const rawTitle = body.tourTitle as any;
  const resolvedTitleStr = typeof rawTitle === 'string'
    ? rawTitle
    : (rawTitle && typeof rawTitle === 'object' && (rawTitle.en || rawTitle.es))
      ? String(rawTitle.en || rawTitle.es)
      : 'Custom Trip Inquiry';
  const tourTitle = sanitizeText(resolvedTitleStr);

  const rawDest = body.destination as any;
  const resolvedDestStr = typeof rawDest === 'string'
    ? rawDest
    : (rawDest && typeof rawDest === 'object' && (rawDest.en || rawDest.es))
      ? String(rawDest.en || rawDest.es)
      : 'Galapagos / Mainland Ecuador';
  const destination = sanitizeText(resolvedDestStr);

  const timeline = sanitizeText(body.timeline || '');
  const rawDates = sanitizeText(body.travelDates || body.date || 'Flexible');
  const travelDates = timeline ? `${timeline} | ${rawDates}` : rawDates;
  const guestsCount = sanitizeText(body.guestsCount || body.travelers || '2 Travelers');
  const message = sanitizeText(body.message || '');

  if (customerPhone && !isValidPhone(customerPhone)) {
    return NextResponse.json(
      { success: false, error: 'Validación fallida', message: 'Formato de número telefónico inválido.' },
      { status: 400 }
    );
  }

  const createdAt = new Date().toISOString();

  const bookingPayload: Omit<BookingRequest, 'id'> = {
    tourId,
    tourTitle,
    customerName,
    customerEmail,
    customerPhone,
    travelDates,
    guestsCount,
    destination,
    message,
    status: 'pending',
    createdAt,
  };
  const country = (req.headers.get('x-vercel-ip-country') || '').slice(0, 2);
  const leadLocale = sanitizeText(body.locale || '').slice(0, 5);

  // Persist lead in Firestore using centralized DatabaseService DAL
  const bookingId = await leadsRepository.create({ ...bookingPayload, ...(country ? { country } : {}), ...(leadLocale ? { locale: leadLocale } : {}) } as typeof bookingPayload);
  const locale = sanitizeText(body.locale || '').slice(0, 5) || undefined;

  // Avisos DESPUÉS de responder al viajero: un fallo de correo o de n8n nunca
  // hace fallar el guardado del lead ni retrasa la respuesta del formulario.
  runAfterResponse(async () => {
    const emailResult = await notifyNewLead(
      {
        leadId: bookingId,
        source: tourId === 'general-inquiry' ? 'contact_form' : `tour:${tourId}`,
        customerName,
        customerEmail,
        customerPhone,
        tourTitle,
        destination,
        travelDates,
        guestsCount,
        message,
        locale,
        createdAt,
      },
      { acknowledgeCustomer: true }
    );
    // Deja constancia en la solicitud para que el CRM muestre si salió el correo.
    // Con la cuenta de servicio: las reglas no dejan actualizar 'bookings' sin sesión de admin.
    try {
      await getAdminDb().collection('bookings').doc(bookingId).update({ emailStatus: toLeadEmailStatus(emailResult) });
    } catch (err) {
      console.warn('[leads] No se pudo guardar el estado del correo:', err instanceof Error ? err.message : err);
    }
    await triggerN8nWebhook({
      event: 'lead.created',
      bookingId,
      createdAt,
      source: 'vermilion-routes-web',
      lead: { id: bookingId, ...bookingPayload },
    });
  });

  return NextResponse.json({
    success: true,
    bookingId,
    message: 'Lead captured successfully and stored in Firestore.',
  });
});
