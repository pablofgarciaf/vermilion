import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { createTransport, sendMail } = vi.hoisted(() => ({
  createTransport: vi.fn(),
  sendMail: vi.fn(),
}));

vi.mock('nodemailer', () => ({
  default: {
    createTransport,
  },
}));

const bookingEmail = {
  toEmail: 'traveler@example.com',
  customerName: 'Test Traveler',
  tourTitle: 'Test Expedition',
  bookingRef: 'R-2026-TEST-01',
  amountPaid: 500,
  paymentMethod: 'card',
  locale: 'en',
};

describe('sendBookingConfirmationEmail', () => {
  const originalPassword = process.env.SMTP_PASSWORD;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    createTransport.mockReturnValue({ sendMail });
  });

  afterEach(() => {
    if (originalPassword === undefined) {
      delete process.env.SMTP_PASSWORD;
    } else {
      process.env.SMTP_PASSWORD = originalPassword;
    }
  });

  it('fails explicitly when SMTP credentials are missing', async () => {
    delete process.env.SMTP_PASSWORD;
    const { sendBookingConfirmationEmail } = await import('@/lib/email');

    await expect(sendBookingConfirmationEmail(bookingEmail)).rejects.toThrow(
      'SMTP_PASSWORD is not configured'
    );
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('reports the provider message ID after a successful delivery request', async () => {
    process.env.SMTP_PASSWORD = 'test-password';
    sendMail.mockResolvedValue({ messageId: 'message-123' });
    const { sendBookingConfirmationEmail } = await import('@/lib/email');

    await expect(sendBookingConfirmationEmail(bookingEmail)).resolves.toEqual({
      sent: true,
      messageId: 'message-123',
    });
    expect(sendMail).toHaveBeenCalledOnce();
  });
});
