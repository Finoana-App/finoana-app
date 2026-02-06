import { LeftSide } from '@/components/auth';

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-background flex h-screen items-center justify-center p-4 md:p-8">
      <div className="grid w-full max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <LeftSide />
        {children}
      </div>
    </div>
  );
}
