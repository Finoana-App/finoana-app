'use client';

const CHARACTER_LIMIT = 250;

interface PostCardContentProps {
  content: string;
  isExpanded: boolean;
  onToggleExpand: (e: React.MouseEvent) => void;
}

export function PostCardContent({ content, isExpanded, onToggleExpand }: Readonly<PostCardContentProps>) {
  const isTooLong = content.length > CHARACTER_LIMIT;
  const displayedContent = isTooLong && !isExpanded ? `${content.slice(0, CHARACTER_LIMIT)}...` : content;

  return (
    <>
      <p className="text-foreground mb-3 leading-relaxed whitespace-pre-wrap">{displayedContent}</p>

      {isTooLong && (
        <button
          onClick={onToggleExpand}
          className="text-primary mt-1 cursor-pointer text-sm font-semibold hover:underline"
        >
          {isExpanded ? 'See less' : 'See more'}
        </button>
      )}
    </>
  );
}
