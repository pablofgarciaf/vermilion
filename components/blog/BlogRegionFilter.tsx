'use client';

import React, { useState } from 'react';
import { Compass, Mountain, Trees, Waves, Sparkles, Filter } from 'lucide-react';

export interface RegionFilterProps {
  locale: string;
  onSelectRegion?: (regionId: string) => void;
}

const REGIONS_I18N: Record<string, {
  filterLabel: string;
  all: string;
  andes: string;
  amazon: string;
  coast: string;
  galapagos: string;
  activeDescription: Record<string, string>;
}> = {
  es: {
    filterLabel: 'Explora por Región:',
    all: 'Todas las Regiones',
    andes: 'Andes y Volcanes',
    amazon: 'Amazonía',
    coast: 'Costa Pacífico',
    galapagos: 'Islas Galápagos',
    activeDescription: {
      all: 'Mostrando la guía completa de Ecuador y sus 4 ecosistemas.',
      andes: 'Filtrando: Cordillera de los Andes, páramos, Cotopaxi, Quilotoa y Quito.',
      amazon: 'Filtrando: Selva amazónica, Yasuní, Cuyabeno y delfines rosados.',
      coast: 'Filtrando: Playas del Pacífico, avistamiento de ballenas jorobadas y surf.',
      galapagos: 'Filtrando: Archipiélago de Galápagos, fauna endémica, snorkel y buceo.',
    }
  },
  en: {
    filterLabel: 'Explore by Region:',
    all: 'All Regions',
    andes: 'Andes & Volcanoes',
    amazon: 'Amazon Rainforest',
    coast: 'Pacific Coast',
    galapagos: 'Galapagos Islands',
    activeDescription: {
      all: 'Viewing full guide covering Ecuador and its 4 distinct ecosystems.',
      andes: 'Filtered: Andean highlands, volcanic corridor, Cotopaxi, Quilotoa & Quito.',
      amazon: 'Filtered: Amazon jungle, Yasuní, Cuyabeno & pink river dolphins.',
      coast: 'Filtered: Pacific beaches, humpback whale migration & coastal reserves.',
      galapagos: 'Filtered: Galapagos Archipelago, endemic wildlife, diving & snorkeling.',
    }
  },
  fr: {
    filterLabel: 'Explorer par Région :',
    all: 'Toutes les Régions',
    andes: 'Andes & Volcans',
    amazon: 'Amazonie',
    coast: 'Côte Pacifique',
    galapagos: 'Îles Galapagos',
    activeDescription: {
      all: 'Affichage du guide complet pour les 4 écosystèmes.',
      andes: 'Filtre : Hautes terres des Andes, volcans, Cotopaxi & Quito.',
      amazon: 'Filtre : Forêt amazonienne, Yasuní, Cuyabeno & dauphins roses.',
      coast: 'Filtre : Plages du Pacifique, baleines à bosse & réserves côtières.',
      galapagos: 'Filtre : Îles Galapagos, faune endémique & plongée.',
    }
  },
  de: {
    filterLabel: 'Nach Region filtern:',
    all: 'Alle Regionen',
    andes: 'Anden & Vulkane',
    amazon: 'Amazonas-Regenwald',
    coast: 'Pazifikküste',
    galapagos: 'Galapagos-Inseln',
    activeDescription: {
      all: 'Vollständiger Reiseführer für alle 4 Ökosysteme Ecuadors.',
      andes: 'Gefiltert: Anden-Hochland, Vulkane, Cotopaxi & Quito.',
      amazon: 'Gefiltert: Amazonas-Dschungel, Yasuní, Cuyabeno & Flussdelfine.',
      coast: 'Gefiltert: Pazifikstrände, Buckelwale & Küstenreservate.',
      galapagos: 'Gefiltert: Galapagos-Archipel, endemische Tierwelt & Schnorcheln.',
    }
  },
  it: {
    filterLabel: 'Esplora per Regione:',
    all: 'Tutte le Regioni',
    andes: 'Ande & Vulcani',
    amazon: 'Amazzonia',
    coast: 'Costa del Pacifico',
    galapagos: 'Isole Galapagos',
    activeDescription: {
      all: 'Guida completa per tutti i 4 ecosistemi dell\'Ecuador.',
      andes: 'Filtro: Altipiani andini, Cotopaxi, Quilotoa & Quito.',
      amazon: 'Filtro: Foresta amazzonica, Yasuní, Cuyabeno & delfini rosa.',
      coast: 'Filtro: Spiagge del Pacifico, balene megattere & surf.',
      galapagos: 'Filtro: Isole Galapagos, fauna endemica & immersioni.',
    }
  },
  pt: {
    filterLabel: 'Explorar por Região:',
    all: 'Todas as Regiões',
    andes: 'Andes e Vulcões',
    amazon: 'Amazônia',
    coast: 'Costa do Pacífico',
    galapagos: 'Ilhas Galápagos',
    activeDescription: {
      all: 'Exibindo guia completo cobrindo os 4 ecossistemas do Equador.',
      andes: 'Filtrado: Terras altas andinas, Cotopaxi, Quilotoa e Quito.',
      amazon: 'Filtrado: Floresta amazônica, Yasuní, Cuyabeno e golfinhos-rosa.',
      coast: 'Filtrado: Praias do Pacífico, baleias-jubarte e reservas costeiras.',
      galapagos: 'Filtrado: Ilhas Galápagos, vida selvagem endêmica e snorkel.',
    }
  },
  ja: {
    filterLabel: '地域別に読む:',
    all: 'すべての地域',
    andes: 'アンデス・火山帯',
    amazon: 'アマゾン熱帯雨林',
    coast: '太平洋岸',
    galapagos: 'ガラパゴス諸島',
    activeDescription: {
      all: 'エクアドルの4つの生態系すべてを網羅する総合ガイド。',
      andes: '表示中：アンデス山脈・コトパクシ・キロトア・キト。',
      amazon: '表示中：アマゾンジャングル・ヤスニ・ピンクイルカ。',
      coast: '表示中：太平洋ビーチ・ザトウクジラ・沿岸自然保護区。',
      galapagos: '表示中：ガラパゴス諸島・固有種・ダイビング＆シュノーケリング。',
    }
  },
  zh: {
    filterLabel: '按区域浏览：',
    all: '全部区域',
    andes: '安第斯山与火山',
    amazon: '亚马逊雨林',
    coast: '太平洋海岸',
    galapagos: '加拉帕戈斯群岛',
    activeDescription: {
      all: '正在浏览涵盖厄瓜多尔四大生态系统的全景指南。',
      andes: '已筛选：安第斯高原、科托帕希火山、基洛托阿与基多。',
      amazon: '已筛选：亚马逊热带雨林、亚苏尼、库亚贝诺与粉红河豚。',
      coast: '已筛选：太平洋海滩、座头鲸迁徙观赏与海岸冲浪。',
      galapagos: '已筛选：加拉帕戈斯群岛、特有野生动物与浮潜潜水。',
    }
  }
};

