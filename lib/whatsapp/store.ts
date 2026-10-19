import crypto from 'crypto';
import type { HistoryTurn, LeadFacts } from './ai';
import { findTour } from './catalog';
import { LIMITS, type WaLocale } from './config';

/**
 * Estado de las conversaciones y leads de WhatsApp.
 *
 * Colecciones (Firestore, solo vía Admin SDK; las reglas del cliente no las abren):
 *  - `whatsapp_conversations/{phoneKey}`: estado del hilo (IA activa, humano, baja),
 *    últimos turnos, datos del lead y contadores de frecuencia.
 *  - `whatsapp_processed/{sha256(message.id)}`: deduplicación de reintentos de Meta.
 *    Lleva `expireAt` para poder activar una política TTL en Firestore.
 *  - `bookings/{leadId}`: el lead, con el mismo formato que `/api/leads`
 *    (`tourId: 'whatsapp-lead'`). Un documento por número y día.
 */

/**
 * `tourId` de los leads de WhatsApp. Al unir con la rama de leads, añadirlo a
 * `WEB_INQUIRY_TOUR_IDS` (lib/crm/webInquiry.ts) para que el CRM lo muestre como solicitud.
 */
export const WHATSAPP_LEAD_TOUR_ID = 'whatsapp-lead';

export type ConversationState = 'ai_active' | 'needs_human' | 'opted_out';

export interface RateState {
  burstStart: number;
  burstCount: number;
  day: string;
  dayCount: number;
}

export interface ConversationRecord {
  phone: string;
  name?: string;
  state: ConversationState;
  locale: WaLocale;
  lastInboundAt: number;
  history: HistoryTurn[];
  lead: LeadFacts;
  recommendedTourIds: string[];
  lastCustomerMessage?: string;
  leadId?: string;
  leadDay?: string;
  handoffReason?: string;
  handoffAt?: number;
  ownerNotified?: boolean;
  optedOutAt?: number;
  rate: RateState;
  createdAt: number;
  updatedAt: number;
}

export interface WhatsAppStore {
  /** true si es la primera vez que vemos este message.id (operación atómica). */
  claimMessage(messageId: string, now: number): Promise<boolean>;
  loadConversation(key: string): Promise<ConversationRecord | null>;
  saveConversation(key: string, record: ConversationRecord): Promise<void>;
  /** Crea (isNew) o actualiza el lead en `bookings`. */
  upsertLead(leadId: string, payload: Record<string, unknown>, isNew: boolean): Promise<void>;
}

