'use client';

import * as React from 'react';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { Toaster } from '@workspace/ui/components/sonner';

import { AuthProvider } from '@/lib/firebase/auth-context';

import { QueryProvider } from './query-provider';

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <QueryProvider>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </QueryProvider>
    </NextThemesProvider>
  );
}
