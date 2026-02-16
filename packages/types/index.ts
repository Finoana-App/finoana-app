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
 * SignInInput request payload
 */
export type SignInInput = Pick<User, 'email'> & { password: string };

/**
 * Register request payload
 */
export type SignUpInput = Pick<User, 'email' | 'displayName'> & {
  password: string;
};

export interface RegisterResponse {
  user: User;
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

/**
 * Verse of the day response structure
 */
export type VerseOfTheDay = {
  citation: string;
  passage: string;
  images: string[];
  version: string;
};
