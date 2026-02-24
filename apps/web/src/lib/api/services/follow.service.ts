import { ApiResponse, User } from "@workspace/types";
import { apiClient } from "../client";

export const followService = {
  follow: async (userId: string): Promise<ApiResponse<User>> => {
    return apiClient.post<User>(`/follows/${userId}`);
  },

  unfollow: async (userId: string): Promise<ApiResponse<User>> => {
    return apiClient.delete<User>(`/follows/${userId}`);
  },

  getComprehensiveSuggestions: async (): Promise<ApiResponse<User[]>> => {
    return apiClient.get<User[]>(`/follows/suggestions/comprehensive`);
  },
}