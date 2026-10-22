'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, Clock, Minus, Plus, ShieldCheck, Star, Video, X } from 'lucide-react';
import {
  CALL_BOOKING_URL,
  PLAN_TRIP_BUDGETS,
  PLAN_TRIP_CONTACT,
  PLAN_TRIP_DAYS,
  PLAN_TRIP_DESTINATIONS,
  PLAN_TRIP_EVENT,
  type PlanTripDestination,
  type PlanTripDetail,
  validatePlanTripContact,
} from '@/data/planTrip';
import { trackGenerateLead } from '@/lib/analytics/trackLead';
import { useActivePromotion } from '@/hooks/useActivePromotion';
import { getStoredUserProfile, saveStoredUserProfile } from '@/lib/userProfile';

const TOTAL_STEPS = 4;

type Form = {
  destination: PlanTripDestination | null;
  arrival: string;
  flexible: boolean;
  days: (typeof PLAN_TRIP_DAYS)[number] | '';
  adults: number;
  children: number;
  budget: (typeof PLAN_TRIP_BUDGETS)[number] | '';
  name: string;
  email: string;
  phone: string;
  contact: (typeof PLAN_TRIP_CONTACT)[number];
};

const EMPTY: Form = {
  destination: null,
  arrival: '',
  flexible: false,
  days: '',
  adults: 2,
  children: 0,
  budget: '',
  name: '',
  email: '',
  phone: '',
  contact: 'email',
};

/**
 * Ventana "Planifica tu viaje": formulario de 4 pasos con barra de progreso.
 * Se abre con openPlanTrip() desde la cabecera, el hero o un tour. Envía a /api/leads
 * (mismo aviso al equipo y acuse al viajero que el formulario de contacto).
 */
