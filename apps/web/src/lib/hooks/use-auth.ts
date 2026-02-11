import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { SignUpInput } from '@workspace/types';

import { ApiError } from '@/lib/api/client';
import { userService } from '@/lib/api/services/user.service';

/**
 * Query keys for auth-related queries
 * Centralized for easy invalidation and refetching
 */
export const authKeys = {
  all: ['auth'] as const,
  currentUser: () => [...authKeys.all, 'currentUser'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
};

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignUpInput) => userService.register(data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.setQueryData(authKeys.currentUser(), response.responseObject);
      }
    },
    onError: (error: ApiError) => {
      console.error('Registration error:', error.message);
    },
  });
}

export function useCurrentUser(enabled: boolean = true) {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: async () => {
      const response = await userService.getCurrentUser();
      if (!response.success) {
        throw new ApiError(response.message, response.statusCode);
      }
      return response.responseObject;
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      if (error instanceof ApiError && [401, 404].includes(error.statusCode)) {
        return false;
      }
      return failureCount < 2;
    },
  });
}
