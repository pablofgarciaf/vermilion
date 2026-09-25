'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Calculator,
  Users,
  Award,
  Star,
  Percent,
  LogIn,
  UserPlus,
} from 'lucide-react';

interface PresentationClientProps {
  initialRef?: string;
  initialLogin?: boolean;
}

export function PresentationClient({ initialRef = '', initialLogin = false }: PresentationClientProps) {
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const refParam = initialRef || searchParams.get('vid') || searchParams.get('ref') || '';
  const loginParam = initialLogin || searchParams.get('login') === 'true';
  const isEs = locale === 'es';

  // Simulator Sliders State
  const [tourPrice, setTourPrice] = useState(5000);
  const [personalSales, setPersonalSales] = useState(2);
  const [recruits, setRecruits] = useState(2);
  const [recruitSales, setRecruitSales] = useState(1);

  // 1. Direct Sales Volume & Commission (10% Infinite)
  const personalVolume = tourPrice * personalSales;
  const directCommission = personalVolume * 0.10;

  // 2. Team Sales Volume & Leadership Bonus (3% on direct recruits)
  const networkVolume = tourPrice * recruitSales * recruits;
  const leadershipBonus = networkVolume * 0.03;

  // 3. Global Pool Shares (6% total: 2% per pool in multiples of targets)
  const totalVolume = personalVolume + networkVolume;
  const pool1Shares = Math.floor(totalVolume / 3000);
  const pool2Shares = Math.floor(totalVolume / 7000);
  const pool3Shares = Math.floor(totalVolume / 15000);

  // Estimated share values based on company average volume
  const pool1Value = 60;
  const pool2Value = 140;
  const pool3Value = 450;
  const globalBonus = (pool1Shares * pool1Value) + (pool2Shares * pool2Value) + (pool3Shares * pool3Value);

  // 4. Grand Total Monthly Estimated
  const totalEarnings = directCommission + leadershipBonus + globalBonus;

  useEffect(() => {
    if (loginParam) {
      router.replace(`/${locale}/affiliates`);
    }
  }, [loginParam, router, locale]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-stone-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-amber-500/30 selection:text-amber-900 dark:selection:text-amber-200 transition-colors duration-300">

      {/* ── HERO SECTION ──────────────── */}
      <header className="-mt-24 sm:-mt-28 pt-36 sm:pt-44 pb-20 sm:pb-24 relative overflow-hidden bg-gradient-to-b from-[#F5EFE6] via-[#FAF8F5] to-[#FAF8F5] dark:from-stone-950 dark:via-zinc-950 dark:to-stone-950 border-b border-amber-500/20 dark:border-amber-500/10">

        {/* Glow de iluminación metálica dorada */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-amber-500/10 dark:bg-amber-400/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-6">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-widest shadow-xs">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {isEs ? 'El Club de Embajadores High-Ticket' : 'High-Ticket Ambassador Club'}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight text-zinc-900 dark:text-white leading-tight">
            {isEs ? 'Monetiza tu influencia con' : 'Monetize your influence with'}{' '}
            <br />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 dark:from-amber-200 dark:via-yellow-400 dark:to-amber-500 drop-shadow-xs">
              Vermilion Routes
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal">
            {isEs
              ? 'Forma parte de la comunidad más exclusiva de la industria turística. Comparte tu código, regala un 10% de descuento automático a tus clientes en expediciones a medida y obtén un 10% de comisión directa en efectivo más participaciones en nuestro Fondo Global de utilidades.'
              : 'Be part of the most exclusive community in the bespoke travel industry. Share your code, gift a 10% automatic discount to your clients, and earn 10% direct cash commissions plus global profit pools.'}
          </p>

          {/* 2 Action Buttons in Hero */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href={`/${locale}/auth/affiliates?tab=register`}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] hover:from-[#E5C158] hover:to-[#B59049] text-stone-950 font-extrabold uppercase tracking-wider text-xs rounded-2xl transition-all duration-300 shadow-xl shadow-amber-900/30 hover:scale-[1.02] active:scale-95 cursor-pointer border-none"
            >
              <UserPlus className="w-4 h-4" />
              <span>{isEs ? 'Unirme a la Comunidad' : 'Join the Community'}</span>
            </Link>

            <Link
              href={`/${locale}/affiliates`}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/80 dark:bg-stone-900/80 hover:bg-stone-100 dark:hover:bg-stone-800 text-zinc-900 dark:text-white font-bold uppercase tracking-wider text-xs rounded-2xl border border-stone-300 dark:border-stone-800 transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer backdrop-blur-md"
            >
              <LogIn className="w-4 h-4" />
              <span>{isEs ? 'Ya soy Embajador' : 'Already an Ambassador'}</span>
            </Link>
          </div>

          {refParam && (
            <div className="pt-2">
              <span className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs rounded-lg font-mono">
                {isEs ? 'Patrocinado por:' : 'Sponsored by:'} <strong>@{refParam}</strong>
              </span>
            </div>
          )}

        </div>
      </header>

      {/* ── SECCIÓN 1: LOS 3 PILARES DEL PLAN DE COMPENSACIÓN ──────────────── */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-700 dark:text-amber-400">
            {isEs ? 'Máxima Rentabilidad' : 'Maximum Profitability'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-900 dark:text-white">
            {isEs ? 'Estructura de Ingresos Transparente' : 'Transparent Revenue Structure'}
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {isEs
              ? 'Tres fuentes de ingresos independientes calculadas en dólares estadounidenses y pagadas puntualmente.'
              : 'Three independent revenue streams calculated in USD and paid reliably.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pilar 1 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800/80 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 group-hover:scale-110 transition-transform">
              <Percent className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 mb-2">10% Directo</div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">
              {isEs ? 'Ventas Personales' : 'Personal Sales'}
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {isEs
                ? 'Gana el 10% neto sobre cada expedición o tour reservado con tu código. Con un ticket promedio de $5,000 USD, generas $500 USD por cada cliente.'
                : 'Earn 10% net on every tour booked with your code. With an average ticket of $5,000 USD, earn $500 USD per client.'}
            </p>
          </div>

          {/* Pilar 2 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800/80 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold font-mono text-teal-600 dark:text-teal-400 mb-2">3% Equipo</div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">
              {isEs ? 'Bono de Liderazgo' : 'Leadership Bonus'}
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {isEs
                ? 'Recomienda a otros creadores, agencias o embajadores. Recibe el 3% de todo el volumen de ventas generado por tu equipo directo.'
                : 'Refer other creators, agents or ambassadors. Receive 3% of all sales volume generated by your direct network.'}
            </p>
          </div>

          {/* Pilar 3 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800/80 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 mb-2">6% Global</div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">
              {isEs ? 'Fondos de Utilidades' : 'Global Profit Pools'}
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {isEs
                ? 'Participa en tres piscinas de ganancias globales (2% cada una) basadas en metas de volumen acumulado ($3k, $7k y $15k).'
                : 'Participate in three global profit pools (2% each) based on cumulative milestone targets ($3k, $7k, $15k).'}
            </p>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 2: SIMULADOR INTERACTIVO DE INGRESOS ──────────────── */}
      <section className="py-20 px-6 bg-[#F5EFE6]/50 dark:bg-stone-900/30 border-y border-stone-200 dark:border-stone-800/80">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-wider text-amber-700 dark:text-amber-400">
              <Calculator className="w-4 h-4" /> {isEs ? 'Calculadora en Tiempo Real' : 'Real-Time Calculator'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-900 dark:text-white">
              {isEs ? 'Simula tus Ganancias Mensuales' : 'Simulate Your Monthly Earnings'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white dark:bg-stone-900 p-8 sm:p-10 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl">
            {/* Sliders */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2 text-zinc-700 dark:text-zinc-300">
                  <span>{isEs ? 'Ticket Promedio del Tour:' : 'Average Tour Price:'}</span>
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">${tourPrice.toLocaleString()} USD</span>
                </div>
                <input
                  type="range"
                  min="1500"
                  max="12000"
                  step="500"
                  value={tourPrice}
                  onChange={(e) => setTourPrice(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-2 text-zinc-700 dark:text-zinc-300">
                  <span>{isEs ? 'Ventas Personales / Mes:' : 'Personal Sales / Month:'}</span>
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{personalSales} pax</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="1"
                  value={personalSales}
                  onChange={(e) => setPersonalSales(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-2 text-zinc-700 dark:text-zinc-300">
                  <span>{isEs ? 'Embajadores en tu Red:' : 'Ambassadors in Network:'}</span>
                  <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">{recruits} activos</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={recruits}
                  onChange={(e) => setRecruits(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-2 text-zinc-700 dark:text-zinc-300">
                  <span>{isEs ? 'Ventas promedio de cada embajador:' : 'Sales per referred ambassador:'}</span>
                  <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">{recruitSales} pax</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={recruitSales}
                  onChange={(e) => setRecruitSales(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Live Result Card */}
            <div className="md:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-stone-900 to-black text-white border border-amber-500/30 text-center space-y-4 shadow-xl">
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
                {isEs ? 'Estimación Mensual' : 'Monthly Estimate'}
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                ${Math.round(totalEarnings).toLocaleString()}
                <span className="text-xs text-amber-300/80 block font-sans font-normal mt-1">USD / mes</span>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-zinc-400 text-left">
                <div className="flex justify-between">
                  <span>{isEs ? 'Comisión Directa (10%):' : 'Direct (10%):'}</span>
                  <span className="font-mono text-white">${Math.round(directCommission).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isEs ? 'Bono Equipo (3%):' : 'Team (3%):'}</span>
                  <span className="font-mono text-white">${Math.round(leadershipBonus).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isEs ? 'Fondos Globales:' : 'Global Pools:'}</span>
                  <span className="font-mono text-white">${Math.round(globalBonus).toLocaleString()}</span>
                </div>
              </div>

              <Link
                href={`/${locale}/auth/affiliates?tab=register`}
                className="w-full block py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-extrabold uppercase text-xs tracking-wider transition-all"
              >
                {isEs ? 'Comenzar a Ganar' : 'Start Earning Now'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ──────────────── */}
      <footer className="py-16 text-center border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 dark:text-white">
            {isEs ? '¿Listo para monetizar tus contactos de viaje?' : 'Ready to Monetize Your Travel Network?'}
          </h2>
          <div className="flex justify-center gap-4">
            <Link
              href={`/${locale}/auth/affiliates?tab=register`}
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold uppercase tracking-wider text-xs rounded-xl shadow-lg transition-all"
            >
              {isEs ? 'Crear Cuenta Gratis' : 'Sign Up Free'}
            </Link>
            <Link
              href={`/${locale}/affiliates`}
              className="px-6 py-3.5 bg-zinc-800 hover:bg-zinc-700 border border-white/15 text-white font-bold uppercase tracking-wider text-xs rounded-xl transition-all"
            >
              {isEs ? 'Acceder' : 'Sign In'}
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
