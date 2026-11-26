'use client';
import Image from 'next/image';
import type { UserRole } from '@/types/crm';
import { Users, Compass, Calendar, CheckCircle2, Clock, DollarSign, Send, Plus, Gift, Filter, Search, ShieldCheck, TrendingUp, UserPlus, ArrowUpRight, ChevronRight, AlertCircle, Eye, Phone, Mail, Award, Sparkles, Layers, FileCheck, MessageSquare, Network, Briefcase, Car, Hotel, CheckSquare, LogOut, MapPin, ChevronDown, Building, CreditCard, Percent, Sliders, Share2, Menu, X, Video, Trash2, Undo2 } from 'lucide-react';

type Props = Record<string, any>;
export function DesktopCrmNavigation(props: Props) {
  const { activeTab, setActiveTab, currentUser, userRole, activeRoleView, setActiveRoleView, tNav, handleLogout, canAccess, totalGMV, leads, bookings, users } = props;
  return <>
      <aside className="hidden md:flex md:w-72 h-screen overflow-hidden bg-[#060D08] border-r border-emerald-950/60 p-5 flex-col shrink-0 shadow-2xl z-20">
        <div className="flex flex-col flex-1 min-h-0 space-y-6">
          {/* Brand Header */}
          <div className="flex items-center gap-3 pb-5 border-b border-emerald-950/80">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg shadow-amber-500/10">
              <div className="w-full h-full bg-[#07130C] rounded-[14px] flex items-center justify-center">
                <Image
                  src="/icon.png"
                  alt="Vermilion"
                  width={26}
                  height={26}
                  className="object-contain"
                />
              </div>
            </div>
            <div>
              <span className="font-serif text-sm font-bold tracking-tight text-white block">
                VERMILION{" "}
                <span className="text-[#C9A84C] font-normal">ENTERPRISE</span>
              </span>
              <span className="text-[9px] text-zinc-400 uppercase tracking-widest block font-mono">
                Master Command CRM
              </span>
            </div>
          </div>

          <div className="-mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 px-1 text-[11px]">
            <span className="font-medium text-zinc-300 truncate max-w-[170px]">
              {currentUser?.email || "pablofgarciaf@gmail.com"}
            </span>
            <span
              className={`rounded-md border px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${
                userRole === "super"
                  ? "border-amber-500/30 bg-amber-500/20 text-amber-400"
                  : userRole === "admin"
                    ? "border-emerald-500/30 bg-emerald-500/20 text-emerald-400"
                    : userRole === "operator"
                      ? "border-teal-500/30 bg-teal-500/20 text-teal-400"
                      : "border-blue-500/30 bg-blue-500/20 text-blue-400"
              }`}
            >
              {userRole}
            </span>
            {userRole === "super" && (
              <select
                value={activeRoleView}
                onChange={(e) => setActiveRoleView(e.target.value as UserRole)}
                className="w-full rounded-md border border-emerald-800/50 bg-[#0B1A12] px-2 py-1 text-[10px] text-zinc-200 focus:border-amber-500 focus:outline-none"
                aria-label="Simular vista de rol"
              >
                <option value="super">Vista: Super Admin</option>
                <option value="admin">Vista: Admin Operativo</option>
                <option value="operator">Vista: Operador / Guía</option>
                <option value="sales">Vista: Comercial / Ventas</option>
                <option value="financial">Vista: Finanzas</option>
                <option value="concierge">Vista: Concierge</option>
              </select>
            )}
          </div>

          {/* Navigation Links (Filtered by RBAC) */}
          <nav className="space-y-1 flex-1 min-h-0 overflow-y-auto pr-1">
            <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 px-3 block mb-2">
              Módulos Departamentales
            </span>

            {canAccess("overview") && (
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "overview"
                    ? "bg-amber-500 text-black shadow-lg font-bold"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>Tablero Ejecutivo (BI)</span>
                </div>
                <span className="text-[10px] font-mono opacity-80">
                  ${Math.round(totalGMV / 1000)}k
                </span>
              </button>
            )}

            {(activeRoleView === "super" || activeRoleView === "admin") && (
              <button
                onClick={() => setActiveTab("analytics")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${activeTab === "analytics" ? "bg-emerald-500 text-zinc-950 font-bold border-emerald-400" : "text-zinc-300 hover:bg-emerald-500/10 hover:text-emerald-300 border-transparent hover:border-emerald-500/20"}`}
              >
                <div className="flex items-center gap-2.5">
                  <TrendingUp
                    className={`w-4 h-4 ${activeTab === "analytics" ? "text-zinc-950" : "text-emerald-400"}`}
                  />
                  <span>Analytics & B2C</span>
                </div>
                <span
                  className={`text-[9px] font-mono uppercase tracking-wider ${activeTab === "analytics" ? "text-zinc-800" : "text-emerald-400"}`}
                >
                  GA4
                </span>
              </button>
            )}

            {canAccess("sales") && (
              <button
                onClick={() => setActiveTab("sales")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "sales"
                    ? "bg-amber-500 text-black shadow-lg font-bold"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4" />
                  <span>Ventas & Pipeline</span>
                </div>
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  {leads.length}
                </span>
              </button>
            )}

            {canAccess("operations") && (
              <button
                onClick={() => setActiveTab("operations")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "operations"
                    ? "bg-amber-500 text-black shadow-lg font-bold"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4" />
                  <span>Operaciones & Run-Sheet</span>
                </div>
                <span className="px-1.5 py-0.5 rounded-full bg-teal-500/20 text-teal-400 text-[10px] font-bold">
                  {bookings.filter((b) => b.status === "in_operation").length}{" "}
                  en ruta
                </span>
              </button>
            )}

            {canAccess("amenities") && (
              <button
                onClick={() => setActiveTab("amenities")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "amenities"
                    ? "bg-amber-500 text-black shadow-lg font-bold"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Gift className="w-4 h-4" />
                  <span>Amenities VIP Pakari</span>
                </div>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </button>
            )}

            {canAccess("finance") && (
              <button
                onClick={() => setActiveTab("finance")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "finance"
                    ? "bg-amber-500 text-black shadow-lg font-bold"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <DollarSign className="w-4 h-4" />
                  <span>Finanzas & Liquidaciones</span>
                </div>
                {bookings.some(
                  (b) => b.affiliateCommissionStatus === "ready_for_review",
                ) && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                )}
              </button>
            )}

            {canAccess("genealogy") && (
              <button
                onClick={() => setActiveTab("genealogy")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "genealogy"
                    ? "bg-amber-500 text-black shadow-lg font-bold"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Network className="w-4 h-4" />
                  <span>Red MLM & Piscinas</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">
                  10-3-2
                </span>
              </button>
            )}

            {canAccess("concierge") && (
              <button
                onClick={() => setActiveTab("concierge")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "concierge"
                    ? "bg-amber-500 text-black shadow-lg font-bold"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Concierge</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold font-mono">
                  1-Clic
                </span>
              </button>
            )}

            {canAccess("team") && (
              <button
                onClick={() => setActiveTab("team")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "team"
                    ? "bg-amber-500 text-black shadow-lg font-bold"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4" />
                  <span>Equipo & Roles</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">
                  {users.length}
                </span>
              </button>
            )}

            {(activeRoleView === "super" || activeRoleView === "admin") && (
              <button
                onClick={() => setActiveTab("tiktok")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeTab === "tiktok" ? "bg-emerald-500 text-zinc-950 font-bold" : "text-zinc-300 hover:bg-white/5 hover:text-white"}`}
              >
                <div className="flex items-center gap-2.5">
                  <Video className="w-4 h-4" />
                  <span>{tNav("tiktok")}</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="shrink-0 pt-4 border-t border-emerald-950/80 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 rounded-xl bg-rose-950/30 hover:bg-rose-900/40 text-xs text-rose-400 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* ── 2. ÁREA DE TRABAJO PRINCIPAL (MAIN VIEWPORT) ───────────────────── */}

  </>;
}
