'use client';

import { motion } from 'motion/react';

import { getPasswordStrength, PASSWORD_STRENGTH_CONFIG } from '@/components/utils/password-strength';

import { Dictionary } from '@/i18n/dictionaries/en';

interface PasswordStrengthIndicatorProps {
  password: string;
  dictionary: Dictionary | null;
}

export function PasswordStrengthIndicator({ password, dictionary }: Readonly<PasswordStrengthIndicatorProps>) {
  if (!password) return null;

  const strength = getPasswordStrength(password);
  const config = PASSWORD_STRENGTH_CONFIG[strength];

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2 pt-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((level) => (
          <motion.div
            key={level}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: level * 0.1 }}
            className={`h-1 flex-1 rounded-full transition-colors ${strength >= level ? config?.color : 'bg-border'}`}
          />
        ))}
      </div>
      {config?.label && (
        <p className="text-muted-foreground text-xs">{dictionary?.auth.passwordStrength[config.label] || ''}</p>
      )}
    </motion.div>
  );
}
