import { ApiResponse, User } from '@workspace/types';
import { apiClient } from '../client';

export const followService = {
  followUser: async (userId: string): Promise<ApiResponse<void>> => {
    return apiClient.post<void>(`/follow/${userId}`);
  },

  unfollowUser: async (userId: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<void>(`/follow/${userId}`);
  },

  getComprehensiveSuggestions: async (): Promise<ApiResponse<User[]>> => {
    return apiClient.get<User[]>('/follow/suggestions/comprehensive');
  },

  getPopularUsers: async (): Promise<ApiResponse<User[]>> => {
    return apiClient.get<User[]>('/follow/suggestions/popular');
  },

  getFriendsOfFriends: async (): Promise<ApiResponse<User[]>> => {
    return apiClient.get<User[]>('/follow/suggestions/friends-of-friends');
  },

  getRecentlyActive: async (): Promise<ApiResponse<User[]>> => {
    return apiClient.get<User[]>('/follow/suggestions/recently-active');
  },

  getNewUsers: async (): Promise<ApiResponse<User[]>> => {
    return apiClient.get<User[]>('/follow/suggestions/new');
  },
};