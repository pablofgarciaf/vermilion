import { NextResponse } from 'next/server';
import { createBookingInFirestore, generateBookingCode } from '@/lib/bookings';
import { calculateAndDistributeCommissions } from '@/lib/affiliates';
import { sendBookingConfirmationEmail } from '@/lib/email';
import { auth } from '@/lib/firebase';
import { signInAnonymously } from 'firebase/auth';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🛡️ Honeypot bot protection
    if (body._hp_trap) {
      console.warn('[SECURITY] Bot caught in booking confirmation honeypot.');
      return NextResponse.json({ success: true, bookingRef: body.bookingRef || 'R-BOT-TRAPPED' });
    }

    const {
      tourId = 'custom',
      tourTitle = 'Vermilion Routes Expedition',
      clientName = 'Valued Traveler',
      clientEmail = '',
      clientPhone = '',
      amount = 0,
      travelDate = 'To be confirmed',
      guestsCount = '2 Travelers',
      passengersCount = 2,
      paymentMethod = 'paypal',
      paymentStatus = 'confirmed',
      affiliateCode,
      destination = 'Ecuador & Galápagos',
      hotelTier = 'premium',
    } = body;

    let bookingRef = body.bookingRef;
    if (!bookingRef || !bookingRef.startsWith('R-')) {
      bookingRef = await generateBookingCode(tourId, affiliateCode);
    }

    // Authenticate server session for Firestore security rules if needed
    if (auth && !auth.currentUser) {
      try {
        await signInAnonymously(auth);
      } catch (authErr: any) {
        console.warn('[Confirm Booking] Server auth notice:', authErr.message);
      }
    }

    // At-least fallback email if empty
    const customerEmail = clientEmail.trim() || 'guest@vermilionroutes.com';
    const customerName = clientName.trim() || customerEmail.split('@')[0] || 'Valued Traveler';

    // Persist booking directly in Cloud Firestore
    const savedRef = await createBookingInFirestore({
      refCode: bookingRef,
      bookingCode: bookingRef,
      tourId,
      tourTitle,
      customerName,
      customerEmail,
      customerPhone: clientPhone,
      travelDates: travelDate,
      guestsCount,
      passengersCount: Number(passengersCount) || 2,
      destination,
      amountPaid: Number(amount) || 0,
      paidAmount: Number(amount) || 0,
      totalAmount: Number(amount) || 0,
      paymentMethod,
      paymentStatus: paymentStatus === 'confirmed' ? 'confirmed' : 'pending_payment',
      status: paymentStatus === 'confirmed' ? 'confirmed' : 'pending',
      affiliateCode: affiliateCode || undefined,
      discountApplied: Boolean(affiliateCode),
      sriInvoice: body.sriInvoice,
    });

    console.log(`[Confirm Booking] Successfully persisted in Firestore: ${savedRef}`);

    // If there's an affiliate code, register commission
    if (affiliateCode) {
      try {
        await calculateAndDistributeCommissions({
          bookingId: savedRef,
          saleAmount: Number(amount) || 0,
          affiliateCode,
        });
      } catch (commErr: any) {
        console.warn('[Confirm Booking] Commission registration note:', commErr.message);
      }
    }

    // Send confirmation email asynchronously if client has a real email
    if (customerEmail && customerEmail.includes('@') && !customerEmail.includes('guest@vermilionroutes.com')) {
      try {
        await sendBookingConfirmationEmail({
          toEmail: customerEmail,
          customerName,
          tourTitle,
          bookingRef: savedRef,
          amountPaid: Number(amount) || 0,
          paymentMethod: paymentMethod === 'paypal' ? 'PayPal / Tarjeta Internacional' : paymentMethod,
          travelDate,
          guestsCount,
        });
      } catch (mailErr: any) {
        console.warn('[Confirm Booking] Email notification note:', mailErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      bookingRef: savedRef,
      status: paymentStatus,
      message: 'Booking persisted successfully in Cloud Firestore',
    });
  } catch (error: any) {
    console.error('[Confirm Booking Error]', error);
    return NextResponse.json(
      {
        success: false,
        error: 'BOOKING_PERSIST_FAILED',
        message: error.message || 'Failed to persist booking in Firestore',
      },
      { status: 500 }
    );
  }
}
