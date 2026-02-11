'use client';

import { InputHTMLAttributes } from 'react';

import { motion } from 'motion/react';

import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';

interface AnimatedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  focused?: boolean;
  error?: string;
}

const inputVariants = {
  focused: { scale: 1.02, transition: { duration: 0.2 } },
  unfocused: { scale: 1, transition: { duration: 0.2 } },
};

export function AnimatedInput({
  id,
  label,
  focused = false,
  error,
  className = '',
  ...props
}: Readonly<AnimatedInputProps>) {
  return (
    <motion.div className="space-y-2" variants={inputVariants} animate={focused ? 'focused' : 'unfocused'}>
      <Label htmlFor={id} className="text-muted-foreground text-xs tracking-wider uppercase">
        {label}
      </Label>
      <Input
        id={id}
        className={`bg-secondary placeholder:text-muted-foreground/50 focus-visible:ring-primary/20 h-14 rounded-2xl border-0 px-5 text-base transition-all focus-visible:ring-1 ${className}`}
        {...props}
      />
      {error && <p className="text-destructive mt-1 text-xs">{error}</p>}
    </motion.div>
  );
}
