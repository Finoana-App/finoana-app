'use client';

import { EyeOff, User } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { cn } from '@workspace/ui/lib/utils';

interface AnonymousToggleProps {
  isAnonymous: boolean;
  displayName: string;
  onToggle: () => void;
}

export function AnonymousToggle({ isAnonymous, displayName, onToggle }: Readonly<AnonymousToggleProps>) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'mt-3 flex w-full cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2 text-left transition-all duration-200',
        isAnonymous
          ? 'border-primary bg-primary text-background dark:border-primary/30 dark:bg-foreground dark:text-background'
          : 'border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/60'
      )}
    >
      <div className="relative h-4 w-4 shrink-0">
        <AnimatePresence mode="wait">
          {isAnonymous ? (
            <motion.span
              key="anon"
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <EyeOff className="h-4 w-4" />
            </motion.span>
          ) : (
            <motion.span
              key="user"
              initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <User className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div className="min-w-0 flex-1">
        <AnimatePresence mode="wait">
          {isAnonymous ? (
            <motion.div
              key="anon-text"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <p className="text-xs leading-tight font-semibold">Posting anonymously</p>
              <p className="mt-0.5 text-[11px] leading-tight opacity-70">Your name won&apos;t be visible to others</p>
            </motion.div>
          ) : (
            <motion.div
              key="user-text"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <p className="text-xs leading-tight font-semibold">Posting as {displayName}</p>
              <p className="mt-0.5 text-[11px] leading-tight opacity-70">Tap to hide your identity</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div
        className={cn(
          'relative h-5 w-9 shrink-0 rounded-full border transition-colors duration-200',
          isAnonymous ? 'border-background bg-background/20' : 'border-border bg-secondary'
        )}
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          className={cn(
            'absolute top-0.5 h-3.5 w-3.5 rounded-full transition-colors duration-200',
            isAnonymous ? 'bg-background' : 'bg-muted-foreground/50'
          )}
          style={{ left: isAnonymous ? '18px' : '2px' }}
        />
      </div>
    </motion.button>
  );
}