export function PlanTripModal() {
  const t = useTranslations('planTrip');
  const locale = useLocale();
  const promo = useActivePromotion();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Form>(EMPTY);
  const [origin, setOrigin] = useState<PlanTripDetail>({});
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = '';
    lastFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<PlanTripDetail>).detail || {};
      lastFocus.current = document.activeElement as HTMLElement | null;
      setOrigin(detail);
      // Rellena nombre, correo y teléfono con lo que el visitante ya escribió antes en esta web.
      const known = getStoredUserProfile();
      setForm((f) => {
        const base = status === 'done' ? EMPTY : f;
        return {
          ...base,
          name: base.name || known.name || '',
          email: base.email || known.email || '',
          phone: base.phone || known.phone || '',
          destination: detail.destination ?? (status === 'done' ? null : f.destination),
        };
      });
      if (status === 'done') setStatus('idle');
      setStep(detail.destination ? 2 : 1);
      setError(null);
      setOpen(true);
      document.body.style.overflow = 'hidden';
    };
    window.addEventListener(PLAN_TRIP_EVENT, onOpen);
    return () => window.removeEventListener(PLAN_TRIP_EVENT, onOpen);
  }, [status]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    dialogRef.current?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  if (!open) return null;

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const next = () => {
    setError(null);
    if (step === 1 && !form.destination) return setError(t('errDestination'));
    if (step === 2 && !form.arrival && !form.flexible) return setError(t('errDates'));
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const bad = validatePlanTripContact(form.name, form.email, form.phone);
    if (bad) return setError(t(bad === 'name' ? 'errName' : bad === 'email' ? 'errEmail' : 'errPhone'));
    setError(null);
    setStatus('sending');
    const dest = PLAN_TRIP_DESTINATIONS.find((d) => d.id === form.destination);
    const message = [
      `Días: ${form.days || '-'}`,
      `Presupuesto por persona: ${form.budget || '-'}`,
      `Contacto preferido: ${form.contact}`,
      promo ? `Promo vigente: ${promo.id}` : '',
    ].filter(Boolean).join(' | ');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: origin.tourId || 'general-inquiry',
          tourTitle: origin.tourTitle || `Plan my trip: ${dest?.leadValue || ''}`,
          customerName: form.name.trim(),
          customerEmail: form.email.trim(),
          customerPhone: form.phone.trim(),
          destination: dest?.leadValue,
          travelDates: form.flexible || !form.arrival ? 'Flexible' : form.arrival,
          guestsCount: `${form.adults} adults, ${form.children} children`,
          message,
          locale,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error('lead_failed');
      saveStoredUserProfile({ name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() });
      trackGenerateLead({ method: 'contact_form', placement: 'plan_trip_modal', item: dest?.leadValue });
      setStatus('done');
    } catch {
      setStatus('idle');
      setError(t('errGeneric'));
    }
  };

  const field =
    'w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30';
  const chip = (active: boolean) =>
    `rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
      active
        ? 'border-emerald-600 bg-emerald-600 text-white shadow-md'
        : 'border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:border-emerald-500'
    }`;

  return (
    <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center">
      <button type="button" aria-label={t('close')} onClick={close} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="plan-trip-title"
        tabIndex={-1}
        className="relative w-full sm:max-w-3xl max-h-[94dvh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-[#FBF8F1] dark:bg-zinc-950 shadow-2xl outline-none"
      >
        {/* Cabecera */}
        <div className="sticky top-0 z-10 bg-[#0B1A17] text-white px-5 sm:px-8 pt-5 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E7C46A]">{t('eyebrow')}</p>
              <h2 id="plan-trip-title" className="font-serif text-2xl sm:text-3xl font-bold leading-tight mt-1">
                {status === 'done' ? t('successTitle', { name: form.name.split(' ')[0] || '' }) : t('title')}
              </h2>
            </div>
            <button type="button" onClick={close} aria-label={t('close')} className="p-2 rounded-xl hover:bg-white/10">
              <X className="w-5 h-5" />
            </button>
          </div>
          {status !== 'done' && (
            <div className="mt-4">
              <div className="flex justify-between text-[11px] text-emerald-100/80 mb-1.5">
                <span>{t('stepOf', { n: step, total: TOTAL_STEPS })}</span>
                <span>{t('oneMinute')}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/15 overflow-hidden">
                <div className="h-full bg-[#E7C46A] transition-all duration-500" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
              </div>
            </div>
          )}
        </div>

        <div className="px-5 sm:px-8 py-6">
          {status === 'done' ? (
            <div className="space-y-5 text-center py-4">
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
              <p className="text-zinc-700 dark:text-zinc-300 max-w-md mx-auto">{t('successText')}</p>
              {CALL_BOOKING_URL && (
                <a
                  href={CALL_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-lead-placement="plan_trip_book_call"
                  className="inline-flex items-center gap-2 rounded-2xl bg-red-600 hover:bg-red-500 px-6 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg"
                >
                  <Video className="w-5 h-5" />
                  {t('bookCall')}
                </a>
              )}
              <div>
                <button type="button" onClick={close} className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 underline underline-offset-4">
                  {t('close')}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-6">
              {step === 1 && (
                <fieldset className="space-y-4">
                  <legend className="font-serif text-xl font-bold text-zinc-900 dark:text-white">{t('q1')}</legend>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {PLAN_TRIP_DESTINATIONS.map((d) => {
                      const active = form.destination === d.id;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() => {
                            set('destination', d.id);
                            setError(null);
                            setStep(2);
                          }}
                          className={`group relative aspect-[3/4] overflow-hidden rounded-2xl text-left ring-offset-2 transition-all ${
                            active ? 'ring-4 ring-emerald-600' : 'ring-1 ring-zinc-200 dark:ring-zinc-800 hover:ring-emerald-500'
                          }`}
                        >
                          <Image src={d.image} alt="" fill sizes="(max-width: 640px) 45vw, 150px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                          <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                          <span className="absolute bottom-2.5 left-2.5 right-2.5 text-white text-sm font-bold leading-tight">
                            {t(`dest.${d.id}`)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              )}

              {step === 2 && (
                <fieldset className="space-y-5">
                  <legend className="font-serif text-xl font-bold text-zinc-900 dark:text-white">{t('q2')}</legend>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="space-y-1.5">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                        <CalendarDays className="w-4 h-4" /> {t('arrival')}
                      </span>
                      <input
                        type="date"
                        min={new Date().toISOString().slice(0, 10)}
                        value={form.arrival}
                        disabled={form.flexible}
                        onChange={(e) => set('arrival', e.target.value)}
                        className={`${field} cursor-pointer disabled:opacity-50`}
                      />
                    </label>
                    <div className="space-y-1.5">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                        <Clock className="w-4 h-4" /> {t('days')}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {PLAN_TRIP_DAYS.map((d) => (
                          <button key={d} type="button" aria-pressed={form.days === d} onClick={() => set('days', d)} className={chip(form.days === d)}>
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <label className="flex items-center gap-2.5 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
                    <input type="checkbox" checked={form.flexible} onChange={(e) => set('flexible', e.target.checked)} className="w-4 h-4 accent-emerald-600" />
                    {t('flexible')}
                  </label>
                </fieldset>
              )}

              {step === 3 && (
                <fieldset className="space-y-5">
                  <legend className="font-serif text-xl font-bold text-zinc-900 dark:text-white">{t('q3')}</legend>
                  <div className="grid grid-cols-2 gap-4 max-w-md">
                    {(['adults', 'children'] as const).map((k) => (
                      <div key={k} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3">
                        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{t(k)}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <button type="button" aria-label={`- ${t(k)}`} onClick={() => set(k, Math.max(k === 'adults' ? 1 : 0, form[k] - 1))} className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-xl font-bold text-zinc-900 dark:text-white tabular-nums">{form[k]}</span>
                          <button type="button" aria-label={`+ ${t(k)}`} onClick={() => set(k, Math.min(20, form[k] + 1))} className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">{t('budget')}</p>
                    <div className="flex flex-wrap gap-2">
                      {PLAN_TRIP_BUDGETS.map((b) => (
                        <button key={b} type="button" aria-pressed={form.budget === b} onClick={() => set('budget', b)} className={chip(form.budget === b)}>
                          {t(`budgets.${b}`)}
                        </button>
                      ))}
                    </div>
                  </div>
                </fieldset>
              )}

              {step === 4 && (
                <fieldset className="space-y-4">
                  <legend className="font-serif text-xl font-bold text-zinc-900 dark:text-white">{t('q4')}</legend>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input type="text" name="name" autoComplete="name" autoCapitalize="words" placeholder={t('name')} aria-label={t('name')} value={form.name} onChange={(e) => set('name', e.target.value)} className={field} />
                    <input type="email" name="email" autoComplete="email" inputMode="email" placeholder={t('email')} aria-label={t('email')} value={form.email} onChange={(e) => set('email', e.target.value)} className={field} />
                    <input type="tel" name="tel" autoComplete="tel" inputMode="tel" placeholder={t('phone')} aria-label={t('phone')} value={form.phone} onChange={(e) => set('phone', e.target.value)} className={`${field} sm:col-span-2`} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">{t('contactPref')}</p>
                    <div className="flex flex-wrap gap-2">
                      {PLAN_TRIP_CONTACT.map((c) => (
                        <button key={c} type="button" aria-pressed={form.contact === c} onClick={() => set('contact', c)} className={chip(form.contact === c)}>
                          {t(`contactOpts.${c}`)}
                        </button>
                      ))}
                    </div>
                  </div>
                </fieldset>
              )}

              {error && (
                <p role="alert" className="text-sm font-semibold text-red-600">
                  {error}
                </p>
              )}

              <div className="flex items-center justify-between gap-3 pt-2">
                {step > 1 ? (
                  <button type="button" onClick={() => { setError(null); setStep((s) => s - 1); }} className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:text-emerald-700">
                    <ArrowLeft className="w-4 h-4" /> {t('back')}
                  </button>
                ) : <span />}
                {step < TOTAL_STEPS ? (
                  <button type="button" onClick={next} className="inline-flex items-center gap-2 rounded-2xl bg-emerald-700 hover:bg-emerald-600 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg">
                    {t('next')} <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button type="submit" disabled={status === 'sending'} className="inline-flex items-center gap-2 rounded-2xl bg-red-600 hover:bg-red-500 disabled:opacity-60 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg">
                    {status === 'sending' ? t('sending') : t('submit')} <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Confianza */}
          <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {t('trust1')}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4 text-emerald-600" /> {t('trust2')}</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> {t('trust3')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
