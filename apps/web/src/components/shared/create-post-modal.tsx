'use client';

import { useCallback } from 'react';

import { BookOpen, Image, Send, Smile } from 'lucide-react';
import { motion } from 'motion/react';

import { PostType } from '@workspace/types';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@workspace/ui/components/dialog';
import { Textarea } from '@workspace/ui/components/textarea';
import { cn } from '@workspace/ui/lib/utils';

import { useCreatePostForm } from '@/hooks/use-create-post-form';

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

const TOOLBAR_ACTIONS = [
  { icon: Image, label: 'Add image' },
  { icon: Smile, label: 'Add emoji' },
  { icon: BookOpen, label: 'Add scripture' },
] as const;

interface CategorySelectorProps {
  label: string;
  selected: PostType;
  onSelect: (value: PostType) => void;
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

interface PostToolbarProps {
  cancelLabel: string;
  shareLabel: string;
  isSubmitDisabled: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

function PostToolbar({ cancelLabel, shareLabel, isSubmitDisabled, onCancel, onSubmit }: Readonly<PostToolbarProps>) {
  return (
    <div className="border-border/50 mt-6 flex items-center justify-between border-t pt-4">
      <div className="flex gap-1">
        {TOOLBAR_ACTIONS.map(({ icon: Icon, label }) => (
          <Button
            key={label}
            variant="ghost"
            size="icon"
            aria-label={label}
            className="text-primary hover:bg-primary/10 h-9 w-9"
          >
            <Icon className="h-4 w-4" />
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" onClick={onCancel} className="font-medium cursor-pointer">
          {cancelLabel}
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isSubmitDisabled}
          className="cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground gap-2 font-medium"
        >
          <Send className="h-4 w-4" />
          {shareLabel}
        </Button>
      </div>
    </div>
  );
}

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
    isPending,
    setContent,
    setCategory,
    handleClose: handleFormClose,
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
            <Avatar className="ring-primary/10 h-12 w-12 ring-2">
              <AvatarImage src={currentUser?.photoUrl ?? undefined} alt={currentUser?.displayName} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {currentUser?.displayName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Share a prayer, thought, or testimony..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="placeholder:text-muted-foreground min-h-30 resize-none border-0 px-2 text-base focus-visible:ring-0"
                autoFocus
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
            onCancel={handleFormClose}
            onSubmit={handleSubmit}
          />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
