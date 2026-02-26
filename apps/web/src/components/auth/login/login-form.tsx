'use client';

import { SubmitEvent, useState } from 'react';

import { useRouter } from 'next/navigation';

import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

import { Divider, OAuth, PasswordInput } from '@/components/auth';

import { AnimatedButton, AnimatedInput } from '@/components/shared';

import { useDictionary } from '@/hooks/use-dictionary';
import { useFocusState } from '@/hooks/use-focus-state';

import { useAuthContext } from '@/lib/firebase/auth-context';

import { Dictionary } from '@/i18n/dictionaries/en';

type FieldErrors = {
  email?: string;
  password?: string;
  general?: string;
};

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});

  const { dictionary } = useDictionary<Dictionary>();

  const { setFocused, clearFocus, isFocused } = useFocusState();

  const { loading, signIn, signInWithGoogle } = useAuthContext();

  const router = useRouter();

  const validateForm = (): FieldErrors => {
    const newErrors: FieldErrors = {};

    if (!dictionary) return newErrors;

    if (!email.trim()) {
      newErrors.email = dictionary?.auth.validation.emailRequired;
    }

    if (!password.trim()) {
      newErrors.password = dictionary?.auth.validation.passwordRequired;
    } else if (password.length < 6) {
      newErrors.password = dictionary?.auth.validation.passwordMin;
    }

    return newErrors;
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await signIn({ email, password });
      router.push('/dashboard');
    } catch (err: unknown) {
      const fallback = dictionary?.auth.validation.genericError;
      const message = err instanceof Error && err.message ? err.message : fallback;

      setErrors({ general: message });

      toast.error(message, {
        position: 'top-center',
        duration: 5000,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    setErrors({});

    try {
      await signInWithGoogle();
      router.push('/dashboard');
    } catch (err: unknown) {
      const fallback = dictionary?.auth.validation.googleFailed;
      const message = err instanceof Error && err.message ? err.message : fallback;

      setErrors({ general: message });

      toast.error(message, {
        position: 'top-center',
        duration: 5000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AnimatedInput
        id="email"
        type="email"
        label={dictionary?.auth.fields.email}
        placeholder={dictionary?.auth.fields.emailPlaceholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        focused={isFocused('email')}
        onFocus={() => setFocused('email')}
        onBlur={clearFocus}
        error={errors.email}
      />
      <PasswordInput
        id="password"
        label={dictionary?.auth.fields.password}
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        focused={isFocused('password')}
        onFocus={() => setFocused('password')}
        onBlur={clearFocus}
        showForgotPassword
        error={errors.password}
      />
      <AnimatedButton
        type="submit"
        loading={loading}
        loadingText={dictionary?.auth.actions.loading}
        icon={<ArrowRight className="h-4 w-4" />}
      >
        {dictionary?.auth.actions.continue}
      </AnimatedButton>
      <Divider text={dictionary?.auth.actions.divider} />
      <OAuth text={dictionary?.auth.actions.google} onClick={handleGoogleSignIn} />
    </form>
  );
}
