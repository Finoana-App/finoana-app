'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { AnimatePresence } from 'motion/react';

import { useResetPassword } from '@/hooks/use-reset-password';

import { getDictionary, Locale } from '@/i18n';
import { Dictionary } from '@/i18n/dictionaries/en';

import { ResetPasswordRequest } from './reset-password-request';
import { ResetPasswordSuccess } from './reset-password-success';

export function ResetPasswordForm() {
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);

  const { email, setEmail, isLoading, isSuccess, submit, reset } = useResetPassword();

  const pathname = usePathname();
  const lang = pathname.split('/')[1] as Locale;

  useEffect(() => {
    getDictionary(lang).then((dict) => {
      setDictionary(dict);
    });
  }, [lang]);

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
