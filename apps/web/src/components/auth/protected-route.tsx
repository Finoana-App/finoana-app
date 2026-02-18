'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useAuthContext } from '@/lib/firebase/auth-context';

import { LoadingScreen } from '../shared';

export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    redirectTo?: string;
    requireAdmin?: boolean;
  }
) {
  return function AuthenticatedComponent(props: P) {
    const { user, loading } = useAuthContext();
    const router = useRouter();
    const redirectTo = options?.redirectTo || '/login';

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.push(redirectTo);
          return;
        }

        if (options?.requireAdmin && user.role !== 'admin') {
          router.push('/unauthorized');
          return;
        }
      }
    }, [user, loading, router, redirectTo]);

    if (loading) {
      return <LoadingScreen />;
    }

    if (!user) {
      return null;
    }

    if (options?.requireAdmin && user.role !== 'admin') {
      return null;
    }

    return <Component {...props} />;
  };
}

export function ProtectedRoute({
  children,
  requireAdmin = false,
  redirectTo = '/login',
}: Readonly<{
  children: React.ReactNode;
  requireAdmin?: boolean;
  redirectTo?: string;
}>) {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(redirectTo);
      } else if (requireAdmin && user.role !== 'admin') {
        router.push('/unauthorized');
      }
    }
  }, [user, loading, router, redirectTo, requireAdmin]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user || (requireAdmin && user.role !== 'admin')) {
    return null;
  }

  return <>{children}</>;
}
