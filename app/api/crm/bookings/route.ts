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

export async function GET() {
  try {
    const bookings = getLocalBookings();
    return NextResponse.json({ success: true, count: bookings.length, bookings });
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
