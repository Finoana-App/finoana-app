'use client';

import { Calendar, Settings } from 'lucide-react';

import { User } from '@workspace/types';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Skeleton } from '@workspace/ui/components/skeleton';

import { formatJoinDate } from '@/components/utils/date-format';

export function Banner({ currentUser, isLoading }: Readonly<{ currentUser: User | undefined; isLoading: boolean }>) {
  console.log(currentUser);
  if (isLoading) {
    return (
      <div className="relative">
        <div className="from-primary/20 to-accent/30 h-32 bg-linear-to-br sm:h-40" />
        <div className="px-4 pb-4 sm:px-5">
          <div className="-mt-12 mb-4 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
            <Skeleton className="border-background ring-primary/20 h-24 w-24 rounded-full border-4 ring-4 sm:h-32 sm:w-32" />
            <Skeleton className="h-9 w-32 self-start rounded-md sm:self-auto" />
          </div>
          <div className="mb-4 space-y-2">
            <Skeleton className="h-7 w-56 rounded" />
            <Skeleton className="h-5 w-64 rounded" />
          </div>
          <Skeleton className="mb-4 h-5 w-3/4 rounded" />
          <div className="flex gap-4">
            <Skeleton className="h-5 w-44 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="from-primary/20 to-accent/30 h-32 bg-linear-to-br sm:h-40" />
      <div className="px-4 pb-4 sm:px-5">
        <div className="-mt-12 mb-4 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
          <Avatar className="border-background ring-primary/20 h-24 w-24 border-4 ring-4 sm:h-32 sm:w-32">
            <AvatarImage src={currentUser?.photoUrl ?? undefined} alt={currentUser?.displayName ?? ''} />
            <AvatarFallback className="bg-primary/10 text-primary text-2xl sm:text-3xl">
              {currentUser?.displayName?.charAt(0) || '?'}
            </AvatarFallback>
          </Avatar>
          <Button variant="outline" className="gap-2 self-start sm:self-auto">
            <Settings className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold sm:text-2xl">{currentUser?.displayName || 'Anonymous User'}</h2>
          <p className="text-muted-foreground text-sm sm:text-base">@{currentUser?.username.split(' ').join('')}</p>
        </div>
        {currentUser?.bio && <p className="text-foreground mb-4 text-sm sm:text-base">{currentUser.bio}</p>}
        <div className="text-muted-foreground mb-4 flex flex-wrap gap-4 text-sm">
          {currentUser?.createdAt && (
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Joined {formatJoinDate(currentUser.createdAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
