import { z } from 'zod';

import { PrivacyLevelEnum, UserRoleEnum } from './enums';
import { PaginationMeta } from './pagination';

/**
 * Full User schema (matches DB entity exactly)
 */
export const UserSchema = z.object({
  id: z.string().uuid(),
  firebaseUid: z.string().max(255),
  email: z.string().email(),
  username: z.string().max(255),
  firstName: z.string().max(255),
  name: z.string().max(255),
  displayName: z.string().max(255),
  photoUrl: z.string().url().optional().nullable(),
  bio: z.string().max(1000).optional().nullable(),
  role: UserRoleEnum,
  privacyLevel: PrivacyLevelEnum,
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * Core user entity type (inferred from schema)
 */
export type User = z.infer<typeof UserSchema>;

/**
 * User preview schema (for lists, mentions, cards)
 */
export const UserPreviewSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  displayName: z.string(),
  photoUrl: z.string().url().nullable().optional(),
  role: UserRoleEnum.optional(),
  isVerified: z.boolean().optional(),
});

/**
 * Shape of minimal user info
 */
export type UserPreview = z.infer<typeof UserPreviewSchema>;

export interface PaginatedUserResponse {
  followers?: UserPreview[];
  following?: UserPreview[];

  items: UserPreview[];

  pagination: PaginationMeta;
}
