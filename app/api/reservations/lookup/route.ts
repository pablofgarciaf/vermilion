import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebaseAdmin';

// Simple in-memory rate limiter (per server instance) to slow down brute-force
// guessing of reservation codes. Not perfect across serverless instances, but
// raises the cost of abuse meaningfully together with the code's entropy.
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 15;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Intenta de nuevo en un momento.' },
      { status: 429 }
    );
  }

  const refCode = req.nextUrl.searchParams.get('ref')?.trim().toUpperCase();

  if (!refCode || refCode.length < 4 || refCode.length > 40) {
    return NextResponse.json({ error: 'Número de reserva inválido.' }, { status: 400 });
  }

  try {
    const db = getAdminDb();
    const snapshot = await db
      .collection('bookings')
      .where('refCode', '==', refCode)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json({ error: 'Reserva no encontrada.' }, { status: 404 });
    }

    const bookingDoc = snapshot.docs[0];
    const data = bookingDoc.data();

    // Only return the fields the UI actually needs — never email, full name,
    // amounts or any other sensitive customer data.
    return NextResponse.json({
      id: bookingDoc.id,
      reservationNumber: data.refCode || data.bookingCode || bookingDoc.id,
      tourId: data.tourId,
      tourTitle: data.tourTitle || '',
      travelDates: data.travelDates || '',
      paymentStatus: data.paymentStatus || 'pending',
    });
  } catch (err) {
    console.error('Error looking up reservation:', err);
    return NextResponse.json(
      { error: 'Error al buscar la reserva. Intenta de nuevo.' },
      { status: 500 }
    );
  }
}
