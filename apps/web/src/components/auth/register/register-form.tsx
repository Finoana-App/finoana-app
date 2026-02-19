'use client';

import { SubmitEvent, useState } from 'react';

import { useRouter } from 'next/navigation';

import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

import { Divider, OAuth, PasswordInputWithStrength } from '@/components/auth';

import { AnimatedButton, AnimatedInput } from '@/components/shared';

import { useDictionary } from '@/hooks/use-dictionary';
import { useFocusState } from '@/hooks/use-focus-state';

import { useAuthContext } from '@/lib/firebase/auth-context';

import { Dictionary } from '@/i18n/dictionaries/en';

type FieldErrors = {
  name?: string;
  firstName?: string;
  email?: string;
  password?: string;
  general?: string;
};

export function RegisterForm() {
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});

  const { dictionary } = useDictionary<Dictionary>();

  const { setFocused, clearFocus, isFocused } = useFocusState();

  const { loading, signUp, signInWithGoogle } = useAuthContext();

  const router = useRouter();

  const validateForm = (): FieldErrors => {
    const newErrors: FieldErrors = {};

    if (!dictionary) return newErrors;

    if (!name.trim()) {
      newErrors.name = dictionary.auth.errors.nameRequired;
    }

    if (!firstName.trim()) {
      newErrors.firstName = dictionary.auth.errors.firstNameRequired;
    }

    if (!email.trim()) {
      newErrors.email = dictionary.auth.errors.emailRequired;
    }

    if (!password.trim()) {
      newErrors.password = dictionary.auth.errors.passwordRequired;
    } else if (password.length < 6) {
      newErrors.password = dictionary.auth.errors.passwordMin;
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
      await signUp({
        email,
        password,
        firstName: firstName.trim(),
        name: name.trim(),
        displayName: `${firstName.trim()} ${name.trim()}`.trim() || email.split('@')[0],
      });
      router.push('/dashboard');
    } catch (err: unknown) {
      const fallback = dictionary?.auth.errors.registrationFailed;
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
      const fallback = dictionary?.auth.errors.googleFailed;
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
      <div className="grid grid-cols-2 gap-4">
        <AnimatedInput
          id="name"
          type="text"
          label={dictionary?.auth.name as string}
          placeholder={dictionary?.auth.namePlaceholder as string}
          value={name}
          onChange={(e) => setName(e.target.value)}
          focused={isFocused('name')}
          onFocus={() => setFocused('name')}
          onBlur={clearFocus}
          error={errors.name}
        />
        <AnimatedInput
          id="firstName"
          type="text"
          label={dictionary?.auth.firstName as string}
          placeholder={dictionary?.auth.firstNamePlaceholder as string}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          focused={isFocused('firstName')}
          onFocus={() => setFocused('firstName')}
          onBlur={clearFocus}
          error={errors.firstName}
        />
      </div>
      <AnimatedInput
        id="email"
        type="email"
        label={dictionary?.auth.email as string}
        placeholder={dictionary?.auth.emailPlaceholder as string}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        focused={isFocused('email')}
        onFocus={() => setFocused('email')}
        onBlur={clearFocus}
        error={errors.email}
      />
      <PasswordInputWithStrength
        id="password"
        label={dictionary?.auth.password as string}
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        focused={isFocused('password')}
        onFocus={() => setFocused('password')}
        onBlur={clearFocus}
        error={errors.password}
      />
      <AnimatedButton
        type="submit"
        loading={loading}
        loadingText={dictionary?.auth.creatingAccount}
        icon={<ArrowRight className="h-4 w-4" />}
      >
        {dictionary?.auth.createAccount}
      </AnimatedButton>
      <Divider text={dictionary?.auth.divider as string} />
      <OAuth text={dictionary?.auth.google as string} onClick={handleGoogleSignIn} />
    </form>
  );
}
