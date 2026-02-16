import { ProtectedRoute } from '@/components/auth';

import { AppSidebar, MobileHeader, RightSidebar } from '@/components/dashboard';

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ProtectedRoute>
      <div className="bg-background flex min-h-screen w-full flex-col lg:flex-row">
        <MobileHeader />
        <div className="hidden shrink-0 lg:block lg:w-64 xl:w-72">
          <AppSidebar />
        </div>
        <main className="border-border min-w-0 flex-1 border-x pb-20 lg:pb-0">{children}</main>
        <div className="hidden shrink-0 xl:block xl:w-80">
          <RightSidebar />
        </div>
      </div>
    </ProtectedRoute>
  );
}
