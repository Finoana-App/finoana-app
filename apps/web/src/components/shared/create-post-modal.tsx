'use client';

import { useCallback, useRef } from 'react';

import Image from 'next/image';

import { EyeOff, Image as ImageIcon, Loader2, Send, User } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { PostType } from '@workspace/types';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@workspace/ui/components/dialog';
import { Textarea } from '@workspace/ui/components/textarea';
import { cn } from '@workspace/ui/lib/utils';

import { MAX_IMAGES, useCreatePostForm } from '@/hooks/use-create-post-form';

import { useCurrentUser } from '@/lib/hooks/use-user';

import { Dictionary } from '@/i18n/dictionaries/en';

const POST_CATEGORIES: ReadonlyArray<{
  value: PostType;
  label: string;
  color: string;
}> = [
  {
    value: PostType.PRAYER_REQUEST,
    label: 'Prayer',
    color: 'bg-prayer/10 text-prayer border-prayer/30 hover:bg-prayer/20',
  },
  {
    value: PostType.DEVOTION,
    label: 'Devotional',
    color: 'bg-devotional/10 text-devotional border-devotional/30 hover:bg-devotional/20',
  },
  {
    value: PostType.TESTIMONY,
    label: 'Testimony',
    color: 'bg-testimony/10 text-testimony border-testimony/30 hover:bg-testimony/20',
  },
  {
    value: PostType.GENERAL,
    label: 'General',
    color: 'bg-reflection/10 text-reflection border-reflection/30 hover:bg-reflection/20',
  },
] as const;

const ACCEPTED_IMAGE_TYPES = 'image/jpeg,image/png,image/webp,image/gif';

interface CategorySelectorProps {
  label: string;
  selected: PostType;
  onSelect: (value: PostType) => void;
}

interface PostToolbarProps {
  cancelLabel: string;
  shareLabel: string;
  isSubmitDisabled: boolean;
  isPending: boolean;
  fileCount: number;
  onFilesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

interface CreatePostModalProps {
  open: boolean;
  dictionary: Dictionary | null;
  onOpenChange: (open: boolean) => void;
}

interface AnonymousToggleProps {
  isAnonymous: boolean;
  displayName: string;
  onToggle: () => void;
}

function CategorySelector({ label, selected, onSelect }: Readonly<CategorySelectorProps>) {
  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
      <p className="text-muted-foreground mb-2 text-xs font-bold">{label}</p>
      <div className="flex flex-wrap gap-2">
        {POST_CATEGORIES.map((category) => (
          <motion.button
            key={category.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(category.value)}
            className={cn(
              'cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition-all',
              selected === category.value
                ? cn(category.color, 'ring-offset-background ring-primary/20 ring-1 ring-offset-1')
                : 'bg-secondary/50 text-muted-foreground hover:bg-secondary border-transparent'
            )}
          >
            {category.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function AnonymousToggle({ isAnonymous, displayName, onToggle }: Readonly<AnonymousToggleProps>) {
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

function PostToolbar({
  cancelLabel,
  shareLabel,
  isSubmitDisabled,
  isPending,
  fileCount,
  onFilesChange,
  onCancel,
  onSubmit,
}: Readonly<PostToolbarProps>) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canAddMore = fileCount < MAX_IMAGES;

  return (
    <div className="border-border/50 mt-6 flex items-center justify-between border-t pt-4">
      <div className="flex gap-1">
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES}
          multiple
          className="hidden"
          onChange={onFilesChange}
          disabled={!canAddMore}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Add image"
          disabled={!canAddMore}
          onClick={() => fileInputRef.current?.click()}
          className="text-primary hover:bg-primary/10 relative h-9 w-9"
        >
          <ImageIcon className="h-4 w-4" />
          {fileCount > 0 && (
            <span className="bg-primary text-primary-foreground absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold">
              {fileCount}
            </span>
          )}
        </Button>
      </div>

      <div className="flex gap-2">
        <Button variant="ghost" onClick={onCancel} className="cursor-pointer font-medium">
          {cancelLabel}
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isSubmitDisabled}
          className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer gap-2 font-medium"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {shareLabel}
        </Button>
      </div>
    </div>
  );
}

export function CreatePostModal({ open, dictionary, onOpenChange }: Readonly<CreatePostModalProps>) {
  const { data: currentUser } = useCurrentUser();

  const handleClose = useCallback(() => onOpenChange(false), [onOpenChange]);

  const {
    content,
    category,
    files,
    isAnonymous,
    isPending,
    setContent,
    setCategory,
    toggleAnonymous,
    handleClose: handleFormClose,
    handleFilesChange,
    handleRemoveFile,
    handleSubmit,
  } = useCreatePostForm(handleClose);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-150">
        <DialogHeader className="border-border border-b p-4">
          <DialogTitle className="font-display text-lg">{dictionary?.dashboard.post.createPost}</DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="p-4"
        >
          <div className="flex gap-4">
            <motion.div
              animate={{ opacity: isAnonymous ? 0.35 : 1, scale: isAnonymous ? 0.92 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <Avatar className="ring-primary/10 h-12 w-12 ring-2">
                <AvatarImage src={currentUser?.photoUrl ?? undefined} alt={currentUser?.displayName} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {currentUser?.displayName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <div className="flex-1">
              <Textarea
                placeholder="Share a prayer, thought, or testimony..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="placeholder:text-muted-foreground min-h-30 resize-none border-0 px-2 text-base focus-visible:ring-0"
                autoFocus
              />
              {files.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {files.map((file, index) => (
                    <div key={`${file.name}-${index}`} className="group relative h-20 w-20 overflow-hidden rounded-lg">
                      <Image
                        src={URL.createObjectURL(file)}
                        width={80}
                        height={80}
                        alt={file.name}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                        aria-label={`Remove ${file.name}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <AnonymousToggle
                isAnonymous={isAnonymous}
                displayName={currentUser?.displayName ?? 'you'}
                onToggle={toggleAnonymous}
              />
              <CategorySelector
                label={dictionary?.dashboard.post.category ?? 'Category'}
                selected={category}
                onSelect={setCategory}
              />
            </div>
          </div>
          <PostToolbar
            cancelLabel={dictionary?.common.cancel ?? 'Cancel'}
            shareLabel={dictionary?.common.share ?? 'Share'}
            isSubmitDisabled={!content.trim() || isPending}
            isPending={isPending}
            fileCount={files.length}
            onFilesChange={handleFilesChange}
            onCancel={handleFormClose}
            onSubmit={handleSubmit}
          />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
