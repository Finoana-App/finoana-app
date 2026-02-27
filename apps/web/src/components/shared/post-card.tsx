'use client';

import { useState } from 'react';

import Image from 'next/image';

import { formatDistanceToNow } from 'date-fns';
import { Bookmark, CheckCircle2, Heart, HeartHandshake, MessageCircle, MoreHorizontal, Share2 } from 'lucide-react';

import { Post } from '@workspace/types';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';

interface PostCardProps {
  post: Post;
  index?: number;
}

const categoryStyles = {
  prayer_request: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-600 dark:text-blue-400',
    label: 'Prayer Request',
  },
  devotion: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-600 dark:text-purple-400',
    label: 'Devotion',
  },
  testimony: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-600 dark:text-green-400',
    label: 'Testimony',
  },
  general: {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-600 dark:text-gray-400',
    label: 'General',
  },
};

export function PostCard({ post, index = 0 }: Readonly<PostCardProps>) {
  const [likes, setLikes] = useState(post.likesCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const categoryStyle = categoryStyles[post.postType] || categoryStyles.general;
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const authorName = post.isAnonymous ? 'Anonymous' : post.author?.displayName || 'Unknown User';
  const authorAvatar = post.isAnonymous ? undefined : post.author?.photoUrl;
  const authorHandle = post.isAnonymous ? 'anonymous' : post.author?.username || 'unknown';

  return (
    <article
      className="border-border hover:bg-secondary/30 animate-fade-in cursor-pointer border-b p-5 transition-colors"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex gap-4">
        <Avatar
          className={cn(
            'h-12 w-12 transition-all',
            !post.isAnonymous && 'hover:ring-primary/20 cursor-pointer ring-2 ring-transparent'
          )}
        >
          <AvatarImage src={authorAvatar || undefined} alt={authorName} />
          <AvatarFallback className="bg-primary/10 text-primary">{authorName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-start justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  'text-foreground font-display font-semibold',
                  !post.isAnonymous && 'cursor-pointer hover:underline'
                )}
              >
                {authorName}
              </span>
              <span className="text-muted-foreground text-sm">@{authorHandle}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground text-sm">{timeAgo}</span>
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground -mr-2 h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div className="mb-3 flex flex-wrap gap-2">
            <span
              className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                categoryStyle.bg,
                categoryStyle.text
              )}
            >
              {categoryStyle.label}
            </span>
            {post.isPrayerAnswered && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                <CheckCircle2 className="h-3 w-3" />
                Prayer Answered
              </span>
            )}
          </div>
          <p className="text-foreground mb-3 font-sans leading-relaxed whitespace-pre-wrap">{post.content}</p>
          {post.mediaUrls && post.mediaUrls.length > 0 && (
            <div className="border-border mb-3 grid gap-2 overflow-hidden rounded-xl border">
              {post.mediaUrls.map((url) => (
                <Image
                  width={100}
                  height={100}
                  key={url}
                  src={url}
                  alt="Post content"
                  className="max-h-96 w-full object-cover"
                />
              ))}
            </div>
          )}
          <div className="mt-4 -ml-2 flex items-center justify-between">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-2">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{post.commentsCount}</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground gap-2 hover:text-blue-500">
              <HeartHandshake className="h-4 w-4" />
              <span className="text-sm">Amen</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                'gap-2 transition-all',
                isLiked ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'
              )}
            >
              <Heart className={cn('h-4 w-4', isLiked && 'fill-destructive')} />
              <span className="text-sm">{likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-2">
              <Share2 className="h-4 w-4" />
              <span className="text-sm">{post.sharesCount}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setIsBookmarked(!isBookmarked);
              }}
              className={cn('h-8 w-8', isBookmarked ? 'text-amber-500' : 'text-muted-foreground')}
            >
              <Bookmark className={cn('h-4 w-4', isBookmarked && 'fill-amber-500')} />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
