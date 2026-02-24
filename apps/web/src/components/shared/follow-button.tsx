'use client';

import { useState } from 'react';

import { Loader2 } from 'lucide-react';

import { Button } from '@workspace/ui/components/button';

import { useFollowUser, useUnfollowUser } from '@/lib/hooks/use-follow';

interface FollowButtonProps {
  userId: string;
  initialIsFollowing?: boolean;
}

export function FollowButton({ userId, initialIsFollowing = false }: Readonly<FollowButtonProps>) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();

  const handleToggle = () => {
    if (isFollowing) {
      setIsFollowing(false);
      unfollowMutation.mutate(userId, {
        onError: () => setIsFollowing(true),
      });
    } else {
      setIsFollowing(true);
      followMutation.mutate(userId, {
        onError: () => setIsFollowing(false),
      });
    }
  };

  const isLoading = followMutation.isPending || unfollowMutation.isPending;

  let buttonContent;

  if (isLoading) {
    buttonContent = <Loader2 className="h-3 w-3 animate-spin" />;
  } else if (isFollowing) {
    buttonContent = 'Unfollow';
  } else {
    buttonContent = 'Follow';
  }

  return (
    <Button
      variant={isFollowing ? 'ghost' : 'outline'}
      size="sm"
      onClick={handleToggle}
      disabled={isLoading}
      className={`h-8 cursor-pointer px-3 text-xs transition-all ${
        isFollowing
          ? 'text-muted-foreground hover:text-destructive'
          : 'border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground'
      }`}
    >
      {buttonContent}
    </Button>
  );
}
