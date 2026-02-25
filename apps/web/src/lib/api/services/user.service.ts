import { ApiResponse, RegisterResponse, SignUpInput, UpdateProfileInput, User } from '@workspace/types';

import { apiClient } from '../client';

export const userService = {
  register: async (data: SignUpInput): Promise<ApiResponse<RegisterResponse>> => {
    return apiClient.post<RegisterResponse>('/users/register', data);
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    return apiClient.get<User>('/users/me');
  },

  updateProfile: async (data: FormData | UpdateProfileInput): Promise<ApiResponse<User>> => {
    return apiClient.put<User>('/users/me', data);
  },

  getUserById: async (id: string): Promise<ApiResponse<User>> => {
    return apiClient.get<User>(`/users/${id}`);
  },
};
