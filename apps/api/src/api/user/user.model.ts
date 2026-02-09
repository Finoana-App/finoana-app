import { z } from 'zod';

import { commonValidations } from '@/common/utils/common-validation';

export const UserRoleEnum = z.enum(['user', 'moderator', 'admin']);
export const PrivacyLevelEnum = z.enum(['public', 'private', 'anonymous']);

export const UserSchema = z.object({
  id: z.string().uuid(),
  firebaseUid: z.string().max(255),
  email: z.string().email(),
  displayName: z.string().max(255),
  photoUrl: z.string().url().optional().nullable(),
  bio: z.string().optional().nullable(),
  role: UserRoleEnum,
  privacyLevel: PrivacyLevelEnum,
  isActive: z.boolean(),
  isVerified: z.boolean(),
  lastSeenAt: z.date().optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const RegisterInputSchema = UserSchema.pick({ email: true, displayName: true, photoUrl: true, bio: true });
export const UpdateProfileSchema = UserSchema.pick({
  displayName: true,
  photoUrl: true,
  bio: true,
  privacyLevel: true,
});
export const UpdateRoleSchema = UserSchema.pick({
  role: true,
});

export type User = z.infer<typeof UserSchema>;
export type UserRole = z.infer<typeof UserRoleEnum>;
export type RegisterInput = z.infer<typeof RegisterInputSchema>;
export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;

export const GetUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
