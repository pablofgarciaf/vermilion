'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Maximize2, Sparkles, ArrowRight } from 'lucide-react';
import { DestinationGalleryModal } from '@/components/gallery/DestinationGalleryModal';
import { DestinationKey } from '@/lib/destinationGallery';

interface AboutGallerySectionProps {
  locale: string;
}

const TEXTS: Record<string, {
  badge: string;
  title: string;
  subtitle: string;
  openButton: string;
  photoCount: string;
}> = {
  en: {
    badge: "Curated Expeditions Archive",
    title: "Glimpses into Our Living World",
    subtitle: "Every photograph in our collection is captured by our naturalist guides and travelers during real voyages across the enchanted islands and Andean peaks.",
    openButton: "Explore Full 300+ Photo Archive",
    photoCount: "300+ High-Resolution Photos",
  },
  es: {
    badge: "Archivo Curado de Expediciones",
    title: "Miradas de Nuestro Mundo Vivo",
    subtitle: "Cada fotografía de nuestra colección es capturada por nuestros guías naturalistas y viajeros durante navegaciones reales en las islas encantadas y cumbres andinas.",
    openButton: "Explorar Archivo Completo de 300+ Fotos",
    photoCount: "300+ Fotografías en Alta Resolución",
  },
  fr: {
    badge: "Archives d'Expéditions",
    title: "Regards sur Notre Monde Vivant",
    subtitle: "Chaque photographie est prise par nos guides naturalistes lors d'expéditions réelles à travers les îles enchantées et les hauts plateaux andins.",
    openButton: "Explorer l'Archive de 300+ Photos",
    photoCount: "300+ Photos Haute Résolution",
  },
  de: {
    badge: "Kuratiertes Expeditionsarchiv",
    title: "Blicke in Unsere Lebendige Welt",
    subtitle: "Jedes Foto in unserem Archiv wurde von unseren Naturführern auf echten Expeditionen durch die verzauberten Inseln und Andengipfel aufgenommen.",
    openButton: "Vollständiges 300+ Fotoarchiv öffnen",
    photoCount: "300+ Hochauflösende Fotos",
  },
  it: {
    badge: "Archivio Curato delle Spedizioni",
    title: "Scorci del Nostro Mondo Vivente",
    subtitle: "Ogni scatto è stato catturato dalle nostre guide naturalistiche durante vere navigazioni tra le isole incantate e le vette andine.",
    openButton: "Esplora l'Archivio di 300+ Foto",
    photoCount: "300+ Foto in Alta Risoluzione",
  },
  pt: {
    badge: "Arquivo Curado de Expedições",
    title: "Olhares do Nosso Mundo Vivo",
    subtitle: "Cada foto de nosso acervo foi registrada por nossos guias naturalistas durante expedições reais nas ilhas encantadas e cordilheira andina.",
    openButton: "Explorar Acervo de 300+ Fotos",
    photoCount: "300+ Fotos em Alta Resolução",
  },
  ja: {
    badge: "遠征公式アーカイブ",
    title: "私たちが旅する美しき生命の世界",
    subtitle: "掲載されているすべての写真は、専任ナチュラリストガイドが実際の航海とアンデス登頂中に撮影した貴重な記録です。",
    openButton: "300枚以上の高画質アーカイブを開く",
    photoCount: "300枚以上の高解像度写真",
  },
  zh: {
    badge: "官方实地探险影像档案",
    title: "走进生机盎然的原始秘境",
    subtitle: "相册中的每一张照片均由我们的驻地自然学者向导在加拉帕戈斯巡航与安第斯山脉实地远征中真实记录甄选。",
    openButton: "浏览全部300+高清实拍图库",
    photoCount: "300+超清探险实拍",
  },
};

const SHOWCASE_PHOTOS = [
  {
    src: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg',
    title: 'Giant Tortoise in Santa Cruz Highlands',
    aspect: 'col-span-2 row-span-2 aspect-[16/10] sm:aspect-auto sm:h-full',
  },
  {
    src: '/images/tours/16-9/cotopaxi-volcano-16-9.jpg',
    title: 'Cotopaxi Snow-Capped Volcano',
    aspect: 'col-span-1 aspect-[4/3]',
  },
  {
    src: '/images/tours/16-9/galapagos-piquero-patas-azules-16-9.jpg',
    title: 'Blue-Footed Booby in Espanola',
    aspect: 'col-span-1 aspect-[4/3]',
  },
  {
    src: '/images/tours/16-9/quito-colonial-16-9.jpg',
    title: 'Quito Historic Colonial Plaza',
    aspect: 'col-span-1 aspect-[4/3]',
  },
  {
    src: '/images/tours/16-9/amazon-cuyabeno-16-9.jpg',
    title: 'Cuyabeno Amazon Rainforest Lagoon',
    aspect: 'col-span-1 aspect-[4/3]',
  },
];

export function AboutGallerySection({ locale }: AboutGallerySectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState<DestinationKey>('galapagos');
  const t = TEXTS[locale] || TEXTS.en;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Camera className="w-4 h-4" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedDest('galapagos');
            setIsOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-950/50 cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>{t.openButton}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Bento Showcase Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 sm:h-[480px]">
        {SHOWCASE_PHOTOS.map((photo, i) => (
          <div
            key={i}
            onClick={() => {
              setSelectedDest('galapagos');
              setIsOpen(true);
            }}
            className={`group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-emerald-500/60 transition-all cursor-pointer shadow-xl ${photo.aspect}`}
          >
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <span className="text-white text-xs sm:text-sm font-medium drop-shadow-md">
                {photo.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Gallery Modal */}
      <DestinationGalleryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        destination={selectedDest}
        tourTitle={t.photoCount}
      />
    </div>
  );
}
