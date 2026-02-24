'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { Skeleton } from '@workspace/ui/components/skeleton';

import { useDictionary } from '@/hooks/use-dictionary';

import { useFollowUser, useSuggestions } from '@/lib/hooks/use-follow';

import { Dictionary } from '@/i18n/dictionaries/en';

export function PeopleToFollow() {
  const { dictionary } = useDictionary<Dictionary>();

  const { data: users, isLoading, isError } = useSuggestions('comprehensive');

  const { mutate: follow } = useFollowUser();

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
              <AvatarImage src={user.photoUrl ?? undefined} alt={user.displayName} />
              <AvatarFallback>{user.displayName?.charAt(0) || user.username?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user.displayName}</p>
              <p className="text-muted-foreground truncate text-xs">@{user.username}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={false}
              onClick={() => follow(user.id)}
              className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground h-8 px-3 text-xs"
            >
              {dictionary?.common.follow}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