/** Día en hora de Ecuador (UTC-5), formato YYYY-MM-DD. */
export function ecuadorDay(now: number): string {
  return new Date(now - 5 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

export function newConversation(phone: string, locale: WaLocale, now: number): ConversationRecord {
  return {
    phone,
    state: 'ai_active',
    locale,
    lastInboundAt: now,
    history: [],
    lead: {},
    recommendedTourIds: [],
    rate: { burstStart: now, burstCount: 0, day: ecuadorDay(now), dayCount: 0 },
    createdAt: now,
    updatedAt: now,
  };
}

/** Limitador por número: ráfaga corta + tope diario. Puro (sin E/S). */
export function applyRateLimit(rate: RateState, now: number): { allowed: boolean; rate: RateState } {
  const next = { ...rate };
  if (now - next.burstStart > LIMITS.burstWindowMs) {
    next.burstStart = now;
    next.burstCount = 0;
  }
  const day = ecuadorDay(now);
  if (next.day !== day) {
    next.day = day;
    next.dayCount = 0;
  }
  next.burstCount += 1;
  next.dayCount += 1;
  return { allowed: next.burstCount <= LIMITS.burstMax && next.dayCount <= LIMITS.dailyMax, rate: next };
}

export function pushTurn(history: HistoryTurn[], turn: HistoryTurn): HistoryTurn[] {
  return [...history, turn].slice(-LIMITS.maxHistoryTurns);
}

/**
 * Documento del lead para `bookings`, mismo formato que `/api/leads`
 * (BookingRequest) más campos propios del canal.
 */
export function buildLeadPayload(conv: ConversationRecord, now: number, isNew: boolean): Record<string, unknown> {
  const firstTour = conv.recommendedTourIds.map((id) => findTour(id)).find(Boolean);
  const facts = conv.lead;
  const notes = [
    facts.budget && `Presupuesto: ${facts.budget}`,
    facts.interests && `Intereses: ${facts.interests}`,
    conv.recommendedTourIds.length > 0 && `Tours sugeridos: ${conv.recommendedTourIds.join(', ')}`,
    conv.lastCustomerMessage && `Último mensaje: ${conv.lastCustomerMessage.slice(0, 500)}`,
  ].filter(Boolean);

  const payload: Record<string, unknown> = {
    tourId: WHATSAPP_LEAD_TOUR_ID,
    tourTitle: firstTour ? `WhatsApp: ${firstTour.title('es')}` : 'WhatsApp Inquiry',
    customerName: facts.name || conv.name || 'Cliente WhatsApp',
    customerEmail: facts.email || '',
    customerPhone: `+${conv.phone}`,
    travelDates: facts.travelDates || 'Flexible',
    guestsCount: facts.travelers || '',
    destination: facts.destination || firstTour?.destination || 'Galapagos / Mainland Ecuador',
    message: `Conversación de WhatsApp.${notes.length ? '\n' + notes.join('\n') : ''}`,
    status: 'pending',
    source: 'whatsapp',
    locale: conv.locale,
    budget: facts.budget || '',
    interests: facts.interests || '',
    recommendedTourIds: conv.recommendedTourIds,
    conversationState: conv.state,
    needsHuman: conv.state === 'needs_human',
    handoffReason: conv.handoffReason || null,
    optedOut: conv.state === 'opted_out',
    // Campos que lee el panel /api/admin/ai-conversations (no tocar sus nombres).
    conversation_state: conv.state === 'needs_human' ? 'human_needed' : conv.state === 'opted_out' ? 'closed' : 'ai_active',
    last_message_at: new Date(now),
    last_message_from: 'user',
    last_message_preview: (conv.lastCustomerMessage || '').slice(0, 120),
    channel: 'whatsapp',
    updatedAt: new Date(now).toISOString(),
  };
  if (isNew) payload.createdAt = new Date(now).toISOString();
  return payload;
}

const hashId = (id: string) => crypto.createHash('sha256').update(id).digest('hex');

/** Implementación real sobre Firestore (firebase-admin, carga perezosa). */
export function createFirestoreStore(): WhatsAppStore {
  const db = async () => {
    const { getAdminDb } = await import('@/lib/firebaseAdmin');
    return getAdminDb();
  };
  return {
    async claimMessage(messageId, now) {
      const ref = (await db()).collection('whatsapp_processed').doc(hashId(messageId));
      try {
        await ref.create({ at: new Date(now), expireAt: new Date(now + 7 * 24 * 60 * 60 * 1000) });
        return true;
      } catch (err) {
        // 6 = ALREADY_EXISTS: Meta reintentó un mensaje que ya procesamos.
        if ((err as { code?: number | string })?.code === 6 || (err as { code?: string })?.code === 'already-exists') return false;
        throw err;
      }
    },
    async loadConversation(key) {
      const snap = await (await db()).collection('whatsapp_conversations').doc(key).get();
      return snap.exists ? (snap.data() as ConversationRecord) : null;
    },
    async saveConversation(key, record) {
      await (await db()).collection('whatsapp_conversations').doc(key).set(JSON.parse(JSON.stringify(record)));
    },
    async upsertLead(leadId, payload) {
      const clean = Object.fromEntries(Object.entries(payload).filter(([, v]) => v !== undefined));
      await (await db()).collection('bookings').doc(leadId).set(clean, { merge: true });
    },
  };
}

/** Implementación en memoria (tests y desarrollo sin Firebase). */
export function createMemoryStore() {
  const processed = new Set<string>();
  const conversations = new Map<string, ConversationRecord>();
  const leads = new Map<string, Record<string, unknown>>();
  const store: WhatsAppStore = {
    async claimMessage(id) {
      if (processed.has(id)) return false;
      processed.add(id);
      return true;
    },
    async loadConversation(key) {
      const c = conversations.get(key);
      return c ? structuredClone(c) : null;
    },
    async saveConversation(key, record) {
      conversations.set(key, structuredClone(record));
    },
    async upsertLead(leadId, payload, isNew) {
      leads.set(leadId, { ...(isNew ? {} : leads.get(leadId) || {}), ...payload });
    },
  };
  return { store, conversations, leads };
}
