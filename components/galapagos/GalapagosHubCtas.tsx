'use client';

import { Sparkles, Video } from 'lucide-react';
import { CALL_BOOKING_URL, openPlanTrip, type PlanTripDetail } from '@/data/planTrip';

interface Props {
  planLabel: string;
  callLabel: string;
  /** Datos con los que se abre el formulario (tour o destino preseleccionado). */
  detail?: PlanTripDetail;
  /** 'hero' = sobre foto oscura; 'card' = dentro de una tarjeta clara. */
  variant?: 'hero' | 'card';
  placement: string;
}

/** Botones de captación de la página de Galápagos: formulario por pasos y videollamada. */
export function GalapagosHubCtas({ planLabel, callLabel, detail = { destination: 'galapagos' }, variant = 'hero', placement }: Props) {
  const secondary =
    variant === 'hero'
      ? 'border-white/40 bg-black/40 text-white hover:bg-black/60 backdrop-blur-md'
      : 'border-emerald-700/30 bg-white text-emerald-900 hover:bg-emerald-50 dark:bg-zinc-900 dark:text-emerald-200';
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        type="button"
        onClick={() => openPlanTrip(detail)}
        data-lead-placement={placement}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 px-6 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white shadow-lg shadow-red-900/30 transition-transform hover:scale-[1.02] active:scale-95"
      >
        <Sparkles className="w-4 h-4" />
        {planLabel}
      </button>
      {CALL_BOOKING_URL && (
        <a
          href={CALL_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-lead-placement={`${placement}_call`}
          className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors ${secondary}`}
        >
          <Video className="w-4 h-4" />
          {callLabel}
        </a>
      )}
    </div>
  );
}
