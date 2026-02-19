import { Calendar } from 'lucide-react';

import { User } from '@workspace/types';

import { formatJoinDate } from '@/components/utils/date-format';

import { Dictionary } from '@/i18n/dictionaries/en';

import { BannerSkeleton } from './banner-skeleton';
import { UserIdentity } from './user-identity';

interface BannerProps {
  user?: User;
  isLoading?: boolean;
  dictionary: Dictionary | null;
  onEditProfile?: () => void;
}

export function Banner({ user, isLoading, dictionary, onEditProfile }: Readonly<BannerProps>) {
  const formattedJoinDate = (() => {
    if (!user?.createdAt) return '...';
    return formatJoinDate(user.createdAt);
  })();

  if (isLoading) return <BannerSkeleton />;
  if (!user) return null;

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
            {dictionary?.dashboard.profile.joined} {formattedJoinDate}
          </span>
        </div>
      </div>
    </section>
  );
}
