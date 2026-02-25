import { ApiResponse, PaginatedUserResponse, User } from '@workspace/types';

import { apiClient } from '@/lib/api/client';

type FollowCounts = {
  followersCount: number;
  followingCount: number;
};

export const followService = {
  followUser: async (userId: string): Promise<ApiResponse<void>> => {
    return apiClient.post<void>(`/follows/${userId}`);
  },

  unfollowUser: async (userId: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<void>(`/follows/${userId}`);
  },

  getFollowers: async (userId: string, page = 1): Promise<ApiResponse<PaginatedUserResponse>> => {
    return apiClient.get(`/follows/${userId}/followers?page=${page}`);
  },

  getFollowing: async (userId: string, page = 1): Promise<ApiResponse<PaginatedUserResponse>> => {
    return apiClient.get(`/follows/${userId}/following?page=${page}`);
  },

  getFollowCounts: async (userId: string): Promise<ApiResponse<FollowCounts>> => {
    return apiClient.get(`/follows/${userId}/counts`);
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

  removeFollower: async (followerId: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<void>(`/follows/followers/${followerId}`);
  },
};
