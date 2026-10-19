import { randomBytes } from 'crypto';
import { buildSystemPrompt, parseDecision, type AiClient } from './ai';
import { recommendationBlock } from './catalog';
import { LIMITS, type WaLocale, type WhatsAppConfig } from './config';
import { guardReply } from './guard';
import { detectHandoff, detectLocale, isOptIn, isOptOut, type HandoffReason } from './intents';
import type { Notifier } from './notify';
import { maskPhone, phoneKey, sanitizeUntrusted } from './security';
import type { Sender } from './sender';
import {
  applyRateLimit,
  buildLeadPayload,
  ecuadorDay,
  newConversation,
  pushTurn,
  type ConversationRecord,
  type WhatsAppStore,
} from './store';
import { FIXED_TEXTS } from './texts';

/**
 * Orquestador del webhook. Todo lo externo (Firestore, Gemini, Graph, correo)
 * llega por `deps`, así que se prueba sin red.
 */

export interface InboundMessage {
  id: string;
  from: string;
  timestampMs: number;
  type: string;
  text: string;
  name?: string;
  phoneNumberId: string;
}

export interface OwnerEcho {
  /** Número del cliente al que el dueño respondió desde la app (coexistencia). */
  to: string;
  phoneNumberId: string;
}

export interface WebhookEvents {
  messages: InboundMessage[];
  echoes: OwnerEcho[];
}

export interface ProcessorDeps {
  config: WhatsAppConfig;
  store: WhatsAppStore;
  ai: AiClient | null;
  sender: Sender;
  notifier: Notifier;
  now: () => number;
}

export type Outcome =
  | 'ignored'
  | 'duplicate'
  | 'opted_out'
  | 'opted_in'
  | 'silenced'
  | 'rate_limited'
  | 'human_mode'
  | 'stored'
  | 'window_closed'
  | 'text_only'
  | 'handoff'
  | 'replied';

type Obj = Record<string, unknown>;
const obj = (v: unknown): Obj => (v && typeof v === 'object' ? (v as Obj) : {});
const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
const str = (v: unknown): string => (typeof v === 'string' ? v : '');

/** Extrae solo lo que necesitamos del payload de Meta, validando tipos. */
export function extractEvents(payload: unknown): WebhookEvents {
  const out: WebhookEvents = { messages: [], echoes: [] };
  const root = obj(payload);
  if (root.object !== 'whatsapp_business_account') return out;

  for (const entry of arr(root.entry)) {
    for (const change of arr(obj(entry).changes)) {
      const c = obj(change);
      const value = obj(c.value);
      const phoneNumberId = str(obj(value.metadata).phone_number_id);

      if (c.field === 'messages') {
        const contacts = arr(value.contacts).map(obj);
        for (const m of arr(value.messages).map(obj)) {
          const from = str(m.from).replace(/\D/g, '');
          const id = str(m.id);
          if (!from || !id) continue;
          const contact = contacts.find((ct) => str(ct.wa_id) === from) || contacts[0] || {};
          const interactive = obj(m.interactive);
          const text =
            str(obj(m.text).body) ||
            str(obj(interactive.button_reply).title) ||
            str(obj(interactive.list_reply).title) ||
            str(obj(m.button).text);
          out.messages.push({
            id,
            from,
            timestampMs: (Number(m.timestamp) || 0) * 1000,
            type: str(m.type) || 'unknown',
            text,
            name: str(obj(contact.profile).name) || undefined,
            phoneNumberId,
          });
        }
      }

      // Coexistencia (app WhatsApp Business + Cloud API): el dueño respondió desde su móvil.
      if (c.field === 'smb_message_echoes') {
        for (const e of arr(value.message_echoes).map(obj)) {
          const to = str(e.to).replace(/\D/g, '');
          if (to) out.echoes.push({ to, phoneNumberId });
        }
      }
    }
  }
  return out;
}

const log = (msg: string, extra: Obj = {}) => console.log(`[WhatsApp] ${msg}`, extra);

export async function processEvents(events: WebhookEvents, deps: ProcessorDeps): Promise<Outcome[]> {
  const outcomes: Outcome[] = [];
  for (const echo of events.echoes) {
    await processOwnerEcho(echo, deps).catch((err) => logError('echo', echo.to, err));
  }
  for (const message of events.messages) {
    try {
      outcomes.push(await processInbound(message, deps));
    } catch (err) {
      logError('message', message.from, err);
      outcomes.push('ignored');
    }
  }
  return outcomes;
}

function logError(kind: string, phone: string, err: unknown) {
  const e = err as { name?: string; code?: string | number; message?: string };
  console.error(`[WhatsApp] Error procesando ${kind} de ${maskPhone(phone)}`, { name: e?.name, code: e?.code, message: e?.message });
}

