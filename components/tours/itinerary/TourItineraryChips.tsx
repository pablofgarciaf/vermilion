'use client';

import React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface ItineraryChip {
  key: string;
  icon: LucideIcon;
  label: string;
  value: string;
}

interface TourItineraryChipsProps {
  items: ItineraryChip[];
}

export function TourItineraryChips({ items }: TourItineraryChipsProps) {
  if (items.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map(({ key, icon: Icon, label, value }) => (
        <li
          key={key}
          className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/70 px-2.5 py-1 text-[11px] text-zinc-700 dark:text-zinc-300"
        >
          <Icon className="w-3 h-3 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">{label}:</span>
          <span className="min-w-0 break-words">{value}</span>
        </li>
      ))}
    </ul>
  );
}
