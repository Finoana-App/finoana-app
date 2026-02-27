import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Post } from '@workspace/types';

import { postService } from '@/lib/api/services/post.service';

interface UserPostsResponse {
  posts: Post[];
  pagination: {
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

export const queryKeys = {
  posts: {
    all: () => ['posts'] as const,
    lists: () => ['posts', 'list'] as const,
    list: (f: unknown) => ['posts', 'list', f] as const,
    detail: (id: string) => ['posts', 'detail', id] as const,
  },
} satisfies Record<string, Record<string, (...args: never[]) => readonly unknown[]>>;

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: FormData) => postService.createPost(post),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() });
      }
      toast.success(response.message, {
        position: 'top-center',
        duration: 5000,
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        position: 'top-center',
        duration: 5000,
      });
    },
  });
}

export function useGetUserPosts(userId: string | undefined) {
  return useQuery<UserPostsResponse>({
    queryKey: queryKeys.posts.list({ userId }),
    queryFn: async () => {
      const response = await postService.getUserPosts(userId as string);
      if (!response.success || !response.responseObject) {
        throw new Error(response.message);
      }
      return response.responseObject;
    },
    enabled: !!userId,
  });
}
