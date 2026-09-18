'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import { AdminCrmDashboard } from '@/components/crm/AdminCrmDashboard';

import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export default function AdminCrmPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [unauthorizedEmail, setUnauthorizedEmail] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkMasterSession = () => {
      if (typeof window === 'undefined') return null;
      const isMaster = localStorage.getItem('vermilion_admin_session') === 'true';
      if (isMaster) {
        return {
          email: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@vermilionroutes.com',
          uid: 'master-admin-session',
          displayName: 'Master Administrator'
        } as User;
      }
      return null;
    };

    const masterUser = checkMasterSession();
    if (masterUser) {
      setCurrentUser(masterUser);
      setAuthLoading(false);
    }

    if (!auth) {
      setAuthLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        const cleanEmail = user.email.toLowerCase().trim();
        let isAuthorized = false;

        if (db) {
          try {
            const uSnap = await getDoc(doc(db, 'usuarios', cleanEmail));
            if (uSnap.exists()) {
              const uData = uSnap.data();
              if (uData && uData.isActive !== false) {
                isAuthorized = true;
              }
            }
          } catch (err) {
            console.warn('[Admin CRM Auth Check]', err);
          }
        }

        const isMaster =
          cleanEmail === (process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@vermilionroutes.com').toLowerCase().trim();

        if (isMaster) {
          isAuthorized = true;
        }

        if (isAuthorized) {
          setCurrentUser(user);
          setUnauthorizedEmail(null);
        } else {
          setCurrentUser(null);
          setUnauthorizedEmail(user.email);
        }
      } else {
        const m = checkMasterSession();
        setCurrentUser(m);
        setUnauthorizedEmail(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#07110B] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-zinc-400 font-mono">Verifying Enterprise CRM credentials...</p>
        </div>
      </div>
    );
  }

  if (unauthorizedEmail) {
    return (
      <div className="min-h-screen bg-[#07110B] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#0B1A12] border border-amber-500/30 text-center space-y-5 shadow-2xl">
          <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-xl font-bold text-white">Acceso Restringido al CRM Corporativo</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            La cuenta <strong className="text-amber-300">{unauthorizedEmail}</strong> no pertenece a la colección de usuarios corporativos internos.
          </p>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-zinc-300 text-left space-y-1.5">
            <p className="font-semibold text-white">¿Eres Embajador / Afiliado?</p>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Los embajadores y afiliados gestionan sus comisiones, enlaces de referidos y retiros desde el Portal de Afiliados.
            </p>
          </div>
          <div className="space-y-2 pt-2">
            <Link
              href="/affiliates"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black text-xs font-extrabold uppercase tracking-wider block hover:brightness-105 transition-all shadow-md text-center"
            >
              Ir a mi Portal de Afiliados →
            </Link>
            <button
              onClick={() => {
                if (auth) signOut(auth);
                localStorage.removeItem('vermilion_admin_session');
                setUnauthorizedEmail(null);
                setCurrentUser(null);
              }}
              className="w-full py-2 px-4 rounded-xl bg-white/5 text-zinc-400 hover:text-white text-xs transition-colors cursor-pointer"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentUser) {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#07110B] flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <AdminCrmDashboard />
      </Suspense>
    );
  }

  return <AdminLoginForm />;
}
