'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { createBookingInFirestore } from '@/lib/bookings';
import { filterPhoneInput, isValidEmail, isValidPhone, sanitizeText } from '@/lib/validation';
import { getStoredUserProfile, saveStoredUserProfile } from '@/lib/userProfile';
import { useTranslations, useLocale } from 'next-intl';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, AlertCircle, Zap } from 'lucide-react';

const EXPRESS_BANNER_I18N: Record<string, { title: string; desc: string }> = {
  es: {
    title: 'Especialistas en Viajes Relámpago (Salidas en 24h)',
    desc: '¿Quieres viajar mañana? Gracias a nuestro equipo permanente en Quito y Galápagos, coordinamos tus vuelos internos, permisos de parque, yate privado y hotel boutique en menos de 24 horas.',
  },
  en: {
    title: 'Express Expeditions Specialist (24h Departures)',
    desc: 'Want to travel tomorrow? Thanks to our resident operations team in Quito and Galapagos, we coordinate domestic flights, park permits, private yachts, and boutique hotels in under 24 hours.',
  },
  fr: {
    title: 'Spécialistes des Expéditions Express (Départs en 24h)',
    desc: 'Vous souhaitez voyager demain ? Grâce à notre équipe sur place à Quito et aux Galápagos, nous organisons vos vols intérieurs, permis, yachts privés et hôtels boutique en moins de 24 heures.',
  },
  de: {
    title: 'Spezialisten für Express-Abreisen (Abflug in 24h)',
    desc: 'Möchten Sie morgen reisen? Dank unseres Teams in Quito und auf Galapagos koordinieren wir Inlandsflüge, Nationalpark-Genehmigungen, Privatyachten und Boutique-Hotels in unter 24 Stunden.',
  },
  it: {
    title: 'Specialisti in Viaggi Express (Partenze in 24h)',
    desc: 'Vuoi viaggiare domani? Grazie al nostro team operativo a Quito e alle Galápagos, coordiniamo voli interni, permessi del parco, yacht privati e boutique hotel in meno di 24 ore.',
  },
  pt: {
    title: 'Especialistas em Viagens Express (Saídas em 24h)',
    desc: 'Quer viajar amanhã? Graças à nossa equipe residente em Quito e Galápagos, coordenamos seus voos internos, permissões do parque, iates particulares e hotéis boutique em menos de 24 horas.',
  },
  ja: {
    title: '緊急即時出発スペシャリスト（24時間以内の出発対応）',
    desc: '明日出発をご希望ですか？キトとガラパゴス諸島に常駐する専任チームが、国内線航空券、国立公園入場許可証、専用クルーズ船、ブティックホテルを24時間以内に手配完了いたします。',
  },
  zh: {
    title: '极速出行专家（支持24小时内闪电启程）',
    desc: '计划明天启程？得益于我们在基多与加拉帕戈斯群岛的在地常驻团队，我们能在24小时内为您统筹厄瓜多尔境内航班、国家公园通行许可、私家游艇与精品度假酒店。',
  },
};

