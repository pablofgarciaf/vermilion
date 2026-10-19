'use client';

import React from 'react';
import { Compass, Footprints, ThermometerSun, Mountain, Bird } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ExpeditionFactsProps {
  tourId: string;
  destination: string;
  duration: string;
  className?: string;
}

/**
 * Perfil de la ficha según el tipo de tour. Los textos viven en messages/*.json
 * (namespace `expeditionFacts`); aquí solo se decide qué perfil y qué especies se muestran.
 */
type FactsProfile = 'combo' | 'galapagos' | 'mainland';

const PROFILE_SPECIES: Record<FactsProfile, string[]> = {
  combo: ['tortoise', 'seaLion', 'blueFootedBooby', 'marineIguana', 'caiman', 'paiche'],
  galapagos: ['tortoise', 'seaLion', 'marineIguana', 'penguin', 'reefShark', 'flamingo'],
  mainland: ['condor', 'caiman', 'paiche', 'hummingbirdsToucans', 'squirrelMonkey'],
};

export function ExpeditionFacts({ tourId, destination, className = '' }: ExpeditionFactsProps) {
  const t = useTranslations('expeditionFacts');
  const tb = useTranslations('bookingConversion');

  const isGalapagos = /galapagos/i.test(tourId) || /galapagos/i.test(destination);
  const isAndesAmazon = /andes|amazon|volcanoes|snow|fantastic/i.test(tourId);
  const profile: FactsProfile = isGalapagos && isAndesAmazon ? 'combo' : isGalapagos ? 'galapagos' : 'mainland';

  const facts = {
    activityLevel: t(`profiles.${profile}.level`),
    activityDesc: t(`profiles.${profile}.desc`),
    climate: t(`profiles.${profile}.climate`),
    elevation: t(`profiles.${profile}.elevation`),
    wildlife: PROFILE_SPECIES[profile].map((key) => t(`species.${key}`)),
  };

  return (
    <div className={`bg-stone-50 dark:bg-stone-900/60 rounded-2xl p-5 border border-stone-200/80 dark:border-stone-800 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-200 dark:border-stone-800">
        <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        <h3 className="font-serif text-xs font-bold uppercase tracking-widest text-stone-800 dark:text-stone-200">
          {t('title')}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {/* Activity Level */}
        <div className="flex items-start gap-3 bg-white dark:bg-stone-800/80 p-3 rounded-xl border border-stone-200/50 dark:border-stone-700/50">
          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 shrink-0">
            <Footprints className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
              {t('activity')}
            </span>
            <span className="text-xs font-bold text-stone-900 dark:text-white block mt-0.5">
              {facts.activityLevel}
            </span>
            <span className="text-[10px] text-stone-600 dark:text-stone-400 block mt-0.5 leading-snug">
              {facts.activityDesc}
            </span>
          </div>
        </div>

        {/* Climate */}
        <div className="flex items-start gap-3 bg-white dark:bg-stone-800/80 p-3 rounded-xl border border-stone-200/50 dark:border-stone-700/50">
          <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 shrink-0">
            <ThermometerSun className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
              {t('climate')}
            </span>
            <span className="text-xs font-bold text-stone-900 dark:text-white block mt-0.5">
              {facts.climate}
            </span>
            <span className="text-[10px] text-stone-600 dark:text-stone-400 block mt-0.5">
              {tb('yearRound')}
            </span>
          </div>
        </div>

        {/* Elevation */}
        <div className="flex items-start gap-3 bg-white dark:bg-stone-800/80 p-3 rounded-xl border border-stone-200/50 dark:border-stone-700/50">
          <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 shrink-0">
            <Mountain className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
              {t('elevation')}
            </span>
            <span className="text-xs font-bold text-stone-900 dark:text-white block mt-0.5">
              {facts.elevation}
            </span>
          </div>
        </div>
      </div>

      {/* Wildlife Highlights */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Bird className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
            {t('wildlife')}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {facts.wildlife.map((animal) => (
            <span 
              key={animal} 
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200/60 dark:border-emerald-800/40"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {animal}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
