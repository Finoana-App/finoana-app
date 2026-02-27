'use client';

import { motion } from 'motion/react';

import { PostType } from '@workspace/types';
import { cn } from '@workspace/ui/lib/utils';

import { Dictionary } from '@/i18n/dictionaries/en';

import { getPostCategories } from './constants';

interface CategorySelectorProps {
  dictionary: Dictionary | null;
  selected: PostType;
  onSelect: (value: PostType) => void;
}

export function CategorySelector({ dictionary, selected, onSelect }: Readonly<CategorySelectorProps>) {
  const categories = getPostCategories(dictionary);
  const label = dictionary?.dashboard.post.category ?? 'Category';

  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
      <p className="text-muted-foreground mb-2 text-xs font-bold">{label}</p>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
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
