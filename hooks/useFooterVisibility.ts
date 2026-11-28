'use client';

import { useEffect, useState } from 'react';

/** Keeps floating actions in sync as the footer enters the viewport. */
export function useFooterVisibility() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return isFooterVisible;
}