/** El dueño contestó desde la app: la IA se calla en ese hilo. */
async function processOwnerEcho(echo: OwnerEcho, deps: ProcessorDeps): Promise<void> {
  const key = phoneKey(echo.to);
  const conv = await deps.store.loadConversation(key);
  if (!conv || conv.state !== 'ai_active') return;
  conv.state = 'needs_human';
  conv.handoffReason = 'owner_replied';
  conv.handoffAt = deps.now();
  conv.updatedAt = deps.now();
  await deps.store.saveConversation(key, conv);
  if (conv.leadId) await deps.store.upsertLead(conv.leadId, buildLeadPayload(conv, deps.now(), false), false);
  log('El dueño respondió desde la app; IA en pausa', { phone: maskPhone(echo.to) });
}

export async function processInbound(msg: InboundMessage, deps: ProcessorDeps): Promise<Outcome> {
  const { config, store } = deps;
  const now = deps.now();

  if (config.phoneNumberId && msg.phoneNumberId !== config.phoneNumberId) return 'ignored';
  if (!(await store.claimMessage(msg.id, now))) return 'duplicate';

  const key = phoneKey(msg.from);
  const text = sanitizeUntrusted(msg.text, LIMITS.maxInboundChars);
  const existing = await store.loadConversation(key);
  const conv: ConversationRecord = existing || newConversation(msg.from, detectLocale(text, 'es'), now);
  if (msg.name) conv.name = sanitizeUntrusted(msg.name, 80).replace(/\s+/g, ' ');
  const msgTime = msg.timestampMs > 0 ? Math.min(msg.timestampMs, now) : now;
  // Ventana de 24 h: cuenta desde el último mensaje REAL del cliente, no desde que lo procesamos.
  conv.lastInboundAt = Math.max(existing?.lastInboundAt || 0, msgTime);
  conv.updatedAt = now;
  if (text) conv.locale = detectLocale(text, conv.locale);

  const ctx = { msg, conv, key, now, deps };

  // 1. Baja (STOP / BAJA): se respeta siempre y antes que nada.
  if (text && isOptOut(text)) {
    conv.state = 'opted_out';
    conv.optedOutAt = now;
    if (config.aiEnabled) await reply(ctx, FIXED_TEXTS[conv.locale].optOutConfirm);
    await persist(ctx);
    log('Baja registrada', { phone: maskPhone(msg.from) });
    return 'opted_out';
  }
  if (conv.state === 'opted_out') {
    if (text && isOptIn(text)) {
      conv.state = 'ai_active';
      conv.optedOutAt = undefined;
      if (config.aiEnabled) await reply(ctx, FIXED_TEXTS[conv.locale].optInConfirm);
      await persist(ctx);
      return 'opted_in';
    }
    await persist(ctx, { touchLead: false });
    return 'silenced';
  }

  // 2. Frecuencia por número (protege la cuota de IA y de WhatsApp).
  const limited = applyRateLimit(conv.rate, now);
  conv.rate = limited.rate;
  if (!limited.allowed) {
    await store.saveConversation(key, conv);
    log('Límite de frecuencia alcanzado', { phone: maskPhone(msg.from) });
    return 'rate_limited';
  }

  conv.lastCustomerMessage = text || `[${msg.type}]`;
  conv.history = pushTurn(conv.history, { role: 'user', text: text || `[${msg.type}]` });

  // 3. Un humano ya lleva el hilo: solo guardamos.
  if (conv.state === 'needs_human') {
    await persist(ctx);
    return 'human_mode';
  }

  // 4. IA apagada: guardar el lead y avisar al humano una vez por lead nuevo.
  if (!config.aiEnabled) {
    const isNewLead = await persist(ctx);
    if (isNewLead) await notifyOwner(ctx, 'new_lead');
    return 'stored';
  }

  // 5. Fuera de la ventana de 24 h solo se permiten plantillas: no respondemos texto libre.
  if (now - conv.lastInboundAt > LIMITS.customerWindowMs) {
    await persist(ctx);
    return 'window_closed';
  }

  // 6. Audio, imagen, ubicación...: pedimos texto.
  if (!text) {
    await reply(ctx, FIXED_TEXTS[conv.locale].textOnly);
    await persist(ctx);
    return 'text_only';
  }

  // 7. Reglas deterministas de paso a humano (no dependen de la IA).
  const ruleReason = detectHandoff(text);
  if (ruleReason) return handoff(ctx, ruleReason, FIXED_TEXTS[conv.locale].handoff);

  // 8. IA.
  if (!deps.ai) return handoff(ctx, 'ai_error', FIXED_TEXTS[conv.locale].aiFallback);
  let decision;
  try {
    const raw = await deps.ai.generate({
      systemPrompt: buildSystemPrompt(conv.locale),
      history: conv.history,
      maxOutputTokens: LIMITS.maxOutputTokens,
      timeoutMs: LIMITS.aiTimeoutMs,
    });
    decision = parseDecision(raw, conv.locale);
  } catch (err) {
    const e = err as { name?: string; message?: string };
    console.error('[WhatsApp] La IA falló', { phone: maskPhone(msg.from), name: e?.name, message: e?.message?.slice(0, 200) });
    return handoff(ctx, 'ai_error', FIXED_TEXTS[conv.locale].aiFallback);
  }

  conv.locale = decision.language;
  conv.lead = mergeLead(conv.lead, decision.lead);
  if (decision.recommendedTourIds.length) conv.recommendedTourIds = decision.recommendedTourIds;

  // 9. Guarda de salida: precios, descuentos y enlaces contra el catálogo.
  const guarded = guardReply(decision.reply);
  if (!guarded.ok) {
    console.warn('[WhatsApp] Respuesta de IA bloqueada', { phone: maskPhone(msg.from), violations: guarded.violations });
    return handoff(ctx, 'guard_blocked', FIXED_TEXTS[conv.locale].handoff);
  }

  if (decision.handoff) {
    return handoff(ctx, decision.handoffReason || 'ai_unsure', guarded.text || FIXED_TEXTS[conv.locale].handoff);
  }

  const block = recommendationBlock(decision.recommendedTourIds, conv.locale);
  await reply(ctx, block ? `${guarded.text}\n\n${block}` : guarded.text);
  await persist(ctx);
  return 'replied';
}

