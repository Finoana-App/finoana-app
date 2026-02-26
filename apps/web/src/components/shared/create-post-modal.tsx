'use client';

import { useState } from 'react';

import { BookOpen, Image, Send, Smile } from 'lucide-react';
import { motion } from 'motion/react';

import { PostType } from '@workspace/types';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@workspace/ui/components/dialog';
import { Textarea } from '@workspace/ui/components/textarea';
import { cn } from '@workspace/ui/lib/utils';

import { useCurrentUser } from '@/lib/hooks/use-user';

import { Dictionary } from '@/i18n/dictionaries/en';

const categories: { value: PostType; label: string; color: string }[] = [
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
];

interface CreatePostModalProps {
  open: boolean;
  dictionary: Dictionary | null;
  onOpenChange: (open: boolean) => void;
}

export function CreatePostModal({ open, dictionary, onOpenChange }: Readonly<CreatePostModalProps>) {
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PostType>(PostType.GENERAL);

  const { data: currentUser } = useCurrentUser();

  const handleSubmit = () => {
    if (content.trim()) {
      console.log('Submitting:', { content, category: selectedCategory });
      setContent('');
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setContent('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-150">
        <DialogHeader className="border-border border-b p-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-display text-lg">{dictionary?.dashboard.post.createPost}</DialogTitle>
          </div>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="p-4"
        >
          <div className="flex gap-4">
            <Avatar className="ring-primary/10 h-12 w-12 ring-2">
              <AvatarImage src={currentUser?.photoUrl || undefined} alt={currentUser?.displayName} />
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
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                <p className="text-muted-foreground mb-2 text-xs font-bold">{dictionary?.dashboard.post.category}</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedCategory(category.value)}
                      className={cn(
                        'cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition-all',
                        selectedCategory === category.value
                          ? category.color + ' ring-offset-background ring-primary/20 ring-1 ring-offset-1'
                          : 'bg-secondary/50 text-muted-foreground hover:bg-secondary border-transparent'
                      )}
                    >
                      {category.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
          <div className="border-border/50 mt-6 flex items-center justify-between border-t pt-4">
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 h-9 w-9">
                <Image className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 h-9 w-9">
                <Smile className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 h-9 w-9">
                <BookOpen className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={handleClose} className="font-medium">
                {dictionary?.common.cancel}
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!content.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 font-medium"
              >
                <Send className="h-4 w-4" />
                {dictionary?.common.share}
              </Button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
