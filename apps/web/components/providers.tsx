'use client';

import * as React from 'react';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { QueryClientProviderWrapper } from './query-client-provider';

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
    </NextThemesProvider>
  );
}
