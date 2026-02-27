import { PostType } from '@workspace/types';

export const POST_CATEGORIES: ReadonlyArray<{
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

export const ACCEPTED_IMAGE_TYPES = 'image/jpeg,image/png,image/webp,image/gif';
