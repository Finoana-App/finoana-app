import { Metadata } from 'next';
import { Raleway } from 'next/font/google';

import '@workspace/ui/globals.css';

import { Providers } from '@/components/providers';

import { i18n, Locale } from '@/i18n';

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: 'Finoana',
  description: 'Finoana christian community web platform',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${raleway.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
