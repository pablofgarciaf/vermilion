'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Mail, User, Phone, Loader2, Download } from 'lucide-react';
import { Tour } from '@/types';
import { db } from '@/lib/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { getStoredUserProfile, saveStoredUserProfile } from '@/lib/userProfile';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  tour: Tour;
  locale: string;
}

const TEXTS: Record<string, { title: string; subtitle: string; name: string; email: string; phone: string; button: string; loading: string; error: string; errPhone: string }> = {
  es: { title: 'Descarga tu Itinerario PDF', subtitle: 'Déjanos tus datos y te enviamos también el itinerario por correo.', name: 'Tu nombre completo', email: 'Tu correo electrónico', phone: 'Celular / WhatsApp con prefijo', button: 'Descargar PDF', loading: 'Procesando...', error: 'Hubo un error al procesar tu solicitud.', errPhone: 'Escribe un celular válido con prefijo (+593...).' },
  en: { title: 'Download PDF Itinerary', subtitle: 'Leave your details and we will also email you the itinerary.', name: 'Your full name', email: 'Your email address', phone: 'Mobile / WhatsApp with country code', button: 'Download PDF', loading: 'Processing...', error: 'There was an error processing your request.', errPhone: 'Enter a valid mobile number with country code (+1...).' },
  fr: { title: "Téléchargez l'itinéraire PDF", subtitle: "Laissez vos coordonnées et nous vous enverrons aussi l'itinéraire par e-mail.", name: 'Votre nom complet', email: 'Votre e-mail', phone: 'Mobile / WhatsApp avec indicatif', button: 'Télécharger le PDF', loading: 'Traitement...', error: 'Une erreur est survenue.', errPhone: 'Saisissez un numéro valide avec indicatif (+33...).' },
  de: { title: 'PDF-Reiseplan herunterladen', subtitle: 'Hinterlassen Sie Ihre Daten, wir senden Ihnen den Reiseplan auch per E-Mail.', name: 'Ihr vollständiger Name', email: 'Ihre E-Mail', phone: 'Handy / WhatsApp mit Vorwahl', button: 'PDF herunterladen', loading: 'Wird verarbeitet...', error: 'Es ist ein Fehler aufgetreten.', errPhone: 'Bitte gültige Nummer mit Vorwahl eingeben (+49...).' },
  it: { title: "Scarica l'itinerario PDF", subtitle: "Lasciaci i tuoi dati e ti invieremo l'itinerario anche via e-mail.", name: 'Nome e cognome', email: 'La tua e-mail', phone: 'Cellulare / WhatsApp con prefisso', button: 'Scarica PDF', loading: 'Elaborazione...', error: 'Si è verificato un errore.', errPhone: 'Inserisci un numero valido con prefisso (+39...).' },
  pt: { title: 'Baixe o roteiro em PDF', subtitle: 'Deixe seus dados e também enviaremos o roteiro por e-mail.', name: 'Seu nome completo', email: 'Seu e-mail', phone: 'Celular / WhatsApp com DDI', button: 'Baixar PDF', loading: 'Processando...', error: 'Ocorreu um erro.', errPhone: 'Digite um celular válido com DDI (+55...).' },
  ja: { title: 'PDF旅程をダウンロード', subtitle: 'ご連絡先をご入力いただくと、旅程をメールでもお送りします。', name: 'お名前', email: 'メールアドレス', phone: '携帯 / WhatsApp（国番号付き）', button: 'PDFをダウンロード', loading: '処理中...', error: 'エラーが発生しました。', errPhone: '国番号付きの有効な番号を入力してください（+81...）。' },
  zh: { title: '下载PDF行程', subtitle: '留下您的联系方式，我们也会通过邮件发送行程。', name: '您的全名', email: '您的邮箱', phone: '手机 / WhatsApp（含国家区号）', button: '下载PDF', loading: '处理中...', error: '处理时出错。', errPhone: '请输入含国家区号的有效号码（+86...）。' },
};

const INPUT = 'w-full px-4 py-3 bg-gray-50 dark:bg-stone-800/50 border border-gray-200 dark:border-stone-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all';

export function LeadCaptureModal({ isOpen, onClose, onSuccess, tour, locale }: LeadCaptureModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [hp, setHp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const t = TEXTS[locale] || TEXTS.en;

  useEffect(() => {
    setMounted(true);
    const stored = getStoredUserProfile();
    if (stored.name) setName(stored.name);
    if (stored.email) setEmail(stored.email);
    if (stored.phone) setPhone(stored.phone);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Guarda el lead, avisa al equipo y envía el itinerario por correo (servidor).
      const res = await fetch('/api/leads/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          tourId: tour.id,
          tourName: tour.title[locale] || tour.title['en'] || tour.id,
          destination: tour.destination?.[locale] || tour.destination?.['es'] || 'Ecuador & Galápagos',
          estimatedBudget: tour.price3Star || tour.price || 0,
          locale,
          _hp_trap: hp,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        setError(data.error === 'phone' ? t.errPhone : t.error);
        return;
      }
      try {
        await updateDoc(doc(db, 'tours', tour.id), { downloadsCount: increment(1) });
      } catch {
        /* contador opcional */
      }
      saveStoredUserProfile({ name, email, phone });
      onSuccess();
    } catch (err) {
      console.error('Error saving lead:', err);
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors" disabled={loading} aria-label="Close">
          <X className="w-5 h-5 text-gray-500" />
        </button>
        <div className="p-8">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mb-6">
            <Download className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{t.subtitle}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="website_url" value={hp} onChange={(e) => setHp(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <label className="block space-y-1.5">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-emerald-600" />{t.name} *</span>
              <input name="name" type="text" autoComplete="name" autoCapitalize="words" required minLength={2} value={name} onChange={(e) => setName(e.target.value)} className={INPUT} />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-emerald-600" />{t.email} *</span>
              <input name="email" type="email" autoComplete="email" inputMode="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT} placeholder="name@example.com" />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-emerald-600" />{t.phone} *</span>
              <input name="tel" type="tel" autoComplete="tel" inputMode="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className={INPUT} placeholder="+1 555 123 4567" />
            </label>
            {error && <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg">{error}</div>}
            <button type="submit" disabled={loading} className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /><span>{t.loading}</span></> : <><Download className="w-5 h-5" /><span>{t.button}</span></>}
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
