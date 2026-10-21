import { describe, it, expect } from 'vitest';
import { buildQuickQuotePayload, validateQuickQuote } from '@/lib/quickQuote';
import { leadSchema } from '@/lib/validation';

describe('formulario corto de cotización', () => {
  it('rechaza nombre corto y correo inválido', () => {
    expect(validateQuickQuote({ name: 'A', email: 'a@b.co', dates: '' })).toBe('name');
    expect(validateQuickQuote({ name: 'Ana', email: 'ana@', dates: '' })).toBe('email');
    expect(validateQuickQuote({ name: 'Ana', email: 'ana@mail.com', dates: '' })).toBeNull();
  });

  it('la carga que enviamos pasa el esquema del servidor', () => {
    const payload = buildQuickQuotePayload({ name: ' Ana ', email: ' ana@mail.com ', dates: '' }, 'en', 'halloween-2026');
    expect(payload.customerName).toBe('Ana');
    expect(payload.travelDates).toBe('Flexible');
    expect(leadSchema.safeParse(payload).success).toBe(true);
  });
});
