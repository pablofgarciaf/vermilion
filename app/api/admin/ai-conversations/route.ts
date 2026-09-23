import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const adminDb = await getAdminDb();
    const collections = ['bookings', 'leads', 'affiliates'] as const;
    const all: any[] = [];

    for (const col of collections) {
      const snap = await adminDb
        .collection(col)
        .where('conversation_state', 'in', ['ai_active', 'human_needed', 'waiting_user'])
        .orderBy('last_message_at', 'desc')
        .limit(50)
        .get();

      snap.docs.forEach((doc) => {
        const data = doc.data();
        all.push({
          id: doc.id,
          type: col,
          phone: data.customerPhone || data.phone || '',
          name: data.customerName || data.name || 'Sin nombre',
          state: data.conversation_state,
          lastMessage: data.last_message_preview || '',
          lastMessageAt: data.last_message_at?.toDate?.()?.toISOString() || null,
          unreadCount: data.unread_count || 0,
          aiMetrics: data.ai_metrics || { resolved: 0, escalated: 0, avgConfidence: 0 },
        });
      });
    }

    all.sort((a, b) => {
      const ta = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
      const tb = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
      return tb - ta;
    });

    return NextResponse.json({ conversations: all });
  } catch (error) {
    console.error('Error fetching AI conversations:', error);
    return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 });
  }
}
