'use client';

import { useState } from 'react';

import { formatDistanceToNow } from 'date-fns';

import { Post } from '@workspace/types';

import { PostCardHeader } from './post-card-header';
import { PostCardActions } from './post-card-actions';
import { PostCardBadges } from './post-card-badge';
import { PostCardContent } from './post-card-content';
import { PostCardMedia } from './post-card-media';

interface PostCardProps {
  post: Post;
  index?: number;
}

export function usePostCardState(post: Post) {
  const [likes, setLikes] = useState(post.likesCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked((prev) => !prev);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  return {
    likes,
    isLiked,
    isExpanded,
    handleLike,
    handleToggleExpand,
  };
}

export function PostCard({ post, index = 0 }: Readonly<PostCardProps>) {
  const { likes, isLiked, isExpanded, handleLike, handleToggleExpand } =
    usePostCardState(post);

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  return (
    <article
      className="border-border hover:bg-secondary/30 animate-fade-in cursor-pointer border-b p-5 transition-colors"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex flex-col gap-4">
        <PostCardHeader post={post} timeAgo={timeAgo} />
        <div className="min-w-0 flex-1">
          <PostCardBadges postType={post.postType} isPrayerAnswered={post.isPrayerAnswered || false} />
          <PostCardContent content={post.content} isExpanded={isExpanded} onToggleExpand={handleToggleExpand} />
          {post.mediaUrls && <PostCardMedia mediaUrls={post.mediaUrls} />}
          <PostCardActions
            commentsCount={post.commentsCount}
            sharesCount={post.sharesCount}
            likes={likes}
            isLiked={isLiked}
            onLike={handleLike}
          />
        </div>
      </div>
    </article>
  );
}
