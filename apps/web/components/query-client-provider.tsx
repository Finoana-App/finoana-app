'use client';

import { ReactNode, useState } from 'react';

import { QueryClient, QueryClientProvider as TanstackQueryClientProvider } from '@tanstack/react-query';

export function QueryClientProviderWrapper({ children }: Readonly<{ children: ReactNode }>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return <TanstackQueryClientProvider client={queryClient}>{children}</TanstackQueryClientProvider>;
}
