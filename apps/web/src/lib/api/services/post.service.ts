import { ApiResponse } from '@workspace/types';

import { apiClient } from '@/lib/api/client';

export const postService = {
  createPost: async (): Promise<ApiResponse<void>> => {
    return apiClient.post<void>('/posts');
  },
};
