'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Mail, CheckCircle2, AlertCircle, Download } from 'lucide-react';
import { getStoredUserProfile, saveStoredUserProfile } from '@/lib/userProfile';

export function LeadMagnetBanner() {
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const translations: Record<string, {
    badge: string;
    title: string;
    desc: string;
    placeholder: string;
    button: string;
    noSpam: string;
    successTitle: string;
    successDesc: string;
    sendError: string;
    connError: string;
  }> = {
    es: {
      badge: 'Descarga Gratuita',
      title: 'Guía Definitiva de Equipaje para Ecuador y Galápagos 2026',
      desc: 'Curada por nuestros guías naturalistas. Enviada directamente a tu correo.',
      placeholder: 'tu@correo.com',
      button: 'Descargar Gratis',
      noSpam: 'Cero spam. Puedes darte de baja cuando quieras.',
      successTitle: '¡Revisa tu correo!',
      successDesc: 'Te hemos enviado la guía. Nos vemos pronto en Ecuador.',
      sendError: 'Error al enviar. Inténtalo de nuevo.',
      connError: 'Error de conexión. Inténtalo de nuevo.'
    },
    en: {
      badge: 'Free Download',
      title: 'The Ultimate Ecuador & Galapagos Packing List 2026',
      desc: 'Curated by our expert naturalist guides. Sent directly to your inbox.',
      placeholder: 'your@email.com',
      button: 'Get Free Guide',
      noSpam: 'No spam. Unsubscribe anytime.',
      successTitle: 'Check your inbox!',
      successDesc: 'We have sent you the guide. See you soon in Ecuador.',
      sendError: 'Error sending. Please try again.',
      connError: 'Connection error. Please try again.'
    },
    fr: {
      badge: 'Téléchargement Gratuit',
      title: 'Guide Ultime des Bagages pour l’Équateur et les Galápagos 2026',
      desc: 'Sélectionné par nos guides naturalistes. Envoyé directement dans votre boîte de réception.',
      placeholder: 'votre@email.com',
      button: 'Télécharger Gratuitement',
      noSpam: 'Zéro spam. Désabonnement possible à tout moment.',
      successTitle: 'Consultez votre boîte de réception !',
      successDesc: 'Nous vous avons envoyé le guide. À très bientôt en Équateur.',
      sendError: 'Erreur lors de l’envoi. Veuillez réessayer.',
      connError: 'Erreur de connexion. Veuillez réessayer.'
    },
    de: {
      badge: 'Kostenloser Download',
      title: 'Der Ultimative Packleitfaden für Ecuador & Galápagos 2026',
      desc: 'Zusammengestellt von unseren Naturführern. Direkt in Ihr Postfach gesendet.',
      placeholder: 'ihre@email.de',
      button: 'Kostenlos Herunterladen',
      noSpam: 'Kein Spam. Jederzeit kündbar.',
      successTitle: 'Prüfen Sie Ihren Posteingang!',
      successDesc: 'Wir haben Ihnen den Leitfaden geschickt. Bis bald in Ecuador.',
      sendError: 'Fehler beim Senden. Bitte versuchen Sie es erneut.',
      connError: 'Verbindungsfehler. Bitte versuchen Sie es erneut.'
    },
    it: {
      badge: 'Download Gratuito',
      title: 'Guida Definitiva ai Bagagli per Ecuador e Galápagos 2026',
      desc: 'Curata dalle nostre guide naturaliste. Inviata direttamente nella tua casella di posta.',
      placeholder: 'la-tua@email.it',
      button: 'Scarica Gratis',
      noSpam: 'Nessun spam. Disiscriviti quando vuoi.',
      successTitle: 'Controlla la tua casella di posta!',
      successDesc: 'Ti abbiamo inviato la guida. A presto in Ecuador.',
      sendError: 'Errore durante l’invio. Riprova più tardi.',
      connError: 'Errore di connessione. Riprova più tardi.'
    },
    pt: {
      badge: 'Download Gratuito',
      title: 'Guia Definitivo de Bagagem para o Equador e Galápagos 2026',
      desc: 'Elaborado por nossos guias naturalistas. Enviado diretamente para seu e-mail.',
      placeholder: 'seu@email.com',
      button: 'Baixar Grátis',
      noSpam: 'Sem spam. Cancele a inscrição quando quiser.',
      successTitle: 'Verifique sua caixa de entrada!',
      successDesc: 'Enviamos o guia para você. Nos vemos em breve no Equador.',
      sendError: 'Erro ao enviar. Tente novamente.',
      connError: 'Erro de conexão. Tente novamente.'
    },
    ja: {
      badge: '無料ダウンロード',
      title: 'エクアドル＆ガラパゴス 究極のパッキングガイド 2026',
      desc: '専任ナチュラリストガイド監修。受信トレイに直接お届けします。',
      placeholder: 'your@email.com',
      button: '無料で入手する',
      noSpam: 'スパムはありません。いつでも配信解除可能。',
      successTitle: '受信トレイをご確認ください！',
      successDesc: 'ガイドをお送りしました。エクアドルでお待ちしております。',
      sendError: '送信に失敗しました。もう一度お試しください。',
      connError: '接続エラーが発生しました。もう一度お試しください。'
    },
    zh: {
      badge: '免费下载',
      title: '2026 厄瓜多尔与加拉帕戈斯终极行李打包指南',
      desc: '由我们的资深自然向导精心编写。直接发送到您的邮箱。',
      placeholder: 'your@email.com',
      button: '免费获取指南',
      noSpam: '绝无垃圾邮件。可随时退订。',
      successTitle: '请查收您的邮箱！',
      successDesc: '指南已发送至您的邮箱。期待在厄瓜多尔与您相遇。',
      sendError: '发送失败，请重试。',
      connError: '网络连接错误，请重试。'
    }
  };

  const t = translations[locale] || translations['en'];

  useEffect(() => {
    const stored = getStoredUserProfile();
    if (stored.email) setEmail(stored.email);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/leads/magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), locale }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        saveStoredUserProfile({ email: email.trim() });
        setStatus('success');
      } else {
        setErrorMsg(data.error || t.sendError);
        setStatus('error');
      }
    } catch {
      setErrorMsg(t.connError);
      setStatus('error');
    }
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-emerald-950 to-emerald-800 p-8 sm:p-10 my-10 border border-emerald-700/40 shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[size:24px_24px]" />
      <div className="relative z-10">
        {status === 'success' ? (
          <div className="text-center space-y-3 py-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-white">
              {t.successTitle}
            </h3>
            <p className="text-emerald-300 text-sm">
              {t.successDesc}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/40 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <Download className="w-6 h-6 text-emerald-300" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                  {t.badge}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                  {t.title}
                </h3>
                <p className="text-emerald-300/80 text-sm">
                  {t.desc}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400 pointer-events-none" />
                <input
                  id="lead-magnet-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    saveStoredUserProfile({ email: e.target.value });
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder={t.placeholder}
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm transition-all hover:scale-105 shadow-lg shrink-0"
              >
                {status === 'loading' ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {t.button}
              </button>
            </form>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <p className="text-emerald-400/60 text-xs">
              {t.noSpam}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}