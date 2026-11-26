"use client";

import {
  Car,
  CheckCircle2,
  Compass,
  MessageSquare,
  Share2,
} from "lucide-react";
import type {
  CrmBooking,
  GenealogyNode,
  SystemUser,
  WhatsAppTemplate,
} from "@/types/crm";

type PayoutTarget = { booking: CrmBooking; type: "affiliate" | "operator" };

export function OperationsTab({
  bookings,
  onOpenRunSheet,
  onSignalCompleted,
}: {
  bookings: CrmBooking[];
  onOpenRunSheet: (booking: CrmBooking) => void;
  onSignalCompleted: (booking: CrmBooking) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-teal-400 shrink-0" />
          <span>
            <strong>Portal de Campo:</strong> Control del Run-Sheet día por día,
            asignación de choferes, hoteles de lujo y emisión de señal de
            liquidación.
          </span>
        </div>
      </div>
      <div className="space-y-4">
        {bookings.map((booking, idx) => (
          <div
            key={`${booking.id || booking.bookingCode || "op"}-${idx}`}
            className="p-6 rounded-3xl bg-[#0B1A12]/80 border border-emerald-900/40 shadow-xl space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald-950">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-teal-500/20 text-teal-300 font-mono text-xs font-bold border border-teal-500/30">
                    {booking.bookingCode}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">
                    {booking.travelStartDate} — {booking.travelEndDate}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-white mt-1">
                  {booking.tourTitle}
                </h3>
                <p className="text-xs text-zinc-400">
                  Pasajero Titular:{" "}
                  <strong className="text-white">{booking.customerName}</strong>{" "}
                  ({booking.passengersCount} pax) · Tel: {booking.customerPhone}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onOpenRunSheet(booking)}
                  className="px-3 py-2 rounded-xl bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Car className="w-4 h-4" />
                  <span>Ver Hoja de Ruta (Run-Sheet)</span>
                </button>
                {booking.status !== "completed" ? (
                  <button
                    onClick={() => onSignalCompleted(booking)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    ✓ Señalar Viaje Realizado
                  </button>
                ) : (
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                    Expedición Culminada
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {booking.runSheet?.map((day) => (
                <div
                  key={day.dayNumber}
                  className="p-3.5 rounded-2xl bg-black/40 border border-emerald-900/30 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#D4AF37] font-bold">
                      Día {day.dayNumber} · {day.date}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${day.status === "completed" ? "bg-emerald-500/20 text-emerald-400" : day.status === "in_progress" ? "bg-amber-500/20 text-amber-400" : "bg-zinc-800 text-zinc-400"}`}
                    >
                      {day.status}
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-white">{day.title}</h5>
                  <p className="text-[11px] text-zinc-400 leading-snug">
                    {day.activitiesSummary}
                  </p>
                  <div className="pt-2 border-t border-emerald-950/60 flex items-center justify-between text-[10px] text-zinc-400">
                    <span>
                      Chofer:{" "}
                      <strong className="text-white">
                        {day.driverName || "N/A"}
                      </strong>{" "}
                      ({day.vehiclePlate || "S/P"})
                    </span>
                    <span>
                      Pick-up:{" "}
                      <strong className="text-teal-400">
                        {day.pickupTime || "Por coordinar"}
                      </strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AmenitiesTab({
  bookings,
  onDelivered,
}: {
  bookings: CrmBooking[];
  onDelivered: (booking: CrmBooking) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-[#0B1A12] to-stone-950 border border-amber-500/30 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
            Experiencia Gastronómica & Regalos de Autor
          </span>
          <h3 className="font-serif text-2xl font-bold text-white">
            Pakari Organic Chocolate & Sombreros Montecristi
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            Cada expedición privada incluye un kit de bienvenida con los mejores
            productos de Ecuador: chocolate Pakari premiado internacionalmente y
            sombreros de paja toquilla hechos a mano.
          </p>
        </div>
        <div className="shrink-0 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center">
          <span className="text-[10px] text-zinc-400 font-mono block">
            Kits Entregados
          </span>
          <span className="font-serif text-3xl font-extrabold text-[#D4AF37]">
            {bookings.filter((b) => b.vipGiftDelivered).length} /{" "}
            {bookings.length}
          </span>
        </div>
      </div>
      <div className="p-6 rounded-3xl bg-[#0B1A12]/80 border border-emerald-900/40 shadow-xl space-y-4">
        <h4 className="font-serif text-base font-bold text-white">
          Órdenes de Amenidad por Despachar
        </h4>
        <div className="space-y-3">
          {bookings.map((booking, idx) => (
            <div
              key={`${booking.id || booking.bookingCode || "am"}-${idx}`}
              className="p-4 rounded-2xl bg-black/40 border border-emerald-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <span className="text-[10px] font-mono text-amber-400">
                  {booking.bookingCode} · {booking.destination}
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5">
                  {booking.customerName}
                </h4>
                <p className="text-xs text-zinc-400">
                  Kit Asignado:{" "}
                  <strong className="text-white">
                    {booking.vipGiftAssigned || "Pakari Imperial Edition"}
                  </strong>
                </p>
              </div>
              <div className="flex items-center gap-3">
                {booking.vipGiftDelivered ? (
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold flex items-center gap-1.5 border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4" /> Entregado a Bordo
                  </span>
                ) : (
                  <button
                    onClick={() => onDelivered(booking)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
                  >
                    Confirmar Entrega en Transfer
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FinanceTab({
  bookings,
  onPayout,
}: {
  bookings: CrmBooking[];
  onPayout: (target: PayoutTarget) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-[#0B1A12]/80 border border-emerald-900/40 shadow-xl space-y-4">
        <h4 className="font-serif text-lg font-bold text-white">
          Matriz de Rentabilidad (P&L) por Expedición
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="border-b border-emerald-950 text-zinc-500 font-mono uppercase text-[10px]">
              <tr>
                <th className="p-3">Código</th>
                <th className="p-3">Pasajero</th>
                <th className="p-3 text-right">Venta Bruta</th>
                <th className="p-3 text-right">Costos Directos</th>
                <th className="p-3 text-right">Comisión Embajador</th>
                <th className="p-3 text-right">Comisión Guía</th>
                <th className="p-3 text-right">Utilidad Neta</th>
                <th className="p-3 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-950/60 font-mono">
              {bookings.map((b, idx) => {
                const amount = b.totalAmount || b.paidAmount || 0;
                const cost = b.directCosts || amount * 0.58;
                const affiliate = b.affiliateCommissionAmount || 0;
                const operator = b.operatorCommissionAmount || 0;
                const net = amount - cost - affiliate - operator;
                const margin = Math.round((net / (amount || 1)) * 100);
                return (
                  <tr
                    key={`${b.id || b.bookingCode || "fin"}-${idx}`}
                    className="hover:bg-white/5"
                  >
                    <td className="p-3 font-bold text-amber-400">
                      {b.bookingCode}
                    </td>
                    <td className="p-3 text-white font-sans">
                      {b.customerName}
                    </td>
                    <td className="p-3 text-right text-white font-bold">
                      ${amount.toLocaleString("en-US")}
                    </td>
                    <td className="p-3 text-right text-rose-400">
                      -${cost.toLocaleString("en-US")}
                    </td>
                    <td className="p-3 text-right text-amber-400">
                      -${affiliate.toLocaleString("en-US")}
                      <span className="text-[9px] block text-zinc-500">
                        ({b.affiliateCommissionStatus})
                      </span>
                    </td>
                    <td className="p-3 text-right text-teal-400">
                      -${operator.toLocaleString("en-US")}
                      <span className="text-[9px] block text-zinc-500">
                        ({b.operatorCommissionStatus})
                      </span>
                    </td>
                    <td className="p-3 text-right font-extrabold text-emerald-400">
                      +${net.toLocaleString("en-US")}{" "}
                      <span className="text-[10px] font-normal">
                        ({margin}%)
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      {b.affiliateCommissionStatus === "ready_for_review" && (
                        <button
                          onClick={() =>
                            onPayout({ booking: b, type: "affiliate" })
                          }
                          className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-black text-[10px] font-bold cursor-pointer font-sans"
                        >
                          Dispersar Pago
                        </button>
                      )}
                      {b.affiliateCommissionStatus === "paid" && (
                        <span className="text-[10px] text-emerald-400 font-sans">
                          ✓ Liquidado
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function GenealogyTab({ genealogy }: { genealogy: GenealogyNode }) {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-[#0B1A12]/80 border border-emerald-900/40 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-serif text-lg font-bold text-white">
              Árbol Genealógico & Supervisión Unilevel
            </h4>
            <p className="text-xs text-zinc-400">
              Estructura de patrocinios 10-3-2 y comisiones de red.
            </p>
          </div>
          <div className="text-xs font-mono px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Plan de Compensación Activo
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-black/60 border border-amber-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-black font-extrabold text-sm">
                👑
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  @{genealogy.username} ({genealogy.name})
                </h4>
                <span className="text-xs text-amber-400 font-mono">
                  {genealogy.rank} · Nivel 0
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-zinc-400 font-mono block">
                Ventas de Red:
              </span>
              <span className="font-mono font-extrabold text-lg text-white">
                ${genealogy.totalSales.toLocaleString("en-US")} USD
              </span>
            </div>
          </div>
          <div className="pl-6 border-l-2 border-amber-500/30 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
              Nivel 1 (Hijos Directos — 3% Comisión Padre)
            </span>
            {genealogy.children?.map((child) => (
              <div
                key={child.username}
                className="p-3.5 rounded-xl bg-[#0B1A12] border border-emerald-900/40 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white">
                      @{child.username} ({child.name})
                    </h5>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      {child.rank} · {child.email}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    ${child.totalSales.toLocaleString("en-US")} USD
                  </span>
                </div>
                {child.children?.length ? (
                  <div className="pl-4 border-l border-emerald-800/40 space-y-1.5 pt-2">
                    <span className="text-[9px] font-mono text-zinc-500 block">
                      Nivel 2 (Nietos — 2% Comisión Abuelo)
                    </span>
                    {child.children.map((grand) => (
                      <div
                        key={grand.username}
                        className="p-2 rounded-lg bg-black/40 flex items-center justify-between text-xs"
                      >
                        <span className="text-zinc-300">
                          @{grand.username} ({grand.name})
                        </span>
                        <span className="text-teal-400 font-mono font-bold">
                          ${grand.totalSales.toLocaleString("en-US")} USD
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ConciergeTab({ templates }: { templates: WhatsAppTemplate[] }) {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-[#0B1A12]/80 border border-emerald-900/40 shadow-xl space-y-4">
        <h4 className="font-serif text-lg font-bold text-white">
          Plantillas de Concierge Rápido para WhatsApp
        </h4>
        <p className="text-xs text-zinc-400">
          Atención personalizada inmediata con un solo clic.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="p-4 rounded-2xl bg-black/40 border border-emerald-900/30 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-amber-400">
                    {template.category} · {template.lang.toUpperCase()}
                  </span>
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <h5 className="text-xs font-bold text-white mt-1">
                  {template.title}
                </h5>
                <p className="text-[11px] text-zinc-400 mt-2 bg-[#0B1A12] p-3 rounded-xl font-mono leading-relaxed border border-emerald-950">
                  {template.body}
                </p>
              </div>
              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(template.body.replace("{nombre}", "Estimado Pasajero").replace("{concierge}", "Carlos").replace("{destino}", "Galápagos"))}`,
                    "_blank",
                  )
                }
                className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Abrir en WhatsApp Web</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TeamTab({ users }: { users: SystemUser[] }) {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-[#0B1A12]/80 border border-emerald-900/40 shadow-xl space-y-4">
        <div>
          <h4 className="font-serif text-lg font-bold text-white">
            Directorio de Personal Corporativo
          </h4>
          <p className="text-xs text-zinc-400">
            Cuentas y roles sincronizados en la colección `usuarios` de
            Firestore.
          </p>
        </div>
        <div className="space-y-3">
          {users.map((u) => (
            <div
              key={u.id}
              className="p-4 rounded-2xl bg-black/40 border border-emerald-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${u.role === "super" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : u.role === "operator" ? "bg-teal-500/20 text-teal-400 border border-teal-500/30" : "bg-blue-500/20 text-blue-400 border border-blue-500/30"}`}
                  >
                    {u.role}
                  </span>
                  <h4 className="text-xs font-bold text-white">{u.name}</h4>
                </div>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">
                  {u.email} · Tel: {u.phone || "N/A"}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-500 font-mono block">
                  Cédula / ID: {u.cedula || "N/A"}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">
                  ● Activo en Sistema
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
