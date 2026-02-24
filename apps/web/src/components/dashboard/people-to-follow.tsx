'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Card } from '@workspace/ui/components/card';
import { Skeleton } from '@workspace/ui/components/skeleton';

import { FollowButton } from '@/components/shared';

import { useDictionary } from '@/hooks/use-dictionary';

import { useSuggestions } from '@/lib/hooks/use-follow';

import { Dictionary } from '@/i18n/dictionaries/en';

export function PeopleToFollow() {
  const { dictionary } = useDictionary<Dictionary>();

  const { data: users, isLoading, isError } = useSuggestions('comprehensive');

  if (isLoading) {
    return (
      <Card className="shadow-soft p-4">
        <h3 className="mb-4 text-sm font-semibold">{dictionary?.dashboard.peopleToFollowTitle}</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2 w-16" />
              </div>
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (isError || !users || users.length === 0) return null;

  const suggestedUsers = users.slice(0, 3);

  return (
    <Card className="shadow-soft p-4">
      <h3 className="mb-4 text-sm font-semibold">{dictionary?.dashboard.peopleToFollowTitle}</h3>
      <div className="space-y-4">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.photoUrl ?? undefined} alt={user.displayName ?? 'User avatar'} />
              <AvatarFallback>{user.displayName?.charAt(0) || user.username?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user.displayName}</p>
              <p className="text-muted-foreground truncate text-xs">@{user.username}</p>
            </div>
            <FollowButton userId={user.id} initialIsFollowing={false} />
          </div>
        ))}
      </div>
    </Card>
  );
}
