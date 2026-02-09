'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@workspace/ui/components/button';

import { useFocusState } from '@/hooks/use-focus-state';

import { getDictionary, Locale } from '@/i18n';
import { Dictionary } from '@/i18n/dictionaries/en';

import { AnimatedInput } from '../animated-input';

interface ResetPasswordRequestProps {
  email: string;
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;
}

const containerVariants = {
  focused: { scale: 1.02, transition: { duration: 0.2 } },
  unfocused: { scale: 1, transition: { duration: 0.2 } },
};

export function ResetPasswordRequest({ email, isLoading, onEmailChange, onSubmit }: ResetPasswordRequestProps) {
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);

  const { setFocused, clearFocus, isFocused } = useFocusState();

  const pathname = usePathname();
  const lang = pathname.split('/')[1] as Locale;

  useEffect(() => {
    getDictionary(lang).then((dict) => {
      setDictionary(dict);
    });
  }, [lang]);

  return (
    <motion.form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex justify-center pb-4">
        <div className="bg-secondary flex h-20 w-20 items-center justify-center rounded-full">
          <Mail className="text-primary h-8 w-8" />
        </div>
      </div>
      <AnimatedInput
        id="email"
        type="email"
        label={dictionary?.auth.email as string}
        placeholder={dictionary?.auth.emailPlaceholder as string}
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        focused={isFocused('email')}
        onFocus={() => setFocused('email')}
        onBlur={clearFocus}
      />
      <Button type="submit" disabled={!email || isLoading} className="h-14 w-full rounded-2xl">
        {isLoading ? 'Sending…' : 'Send reset link'}
        {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
      <Link href="/login" className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
        <ArrowLeft className="h-4 w-4" />
        Back to sign in
      </Link>
    </motion.form>
  );
}
