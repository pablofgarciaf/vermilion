import { NextResponse } from 'next/server';
import { withValidation } from '@/lib/apiHandler';
import { leadSchema, sanitizeText, isValidPhone } from '@/lib/validation';
import { leadsRepository } from '@/lib/services/DatabaseService';
import { BookingRequest } from '@/types';
import { notifyNewLead, sendLeadMagnetEmail } from '@/lib/email';

export const POST = withValidation(leadSchema, async (_req, _ctx, body) => {
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

  const travelDates = sanitizeText(body.travelDates || body.date || 'Flexible');
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

  // Persist lead in Firestore using centralized DatabaseService DAL
  const bookingId = await leadsRepository.create(bookingPayload);

  // 📧 Dispatch instant notification to admin team & traveler acknowledgment
  const leadLocale = (body.locale as string) || 'en';
  notifyNewLead(
    {
      leadId: bookingId,
      customerName,
      customerEmail,
      customerPhone,
      tourTitle,
      destination,
      travelDates,
      guestsCount,
      message,
      source: tourId.includes('lead-magnet') ? 'lead_magnet_galapagos_guide' : 'web_lead_form',
      locale: leadLocale,
      createdAt,
    },
    { acknowledgeCustomer: true }
  ).catch((err) => console.error('[LeadEmail Error]', err));

  // If this is a Lead Magnet request, also send the official guide download email
  if (
    tourId.includes('lead-magnet') ||
    (message && message.toLowerCase().includes('lead magnet')) ||
    (tourTitle && tourTitle.toLowerCase().includes('guide'))
  ) {
    sendLeadMagnetEmail(customerEmail, leadLocale).catch((err) =>
      console.error('[LeadMagnetEmail Error]', err)
    );
  }

  // Trigger n8n webhook if configured
  let webhookTriggered = false;
  let webhookError: string | null = null;
  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

  if (n8nWebhookUrl) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 sec timeout

      const webhookPayload = {
        event: 'lead.created',
        bookingId,
        createdAt,
        source: 'vermilion-routes-web',
        lead: {
          id: bookingId,
          ...bookingPayload,
        },
      };

      const webhookRes = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'VermilionRoutes-API/1.0',
        },
        body: JSON.stringify(webhookPayload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (webhookRes.ok) {
        webhookTriggered = true;
      } else {
        webhookError = `n8n webhook responded with status ${webhookRes.status}`;
        console.warn('[n8n Webhook Warning]', webhookError);
      }
    } catch (err: any) {
      webhookError = err.name === 'AbortError' ? 'n8n webhook timeout' : err.message;
      console.warn('[n8n Webhook Error]', webhookError);
    }
  }

  return NextResponse.json({
    success: true,
    bookingId,
    message: 'Lead captured successfully and stored in Firestore.',
    webhookTriggered,
    webhookError,
  });
});
