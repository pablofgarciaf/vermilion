/**
 * Webhook de n8n para leads (opcional). NUNCA lanza: un fallo aquí no debe
 * romper el guardado del lead. Registra solo nombre/código/mensaje, nunca la URL.
 */

/** Hosts de ejemplo que no son un n8n real (p. ej. el valor de plantilla "your-n8n-instance.com"). */
const PLACEHOLDER_HOST = /(^|\.)your-n8n-instance\.com$|^example\.(com|org)$/i;

export function getN8nWebhookUrl(): string | null {
  const raw = process.env.N8N_WEBHOOK_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (PLACEHOLDER_HOST.test(url.hostname)) {
      console.warn('[n8n] N8N_WEBHOOK_URL tiene un valor de ejemplo: no se envía el webhook.');
      return null;
    }
    return url.toString();
  } catch {
    console.warn('[n8n] N8N_WEBHOOK_URL no es una URL válida: no se envía el webhook.');
    return null;
  }
}

export async function triggerN8nWebhook(payload: Record<string, unknown>): Promise<boolean> {
  const url = getN8nWebhookUrl();
  if (!url) return false;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'VermilionRoutes-API/1.0' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) console.warn(`[n8n] El webhook respondió ${res.status}`);
    return res.ok;
  } catch (err) {
    const e = err as { name?: string; code?: string; message?: string };
    console.warn('[n8n] Falló el webhook', { name: e?.name, code: e?.code, message: e?.message });
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}
