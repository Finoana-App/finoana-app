import { useMemo } from 'react';

import {
  getPasswordRequirements,
  getPasswordStrength,
  PASSWORD_STRENGTH_CONFIG,
} from '@/components/utils/password-strength';

export function usePasswordValidation(password: string) {
  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const requirements = useMemo(() => getPasswordRequirements(password), [password]);

  const strengthConfig = useMemo(() => PASSWORD_STRENGTH_CONFIG[strength], [strength]);

  const isValid = useMemo(() => {
    return requirements.every((req) => req.met);
  }, [requirements]);

  const isStrong = useMemo(() => strength >= 4, [strength]);

  return {
    strength,
    requirements,
    strengthLabel: strengthConfig?.label || '',
    strengthColor: strengthConfig?.color || '',
    isValid,
    isStrong,
  };
}
