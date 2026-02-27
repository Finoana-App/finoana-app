'use client';

import { useCallback } from 'react';

import { motion } from 'motion/react';

import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@workspace/ui/components/dialog';
import { Textarea } from '@workspace/ui/components/textarea';

import { useCreatePostForm } from '@/hooks/use-create-post-form';

import { useCurrentUser } from '@/lib/hooks/use-user';

import { Dictionary } from '@/i18n/dictionaries/en';

import { AnonymousToggle } from './anonymous-toggle';
import { CategorySelector } from './category-selector';
import { MediaPreview } from './media-preview';
import { PostToolbar } from './post-toolbar';

interface CreatePostModalProps {
  open: boolean;
  dictionary: Dictionary | null;
  onOpenChange: (open: boolean) => void;
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
                placeholder={dictionary?.dashboard.post.placeholder}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="placeholder:text-muted-foreground min-h-30 resize-none border-0 px-2 text-base focus-visible:ring-0"
                autoFocus
              />
              <MediaPreview files={files} onRemove={handleRemoveFile} />
              <AnonymousToggle
                dictionary={dictionary}
                isAnonymous={isAnonymous}
                displayName={currentUser?.displayName ?? (dictionary?.common.you as string)}
                onToggle={toggleAnonymous}
              />
              <CategorySelector dictionary={dictionary} selected={category} onSelect={setCategory} />
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
