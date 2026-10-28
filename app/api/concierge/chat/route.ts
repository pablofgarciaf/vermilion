import { NextRequest, NextResponse } from 'next/server';
import { runAfterResponse } from '@/lib/runAfterResponse';
import { generateConciergeReply, ChatMessage } from '@/lib/ai-providers';
import { saveWebInquiry } from '@/lib/crm/leadStore';
import { randomUUID } from 'crypto';
import { notifyNewLead } from '@/lib/email';
import { triggerN8nWebhook } from '@/lib/n8n';
import { toLeadEmailStatus } from '@/lib/crm/leadEmailStatus';
import { getAdminDb } from '@/lib/firebaseAdmin';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_fake', {
  apiVersion: '2026-07-29.dahlia' as any,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = body.messages || [];
    const provider: string | undefined = body.provider;
    const locale: string = body.locale || 'en';
    // Un id por conversación (nunca compartido), validado porque se usa como id de documento.
    const rawSessionId = typeof body.sessionId === 'string' ? body.sessionId : '';
    const sessionId: string = /^[A-Za-z0-9_-]{8,80}$/.test(rawSessionId) ? rawSessionId : `anon-${randomUUID()}`;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Messages array is required.' },
        { status: 400 }
      );
    }

    // Generate AI Concierge reply using selected/configured AI provider
    const conciergeResponse = await generateConciergeReply(messages, provider, locale);
    
    const finalMessages = [
      ...messages,
      { role: 'assistant', content: conciergeResponse.message, providerUsed: conciergeResponse.providerUsed }
    ];

    // Transcripción en el CRM (chat_sessions, vía Admin SDK). Un fallo se registra con nombre y no corta la respuesta.
    try {
      await getAdminDb().collection('chat_sessions').doc(sessionId).set({
        sessionId,
        locale,
        source: 'web_concierge',
        messages: finalMessages,
        messageCount: finalMessages.length,
        lastUpdated: new Date().toISOString(),
      }, { merge: true });
    } catch (err: any) {
      console.error('[ConciergeChat] no se pudo guardar chat_sessions:', err?.name, err?.message);
    }

    let leadSubmitted = false;
    let leadId: string | undefined = undefined;

    // Auto-persist lead if AI extracted user contact information during chat
    if (conciergeResponse.detectedLead) {
      const { name, email, phone, destination, travelers, travelDates } = conciergeResponse.detectedLead;
      if (name || email || phone) {
        try {
          const bookingPayload = {
            tourId: 'ai-concierge-lead',
            tourTitle: `AI Concierge Lead (${destination || 'Galapagos / Ecuador'})`,
            customerName: name || 'Valued Guest',
            customerEmail: email || 'pending@guest.com',
            customerPhone: phone || '',
            travelDates: travelDates || 'Flexible',
            guestsCount: travelers || '2 Travelers',
            destination: destination || 'Galapagos / Mainland Ecuador',
            message: 'Lead automatically captured by AI Virtual Concierge chatbot',
            status: 'pending' as const,
            createdAt: new Date().toISOString(),
          };

          leadId = await saveWebInquiry({ ...bookingPayload, chatSessionId: sessionId, source: 'web_concierge' });
          leadSubmitted = true;

          // Aviso al equipo tras responder. SIN acuse al viajero: aquí el email lo extrae
          // la IA de texto libre (no verificado), y no queremos que el bot se use para
          // enviar correos a direcciones de terceros.
          const savedLeadId = leadId;
          // Lo que escribió el viajero (texto no fiable: el correo lo escapa al pintarlo).
          const userTranscript = messages
            .filter((m) => m.role === 'user')
            .slice(-4)
            .map((m) => `• ${String(m.content).slice(0, 400)}`)
            .join('\n');
          runAfterResponse(async () => {
            const emailResult = await notifyNewLead(
              {
                leadId: savedLeadId,
                source: 'ai_concierge',
                customerName: bookingPayload.customerName,
                customerEmail: bookingPayload.customerEmail,
                customerPhone: bookingPayload.customerPhone,
                tourTitle: bookingPayload.tourTitle,
                destination: bookingPayload.destination,
                travelDates: bookingPayload.travelDates,
                guestsCount: bookingPayload.guestsCount,
                message: userTranscript ? `Conversación con Pyro (últimos mensajes):\n${userTranscript}` : bookingPayload.message,
                locale,
                createdAt: bookingPayload.createdAt,
              },
              { acknowledgeCustomer: false }
            );
            try {
              await getAdminDb().collection('bookings').doc(savedLeadId).update({ emailStatus: toLeadEmailStatus(emailResult) });
            } catch (err) {
              console.warn('[concierge] No se pudo guardar el estado del correo:', err instanceof Error ? err.message : err);
            }
            await triggerN8nWebhook({
              event: 'ai_concierge.lead_captured',
              bookingId: savedLeadId,
              lead: bookingPayload,
            });
          });
        } catch (err) {
          console.warn('Auto lead save from AI Concierge failed:', err);
        }
      }
    }

    // Auto-generate Stripe Payment Link if AI detected a payment intent
    if (conciergeResponse.paymentIntent && conciergeResponse.paymentIntent.clientEmail) {
      try {
        const { tourId, clientEmail } = conciergeResponse.paymentIntent;
        const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || 'localhost:3005';
        const proto = req.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `${proto}://${host}`;
        
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: 'Vermilion Routes - Itinerary Reservation Deposit',
                  description: `Guaranteed reservation deposit for tour ID: ${tourId || 'Custom Trip'}`,
                },
                unit_amount: 50000,
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          customer_email: clientEmail,
          success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${baseUrl}/tours/${tourId}`,
          metadata: {
            tourId: tourId || 'custom-itinerary',
            depositAmount: '500',
            customLinkId: `ai-agent-${Date.now()}`,
          },
        });

        if (session.url) {
          // Append the generated link to the AI's message
          conciergeResponse.message += `\n\n🔒 **Secure Payment Link Generated:** [Click here to pay the $500 reservation deposit](${session.url})`;
        }
      } catch (stripeErr) {
        console.error('Failed to auto-generate Stripe link via AI:', stripeErr);
        conciergeResponse.message += `\n\n*(Note: I tried to generate a secure payment link, but encountered an error. Our concierge team will email it to you shortly!)*`;
      }
    }

    return NextResponse.json({
      success: true,
      message: conciergeResponse.message,
      providerUsed: conciergeResponse.providerUsed,
      leadSubmitted,
      leadId,
    });
  } catch (error: any) {
    console.error('API /api/concierge/chat Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal error in AI Concierge.',
      },
      { status: 500 }
    );
  }
}
