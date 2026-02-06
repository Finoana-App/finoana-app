'use client';

import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { getPasswordRequirements } from './utils/password-strength';

interface PasswordRequirementsProps {
  password: string;
}

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const requirements = getPasswordRequirements(password);

  return (
    <div className="space-y-2 py-2">
      {requirements.map((req, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * index }}
          className="flex items-center gap-2"
        >
          <div
            className={`flex h-4 w-4 items-center justify-center rounded-full transition-colors ${
              req.met ? 'bg-primary' : 'bg-border'
            }`}
          >
            {req.met && <Check className="text-primary-foreground h-2.5 w-2.5" />}
          </div>
          <span className={`text-xs transition-colors ${req.met ? 'text-foreground' : 'text-muted-foreground'}`}>
            {req.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
