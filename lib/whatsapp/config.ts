/**
 * Configuración del asistente de WhatsApp. SOLO SERVIDOR.
 *
 * Lee variables de entorno (nombres documentados en docs/whatsapp-setup.md).
 * Nunca registres los valores: para diagnosticar usa `describeConfig()`, que solo
 * dice qué variables faltan.
 */

export const SUPPORTED_LOCALES = ['es', 'en', 'fr', 'de', 'it', 'pt', 'ja', 'zh'] as const;
export type WaLocale = (typeof SUPPORTED_LOCALES)[number];

export function isWaLocale(value: unknown): value is WaLocale {
  return typeof value === 'string' && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

/** Número público de la empresa (ya publicado en la web). Solo dígitos. */
export const COMPANY_WHATSAPP_DIGITS = '593960039156';

/** Web pública. Es la única base que la IA puede enlazar. */
export const PUBLIC_SITE_URL = 'https://www.vermilionroutes.com';

/** Límites duros. */
export const LIMITS = {
  /** Tope de tokens de salida por respuesta de la IA. */
  maxOutputTokens: 700,
  /** Tiempo máximo de espera a la IA. */
  aiTimeoutMs: 12_000,
  /** Largo máximo de un mensaje entrante que se guarda o se pasa a la IA. */
  maxInboundChars: 1_000,
  /** Largo máximo de la respuesta enviada (WhatsApp admite 4096; corto = mejor para ventas). */
  maxReplyChars: 1_200,
  /** Turnos guardados como contexto de la conversación. */
  maxHistoryTurns: 16,
  /** Mensajes por número en una ventana corta. */
  burstMax: 6,
  burstWindowMs: 60_000,
  /** Respuestas de IA por número y día. */
  dailyMax: 40,
  /** Ventana de atención al cliente de WhatsApp. */
  customerWindowMs: 24 * 60 * 60 * 1000,
  /** Cuerpo máximo aceptado en el webhook. */
  maxBodyBytes: 512 * 1024,
} as const;

export interface WhatsAppConfig {
  verifyToken: string | null;
  appSecret: string | null;
  accessToken: string | null;
  /** Si se define, se ignoran eventos de otros números de la cuenta. */
  phoneNumberId: string | null;
  aiEnabled: boolean;
  geminiApiKey: string | null;
  geminiModel: string;
  graphVersion: string;
  adminWhatsApp: string | null;
  adminEmail: string | null;
  /** Plantilla aprobada para avisar al dueño fuera de la ventana de 24 h (opcional). */
  adminTemplateName: string | null;
  adminTemplateLang: string;
}

const clean = (v: string | undefined): string | null => {
  const t = v?.trim();
  return t ? t : null;
};

const digitsOnly = (v: string | null): string | null => {
  const d = (v || '').replace(/\D/g, '');
  return d.length >= 8 && d.length <= 15 ? d : null;
};

export function getWhatsAppConfig(env: NodeJS.ProcessEnv = process.env): WhatsAppConfig {
  return {
    verifyToken: clean(env.WHATSAPP_VERIFY_TOKEN),
    appSecret: clean(env.WHATSAPP_APP_SECRET),
    accessToken: clean(env.WHATSAPP_TOKEN),
    phoneNumberId: clean(env.WHATSAPP_PHONE_NUMBER_ID),
    aiEnabled: (env.WHATSAPP_AI_ENABLED || '').trim().toLowerCase() === 'true',
    geminiApiKey: clean(env.GEMINI_API_KEY),
    geminiModel: clean(env.WHATSAPP_AI_MODEL) || 'gemini-2.5-flash',
    graphVersion: clean(env.WHATSAPP_GRAPH_VERSION) || 'v23.0',
    adminWhatsApp: digitsOnly(clean(env.ADMIN_WHATSAPP)),
    adminEmail: clean(env.ADMIN_EMAIL) || clean(env.SMTP_EMAIL),
    adminTemplateName: clean(env.WHATSAPP_ADMIN_TEMPLATE),
    adminTemplateLang: clean(env.WHATSAPP_ADMIN_TEMPLATE_LANG) || 'es',
  };
}

/** Solo nombres de variables que faltan. Seguro para logs. */
export function describeConfig(cfg: WhatsAppConfig): string[] {
  const missing: string[] = [];
  if (!cfg.verifyToken) missing.push('WHATSAPP_VERIFY_TOKEN');
  if (!cfg.appSecret) missing.push('WHATSAPP_APP_SECRET');
  if (!cfg.accessToken) missing.push('WHATSAPP_TOKEN');
  if (cfg.aiEnabled && !cfg.geminiApiKey) missing.push('GEMINI_API_KEY');
  return missing;
}
