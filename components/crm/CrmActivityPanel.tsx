'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { MessageSquare, MousePointerClick, RefreshCw } from 'lucide-react';
import { auth } from '@/lib/firebase';

type ActivityResponse = {
  success: boolean;
  error?: string;
  whatsappClicks: {
    total: number;
    today: number;
    last7Days: number;
    byPlacement: { placement: string; count: number }[];
    recent: { placement: string; page: string; locale: string; createdAt: string | null }[];
  };
  chatSessions: {
    id: string;
    locale: string;
    lastUpdated: string | null;
    messageCount: number;
    lastUserMessage: string;
  }[];
  whatsappThreads: {
    id: string;
    phoneMasked: string;
    name: string;
    state: string;
    locale: string;
    messageCount: number;
    lastCustomerMessage: string;
    leadId: string | null;
    updatedAt: string | null;
  }[];
};

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleString();
}

/**
 * Panel de actividad del sitio dentro del CRM: clics a WhatsApp y conversaciones del chat web con la IA.
 * Lee /api/admin/crm-activity con el token del administrador conectado.
 */
export function CrmActivityPanel() {
  const [data, setData] = useState<ActivityResponse | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [errorText, setErrorText] = useState<string>('');

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      const token = await auth?.currentUser?.getIdToken();
      const res = await fetch('/api/admin/crm-activity', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        cache: 'no-store',
      });
      const json = (await res.json()) as ActivityResponse;
      if (!res.ok || !json.success) {
        setErrorText(json.error || `HTTP ${res.status}`);
        setStatus('error');
        return;
      }
      setData(json);
      setStatus('ready');
    } catch (err) {
      console.error('[CrmActivityPanel]', err);
      setErrorText('No se pudo conectar con el servidor.');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-serif text-lg font-bold text-white">Actividad del sitio</h4>
        <button
          type="button"
          onClick={load}
          className="flex items-center gap-2 rounded-xl border border-emerald-900/40 px-3 py-2 text-xs font-semibold text-zinc-300 hover:bg-white/5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Actualizar
        </button>
      </div>

      {status === 'loading' && <p className="text-xs text-zinc-400">Cargando actividad…</p>}
      {status === 'error' && (
        <p className="text-xs text-red-400">No se pudo cargar la actividad: {errorText}</p>
      )}

      {status === 'ready' && data && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#0B1A12]/80 border border-emerald-900/40 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase font-bold text-amber-400">
                <MousePointerClick className="w-4 h-4" /> Clics a WhatsApp (total)
              </div>
              <p className="text-3xl font-bold text-white">{data.whatsappClicks.total}</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#0B1A12]/80 border border-emerald-900/40 space-y-2">
              <p className="text-[10px] font-mono uppercase font-bold text-amber-400">Hoy</p>
              <p className="text-3xl font-bold text-white">{data.whatsappClicks.today}</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#0B1A12]/80 border border-emerald-900/40 space-y-2">
              <p className="text-[10px] font-mono uppercase font-bold text-amber-400">Últimos 7 días</p>
              <p className="text-3xl font-bold text-white">{data.whatsappClicks.last7Days}</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#0B1A12]/80 border border-emerald-900/40 space-y-2 md:col-span-4">
              <p className="text-[10px] font-mono uppercase font-bold text-amber-400">Dónde se pulsó (total)</p>
              {data.whatsappClicks.byPlacement.length === 0 ? (
                <p className="text-xs text-zinc-400">Todavía no hay clics registrados.</p>
              ) : (
                <ul className="text-xs text-zinc-300 space-y-1">
                  {data.whatsappClicks.byPlacement.map((p) => (
                    <li key={p.placement} className="flex justify-between">
                      <span className="font-mono">{p.placement}</span>
                      <span className="font-bold text-white">{p.count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#0B1A12]/80 border border-emerald-900/40 space-y-3">
            <h5 className="text-sm font-bold text-white">Últimos clics a WhatsApp</h5>
            {data.whatsappClicks.recent.length === 0 ? (
              <p className="text-xs text-zinc-400">Todavía no hay clics registrados.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-zinc-300">
                  <thead className="text-zinc-500">
                    <tr>
                      <th className="py-2 pr-4 font-semibold">Fecha</th>
                      <th className="py-2 pr-4 font-semibold">Lugar</th>
                      <th className="py-2 pr-4 font-semibold">Página</th>
                      <th className="py-2 pr-4 font-semibold">Idioma</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.whatsappClicks.recent.map((c, i) => (
                      <tr key={`${c.createdAt}-${i}`} className="border-t border-white/5">
                        <td className="py-2 pr-4 whitespace-nowrap">{formatDate(c.createdAt)}</td>
                        <td className="py-2 pr-4 font-mono">{c.placement}</td>
                        <td className="py-2 pr-4 truncate max-w-[220px]">{c.page}</td>
                        <td className="py-2 pr-4">{c.locale}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="p-6 rounded-3xl bg-[#0B1A12]/80 border border-emerald-900/40 space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <h5 className="text-sm font-bold text-white">Conversaciones del chat web con la IA</h5>
            </div>
            {data.chatSessions.length === 0 ? (
              <p className="text-xs text-zinc-400">Todavía no hay conversaciones guardadas.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-zinc-300">
                  <thead className="text-zinc-500">
                    <tr>
                      <th className="py-2 pr-4 font-semibold">Última actividad</th>
                      <th className="py-2 pr-4 font-semibold">Mensajes</th>
                      <th className="py-2 pr-4 font-semibold">Idioma</th>
                      <th className="py-2 pr-4 font-semibold">Último mensaje del visitante</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.chatSessions.map((s) => (
                      <tr key={s.id} className="border-t border-white/5 align-top">
                        <td className="py-2 pr-4 whitespace-nowrap">{formatDate(s.lastUpdated)}</td>
                        <td className="py-2 pr-4">{s.messageCount}</td>
                        <td className="py-2 pr-4">{s.locale}</td>
                        <td className="py-2 pr-4">{s.lastUserMessage || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="p-6 rounded-3xl bg-[#0B1A12]/80 border border-emerald-900/40 space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <h5 className="text-sm font-bold text-white">Conversaciones de WhatsApp con la IA</h5>
            </div>
            {data.whatsappThreads.length === 0 ? (
              <p className="text-xs text-zinc-400">Todavía no hay conversaciones de WhatsApp.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-zinc-300">
                  <thead className="text-zinc-500">
                    <tr>
                      <th className="py-2 pr-4 font-semibold">Última actividad</th>
                      <th className="py-2 pr-4 font-semibold">Contacto</th>
                      <th className="py-2 pr-4 font-semibold">Estado</th>
                      <th className="py-2 pr-4 font-semibold">Turnos</th>
                      <th className="py-2 pr-4 font-semibold">Último mensaje del cliente</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.whatsappThreads.map((t) => (
                      <tr key={t.id} className="border-t border-white/5 align-top">
                        <td className="py-2 pr-4 whitespace-nowrap">{formatDate(t.updatedAt)}</td>
                        <td className="py-2 pr-4">{t.name || t.phoneMasked}</td>
                        <td className="py-2 pr-4 font-mono">{t.state}</td>
                        <td className="py-2 pr-4">{t.messageCount}</td>
                        <td className="py-2 pr-4">{t.lastCustomerMessage || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
