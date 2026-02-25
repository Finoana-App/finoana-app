'use client';

import { useState } from 'react';

import { Banner } from '@/components/dashboard';
import { EditProfileDialog } from '@/components/dashboard/profile/edit-profile-dialog';
import { FollowersListDialog } from '@/components/dashboard/profile/followers-list-dialog';
import { FollowingListDialog } from '@/components/dashboard/profile/following-list-dialog';

import { useDictionary } from '@/hooks/use-dictionary';

import { useCurrentUser } from '@/lib/hooks/use-user';

import { Dictionary } from '@/i18n/dictionaries/en';

export default function ProfilePage() {
  const [isEditOpen, setEditOpen] = useState(false);
  const [followersListOpen, setFollowersListOpen] = useState(false);
  const [followingListOpen, setFollowingListOpen] = useState(false);

  const { data: currentUser, isLoading } = useCurrentUser();

  const { dictionary } = useDictionary<Dictionary>();

  return (
    <section>
      <header className="bg-background/80 border-border sticky top-0 z-20 hidden items-center gap-4 border-b px-5 py-4 backdrop-blur-md lg:flex">
        <h1 className="text-xl font-semibold">{dictionary?.dashboard.profile.title}</h1>
        <span className="text-muted-foreground text-sm">0 posts</span>
      </header>
      <Banner
        dictionary={dictionary}
        user={currentUser}
        isLoading={isLoading}
        onEditProfile={() => setEditOpen(true)}
        onViewFollowers={() => setFollowersListOpen(true)}
        onViewFollowing={() => setFollowingListOpen(true)}
      />
      {currentUser && <EditProfileDialog open={isEditOpen} onOpenChange={setEditOpen} user={currentUser} />}
      {currentUser && (
        <FollowersListDialog open={followersListOpen} onOpenChange={setFollowersListOpen} user={currentUser} />
      )}
      {currentUser && (
        <FollowingListDialog open={followingListOpen} onOpenChange={setFollowingListOpen} user={currentUser} />
      )}
    </section>
  );
}
