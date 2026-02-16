import { z } from 'zod';

import { commonValidations } from '@/common/utils/common-validation';

/**
 * Enums
 */
export const UserRoleEnum = z.enum(['user', 'moderator', 'admin']);
export const PrivacyLevelEnum = z.enum(['public', 'private', 'anonymous']);

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
  isVerified: z.boolean(),

  lastSeenAt: z.date().optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * Input schema for registration (client → backend)
 * - email is required
 * - everything else is optional (backend fills in fallbacks/generates username)
 */
export const RegisterInputSchema = z.object({
  email: z.string().email(),
  firstName: z.string().max(255).optional(),
  name: z.string().max(255).optional(),
  displayName: z.string().max(255).optional(),
  username: z.string().max(255).optional(),
  photoUrl: z.string().url().optional().nullable(),
  bio: z.string().max(1000).optional().nullable(),
});

/**
 * Input schema for updating profile (user-editable fields only)
 */
export const UpdateProfileSchema = z.object({
  displayName: z.string().max(255).optional(),
  photoUrl: z.string().url().optional().nullable(),
  bio: z.string().max(1000).optional().nullable(),
  privacyLevel: PrivacyLevelEnum.optional(),
});

/**
 * Input schema for role changes (admin-only)
 */
export const UpdateRoleSchema = z.object({
  role: UserRoleEnum,
});

/**
 * Route param schemas
 */
export const GetUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

/**
 * Inferred TypeScript types
 */
export type User = z.infer<typeof UserSchema>;
export type UserRole = z.infer<typeof UserRoleEnum>;
export type PrivacyLevel = z.infer<typeof PrivacyLevelEnum>;

export type RegisterInput = z.infer<typeof RegisterInputSchema>;
export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
export type UpdateRoleInput = z.infer<typeof UpdateRoleSchema>;
