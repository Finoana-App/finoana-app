'use client';

import { Heart, MessageCircle, Share2 } from 'lucide-react';

import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';

import { Dictionary } from '@/i18n/dictionaries/en';

interface PostCardActionsProps {
  commentsCount: number;
  sharesCount: number;
  likes: number;
  isLiked: boolean;
  dictionary: Dictionary | null;
  onLike: (e: React.MouseEvent) => void;
}

export function PostCardActions({
  commentsCount,
  sharesCount,
  likes,
  isLiked,
  dictionary,
  onLike,
}: Readonly<PostCardActionsProps>) {
  return (
    <div className="mt-4 -ml-2 flex items-center justify-between">
      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary cursor-pointer gap-2">
        <MessageCircle className="h-4 w-4" />
        <span className="text-sm">
          {commentsCount} {dictionary?.dashboard.post.actions.comment}
        </span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onLike}
        className={cn(
          'cursor-pointer gap-2 transition-all',
          isLiked ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'
        )}
      >
        <Heart className={cn('h-4 w-4', isLiked && 'fill-destructive')} />
        <span className="text-sm">
          {likes} {dictionary?.dashboard.post.actions.like}
        </span>
      </Button>
      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary cursor-pointer gap-2">
        <Share2 className="h-4 w-4" />
        <span className="text-sm">
          {sharesCount} {dictionary?.dashboard.post.actions.share}
        </span>
      </Button>
    </div>
  );
}
