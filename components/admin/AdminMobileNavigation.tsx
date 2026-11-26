'use client';
import Image from 'next/image';
import { Users, Compass, Calendar, CheckCircle2, Clock, DollarSign, Send, Plus, Gift, Filter, Search, ShieldCheck, TrendingUp, UserPlus, ArrowUpRight, ChevronRight, AlertCircle, Eye, Phone, Mail, Award, Sparkles, Layers, FileCheck, MessageSquare, Network, Briefcase, Car, Hotel, CheckSquare, LogOut, MapPin, ChevronDown, Building, CreditCard, Percent, Sliders, Share2, Menu, X, Video, Trash2, Undo2 } from 'lucide-react';

type Props = Record<string, any>;
export function MobileCrmNavigation(props: Props) {
  const { mobileNavOpen, setMobileNavOpen, activeTab, setActiveTab, currentUser, userRole, activeRoleView, setActiveRoleView, tNav, handleLogout, tabLabels, canAccess, totalGMV, leads, bookings, users } = props;
  return <>
      <header className="flex md:hidden items-center justify-between px-4 py-3 bg-[#060D08] border-b border-emerald-950/80 sticky top-0 z-30 shadow-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-sm">
            <div className="w-full h-full bg-[#07130C] rounded-[10px] flex items-center justify-center">
              <Image
                src="/icon.png"
                alt="Vermilion"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
          </div>
          <div>
            <span className="font-serif text-xs font-bold text-white block leading-tight">
              VERMILION{" "}
              <span className="text-[#C9A84C] font-normal">ENTERPRISE</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-mono tracking-wider flex items-center gap-1">
              <span className="text-emerald-500">●</span> {tabLabels[activeTab]}
            </span>
          </div>
        </div>

        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 text-zinc-300 hover:text-white bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-900/60 rounded-xl transition-all cursor-pointer"
          aria-label="Abrir menú de navegación"
        >
          {mobileNavOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </header>

      {/* ── MOBILE DRAWER MODAL (< md) ──────────────────────────── */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-[#060D08]/98 backdrop-blur-2xl flex flex-col p-5 overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-emerald-950/80">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-sm">
                <div className="w-full h-full bg-[#07130C] rounded-[10px] flex items-center justify-center">
                  <Image
                    src="/icon.png"
                    alt="Vermilion"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
              </div>
              <div>
                <span className="font-serif text-sm font-bold text-white block">
                  VERMILION{" "}
                  <span className="text-[#C9A84C] font-normal">ENTERPRISE</span>
                </span>
                <span className="text-[9px] text-zinc-400 uppercase tracking-widest block font-mono">
                  Master Command CRM
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileNavOpen(false)}
              className="p-2 text-zinc-400 hover:text-white bg-white/5 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-5 space-y-1.5 flex-1">
            <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 px-3 block mb-2">
              Módulos Departamentales
            </span>

            {canAccess("overview") && (
              <button
                onClick={() => {
                  setActiveTab("overview");
                  setMobileNavOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "overview"
                    ? "bg-amber-500 text-black shadow-lg font-bold"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
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
                onClick={() => {
                  setActiveTab("analytics");
                  setMobileNavOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all border ${activeTab === "analytics" ? "bg-emerald-500 text-zinc-950 font-bold border-emerald-400" : "text-zinc-300 hover:bg-emerald-500/10 hover:text-emerald-300 border-transparent hover:border-emerald-500/20"}`}
              >
                <div className="flex items-center gap-3">
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
                onClick={() => {
                  setActiveTab("sales");
                  setMobileNavOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "sales"
                    ? "bg-amber-500 text-black shadow-lg font-bold"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4" />
                  <span>Ventas & Pipeline</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  {leads.length}
                </span>
              </button>
            )}

            {canAccess("operations") && (
              <button
                onClick={() => {
                  setActiveTab("operations");
                  setMobileNavOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "operations"
                    ? "bg-amber-500 text-black shadow-lg font-bold"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Compass className="w-4 h-4" />
                  <span>Operaciones & Run-Sheet</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-400 text-[10px] font-bold">
                  {bookings.filter((b) => b.status === "in_operation").length}{" "}
                  en ruta
                </span>
              </button>
            )}

            {canAccess("amenities") && (
              <button
                onClick={() => {
                  setActiveTab("amenities");
                  setMobileNavOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "amenities"
                    ? "bg-amber-500 text-black shadow-lg font-bold"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Gift className="w-4 h-4" />
                  <span>Amenities VIP Pakari</span>
                </div>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </button>
            )}

            {canAccess("finance") && (
              <button
                onClick={() => {
                  setActiveTab("finance");
                  setMobileNavOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "finance"
                    ? "bg-amber-500 text-black shadow-lg font-bold"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
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
                onClick={() => {
                  setActiveTab("genealogy");
                  setMobileNavOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "genealogy"
                    ? "bg-amber-500 text-black shadow-lg font-bold"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
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
                onClick={() => {
                  setActiveTab("concierge");
                  setMobileNavOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "concierge"
                    ? "bg-amber-500 text-black shadow-lg font-bold"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
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
                onClick={() => {
                  setActiveTab("team");
                  setMobileNavOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "team"
                    ? "bg-amber-500 text-black shadow-lg font-bold"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
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
                onClick={() => {
                  setActiveTab("tiktok");
                  setMobileNavOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all ${activeTab === "tiktok" ? "bg-emerald-500 text-zinc-950 font-bold" : "text-zinc-300 hover:bg-white/5 hover:text-white"}`}
              >
                <div className="flex items-center gap-3">
                  <Video className="w-4 h-4" />
                  <span>{tNav("tiktok")}</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </nav>

          <div className="pt-4 border-t border-emerald-950/80 space-y-2 mt-6">
            <button
              onClick={handleLogout}
              className="w-full py-2.5 px-3 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 text-xs text-rose-400 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}

      {/* ── 1. SIDEBAR DE NAVEGACIÓN DINÁMICO RBAC (DESKTOP) ──────────────────────────── */}

  </>;
}
