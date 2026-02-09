'use client';

import { AnimatePresence } from 'motion/react';

import { useResetPassword } from '@/hooks/use-reset-password';

import { ResetPasswordRequest } from './reset-password-request';
import { ResetPasswordSuccess } from './reset-password-success';

export function ResetPasswordForm() {
  const { email, setEmail, isLoading, isSuccess, submit, reset } = useResetPassword();

  return (
    <AnimatePresence mode="wait">
      {!isSuccess ? (
        <ResetPasswordRequest
          key="request"
          email={email}
          isLoading={isLoading}
          onEmailChange={setEmail}
          onSubmit={submit}
        />
      ) : (
        <ResetPasswordSuccess key="success" email={email} onRetry={reset} />
      )}
    </AnimatePresence>
  );
}
