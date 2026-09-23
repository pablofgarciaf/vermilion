'use client';

import Link from 'next/link';
import React from 'react';

interface BookingActionLinkProps {
  href: string;
  tourId: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}

export function BookingActionLink({
  href,
  tourId,
  className,
  ariaLabel,
  children,
}: BookingActionLinkProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('preselected_tour_id', tourId);
        localStorage.setItem('vermilion_selected_tour', tourId);
      } catch {
        // ignore storage errors
      }
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </Link>
  );
}
