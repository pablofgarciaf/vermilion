'use client';

import React from 'react';
import { MapPin } from 'lucide-react';
import { DestinationsHeroBackground } from './DestinationsHeroBackground';
import {
  DestinationsFilterBar,
  DestinationsResultsGrid,
  useDestinationsFilter,
  type DestinationsFilterItem,
  type Labels,
} from './DestinationsFilter';

interface Props {
  items: DestinationsFilterItem[];
  locale: string;
  labels: Labels;
  title: string;
  subtitle: string;
  eyebrow: string;
}

/**
 * Hero de la página /destinations: imagen de fondo a pantalla completa (detrás
 * del navbar transparente), título, y ahora también los filtros + buscador
 * flotando sobre la imagen sin contenedor opaco. La grilla de
 * resultados se renderiza debajo, ya fuera del hero.
 */
export default function DestinationsHeroSection({ items, locale, labels, title, subtitle, eyebrow }: Props) {
  const { region, setRegion, query, setQuery, filtered, chips } = useDestinationsFilter(items);
  const titleParts = title.split(': ');

  return (
    <>
      {/* PORTADA */}
      <section className="relative w-full h-[100svh] min-h-[580px] sm:min-h-[620px] md:h-[72vh] md:min-h-[650px] overflow-hidden text-white">
        <DestinationsHeroBackground />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 sm:px-6">
          <div className="w-full max-w-6xl text-center">
          <span className="mx-auto mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            <MapPin className="w-3.5 h-3.5" />
            {eyebrow}
          </span>
          <h1 className="mb-4 font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {titleParts.length > 1 ? (
              <>
                <span className="block">{titleParts[0]}:</span>
                <span className="block text-emerald-300">{titleParts.slice(1).join(': ')}</span>
              </>
            ) : (
              title
            )}
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-zinc-200 sm:mb-10 sm:text-xl">{subtitle}</p>

          {/* Filtros + buscador dentro del hero */}
          <div className="mx-auto w-full max-w-5xl translate-y-4 sm:translate-y-6">
            <DestinationsFilterBar
              region={region}
              setRegion={setRegion}
              query={query}
              setQuery={setQuery}
              chips={chips}
              labels={labels}
              onDark
            />
          </div>
          </div>
        </div>
        {/* Curva de transición estilo revista premium: disuelve el borde inferior
            de la imagen hacia el fondo claro de la sección de resultados */}
        <div className="absolute -bottom-1 left-0 right-0 z-10 pointer-events-none" aria-hidden="true">
          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="w-full h-[60px] sm:h-[90px] text-[#FAF8F5] dark:text-zinc-950"
          >
            <path
              d="M0,40 C240,90 480,90 720,55 C960,20 1200,10 1440,45 L1440,100 L0,100 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* GRID */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <DestinationsResultsGrid filtered={filtered} locale={locale} labels={labels} />
      </div>
    </>
  );
}
