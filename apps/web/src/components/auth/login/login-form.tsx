'use client';

import { SubmitEvent, useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@workspace/ui/components/button';

import { AnimatedInput, Divider, OAuth, PasswordInput } from '@/components/auth';

import { useFocusState } from '@/hooks/use-focus-state';

import { getDictionary, Locale } from '@/i18n';
import { Dictionary } from '@/i18n/dictionaries/en';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dictionnary, setDictionnary] = useState<Dictionary | null>(null);

  const { setFocused, clearFocus, isFocused } = useFocusState();

  const pathname = usePathname();
  const lang = pathname.split('/')[1] as Locale;

  useEffect(() => {
    getDictionary(lang).then((dict) => {
      setDictionnary(dict);
    });
  }, [lang]);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AnimatedInput
        id="email"
        type="email"
        label={dictionnary?.auth.email as string}
        placeholder={dictionnary?.auth.emailPlaceholder as string}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        focused={isFocused('email')}
        onFocus={() => setFocused('email')}
        onBlur={clearFocus}
      />
      <PasswordInput
        id="password"
        label={dictionnary?.auth.password as string}
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        focused={isFocused('password')}
        onFocus={() => setFocused('password')}
        onBlur={clearFocus}
        showForgotPassword
      />
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          className="group bg-primary hover:bg-primary/90 h-14 w-full gap-2 rounded-2xl text-base font-medium transition-all"
        >
          {dictionnary?.auth.continue as string}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
      <Divider text={dictionnary?.auth.divider as string} />
      <OAuth text={dictionnary?.auth.google as string} />
    </form>
  );
}
