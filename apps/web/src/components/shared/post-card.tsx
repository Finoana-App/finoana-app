'use client';

import { useState } from 'react';

import Image from 'next/image';

import { formatDistanceToNow } from 'date-fns';
import { Bookmark, CheckCircle2, Heart, HeartHandshake, MessageCircle, MoreHorizontal, Share2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

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
    bg: 'bg-muted',
    text: 'text-foreground',
    label: 'Prayer Request',
  },
  devotion: {
    bg: 'bg-muted',
    text: 'text-foreground',
    label: 'Devotion',
  },
  testimony: {
    bg: 'bg-muted',
    text: 'text-foreground',
    label: 'Testimony',
  },
  general: {
    bg: 'bg-secondary',
    text: 'text-secondary-foreground',
    label: 'General',
  },
};

export function PostCard({ post, index = 0 }: Readonly<PostCardProps>) {
  const [likes, setLikes] = useState(post.likesCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const categoryStyle = categoryStyles[post.postType] || categoryStyles.general;
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  const CHARACTER_LIMIT = 250;
  const isTooLong = post.content.length > CHARACTER_LIMIT;
  const displayedContent = isExpanded ? post.content : `${post.content.slice(0, CHARACTER_LIMIT)}...`;

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
                className={cn('text-foreground font-semibold', !post.isAnonymous && 'cursor-pointer hover:underline')}
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
              <span className="text-foreground inline-flex items-center gap-1 rounded-full bg-green-700 px-3 py-1 text-xs font-medium">
                <CheckCircle2 className="h-3 w-3" />
                Prayer Answered
              </span>
            )}
          </div>
          <p className="text-foreground mb-3 leading-relaxed whitespace-pre-wrap">{displayedContent}</p>
          {isTooLong && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="text-primary mt-1 cursor-pointer text-sm font-semibold hover:underline"
            >
              {isExpanded ? 'See less' : 'See more'}
            </button>
          )}
          {post.mediaUrls && post.mediaUrls.length > 0 && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="border-border bg-muted mb-3 max-w-2xl overflow-hidden rounded-xl border p-2"
              >
                <div
                  className={cn(
                    'grid gap-2',
                    post.mediaUrls.length === 1 && 'grid-cols-1',
                    post.mediaUrls.length === 2 && 'grid-cols-2',
                    post.mediaUrls.length >= 3 && 'grid-cols-4 grid-rows-2'
                  )}
                >
                  {post.mediaUrls.slice(0, 4).map((url, index) => {
                    const isLarge = index === 0 && post.mediaUrls.length >= 3;
                    return (
                      <motion.div
                        key={url}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        className={cn(
                          'overflow-hidden rounded-lg',
                          isLarge ? 'col-span-4 row-span-1 h-60' : 'col-span-2 h-32',
                          post.mediaUrls.length === 1 && 'col-span-1 h-auto',
                          post.mediaUrls.length === 2 && 'col-span-1 h-48'
                        )}
                      >
                        <Image
                          width={800}
                          height={800}
                          src={url}
                          alt={`Post image ${index + 1}`}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
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
