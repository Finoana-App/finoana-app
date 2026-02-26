'use client';

import { usePathname } from 'next/navigation';

import { Banner } from '@/components/dashboard';

import { useDictionary } from '@/hooks/use-dictionary';

import { useCurrentUser, useGetUserById } from '@/lib/hooks/use-user';

import { Dictionary } from '@/i18n/dictionaries/en';

export default function ProfilePage() {
  const pathname = usePathname();
  const userId = pathname.split('/').pop();

  const { data: currentUser } = useCurrentUser();

  const { data: user, isLoading } = useGetUserById(userId as string);

  const { dictionary } = useDictionary<Dictionary>();

  return (
    <section>
      <header className="bg-background/80 border-border sticky top-0 z-20 hidden items-center gap-4 border-b px-5 py-4 backdrop-blur-md lg:flex">
        <h1 className="text-xl font-semibold">{dictionary?.dashboard.profile.badge}</h1>
      </header>
      <Banner dictionary={dictionary} user={user} isLoading={isLoading} isCurrentUser={currentUser?.id === user?.id} />
    </section>
  );
}
