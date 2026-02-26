'use client';

import Link from 'next/link';

import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';
import { motion } from 'motion/react';

import { AnimatedButton, AnimatedInput } from '@/components/shared';

import { useFocusState } from '@/hooks/use-focus-state';

import { Dictionary } from '@/i18n/dictionaries/en';

interface ResetPasswordRequestProps {
  email: string;
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;
  dictionary: Dictionary | null;
}

const containerVariants = {
  focused: { scale: 1.02, transition: { duration: 0.2 } },
  unfocused: { scale: 1, transition: { duration: 0.2 } },
};

export function ResetPasswordRequest({
  email,
  isLoading,
  dictionary,
  onEmailChange,
  onSubmit,
}: Readonly<ResetPasswordRequestProps>) {
  const { setFocused, clearFocus, isFocused } = useFocusState();

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
        label={dictionary?.auth.fields.email}
        placeholder={dictionary?.auth.fields.emailPlaceholder}
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        focused={isFocused('email')}
        onFocus={() => setFocused('email')}
        onBlur={clearFocus}
      />
      <AnimatedButton
        type="submit"
        loading={isLoading}
        loadingText={dictionary?.auth.actions.sending}
        icon={<ArrowRight className="h-4 w-4" />}
        disabled={!email}
      >
        {dictionary?.auth.resetPassword.action}
      </AnimatedButton>
      <Link href="/login" className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
        <ArrowLeft className="h-4 w-4" />
        {dictionary?.auth.resetPassword.back}
      </Link>
    </motion.form>
  );
}
