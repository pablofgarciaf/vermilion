import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createBookingInFirestore, generateBookingCode } from '@/lib/bookings';
import { calculateAndDistributeCommissions } from '@/lib/affiliates';
import { sendBookingConfirmationEmail } from '@/lib/email';
import { db, auth } from '@/lib/firebase';
import { signInAnonymously } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      sessionId,
      ref,
      tourId = 'custom',
      tourTitle = 'Vermilion Routes Expedition',
      clientName = '',
      clientEmail = '',
      clientPhone = '',
      amount = 0,
      travelDate = '',
      guestsCount = '2 Travelers',
      locale = 'en',
      affiliateCode: bodyAffiliateCode,
      paymentMethod: bodyPaymentMethod,
    } = body;

    const stripeKey = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_RESTRICTED_KEY;
    let resolvedEmail = clientEmail;
    let resolvedName = clientName;
    let resolvedPhone = clientPhone;
    let resolvedAmount = Number(amount) || 0;
    let resolvedTourTitle = tourTitle;
    let resolvedTourId = tourId;
    let resolvedDate = travelDate;
    let resolvedGuests = guestsCount;
    let resolvedRef = ref || `VR-${Date.now().toString().slice(-6)}`;
    let affiliateCode: string | undefined = bodyAffiliateCode || undefined;
    let isWire = sessionId?.startsWith('wire_') || bodyPaymentMethod === 'bank_wire';
    let paymentStatus: 'confirmed' | 'pending_verification' = isWire ? 'pending_verification' : 'confirmed';
    let paymentMethod: 'card' | 'bank_wire' = isWire ? 'bank_wire' : 'card';

    // 1. If Stripe sessionId is present (cs_...) and stripeKey is configured
    if (sessionId && sessionId.startsWith('cs_') && stripeKey && !stripeKey.includes('fake')) {
      try {
        const stripe = new Stripe(stripeKey, {
          apiVersion: '2026-08-26.dahlia' as any,
        });
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session) {
          resolvedAmount = (session.amount_total || 0) / 100;
          resolvedEmail = session.customer_details?.email || session.customer_email || resolvedEmail;
          resolvedName = session.metadata?.clientName || session.customer_details?.name || resolvedName || resolvedEmail.split('@')[0];
          resolvedPhone = session.metadata?.clientPhone || session.customer_details?.phone || resolvedPhone;
          resolvedTourTitle = session.metadata?.tourTitle || resolvedTourTitle;
          resolvedTourId = session.metadata?.tourId || resolvedTourId;
          resolvedDate = session.metadata?.travelDate || resolvedDate;
          resolvedGuests = session.metadata?.guestsCount || resolvedGuests;
          resolvedRef = session.metadata?.customLinkId || resolvedRef;
          affiliateCode = session.metadata?.affiliateCode || undefined;
          paymentStatus = session.payment_status === 'paid' ? 'confirmed' : 'pending_verification';
          paymentMethod = 'card';
        }
      } catch (stripeErr: any) {
        console.warn('[verify-session] Stripe session retrieval notice:', stripeErr.message);
      }
    }

    if (!resolvedName) {
      resolvedName = resolvedEmail ? resolvedEmail.split('@')[0] : 'Viajero Distinguido';
    }

    // Ensure resolvedRef follows official format R-[year]-[tourCode]-[sequential]
    if (!resolvedRef || !resolvedRef.startsWith('R-')) {
      try {
        resolvedRef = await generateBookingCode(resolvedTourId, affiliateCode);
      } catch (e) {
        resolvedRef = `R-${new Date().getFullYear()}-1.1-80`;
      }
    }

    // 2. Ensure Firebase auth is established on the server (satisfies request.auth != null)
    if (auth && !auth.currentUser) {
      try {
        await signInAnonymously(auth);
      } catch (authErr: any) {
        console.warn('[verify-session] Server auth notice:', authErr.message);
      }
    }

    // Check if booking already exists in Firestore by refCode / bookingCode
    let existingBookingId: string | null = null;
    if (db) {
      try {
        const bookingsRef = collection(db, 'bookings');
        const q = query(bookingsRef, where('refCode', '==', resolvedRef));
        const snap = await getDocs(q);
        if (!snap.empty) {
          existingBookingId = snap.docs[0].id;
        }
      } catch (checkErr: any) {
        console.warn('[verify-session] Firestore check notice:', checkErr.message);
      }
    }

    // 3. Save to Firestore if not already saved
    if (!existingBookingId && resolvedEmail) {
      try {
        existingBookingId = await createBookingInFirestore({
          refCode: resolvedRef,
          bookingCode: resolvedRef,
          tourId: resolvedTourId,
          tourTitle: resolvedTourTitle,
          customerName: resolvedName,
          customerEmail: resolvedEmail,
          customerPhone: resolvedPhone,
          travelDates: resolvedDate || 'To be confirmed',
          guestsCount: resolvedGuests || '2 Travelers',
          destination: 'Ecuador & Galápagos',
          amountPaid: resolvedAmount,
          paymentMethod,
          paymentStatus,
          transferRef: sessionId || resolvedRef,
          affiliateCode,
          discountApplied: !!affiliateCode,
          status: isWire ? 'pending' : 'confirmed',
        });
        console.log(`[verify-session] Booking ${resolvedRef} recorded in Firestore.`);
      } catch (dbErr: any) {
        console.error('[verify-session] Firestore record error:', dbErr);
      }

      // Sync with CRM local persistent file
      try {
        const dataFile = path.join(process.cwd(), 'data', 'crm_bookings.json');
        let fileBookings: any[] = [];
        if (fs.existsSync(dataFile)) {
          fileBookings = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
        }
        const paxNum = parseInt(resolvedGuests) || 2;
        const newBookingRecord = {
          id: existingBookingId || `book-${Date.now()}`,
          bookingCode: resolvedRef,
          tourTitle: resolvedTourTitle,
          destination: 'Galápagos & Ecuador',
          customerName: resolvedName,
          customerEmail: resolvedEmail,
          customerPhone: resolvedPhone,
          passengersCount: paxNum,
          totalAmount: resolvedAmount,
          paidAmount: isWire ? 0 : resolvedAmount,
          directCosts: Math.round(resolvedAmount * 0.55),
          status: isWire ? 'deposit_pending' : 'deposit_confirmed',
          travelStartDate: resolvedDate || '2026-09-18',
          travelEndDate: resolvedDate || '2026-09-22',
          assignedOperatorId: 'info@vermilionroutes.com',
          assignedOperatorName: 'Jairo Ludeña',
          affiliateId: affiliateCode || 'pablo.g',
          affiliateCommissionAmount: Number((resolvedAmount * 0.1).toFixed(2)),
          affiliateCommissionStatus: isWire ? 'pending' : 'ready_for_review',
          operatorCommissionAmount: 150,
          operatorCommissionStatus: 'pending',
          paymentReference: sessionId || resolvedRef,
          vipGiftAssigned: 'Kit VIP Pakari Imperial & Sombrero Montecristi',
          vipGiftDelivered: false,
          notes: `Reserva registrada en línea vía ${paymentMethod}.`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        fileBookings = fileBookings.filter((b: any) => b.bookingCode !== resolvedRef && b.id !== newBookingRecord.id);
        fileBookings.unshift(newBookingRecord);
        fs.writeFileSync(dataFile, JSON.stringify(fileBookings, null, 2), 'utf8');
      } catch (fileErr) {
        console.warn('[verify-session] Local CRM file sync notice:', fileErr);
      }
    }

    // 4. Distribute affiliate commission if affiliateCode present and not yet credited
    let commissionsAlreadyCredited = false;
    if (db && resolvedRef) {
      try {
        const commCol = collection(db, 'affiliate_commissions');
        const commQ = query(commCol, where('bookingId', '==', resolvedRef));
        const commSnap = await getDocs(commQ);
        commissionsAlreadyCredited = !commSnap.empty;
      } catch (checkCommErr) {
        console.warn('[verify-session] Check commissions error:', checkCommErr);
      }
    }

    if (affiliateCode && !commissionsAlreadyCredited && resolvedAmount > 0) {
      try {
        await calculateAndDistributeCommissions({
          bookingId: resolvedRef,
          saleAmount: resolvedAmount,
          affiliateCode,
        });
      } catch (commErr: any) {
        console.warn('[verify-session] Commission distribution notice:', commErr);
      }
    }

      // 4. Send official booking confirmation email
      try {
        await sendBookingConfirmationEmail({
          toEmail: resolvedEmail,
          customerName: resolvedName,
          tourTitle: resolvedTourTitle,
          bookingRef: resolvedRef,
          amountPaid: resolvedAmount,
          paymentMethod,
          travelDate: resolvedDate || (locale === 'es' ? 'Por confirmar' : 'To be confirmed'),
          guestsCount: resolvedGuests || (locale === 'es' ? '2 Viajeros' : '2 Travelers'),
          locale: locale || 'en',
        });
      } catch (emailErr: any) {
        console.error('[verify-session] Email dispatch error:', emailErr);
      }

    return NextResponse.json({
      success: true,
      booking: {
        refCode: resolvedRef,
        customerName: resolvedName,
        customerEmail: resolvedEmail,
        customerPhone: resolvedPhone,
        tourTitle: resolvedTourTitle,
        tourId: resolvedTourId,
        amountPaid: resolvedAmount,
        travelDate: resolvedDate,
        guestsCount: resolvedGuests,
        paymentStatus,
      },
    });
  } catch (err: any) {
    console.error('[verify-session] Handler error:', err);
    return NextResponse.json({ error: err.message || 'Verification failed' }, { status: 500 });
  }
}

