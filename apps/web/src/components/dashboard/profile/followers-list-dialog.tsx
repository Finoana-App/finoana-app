import { useEffect, useId, useRef } from 'react';

import { MoreHorizontal, UserMinus } from 'lucide-react';

import { User } from '@workspace/types';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@workspace/ui/components/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { Skeleton } from '@workspace/ui/components/skeleton';

import { useFollowUserList, useRemoveFollower } from '@/lib/hooks/use-follow';

interface FollowersListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
}

function UserSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-2 w-1/3" />
      </div>
      <Skeleton className="h-8 w-16 rounded-md" />
    </div>
  );
}

function UserItem({ user: item }: Readonly<{ user: User }>) {
  const { mutate: removeFollower } = useRemoveFollower();

  const avatarFallback = (item.displayName || item.username)?.charAt(0);

  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10 border">
        <AvatarImage src={item.photoUrl ?? undefined} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="mb-1 truncate text-sm leading-none font-semibold">{item.displayName}</p>
        <p className="text-muted-foreground truncate text-xs">@{item.username}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground h-8 w-8 cursor-pointer"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem
            onClick={() => removeFollower(item.id)}
            className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer transition-all"
          >
            <UserMinus className="mr-2 h-4 w-4" />
            <span>Remove follower</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function LoadingSkeletons({ count = 5 }: { count?: number }) {
  const id = useId();
  return Array.from({ length: count }).map((_, i) => <UserSkeleton key={`${id}-${i}`} />);
}

export function FollowersListDialog({ open, onOpenChange, user }: Readonly<FollowersListDialogProps>) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFollowUserList(user?.id, 'followers');

  const observerTarget = useRef<HTMLDivElement>(null);
  const users = data?.pages.flatMap((page) => page.followers ?? []) ?? [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeletons />;
    }

    if (users.length === 0) {
      return <p className="text-muted-foreground py-8 text-center text-sm">No users found.</p>;
    }

    return (
      <>
        {users.map((item) => (
          <UserItem key={item.id} user={item as User} />
        ))}
        <div ref={observerTarget} className="min-h-5 w-full">
          {isFetchingNextPage && (
            <div className="flex flex-col gap-4 pt-4">
              <LoadingSkeletons count={2} />
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-125 flex-col overflow-hidden p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Followers</DialogTitle>
          <DialogDescription>Users who follow you</DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="flex flex-col gap-4">{renderContent()}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
