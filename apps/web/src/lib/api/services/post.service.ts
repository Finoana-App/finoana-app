import { ApiResponse, Post } from '@workspace/types';

import { apiClient } from '@/lib/api/client';

interface UserPostsResponse {
  posts: Post[];
  pagination: {
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

export const postService = {
  createPost: async (data: FormData): Promise<ApiResponse<Post>> => {
    return await apiClient.post<Post>('/posts', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getUserPosts: async (userId: string): Promise<ApiResponse<UserPostsResponse>> => {
    return await apiClient.get<UserPostsResponse>(`/posts/user/${userId}`);
  },
};
