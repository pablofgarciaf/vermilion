'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Camera,
  Compass,
  Sparkles,
  Smartphone,
  Monitor,
  Check
} from 'lucide-react';
import {
  DestinationGalleryItem,
  DestinationKey,
  getPhotosByDestination,
  getTourDestinationPhotos,
  getDestinationMetadata,
  DESTINATIONS_META
} from '@/lib/destinationGallery';

interface DestinationGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination?: DestinationKey;
  tourTitle?: string;
  tourId?: string;
  initialPhotoIndex?: number;
}

const UI_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    galleryTitle: "Expedition Photography Collection",
    all: "All Photos",
    landscape: "16:9 Landscape",
    portrait: "9:16 Mobile Stories",
    wildlife: "Endemic Wildlife",
    expedition: "Scenery & Routes",
    showing: "Showing",
    photos: "photos",
    close: "Close gallery",
    previous: "Previous",
    next: "Next",
    fullscreen: "View full size",
    capturedBy: "Curated by Vermilion Routes Field Guides",
  },
  es: {
    galleryTitle: "Colección Fotográfica de Expedición",
    all: "Todas las Fotos",
    landscape: "Paisajes 16:9",
    portrait: "Historias 9:16",
    wildlife: "Fauna Silvestre",
    expedition: "Rutas y Paisajes",
    showing: "Mostrando",
    photos: "fotografías",
    close: "Cerrar galería",
    previous: "Anterior",
    next: "Siguiente",
    fullscreen: "Ver en alta resolución",
    capturedBy: "Curada por Guías de Campo de Vermilion Routes",
  },
  fr: {
    galleryTitle: "Collection Photographique d'Expédition",
    all: "Toutes les Photos",
    landscape: "Paysage 16:9",
    portrait: "Histoires 9:16",
    wildlife: "Faune Endémique",
    expedition: "Itinéraires & Décors",
    showing: "Affichage de",
    photos: "photos",
    close: "Fermer la galerie",
    previous: "Précédent",
    next: "Suivant",
    fullscreen: "Afficher en haute résolution",
    capturedBy: "Sélectionnée par les Guides de Vermilion Routes",
  },
  de: {
    galleryTitle: "Expeditions-Fotogalerie",
    all: "Alle Fotos",
    landscape: "16:9 Querformat",
    portrait: "9:16 Hochformat",
    wildlife: "Endemische Tierwelt",
    expedition: "Landschaften & Routen",
    showing: "Zeigt",
    photos: "Fotos",
    close: "Galerie schließen",
    previous: "Vorheriges",
    next: "Nächstes",
    fullscreen: "In voller Auflösung ansehen",
    capturedBy: "Kuriert von Vermilion Routes Feld-Guides",
  },
  it: {
    galleryTitle: "Collezione Fotografica di Spedizione",
    all: "Tutte le Foto",
    landscape: "Panorami 16:9",
    portrait: "Storie 9:16",
    wildlife: "Fauna Selvatica",
    expedition: "Percorsi e Paesaggi",
    showing: "Visualizzazione di",
    photos: "fotografie",
    close: "Chiudi galleria",
    previous: "Precedente",
    next: "Successivo",
    fullscreen: "Visualizza ad alta risoluzione",
    capturedBy: "A cura delle Guide Naturalistiche Vermilion Routes",
  },
  pt: {
    galleryTitle: "Coleção Fotográfica de Expedição",
    all: "Todas as Fotos",
    landscape: "Paisagens 16:9",
    portrait: "Histórias 9:16",
    wildlife: "Fauna Silvestre",
    expedition: "Rotas e Cenários",
    showing: "Exibindo",
    photos: "fotos",
    close: "Fechar galeria",
    previous: "Anterior",
    next: "Próxima",
    fullscreen: "Ver em alta resolução",
    capturedBy: "Curadoria dos Guias de Campo da Vermilion Routes",
  },
  ja: {
    galleryTitle: "遠征記録フォトコレクション",
    all: "すべての写真",
    landscape: "16:9 横長風景",
    portrait: "9:16 縦長ストーリー",
    wildlife: "固有の野生動物",
    expedition: "絶景と航路",
    showing: "表示中",
    photos: "枚",
    close: "ギャラリーを閉じる",
    previous: "前へ",
    next: "次へ",
    fullscreen: "高解像度で全画面表示",
    capturedBy: "Vermilion Routes公認ナチュラリストガイド監修",
  },
  zh: {
    galleryTitle: "官方探险实拍影像档案",
    all: "全部实拍相片",
    landscape: "16:9 横版风光",
    portrait: "9:16 手机竖版",
    wildlife: "特有珍稀野生动物",
    expedition: "壮阔巡航与火山地貌",
    showing: "正在显示",
    photos: "张照片",
    close: "关闭相册",
    previous: "上一张",
    next: "下一张",
    fullscreen: "高清原图全屏预览",
    capturedBy: "由Vermilion Routes驻地自然学者向导拍摄甄选",
  },
};

