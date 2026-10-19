import crypto from 'crypto';

/**
 * Seguridad del webhook: firma de Meta, comparación en tiempo constante,
 * enmascarado de teléfonos y limpieza de texto no fiable.
 */

/** Compara dos cadenas en tiempo constante (también cuando el largo difiere). */
export function safeEqual(a: string, b: string): boolean {
  const ha = crypto.createHash('sha256').update(a, 'utf8').digest();
  const hb = crypto.createHash('sha256').update(b, 'utf8').digest();
  return crypto.timingSafeEqual(ha, hb) && a.length === b.length;
}

/**
 * Verifica `X-Hub-Signature-256` (HMAC-SHA256 del cuerpo CRUDO con el App Secret).
 * Falla cerrado: sin secreto o sin cabecera, la firma es inválida.
 */
export function verifyMetaSignature(rawBody: string, header: string | null | undefined, appSecret: string | null): boolean {
  if (!appSecret || !header) return false;
  const match = /^sha256=([a-f0-9]{64})$/i.exec(header.trim());
  if (!match) return false;
  const expected = crypto.createHmac('sha256', appSecret).update(rawBody, 'utf8').digest();
  const received = Buffer.from(match[1].toLowerCase(), 'hex');
  return received.length === expected.length && crypto.timingSafeEqual(received, expected);
}

/** Firma un cuerpo como lo haría Meta (útil en tests y pruebas locales). */
export function signMetaPayload(rawBody: string, appSecret: string): string {
  return 'sha256=' + crypto.createHmac('sha256', appSecret).update(rawBody, 'utf8').digest('hex');
}

/** 593960039156 -> 5939******56. Para logs: nunca registres el número completo. */
export function maskPhone(phone: string | null | undefined): string {
  const d = String(phone ?? '').replace(/\D/g, '');
  if (d.length <= 6) return '***';
  return `${d.slice(0, 4)}${'*'.repeat(d.length - 6)}${d.slice(-2)}`;
}

/** Id estable y no reversible a simple vista para documentos por número. */
export function phoneKey(phone: string): string {
  return crypto.createHash('sha256').update(`vermilion-wa:${phone.replace(/\D/g, '')}`).digest('hex').slice(0, 24);
}

/**
 * Limpia texto que viene del cliente o de la IA: quita caracteres de control y
 * marcas de dirección invisibles, normaliza espacios y recorta.
 */
export function sanitizeUntrusted(text: unknown, maxChars: number): string {
  return String(text ?? '')
    .normalize('NFKC')
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[​-‏‪-‮⁦-⁩﻿]/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, maxChars);
}
