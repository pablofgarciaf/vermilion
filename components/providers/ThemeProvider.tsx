'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// Mute non-fatal script tag & firebase connection timeout warnings
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  const originalError = console.error;
  console.error = (...args) => {
    const errStr = typeof args[0] === 'string' ? args[0] : (args[0]?.message || String(args[0] || ''));
    if (
      errStr.includes('Encountered a script tag while rendering React component') ||
      errStr.includes('Could not reach Cloud Firestore backend') ||
      errStr.includes('@firebase/firestore') ||
      errStr.includes('fdprocessedid') ||
      errStr.includes('paypal_js_sdk') ||
      errStr.includes('paypal') ||
      errStr.includes('A tree hydrated but some attributes of the server rendered HTML didn\'t match')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
