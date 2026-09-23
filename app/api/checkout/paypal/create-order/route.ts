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
             if (Number(bookingData.totalAmount) !== Number(data.amount)) {
                console.error(`[SECURITY WARNING] Price manipulation detected for ${data.bookingRef}. Expected ${bookingData.totalAmount}, got ${data.amount}.`);
                // Enforce the backend price
                verifiedAmount = Number(bookingData.totalAmount);
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
