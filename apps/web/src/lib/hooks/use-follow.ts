import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

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
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: followKeys.all });

      const previousSuggestions = queryClient.getQueryData(followKeys.suggestions());

      // Optimistically update the cache
      // Note: In suggestions, we usually REMOVE the user once followed,
      // or we update a 'isFollowing' property if your API returns one.
      return { previousSuggestions };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: followKeys.all });
      queryClient.invalidateQueries({ queryKey: ['auth', 'currentUser'] });
    },
    onError: (err: ApiError, _userId, context) => {
      if (context?.previousSuggestions) {
        queryClient.setQueryData(followKeys.suggestions(), context.previousSuggestions);
      }

      console.log('Follow error:', err);
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

export function useFollowUserList(userId: string, type: 'followers' | 'following') {
  return useInfiniteQuery({
    queryKey: [...followKeys.all, type, userId],
    queryFn: async ({ pageParam = 1 }) => {
      const response =
        type === 'followers'
          ? await followService.getFollowers(userId, pageParam)
          : await followService.getFollowing(userId, pageParam);

      if (!response.success) throw new Error(response.message);

      return response.responseObject;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    staleTime: 1 * 60 * 1000,
  });
}

export function useFollowCounts(userId: string | undefined) {
  return useQuery({
    queryKey: ['follow-counts', userId],
    queryFn: async () => {
      if (!userId) throw new Error('User ID is required');
      const response = await followService.getFollowCounts(userId);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.responseObject;
    },
    enabled: !!userId,
    staleTime: 60 * 1000,
  });
}

export function useRemoveFollower() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (followerId: string) => followService.removeFollower(followerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['follow-counts'] });
      toast.success('Follower removed successfully', {
        position: 'top-center',
        duration: 5000,
      });
    },
    onError: (error: ApiError) => {
      console.error('Remove follower error:', error.message);
      toast.error('Failed to remove follower', {
        position: 'top-center',
        duration: 5000,
      });
    },
  });
}
