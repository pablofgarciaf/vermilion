import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { withValidation } from '@/lib/apiHandler';
import { checkoutSchema } from '@/lib/validation';

export const POST = withValidation(checkoutSchema, async (request, _ctx, data) => {
  const {
    tourId,
    tourTitle,
    clientName,
    clientEmail,
    clientPhone,
    customLinkId,
    amount,
    paymentType,
    affiliateCode,
    travelDate,
    guestsCount,
    locale,
  } = data;

  const rawTitle = tourTitle as any;
  const resolvedTitle: string = typeof rawTitle === 'string'
    ? rawTitle
    : (rawTitle && typeof rawTitle === 'object' && (rawTitle.en || rawTitle.es))
      ? String(rawTitle.en || rawTitle.es)
      : 'Vermilion Routes - Bespoke Expedition';

  // Dynamically resolve baseUrl from current request host
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  const proto = request.headers.get('x-forwarded-proto') || (host?.includes('localhost') ? 'http' : 'https');
  const detectedOrigin = host ? `${proto}://${host}` : 'http://localhost:3005';
  const baseUrl = (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_BASE_URL)
    ? process.env.NEXT_PUBLIC_BASE_URL
    : (process.env.NEXT_PUBLIC_BASE_URL || detectedOrigin);

  const finalAmountUSD = amount && amount > 0 ? amount : 500;
  const targetLocale = (locale && ['es', 'en', 'fr', 'de', 'it', 'pt', 'ja', 'zh'].includes(locale)) ? locale : 'en';
  const bookingRef = customLinkId || `VR-${Date.now().toString().slice(-6)}`;
  const safeClientName = clientName ? clientName.trim() : '';

  const stripeKey = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_RESTRICTED_KEY;

  // 1. If valid Stripe key is present, create Stripe Checkout Session with Dynamic Payment Methods
  if (stripeKey && !stripeKey.includes('fake') && (stripeKey.startsWith('sk_') || stripeKey.startsWith('rk_'))) {
    try {
      const stripe = new Stripe(stripeKey, {
        apiVersion: '2026-08-26.dahlia' as any,
      });

      const session = await stripe.checkout.sessions.create({
        // Stripe Best Practice: Omit payment_method_types to enable Dynamic Payment Methods (Apple Pay, Google Pay, Cards, Link)
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: resolvedTitle,
                description: `${paymentType === 'full' ? 'Full Expedition Payment' : 'Expedition Reservation Deposit'} • Ref: ${bookingRef}`,
                images: ['https://www.vermilionroutes.com/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg'],
              },
              unit_amount: Math.round(finalAmountUSD * 100),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        customer_email: clientEmail,
        billing_address_collection: 'auto',
        locale: targetLocale === 'es' ? 'es' : 'auto',
        success_url: `${baseUrl}/${targetLocale}/checkout/success?session_id={CHECKOUT_SESSION_ID}&tourId=${tourId || 'custom'}&tourTitle=${encodeURIComponent(resolvedTitle)}&ref=${bookingRef}&name=${encodeURIComponent(safeClientName)}&email=${encodeURIComponent(clientEmail)}&amount=${finalAmountUSD}&date=${encodeURIComponent(travelDate || '')}&guests=${encodeURIComponent(guestsCount || '2')}`,
        cancel_url: `${baseUrl}/${targetLocale}/checkout/payment?tourId=${tourId || 'custom'}&tourTitle=${encodeURIComponent(resolvedTitle)}&amount=${finalAmountUSD}&ref=${bookingRef}&email=${encodeURIComponent(clientEmail)}&name=${encodeURIComponent(safeClientName)}`,
        metadata: {
          tourId: tourId || 'custom-itinerary',
          tourTitle: resolvedTitle,
          clientName: safeClientName,
          clientEmail,
          clientPhone: clientPhone || '',
          customLinkId: bookingRef,
          paymentType: paymentType || 'deposit',
          affiliateCode: affiliateCode || '',
          travelDate: travelDate || '',
          guestsCount: guestsCount || '2 Travelers',
          amountPaid: String(finalAmountUSD),
          locale: targetLocale,
        },
      });

      return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (stripeErr: any) {
      console.error('Stripe checkout session creation failed:', stripeErr.message);
      return NextResponse.json(
        { error: stripeErr.message || 'Payment session could not be created' },
        { status: 500 }
      );
    }
  }

  // 2. Direct Fallback when Stripe keys are not yet configured in environment
  const demoSuccessUrl = `${baseUrl}/${targetLocale}/checkout/success?session_id=demo_${Date.now()}&tourId=${tourId || 'custom'}&tourTitle=${encodeURIComponent(resolvedTitle)}&ref=${bookingRef}&name=${encodeURIComponent(safeClientName)}&email=${encodeURIComponent(clientEmail)}&amount=${finalAmountUSD}&date=${encodeURIComponent(travelDate || '')}&guests=${encodeURIComponent(guestsCount || '2')}`;

  return NextResponse.json({
    configured: false,
    error: 'STRIPE_NOT_CONFIGURED',
    message: 'Stripe API keys are not configured in .env. Please set STRIPE_SECRET_KEY to enable live checkout.',
    demoUrl: demoSuccessUrl,
  });
});
