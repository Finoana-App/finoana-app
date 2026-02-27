'use client';

import { CheckCircle2 } from 'lucide-react';

import { Post } from '@workspace/types';
import { cn } from '@workspace/ui/lib/utils';

const categoryStyles: Record<string, { bg: string; text: string; label: string }> = {
  prayer_request: { bg: 'bg-muted', text: 'text-foreground', label: 'Prayer Request' },
  devotion: { bg: 'bg-muted', text: 'text-foreground', label: 'Devotion' },
  testimony: { bg: 'bg-muted', text: 'text-foreground', label: 'Testimony' },
  general: { bg: 'bg-secondary', text: 'text-secondary-foreground', label: 'General' },
};

interface PostCardBadgesProps {
  postType: Post['postType'];
  isPrayerAnswered?: boolean;
}

export function PostCardBadges({ postType, isPrayerAnswered }: Readonly<PostCardBadgesProps>) {
  const style = categoryStyles[postType] ?? categoryStyles.general;

  return (
    <div className="mb-3 flex flex-wrap gap-2">
      <span
        className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', style?.bg, style?.text)}
      >
        {style?.label}
      </span>
      {isPrayerAnswered && (
        <span className="text-white inline-flex items-center gap-1 rounded-full bg-green-700 px-3 py-1 text-xs font-medium">
          <CheckCircle2 className="h-3 w-3" />
          Prayer Answered
        </span>
      )}
    </div>
  );
}
