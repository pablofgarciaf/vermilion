import { NextResponse } from 'next/server';
import { withValidation } from '@/lib/apiHandler';
import { paypalCreateOrderSchema } from '@/lib/validation';
import { createPayPalOrder } from '@/lib/paypal';

export const POST = withValidation(paypalCreateOrderSchema, async (_req, _ctx, data) => {
  try {
    const order = await createPayPalOrder({
      amount: data.amount,
      currency: 'USD',
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
