import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { getGa4Report } from '@/lib/analytics/ga4Reporting';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request, ['super', 'admin']);
  if ('response' in admin) return admin.response;
  const requestedDays = Number(new URL(request.url).searchParams.get('days'));
  const days = [7, 28, 90].includes(requestedDays) ? requestedDays : 28;
  return NextResponse.json({ success: true, period: { days }, ga4: await getGa4Report(days) });
}
