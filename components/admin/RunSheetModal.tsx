'use client';

import type { CrmBooking, RunSheetDay } from '@/types/crm';

type Props = {
  booking: CrmBooking | null;
  onClose: () => void;
  onStatusChange: (bookingId: string, dayNumber: number, status: RunSheetDay['status']) => void;
};

export function RunSheetModal({ booking, onClose, onStatusChange }: Props) {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-[#0B1A12] border border-teal-800/60 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-emerald-950">
          <div>
            <span className="text-[10px] font-mono text-teal-400 uppercase">Run-Sheet Operativo</span>
            <h3 className="font-serif text-lg font-bold text-white">{booking.tourTitle}</h3>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white text-xs">✕</button>
        </div>
        <div className="space-y-3">
          {booking.runSheet?.map((day) => (
            <div key={day.dayNumber} className="p-4 rounded-2xl bg-black/50 border border-teal-900/40 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white">Día {day.dayNumber}: {day.title}</h4>
                <span className="text-[10px] font-mono text-teal-400">{day.date}</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">{day.activitiesSummary}</p>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-950/60 text-[11px] text-zinc-400">
                <div>Chofer: <strong className="text-white">{day.driverName}</strong> ({day.driverPhone})</div>
                <div>Vehículo: <strong className="text-white">{day.vehiclePlate}</strong></div>
                <div>Hotel: <strong className="text-white">{day.hotelName}</strong></div>
                <div>Confirmación: <strong className="text-amber-400">{day.hotelConfirmation}</strong></div>
              </div>
              <div className="pt-2 flex items-center gap-2">
                <button onClick={() => onStatusChange(booking.id, day.dayNumber, 'completed')} className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold cursor-pointer">✓ Check-in Completado</button>
                <button onClick={() => onStatusChange(booking.id, day.dayNumber, 'in_progress')} className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-[10px] font-bold cursor-pointer">En Curso</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
