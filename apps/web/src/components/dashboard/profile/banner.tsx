import { Calendar } from 'lucide-react';

import { User } from '@workspace/types';

import { formatJoinDate } from '@/components/utils/date-format';

import { useFollowCounts } from '@/lib/hooks/use-follow';

import { Dictionary } from '@/i18n/dictionaries/en';

import { BannerSkeleton } from './banner-skeleton';
import { UserIdentity } from './user-identity';

interface BannerProps {
  user?: User;
  isLoading?: boolean;
  dictionary: Dictionary | null;
  onEditProfile?: () => void;
  onViewFollowers?: () => void;
  onViewFollowing?: () => void;
}

export function Banner({
  user,
  isLoading,
  dictionary,
  onEditProfile,
  onViewFollowers,
  onViewFollowing,
}: Readonly<BannerProps>) {
  const { data: counts } = useFollowCounts(user?.id);

  const formattedJoinDate = (() => {
    if (!user?.createdAt) return '...';
    return formatJoinDate(user.createdAt);
  })();

  if (isLoading) return <BannerSkeleton />;
  if (!user) return null;

  const followingCount = counts?.followingCount;
  const followersCount = counts?.followersCount;

  return (
    <section className="relative">
      <div className="from-primary/20 to-accent/30 h-32 bg-linear-to-br sm:h-40" />
      <div className="px-4 pb-4 sm:px-5">
        <div className="-mt-12 mb-4 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
          <UserIdentity user={user} dictionary={dictionary} onEditClick={onEditProfile} />
        </div>
        {user.bio && <p className="text-foreground mb-4 text-sm sm:text-base">{user.bio}</p>}
        <div className="text-muted-foreground mb-4 flex flex-wrap gap-4 text-sm">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {dictionary?.dashboard.profile.labels.joined} {formattedJoinDate}
          </span>
        </div>
        <div className="flex gap-4 text-sm">
          <button onClick={onViewFollowing} className="cursor-pointer transition-all hover:underline active:scale-95">
            <span className="text-foreground font-semibold">{followingCount}</span>{' '}
            <span className="text-muted-foreground">{dictionary?.dashboard.profile.labels.following.title}</span>
          </button>
          <button onClick={onViewFollowers} className="cursor-pointer transition-all hover:underline active:scale-95">
            <span className="text-foreground font-semibold">{followersCount}</span>{' '}
            <span className="text-muted-foreground">{dictionary?.dashboard.profile.labels.followers.title}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
