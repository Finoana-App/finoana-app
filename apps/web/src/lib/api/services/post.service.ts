import { ApiResponse, CreatePostInput } from '@workspace/types';

import { apiClient } from '@/lib/api/client';

export const postService = {
  createPost: async (data: CreatePostInput): Promise<ApiResponse<void>> => {
    return apiClient.post<void>('/posts', data);
  },
};
