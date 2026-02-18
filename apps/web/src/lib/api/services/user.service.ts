import { ApiResponse, RegisterResponse, SignUpInput, UpdateProfileInput, User } from '@workspace/types';

import { apiClient } from '../client';

export const userService = {
  /**
   * Register a new user
   * Note: User must be authenticated with Firebase first
   */
  register: async (data: SignUpInput): Promise<ApiResponse<RegisterResponse>> => {
    return apiClient.post<RegisterResponse>('/users/register', data);
  },

  /**
   * Get current user profile
   * Useful for rehydrating user state on app load
   */
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    return apiClient.get<User>('/users/me');
  },

  /**
   * Update current user profile
   * Useful for updating user profile
   */
  updateProfile: async (data: UpdateProfileInput): Promise<ApiResponse<User>> => {
    return apiClient.put<User>('/users/me', data);
  },
};
