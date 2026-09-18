import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

const DATA_FILE = path.join(process.cwd(), 'data', 'crm_bookings.json');

function getLocalBookings(): any[] {
  if (fs.existsSync(DATA_FILE)) {
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }
  return [];
}

function saveLocalBookings(bookings: any[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2), 'utf8');
}

import { db, auth } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';

export async function GET() {
  try {
    const list: any[] = [];
    const seen = new Set<string>();

    // 1. Fetch from Firestore (Source of Truth)
    if (db) {
      if (auth && !auth.currentUser && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
        try {
          await signInWithEmailAndPassword(auth, process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
        } catch (authErr) {
          console.warn('[api/crm/bookings] Server auth notice:', authErr);
        }
      }
      try {
        const snap = await getDocs(collection(db, 'bookings'));
        snap.forEach((d) => {
          const data = d.data() as any;
          const ref = data.bookingCode || data.refCode || d.id;
          seen.add(ref);
          const amount = Number(data.totalAmount || data.paidAmount || data.amountPaid || 0);
          list.push({
            id: d.id,
            bookingCode: ref,
            tourTitle: data.tourTitle || 'Expedición Vermilion',
            destination: data.destination || 'Islas Galápagos',
            customerName: data.customerName || 'Viajero Vermilion',
            customerEmail: data.customerEmail || '',
            customerPhone: data.customerPhone || '',
            passengersCount: Number(data.passengersCount) || 2,
            totalAmount: amount,
            paidAmount: amount,
            directCosts: Math.round(amount * 0.55),
            status: data.status === 'confirmed' ? 'deposit_confirmed' : (data.status || 'deposit_confirmed'),
            travelStartDate: data.travelStartDate || data.travelDates || '2026-10-22',
            travelEndDate: data.travelEndDate || data.travelDates || '2026-10-27',
            assignedOperatorId: data.assignedOperatorId || 'info@vermilionroutes.com',
            assignedOperatorName: data.assignedOperatorName || 'Jairo Ludeña',
            affiliateId: data.affiliateCode || data.affiliateId || '',
            affiliateCommissionAmount: Number(data.affiliateCommissionAmount || (amount * 0.1)),
            affiliateCommissionStatus: data.affiliateCommissionStatus || 'ready_for_review',
            operatorCommissionAmount: 250,
            operatorCommissionStatus: 'pending',
            paymentReference: data.transferRef || ref,
            vipGiftAssigned: 'Kit VIP Pakari Imperial & Sombrero Montecristi',
            vipGiftDelivered: false,
            notes: data.notes || `Reserva confirmada en línea vía ${data.paymentMethod || 'Web'}.`,
            createdAt: data.createdAt || new Date().toISOString(),
            updatedAt: data.updatedAt || new Date().toISOString(),
          });
        });
      } catch (dbErr: any) {
        console.warn('[api/crm/bookings] Firestore fetch error:', dbErr.message);
      }
    }

    // 2. Merge local bookings if not already present from Firestore
    const localBookings = getLocalBookings();
    for (const b of localBookings) {
      const ref = b.bookingCode || b.refCode || b.id;
      if (!seen.has(ref)) {
        seen.add(ref);
        list.push(b);
      }
    }

    return NextResponse.json({ success: true, count: list.length, bookings: list });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const newBooking = await req.json();
    let bookings = getLocalBookings();

    // Deduplicate by id and bookingCode
    bookings = bookings.filter(
      (b) => b.id !== newBooking.id && b.bookingCode !== newBooking.bookingCode && b.refCode !== newBooking.refCode
    );
    bookings.unshift(newBooking);
    saveLocalBookings(bookings);

    return NextResponse.json({ success: true, count: bookings.length, booking: newBooking });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, updates } = await req.json();
    if (!id || !updates) {
      return NextResponse.json({ success: false, error: 'Missing id or updates' }, { status: 400 });
    }

    let bookings = getLocalBookings();
    let updatedBooking = null;

    bookings = bookings.map((b) => {
      if (b.id === id || b.bookingCode === id || b.refCode === id) {
        updatedBooking = {
          ...b,
          ...updates,
          updatedAt: new Date().toISOString()
        };
        return updatedBooking;
      }
      return b;
    });

    saveLocalBookings(bookings);
    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
