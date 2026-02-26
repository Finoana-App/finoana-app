import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { CreatePostInput } from '@workspace/types';

import { postService } from '../api/services/post.service';

export const queryKeys = {
  posts: {
    all: () => ['posts'] as const,
    lists: () => ['posts', 'list'] as const,
    list: (f) => ['posts', 'list', f] as const,
    detail: (id: string) => ['posts', 'detail', id] as const,
  },
} satisfies Record<string, Record<string, (...args: never[]) => readonly unknown[]>>;

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: CreatePostInput) => postService.createPost(post),
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
