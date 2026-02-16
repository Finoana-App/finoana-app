'use client';

import { Banner } from '@/components/dashboard';

import { useCurrentUser } from '@/lib/hooks/use-user';

export default function ProfilePage() {
  const { data: currentUser, isLoading } = useCurrentUser();

  return (
    <section>
      <header className="bg-background/80 border-border sticky top-0 z-20 hidden items-center gap-4 border-b px-5 py-4 backdrop-blur-md lg:flex">
        <h1 className="text-xl font-semibold">Profile</h1>
        <span className="text-muted-foreground text-sm">0 posts</span>
      </header>
      <Banner currentUser={currentUser} isLoading={isLoading} />
    </section>
  );
}
