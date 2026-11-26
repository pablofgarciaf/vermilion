'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { BarChart3, ChevronLeft, MapPin, Monitor, Smartphone, Tablet, TrendingUp, Users, MessageCircle, CreditCard, FileText } from 'lucide-react';
import { auth } from '@/lib/firebase';

type CrmPerformance = { funnel: { createdLeads: number; quotations: number; bookingsCreated: number; paidBookings: number; confirmedRevenue: number; whatsappClicks: number } };
type Ga4 = {
  state: 'connected' | 'configuration_required' | 'unavailable'; message: string;
  overview?: { activeUsers: number; newUsers: number; sessions: number; pageViews: number; events: number };
  devices?: Array<{ name: string; sessions: number }>;
  pages?: Array<{ path: string; title: string; views: number; users: number }>;
  countries?: Array<{ country: string; users: number; sessions: number }>;
  cities?: Array<{ city: string; country: string; users: number; sessions: number }>;
};

const DEVICE_META = [
  { name: 'mobile', label: 'Celulares', Icon: Smartphone, color: 'bg-emerald-400' },
  { name: 'tablet', label: 'Tablets', Icon: Tablet, color: 'bg-sky-400' },
  { name: 'desktop', label: 'Escritorio', Icon: Monitor, color: 'bg-amber-400' },
];

