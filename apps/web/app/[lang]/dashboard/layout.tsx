import { ProtectedRoute } from '@/components/auth';

import { MobileHeader } from '@/components/dashboard';

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ProtectedRoute>
      <div className="bg-background flex min-h-screen w-full flex-col lg:flex-row">
        <MobileHeader />
        <main className="border-border min-w-0 flex-1 border-x pb-20 lg:pb-0">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
