import type { LeadFacts } from './ai';
import { findTour } from './catalog';
import type { WhatsAppConfig } from './config';
import type { Sender } from './sender';
import { maskPhone } from './security';

/**
 * Aviso al dueño cuando una conversación necesita a un humano (o, con la IA
 * apagada, cuando entra un lead nuevo). Dos canales independientes:
 *  1. Correo a LEAD_ALERT_EMAIL (o SMTP_EMAIL) con las mismas variables SMTP del sitio.
 *  2. WhatsApp a ADMIN_WHATSAPP (si existe). Fuera de la ventana de 24 h del
 *     dueño solo sirve una plantilla aprobada (WHATSAPP_ADMIN_TEMPLATE).
 *
 * El aviso NUNCA se pierde en silencio: si los dos canales fallan se registra
 * con console.error (sin teléfono completo ni texto del cliente) y el estado
 * queda en Firestore (`needsHuman`, `ownerNotified: false`).
 */

export type AlertReason =
  | 'new_lead'
  | 'human_requested'
  | 'ready_to_pay'
  | 'complaint'
  | 'ai_unsure'
  | 'ai_error'
  | 'guard_blocked';

export interface OwnerAlert {
  reason: AlertReason | string;
  phone: string;
  name?: string;
  locale: string;
  leadId?: string;
  lastMessage?: string;
  lead: LeadFacts;
  recommendedTourIds: string[];
  phoneNumberId: string;
}

export interface NotifyResult {
  email: boolean;
  whatsapp: boolean;
}

export interface Notifier {
  notifyOwner(alert: OwnerAlert): Promise<NotifyResult>;
}

export const REASON_LABEL_ES: Record<string, string> = {
  new_lead: 'Nuevo cliente por WhatsApp',
  human_requested: 'Pide hablar con una persona',
  ready_to_pay: 'Listo para pagar o reservar',
  complaint: 'Queja o reclamación',
  ai_unsure: 'Pregunta que la IA no sabe responder',
  ai_error: 'La IA no respondió (error técnico)',
  guard_blocked: 'Respuesta de la IA bloqueada por seguridad',
};

const escapeHtml = (v: unknown) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export function buildAlertText(alert: OwnerAlert): string {
  const tours = alert.recommendedTourIds.map((id) => findTour(id)?.title('es')).filter(Boolean);
  const lines = [
    `🔔 ${REASON_LABEL_ES[alert.reason] || alert.reason}`,
    `Cliente: ${alert.name || 'sin nombre'} · +${alert.phone}`,
    `Idioma: ${alert.locale}`,
    alert.lead.travelDates && `Fechas: ${alert.lead.travelDates}`,
    alert.lead.travelers && `Viajeros: ${alert.lead.travelers}`,
    alert.lead.budget && `Presupuesto: ${alert.lead.budget}`,
    alert.lead.interests && `Intereses: ${alert.lead.interests}`,
    tours.length > 0 && `Tours sugeridos: ${tours.join(' | ')}`,
    alert.lastMessage && `Último mensaje: "${alert.lastMessage.slice(0, 300)}"`,
    `Responder: https://wa.me/${alert.phone}`,
    alert.leadId && `Lead: ${alert.leadId}`,
  ];
  return lines.filter(Boolean).join('\n');
}

function buildAlertHtml(alert: OwnerAlert): string {
  const rows = buildAlertText(alert)
    .split('\n')
    .slice(1)
    .map((l) => `<p style="margin:4px 0;font-size:14px;color:#18181b;">${escapeHtml(l)}</p>`)
    .join('');
  return `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e4e4e7;border-radius:10px;">
    <h2 style="margin:0 0 12px 0;color:#065f46;">🔔 ${escapeHtml(REASON_LABEL_ES[alert.reason] || alert.reason)}</h2>
    <a href="https://wa.me/${escapeHtml(alert.phone)}" style="display:inline-block;margin:0 0 16px 0;padding:12px 20px;background:#16a34a;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;">💬 Responder por WhatsApp</a>
    ${rows}
    <p style="margin-top:16px;color:#a1a1aa;font-size:11px;">Aviso automático del asistente de WhatsApp. La IA ya no responde en este hilo. Para reactivarla, cambia <code>state</code> a <code>ai_active</code> en <code>whatsapp_conversations</code>.</p>
  </div>`;
}

async function sendAlertEmail(cfg: WhatsAppConfig, alert: OwnerAlert): Promise<boolean> {
  const user = process.env.SMTP_EMAIL || 'info@vermilionroutes.com';
  const pass = process.env.SMTP_PASSWORD || '';
  const to = cfg.adminEmail;
  if (!pass || !to) {
    console.error('[WhatsApp] Aviso por correo no enviado: falta SMTP_PASSWORD o el destinatario (LEAD_ALERT_EMAIL / SMTP_EMAIL).');
    return false;
  }
  try {
    const nodemailer = (await import('nodemailer')).default;
    const port = parseInt(process.env.SMTP_PORT || '465', 10);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.vermilionroutes.com',
      port,
      secure: port === 465,
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
      auth: { user, pass },
    });
    await transporter.sendMail({
      from: `"Vermilion WhatsApp" <${user}>`,
      to,
      subject: `🔔 WhatsApp: ${REASON_LABEL_ES[alert.reason] || alert.reason} — ${(alert.name || 'cliente').slice(0, 40)}`,
      text: buildAlertText(alert),
      html: buildAlertHtml(alert),
    });
    return true;
  } catch (err) {
    const e = err as { name?: string; code?: string; responseCode?: number; message?: string };
    console.error('[WhatsApp] Falló el aviso por correo', {
      lead: alert.leadId,
      name: e?.name,
      code: e?.code,
      responseCode: e?.responseCode,
      message: e?.message,
    });
    return false;
  }
}

async function sendAlertWhatsApp(cfg: WhatsAppConfig, sender: Sender, alert: OwnerAlert): Promise<boolean> {
  const admin = cfg.adminWhatsApp;
  const phoneNumberId = cfg.phoneNumberId || alert.phoneNumberId;
  if (!admin || !phoneNumberId) return false;
  const text = await sender.sendText(phoneNumberId, admin, buildAlertText(alert));
  if (text.ok) return true;
  // Fuera de la ventana de 24 h del dueño: solo una plantilla aprobada llega.
  if (cfg.adminTemplateName) {
    const tpl = await sender.sendTemplate(phoneNumberId, admin, cfg.adminTemplateName, cfg.adminTemplateLang, [
      (alert.name || 'Cliente').slice(0, 60),
      `+${alert.phone}`,
      REASON_LABEL_ES[alert.reason] || String(alert.reason),
    ]);
    return tpl.ok;
  }
  return false;
}

export function createNotifier(cfg: WhatsAppConfig, sender: Sender): Notifier {
  return {
    async notifyOwner(alert) {
      const [email, whatsapp] = await Promise.all([
        sendAlertEmail(cfg, alert),
        sendAlertWhatsApp(cfg, sender, alert).catch(() => false),
      ]);
      if (!email && !whatsapp) {
        console.error('[WhatsApp] AVISO AL DUEÑO NO ENTREGADO. Revisa el lead en Firestore.', {
          reason: alert.reason,
          lead: alert.leadId,
          phone: maskPhone(alert.phone),
        });
      }
      return { email, whatsapp };
    },
  };
}
