"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import { LanguageProvider } from "@/contexts/language-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <LanguageProvider>{children}</LanguageProvider>
    </NextThemesProvider>
  );
}
