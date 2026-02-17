import { User } from '@workspace/types';

import { Dictionary } from '@/i18n/dictionaries/en';

import { BannerHeader } from './banner-header';
import { BannerSkeleton } from './banner-skeleton';
import { UserIdentity } from './user-identity';
import { UserMeta } from './user-meta';

interface BannerProps {
  user?: User;
  isLoading?: boolean;
  dictionary: Dictionary | null;
}

export function Banner({ user, isLoading, dictionary }: Readonly<BannerProps>) {
  if (isLoading) return <BannerSkeleton />;
  if (!user) return null;

  return (
    <section className="relative">
      <BannerHeader />
      <div className="px-4 pb-4 sm:px-5">
        <div className="-mt-12 mb-4 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
          <UserIdentity user={user} dictionary={dictionary} />
        </div>
        {user.bio && <p className="text-foreground mb-4 text-sm sm:text-base">{user.bio}</p>}
        <UserMeta user={user} dictionary={dictionary} />
      </div>
    </section>
  );
}
