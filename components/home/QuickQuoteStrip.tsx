'use client';

import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useActivePromotion } from '@/hooks/useActivePromotion';
import { buildQuickQuotePayload, validateQuickQuote } from '@/lib/quickQuote';
import { trackGenerateLead } from '@/lib/analytics/trackLead';
import { WHATSAPP_NUMBER } from '@/data/bookingTerms';

/**
 * Formulario corto (nombre, correo, fechas) justo debajo del hero.
 * Envía a /api/leads, el mismo endpoint del formulario largo de contacto, así que el
 * aviso por correo/n8n y el registro en el CRM funcionan igual.
 * Incluye un campo trampa (honeypot) que el servidor ya descarta en silencio.
 */
export function QuickQuoteStrip() {
  const t = useTranslations('quickQuote');
  const locale = useLocale();
  const promo = useActivePromotion();
  const [form, setForm] = useState({ name: '', email: '', dates: '' });
  const [trap, setTrap] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [fieldError, setFieldError] = useState<'name' | 'email' | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateQuickQuote(form);
    setFieldError(err);
    if (err) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...buildQuickQuotePayload(form, locale, promo?.id), website_url: trap }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error('lead_failed');
      trackGenerateLead({ method: 'contact_form', placement: 'home_quick_quote', item: 'quick-quote' });
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  const input =
    'w-full rounded-xl border border-emerald-800/40 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500';

  return (
    <section aria-labelledby="quick-quote-title" className="bg-emerald-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_2fr] lg:items-center">
        <div className="space-y-1">
          <h2 id="quick-quote-title" className="font-serif text-xl font-bold sm:text-2xl">
            {t('title')}
          </h2>
          <p className="text-sm text-emerald-100/85">{t('subtitle')}</p>
        </div>

        {status === 'done' ? (
          <p role="status" className="flex items-center gap-2 text-base font-semibold text-emerald-200">
            <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
            {t('success')}
          </p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="relative space-y-2">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
              <input
                type="text"
                name="name"
                autoComplete="name"
                aria-label={t('name')}
                aria-invalid={fieldError === 'name'}
                placeholder={t('name')}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={input}
              />
              <input
                type="email"
                name="email"
                autoComplete="email"
                aria-label={t('email')}
                aria-invalid={fieldError === 'email'}
                placeholder={t('email')}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={input}
              />
              <input
                type="text"
                name="dates"
                aria-label={t('dates')}
                placeholder={t('dates')}
                value={form.dates}
                onChange={(e) => setForm({ ...form, dates: e.target.value })}
                className={input}
              />
              {/* Honeypot: invisible para personas; los bots lo rellenan. */}
              <input
                type="text"
                name="website_url"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={trap}
                onChange={(e) => setTrap(e.target.value)}
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-500 disabled:opacity-60 sm:col-span-2 lg:col-span-1"
              >
                <span>{status === 'sending' ? t('sending') : t('button')}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            {fieldError && (
              <p role="alert" className="text-xs font-semibold text-amber-300">
                {t(fieldError === 'name' ? 'nameError' : 'emailError')}
              </p>
            )}
            {status === 'error' && (
              <p role="alert" className="text-xs font-semibold text-amber-300">
                {t('error')}{' '}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                  data-lead-placement="quick_quote_error"
                >
                  WhatsApp
                </a>
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
