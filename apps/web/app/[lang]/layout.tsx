import { notFound } from 'next/navigation';

import { i18n, Locale } from '@/i18n';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  if (!i18n.locales.includes(lang)) {
    notFound();
  }

  return (
    <div lang={lang} className="min-h-screen">
      {children}
    </div>
  );
}
