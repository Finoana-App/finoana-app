'use client';

import { AnimatePresence } from 'motion/react';

import { useDictionary } from '@/hooks/use-dictionary';

import { useResetPassword } from '@/lib/hooks/use-user';

import { Dictionary } from '@/i18n/dictionaries/en';

import { ResetPasswordRequest } from './reset-password-request';
import { ResetPasswordSuccess } from './reset-password-success';

export function ResetPasswordForm() {
  const { dictionary } = useDictionary<Dictionary>();

  const { email, setEmail, isLoading, isSuccess, submit, reset } = useResetPassword();

  return (
    <AnimatePresence mode="wait">
      {isSuccess ? (
        <ResetPasswordSuccess key="success" email={email} onRetry={reset} dictionary={dictionary} />
      ) : (
        <ResetPasswordRequest
          key="request"
          email={email}
          dictionary={dictionary}
          isLoading={isLoading}
          onEmailChange={setEmail}
          onSubmit={submit}
        />
      )}
    </AnimatePresence>
  );
}