export function BlogRegionFilter({ locale }: { locale: string }) {
  const [activeRegion, setActiveRegion] = useState<string>('all');
  const t = REGIONS_I18N[locale] || REGIONS_I18N.en;

  const regions = [
    { id: 'all', label: t.all, icon: Compass },
    { id: 'andes', label: t.andes, icon: Mountain },
    { id: 'amazon', label: t.amazon, icon: Trees },
    { id: 'coast', label: t.coast, icon: Waves },
    { id: 'galapagos', label: t.galapagos, icon: Sparkles },
  ];

  const handleSelect = (regionId: string) => {
    setActiveRegion(regionId);

    if (typeof window === 'undefined') return;

    if (regionId === 'all') {
      const allSections = document.querySelectorAll<HTMLElement>('[data-region-section]');
      allSections.forEach((el) => {
        el.style.display = '';
      });
      return;
    }

    const allSections = document.querySelectorAll<HTMLElement>('[data-region-section]');
    let firstMatch: HTMLElement | null = null;

    allSections.forEach((el) => {
      const sectionRegion = el.getAttribute('data-region-section');
      if (sectionRegion === regionId || sectionRegion === 'general') {
        el.style.display = '';
        if (!firstMatch && sectionRegion === regionId) firstMatch = el;
      } else {
        el.style.display = 'none';
      }
    });

    if (firstMatch) {
      (firstMatch as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="sticky top-20 z-20 my-6 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-emerald-500/20 dark:border-emerald-500/20 shadow-xl transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5" />
          <span>{t.filterLabel}</span>
        </div>

        {/* Region Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {regions.map((r) => {
            const Icon = r.icon;
            const isActive = activeRegion === r.id;
            return (
              <button
                key={r.id}
                onClick={() => handleSelect(r.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 dark:bg-emerald-600 text-white shadow-md shadow-emerald-900/20 font-bold scale-[1.02]'
                    : 'bg-zinc-100 hover:bg-emerald-50 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700/80 border border-zinc-200/80 dark:border-zinc-700/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Helpful filter state micro-indicator */}
      <div className="mt-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
        <span>{t.activeDescription[activeRegion] || t.activeDescription.all}</span>
        {activeRegion !== 'all' && (
          <button
            onClick={() => handleSelect('all')}
            className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline cursor-pointer ml-2 shrink-0"
          >
            {locale === 'es' ? 'Mostrar todo' : 'Show all'}
          </button>
        )}
      </div>
    </div>
  );
}
