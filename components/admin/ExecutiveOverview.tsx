'use client';

import { Award, Calendar } from 'lucide-react';
import type { CrmBooking, GenealogyNode } from '@/types/crm';

type Props = {
  bookings: CrmBooking[];
  genealogy: GenealogyNode;
  totalGMV: number;
  totalCollected: number;
  netOperatingProfit: number;
  avgMargin: number;
  onOpenOperations: () => void;
};

export function ExecutiveOverview(props: Props) {
  const { bookings, genealogy, totalGMV, totalCollected, netOperatingProfit, avgMargin, onOpenOperations } = props;
  return (
    <div className="space-y-6">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-[#0B1A12]/80 border border-emerald-900/40 shadow-xl space-y-2">
                <span className="text-zinc-400 text-xs font-mono uppercase tracking-wider block">
                  Volumen Bruto (GMV)
                </span>
                <h3 className="font-serif text-3xl font-extrabold text-white tracking-tight">
                  ${totalGMV.toLocaleString("en-US")}{" "}
                  <span className="text-xs font-normal text-emerald-400">
                    USD
                  </span>
                </h3>
                <p className="text-[11px] text-zinc-400">
                  Total expediciones confirmadas en el periodo
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-[#0B1A12]/80 border border-emerald-900/40 shadow-xl space-y-2">
                <span className="text-zinc-400 text-xs font-mono uppercase tracking-wider block">
                  Cobrado en Cuenta
                </span>
                <h3 className="font-serif text-3xl font-extrabold text-emerald-400 tracking-tight">
                  ${totalCollected.toLocaleString("en-US")}{" "}
                  <span className="text-xs font-normal text-zinc-400">USD</span>
                </h3>
                <p className="text-[11px] text-zinc-400">
                  {Math.round((totalCollected / (totalGMV || 1)) * 100)}% de
                  recaudación efectiva
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-[#0B1A12]/80 border border-amber-900/40 shadow-xl space-y-2">
                <span className="text-amber-300 text-xs font-mono uppercase tracking-wider block">
                  Utilidad Neta P&L
                </span>
                <h3 className="font-serif text-3xl font-extrabold text-[#D4AF37] tracking-tight">
                  ${netOperatingProfit.toLocaleString("en-US")}{" "}
                  <span className="text-xs font-normal text-amber-200">
                    USD
                  </span>
                </h3>
                <p className="text-[11px] text-amber-400/80">
                  Margen neto corporativo promedio:{" "}
                  <strong>{avgMargin}%</strong>
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-[#0B1A12]/80 border border-teal-900/40 shadow-xl space-y-2">
                <span className="text-teal-300 text-xs font-mono uppercase tracking-wider block">
                  Tours en Operación
                </span>
                <h3 className="font-serif text-3xl font-extrabold text-teal-400 tracking-tight">
                  {bookings.filter((b) => b.status === "in_operation").length}{" "}
                  <span className="text-xs font-normal text-zinc-400">
                    viajes
                  </span>
                </h3>
                <p className="text-[11px] text-teal-300/80">
                  Pasajeros atendidos en campo en este momento
                </p>
              </div>
            </div>

            {/* Próximas Salidas & Alertas Operativas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-6 rounded-3xl bg-[#0B1A12]/60 border border-emerald-950/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Próximas Expediciones Confirmadas</span>
                  </h3>
                  <button
                    onClick={() => onOpenOperations()}
                    className="text-xs text-amber-400 hover:underline"
                  >
                    Ver Run-Sheets →
                  </button>
                </div>

                <div className="space-y-3">
                  {bookings.map((b, idx) => (
                    <div
                      key={`${b.id || b.bookingCode || "b"}-${idx}`}
                      className="p-4 rounded-2xl bg-black/40 border border-emerald-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">
                            {b.bookingCode}
                          </span>
                          <span className="text-xs text-zinc-400 font-mono">
                            {b.travelStartDate} al {b.travelEndDate}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1">
                          {b.tourTitle}
                        </h4>
                        <p className="text-xs text-zinc-400">
                          Pasajeros:{" "}
                          <strong className="text-white">
                            {b.customerName}
                          </strong>{" "}
                          ({b.passengersCount} pax) · Guía:{" "}
                          <strong className="text-teal-400">
                            {b.assignedOperatorName || "Por asignar"}
                          </strong>
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-sm font-extrabold text-white block">
                          $
                          {(b.totalAmount || b.paidAmount || 0).toLocaleString(
                            "en-US",
                          )}{" "}
                          USD
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full inline-block mt-1 ${
                            b.status === "in_operation"
                              ? "bg-teal-500/20 text-teal-300"
                              : "bg-amber-500/20 text-amber-300"
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Embajadores Widget */}
              <div className="p-6 rounded-3xl bg-[#0B1A12]/60 border border-emerald-950/80 space-y-4">
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Top Embajadores del Mes</span>
                </h3>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/20 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">
                        @{genealogy.username} (Founder)
                      </span>
                      <span className="text-[10px] text-zinc-400">
                        {
                          bookings.filter(
                            (b) =>
                              b.affiliateId === genealogy.username ||
                              (b as any).affiliateCode === genealogy.username,
                          ).length
                        }{" "}
                        reservas generadas
                      </span>
                    </div>
                    <span className="text-sm font-mono font-extrabold text-[#D4AF37]">
                      $
                      {bookings
                        .filter(
                          (b) =>
                            b.affiliateId === genealogy.username ||
                            (b as any).affiliateCode === genealogy.username,
                        )
                        .reduce(
                          (acc, b) =>
                            acc + (b.totalAmount || b.paidAmount || 0),
                          0,
                        )
                        .toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{" "}
                      USD
                    </span>
                  </div>

                  {genealogy.children && genealogy.children.length > 0
                    ? genealogy.children.map((c) => {
                        const childSales = bookings.filter(
                          (b) =>
                            b.affiliateId === c.username ||
                            (b as any).affiliateCode === c.username,
                        );
                        const childVolume = childSales.reduce(
                          (acc, b) =>
                            acc + (b.totalAmount || b.paidAmount || 0),
                          0,
                        );
                        return (
                          <div
                            key={c.username}
                            className="p-3.5 rounded-2xl bg-black/40 border border-emerald-900/20 flex items-center justify-between"
                          >
                            <div>
                              <span className="text-xs font-bold text-white block">
                                @{c.username}
                              </span>
                              <span className="text-[10px] text-zinc-400">
                                {childSales.length} reservas generadas
                              </span>
                            </div>
                            <span className="text-sm font-mono font-bold text-white">
                              $
                              {childVolume.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}{" "}
                              USD
                            </span>
                          </div>
                        );
                      })
                    : null}
                </div>

                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 leading-snug">
                  ✨ Las 3 Piscinas Globales de utilidades acumulan{" "}
                  <strong>
                    $
                    {(totalGMV * 0.06).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    USD
                  </strong>{" "}
                  (6% de volumen de venta) para el fondo global.
                </div>
              </div>
            </div>
    </div>
  );
}
