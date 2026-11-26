"use client";

import { Eye, Search, Trash2, Undo2 } from "lucide-react";
import type { CrmLead, LeadStatus } from "@/types/crm";

type Props = {
  leads: CrmLead[];
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  destinationFilter: string;
  onDestinationFilterChange: (value: string) => void;
  onOpenLead: (lead: CrmLead) => void;
  onArchiveLead: (lead: CrmLead) => void;
  onStatusChange: (id: string, status: LeadStatus) => void;
  onOpenOperations: () => void;
};

type ColumnProps = {
  title: string;
  statusClass: string;
  countClass: string;
  leads: CrmLead[];
  children: (lead: CrmLead) => React.ReactNode;
};

function Column({
  title,
  statusClass,
  countClass,
  leads,
  children,
}: ColumnProps) {
  return (
    <div className="p-4 rounded-3xl bg-[#060D08] border border-emerald-950/80 space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-emerald-950">
        <span
          className={`text-xs font-mono font-bold uppercase tracking-wider ${statusClass}`}
        >
          {title}
        </span>
        <span
          className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${countClass}`}
        >
          {leads.length}
        </span>
      </div>
      <div className="space-y-3">{leads.map(children)}</div>
    </div>
  );
}

export function SalesPipelineTab({
  leads,
  searchQuery,
  onSearchQueryChange,
  destinationFilter,
  onDestinationFilterChange,
  onOpenLead,
  onArchiveLead,
  onStatusChange,
  onOpenOperations,
}: Props) {
  const matches = (status: LeadStatus | LeadStatus[]) =>
    leads.filter((lead) => {
      const statuses = Array.isArray(status) ? status : [status];
      const query = searchQuery.trim().toLowerCase();
      return (
        statuses.includes(lead.status) &&
        (destinationFilter === "all" ||
          lead.destination.includes(destinationFilter)) &&
        (!query ||
          `${lead.customerName} ${lead.customerEmail}`
            .toLowerCase()
            .includes(query))
      );
    });
  const newLeads = matches("new");
  const contacted = matches("contacted");
  const quotes = matches(["itinerary_sent", "negotiation"]);
  const won = matches("won");
  const card = (lead: CrmLead, className = "border-emerald-900/30") => (
    <div
      key={lead.id}
      className={`p-4 rounded-2xl bg-[#0B1A12] border ${className} space-y-2`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-zinc-400">
          {lead.destination}
        </span>
        <span className="text-[10px] text-amber-400 font-bold">
          ${lead.estimatedBudget.toLocaleString("en-US")}
        </span>
      </div>
      <h4 className="text-xs font-bold text-white">{lead.customerName}</h4>
      <p className="text-[11px] text-zinc-400 line-clamp-2">
        {lead.notes || lead.customerEmail}
      </p>
      <button
        onClick={() => onOpenLead(lead)}
        className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1"
      >
        <Eye className="w-3 h-3" /> Ficha completa
      </button>
    </div>
  );
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 font-mono">
            Filtrar destino:
          </span>
          <select
            value={destinationFilter}
            onChange={(e) => onDestinationFilterChange(e.target.value)}
            className="bg-[#0B1A12] border border-emerald-900/50 rounded-xl px-3 py-1.5 text-xs text-white"
          >
            <option value="all">Todos los Destinos</option>
            <option value="Galapagos">Galápagos</option>
            <option value="Amazon">Amazonía</option>
            <option value="Andes">Andes</option>
          </select>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Buscar prospecto o correo..."
            className="pl-9 pr-4 py-1.5 bg-[#0B1A12] border border-emerald-900/50 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Column
          title="1. Nuevos Leads"
          statusClass="text-amber-400"
          countClass="bg-amber-500/20 text-amber-400"
          leads={newLeads}
        >
          {(lead) => (
            <div
              key={lead.id}
              className="p-4 rounded-2xl bg-[#0B1A12] border border-emerald-900/30 space-y-2 hover:border-amber-500/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-400">
                  {lead.destination}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-amber-400 font-bold">
                    ${lead.estimatedBudget.toLocaleString("en-US")}
                  </span>
                  <button
                    onClick={() => onArchiveLead(lead)}
                    aria-label={`Archivar ${lead.customerName}`}
                    className="text-zinc-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <h4 className="text-xs font-bold text-white">
                {lead.customerName}
              </h4>
              <p className="text-[11px] text-zinc-400 line-clamp-2">
                {lead.notes}
              </p>
              <div className="pt-2 border-t border-emerald-950 flex items-center justify-between">
                <button
                  onClick={() => onOpenLead(lead)}
                  className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3 h-3" /> Ficha 360°
                </button>
                <button
                  onClick={() => onStatusChange(lead.id, "contacted")}
                  className="px-2 py-1 rounded bg-amber-500 text-black text-[10px] font-bold cursor-pointer hover:bg-amber-400"
                >
                  Contactar →
                </button>
              </div>
            </div>
          )}
        </Column>
        <Column
          title="2. Contactados"
          statusClass="text-blue-400"
          countClass="bg-blue-500/20 text-blue-400"
          leads={contacted}
        >
          {(lead) => (
            <div
              key={lead.id}
              className="p-4 rounded-2xl bg-[#0B1A12] border border-emerald-900/30 space-y-2"
            >
              <span className="text-[10px] font-mono text-zinc-400">
                {lead.destination}
              </span>
              <h4 className="text-xs font-bold text-white">
                {lead.customerName}
              </h4>
              <p className="text-[11px] text-zinc-400">{lead.customerEmail}</p>
              <button
                onClick={() => onOpenLead(lead)}
                className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1"
              >
                <Eye className="w-3 h-3" /> Ficha completa
              </button>
              <button
                onClick={() => onStatusChange(lead.id, "new")}
                className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1"
              >
                <Undo2 className="w-3 h-3" /> Volver a nuevos
              </button>
              <button
                onClick={() => onStatusChange(lead.id, "itinerary_sent")}
                className="w-full py-1.5 rounded bg-blue-600 text-white text-[10px] font-bold mt-2 cursor-pointer"
              >
                Enviar Cotización →
              </button>
            </div>
          )}
        </Column>
        <Column
          title="3. Cotización Enviada"
          statusClass="text-purple-400"
          countClass="bg-purple-500/20 text-purple-400"
          leads={quotes}
        >
          {(lead) => (
            <div
              key={lead.id}
              className="p-4 rounded-2xl bg-[#0B1A12] border border-purple-900/30 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-purple-300">
                  En Negociación
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white font-bold">
                    ${lead.estimatedBudget.toLocaleString("en-US")}
                  </span>
                  <button
                    onClick={() => onArchiveLead(lead)}
                    aria-label={`Archivar ${lead.customerName}`}
                    className="text-zinc-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <h4 className="text-xs font-bold text-white">
                {lead.customerName}
              </h4>
              <button
                onClick={() => onOpenLead(lead)}
                className="text-[10px] text-zinc-400 hover:underline flex items-center gap-1"
              >
                <Eye className="w-3 h-3" /> Ficha completa
              </button>
              <button
                onClick={() => onStatusChange(lead.id, "contacted")}
                className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1"
              >
                <Undo2 className="w-3 h-3" /> Volver a contactados
              </button>
              <button
                onClick={() => onStatusChange(lead.id, "won")}
                className="w-full py-1.5 rounded bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] font-bold mt-2 cursor-pointer"
              >
                ✓ Cerrar Venta Ganada
              </button>
            </div>
          )}
        </Column>
        <Column
          title="4. Ganadas (Bookings)"
          statusClass="text-emerald-400"
          countClass="bg-emerald-500/20 text-emerald-400"
          leads={won}
        >
          {(lead) => (
            <div
              key={lead.id}
              className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2"
            >
              <span className="text-[10px] font-mono text-emerald-400">
                Listo para Run-Sheet
              </span>
              <h4 className="text-xs font-bold text-white">
                {lead.customerName}
              </h4>
              <p className="text-[10px] text-zinc-400">
                ${lead.estimatedBudget.toLocaleString("en-US")} USD
              </p>
              <button
                onClick={() => onOpenLead(lead)}
                className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1"
              >
                <Eye className="w-3 h-3" /> Ficha completa
              </button>
              <button
                onClick={() => onStatusChange(lead.id, "itinerary_sent")}
                className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1"
              >
                <Undo2 className="w-3 h-3" /> Reabrir cotización
              </button>
              <button
                onClick={onOpenOperations}
                className="text-[10px] text-[#D4AF37] hover:underline block pt-1 font-bold"
              >
                Ver en Operaciones →
              </button>
            </div>
          )}
        </Column>
      </div>
    </div>
  );
}
