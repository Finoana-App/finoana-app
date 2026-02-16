'use client';

import { ReactNode } from 'react';

import { motion } from 'motion/react';

import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';

type AnimatedButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
};

export function AnimatedButton({
  children,
  icon,
  onClick,
  disabled,
  loading,
  loadingText,
  type = 'button',
  variant = 'primary',
}: Readonly<AnimatedButtonProps>) {
  const variantStyles =
    variant === 'primary'
      ? 'bg-primary hover:bg-primary/90 text-background'
      : 'border-border text-primary hover:bg-secondary bg-transparent';

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={cn(
          'group h-14 w-full cursor-pointer gap-2 rounded-2xl text-base font-medium transition-all',
          variantStyles
        )}
      >
        {loading ? (
          <>
            <span className="border-background h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
            {loadingText ?? children}
          </>
        ) : (
          <>
            {children}
            {icon && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
          </>
        )}
      </Button>
    </motion.div>
  );
}
