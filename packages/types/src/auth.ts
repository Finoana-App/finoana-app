import { z } from 'zod';

import { PrivacyLevelEnum, UserRoleEnum } from './enums';
import { UserSchema } from './user';

/**
 * Input schema for email/password sign-in
 */
export const SignInInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

/**
 * Input for email/password sign-in
 */
export type SignInInput = z.infer<typeof SignInInputSchema>;

/**
 * Input schema for registration (client → Firebase Auth + backend)
 */
export const SignUpInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).optional(),
  firstName: z.string().max(255).optional(),
  name: z.string().max(255).optional(),
  displayName: z.string().max(255).optional(),
  username: z.string().max(255).optional(),
});

/**
 * Input for registration
 */
export type SignUpInput = z.infer<typeof SignUpInputSchema>;

/**
 * Input schema for backend registration endpoint
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
 * Payload sent to backend's /register endpoint
 */
export type RegisterInput = z.infer<typeof RegisterInputSchema>;

/**
 * Input schema for updating profile
 */
export const UpdateProfileSchema = z.object({
  displayName: z.string().max(255).optional(),
  photoUrl: z.string().url().optional().nullable(),
  bio: z.string().max(1000).optional().nullable(),
  privacyLevel: PrivacyLevelEnum.optional(),
});

/**
 * Update profile input type
 */
export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;

/**
 * Input schema for role changes (admin-only)
 */
export const UpdateRoleSchema = z.object({
  role: UserRoleEnum,
});

/**
 * Update role input type
 */
export type UpdateRoleInput = z.infer<typeof UpdateRoleSchema>;

/**
 * Response from successful registration
 */
export const RegisterResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  user: UserSchema,
});

/**
 * Response from successful registration
 */
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