export function DestinationGalleryModal({
  isOpen,
  onClose,
  destination = 'galapagos',
  tourTitle,
  tourId,
  initialPhotoIndex = 0,
}: DestinationGalleryModalProps) {
  const locale = useLocale();
  const t = UI_TRANSLATIONS[locale] || UI_TRANSLATIONS.en;

  const [activeTab, setActiveTab] = useState<'all' | 'landscape' | 'portrait' | 'wildlife' | 'expedition'>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Load photos based on tourId or destination
  const allPhotos: DestinationGalleryItem[] = useMemo(() => {
    if (tourId) {
      return getTourDestinationPhotos(tourId);
    }
    return getPhotosByDestination(destination);
  }, [tourId, destination]);

  // Filtered photos
  const filteredPhotos = useMemo(() => {
    let photos = allPhotos;
    if (activeTab === 'landscape') photos = allPhotos.filter((p) => !p.isPortrait);
    else if (activeTab === 'portrait') photos = allPhotos.filter((p) => p.isPortrait);
    else if (activeTab === 'wildlife') photos = allPhotos.filter((p) => p.category === 'wildlife');
    else if (activeTab === 'expedition') photos = allPhotos.filter((p) => p.category === 'expedition' || p.category === 'landscape');

    return [...photos].sort((a, b) => {
      if (a.isPortrait === b.isPortrait) return 0;
      return a.isPortrait ? 1 : -1;
    });
  }, [allPhotos, activeTab]);

  const destMeta = getDestinationMetadata(destination);
  const destName = destMeta.name[locale] || destMeta.name.en;

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeLightboxIndex !== null) {
          setActiveLightboxIndex(null);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft' && activeLightboxIndex !== null) {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : 0
        );
      } else if (e.key === 'ArrowRight' && activeLightboxIndex !== null) {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredPhotos.length : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeLightboxIndex, filteredPhotos.length, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setActiveLightboxIndex(null);
      setActiveTab('all');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99990] bg-zinc-950/95 backdrop-blur-xl flex flex-col font-sans overflow-hidden animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="w-full bg-zinc-900/90 border-b border-zinc-800 px-4 sm:px-6 py-4 flex items-center justify-between shrink-0 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                {destName}
              </span>
              <span className="text-xs text-zinc-500">•</span>
              <span className="text-xs text-zinc-400">
                {t.showing} {filteredPhotos.length} {t.photos}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-serif font-bold text-white truncate max-w-md sm:max-w-xl">
              {tourTitle || destMeta.tagline[locale] || t.galleryTitle}
            </h3>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 border border-zinc-700 cursor-pointer"
          aria-label={t.close}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Tabs Bar */}
      <div className="w-full bg-zinc-950/80 border-b border-zinc-800/80 px-4 sm:px-6 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${activeTab === 'all'
            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
            : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
            }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.all}</span>
          <span className="text-[10px] opacity-75">({allPhotos.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('landscape')}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${activeTab === 'landscape'
            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
            : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
            }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>{t.landscape}</span>
          <span className="text-[10px] opacity-75">
            ({allPhotos.filter((p) => !p.isPortrait).length})
          </span>
        </button>

        <button
          onClick={() => setActiveTab('portrait')}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${activeTab === 'portrait'
            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
            : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
            }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>{t.portrait}</span>
          <span className="text-[10px] opacity-75">
            ({allPhotos.filter((p) => p.isPortrait).length})
          </span>
        </button>

        <button
          onClick={() => setActiveTab('wildlife')}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${activeTab === 'wildlife'
            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
            : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
            }`}
        >
          <span>🐢</span>
          <span>{t.wildlife}</span>
        </button>

        <button
          onClick={() => setActiveTab('expedition')}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${activeTab === 'expedition'
            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
            : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
            }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>{t.expedition}</span>
        </button>
      </div>

      {/* Main Grid View */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {filteredPhotos.map((photo, index) => {
              const photoTitle = photo.title[locale] || photo.title.en || 'Photo';
              const isFirstPortrait = photo.isPortrait && (index === 0 || !filteredPhotos[index - 1].isPortrait);

              return (
                <React.Fragment key={photo.id}>
                  {isFirstPortrait && index > 0 && (
                    <div className="col-span-full my-4 flex items-center gap-4">
                      <div className="h-px bg-zinc-800 flex-1"></div>
                      <span className="text-zinc-400 font-medium text-xs tracking-widest uppercase">
                        {t.portrait} (9:16)
                      </span>
                      <div className="h-px bg-zinc-800 flex-1"></div>
                    </div>
                  )}
                  <div
                    onClick={() => setActiveLightboxIndex(index)}
                    className={`group relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/80 hover:border-emerald-500/60 transition-all duration-300 cursor-pointer shadow-md hover:shadow-emerald-950/40 hover:-translate-y-0.5 ${photo.isPortrait ? 'aspect-[3/4]' : 'aspect-[4/3]'
                      }`}
                  >
                    <Image
                      src={photo.thumb}
                      alt={photoTitle}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />

                    {/* Aspect Ratio Badge */}
                    <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-semibold text-zinc-200 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                      {photo.isPortrait ? '9:16' : '16:9'}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5">
                      <p className="text-white text-xs font-medium line-clamp-2 drop-shadow-md">
                        {photoTitle}
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-1">
                        <Maximize2 className="w-3 h-3" />
                        <span>{t.fullscreen}</span>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          {/* Footer note inside gallery */}
          <div className="text-center pt-10 pb-6 text-xs text-zinc-400">
            <p>{t.capturedBy} • {destName} {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>

      {/* LIGHTBOX FULLSCREEN OVERLAY */}
      {activeLightboxIndex !== null && filteredPhotos[activeLightboxIndex] && (
        <div
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActiveLightboxIndex(null)}
        >
          {/* Lightbox Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveLightboxIndex(null);
            }}
            className="absolute top-4 right-4 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label={t.close}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Arrow */}
          {filteredPhotos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIndex(
                  (activeLightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length
                );
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              aria-label={t.previous}
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
          )}

          {/* Next Arrow */}
          {filteredPhotos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIndex(
                  (activeLightboxIndex + 1) % filteredPhotos.length
                );
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              aria-label={t.next}
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          )}

          {/* Lightbox Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl h-[82vh] flex items-center justify-center"
          >
            <Image
              src={
                filteredPhotos[activeLightboxIndex].isPortrait
                  ? filteredPhotos[activeLightboxIndex].url9x16
                  : filteredPhotos[activeLightboxIndex].url16x9
              }
              alt={
                filteredPhotos[activeLightboxIndex].title[locale] ||
                filteredPhotos[activeLightboxIndex].title.en ||
                'Photo Preview'
              }
              fill
              quality={95}
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-contain drop-shadow-2xl"
              priority
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Bottom Info Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 max-w-xl w-full px-4 flex items-center justify-between bg-black/70 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 text-white text-xs sm:text-sm z-50 shadow-2xl"
          >
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="truncate font-medium">
                {filteredPhotos[activeLightboxIndex].title[locale] ||
                  filteredPhotos[activeLightboxIndex].title.en}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0 text-zinc-300 text-xs pl-3">
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 font-mono">
                {filteredPhotos[activeLightboxIndex].isPortrait ? '9:16' : '16:9'}
              </span>
              <span>
                {activeLightboxIndex + 1} / {filteredPhotos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
