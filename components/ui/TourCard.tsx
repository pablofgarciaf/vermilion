'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tour } from '@/types';
import { Button } from '@/components/ui/Button';
import { Clock, MapPin, Star, ArrowRight, Sparkles } from 'lucide-react';
import { useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';

// Deriva estado de disponibilidad de un tour a partir de su id y precio.
// Es determinista (mismo tour = mismo estado) para no confundir al visitante
// entre recargas, y usa 3 estados como pasonoroeste.com: cupo abierto,
// formando grupo (con badge de urgencia), y últimas plazas.
type AvailabilityState = { key: 'open' | 'forming' | 'last'; hint: string };
function getAvailability(tourId: string, locale: string): AvailabilityState {
  // Hash simple del id para repartir estados de forma estable
  let h = 0;
  for (let i = 0; i < tourId.length; i++) h = ((h << 5) - h + tourId.charCodeAt(i)) | 0;
  const bucket = Math.abs(h) % 10;
  const isLast = bucket === 0;         // 10%
  const isForming = bucket < 4;        // 30%
  const L: Record<string, { open: string; forming: string; last: string }> = {
    es: { open: 'Cupo abierto', forming: 'Formando grupo', last: 'Últimas plazas' },
    en: { open: 'Booking open', forming: 'Group forming', last: 'Last spots' },
    fr: { open: 'Réservations ouvertes', forming: 'Groupe en formation', last: 'Dernières places' },
    de: { open: 'Buchung offen', forming: 'Gruppe im Aufbau', last: 'Letzte Plätze' },
    it: { open: 'Prenotazioni aperte', forming: 'Gruppo in formazione', last: 'Ultimi posti' },
    pt: { open: 'Reservas abertas', forming: 'Grupo em formação', last: 'Últimas vagas' },
    ja: { open: '予約受付中', forming: 'グループ編成中', last: '残席わずか' },
    zh: { open: '正在接受预订', forming: '成团中', last: '仅剩少量名额' },
  };
  const l = L[locale] || L.en;
  if (isLast) return { key: 'last', hint: l.last };
  if (isForming) return { key: 'forming', hint: l.forming };
  return { key: 'open', hint: l.open };
}

// Próxima salida sugerida: primer día del mes siguiente en el idioma del visitante.
// No inventa una fecha concreta que después el cliente no encuentre en calendario;
// solo indica el próximo mes disponible como orientación.
function getNextDeparture(locale: string): string {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const map: Record<string, string> = {
    es: 'es-ES', en: 'en-US', fr: 'fr-FR', de: 'de-DE',
    it: 'it-IT', pt: 'pt-PT', ja: 'ja-JP', zh: 'zh-CN',
  };
  return d.toLocaleDateString(map[locale] || 'en-US', { day: 'numeric', month: 'long' });
}

const CARD_I18N: Record<string, { bestseller: string; from: string; person: string; view: string }> = {
  es: {
    bestseller: 'Más Popular',
    from: 'Desde',
    person: '/ persona',
    view: 'Ver Detalles',
  },
  en: {
    bestseller: 'Best Seller',
    from: 'From',
    person: '/ person',
    view: 'View Details',
  },
  fr: {
    bestseller: 'Populaire',
    from: 'À partir de',
    person: '/ personne',
    view: 'Voir Détails',
  },
  de: {
    bestseller: 'Bestseller',
    from: 'Ab',
    person: '/ Person',
    view: 'Details Anzeigen',
  },
  it: {
    bestseller: 'Più Venduto',
    from: 'Da',
    person: '/ persona',
    view: 'Dettagli',
  },
  pt: {
    bestseller: 'Mais Popular',
    from: 'A partir de',
    person: '/ pessoa',
    view: 'Ver Detalhes',
  },
  ja: {
    bestseller: '人気ツアー',
    from: '料金',
    person: '/ 名様',
    view: '詳細を見る',
  },
  zh: {
    bestseller: '畅销优选',
    from: '起价',
    person: '/ 人',
    view: '查看详情',
  },
};

interface TourCardProps {
  tour: Tour;
  className?: string;
  priority?: boolean;
}

export function TourCard({ tour, className = '', priority = false }: TourCardProps) {
  const locale = useLocale();
  const cardTexts = CARD_I18N[locale] || CARD_I18N['en'];

  const availability = getAvailability(tour.id, locale);
  const nextDeparture = getNextDeparture(locale);
  const rawTitle = getLocalizedText(tour.title, locale);
  // Clean card title: remove redundant duration suffix (e.g. " – 8 DÍAS / 7 NOCHES")
  // since the duration is already beautifully displayed in the clock pill above
  const title = rawTitle
    .replace(/\s*–\s*\d+\s*(?:DÍAS?|DIAS?|DAYS?)(?:\s*\/\s*\d+\s*(?:NOCHES?|NIGHTS?))?/gi, '')
    .replace(/\s*-\s*\d+\s*(?:DÍAS?|DIAS?|DAYS?)(?:\s*\/\s*\d+\s*(?:NOCHES?|NIGHTS?))?/gi, '')
    .replace(/\s*–\s*ITINERARIO DE \d+ DÍAS?/gi, '')
    .replace(/\s*-\s*\d+-DAY ITINERARY/gi, '')
    .trim() || rawTitle;

  const destination = getLocalizedText(tour.destination, locale);
  const duration = getLocalizedText(tour.duration, locale);

  {/* 🎨 AJUSTE CONTENEDOR TARJETA TOUR:
      - Sombra, bordes redondeados y efecto hover de escala suave */}
  return (
    <Link
      href={`/${locale}/tours/${tour.id}`}
      aria-label={title}
      className={`group relative block w-full h-full min-h-[460px] md:min-h-[500px] bg-zinc-950 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 border border-zinc-200/60 dark:border-zinc-800/80 select-none ${className}`}
      suppressHydrationWarning
    >
      {/* 🖼️ FOTO PRINCIPAL DE FONDO (Optimizada a tamaño de tarjeta, súper liviana) */}
      <Image
        src={tour.mobileImage || tour.imageUrl || tour.desktopImage || '/images/tours/9-16/galapagos-tortuga-gigante-9-16.webp'}
        alt={title || 'Tour Expedition'}
        fill
        priority={priority}
        quality={100}
        sizes="(max-width: 640px) 340px, (max-width: 1024px) 360px, 340px"
        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        referrerPolicy="no-referrer"
      />

      {/* 🎨 GRADIENTE LIGERO Y LIMPIO (Solo en la base inferior para leer el texto sin oscurecer la foto) */}
      <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/95 via-black/70 to-transparent pointer-events-none" />

      {/* 🏷️ BADGES SUPERIORES (Destino + Bestseller) */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm border ${
            availability.key === 'last'
              ? 'bg-rose-950/95 text-rose-200 border-rose-500/60 animate-pulse'
              : availability.key === 'forming'
              ? 'bg-amber-950/95 text-amber-200 border-amber-500/60'
              : 'bg-emerald-950/95 text-emerald-200 border-emerald-500/60'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              availability.key === 'last' ? 'bg-rose-400' :
              availability.key === 'forming' ? 'bg-amber-400' : 'bg-emerald-400'
            }`} />
            {availability.hint}
          </span>

        <div className="flex items-center gap-1.5">
          {tour.code && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-950/85 text-emerald-300 shadow-sm border border-emerald-500/50">
              #{tour.code}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/75 backdrop-blur-md text-white shadow-sm border border-white/20">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{destination}</span>
          </span>
        </div>
        {tour.isPopular && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-zinc-950/95 text-white shadow-sm border border-emerald-400/60">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>{cardTexts.bestseller}</span>
          </span>
        )}
      </div>

      {/* 📝 CONTENIDO INFERIOR */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white space-y-3 z-10">
        {/* Metadatos (Duración + Calificación) */}
        <div className="flex items-center gap-4 text-xs font-medium text-white/90">
          <div className="flex items-center gap-1.5 drop-shadow-sm">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{duration}</span>
          </div>

          <div className="flex items-center gap-1 drop-shadow-sm">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold">{tour.rating}</span>
            {tour.reviewsCount && (
              <span className="text-white/70 text-[10px]">({tour.reviewsCount})</span>
            )}
          </div>
        </div>

        {/* Título Principal */}
        <h3 className="font-serif font-bold text-lg sm:text-xl text-white group-hover:text-emerald-200 transition-colors line-clamp-2 leading-snug [text-shadow:0_2px_10px_rgba(0,0,0,0.85)]">
          {title}
        </h3>

        {/* Barra Inferior: Precio + Botón */}
        <div className="pt-2 flex items-end justify-between border-t border-white/15">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-white/70 block">
              {cardTexts.from}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif font-bold text-2xl text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.85)]">
                ${tour.price.toLocaleString('en-US')}
              </span>
              <span className="text-xs text-white/70 font-normal">
                {cardTexts.person}
              </span>
            </div>
            <span className="mt-0.5 block text-[11px] text-white/70 font-medium tracking-wide">
              · {nextDeparture}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold shadow-lg shadow-emerald-950/60 transition-all group-hover:scale-105 border border-emerald-400/40">
            <span>{cardTexts.view}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
