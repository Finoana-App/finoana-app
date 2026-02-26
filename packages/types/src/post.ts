import { z } from 'zod';

import { PostTypeEnum } from './enums';

/* 
 * Post schema
 */
export const PostSchema = z.object({
  id: z.string().uuid(),
  authorId: z.string().uuid(),
  content: z.string().min(1, "Content is required"),
  postType: PostTypeEnum.default('general'),
  mediaUrls: z.array(z.string()).default([]),
  isAnonymous: z.boolean().default(false),
  isPinned: z.boolean().default(false),
  isPrayerAnswered: z.boolean().nullable().default(false),
  answeredAt: z.date().nullable().optional(),
  likesCount: z.number().int().min(0).default(0),
  commentsCount: z.number().int().min(0).default(0),
  sharesCount: z.number().int().min(0).default(0),
  viewsCount: z.number().int().min(0).default(0),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

/**
 * Core post entity type (inferred from schema)
 */
export type Post = z.infer<typeof PostSchema>;

/**
 * Input schema for creating a post
 */
export const CreatePostSchema = z.object({
  content: z.string().min(1, "Content is required"),
  postType: PostTypeEnum.default('general'),
  isAnonymous: z.boolean().default(false),
})

/**
 * Input type for creating a post
 */
export type CreatePostInput = z.infer<typeof CreatePostSchema>;
