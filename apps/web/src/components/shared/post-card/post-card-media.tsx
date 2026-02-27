'use client';

import Image from 'next/image';

import { AnimatePresence, motion } from 'motion/react';

import { cn } from '@workspace/ui/lib/utils';

interface PostCardMediaProps {
  mediaUrls: string[];
}

export function PostCardMedia({ mediaUrls }: Readonly<PostCardMediaProps>) {
  if (!mediaUrls || mediaUrls.length === 0) return null;

  return (
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
            mediaUrls.length === 1 && 'grid-cols-1',
            mediaUrls.length === 2 && 'grid-cols-2',
            mediaUrls.length >= 3 && 'grid-cols-4 grid-rows-2'
          )}
        >
          {mediaUrls.slice(0, 4).map((url, index) => {
            const isLarge = index === 0 && mediaUrls.length >= 3;

            return (
              <motion.div
                key={url}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className={cn(
                  'overflow-hidden rounded-lg',
                  isLarge ? 'col-span-4 row-span-1 h-60' : 'col-span-2 h-32',
                  mediaUrls.length === 1 && 'col-span-1 h-auto',
                  mediaUrls.length === 2 && 'col-span-1 h-48'
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
  );
}
