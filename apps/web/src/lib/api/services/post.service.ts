import { ApiResponse, Post } from '@workspace/types';

import { apiClient } from '@/lib/api/client';

export const postService = {
  createPost: async (data: FormData): Promise<ApiResponse<Post>> => {
    return await apiClient.post<Post>('/posts', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
