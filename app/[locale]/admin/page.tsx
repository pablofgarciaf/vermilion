'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import { AdminCrmDashboard } from '@/components/crm/AdminCrmDashboard';

export default function AdminCrmPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
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
              isAuthorized = true;
            }
          } catch (err) {
            console.warn('[Admin CRM Auth Check]', err);
          }
        }

        const isMaster =
          cleanEmail === 'pablofgarciaf@gmail.com' ||
          cleanEmail === 'info@vermilionroutes.com' ||
          cleanEmail === (process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@vermilionroutes.com').toLowerCase().trim();

        if (isMaster) {
          isAuthorized = true;
        }

        if (isAuthorized) {
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(checkMasterSession());
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
