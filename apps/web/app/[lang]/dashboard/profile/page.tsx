'use client';

import { useState } from 'react';

import { AnimatePresence, motion } from 'motion/react';

import { Banner } from '@/components/dashboard';
import { EditProfileDialog } from '@/components/dashboard/profile/edit-profile-dialog';
import { FollowersListDialog } from '@/components/dashboard/profile/followers-list-dialog';
import { FollowingListDialog } from '@/components/dashboard/profile/following-list-dialog';
import { ProfileTabs } from '@/components/dashboard/profile/profile-tabs';
import { PostCard } from '@/components/shared';

import { useDictionary } from '@/hooks/use-dictionary';

import { useGetUserPosts } from '@/lib/hooks/use-post';
import { useCurrentUser } from '@/lib/hooks/use-user';

import { Dictionary } from '@/i18n/dictionaries/en';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('All');
  const [isEditOpen, setEditOpen] = useState(false);
  const [followersListOpen, setFollowersListOpen] = useState(false);
  const [followingListOpen, setFollowingListOpen] = useState(false);

  const { data: currentUser, isLoading } = useCurrentUser();

  const { data: postsData, isLoading: postsLoading } = useGetUserPosts(currentUser?.id);

  const { dictionary } = useDictionary<Dictionary>();

  let content;
  const rawPostList = postsData?.responseObject?.posts ?? [];

  const filteredPosts = rawPostList.filter((post) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Prayers') return post.postType === 'prayer_request';
    if (activeTab === 'Testimonies') return post.postType === 'testimony';
    return false;
  });

  if (postsLoading) {
    content = <div className="text-muted-foreground py-12 text-center">Loading posts...</div>;
  } else if (filteredPosts.length > 0) {
    content = filteredPosts.map((post, index) => <PostCard key={post.id} post={post} index={index} />);
  } else {
    content = (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No {activeTab.toLowerCase()} yet</p>
      </div>
    );
  }

  return (
    <section>
      <header className="bg-background/80 border-border sticky top-0 z-20 hidden items-center gap-4 border-b px-5 py-4 backdrop-blur-md lg:flex">
        <h1 className="text-xl font-semibold">{dictionary?.dashboard.profile.badge}</h1>
      </header>
      <Banner
        dictionary={dictionary}
        user={currentUser}
        isLoading={isLoading}
        onEditProfile={() => setEditOpen(true)}
        onViewFollowers={() => setFollowersListOpen(true)}
        onViewFollowing={() => setFollowingListOpen(true)}
      />
      <ProfileTabs active={activeTab} onChange={setActiveTab} />
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="divide-border divide-y"
          >
            {content}
          </motion.div>
        </AnimatePresence>
      </div>
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
