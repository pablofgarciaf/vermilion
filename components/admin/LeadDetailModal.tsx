'use client';

import {
  CalendarDays,
  ClipboardList,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Tag,
  UserRound,
  Users,
  X,
} from 'lucide-react';
import type { CrmLead } from '@/types/crm';

export type LeadDetailModalProps = {
  lead: CrmLead | null;
  onClose: () => void;
};

const statusLabels: Record<CrmLead['status'], string> = {
  new: 'Nuevo lead',
  contacted: 'Contactado',
  itinerary_sent: 'Cotización enviada',
  negotiation: 'En negociación',
  won: 'Ganado',
  lost: 'No concretado',
};

function formatDate(value?: string) {
  if (!value) return 'No registrado';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('es-EC', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function formatBudget(value?: number) {
  if (typeof value !== 'number') return 'A medida';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function DetailItem({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="rounded-xl border border-emerald-950 bg-[#07140d] px-3 py-2.5">
      <dt className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-200/55">{label}</dt>
      <dd className="mt-1 break-words text-sm font-medium text-white/90">{value || 'No registrado'}</dd>
    </div>
  );
}

function TextSection({ title, content }: { title: string; content?: string }) {
  if (!content?.trim()) return null;

  return (
    <section className="rounded-2xl border border-emerald-950 bg-[#07140d] p-4">
      <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">{title}</h3>
      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/80">{content}</p>
    </section>
  );
}

export default function LeadDetailModal({ lead, onClose }: LeadDetailModalProps) {
  if (!lead) return null;

  const phone = lead.customerPhone?.replace(/[^\d+]/g, '');
  const whatsappPhone = lead.customerPhone?.replace(/\D/g, '');
  const passenger = lead.passengerDetails;
  const emergency = passenger?.emergencyContact;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby={`lead-detail-title-${lead.id}`}
        aria-modal="true"
        className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-emerald-800/70 bg-[#0B1A12] p-5 shadow-2xl shadow-black/60 sm:p-7"
        role="dialog"
      >
        <header className="flex items-start justify-between gap-4 border-b border-emerald-900/80 pb-5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-700/70 bg-emerald-950/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.13em] text-emerald-200">
                <ClipboardList className="h-3.5 w-3.5" />
                {statusLabels[lead.status]}
              </span>
              {lead.archived && (
                <span className="rounded-full border border-amber-700/70 bg-amber-950/50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.13em] text-amber-200">
                  Archivado
                </span>
              )}
            </div>
            <h2 id={`lead-detail-title-${lead.id}`} className="mt-3 break-words font-serif text-3xl font-bold text-white">
              {lead.customerName || 'Pasajero sin nombre'}
            </h2>
            <p className="mt-1 text-sm text-emerald-100/55">Ficha completa de atención y seguimiento</p>
          </div>
          <button
            aria-label="Cerrar ficha del pasajero"
            className="rounded-xl border border-emerald-800/70 p-2 text-emerald-100/70 transition hover:border-emerald-500 hover:bg-emerald-950 hover:text-white"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <a
            className="flex min-w-0 items-center gap-3 rounded-2xl border border-emerald-800/70 bg-[#092016] p-3.5 transition hover:border-emerald-500"
            href={`mailto:${lead.customerEmail}`}
          >
            <Mail className="h-5 w-5 shrink-0 text-emerald-300" />
            <span className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-100/50">Correo</span>
              <span className="block truncate text-sm font-semibold text-white">{lead.customerEmail || 'No registrado'}</span>
            </span>
          </a>
          {phone ? (
            <a
              className="flex min-w-0 items-center gap-3 rounded-2xl border border-emerald-800/70 bg-[#092016] p-3.5 transition hover:border-emerald-500"
              href={`https://wa.me/${whatsappPhone}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <MessageCircle className="h-5 w-5 shrink-0 text-emerald-300" />
              <span className="min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-100/50">WhatsApp / teléfono</span>
                <span className="block truncate text-sm font-semibold text-white">{phone}</span>
              </span>
            </a>
          ) : (
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-950 bg-[#07140d] p-3.5 text-white/45">
              <Phone className="h-5 w-5 shrink-0" />
              <span><span className="block text-[10px] font-bold uppercase tracking-[0.15em]">WhatsApp / teléfono</span>No registrado</span>
            </div>
          )}
        </div>

        <section className="mt-6">
          <h3 className="flex items-center gap-2 text-sm font-bold text-white"><Tag className="h-4 w-4 text-emerald-300" /> Datos de la solicitud</h3>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <DetailItem label="Estado" value={statusLabels[lead.status]} />
            <DetailItem label="Fuente" value={lead.source} />
            <DetailItem label="Colección" value={lead.sourceCollection} />
            <DetailItem label="Destino" value={lead.destination} />
            <DetailItem label="Fechas de viaje" value={lead.travelDates} />
            <DetailItem label="Pasajeros" value={lead.passengersCount} />
            <DetailItem label="Presupuesto estimado" value={formatBudget(lead.estimatedBudget)} />
            <DetailItem label="País" value={lead.country} />
            <DetailItem label="Idioma" value={lead.locale?.toUpperCase()} />
            <DetailItem label="Creado" value={formatDate(lead.createdAt)} />
            <DetailItem label="Última actualización" value={formatDate(lead.updatedAt)} />
            <DetailItem label="Operador asignado" value={lead.assignedOperatorName} />
          </dl>
        </section>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <TextSection title="Interés" content={lead.interest} />
            <TextSection title="Solicitud del pasajero" content={lead.requestDetails} />
            <TextSection title="Huéspedes / grupo" content={lead.guestsText} />
            <TextSection title="Notas internas" content={lead.notes} />
          </div>

          <div className="space-y-4">
            <section className="rounded-2xl border border-emerald-950 bg-[#07140d] p-4">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-300"><ShieldCheck className="h-4 w-4" /> Consentimiento comercial</h3>
              <p className="mt-2 text-sm font-semibold text-white/90">
                {lead.marketingConsent ? 'Autorizó comunicaciones de seguimiento.' : 'No autorizó comunicaciones de seguimiento.'}
              </p>
              <p className="mt-1 text-xs text-white/50">Fecha: {formatDate(lead.marketingConsentAt)}</p>
            </section>

            {passenger && (
              <section className="rounded-2xl border border-emerald-800/60 bg-[#092016] p-4">
                <h3 className="flex items-center gap-2 text-sm font-bold text-white"><UserRound className="h-4 w-4 text-emerald-300" /> Perfil del pasajero</h3>
                <dl className="mt-3 grid gap-2 sm:grid-cols-2">
                  <DetailItem label="Nombre del perfil" value={passenger.fullName} />
                  <DetailItem label="Nacionalidad" value={passenger.nationality} />
                  <DetailItem label="Pasaporte" value={passenger.passportNumber} />
                  <DetailItem label="Nacimiento" value={passenger.birthDate} />
                  <DetailItem label="Nivel físico" value={passenger.fitnessLevel} />
                  <DetailItem label="Talla de camisa" value={passenger.shirtSize} />
                  <DetailItem label="Talla de sombrero" value={passenger.hatSize} />
                  <DetailItem label="Restricciones alimentarias" value={passenger.dietaryRestrictions} />
                </dl>
                {passenger.medicalNotes && <TextSection title="Notas médicas" content={passenger.medicalNotes} />}
                {emergency && (
                  <div className="mt-3 rounded-xl border border-amber-900/70 bg-amber-950/20 p-3">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-200">Contacto de emergencia</p>
                    <p className="mt-1 text-sm font-semibold text-white">{emergency.name}</p>
                    <p className="text-sm text-white/70">{emergency.relation || 'Relación no registrada'} · {emergency.phone || 'Teléfono no registrado'}</p>
                  </div>
                )}
              </section>
            )}
          </div>
        </div>

        {lead.observations && lead.observations.length > 0 && (
          <section className="mt-6 rounded-2xl border border-emerald-800/60 bg-[#092016] p-4">
            <h3 className="flex items-center gap-2 text-sm font-bold text-white"><Users className="h-4 w-4 text-emerald-300" /> Observaciones del equipo</h3>
            <div className="mt-3 space-y-3">
              {lead.observations.map((observation, index) => (
                <article key={`${observation.createdAt}-${index}`} className="rounded-xl border border-emerald-950 bg-[#07140d] p-3">
                  <p className="whitespace-pre-wrap text-sm leading-6 text-white/85">{observation.text}</p>
                  <p className="mt-2 text-xs text-emerald-100/50">{observation.authorName || observation.authorEmail} · {formatDate(observation.createdAt)}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-emerald-900/80 pt-5 text-xs text-white/45">
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Datos disponibles para atención del lead</span>
          <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> ID: {lead.id}</span>
          <button className="rounded-lg border border-emerald-800 px-3 py-1.5 font-semibold text-emerald-100 transition hover:bg-emerald-950" onClick={onClose} type="button">Cerrar</button>
        </footer>
      </section>
    </div>
  );
}
