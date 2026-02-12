'use client';

import { SubmitEvent, useEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

import { Button } from '@workspace/ui/components/button';

import { AnimatedInput, Divider, OAuth, PasswordInputWithStrength } from '@/components/auth';

import { useFocusState } from '@/hooks/use-focus-state';

import { useAuthContext } from '@/lib/firebase/auth-context';

import { getDictionary, Locale } from '@/i18n';
import { Dictionary } from '@/i18n/dictionaries/en';

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
  general?: string;
};

export function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);

  const { setFocused, clearFocus, isFocused } = useFocusState();

  const { loading, signUp, signInWithGoogle } = useAuthContext();

  const router = useRouter();

  const pathname = usePathname();
  const lang = pathname.split('/')[1] as Locale;

  useEffect(() => {
    getDictionary(lang).then((dict) => {
      setDictionary(dict);
    });
  }, [lang]);

  const validateForm = (): FieldErrors => {
    const newErrors: FieldErrors = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      await signUp({ email, password, displayName: name });
      router.push(`/${lang}/dashboard`);
    } catch (err: unknown) {
      const message = err instanceof Error && err.message ? err.message : 'Registration failed. Please try again.';

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
      router.push(`/${lang}/dashboard`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Google sign-in failed. Please try again.';

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
        id="name"
        type="text"
        label={dictionary?.auth.username as string}
        placeholder={dictionary?.auth.usernamePlaceholder as string}
        value={name}
        onChange={(e) => setName(e.target.value)}
        focused={isFocused('name')}
        onFocus={() => setFocused('name')}
        onBlur={clearFocus}
        error={errors.name}
      />
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
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          className="group bg-primary hover:bg-primary/90 h-14 w-full cursor-pointer gap-2 rounded-2xl text-base font-medium transition-all"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="border-background h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
              {dictionary?.auth.creatingAccount}
            </>
          ) : (
            <>
              {dictionary?.auth.createAccount}
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
