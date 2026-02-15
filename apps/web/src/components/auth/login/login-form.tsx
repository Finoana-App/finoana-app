'use client';

import { SubmitEvent, useState } from 'react';

import { useRouter } from 'next/navigation';

import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

import { Button } from '@workspace/ui/components/button';

import { AnimatedInput, Divider, OAuth, PasswordInput } from '@/components/auth';

import { useFocusState } from '@/hooks/use-focus-state';

import { useAuthContext } from '@/lib/firebase/auth-context';

import { Dictionary } from '@/i18n/dictionaries/en';
import { useDictionary } from '@/hooks/use-dictionary';

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
      newErrors.email = dictionary?.auth.errors.emailRequired;
    }

    if (!password.trim()) {
      newErrors.password = dictionary?.auth.errors.passwordRequired;
    } else if (password.length < 6) {
      newErrors.password = dictionary?.auth.errors.passwordMin;
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
      const fallback = dictionary?.auth.errors.loginFailed;
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
      <AnimatedInput
        id="email"
        type="email"
        label={dictionary?.auth.email as string}
        placeholder={dictionary?.auth.emailPlaceholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        focused={isFocused('email')}
        onFocus={() => setFocused('email')}
        onBlur={clearFocus}
        error={errors.email}
      />
      <PasswordInput
        id="password"
        label={dictionary?.auth.password as string}
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        focused={isFocused('password')}
        onFocus={() => setFocused('password')}
        onBlur={clearFocus}
        showForgotPassword
        error={errors.password}
      />
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          className="group bg-primary hover:bg-primary/90 h-14 w-full cursor-pointer gap-2 rounded-2xl text-base font-medium transition-all"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="border-background h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
              {dictionary?.auth.connexion}
            </>
          ) : (
            <>
              {dictionary?.auth.continue}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </motion.div>
      <Divider text={dictionary?.auth.divider as string} />
      <OAuth text={dictionary?.auth.google as string} onClick={handleGoogleSignIn} />
    </form>
  );
}
