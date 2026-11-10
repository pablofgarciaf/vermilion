'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Download, RefreshCw, Search, X } from 'lucide-react';
import { auth } from '@/lib/firebase';

type VisitorRow = {
  createdAt: string | null;
  channel: string;
  video: string;
  campaign: string;
  page: string;
  locale: string;
  country: string;
  visitorId: string;
};

type VisitorsResponse = { success: boolean; error?: string; visitors?: VisitorRow[] };

const COLUMN_KEYS = [
  'colDate',
  'colChannel',
  'colVideo',
  'colCampaign',
  'colPage',
  'colLocale',
  'colCountry',
  'colVisitor',
] as const;

function rowCells(row: VisitorRow): string[] {
  return [row.createdAt || '', row.channel, row.video, row.campaign, row.page, row.locale, row.country, row.visitorId];
}

/** Escapa una celda CSV y neutraliza las fórmulas (=, +, -, @) para Excel y Sheets. */
function csvCell(value: string): string {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

function formatDate(iso: string | null, locale: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleString(locale);
}

/**
 * Lista de visitantes con consentimiento (fecha, canal, video, campaña, página, idioma, país y
 * UUID anónimo), con búsqueda y exportación CSV de lo que se ve en pantalla.
 * Lee /api/admin/visitors con el token del administrador conectado.
 */
export function VisitorDataPanel({ onClose }: { onClose: () => void }) {
  const t = useTranslations('crmVisitors');
  const locale = useLocale();
  const [rows, setRows] = useState<VisitorRow[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [errorText, setErrorText] = useState('');
  const [query, setQuery] = useState('');

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      const token = await auth?.currentUser?.getIdToken();
      const res = await fetch('/api/admin/visitors', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        cache: 'no-store',
      });
      const json = (await res.json()) as VisitorsResponse;
      if (!res.ok || !json.success) {
        setErrorText(json.error || `HTTP ${res.status}`);
        setStatus('error');
        return;
      }
      setRows(json.visitors || []);
      setStatus('ready');
    } catch (err) {
      console.error('[VisitorDataPanel]', err);
      setErrorText('');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => rowCells(r).some((cell) => cell.toLowerCase().includes(q)));
  }, [rows, query]);

  const exportCsv = () => {
    const header = COLUMN_KEYS.map((key) => t(key));
    const lines = [header, ...filtered.map(rowCells)]
      .map((cells) => cells.map(csvCell).join(','))
      .join('\r\n');
    // BOM para que Excel reconozca los acentos.
    const blob = new Blob(['﻿' + lines], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `visitantes-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      aria-labelledby="visitor-data-title"
      className="rounded-3xl bg-[#0B1A12]/80 border border-emerald-900/40 shadow-xl p-5 md:p-6 space-y-4"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
        <div className="space-y-1">
          <h2 id="visitor-data-title" className="font-serif text-xl font-bold text-white">{t('title')}</h2>
          <p className="text-xs text-zinc-400 max-w-3xl">{t('description')}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={load}
            className="flex items-center gap-2 rounded-xl border border-emerald-900/40 px-3 py-2 text-xs font-semibold text-zinc-300 hover:bg-white/5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {t('refresh')}
          </button>
          <button
            type="button"
            onClick={exportCsv}
            disabled={filtered.length === 0}
            className="flex items-center gap-2 rounded-xl border border-amber-700/50 px-3 py-2 text-xs font-semibold text-amber-300 hover:bg-amber-500/10 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download className="w-3.5 h-3.5" />
            {t('exportCsv')}
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('close')}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <label className="relative flex-1 max-w-md">
          <span className="sr-only">{t('searchPlaceholder')}</span>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full rounded-xl bg-zinc-950 border border-emerald-900/40 pl-9 pr-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-600"
          />
        </label>
        {status === 'ready' && (
          <span className="text-xs text-zinc-400">{t('count', { count: filtered.length })}</span>
        )}
      </div>

      {status === 'loading' && <p className="text-xs text-zinc-400">{t('loading')}</p>}
      {status === 'error' && (
        <p className="text-xs text-red-400">
          {errorText ? t('error', { error: errorText }) : t('networkError')}
        </p>
      )}

      {status === 'ready' && rows.length === 0 && (
        <p className="text-xs text-zinc-400">{t('empty')}</p>
      )}
      {status === 'ready' && rows.length > 0 && filtered.length === 0 && (
        <p className="text-xs text-zinc-400">{t('noResults')}</p>
      )}

      {status === 'ready' && filtered.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-emerald-950/80">
          <table className="min-w-full text-left text-xs text-zinc-300">
            <thead className="bg-emerald-950/60 text-[10px] font-mono uppercase tracking-wider text-amber-400">
              <tr>
                {COLUMN_KEYS.map((key) => (
                  <th key={key} scope="col" className="px-3 py-2 font-bold whitespace-nowrap">{t(key)}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-950/80">
              {filtered.map((row, index) => (
                <tr key={`${row.visitorId}-${row.createdAt}-${index}`} className="hover:bg-white/5">
                  <td className="px-3 py-2 whitespace-nowrap">{formatDate(row.createdAt, locale)}</td>
                  <td className="px-3 py-2">{row.channel || '—'}</td>
                  <td className="px-3 py-2">{row.video || '—'}</td>
                  <td className="px-3 py-2">{row.campaign || '—'}</td>
                  <td className="px-3 py-2">{row.page || '—'}</td>
                  <td className="px-3 py-2">{row.locale || '—'}</td>
                  <td className="px-3 py-2">{row.country || '—'}</td>
                  <td className="px-3 py-2 font-mono text-[11px] text-zinc-400">{row.visitorId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
