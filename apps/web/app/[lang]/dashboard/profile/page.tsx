'use client';

import { Banner } from '@/components/dashboard';

import { useDictionary } from '@/hooks/use-dictionary';

import { useCurrentUser } from '@/lib/hooks/use-user';

import { Dictionary } from '@/i18n/dictionaries/en';

export default function ProfilePage() {
  const { data: currentUser, isLoading } = useCurrentUser();
  const { dictionary } = useDictionary<Dictionary>();

  return (
    <section>
      <header className="bg-background/80 border-border sticky top-0 z-20 hidden items-center gap-4 border-b px-5 py-4 backdrop-blur-md lg:flex">
        <h1 className="text-xl font-semibold">{dictionary?.dashboard.profile.title}</h1>
        <span className="text-muted-foreground text-sm">0 posts</span>
      </header>
      <Banner dictionary={dictionary} user={currentUser} isLoading={isLoading} />
    </section>
  );
}
