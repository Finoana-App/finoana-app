import { VerseOfTheDay } from '@workspace/types';

import { ProtectedRoute } from '@/components/auth';

import { AppSidebar, MobileHeader, RightSidebar } from '@/components/dashboard';

import { getVerseOfTheDay } from '@/lib/api/services/verse-of-the-day.service';

import { Locale } from '@/i18n';

export default async function DashboardLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: Locale }> }>) {
  const { lang } = await params;
  const verse = await getVerseOfTheDay(lang);

  return (
    <ProtectedRoute>
      <div className="bg-background flex min-h-screen w-full flex-col lg:flex-row">
        <MobileHeader />
        <div className="hidden shrink-0 lg:block lg:w-64 xl:w-72">
          <AppSidebar />
        </div>
        <main className="border-border min-w-0 flex-1 border-x pb-20 lg:pb-0">{children}</main>
        <div className="hidden shrink-0 overflow-visible xl:block xl:w-80">
          <RightSidebar verse={verse as VerseOfTheDay} />
        </div>
      </div>
    </ProtectedRoute>
  );
}
