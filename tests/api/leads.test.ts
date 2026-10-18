/**
 * Tests de integración para /api/leads
 *
 * Cubre validación de inputs, sanitización XSS, persistencia en Firestore,
 * disparo de webhook n8n, y manejo de errores.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

// ── Mocks ────────────────────────────────────────────────────────────────────

const { mockAddDoc, mockCollection } = vi.hoisted(() => ({
  mockAddDoc: vi.fn(),
  mockCollection: vi.fn(() => ({})),
}));

vi.mock('@/lib/firebase', () => ({
  db: {},
}));

vi.mock('firebase/firestore', () => ({
  collection: mockCollection,
  addDoc: mockAddDoc,
}));

// El aviso por correo se ejecuta tras responder; aquí no debe tocar el SMTP real.
const { mockNotifyNewLead } = vi.hoisted(() => ({ mockNotifyNewLead: vi.fn() }));
vi.mock('@/lib/email', () => ({ notifyNewLead: mockNotifyNewLead }));

/** Deja correr las tareas posteriores a la respuesta (correo + n8n). */
const flushAfterResponse = () => new Promise((resolve) => setTimeout(resolve, 0));

import { POST } from '@/app/api/leads/route';

// Global fetch mock for n8n webhook tests
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeLeadRequest(body: Record<string, unknown>): Request {
  return new Request('http://localhost:3000/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const VALID_LEAD = {
  customerName: 'John Doe',
  customerEmail: 'john.doe@example.com',
  customerPhone: '+1 555 000 0000',
  tourId: 'galapagos-economic',
  tourTitle: 'Galapagos Economic Tour',
  destination: 'Galapagos',
  travelDates: 'March 2027',
  guestsCount: '2 Travelers',
  message: 'Looking forward to visiting!',
};

// ── Test Suite ────────────────────────────────────────────────────────────────

describe('POST /api/leads', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Default: Firestore resolves with a fake document ID
    mockAddDoc.mockResolvedValue({ id: 'firestore-doc-abc123' });

    // Default: no n8n webhook configured
    delete process.env.N8N_WEBHOOK_URL;
    mockNotifyNewLead.mockResolvedValue({ alert: { sent: true }, acknowledgement: 'skipped' });
  });

  // ── Validation — Happy Path ───────────────────────────────────────────────

  it('TC-01: returns 200 and bookingId on valid lead submission', async () => {
    const req = makeLeadRequest(VALID_LEAD);

    const response = await POST(req as any);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.bookingId).toBe('firestore-doc-abc123');
    expect(mockAddDoc).toHaveBeenCalledOnce();
  });

  // ── Validation — Bad Inputs ───────────────────────────────────────────────

  it('TC-02: returns 400 when customerName is missing', async () => {
    const { POST } = await import('@/app/api/leads/route');
    const req = makeLeadRequest({ ...VALID_LEAD, customerName: '' });

    const response = await POST(req as any);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toMatch(/name.*required|required.*name/i);
    expect(mockAddDoc).not.toHaveBeenCalled();
  });

  it('TC-03: returns 400 when customerName is too short (< 2 chars)', async () => {
    const { POST } = await import('@/app/api/leads/route');
    const req = makeLeadRequest({ ...VALID_LEAD, customerName: 'A' });

    const response = await POST(req as any);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.success).toBe(false);
  });

  it('TC-04: returns 400 when customerEmail is invalid', async () => {
    const { POST } = await import('@/app/api/leads/route');
    const req = makeLeadRequest({ ...VALID_LEAD, customerEmail: 'not-an-email' });

    const response = await POST(req as any);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toMatch(/email/i);
    expect(mockAddDoc).not.toHaveBeenCalled();
  });

  it('TC-05: returns 400 when customerPhone is present but invalid format', async () => {
    const { POST } = await import('@/app/api/leads/route');
    const req = makeLeadRequest({ ...VALID_LEAD, customerPhone: 'INVALID_PHONE' });

    const response = await POST(req as any);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toMatch(/phone/i);
  });

  // ── Security — XSS Sanitization ──────────────────────────────────────────

  it('TC-06: strips XSS payload from message field before persisting', async () => {
    const { POST } = await import('@/app/api/leads/route');
    const xssPayload = '<script>alert("xss")</script>Hello World';
    const req = makeLeadRequest({ ...VALID_LEAD, message: xssPayload });

    await POST(req as any);

    // Verify what was persisted to Firestore
    const persistedPayload = mockAddDoc.mock.calls[0]?.[1];
    expect(persistedPayload?.message).not.toContain('<script>');
    expect(persistedPayload?.message).not.toContain('alert');
    expect(persistedPayload?.message).toContain('Hello World');
  });

  // ── n8n Webhook Integration ───────────────────────────────────────────────

  it('TC-07: fires n8n webhook when N8N_WEBHOOK_URL is configured', async () => {
    process.env.N8N_WEBHOOK_URL = 'https://n8n.example.com/webhook/leads';
    mockFetch.mockResolvedValue({ ok: true, status: 200 });

    const { POST } = await import('@/app/api/leads/route');
    const req = makeLeadRequest(VALID_LEAD);

    const response = await POST(req as any);
    const json = await response.json();
    await flushAfterResponse();

    // El webhook corre después de responder: la respuesta ya no informa de él.
    expect(json.success).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://n8n.example.com/webhook/leads',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
      })
    );
  });

  it('TC-08: returns success even when n8n webhook fails (non-critical path)', async () => {
    process.env.N8N_WEBHOOK_URL = 'https://n8n.example.com/webhook/leads';
    mockFetch.mockRejectedValue(new Error('Network failure'));

    const { POST } = await import('@/app/api/leads/route');
    const req = makeLeadRequest(VALID_LEAD);

    const response = await POST(req as any);
    const json = await response.json();

    await flushAfterResponse();

    // Lead must still be saved regardless of webhook failure
    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.bookingId).toBeDefined();
    expect(mockFetch).toHaveBeenCalled();
  });

  it('TC-09: avisa al equipo por correo con los datos del lead y acuse al viajero', async () => {
    const req = makeLeadRequest({ ...VALID_LEAD, locale: 'es' });

    const response = await POST(req as any);
    await flushAfterResponse();

    expect(response.status).toBe(200);
    expect(mockNotifyNewLead).toHaveBeenCalledWith(
      expect.objectContaining({
        leadId: 'firestore-doc-abc123',
        customerName: 'John Doe',
        customerEmail: 'john.doe@example.com',
        locale: 'es',
      }),
      { acknowledgeCustomer: true }
    );
  });

  it('TC-10: un fallo del correo no rompe el guardado del lead', async () => {
    mockNotifyNewLead.mockRejectedValue(new Error('EAUTH 535'));
    const req = makeLeadRequest(VALID_LEAD);

    const response = await POST(req as any);
    const json = await response.json();
    await flushAfterResponse();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.bookingId).toBe('firestore-doc-abc123');
  });
});
