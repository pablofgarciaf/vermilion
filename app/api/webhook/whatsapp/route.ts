import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Lazy initialization of Firebase Admin SDK
let adminDb: any = null;
let adminAuth: any = null;

async function getAdminDb() {
  if (adminDb) return adminDb;
  
  const { initializeApp, getApps, cert } = await import('firebase-admin/app');
  const { getFirestore } = await import('firebase-admin/firestore');
  const { getAuth } = await import('firebase-admin/auth');

  const firebaseAdminConfig = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  if (!getApps().length && firebaseAdminConfig.projectId && firebaseAdminConfig.clientEmail && firebaseAdminConfig.privateKey) {
    initializeApp({
      credential: cert(firebaseAdminConfig),
    });
  }

  adminDb = getFirestore();
  adminAuth = getAuth();
  return adminDb;
}

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
const APP_SECRET = process.env.WHATSAPP_APP_SECRET;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse('Forbidden', { status: 403 });
}

function validateSignature(payload: string, signature: string): boolean {
  if (!APP_SECRET) return true;
  const expected = 'sha256=' + crypto.createHmac('sha256', APP_SECRET).update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

async function getLocalizedText(obj: Record<string, string> | string, loc: string): Promise<string> {
  if (typeof obj === 'string') return obj;
  return obj[loc] || obj.en || Object.values(obj)[0] || '';
}

async function processIncomingMessage({
  phoneNumberId,
  from,
  messageId,
  timestamp,
  type,
  text,
  interactive,
}: {
  phoneNumberId: string;
  from: string;
  messageId: string;
  timestamp: string;
  type: string;
  text?: string;
  interactive?: any;
}) {
  const normalizedPhone = from.replace(/^521/, '52').replace(/^0/, '');
  const adminDb = await getAdminDb();

  const parentDoc = await findParentByPhone(normalizedPhone, adminDb);
  if (!parentDoc) {
    console.log('No parent found for ' + normalizedPhone);
    return;
  }

  const { parentRef, parentType, parentData } = parentDoc;

  const messageData = {
    role: 'user',
    content: text || getInteractiveText(interactive),
    timestamp: new Date(parseInt(timestamp) * 1000),
    agent_slug: 'whatsapp-ingestor',
    confidence: 1,
    intent: 'incoming',
    whatsapp_msg_id: messageId,
    phone_number_id: phoneNumberId,
  };

  await parentRef.collection('messages').doc(messageId).set(messageData);

  await parentRef.update({
    conversation_state: 'ai_active',
    last_message_at: new Date(),
    last_message_from: 'user',
    unread_count: (parentData.unread_count || 0) + 1,
  });

  // Import classifier and router dynamically
  const { classifyIntent } = await import('@/lib/whatsapp-classifier');
  const { routeToAgent } = await import('@/lib/whatsapp-router');

  const intentResult = classifyIntent(text || getInteractiveText(interactive), parentData);

  if (parentData.conversation_state === 'human_needed' || parentData.conversation_state === 'closed') {
    return;
  }

  const agentResult = await routeToAgent({
    intent: intentResult.intent,
    confidence: intentResult.confidence,
    context: {
      parentType,
      parentData,
      message: text,
      phone: normalizedPhone,
    },
  });

  if (agentResult.shouldRespond && agentResult.response) {
    await sendWhatsAppResponse(phoneNumberId, from, agentResult.response);
    
    await parentRef.collection('messages').add({
      role: 'assistant',
      content: agentResult.response,
      timestamp: new Date(),
      agent_slug: agentResult.agentSlug,
      confidence: agentResult.confidence,
      intent: intentResult.intent,
    });

    await parentRef.update({
      'ai_metrics.resolved_count': (parentData.ai_metrics?.resolved_count || 0) + 1,
      'ai_metrics.avg_confidence': calculateNewAvg(parentData.ai_metrics?.avg_confidence || 0, agentResult.confidence, parentData.ai_metrics?.resolved_count || 0),
      'ai_metrics.last_ai_response_at': new Date(),
      conversation_state: agentResult.escalate ? 'human_needed' : 'ai_active',
      needs_human_review: agentResult.escalate || false,
    });
  }
}

async function findParentByPhone(phone: string, adminDb: any) {
  // 1. Buscar en bookings por customerPhone
  const bookingsSnap = await adminDb.collection('bookings')
    .where('customerPhone', '==', phone)
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get();

  if (!bookingsSnap.empty) {
    const doc = bookingsSnap.docs[0];
    return { parentRef: doc.ref, parentType: 'booking', parentData: doc.data() };
  }

  // 2. Buscar en leads por customerPhone
  const leadsSnap = await adminDb.collection('leads')
    .where('customerPhone', '==', phone)
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get();

  if (!leadsSnap.empty) {
    const doc = leadsSnap.docs[0];
    return { parentRef: doc.ref, parentType: 'lead', parentData: doc.data() };
  }

  // 3. Buscar en affiliates por phone
  const affiliatesSnap = await adminDb.collection('affiliates')
    .where('phone', '==', phone)
    .limit(1)
    .get();

  if (!affiliatesSnap.empty) {
    const doc = affiliatesSnap.docs[0];
    return { parentRef: doc.ref, parentType: 'affiliate', parentData: doc.data() };
  }

  // 4. Buscar en usuarios por phone
  const usersSnap = await adminDb.collection('usuarios')
    .where('phone', '==', phone)
    .limit(1)
    .get();

  if (!usersSnap.empty) {
    const doc = usersSnap.docs[0];
    return { parentRef: doc.ref, parentType: 'usuario', parentData: doc.data() };
  }

  return null;
}

async function sendWhatsAppResponse(phoneNumberId: string, to: string, text: string) {
  const token = process.env.WHATSAPP_TOKEN;
  if (!token) return;

  await fetch('https://graph.facebook.com/v20.0/' + phoneNumberId + '/messages', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: to.replace('+', ''),
      type: 'text',
      text: { body: text },
    }),
  });
}

