'use client';

import React, { useState } from 'react';
import { Camera, Sparkles, ArrowRight } from 'lucide-react';
import { DestinationGalleryModal } from '@/components/gallery/DestinationGalleryModal';
import { DestinationKey, getDestinationMetadata } from '@/lib/destinationGallery';

interface BlogGalleryButtonProps {
  destination: DestinationKey;
  locale: string;
}

const LABELS: Record<string, {
  badge: string;
  title: string;
  subtitle: string;
  button: string;
}> = {
  en: {
    badge: "Live Visual Archive",
    title: "Explore 300+ Verified Field Photographs",
    subtitle: "Browse high-resolution captures of endemic wildlife, volcanic landscapes, and authentic expedition moments.",
    button: "Open Destination Photo Gallery",
  },
  es: {
    badge: "Archivo Visual en Vivo",
    title: "Explore 300+ Fotografías Reales de Campo",
    subtitle: "Vea capturas en alta resolución de fauna endémica, paisajes volcánicos y momentos reales de navegación.",
    button: "Ver Galería Completa de Fotos",
  },
  fr: {
    badge: "Archives Visuelles",
    title: "Explorez 300+ Photographies de Terrain",
    subtitle: "Découvrez des clichés haute résolution de faune endémique et paysages volcaniques.",
    button: "Ouvrir la Galerie Photos",
  },
  de: {
    badge: "Live-Fotoarchiv",
    title: "Über 300 Authentische Expeditionsfotos Entdecken",
    subtitle: "Hochauflösende Aufnahmen endemischer Tierarten und atemberaubender Vulkanlandschaften.",
    button: "Fotogalerie des Reiseziels Öffnen",
  },
  it: {
    badge: "Archivio Visivo dal Vivo",
    title: "Esplora Oltre 300 Scatti Autentici di Campo",
    subtitle: "Sfoglia fotografie in alta risoluzione di fauna endemica e paesaggi vulcanici.",
    button: "Apri la Galleria Fotografica",
  },
  pt: {
    badge: "Acervo Visual ao Vivo",
    title: "Explore Mais de 300 Fotos Reais de Campo",
    subtitle: "Veja registros em alta resolução de fauna endêmica e paisagens vulcânicas intocadas.",
    button: "Abrir Galeria do Destino",
  },
  ja: {
    badge: "現地公式フォトアーカイブ",
    title: "300枚以上の現地実撮写真コレクション",
    subtitle: "固有種の野生動物、壮大な火山景観、リアルな航海の瞬間を高画質でご覧いただけます。",
    button: "目的地のフォトギャラリーを開く",
  },
  zh: {
    badge: "官方实地影像库",
    title: "探索300+张驻地向导实拍探险相片",
    subtitle: "全屏浏览特有野生动物、壮阔火山地貌与纯净海洋巡航的高清实拍影像。",
    button: "浏览目的地完整相册",
  },
};

export function BlogGalleryButton({ destination, locale }: BlogGalleryButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = LABELS[locale] || LABELS.en;
  const destMeta = getDestinationMetadata(destination);
  const destName = destMeta.name[locale] || destMeta.name.en;

  return (
    <>
      <div className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-zinc-900 border border-emerald-800/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>{destName} • {t.badge}</span>
          </div>
          <h4 className="text-lg sm:text-xl font-serif font-bold text-white">
            {t.title}
          </h4>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl">
            {t.subtitle}
          </p>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-950/60 shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>{t.button}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <DestinationGalleryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        destination={destination}
        tourTitle={`${destName} Photo Collection`}
      />
    </>
  );
}
