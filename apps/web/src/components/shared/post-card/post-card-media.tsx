'use client';

import Image from 'next/image';

import { AnimatePresence, motion } from 'motion/react';

import { cn } from '@workspace/ui/lib/utils';

interface PostCardMediaProps {
  mediaUrls: string[];
}

interface MediaItemProps {
  url: string;
  index: number;
  alt: string;
  className?: string;
}

function MediaItem({ url, index, alt, className }: Readonly<MediaItemProps>) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: 0.06 * index }}
      className={cn('group bg-muted relative overflow-hidden rounded-lg', className)}
    >
      <Image
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        src={url}
        alt={alt}
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </motion.div>
  );
}

const GRID_CONFIGS: Record<number, { containerClass: string; slots: string[] }> = {
  1: {
    containerClass: 'grid grid-cols-1',
    slots: ['aspect-video'],
  },
  2: {
    containerClass: 'grid grid-cols-2 gap-1',
    slots: ['aspect-square', 'aspect-square'],
  },
  3: {
    containerClass: 'grid grid-cols-2 gap-1',
    slots: ['aspect-square row-span-2', 'aspect-square', 'aspect-square'],
  },
  4: {
    containerClass: 'grid grid-cols-2 gap-1',
    slots: ['aspect-square', 'aspect-square', 'aspect-square', 'aspect-square'],
  },
};

export function PostCardMedia({ mediaUrls }: Readonly<PostCardMediaProps>) {
  if (!mediaUrls || mediaUrls.length === 0) return null;

  const visible = mediaUrls.slice(0, 4);
  const config = GRID_CONFIGS[visible.length] ?? GRID_CONFIGS[4];
  const overflow = mediaUrls.length - 4;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.1 }}
        className="mb-3 w-full max-w-lg overflow-hidden rounded-xl"
      >
        <div className={config?.containerClass}>
          {visible.map((url, index) => {
            const isLast = index === visible.length - 1 && overflow > 0;
            return (
              <div key={url} className={cn('relative', config?.slots[index])}>
                <MediaItem
                  url={url}
                  index={index}
                  alt={`Post image ${index + 1}`}
                  className="absolute inset-0 h-full w-full rounded-none"
                />
                {isLast && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-none bg-black/50 backdrop-blur-sm">
                    <span className="text-2xl font-bold text-white">+{overflow}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