function getInteractiveText(interactive: any): string {
  if (!interactive) return '';
  if (interactive.type === 'button_reply') return interactive.button_reply?.title || '';
  if (interactive.type === 'list_reply') return interactive.list_reply?.title || '';
  return '';
}

async function updateMessageStatus(messageId: string, status: string) {
  const adminDb = await getAdminDb();
  const collections = ['bookings', 'leads', 'affiliates'];
  for (const col of collections) {
    const snap = await adminDb.collection(col)
      .where('messages.whatsapp_msg_id', '==', messageId)
      .limit(1)
      .get();
    if (!snap.empty) {
      break;
    }
  }
}

function calculateNewAvg(currentAvg: number, newValue: number, count: number): number {
  return (currentAvg * count + newValue) / (count + 1);
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('x-hub-signature-256') || '';

  function validateSignature(payload: string, signature: string): boolean {
    if (!APP_SECRET) return true;
    const expected = 'sha256=' + crypto.createHmac('sha256', APP_SECRET).update(payload).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  }

  if (!validateSignature(body, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const data = JSON.parse(body);

  for (const entry of data.entry || []) {
    for (const change of entry.changes || []) {
      if (change.field !== 'messages') continue;

      const value = change.value;
      const phoneNumberId = value.metadata?.phone_number_id;

      for (const message of value.messages || []) {
        await processIncomingMessage({
          phoneNumberId,
          from: message.from,
          messageId: message.id,
          timestamp: message.timestamp,
          type: message.type,
          text: message.text?.body,
          interactive: message.interactive,
        });
      }

      if (value.statuses) {
        for (const status of value.statuses) {
          await updateMessageStatus(status.id, status.status);
        }
      }
    }
  }

  return NextResponse.json({ success: true });
}