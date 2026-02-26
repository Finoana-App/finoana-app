import { z } from 'zod';

/**
 * User role Zod enum
 */
export const UserRoleEnum = z.enum(['user', 'moderator', 'admin']);

/**
 * User role TypeScript enum (for runtime use)
 */
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

/**
 * Privacy level Zod enum
 */
export const PrivacyLevelEnum = z.enum(['public', 'private', 'anonymous']);

/**
 * Privacy level TypeScript enum (for runtime use)
 */
export enum PrivacyLevel {
  PUBLIC = 'public',
  PRIVATE = 'private',
  ANONYMOUS = 'anonymous',
}

/**
 * Post type Zod enum
 */ 
export const PostTypeEnum = z.enum(['general', 'prayer_request', 'testimony', 'devotion']);
