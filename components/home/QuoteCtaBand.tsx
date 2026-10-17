import { ArrowRight, ShieldCheck } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

/**
 * Llamada a la acción a mitad de la home. Componente de servidor, sin
 * animaciones ni JavaScript: el visitante que ya vio destinos, precios y
 * reseñas tiene un atajo directo al formulario (#contact) sin recorrer el resto.
 */
export async function QuoteCtaBand({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'homeFunnel.quoteCta' });

  return (
    <section
      aria-labelledby="quote-cta-title"
      className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700 text-white px-6 py-10 sm:px-12 sm:py-12 shadow-xl shadow-emerald-950/20 flex flex-col lg:flex-row lg:items-center gap-8">
        <div className="flex-1 space-y-3">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-200 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{t('eyebrow')}</span>
          </p>
          <h2 id="quote-cta-title" className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
            {t('title')}
          </h2>
          <p className="text-emerald-50/90 text-sm sm:text-base leading-relaxed max-w-2xl">
            {t('text')}
          </p>
        </div>
        <div className="flex flex-col items-start lg:items-end gap-2 shrink-0">
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-white text-emerald-900 font-bold uppercase tracking-wider text-xs sm:text-sm shadow-lg hover:bg-emerald-50 transition-colors"
          >
            <span>{t('button')}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <span className="text-xs text-emerald-100/80">{t('whatsappHint')}</span>
        </div>
      </div>
    </section>
  );
}
