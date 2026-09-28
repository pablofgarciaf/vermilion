import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🛡️ Honeypot bot protection
    if (body._hp_trap) {
      console.warn('[SECURITY] Bot caught in booking confirmation honeypot.');
      return NextResponse.json({ success: true, bookingRef: body.bookingRef || 'R-BOT-TRAPPED' });
    }

    return NextResponse.json({
      success: false,
      error: 'CLIENT_CONFIRMATION_DISABLED',
      message: 'Paid bookings must be created by Stripe webhooks or the server-side PayPal capture endpoint.',
    }, { status: 403 });
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
