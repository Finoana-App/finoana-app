import { ApiResponse, PaginatedUserResponse, User } from '@workspace/types';

import { apiClient } from '@/lib/api/client';

export const followService = {
  followUser: async (userId: string): Promise<ApiResponse<void>> => {
    return apiClient.post<void>(`/follows/${userId}`);
  },

  unfollowUser: async (userId: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<void>(`/follows/${userId}`);
  },

  getFollowers: async (userId: string, page = 1): Promise<ApiResponse<PaginatedUserResponse>> => {
    return apiClient.get(`/follow/${userId}/followers?page=${page}`);
  },

  getFollowing: async (userId: string, page = 1): Promise<ApiResponse<PaginatedUserResponse>> => {
    return apiClient.get(`/follow/${userId}/following?page=${page}`);
  },

  getComprehensiveSuggestions: async (): Promise<ApiResponse<User[]>> => {
    return apiClient.get<User[]>('/follows/suggestions/comprehensive');
  },

  getPopularUsers: async (): Promise<ApiResponse<User[]>> => {
    return apiClient.get<User[]>('/follows/suggestions/popular');
  },

  getFriendsOfFriends: async (): Promise<ApiResponse<User[]>> => {
    return apiClient.get<User[]>('/follows/suggestions/friends-of-friends');
  },

  getRecentlyActive: async (): Promise<ApiResponse<User[]>> => {
    return apiClient.get<User[]>('/follows/suggestions/recently-active');
  },

  getNewUsers: async (): Promise<ApiResponse<User[]>> => {
    return apiClient.get<User[]>('/follows/suggestions/new');
  },
};
