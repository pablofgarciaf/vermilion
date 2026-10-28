'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, MessageCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { WHATSAPP_NUMBER, isPlausiblePhone } from '@/data/bookingTerms';
import { trackFormSubmit } from '@/lib/analytics/trackLead';

export interface AskBeforeBookingProps {
  tourId: string;
  /** Título ya localizado, tal y como lo ve el viajero. */
  tourTitle: string;
  tierLabel: string;
  date?: string | null;
  adults?: number;
  children?: number;
  /** Datos de contacto ya escritos en el formulario de reserva, para no pedirlos dos veces. */
  contact?: { name?: string; email?: string; phone?: string };
  /** Identifica dónde se pulsó, para la analítica (tour_page, booking_page, ...). */
  placement: string;
  /** En columnas estrechas (barra lateral de la reserva) los dos botones van apilados. */
  stacked?: boolean;
  className?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


/**
 * Vía secundaria para quien todavía no quiere pagar: WhatsApp con el viaje ya descrito
 * o una cotización por email que se guarda como lead en /api/leads.
 */
export function AskBeforeBooking({
  tourId,
  tourTitle,
  tierLabel,
  date,
  adults = 2,
  children = 0,
  contact,
  placement,
  stacked = false,
  className = '',
}: AskBeforeBookingProps) {
  const t = useTranslations('bookingConversion');
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [hp, setHp] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const dateText = date || t('dateTbd');
  const waText = t('waMessage', { tour: tourTitle, tier: tierLabel, date: dateText, adults, children });
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

  const openForm = () => {
    // Si ya escribió sus datos en la reserva, los reutilizamos.
    setName((prev) => prev || contact?.name || '');
    setEmail((prev) => prev || contact?.email || '');
    setPhone((prev) => prev || contact?.phone || '');
    setOpen((v) => !v);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!name.trim() || !EMAIL_RE.test(email.trim())) {
      setError(t('quoteInvalid'));
      return;
    }
    if (!isPlausiblePhone(phone)) {
      setError(t('phoneInvalid'));
      return;
    }
    setError(null);
    setStatus('sending');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name.trim(),
          customerEmail: email.trim(),
          customerPhone: phone.trim(),
          tourId,
          tourTitle,
          travelDates: date || 'Flexible',
          guestsCount: `${adults} Adults, ${children} Children`,
          message: `Quote request (${placement}) · ${tourTitle} · ${tierLabel} · ${date || 'date TBD'} · ${adults} adults / ${children} children`,
          locale: typeof document !== 'undefined' ? document.documentElement.lang : undefined,
          _hp_trap: hp,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('sent');
      trackFormSubmit({ method: 'quote_email', placement, item: tourId });
    } catch (err) {
      console.error('[AskBeforeBooking] quote request failed', err instanceof Error ? err.message : err);
      setStatus('error');
    }
  };

  const inputCls =
    'w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500';

  return (
    <div className={`relative rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50/60 dark:bg-emerald-950/20 p-4 ${className}`}>
      <p className="text-sm font-bold text-zinc-900 dark:text-white">{t('askTitle')}</p>
      <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">{t('askSubtitle')}</p>

      <div className={`mt-3 grid grid-cols-1 gap-2 ${stacked ? '' : 'sm:grid-cols-2'}`}>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          data-lead-placement={`${placement}_ask`}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-2.5 text-sm font-bold text-white shadow-sm transition hover:brightness-105"
        >
          <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{t('askWhatsapp')}</span>
        </a>
        <button
          type="button"
          onClick={openForm}
          aria-expanded={open}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2.5 text-sm font-bold text-zinc-800 dark:text-zinc-100 transition hover:border-emerald-500"
        >
          <Mail className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
          <span>{t('askQuote')}</span>
        </button>
      </div>

      {open && status !== 'sent' && (
        <form onSubmit={submit} noValidate className="mt-3 space-y-2">
          <label className="sr-only" htmlFor={`${placement}-quote-name`}>{t('quoteName')}</label>
          <input
            id={`${placement}-quote-name`}
            className={inputCls}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('quoteName')}
            autoComplete="name"
          />
          <label className="sr-only" htmlFor={`${placement}-quote-email`}>{t('quoteEmail')}</label>
          <input
            id={`${placement}-quote-email`}
            className={inputCls}
            type="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('quoteEmail')}
            autoComplete="email"
          />
          <label className="sr-only" htmlFor={`${placement}-quote-phone`}>{t('phoneLabel')}</label>
          <input
            id={`${placement}-quote-phone`}
            className={inputCls}
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t('phoneLabel')}
            autoComplete="tel"
          />
          {/* Trampa anti-bots: invisible para personas */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            className="absolute -left-[9999px] h-px w-px opacity-0"
          />
          {error && <p className="text-xs font-medium text-rose-600" role="alert">{error}</p>}
          {status === 'error' && <p className="text-xs font-medium text-rose-600" role="alert">{t('quoteError')}</p>}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-xl bg-zinc-900 dark:bg-white px-3 py-2.5 text-sm font-bold text-white dark:text-zinc-900 transition hover:opacity-90 disabled:opacity-60"
          >
            {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            <span>{status === 'sending' ? t('quoteSending') : t('quoteSubmit')}</span>
          </button>
          <p className="text-center text-[11px] text-zinc-500">{t('noCommitment')}</p>
        </form>
      )}

      {status === 'sent' && (
        <p className="mt-3 flex items-start gap-2 text-sm font-medium text-emerald-800 dark:text-emerald-300" role="status">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{t('quoteSuccess')}</span>
        </p>
      )}
    </div>
  );
}
