import { NextRequest, NextResponse } from 'next/server';
import { recordDeviceVisit, type VisitorDevice } from '@/lib/analytics/deviceVisitStore';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const DEVICE_TYPES = new Set<VisitorDevice>(['mobile', 'tablet', 'desktop']);

/** Recibe un único tipo de pantalla agregado, tras consentimiento de analítica. */
export async function POST(request: NextRequest) {
  let body: { device?: unknown };
  try {
    body = await request.json();
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  if (typeof body.device !== 'string' || !DEVICE_TYPES.has(body.device as VisitorDevice)) {
    return new NextResponse(null, { status: 400 });
  }

  try {
    await recordDeviceVisit(body.device as VisitorDevice);
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error('[device-visit] aggregate counter unavailable:', error?.name, error?.message);
    return new NextResponse(null, { status: 503 });
  }
}

