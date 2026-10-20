import { NextResponse } from 'next/server';
import { withValidation } from '@/lib/apiHandler';
import { paypalCreateOrderSchema } from '@/lib/validation';
import { createPayPalOrder } from '@/lib/paypal';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const POST = withValidation(paypalCreateOrderSchema, async (_req, _ctx, data) => {
  try {
    let verifiedAmount = data.amount;
    
    // VERIFICACION: "revise el valor y compare con lo generado y guardado en firebase"
    if (data.bookingRef && db) {
      try {
        const docSnap = await getDoc(doc(db, 'bookings', data.bookingRef));
        if (docSnap.exists()) {
          const bookingData = docSnap.data();
          if (bookingData && bookingData.totalAmount) {
            const total = Number(bookingData.totalAmount);
            const minDeposit = Number((total * 0.30).toFixed(2));
            const requested = Number(data.amount);

            // Permite tanto el pago total como un depósito legítimo (mínimo 30% hasta el 100%)
            if (requested >= (minDeposit - 1) && requested <= (total + 1)) {
              verifiedAmount = requested;
            } else {
              console.error(`[SECURITY WARNING] Invalid payment amount for ${data.bookingRef}. Allowed range [${minDeposit}, ${total}], got ${requested}. Enforcing total.`);
              verifiedAmount = total;
            }
          }
        }
      } catch(err) {
        console.warn('Error reading booking to verify price:', err);
      }
    }

    const order = await createPayPalOrder({
      amount: verifiedAmount,
      currency: data.currency || 'USD',
      bookingRef: data.bookingRef,
      tourTitle: data.tourTitle,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      simulated: order.simulated || false,
    });
  } catch (error: any) {
    console.error('[PAYPAL_CREATE_ORDER_ERROR]', error);
    return NextResponse.json(
      {
        success: false,
        error: 'PayPal Order Creation Error',
        message: error?.message || 'Unable to initiate PayPal checkout order.',
      },
      { status: 500 }
    );
  }
});
