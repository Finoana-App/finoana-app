// ────────────────────────────────────────────────
//          User related types
// ────────────────────────────────────────────────
/**
 * User role enum
 */
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

/**
 * Privacy level enum
 */
export enum PrivacyLevel {
  PUBLIC = 'public',
  PRIVATE = 'private',
  ANONYMOUS = 'anonymous',
}

/**
 * Core user entity (shape returned by most API endpoints and stored in app state)
 */
export interface User {
  id: string;
  firebaseUid: string;

  email: string;
  username: string;

  firstName: string;
  name: string;
  displayName: string;

  photoUrl: string | null;
  bio: string | null;

  role: UserRole;
  privacyLevel: PrivacyLevel;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

/**
 * Shape of minimal user info (e.g. for lists, mentions, cards)
 */
export interface UserPreview {
  id: string;
  username: string;
  displayName: string;
  photoUrl: string | null;
  role?: UserRole;
  isVerified?: boolean;
}

/**
 * Input for email/password sign-in
 */
export interface SignInInput {
  email: string;
  password: string;
}

/**
 * Input for registration (client → Firebase Auth + your backend)
 *
 * password is required for email/password signup,
 * but optional for social providers (Google, etc.)
 */
export interface SignUpInput {
  email: string;
  password?: string;

  firstName?: string;
  name?: string;
  displayName?: string;

  username?: string;
}

/* Update profile input */
export interface UpdateProfileInput {
  displayName?: string;
  photoUrl?: string;
  bio?: string;
  privacyLevel?: PrivacyLevel;
}

/**
 * Payload sent to your backend's /register endpoint
 * (after Firebase Auth user is created)
 */
export interface RegisterBackendPayload {
  email: string;
  firstName?: string;
  name?: string;
  displayName?: string;
  username?: string;
}

/**
 * Response from successful registration
 */
export interface RegisterResponse {
  success: true;
  message: string;
  user: User;
}

/**
 * Standardized API error shape (used by ServiceResponse.failure)
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  statusCode: number;
  responseObject: null;
}

/**
 * Standardized API success shape (used by ServiceResponse.success)
 */
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  message: string;
  statusCode: number;
  responseObject: T;
}

/**
 * Union of success/error API responses
 */
export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

// ────────────────────────────────────────────────
//          Verse of the day
// ────────────────────────────────────────────────
/**
 * Verse of the day (seems unrelated but keeping it)
 */
export interface VerseOfTheDay {
  citation: string;
  passage: string;
  images: string[];
  version: string;
}
