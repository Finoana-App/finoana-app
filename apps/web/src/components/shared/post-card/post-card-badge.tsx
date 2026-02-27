'use client';

import { CheckCircle2 } from 'lucide-react';

import { Post } from '@workspace/types';
import { cn } from '@workspace/ui/lib/utils';

import { Dictionary } from '@/i18n/dictionaries/en';

type BadgeDictKey = keyof Dictionary['dashboard']['post']['badges'];

const BADGE_CONFIG: Record<
  Exclude<Post['postType'], undefined>,
  { bg: string; text: string; dictKey: BadgeDictKey }
> = {
  prayer_request: { bg: 'bg-muted', text: 'text-foreground', dictKey: 'prayerRequest' },
  devotion: { bg: 'bg-muted', text: 'text-foreground', dictKey: 'devotion' },
  testimony: { bg: 'bg-muted', text: 'text-foreground', dictKey: 'testimony' },
  general: { bg: 'bg-secondary', text: 'text-secondary-foreground', dictKey: 'general' },
};

const FALLBACK_LABELS: Record<BadgeDictKey, string> = {
  prayerRequest: 'Prayer Request',
  devotion: 'Devotion',
  testimony: 'Testimony',
  general: 'General',
  prayerAnswered: 'Prayer Answered',
};

interface PostCardBadgesProps {
  postType: Post['postType'];
  isPrayerAnswered: boolean;
  dictionary: Dictionary | null;
}

export function PostCardBadges({ postType, isPrayerAnswered, dictionary }: Readonly<PostCardBadgesProps>) {
  const config = (postType && BADGE_CONFIG[postType]) ?? BADGE_CONFIG.general;
  const badges = dictionary?.dashboard.post.badges;

  const categoryLabel = badges?.[config.dictKey] ?? FALLBACK_LABELS[config.dictKey];
  const prayerAnsweredLabel = badges?.prayerAnswered ?? FALLBACK_LABELS.prayerAnswered;

  return (
    <div className="mb-3 flex flex-wrap gap-2">
      <span
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
          config.bg,
          config.text
        )}
      >
        {categoryLabel}
      </span>
      {isPrayerAnswered && (
        <span className="text-foreground inline-flex items-center gap-1 rounded-full bg-green-700 px-3 py-1 text-xs font-medium">
          <CheckCircle2 className="h-3 w-3" />
          {prayerAnsweredLabel}
        </span>
      )}
    </div>
  );
}
