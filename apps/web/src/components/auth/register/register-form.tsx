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

export function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);

  const { setFocused, clearFocus, isFocused } = useFocusState();

  const { signInWithGoogle } = useAuthContext();

  const router = useRouter();

  const pathname = usePathname();
  const lang = pathname.split('/')[1] as Locale;

  useEffect(() => {
    getDictionary(lang).then((dict) => {
      setDictionary(dict);
    });
  }, [lang]);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ name, email, password });
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    try {
      await signInWithGoogle();
      router.push(`/${lang}/dashboard`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        toast.error(error.message, {
          description: errorMessage,
          position: 'top-center',
          duration: 5000,
        });
      } else {
        setErrorMessage('Google sign-in failed. Please try again.');
        toast.error('Something went wrong', {
          description: errorMessage,
          position: 'top-center',
          duration: 5000,
        });
      }
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
      />
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          className="group bg-primary hover:bg-primary/90 h-14 w-full gap-2 rounded-2xl text-base font-medium transition-all"
        >
          {dictionary?.auth.createAccount}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
      <Divider text={dictionary?.auth.divider as string} />
      <OAuth text={dictionary?.auth.google as string} onClick={handleGoogleSignIn} />
    </form>
  );
}
