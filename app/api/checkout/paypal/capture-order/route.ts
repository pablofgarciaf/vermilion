import { NextResponse } from 'next/server';
import { withValidation } from '@/lib/apiHandler';
import { paypalCaptureOrderSchema } from '@/lib/validation';
import { capturePayPalOrder } from '@/lib/paypal';
import { createBookingInFirestore, generateBookingCode } from '@/lib/bookings';
import { calculateAndDistributeCommissions } from '@/lib/affiliates';
import { sendBookingConfirmationEmail } from '@/lib/email';
import { db, auth } from '@/lib/firebase';
import { signInAnonymously } from 'firebase/auth';

export const runtime = 'nodejs';

export const POST = withValidation(paypalCaptureOrderSchema, async (_req, _ctx, data) => {
  try {
    const captureResult = await capturePayPalOrder(data.orderId);

    if (captureResult.status !== 'COMPLETED') {
      return NextResponse.json(
        {
          success: false,
          error: 'PAYMENT_NOT_COMPLETED',
          message: `PayPal order status is ${captureResult.status}`,
        },
        { status: 400 }
      );
    }

    const payerEmail = captureResult.payer?.email_address || data.clientEmail || '';
    const payerName = captureResult.payer?.name?.given_name
      ? `${captureResult.payer.name.given_name} ${captureResult.payer.name.surname || ''}`.trim()
      : (data.clientName || payerEmail.split('@')[0] || 'Valued Traveler');

    // Extract exact amount and description directly from the PayPal capture response
    const purchaseUnit = captureResult.purchase_units?.[0];
    const capture = purchaseUnit?.payments?.captures?.[0];
    
    const officialAmount = capture?.amount?.value;
    const officialDescription = purchaseUnit?.description;

    const finalAmount = Number(officialAmount) || Number(data.amount) || 0;
    const finalTourTitle = officialDescription || data.tourTitle || 'Vermilion Routes Expedition';

    let bookingRef = data.bookingRef;
    if (!bookingRef || !bookingRef.startsWith('R-')) {
      bookingRef = await generateBookingCode(data.tourId || 'custom', data.affiliateCode);
    }

    // Authenticate server session for Firestore security rules if needed
    if (auth && !auth.currentUser) {
      try {
        await signInAnonymously(auth);
      } catch (authErr: any) {
        console.warn('[PayPal Capture] Server auth notice:', authErr.message);
      }
    }

    // Persist confirmed booking in Firestore
    await createBookingInFirestore({
      refCode: bookingRef,
      bookingCode: bookingRef,
      tourId: data.tourId || 'custom',
      tourTitle: finalTourTitle,
      customerName: payerName,
      customerEmail: payerEmail,
      customerPhone: '',
      travelDates: data.travelDate || 'To be confirmed',
      guestsCount: data.guestsCount || '2 Travelers',
      destination: 'Galapagos / Ecuador',
      amountPaid: finalAmount,
      paymentMethod: 'paypal',
      paymentStatus: 'confirmed',
      transferRef: `PayPal Order: ${data.orderId}`,
      affiliateCode: data.affiliateCode || undefined,
      discountApplied: Boolean(data.affiliateCode),
      status: 'confirmed',
      sriInvoice: data.sriInvoice,
    });

    // Distribute affiliate commission if applicable
    if (data.affiliateCode) {
      try {
        await calculateAndDistributeCommissions({
          bookingId: bookingRef,
          saleAmount: finalAmount,
          affiliateCode: data.affiliateCode,
        });
      } catch (commErr: any) {
        console.warn('[PayPal Capture] Commission distribution notice:', commErr.message);
      }
    }

    // Dispatch confirmation email
    if (payerEmail) {
      try {
        await sendBookingConfirmationEmail({
          toEmail: payerEmail,
          customerName: payerName,
          tourTitle: finalTourTitle,
          bookingRef,
          amountPaid: finalAmount,
          paymentMethod: 'PayPal / International Card',
          travelDate: data.travelDate || 'To be confirmed',
          guestsCount: data.guestsCount || '2 Travelers',
          locale: data.locale || 'en',
        });
      } catch (emailErr: any) {
        console.warn('[PayPal Capture] Email dispatch notice:', emailErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      status: 'COMPLETED',
      bookingRef,
      orderId: data.orderId,
    });
  } catch (error: any) {
    console.error('[PAYPAL_CAPTURE_ORDER_ERROR]', error);
    return NextResponse.json(
      {
        success: false,
        error: 'PayPal Capture Error',
        message: error?.message || 'Unable to capture PayPal payment.',
      },
      { status: 500 }
    );
  }
});
