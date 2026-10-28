import { NextRequest, NextResponse } from 'next/server';
import { runAfterResponse } from '@/lib/runAfterResponse';
import { saveLead } from '@/lib/crm/leadStore';
import { sendLeadMagnetEmail, notifyNewLead } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, locale, _hp_trap, website_url } = body;

    // 🛡️ Honeypot Trap Detection (Python Bot / Form Spammer Neutralizer)
    if (_hp_trap || website_url) {
      console.warn('[SECURITY] Bot trapped in lead magnet honeypot.');
      return NextResponse.json({ success: true });
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const createdAt = new Date().toISOString();

    // El lead va al CRM ANTES de responder. Si no se puede guardar, se responde error (no "ok").
    const leadId = await saveLead({
      customerEmail: normalizedEmail,
      customerName: '',
      email: normalizedEmail,
      source: 'lead_magnet',
      tourId: 'lead-magnet-galapagos-guide-2026',
      tourTitle: 'Guía PDF Ecuador & Galápagos',
      locale: locale || 'en',
      downloaded: false,
    });

    // Aviso al equipo tras responder (el viajero ya recibe la guía: sin acuse extra).
    runAfterResponse(() =>
      notifyNewLead({
        leadId,
        source: 'lead_magnet',
        customerName: normalizedEmail.split('@')[0],
        customerEmail: normalizedEmail,
        tourTitle: 'Guía PDF Ecuador & Galápagos',
        locale: typeof locale === 'string' ? locale.slice(0, 5) : undefined,
        createdAt,
      }).then(() => undefined)
    );

    // Send actual guide email via SMTP
    await sendLeadMagnetEmail(normalizedEmail, locale || 'es');

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Lead magnet API error:', err);
    return NextResponse.json({ error: 'Failed to save lead. Please try again.' }, { status: 500 });
  }
}