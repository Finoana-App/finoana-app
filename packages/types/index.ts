/**
 * User role enum
 */
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

/**
 * Privacy Level Enum
 */
export enum PrivacyLevel {
  PUBLIC = 'public',
  PRIVATE = 'private',
  ANONYMOUS = 'anonymous',
}

/**
 * User entity
 */
export interface User {
  id: string;
  firebaseUid: string;
  email: string;
  displayName: string;
  photoUrl: string | null;
  bio: string | null;
  role: UserRole;
  privacyLevel: PrivacyLevel;
  isActive: boolean;
  isVerified: boolean;
  lastSeenAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * API Error response structure
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  statusCode: number;
  responseObject: null;
}

/**
 * API Success response structure
 */
export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  statusCode: number;
  responseObject: T;
}

/**
 * Generic API response
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
