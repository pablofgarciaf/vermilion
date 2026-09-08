import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createBookingInFirestore } from '@/lib/bookings';
import { calculateAndDistributeCommissions } from '@/lib/affiliates';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_RESTRICTED_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !webhookSecret) {
    console.error('Stripe webhook error: Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET in environment.');
    return NextResponse.json(
      { error: 'Stripe webhook is not configured on the server' },
      { status: 500 }
    );
  }

  const stripe = new Stripe(stripeKey, {
    apiVersion: '2026-08-26.dahlia' as any,
  });

  const sig = req.headers.get('stripe-signature');
  if (!sig) {
    console.error('Stripe webhook error: Missing stripe-signature header.');
    return NextResponse.json({ error: 'Missing stripe signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Stripe signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook signature verification failed: ${err.message}` }, { status: 400 });
  }

  // Handle relevant Stripe event types
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        // Stripe Best Practice: Do not fulfill if payment is still unpaid (e.g. async/delayed methods)
        if (session.payment_status === 'unpaid') {
          console.log(`Checkout session ${session.id} completed with status 'unpaid'. Awaiting async settlement.`);
          break;
        }

        await processSuccessfulCheckout(session);
        break;
      }

      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`Async payment succeeded for session ${session.id}`);
        await processSuccessfulCheckout(session);
        break;
      }

      case 'checkout.session.async_payment_failed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.warn(`Async payment failed for session ${session.id}. Contacting traveler: ${session.customer_email}`);
        // Optionally notify concierge or update Firestore record to 'payment_failed'
        break;
      }

      default:
        // Ignore unhandled event types
        break;
    }

    return NextResponse.json({ received: true });
  } catch (handlerErr: any) {
    console.error(`Error processing webhook event ${event.type}:`, handlerErr);
    return NextResponse.json(
      { error: 'Webhook handler encountered an internal error' },
      { status: 500 }
    );
  }
}

/**
 * Fulfill the booking: record in Firestore and distribute affiliate commissions
 */
async function processSuccessfulCheckout(session: Stripe.Checkout.Session) {
  const metadata = session.metadata || {};
  const refCode = metadata.customLinkId || `VR-${Date.now().toString().slice(-6)}`;
  const customerEmail = session.customer_details?.email || session.customer_email || metadata.clientEmail || 'client@vermilionroutes.com';
  const customerName = session.customer_details?.name || customerEmail.split('@')[0] || 'Valued Traveler';
  const customerPhone = session.customer_details?.phone || '';
  const tourTitle = metadata.tourTitle || 'Vermilion Routes Expedition';
  const tourId = metadata.tourId || 'custom';
  const amountPaid = (session.amount_total || 0) / 100;
  const travelDate = metadata.travelDate || 'To be confirmed';
  const guestsCount = metadata.guestsCount || '2 Travelers';
  const affiliateCode = metadata.affiliateCode ? metadata.affiliateCode.trim().toLowerCase() : undefined;

  console.log(`[Stripe Webhook] Fulfilling booking ${refCode} for ${customerEmail} - Amount: $${amountPaid} USD`);

  try {
    await createBookingInFirestore({
      refCode,
      tourId,
      tourTitle,
      customerName,
      customerEmail,
      customerPhone,
      travelDates: travelDate,
      guestsCount,
      destination: 'Ecuador / Galapagos',
      amountPaid,
      paymentMethod: 'card',
      paymentStatus: 'confirmed',
      transferRef: typeof session.payment_intent === 'string' ? session.payment_intent : session.id,
      affiliateCode,
      discountApplied: !!affiliateCode,
      status: 'confirmed',
    });
    console.log(`[Stripe Webhook] Booking ${refCode} saved in Firestore.`);
  } catch (dbErr: any) {
    console.error(`[Stripe Webhook] Failed to save booking ${refCode} in Firestore:`, dbErr);
  }

  // Credit affiliate commission if code is present
  if (affiliateCode) {
    try {
      await calculateAndDistributeCommissions({
        bookingId: refCode,
        saleAmount: amountPaid,
        affiliateCode,
      });
      console.log(`[Stripe Webhook] Commission credited for affiliate: ${affiliateCode}`);
    } catch (commErr: any) {
      console.error(`[Stripe Webhook] Error distributing commission for ${affiliateCode}:`, commErr);
    }
  }
}
