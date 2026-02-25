'use client';

import Link from 'next/link';

import { CalendarDays, Mail, UserPlus, Users } from 'lucide-react';

import { User } from '@workspace/types';
import { Tooltip } from '@workspace/ui/aceternity/tooltip-card';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Card } from '@workspace/ui/components/card';
import { Skeleton } from '@workspace/ui/components/skeleton';

import { FollowButton } from '@/components/shared';
import { formatJoinDate } from '@/components/utils/date-format';

import { useDictionary } from '@/hooks/use-dictionary';

import { useFollowCounts, useSuggestions } from '@/lib/hooks/use-follow';

import { Dictionary } from '@/i18n/dictionaries/en';

export function UserDetails({ user }: Readonly<{ user: User }>) {
  const { data: followCounts } = useFollowCounts(user.id);

  const formattedJoinDate = user?.createdAt ? formatJoinDate(user.createdAt) : null;

  return (
    <div className="w-64 space-y-3">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.photoUrl ?? undefined} />
          <AvatarFallback>{user.displayName?.charAt(0) || user.username?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{user.displayName || user.username}</p>
          <p className="text-muted-foreground truncate text-xs">@{user.username}</p>
        </div>
      </div>
      {user.bio && <p className="text-muted-foreground line-clamp-3 text-xs leading-relaxed">{user.bio}</p>}
      <div className="text-muted-foreground space-y-1 text-xs">
        {user.email && (
          <div className="flex items-center gap-2">
            <Mail size={14} />
            <span className="truncate">{user.email}</span>
          </div>
        )}
        {formattedJoinDate && (
          <div className="flex items-center gap-2">
            <CalendarDays size={14} />
            <span>Joined {formattedJoinDate}</span>
          </div>
        )}
      </div>
      <div className="flex gap-6 text-xs">
        <div className="flex items-center gap-1">
          <Users size={14} />
          <span className="font-semibold">{followCounts?.followersCount}</span>
          <span className="text-muted-foreground">Followers</span>
        </div>
        <div className="flex items-center gap-1">
          <UserPlus size={14} />
          <span className="font-semibold">{followCounts?.followingCount}</span>
          <span className="text-muted-foreground">Following</span>
        </div>
      </div>
    </div>
  );
}

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
    <Card className="shadow-soft overflow-visible p-4">
      <h3 className="mb-4 text-sm font-semibold">{dictionary?.dashboard.peopleToFollowTitle}</h3>
      <div className="space-y-4">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.photoUrl ?? undefined} alt={user.displayName ?? 'User avatar'} />
              <AvatarFallback>{user.displayName?.charAt(0) || user.username?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <Tooltip content={<UserDetails user={user} />}>
                <Link
                  href={`/dashboard/profile/${user.id}`}
                  className="cursor-pointer truncate text-sm font-medium hover:underline"
                >
                  {user.displayName}
                </Link>
              </Tooltip>
              <p className="text-muted-foreground truncate text-xs">@{user.username}</p>
            </div>
            <FollowButton userId={user.id} initialIsFollowing={false} />
          </div>
        ))}
      </div>
    </Card>
  );
}
