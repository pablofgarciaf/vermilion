import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

const DATA_FILE = path.join(process.cwd(), 'data', 'crm_bookings.json');

export async function GET() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      const bookings = JSON.parse(raw);
      return NextResponse.json({ success: true, bookings });
    }
    return NextResponse.json({ success: true, bookings: [] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const newBooking = await req.json();
    let bookings: any[] = [];
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      bookings = JSON.parse(raw);
    }
    // Remove if already exists with same ref / id
    bookings = bookings.filter(b => b.id !== newBooking.id && b.bookingCode !== newBooking.bookingCode);
    bookings.unshift(newBooking);
    fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2), 'utf8');
    return NextResponse.json({ success: true, count: bookings.length });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
