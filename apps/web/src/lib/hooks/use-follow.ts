import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { ApiError } from '@/lib/api/client';
import { followService } from '@/lib/api/services/follow.service';

export const followKeys = {
  all: ['follow'] as const,
  suggestions: () => [...followKeys.all, 'suggestions'] as const,
  suggestionType: (type: string) => [...followKeys.suggestions(), type] as const,
};

export function useSuggestions(type: 'comprehensive' | 'popular' | 'friends-of-friends' | 'recently-active' | 'new') {
  return useQuery({
    queryKey: followKeys.suggestionType(type),
    queryFn: async () => {
      let response;
      switch (type) {
        case 'popular':
          response = await followService.getPopularUsers();
          break;
        case 'friends-of-friends':
          response = await followService.getFriendsOfFriends();
          break;
        case 'recently-active':
          response = await followService.getRecentlyActive();
          break;
        case 'new':
          response = await followService.getNewUsers();
          break;
        default:
          response = await followService.getComprehensiveSuggestions();
      }

      if (!response.success) {
        throw new ApiError(response.message, response.statusCode);
      }
      return response.responseObject;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes (suggestions can rotate slightly faster)
  });
}

export function useFollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => followService.followUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: followKeys.suggestions() });
      queryClient.invalidateQueries({ queryKey: ['auth', 'currentUser'] });
    },
    onError: (error: ApiError) => {
      console.error('Follow error:', error.message);
    },
  });
}

export function useUnfollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => followService.unfollowUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: followKeys.suggestions() });
      queryClient.invalidateQueries({ queryKey: ['auth', 'currentUser'] });
    },
    onError: (error: ApiError) => {
      console.error('Unfollow error:', error.message);
    },
  });
}
