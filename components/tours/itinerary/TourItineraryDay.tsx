'use client';

import React from 'react';
import Image from 'next/image';
import { TourItineraryChips, type ItineraryChip } from './TourItineraryChips';

export interface TourItineraryDayProps {
  dayNumber: number;
  dayLabel: string;
  title: string;
  description: string;
  highlightsLabel: string;
  highlights: string[];
  chips: ItineraryChip[];
  image?: string;
  /** Lado de la foto en escritorio; el texto va al lado opuesto. */
  imageSide: 'left' | 'right';
  /** true cuando la línea de tiempo ya llegó a este nodo (lo decide el padre por scroll). */
  revealed: boolean;
}

export function TourItineraryDay({
  dayNumber,
  dayLabel,
  title,
  description,
  highlightsLabel,
  highlights,
  chips,
  image,
  imageSide,
  revealed,
}: TourItineraryDayProps) {
  const isLeft = imageSide === 'left';
  const textColumn = isLeft ? 'md:col-start-2' : 'md:col-start-1';
  const imageColumn = isLeft ? 'md:col-start-1' : 'md:col-start-2';
  const hiddenShift = isLeft ? 'md:-translate-x-10' : 'md:translate-x-10';

  return (
    <li
      className={`relative pl-12 pb-14 last:pb-0 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none md:grid md:grid-cols-2 md:gap-x-0 md:pl-0 ${
        revealed
          ? 'opacity-100 translate-y-0 md:translate-x-0'
          : `pointer-events-none opacity-0 translate-y-6 ${hiddenShift}`
      }`}
    >
      {/* Nodo del día: va después de la línea en el DOM, así queda por encima sin z-index */}
      <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold shadow-sm md:left-1/2 md:-translate-x-1/2">
        {dayNumber}
      </span>

      {/* Texto a columna completa, con aire respecto a la línea central (md:px-12) */}
      <div className={`min-w-0 space-y-2.5 md:row-start-1 md:px-12 ${textColumn}`}>
        <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          {dayLabel}
        </p>
        <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug text-zinc-900 dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-line">
            {description}
          </p>
        )}
        {highlights.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {highlightsLabel}
            </p>
            <ul className="grid grid-cols-1 gap-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 sm:grid-cols-2">
              {highlights.map((hl, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span aria-hidden="true" className="font-bold text-emerald-600">✓</span>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <TourItineraryChips items={chips} />
      </div>

      {/* Miniatura 4:3 de ~280px, centrada en su lado del zigzag */}
      {image && (
        <div
          className={`relative mt-5 md:mt-0 aspect-[4/3] w-[17.5rem] max-w-full overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 md:row-start-1 md:mx-auto ${imageColumn}`}
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="280px"
            className="object-cover"
          />
        </div>
      )}
    </li>
  );
}
