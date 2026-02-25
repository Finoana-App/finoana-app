'use client';

import { useState } from 'react';

import { ApiError } from 'next/dist/server/api-utils';

import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

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

  const isLoading = followMutation.isPending || unfollowMutation.isPending;
  const mutation = isFollowing ? unfollowMutation : followMutation;

  const handleError = (error: ApiError, action: 'follow' | 'unfollow') => {
    setIsFollowing(!isFollowing);
    toast.error(error?.message || `Failed to ${action} user. Please try again.`, {
      position: 'top-center',
      duration: 5000,
    });
  };

  const handleToggle = () => {
    const action = isFollowing ? 'unfollow' : 'follow';
    const newState = !isFollowing;

    setIsFollowing(newState);
    mutation.mutate(userId, {
      onError: (error: ApiError) => handleError(error, action),
    });
  };

  const getButtonContent = () => {
    if (isLoading) return <Loader2 className="h-3 w-3 animate-spin" />;
    return isFollowing ? 'Unfollow' : 'Follow';
  };

  const buttonClasses = `h-8 cursor-pointer px-3 text-xs transition-all ${
    isFollowing
      ? 'text-muted-foreground hover:text-destructive'
      : 'border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground'
  }`;

  return (
    <Button
      variant={isFollowing ? 'ghost' : 'outline'}
      size="sm"
      onClick={handleToggle}
      disabled={isLoading}
      className={buttonClasses}
    >
      {getButtonContent()}
    </Button>
  );
}