export function ContactSection() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: 'Galapagos Islands',
    travelers: '2 Travelers',
    timeline: 'flexible',
    message: '',
  });

  useEffect(() => {
    const stored = getStoredUserProfile();
    if (stored.name || stored.email || stored.phone) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || stored.name || '',
        email: prev.email || stored.email || '',
        phone: prev.phone || stored.phone || '',
      }));
    }

    if (typeof window !== 'undefined' && window.location.hash === '#contact') {
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  }, []);

  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; submit?: string }>({});

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = filterPhoneInput(e.target.value);
    setFormData((prev) => ({ ...prev, phone: filtered }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: { name?: string; email?: string; phone?: string } = {};

    const cleanName = sanitizeText(formData.name);
    if (!cleanName || cleanName.length < 2) {
      newErrors.name = 'Please enter your name (minimum 2 characters).';
    }

    if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (formData.phone && !isValidPhone(formData.phone)) {
      newErrors.phone = 'Valid phone format: numbers, spaces, parentheses & leading + only.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: 'general-inquiry',
          tourTitle: `Custom Trip to ${formData.destination}`,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          destination: formData.destination,
          guestsCount: formData.travelers,
          timeline: formData.timeline,
          message: formData.message,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit request.');
      }

      saveStoredUserProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });
      setSubmitted(true);
    } catch (err: any) {
      console.warn('API /api/leads contact submission failed, falling back to direct Firestore:', err);
      try {
        await createBookingInFirestore({
          tourId: 'general-inquiry',
          tourTitle: `Custom Trip to ${formData.destination}`,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          destination: formData.destination,
          guestsCount: formData.travelers,
          travelDates: formData.timeline === 'express' ? '⚡ Salida Relámpago (< 48h)' : formData.timeline,
          message: formData.timeline ? `[Plazo: ${formData.timeline}]\n${formData.message}` : formData.message,
        });
        setSubmitted(true);
      } catch (fallbackErr: any) {
        console.error('Contact form submission error:', fallbackErr);
        setErrors({ submit: fallbackErr.message || 'Failed to submit request. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-200 dark:border-zinc-800/60 scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Col Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider block">
              {t('badge')}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {t('title')}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          {/* Express 24h Departures Callout */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-teal-500/10 border border-emerald-500/30 text-zinc-900 dark:text-zinc-100 shadow-sm space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider">
              <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 animate-pulse" />
              <span>{(EXPRESS_BANNER_I18N[locale] || EXPRESS_BANNER_I18N.en).title}</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
              {(EXPRESS_BANNER_I18N[locale] || EXPRESS_BANNER_I18N.en).desc}
            </p>
          </div>

          <div className="space-y-4">
            <a
              href="tel:+593960039156"
              className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:border-emerald-500/50 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-zinc-400 font-medium block">{t('directCall')}</span>
                <span className="font-semibold text-zinc-900 dark:text-white text-sm group-hover:text-emerald-600 transition-colors">
                  +593 96 003 9156
                </span>
              </div>
            </a>

            <a
              href="mailto:info@vermilionroutes.com"
              className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:border-emerald-500/50 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-zinc-400 font-medium block">{t('emailAddress')}</span>
                <span className="font-semibold text-zinc-900 dark:text-white text-sm group-hover:text-emerald-600 transition-colors">
                  <span>info</span>
                  <span className="text-emerald-600 font-bold">&#64;</span>
                  <span>vermilionroutes.com</span>
                </span>
              </div>
            </a>

            {/* Sede Ecuador (HQ) */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-zinc-400 font-medium block">{t('headquartersEcuador')}</span>
                <span className="font-semibold text-zinc-900 dark:text-white text-sm block leading-snug">
                  {t('addressEcuador')}
                </span>
              </div>
            </div>

            {/* Sede España (Coral Tour) */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-zinc-400 font-medium block">{t('officeSpain')}</span>
                <span className="font-semibold text-zinc-900 dark:text-white text-sm block leading-snug">
                  {t('addressSpain')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col Form */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900/80 p-8 sm:p-10 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">
                {t('success')}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-md mx-auto">
                {formData.name}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    destination: 'Galapagos Islands',
                    travelers: '2 Travelers',
                    timeline: 'flexible',
                    message: ''
                  });
                }}
              >
                Submit another request
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800/50">
                <h3 className="font-serif font-bold text-xl text-zinc-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
                  <span>{t('title')}</span>
                </h3>
                <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">
                  {t('noCommitment')}
                </span>
              </div>

              {errors.submit && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{errors.submit}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{t('name')} *</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    autoCapitalize="words"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      saveStoredUserProfile({ name: e.target.value });
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    suppressHydrationWarning
                    className={`w-full bg-zinc-50 dark:bg-zinc-900/50 border rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none transition-colors ${
                      errors.name
                        ? 'border-rose-400 bg-rose-50/40 focus:border-rose-500'
                        : 'border-zinc-200 dark:border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-rose-600 font-medium">{errors.name}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{t('email')} *</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    placeholder="eleanor@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      saveStoredUserProfile({ email: e.target.value });
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    suppressHydrationWarning
                    className={`w-full bg-zinc-50 dark:bg-zinc-900/50 border rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-rose-400 bg-rose-50/40 focus:border-rose-500'
                        : 'border-zinc-200 dark:border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-rose-600 font-medium">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-phone" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{t('phone')}</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => {
                      handlePhoneChange(e);
                      saveStoredUserProfile({ phone: e.target.value });
                    }}
                    suppressHydrationWarning
                    className={`w-full bg-zinc-50 dark:bg-zinc-900/50 border rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none transition-colors ${
                      errors.phone
                        ? 'border-rose-400 bg-rose-50/40 focus:border-rose-500'
                        : 'border-zinc-200 dark:border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-600 font-medium">{errors.phone}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-destination" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{t('destination')}</label>
                  <select
                    id="contact-destination"
                    aria-label={t('destination')}
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    suppressHydrationWarning
                    className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="Galapagos Islands">{t('optGalapagos')}</option>
                    <option value="Mainland Ecuador">{t('optMainland')}</option>
                    <option value="Galapagos & Ecuador Combo">{t('optCombo')}</option>
                    <option value="Full Day Excursions">{t('optFullDay')}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-travelers" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{t('travelers')}</label>
                  <select
                    id="contact-travelers"
                    aria-label={t('travelers')}
                    value={formData.travelers}
                    onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                    suppressHydrationWarning
                    className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="1 Traveler">{t('opt1')}</option>
                    <option value="2 Travelers">{t('opt2')}</option>
                    <option value="3-5 Travelers">{t('opt35')}</option>
                    <option value="6+ Travelers">{t('opt6plus')}</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-timeline" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <span>{t('timeline')}</span>
                  </label>
                  <select
                    id="contact-timeline"
                    aria-label={t('timeline')}
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    suppressHydrationWarning
                    className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="express">{t('optExpress')}</option>
                    <option value="1-4weeks">{t('opt1to4weeks')}</option>
                    <option value="1-3months">{t('opt1to3months')}</option>
                    <option value="flexible">{t('optFlexible')}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  {t('message')}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Tell us about dates, interests, preferences..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  suppressHydrationWarning
                  className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:scale-[1.02] active:scale-95 group disabled:opacity-50 cursor-pointer border-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t('sending')}</span>
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    <span>{t('send')}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
