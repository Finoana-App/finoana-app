import { PostType } from '@workspace/types';

import { Dictionary } from '@/i18n/dictionaries/en';

const POST_CATEGORY_CONFIG: ReadonlyArray<{
  value: PostType;
  color: string;
  dictKey: keyof Dictionary['dashboard']['post']['categories'];
}> = [
  {
    value: PostType.PRAYER_REQUEST,
    color: 'bg-prayer/10 text-prayer border-prayer/30 hover:bg-prayer/20',
    dictKey: 'prayer',
  },
  {
    value: PostType.DEVOTION,
    color: 'bg-devotional/10 text-devotional border-devotional/30 hover:bg-devotional/20',
    dictKey: 'devotion',
  },
  {
    value: PostType.TESTIMONY,
    color: 'bg-testimony/10 text-testimony border-testimony/30 hover:bg-testimony/20',
    dictKey: 'testimony',
  },
  {
    value: PostType.GENERAL,
    color: 'bg-reflection/10 text-reflection border-reflection/30 hover:bg-reflection/20',
    dictKey: 'general',
  },
] as const;

export function getPostCategories(dictionary: Dictionary | null) {
  return POST_CATEGORY_CONFIG.map((c) => ({
    value: c.value,
    color: c.color,
    label: dictionary?.dashboard.post.categories[c.dictKey] ?? c.dictKey,
  }));
}

export const ACCEPTED_IMAGE_TYPES = 'image/jpeg,image/png,image/webp,image/gif';
