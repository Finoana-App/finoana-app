import { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { SignUpInput, UpdateProfileInput } from '@workspace/types';

import { ApiError } from '@/lib/api/client';
import { userService } from '@/lib/api/services/user.service';

/**
 * Query keys for auth-related queries
 * Centralized for easy invalidation and refetching
 */
export const authKeys = {
  all: ['auth'] as const,
  currentUser: () => [...authKeys.all, 'currentUser'] as const,
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

export function useResetPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const submit = async () => {
    if (!email) return;

    setStatus('loading');
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('success');

    console.log('Password reset requested for:', email);
  };

  const reset = () => {
    setStatus('idle');
    setEmail('');
  };

  return {
    email,
    setEmail,
    status,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    submit,
    reset,
  };
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

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData | UpdateProfileInput) => userService.updateProfile(data),
    onSuccess: (response) => {
      if (response?.success) {
        const updatedUser = Array.isArray(response.responseObject)
          ? response.responseObject[0]
          : response.responseObject;

        queryClient.setQueryData(authKeys.currentUser(), updatedUser);

        queryClient.invalidateQueries({
          queryKey: authKeys.currentUser(),
          refetchType: 'active',
        });
      }
    },
    onError: (error: ApiError) => {
      console.error('Update profile error:', error.message);
    },
  });
}

export function useGetUserById(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await userService.getUserById(id);
      if (!response.success) {
        throw new ApiError(response.message, response.statusCode);
      }
      return response.responseObject;
    },
    enabled: !!id,
  });
}
