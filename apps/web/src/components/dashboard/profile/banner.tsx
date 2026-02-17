import { User } from '@workspace/types';

import { BannerHeader } from './banner-header';
import { BannerSkeleton } from './banner-skeleton';
import { UserIdentity } from './user-identity';
import { UserMeta } from './user-meta';

interface BannerProps {
  user?: User;
  isLoading?: boolean;
}

export function Banner({ user, isLoading }: Readonly<BannerProps>) {
  if (isLoading) return <BannerSkeleton />;
  if (!user) return null;

  return (
    <section className="relative">
      <BannerHeader />
      <div className="px-4 pb-4 sm:px-5">
        <div className="-mt-12 mb-4 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
          <UserIdentity user={user} />
        </div>
        {user.bio && <p className="text-foreground mb-4 text-sm sm:text-base">{user.bio}</p>}
        <UserMeta user={user} />
      </div>
    </section>
  );
}
