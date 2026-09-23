'use client';

/**
 * Buscador + filtro por región para el listado de destinos.
 *
 * Este componente se reutiliza en varias superficies con la MISMA UI para que
 * el visitante reconozca el patrón donde lo vea: la página /destinations, el
 * bloque "Explora nuestros destinos" de la home, y donde aparezcan cards de
 * destino en un artículo o en la ficha individual.
 *
 * Se divide en dos piezas exportables para poder ubicar la barra de filtros
 * dentro del hero (sobre una imagen oscura) y la grilla de resultados debajo:
 *   - DestinationsFilterBar: chips de región + buscador, con estilo `onDark`
 *     opcional para verse bien sobre fondos fotográficos oscuros.
 *   - DestinationsResultsGrid: grilla de cards ya filtradas.
 *   - DestinationsFilter: wrapper de compatibilidad que renderiza ambas piezas
 *     juntas (comportamiento previo), para quien no necesite separarlas.
 */

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Compass, Waves, Mountain, TreePine } from 'lucide-react';

export type Region = 'all' | 'galapagos' | 'andes' | 'amazonia';

export interface DestinationsFilterItem {
  slug: string;
  region: 'galapagos' | 'andes' | 'amazonia';
  name: string;
  tagline: string;
  image: string;
  mobileImage: string;
}

export interface Labels {
  all: string;
  galapagos: string;
  andes: string;
  amazonia: string;
  search: string;
  empty: string;
}

const REGION_ICON: Record<Region, React.ComponentType<{ className?: string }>> = {
  all: Compass,
  galapagos: Waves,
  andes: Mountain,
  amazonia: TreePine,
};

/** Quita acentos para que "galapagos" y "galápagos" cuadren en la búsqueda. */
export function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

export function useDestinationsFilter(items: DestinationsFilterItem[]) {
  const [region, setRegion] = useState<Region>('all');
  const [query, setQuery] = useState('');

  // Al escribir en el buscador, volvemos el filtro de región a "Todos" para que
  // la búsqueda no quede oculta por un filtro de región activo (evita que el
  // usuario piense que la búsqueda no funciona).
  const handleSetQuery = (q: string) => {
    setQuery(q);
    if (q.trim().length > 0 && region !== 'all') {
      setRegion('all');
    }
  };

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return items.filter((i) => {
      if (region !== 'all' && i.region !== region) return false;
      if (!q) return true;
      return normalize(i.name).includes(q) || normalize(i.tagline).includes(q);
    });
  }, [items, region, query]);

  const regionsInData = new Set(items.map((i) => i.region));
  const chips: Region[] = (['all', 'galapagos', 'andes', 'amazonia'] as Region[]).filter(
    (r) => r === 'all' || regionsInData.has(r as any)
  );

  return { region, setRegion, query, setQuery: handleSetQuery, filtered, chips };
}

interface FilterBarProps {
  region: Region;
  setRegion: (r: Region) => void;
  query: string;
  setQuery: (q: string) => void;
  chips: Region[];
  labels: Labels;
  /** Estilo pensado para fondos oscuros/fotográficos, como el hero. */
  onDark?: boolean;
}

export function DestinationsFilterBar({ region, setRegion, query, setQuery, chips, labels, onDark = false }: FilterBarProps) {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl ${
        onDark
          ? 'bg-black/30 backdrop-blur-xl border border-white/20 shadow-2xl p-4 sm:p-5'
          : ''
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        {chips.map((r) => {
          const Icon = REGION_ICON[r];
          const active = region === r;
          return (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-colors ${
                active
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-950/40'
                  : onDark
                  ? 'bg-white/10 border-white/30 text-white hover:border-emerald-400 hover:bg-white/20'
                  : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {labels[r]}
            </button>
          );
        })}
      </div>

      <div className="relative">
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${onDark ? 'text-white/60' : 'text-zinc-400'}`} />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={labels.search}
          className={`pl-10 pr-4 py-2.5 rounded-full text-sm w-full md:w-72 focus:outline-none transition-colors ${
            onDark
              ? 'bg-white/10 border border-white/30 text-white placeholder-white/60 focus:border-emerald-400 focus:bg-white/15'
              : 'bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:border-emerald-500'
          }`}
          aria-label={labels.search}
        />
      </div>
    </div>
  );
}

interface ResultsGridProps {
  filtered: DestinationsFilterItem[];
  locale: string;
  labels: Labels;
  compact?: boolean;
}

export function DestinationsResultsGrid({ filtered, locale, labels }: ResultsGridProps) {
  if (filtered.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 p-10 text-center text-zinc-600 dark:text-zinc-400">
        {labels.empty}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((d) => (
        <Link
          key={d.slug}
          href={`/${locale}/destinations/${d.slug}`}
          className="group relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 hover:shadow-2xl transition-shadow"
        >
          <div className="relative aspect-[4/3]">
            <Image
              src={d.image}
              alt={d.name}
              fill
              quality={90}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <h3 className="font-serif text-xl font-bold leading-tight mb-1 [text-shadow:0_2px_10px_rgba(0,0,0,0.85)]">
                {d.name}
              </h3>
              <p className="text-sm text-white/90 line-clamp-2 [text-shadow:0_2px_10px_rgba(0,0,0,0.85)]">
                {d.tagline}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

interface Props {
  items: DestinationsFilterItem[];
  locale: string;
  labels: Labels;
  compact?: boolean;
}

/** Wrapper de compatibilidad: barra + grilla juntas, como antes. */
export default function DestinationsFilter({ items, locale, labels }: Props) {
  const { region, setRegion, query, setQuery, filtered, chips } = useDestinationsFilter(items);

  return (
    <div className="space-y-6">
      <DestinationsFilterBar
        region={region}
        setRegion={setRegion}
        query={query}
        setQuery={setQuery}
        chips={chips}
        labels={labels}
      />
      <DestinationsResultsGrid filtered={filtered} locale={locale} labels={labels} />
    </div>
  );
}
