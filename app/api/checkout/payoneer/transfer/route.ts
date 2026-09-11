import { NextResponse } from 'next/server';
import { withValidation } from '@/lib/apiHandler';
import { payoneerTransferSchema } from '@/lib/validation';
import { createBookingInFirestore, generateBookingCode } from '@/lib/bookings';
import { calculateAndDistributeCommissions } from '@/lib/affiliates';
import { sendBookingConfirmationEmail } from '@/lib/email';
import { db, auth } from '@/lib/firebase';
import { signInAnonymously } from 'firebase/auth';

export const runtime = 'nodejs';

export const POST = withValidation(payoneerTransferSchema, async (_req, _ctx, data) => {
  try {
    // 🛡️ Honeypot Trap Detection (Python Bot / Automated Script Neutralizer)
    if (data._hp_trap) {
      console.warn('[SECURITY] Bot trapped in Payoneer transfer honeypot.');
      return NextResponse.json({ success: true, bookingRef: data.bookingRef, status: 'pending_payment' });
    }

    let bookingRef = data.bookingRef;
    if (!bookingRef || !bookingRef.startsWith('R-')) {
      bookingRef = await generateBookingCode(data.tourId || 'custom', data.affiliateCode);
    }

    const finalAmount = Number(data.amount) || 500;
    const clientName = data.clientName || data.clientEmail.split('@')[0] || 'Viajero Distinguido';

    // Authenticate server session for Firestore security rules if needed
    if (auth && !auth.currentUser) {
      try {
        await signInAnonymously(auth);
      } catch (authErr: any) {
        console.warn('[Payoneer Transfer] Server auth notice:', authErr.message);
      }
    }

    // Persist booking in Firestore with status 'pending_payment' (Espera de pago)
    await createBookingInFirestore({
      refCode: bookingRef,
      bookingCode: bookingRef,
      tourId: data.tourId || 'custom',
      tourTitle: data.tourTitle || 'Vermilion Routes Expedition',
      customerName: clientName,
      customerEmail: data.clientEmail,
      customerPhone: data.clientPhone || '',
      travelDates: data.travelDate || 'To be confirmed',
      guestsCount: data.guestsCount || '2 Travelers',
      destination: 'Galapagos / Ecuador',
      amountPaid: finalAmount,
      paymentMethod: 'payoneer_wire',
      paymentStatus: 'pending_payment',
      transferRef: `Payoneer Transfer (${data.currency}) - Espera de pago`,
      affiliateCode: data.affiliateCode || undefined,
      discountApplied: Boolean(data.affiliateCode),
      status: 'pending',
    });

    // Record affiliate pending commission if applicable
    if (data.affiliateCode) {
      try {
        await calculateAndDistributeCommissions({
          bookingId: bookingRef,
          saleAmount: finalAmount,
          affiliateCode: data.affiliateCode,
        });
      } catch (commErr: any) {
        console.warn('[Payoneer Transfer] Commission calculation notice:', commErr.message);
      }
    }

    // Dispatch email with transfer instructions to client
    if (data.clientEmail) {
      try {
        await sendBookingConfirmationEmail({
          toEmail: data.clientEmail,
          customerName: clientName,
          tourTitle: data.tourTitle || 'Vermilion Routes Expedition',
          bookingRef,
          amountPaid: finalAmount,
          paymentMethod: 'Transferencia Bancaria Internacional (Payoneer USD/EUR)',
          travelDate: data.travelDate || 'To be confirmed',
          guestsCount: data.guestsCount || '2 Travelers',
          locale: data.locale || 'es',
        });
      } catch (emailErr: any) {
        console.warn('[Payoneer Transfer] Email dispatch notice:', emailErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      bookingRef,
      status: 'pending_payment',
      currency: data.currency,
      amount: finalAmount,
    });
  } catch (error: any) {
    console.error('[PAYONEER_TRANSFER_ERROR]', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Payoneer Transfer Registration Error',
        message: error?.message || 'Unable to register pending wire transfer.',
      },
      { status: 500 }
    );
  }
});
