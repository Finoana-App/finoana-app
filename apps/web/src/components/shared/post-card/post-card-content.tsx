'use client';

import { Dictionary } from '@/i18n/dictionaries/en';

const CHARACTER_LIMIT = 250;

interface PostCardContentProps {
  content: string;
  isExpanded: boolean;
  dictionary: Dictionary | null;
  onToggleExpand: (e: React.MouseEvent) => void;
}

export function PostCardContent({ content, isExpanded, dictionary, onToggleExpand }: Readonly<PostCardContentProps>) {
  const isTooLong = content.length > CHARACTER_LIMIT;
  const displayedContent = isTooLong && !isExpanded ? `${content.slice(0, CHARACTER_LIMIT)}...` : content;

  const seeLessLabel = dictionary?.common.seeLess ?? 'See less';
  const seeMoreLabel = dictionary?.common.seeMore ?? 'See more';

  return (
    <>
      <p className="text-foreground mb-3 text-sm leading-relaxed whitespace-pre-wrap">{displayedContent}</p>
      {isTooLong && (
        <button
          onClick={onToggleExpand}
          className="text-primary mt-1 cursor-pointer text-sm font-semibold hover:underline"
        >
          {isExpanded ? seeLessLabel : seeMoreLabel}
        </button>
      )}
    </>
  );
}
