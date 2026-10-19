import type { WhatsAppConfig } from './config';
import { maskPhone } from './security';

/**
 * Envío por WhatsApp Cloud API (Graph). Nunca registra el token ni el texto:
 * solo el número enmascarado y el código de error de Meta.
 */

export interface SendResult {
  ok: boolean;
  /** Código de error de Meta (p. ej. 131047 = fuera de la ventana de 24 h). */
  errorCode?: number;
}

export interface Sender {
  sendText(phoneNumberId: string, to: string, body: string): Promise<SendResult>;
  sendTemplate(phoneNumberId: string, to: string, name: string, lang: string, params: string[]): Promise<SendResult>;
}

export function createGraphSender(cfg: WhatsAppConfig, fetchImpl: typeof fetch = fetch): Sender {
  async function post(phoneNumberId: string, to: string, payload: Record<string, unknown>): Promise<SendResult> {
    if (!cfg.accessToken) {
      console.error('[WhatsApp] Falta WHATSAPP_TOKEN: no se envía el mensaje a', maskPhone(to));
      return { ok: false };
    }
    if (!/^\d{5,20}$/.test(phoneNumberId)) {
      console.error('[WhatsApp] phone_number_id inválido: no se envía el mensaje a', maskPhone(to));
      return { ok: false };
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);
    try {
      const res = await fetchImpl(`https://graph.facebook.com/${cfg.graphVersion}/${phoneNumberId}/messages`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${cfg.accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ messaging_product: 'whatsapp', recipient_type: 'individual', to: to.replace(/\D/g, ''), ...payload }),
        signal: controller.signal,
      });
      if (res.ok) return { ok: true };
      let errorCode: number | undefined;
      try {
        const data = (await res.json()) as { error?: { code?: number } };
        errorCode = data?.error?.code;
      } catch {
        /* cuerpo no JSON */
      }
      console.error('[WhatsApp] Graph respondió', res.status, 'código', errorCode ?? '-', 'para', maskPhone(to));
      return { ok: false, errorCode };
    } catch (err) {
      const e = err as { name?: string; message?: string };
      console.error('[WhatsApp] Error de red al enviar a', maskPhone(to), { name: e?.name, message: e?.message });
      return { ok: false };
    } finally {
      clearTimeout(timer);
    }
  }

  return {
    sendText: (phoneNumberId, to, body) => post(phoneNumberId, to, { type: 'text', text: { preview_url: true, body: body.slice(0, 4000) } }),
    sendTemplate: (phoneNumberId, to, name, lang, params) =>
      post(phoneNumberId, to, {
        type: 'template',
        template: {
          name,
          language: { code: lang },
          components: [{ type: 'body', parameters: params.map((text) => ({ type: 'text', text: text.slice(0, 200) })) }],
        },
      }),
  };
}
