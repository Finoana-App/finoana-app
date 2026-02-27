'use client';

import { MoreHorizontal } from 'lucide-react';

import { Post } from '@workspace/types';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';

import { Dictionary } from '@/i18n/dictionaries/en';

interface PostCardHeaderProps {
  post: Post;
  dictionary: Dictionary | null;
  timeAgo: string;
}

export function PostCardHeader({ post, dictionary, timeAgo }: Readonly<PostCardHeaderProps>) {
  const authorName = post.isAnonymous
    ? dictionary?.dashboard.profile.anonymous
    : post.author?.displayName || dictionary?.dashboard.profile.unknownUser;
  const authorAvatar = post.isAnonymous ? undefined : post.author?.photoUrl;
  const authorHandle = post.isAnonymous
    ? dictionary?.dashboard.profile.anonymous
    : post.author?.username || dictionary?.dashboard.profile.unknown;

  return (
    <div className="flex gap-4">
      <Avatar
        className={cn(
          'h-12 w-12 transition-all',
          !post.isAnonymous && 'hover:ring-primary/20 cursor-pointer ring-2 ring-transparent'
        )}
      >
        <AvatarImage src={authorAvatar || undefined} alt={authorName} />
        <AvatarFallback className="bg-primary/10 text-primary">{authorName?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="mb-2 flex min-w-0 flex-1 items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-col">
            <span
              className={cn('text-foreground font-semibold', !post.isAnonymous && 'cursor-pointer hover:underline')}
            >
              {authorName}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">@{authorHandle?.toLowerCase()}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground text-sm">{timeAgo}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground -mr-2 h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
