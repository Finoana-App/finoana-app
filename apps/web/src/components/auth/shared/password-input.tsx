'use client';

import { InputHTMLAttributes, useState } from 'react';

import Link from 'next/link';

import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';

import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';

import { useDictionary } from '@/hooks/use-dictionary';

import { Dictionary } from '@/i18n/dictionaries/en';

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  label: string;
  focused?: boolean;
  error?: string;
  showForgotPassword?: boolean;
  forgotPasswordHref?: string;
}

const inputVariants = {
  focused: { scale: 1.02, transition: { duration: 0.2 } },
  unfocused: { scale: 1, transition: { duration: 0.2 } },
};

export function PasswordInput({
  id,
  label,
  focused = false,
  error,
  showForgotPassword = false,
  forgotPasswordHref = '/forgot-password',
  className = '',
  ...props
}: Readonly<PasswordInputProps>) {
  const [showPassword, setShowPassword] = useState(false);
  const { dictionary } = useDictionary<Dictionary>();

  return (
    <motion.div className="space-y-2" variants={inputVariants} animate={focused ? 'focused' : 'unfocused'}>
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-muted-foreground text-xs tracking-wider uppercase">
          {label}
        </Label>
        {showForgotPassword && (
          <Link
            href={forgotPasswordHref}
            className="text-muted-foreground hover:text-foreground text-xs transition-colors"
          >
            {dictionary?.auth.resetPassword.forgot}
          </Link>
        )}
      </div>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? 'text' : 'password'}
          className={`bg-secondary placeholder:text-muted-foreground/50 focus-visible:ring-primary/20 h-14 rounded-2xl border-0 px-5 pr-14 text-base transition-all focus-visible:ring-1 ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-5 -translate-y-1/2 transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error && <p className="text-destructive mt-1 text-xs">{error}</p>}
    </motion.div>
  );
}
