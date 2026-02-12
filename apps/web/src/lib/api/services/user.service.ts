import { ApiResponse, RegisterResponse, SignUpInput } from '@workspace/types';

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
  getCurrentUser: async (): Promise<ApiResponse<RegisterResponse>> => {
    return apiClient.get<RegisterResponse>('/users/me');
  },
};
