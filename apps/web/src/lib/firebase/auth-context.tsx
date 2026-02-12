'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  User as FirebaseUser,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';

import type { SignInInput, SignUpInput, User } from '@workspace/types';

import { useCurrentUser, useRegister } from '@/lib/hooks/use-auth';

import { auth } from './config';

interface AuthContextValue {
  firebaseUser: FirebaseUser | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (input: SignInInput) => Promise<void>;
  signUp: (input: SignUpInput) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const FIREBASE_ERROR_MESSAGES: Record<string, string> = {
  'auth/email-already-in-use': 'This email is already registered. Please sign in instead.',
  'auth/invalid-email': 'Invalid email address.',
  'auth/operation-not-allowed': 'Email/password accounts are not enabled.',
  'auth/weak-password': 'Password is too weak. Please use at least 6 characters.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password.',
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
  'auth/network-request-failed': 'Network error. Please check your connection.',
  'auth/popup-closed-by-user': 'Sign-in popup was closed. Please try again.',
};

const DEFAULT_ERROR_MESSAGE = 'An error occurred. Please try again.';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const getFirebaseErrorMessage = (code: string): string => {
  return FIREBASE_ERROR_MESSAGES[code] || DEFAULT_ERROR_MESSAGE;
};

class AuthError extends Error {
  constructor(code: string) {
    super(getFirebaseErrorMessage(code));
    this.name = 'AuthError';
  }
}

export function AuthProvider({ children }: Readonly<AuthProviderProps>) {
  const [state, setState] = useState({
    firebaseUser: null as FirebaseUser | null,
    error: null as string | null,
    loading: true,
  });

  const registerMutation = useRegister();
  const { data: appUser, isLoading: isLoadingUser } = useCurrentUser(!!state.firebaseUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setState((prev) => ({ ...prev, firebaseUser: user, loading: false }));
      },
      (error) => {
        console.error('Auth state change error:', error);
        setState((prev) => ({
          ...prev,
          error: error.message,
          loading: false,
        }));
      }
    );

    return () => unsubscribe();
  }, []);

  const withAuthAction = useCallback(async <T,>(action: () => Promise<T>): Promise<T> => {
    setState((prev) => ({ ...prev, error: null, loading: true }));

    try {
      return await action();
    } catch (err: unknown) {
      let errorMessage: string;

      if (err instanceof AuthError) {
        errorMessage = err.message;
      } else if (err instanceof FirebaseError) {
        errorMessage = getFirebaseErrorMessage(err.code);
      } else if (err instanceof Error) {
        errorMessage = err.message;
      } else {
        errorMessage = DEFAULT_ERROR_MESSAGE;
      }

      setState((prev) => ({ ...prev, error: errorMessage }));
      throw new Error(errorMessage);
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const signIn = useCallback(
    ({ email, password }: SignInInput): Promise<void> => {
      return withAuthAction(() => signInWithEmailAndPassword(auth, email, password).then(() => {}));
    },
    [withAuthAction]
  );

  const signUp = useCallback(
    async ({ email, password, displayName, acceptTerms }: SignUpInput): Promise<void> => {
      return withAuthAction(async () => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(userCredential.user, { displayName });

        try {
          await registerMutation.mutateAsync({ displayName, acceptTerms } as SignUpInput);
        } catch (error) {
          await userCredential.user.delete();
          throw error;
        }
      });
    },
    [withAuthAction, registerMutation]
  );

  const signInWithGoogle = useCallback((): Promise<void> => {
    return withAuthAction(async () => {
      const provider = new GoogleAuthProvider();

      provider.addScope('profile');
      provider.addScope('email');

      provider.setCustomParameters({
        prompt: 'select_account',
      });

      try {
        const result = await signInWithPopup(auth, provider);

        if (result.user) {
          await registerMutation.mutateAsync({
            displayName: result.user.displayName || result.user.email?.split('@')[0] || 'Google User',
            email: result.user.email,
          } as SignUpInput);
        }
      } catch (error) {
        console.error('Google sign-in error:', error);
        throw error;
      }
    });
  }, [withAuthAction, registerMutation]);

  const signOut = useCallback((): Promise<void> => {
    return withAuthAction(async () => {
      await firebaseSignOut(auth);
      globalThis.location.href = '/login';
    });
  }, [withAuthAction]);

  const value = useMemo<AuthContextValue>(
    () => ({
      firebaseUser: state.firebaseUser,
      user: (appUser as unknown as User) || null,
      loading: state.loading || isLoadingUser,
      error: state.error,
      signIn,
      signUp,
      signInWithGoogle,
      signOut,
    }),
    [state.firebaseUser, state.loading, state.error, appUser, isLoadingUser, signIn, signUp, signInWithGoogle, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
}
