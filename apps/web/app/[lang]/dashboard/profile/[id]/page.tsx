'use client';

import { useState } from 'react';

import { usePathname } from 'next/navigation';

import { Banner } from '@/components/dashboard';
import { EditProfileDialog } from '@/components/dashboard/profile/edit-profile-dialog';

import { useDictionary } from '@/hooks/use-dictionary';

import { useGetUserById } from '@/lib/hooks/use-user';

import { Dictionary } from '@/i18n/dictionaries/en';

export default function ProfilePage() {
  const [isEditOpen, setEditOpen] = useState(false);

  const pathname = usePathname();
  const userId = pathname.split('/').pop();

  const { data: currentUser, isLoading } = useGetUserById(userId as string);

  const { dictionary } = useDictionary<Dictionary>();

  return (
    <section>
      <header className="bg-background/80 border-border sticky top-0 z-20 hidden items-center gap-4 border-b px-5 py-4 backdrop-blur-md lg:flex">
        <h1 className="text-xl font-semibold">{dictionary?.dashboard.profile.title}</h1>
      </header>
      <Banner
        dictionary={dictionary}
        user={currentUser}
        isLoading={isLoading}
        onEditProfile={() => setEditOpen(true)}
      />
      {currentUser && <EditProfileDialog open={isEditOpen} onOpenChange={setEditOpen} user={currentUser} />}
    </section>
  );
}
