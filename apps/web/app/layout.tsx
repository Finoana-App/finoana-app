import { Metadata } from 'next';
import { Raleway } from 'next/font/google';

import '@workspace/ui/globals.css';

import { Providers } from '@/components/providers';

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Finoana',
  description: 'Finoana christian community web platform',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${raleway.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
