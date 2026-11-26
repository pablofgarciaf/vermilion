"use client";

import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { Users, Sparkles, UserPlus } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useCrmData } from "@/hooks/useCrmData";
import { VisitorDataPanel } from "./VisitorDataPanel";
import { SystemUser, CrmLead, CrmBooking, UserRole, RunSheetDay, PassengerProfile, GenealogyNode, WhatsAppTemplate } from "@/types/crm";
import { CommercialPerformancePanel } from "@/components/admin/CommercialPerformancePanel";
import {
  AmenitiesTab,
  ConciergeTab,
  FinanceTab,
  GenealogyTab,
  OperationsTab,
  TeamTab,
} from "./OperationalTabs";
import { RunSheetModal } from './RunSheetModal';
import { QuickQuoteModal } from './QuickQuoteModal';
import { SalesPipelineTab } from './SalesPipelineTab';
import { MobileCrmNavigation } from './AdminMobileNavigation';
import { DesktopCrmNavigation } from './AdminDesktopNavigation';
import LeadDetailModal from './LeadDetailModal';
import { ExecutiveOverview } from './ExecutiveOverview';
import { PayoutModal } from './PayoutModal';
import { NewUserModal } from './NewUserModal';

export function EnterpriseDashboard() {
  const locale = useLocale();
  const tNav = useTranslations("adminNav");
  const tVisitors = useTranslations("crmVisitors");
  const isEs = locale === "es";
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const {
    users,
    leads,
    bookings,
    waTemplates,
    genealogy,
    updateLeadStatus,
    archiveLead,
    assignOperatorToBooking,
    signalTripCompleted,
    approveAndPayCommission,
    markPakariDelivered,
    updateRunSheetDayStatus,
    createSystemUser,
  } = useCrmData();

  // Current session & role
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>("super");
  const [activeRoleView, setActiveRoleView] = useState<UserRole>("super"); // Para simulación de vista
  const [authLoading, setAuthLoading] = useState(true);
  const confirmArchiveLead = (lead: CrmLead) => {
    if (
      window.confirm(
        `¿Archivar a ${lead.customerName}? Podrás recuperarlo desde Firestore; no se borra el historial.`,
      )
    ) {
      void archiveLead(lead.id);
    }
  };

  // Active Tab
  type CrmTab =
    | "overview"
    | "sales"
    | "analytics"
    | "operations"
    | "amenities"
    | "finance"
    | "genealogy"
    | "concierge"
    | "team"
    | "tiktok";
  const [activeTab, setActiveTab] = useState<CrmTab>(
    tabParam === "operations"
      ? "operations"
      : tabParam === "sales"
        ? "sales"
        : tabParam === "analytics"
          ? "analytics"
          : tabParam === "tiktok"
            ? "tiktok"
            : tabParam === "finance"
              ? "finance"
              : tabParam === "amenities"
                ? "amenities"
                : "overview",
  );
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  // Datos de visitantes (TikTok/Facebook con consentimiento): solo super y admin.
  const [showVisitors, setShowVisitors] = useState(false);
  const canSeeVisitors =
    activeRoleView === "super" || activeRoleView === "admin";

  const tabLabels: Record<CrmTab, string> = {
    overview: "Tablero Ejecutivo (BI)",
    sales: "Ventas & Pipeline",
    analytics: "Google Analytics 4",
    operations: "Operaciones & Run-Sheet",
    amenities: "Amenities VIP Pakari",
    finance: "Finanzas & Liquidaciones",
    genealogy: "Red MLM & Piscinas",
    concierge: "WhatsApp Concierge",
    team: "Equipo & Roles",
    tiktok: "TikTok",
  };

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("all");

  // Modals state
  const [selectedLeadForProfile, setSelectedLeadForProfile] =
    useState<CrmLead | null>(null);
  const [selectedBookingForRunSheet, setSelectedBookingForRunSheet] =
    useState<CrmBooking | null>(null);
  const [showQuoterModal, setShowQuoterModal] = useState(false);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [payoutModalTarget, setPayoutModalTarget] = useState<{
    booking: CrmBooking;
    type: "affiliate" | "operator";
  } | null>(null);
  const [payoutReference, setPayoutReference] = useState("");
  const [payoutMethod, setPayoutMethod] = useState("Banco Pichincha");

  // New User Form State
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<UserRole>("operator");
  const [newUserPhone, setNewUserPhone] = useState("");
  const [newUserCedula, setNewUserCedula] = useState("");

  // Quotation Generator State
  const [quoteTour, setQuoteTour] = useState("Galapagos Luxury Island Hopping");
  const [quotePax, setQuotePax] = useState(2);
  const [quoteTier, setQuoteTier] = useState<"comfort" | "premium" | "luxury">(
    "premium",
  );
  const [quotePrivateFlight, setQuotePrivateFlight] = useState(false);
  const [quoteDiscount, setQuoteDiscount] = useState(10); // 10% embajador

  // Base Prices for Quoter
  const quoteBasePrice =
    quoteTier === "comfort" ? 3800 : quoteTier === "premium" ? 5900 : 8900;
  const flightAddon = quotePrivateFlight ? 1200 * quotePax : 0;
  const quoteSubtotal = quoteBasePrice * quotePax + flightAddon;
  const quoteDiscountAmount = (quoteSubtotal * quoteDiscount) / 100;
  const quoteTotal = quoteSubtotal - quoteDiscountAmount;
  const quoteAffiliateCommission = quoteTotal * 0.1;
  const quoteOperatorFee = 350 * quotePax;
  const quoteDirectCost =
    quoteBasePrice * 0.55 * quotePax +
    (quotePrivateFlight ? 900 * quotePax : 0);
  const quoteNetProfit =
    quoteTotal - quoteDirectCost - quoteAffiliateCommission - quoteOperatorFee;
  const quoteMarginPercent = Math.round((quoteNetProfit / quoteTotal) * 100);

  // Authentication & Role fetching
  useEffect(() => {
    if (!auth) {
      setAuthLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && firebaseUser.email) {
        setCurrentUser(firebaseUser);
        const cleanEmail = firebaseUser.email.toLowerCase().trim();
        if (db) {
          try {
            const snap = await getDoc(doc(db, "usuarios", cleanEmail));
            if (snap.exists()) {
              const r = snap.data()?.role as UserRole;
              if (r) {
                setUserRole(r);
                setActiveRoleView(r);
              }
            }
          } catch (e) {
            console.warn("[Admin Dashboard] Role check notice:", e);
          }
        }
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (auth) await signOut(auth).catch(() => {});
    router.replace(`/${locale}`);
  };

  // RBAC Permission Logic for Sidebar Items
  const canAccess = (tab: CrmTab): boolean => {
    const role = activeRoleView;
    if (role === "super" || role === "admin") return true;
    if (role === "sales") return tab === "sales" || tab === "concierge";
    if (role === "operator") return tab === "operations" || tab === "amenities";
    if (role === "financial") return tab === "finance";
    if (role === "concierge") return tab === "amenities" || tab === "concierge";
    return false;
  };

  // Submit New User
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserEmail || !newUserName) return;
    try {
      await createSystemUser({
        id: newUserEmail.toLowerCase().trim(),
        email: newUserEmail.toLowerCase().trim(),
        name: newUserName,
        role: newUserRole,
        roles:
          newUserRole === "super"
            ? ["super", "admin", "operator", "editor"]
            : [newUserRole],
        phone: newUserPhone,
        cedula: newUserCedula,
        isActive: true,
      });
      setShowNewUserModal(false);
      setNewUserName("");
      setNewUserEmail("");
      setNewUserPhone("");
      setNewUserCedula("");
    } catch (err) {
      console.error(err);
    }
  };

  // Submit Payout
  const handleProcessPayout = async () => {
    if (!payoutModalTarget || !payoutReference) return;
    await approveAndPayCommission(
      payoutModalTarget.booking.id,
      payoutModalTarget.type,
      payoutReference,
    );
    setPayoutModalTarget(null);
    setPayoutReference("");
  };

  // Financial Summary Aggregations
  const totalGMV = bookings.reduce(
    (acc, b) => acc + (b.totalAmount || b.paidAmount || 0),
    0,
  );
  const totalCollected = bookings.reduce(
    (acc, b) => acc + (b.paidAmount || b.totalAmount || 0),
    0,
  );
  const totalCosts = bookings.reduce(
    (acc, b) =>
      acc + (b.directCosts || (b.totalAmount || b.paidAmount || 0) * 0.58),
    0,
  );
  const totalAffiliateCommissions = bookings.reduce(
    (acc, b) => acc + (b.affiliateCommissionAmount || 0),
    0,
  );
  const totalOperatorCommissions = bookings.reduce(
    (acc, b) => acc + (b.operatorCommissionAmount || 0),
    0,
  );
  const netOperatingProfit =
    totalGMV -
    totalCosts -
    totalAffiliateCommissions -
    totalOperatorCommissions;
  const avgMargin = Math.round((netOperatingProfit / (totalGMV || 1)) * 100);

  return (
    <div className="min-h-screen bg-[#07110B] text-zinc-100 flex flex-col md:flex-row">
      {/* ── MOBILE TOP BAR (< md) ──────────────────────────── */}
      <MobileCrmNavigation
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        userRole={userRole}
        activeRoleView={activeRoleView}
        setActiveRoleView={setActiveRoleView}
        tNav={tNav}
        handleLogout={handleLogout}
        tabLabels={tabLabels}
        canAccess={canAccess}
        totalGMV={totalGMV}
        leads={leads}
        bookings={bookings}
        users={users}
      />
      <DesktopCrmNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        userRole={userRole}
        activeRoleView={activeRoleView}
        setActiveRoleView={setActiveRoleView}
        tNav={tNav}
        handleLogout={handleLogout}
        canAccess={canAccess}
        totalGMV={totalGMV}
        leads={leads}
        bookings={bookings}
        users={users}
      />
      <main className="flex-1 px-6 md:px-8 pb-6 md:pb-8 pt-0 overflow-y-auto max-h-screen relative">
        {/* Top Navbar in Viewport */}
        <header
          className="sticky top-0 z-[60] -mx-6 md:-mx-8 px-6 md:px-8 pt-5 pb-4 mb-6 border-b border-emerald-950/60 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
          style={{ backgroundColor: "#07110B" }}
        >
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
              {activeTab === "overview" &&
                "Tablero Ejecutivo & Inteligencia de Negocio"}
              {activeTab === "sales" &&
                "Pipeline Comercial & Fichas de Pasajeros"}
              {activeTab === "analytics" &&
                "Google Analytics 4, Audiencia y Conversión"}
              {activeTab === "operations" &&
                "Control Operativo en Ruta & Run-Sheets"}
              {activeTab === "amenities" &&
                "Pakari Experience & Amenidades de Lujo"}
              {activeTab === "finance" &&
                "Tesorería, P&L & Dispersión de Comisiones"}
              {activeTab === "genealogy" && "Supervisión de Red de Embajadores"}
              {activeTab === "concierge" &&
                "Concierge Omnicanal & WhatsApp VIP"}
              {activeTab === "team" &&
                "Directorio de Personal & Gestión de Roles"}
              {activeTab === "tiktok" && "TikTok: Contenido y Borradores"}
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Vermilion Routes Luxury Expeditions · Ecosistema Empresarial
              Unificado
            </p>
          </div>

          <div className="flex items-center gap-3">
            {canSeeVisitors && (
              <button
                type="button"
                onClick={() => setShowVisitors((open) => !open)}
                aria-expanded={showVisitors}
                className="px-4 py-2.5 rounded-xl border border-emerald-900/60 bg-emerald-950/50 text-emerald-200 font-bold uppercase tracking-wider text-xs flex items-center gap-2 hover:bg-emerald-900/60 transition-all cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>{tVisitors("openButton")}</span>
              </button>
            )}
            {activeTab === "sales" && (
              <button
                onClick={() => setShowQuoterModal(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-extrabold uppercase tracking-wider text-xs flex items-center gap-2 shadow-lg shadow-amber-950/50 hover:scale-105 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Cotizador Rápido VIP</span>
              </button>
            )}

            {activeTab === "team" && (
              <button
                onClick={() => setShowNewUserModal(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold uppercase tracking-wider text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Nuevo Colaborador</span>
              </button>
            )}
          </div>
        </header>

        {canSeeVisitors && showVisitors && (
          <div className="mb-6">
            <VisitorDataPanel onClose={() => setShowVisitors(false)} />
          </div>
        )}

        {activeTab === "overview" && (
          <ExecutiveOverview
            bookings={bookings}
            genealogy={genealogy}
            totalGMV={totalGMV}
            totalCollected={totalCollected}
            netOperatingProfit={netOperatingProfit}
            avgMargin={avgMargin}
            onOpenOperations={() => setActiveTab("operations")}
          />
        )}
        {activeTab === "sales" && (
          <SalesPipelineTab
            leads={leads}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            destinationFilter={destinationFilter}
            onDestinationFilterChange={setDestinationFilter}
            onOpenLead={setSelectedLeadForProfile}
            onArchiveLead={confirmArchiveLead}
            onStatusChange={updateLeadStatus}
            onOpenOperations={() => setActiveTab("operations")}
          />
        )}
        {activeTab === "analytics" && (
          <CommercialPerformancePanel locale={locale} embedded />
        )}

        {activeTab === "tiktok" && (
          <iframe
            title="Administración de TikTok"
            src={`/${locale}/admin/tiktok`}
            className="h-[calc(100vh-150px)] w-full rounded-3xl border border-emerald-900/50 bg-[#07110B]"
          />
        )}

        {activeTab === "operations" && (
          <OperationsTab
            bookings={bookings}
            onOpenRunSheet={setSelectedBookingForRunSheet}
            onSignalCompleted={(booking) =>
              signalTripCompleted(
                booking.id,
                booking.assignedOperatorName || "Operador",
              )
            }
          />
        )}
        {activeTab === "amenities" && (
          <AmenitiesTab
            bookings={bookings}
            onDelivered={(booking) =>
              markPakariDelivered(
                booking.id,
                booking.assignedOperatorName || "Operador",
              )
            }
          />
        )}
        {activeTab === "finance" && (
          <FinanceTab bookings={bookings} onPayout={setPayoutModalTarget} />
        )}
        {activeTab === "genealogy" && <GenealogyTab genealogy={genealogy} />}
        {activeTab === "concierge" && <ConciergeTab templates={waTemplates} />}
        {activeTab === "team" && <TeamTab users={users} />}
      </main>

      <QuickQuoteModal
        open={showQuoterModal}
        onClose={() => setShowQuoterModal(false)}
        tour={quoteTour}
        onTourChange={setQuoteTour}
        pax={quotePax}
        onPaxChange={setQuotePax}
        tier={quoteTier}
        onTierChange={setQuoteTier}
        privateFlight={quotePrivateFlight}
        onPrivateFlightChange={setQuotePrivateFlight}
        subtotal={quoteSubtotal}
        discountAmount={quoteDiscountAmount}
        total={quoteTotal}
        affiliateCommission={quoteAffiliateCommission}
        operatorFee={quoteOperatorFee}
        netProfit={quoteNetProfit}
        marginPercent={quoteMarginPercent}
      />
      <LeadDetailModal
        lead={selectedLeadForProfile}
        onClose={() => setSelectedLeadForProfile(null)}
      />

      <RunSheetModal
        booking={selectedBookingForRunSheet}
        onClose={() => setSelectedBookingForRunSheet(null)}
        onStatusChange={updateRunSheetDayStatus}
      />
      <PayoutModal target={payoutModalTarget} payoutMethod={payoutMethod} payoutReference={payoutReference} onMethodChange={setPayoutMethod} onReferenceChange={setPayoutReference} onClose={() => setPayoutModalTarget(null)} onProcess={handleProcessPayout} />
      <NewUserModal open={showNewUserModal} onClose={() => setShowNewUserModal(false)} onSubmit={handleCreateUser} name={newUserName} email={newUserEmail} role={newUserRole} phone={newUserPhone} cedula={newUserCedula} setName={setNewUserName} setEmail={setNewUserEmail} setRole={setNewUserRole} setPhone={setNewUserPhone} setCedula={setNewUserCedula} />    </div>
  );
}
