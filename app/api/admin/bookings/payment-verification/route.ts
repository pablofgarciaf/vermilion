import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { getAdminDb } from '@/lib/firebaseAdmin';

export const runtime = 'nodejs';

export async function PATCH(req: NextRequest) {
  const admin = await requireAdmin(req, ['super']);
  if ('response' in admin) return admin.response;

  try {
    const body = await req.json();
    const bookingId = String(body?.bookingId || '').trim();
    const verified = Boolean(body?.verified);

    if (!bookingId) {
      return NextResponse.json({ success: false, error: 'MISSING_BOOKING_ID' }, { status: 400 });
    }

    const updates = verified
      ? {
          paymentStatus: 'payment_verified',
          paymentVerificationStatus: 'verified',
          paymentVerifiedAt: new Date().toISOString(),
          paymentVerifiedBy: admin.user.email,
          updatedAt: new Date().toISOString(),
        }
      : {
          paymentStatus: 'paid',
          paymentVerificationStatus: 'unverified',
          paymentVerifiedAt: null,
          paymentVerifiedBy: null,
          updatedAt: new Date().toISOString(),
        };

    await getAdminDb().collection('bookings').doc(bookingId).set(updates, { merge: true });

    return NextResponse.json({ success: true, bookingId, updates });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'PAYMENT_VERIFICATION_FAILED', message: error?.message || 'Unable to update payment verification.' },
      { status: 500 }
    );
  }
}
