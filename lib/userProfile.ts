/**
 * Client Profile Persistence & Cross-Form Autofill Manager
 * 
 * Synchronizes user data (name, email, phone) across all forms:
 * - Booking Wizard (/booking)
 * - Lead Capture / PDF Itinerary Download Modals
 * - Contact Form (/contact)
 * - Newsletter / Lead Magnet Banners
 * - Checkout / Payment Pages (/checkout/payment)
 * 
 * Stores data safely in browser localStorage and provides instant 
 * pre-filling on both mobile devices (iOS/Android) and desktop browsers.
 */

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  notes?: string;
  updatedAt?: number;
}

const STORAGE_KEY = 'vr_client_profile';

/**
 * Safely retrieve the client profile from localStorage
 */
export function getStoredUserProfile(): Partial<UserProfile> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed === 'object' && parsed !== null) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not read user profile from storage:', e);
  }
  return {};
}

/**
 * Save and merge updated fields into the stored profile
 */
export function saveStoredUserProfile(data: Partial<UserProfile>): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getStoredUserProfile();
    const updated: UserProfile = {
      name: data.name !== undefined ? data.name.trim() : (current.name || ''),
      email: data.email !== undefined ? data.email.trim().toLowerCase() : (current.email || ''),
      phone: data.phone !== undefined ? data.phone.trim() : (current.phone || ''),
      notes: data.notes !== undefined ? data.notes.trim() : (current.notes || ''),
      updatedAt: Date.now(),
    };
    
    // Only persist if at least name or email has some content
    if (updated.name || updated.email || updated.phone) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('vr_profile_updated', { detail: updated }));
    }
  } catch (e) {
    console.warn('Could not save user profile to storage:', e);
  }
}
