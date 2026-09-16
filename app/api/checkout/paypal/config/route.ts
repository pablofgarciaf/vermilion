import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const clientId = process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';
  if (!clientId || !process.env.PAYPAL_CLIENT_SECRET) {
    return NextResponse.json(
      { message: 'PayPal is not configured.' },
      { status: 503 }
    );
  }

  return NextResponse.json({
    clientId,
    environment: process.env.PAYPAL_MODE === 'live' ? 'live' : 'sandbox',
  });
}
