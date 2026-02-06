import { getPasswordRequirements, getPasswordStrength, PASSWORD_STRENGTH_CONFIG } from '@/components/auth/utils/password-strength';
import { useMemo } from 'react';

/**
 * Custom hook for password validation and strength calculation
 * 
 * @param password - The password to validate
 * @returns Object containing password validation results
 * 
 * @example
 * ```tsx
 * const { strength, requirements, strengthLabel, isValid } = usePasswordValidation(password);
 * ```
 */
export function usePasswordValidation(password: string) {
  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const requirements = useMemo(() => getPasswordRequirements(password), [password]);

  const strengthConfig = useMemo(() => PASSWORD_STRENGTH_CONFIG[strength], [strength]);

  const isValid = useMemo(() => {
    return requirements.every(req => req.met);
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