export function CommercialPerformancePanel({ locale, embedded = false }: { locale: string; embedded?: boolean }) {
  const [days, setDays] = useState(28);
  const [crm, setCrm] = useState<CrmPerformance | null>(null);
  const [ga4, setGa4] = useState<Ga4 | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const token = await auth?.currentUser?.getIdToken();
      if (!token) throw new Error('Tu sesión administrativa no está disponible.');
      const headers = { Authorization: `Bearer ${token}` };
      const [crmResponse, gaResponse] = await Promise.all([
        fetch(`/api/admin/commercial-performance?days=${days}`, { headers, cache: 'no-store' }),
        fetch(`/api/admin/ga4?days=${days}`, { headers, cache: 'no-store' }),
      ]);
      const [crmResult, gaResult] = await Promise.all([crmResponse.json(), gaResponse.json()]);
      if (!crmResponse.ok || !crmResult.success) throw new Error(crmResult.error || 'No se pudo cargar el CRM.');
      if (!gaResponse.ok || !gaResult.success) throw new Error(gaResult.error || 'No se pudo consultar GA4.');
      setCrm(crmResult); setGa4(gaResult.ga4);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'No se pudo cargar el panel.');
    } finally { setLoading(false); }
  }, [days]);

  useEffect(() => { void load(); }, [load]);
  const isGaConnected = ga4?.state === 'connected' && !!ga4.overview;
  const sessions = ga4?.overview?.sessions || 0;
  const currency = new Intl.NumberFormat(locale === 'es' ? 'es-EC' : 'en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const shellClass = embedded ? 'space-y-6' : 'min-h-screen bg-[#07110B] px-4 py-7 text-zinc-100 sm:px-8';

  return (
    <section className={shellClass} aria-label="Analítica comercial">
      <div className={embedded ? 'space-y-6' : 'mx-auto max-w-6xl space-y-6'}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {!embedded && <Link href={`/${locale}/admin`} className="mb-3 inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white"><ChevronLeft className="h-4 w-4" />Volver al administrador</Link>}
            <p className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400"><BarChart3 className="h-4 w-4" />Google Analytics 4 + CRM</p>
            {embedded ? <h2 className="font-serif text-2xl font-bold text-white">Analítica, páginas y ciudades</h2> : <h1 className="font-serif text-3xl font-bold text-white">Analítica, páginas y ciudades</h1>}
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">Histórico de GA4 separado de leads, reservas y cobros del CRM.</p>
          </div>
          <div className="flex rounded-xl border border-emerald-900/60 bg-black/20 p-1">
            {[7, 28, 90].map((option) => <button key={option} onClick={() => setDays(option)} className={`rounded-lg px-3 py-2 text-xs font-bold ${days === option ? 'bg-emerald-500 text-zinc-950' : 'text-zinc-400 hover:text-white'}`}>{option} días</button>)}
          </div>
        </div>
        {loading && <div className="rounded-2xl border border-emerald-900/40 bg-[#0B1A12] p-8 text-sm text-zinc-400">Consultando GA4 y CRM…</div>}
        {error && <div className="rounded-2xl border border-rose-900/40 bg-rose-950/30 p-5 text-sm text-rose-200">{error}</div>}
        {!loading && ga4 && !isGaConnected && <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-5 text-sm text-amber-100"><strong>GA4 aún no entrega datos al panel.</strong> {ga4.message}</div>}
        {crm && <>
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Kpi label="Sesiones GA4" value={isGaConnected ? sessions.toLocaleString() : '—'} detail={isGaConnected ? `Histórico real · ${days} días` : 'Sin conexión API'} icon={<Users />} />
            <Kpi label="Leads creados" value={crm.funnel.createdLeads.toLocaleString()} detail="CRM: formularios y consultas" icon={<TrendingUp />} />
            <Kpi label="Clics a WhatsApp" value={crm.funnel.whatsappClicks.toLocaleString()} detail="Registro propio del sitio" icon={<MessageCircle />} />
            <Kpi label="Cobrado verificado" value={currency.format(crm.funnel.confirmedRevenue)} detail={`${crm.funnel.paidBookings} pagos confirmados`} icon={<CreditCard />} />
          </section>
          {isGaConnected && <>
            <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <div className="rounded-3xl border border-emerald-900/50 bg-[#0B1A12]/90 p-6 shadow-xl"><h3 className="font-serif text-xl font-bold text-white">Dispositivos de GA4</h3><p className="mt-1 text-xs text-zinc-400">Sesiones históricas de los últimos {days} días.</p><div className="mt-6 space-y-5">{DEVICE_META.map(({ name, label, Icon, color }) => { const value = ga4.devices?.find((device) => device.name === name)?.sessions || 0; const percentage = sessions ? Math.round((value / sessions) * 100) : 0; return <div key={name}><div className="mb-2 flex items-center justify-between text-sm"><span className="flex items-center gap-2 font-medium text-zinc-200"><Icon className="h-4 w-4 text-zinc-400" />{label}</span><span className="font-mono text-white">{value} · {percentage}%</span></div><div className="h-2 overflow-hidden rounded-full bg-white/10"><div className={`h-full rounded-full ${color}`} style={{ width: `${percentage}%` }} /></div></div>; })}</div></div>
              <div className="rounded-3xl border border-amber-900/40 bg-[#0B1A12]/90 p-6 shadow-xl"><h3 className="font-serif text-xl font-bold text-white">Actividad en el sitio</h3><div className="mt-5 space-y-4"><Metric label="Usuarios activos" value={ga4.overview!.activeUsers} /><Metric label="Usuarios nuevos" value={ga4.overview!.newUsers} /><Metric label="Páginas vistas" value={ga4.overview!.pageViews} /><Metric label="Eventos" value={ga4.overview!.events} /></div></div>
            </section>
            <section className="grid gap-6 lg:grid-cols-3"><GaList title="Páginas más visitadas" icon={<FileText className="h-4 w-4" />} rows={ga4.pages || []} render={(page) => <><span className="truncate">{page.title !== '(not set)' ? page.title : page.path}</span><span className="font-mono text-emerald-300">{page.views} vistas</span></>} /><GaList title="Países de la audiencia" icon={<MapPin className="h-4 w-4" />} rows={ga4.countries || []} render={(country) => <><span>{country.country}</span><span className="font-mono text-emerald-300">{country.users} usuarios</span></>} /><GaList title="Ciudades de la audiencia" icon={<MapPin className="h-4 w-4" />} rows={ga4.cities || []} render={(city) => <><span>{city.city}, {city.country}</span><span className="font-mono text-emerald-300">{city.users} usuarios</span></>} /></section>
          </>}
          <section className="rounded-3xl border border-amber-900/40 bg-[#0B1A12]/90 p-6 shadow-xl"><h3 className="font-serif text-xl font-bold text-white">Embudo comercial del CRM</h3><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Metric label="Leads" value={crm.funnel.createdLeads} /><Metric label="Cotizaciones" value={crm.funnel.quotations} /><Metric label="Reservas" value={crm.funnel.bookingsCreated} /><Metric label="Pagos confirmados" value={crm.funnel.paidBookings} /></div></section>
        </>}
      </div>
    </section>
  );
}

function Kpi({ label, value, detail, icon }: { label: string; value: string; detail: string; icon: ReactNode }) { return <article className="rounded-2xl border border-emerald-900/40 bg-[#0B1A12]/90 p-5 shadow-xl"><div className="flex items-start justify-between"><p className="text-xs font-mono uppercase tracking-wider text-zinc-400">{label}</p><span className="text-emerald-400">{icon}</span></div><p className="mt-3 font-serif text-3xl font-bold text-white">{value}</p><p className="mt-1 text-[11px] text-zinc-500">{detail}</p></article>; }
function Metric({ label, value }: { label: string; value: number }) { return <div className="flex items-center justify-between border-b border-emerald-950/70 pb-3 last:border-0"><span className="text-sm text-zinc-300">{label}</span><span className="rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-sm font-bold text-emerald-300">{value}</span></div>; }
function GaList<T>({ title, icon, rows, render }: { title: string; icon: ReactNode; rows: T[]; render: (row: T) => ReactNode }) { return <section className="rounded-3xl border border-emerald-900/50 bg-[#0B1A12]/90 p-6 shadow-xl"><h3 className="flex items-center gap-2 font-serif text-xl font-bold text-white">{icon}{title}</h3><div className="mt-4 space-y-3">{rows.length ? rows.map((row, index) => <div key={index} className="flex items-center justify-between gap-4 border-b border-emerald-950/70 pb-3 text-sm text-zinc-200">{render(row)}</div>) : <p className="text-sm text-zinc-500">GA4 no registró datos en este período.</p>}</div></section>; }