interface Ctx {
  msg: InboundMessage;
  conv: ConversationRecord;
  key: string;
  now: number;
  deps: ProcessorDeps;
}

function mergeLead(prev: ConversationRecord['lead'], next: ConversationRecord['lead']): ConversationRecord['lead'] {
  const out = { ...prev };
  for (const [k, v] of Object.entries(next) as Array<[keyof typeof next, string | undefined]>) {
    if (v) out[k] = v;
  }
  return out;
}

async function reply(ctx: Ctx, body: string): Promise<boolean> {
  const { conv, msg, now, deps } = ctx;
  if (now - conv.lastInboundAt > LIMITS.customerWindowMs) return false;
  const res = await deps.sender.sendText(msg.phoneNumberId, msg.from, body);
  if (res.ok) conv.history = pushTurn(conv.history, { role: 'model', text: body.slice(0, LIMITS.maxReplyChars) });
  return res.ok;
}

/** Guarda la conversación y el lead del día. Devuelve true si el lead es nuevo. */
async function persist(ctx: Ctx, opts: { touchLead?: boolean } = {}): Promise<boolean> {
  const { conv, key, now, deps } = ctx;
  let isNew = false;
  if (opts.touchLead !== false) {
    const day = ecuadorDay(now);
    if (conv.leadDay !== day || !conv.leadId) {
      isNew = true;
      conv.leadDay = day;
      // Id aleatorio (no derivable del teléfono): nadie puede pre-crear el documento desde el navegador.
      conv.leadId = `wa_${day.replace(/-/g, '')}_${randomBytes(9).toString('hex')}`;
    }
  }
  await deps.store.saveConversation(key, conv);
  if (opts.touchLead !== false && conv.leadId) {
    await deps.store.upsertLead(conv.leadId, buildLeadPayload(conv, now, isNew), isNew);
  }
  return isNew;
}

async function notifyOwner(ctx: Ctx, reason: string): Promise<void> {
  const { conv, msg, deps } = ctx;
  const result = await deps.notifier
    .notifyOwner({
      reason,
      phone: msg.from,
      name: conv.lead.name || conv.name,
      locale: conv.locale as WaLocale,
      leadId: conv.leadId,
      lastMessage: conv.lastCustomerMessage,
      lead: conv.lead,
      recommendedTourIds: conv.recommendedTourIds,
      phoneNumberId: msg.phoneNumberId,
    })
    .catch((err) => {
      logError('notify', msg.from, err);
      return { email: false, whatsapp: false };
    });
  conv.ownerNotified = result.email || result.whatsapp;
  await deps.store.saveConversation(ctx.key, conv);
}

/** Pasa el hilo a humano: la IA deja de responder y se avisa al dueño una sola vez. */
async function handoff(ctx: Ctx, reason: HandoffReason, customerText: string): Promise<Outcome> {
  const { conv, msg } = ctx;
  conv.state = 'needs_human';
  conv.handoffReason = reason;
  conv.handoffAt = ctx.now;
  await reply(ctx, customerText);
  await persist(ctx);
  await notifyOwner(ctx, reason);
  log('Conversación pasada a humano', { phone: maskPhone(msg.from), reason });
  return 'handoff';
}
