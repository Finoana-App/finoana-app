import { Dictionary } from '@/i18n/dictionaries/en';

export interface PasswordRequirement {
  met: boolean;
  text: string;
}

export interface PasswordStrengthConfig {
  label: keyof Dictionary['auth']['passwordStrength'];
  color: string;
}

/**
 * Calculate password strength on a scale of 0-4
 * @param password - The password to evaluate
 * @returns Strength score (0-4)
 */
export function getPasswordStrength(password: string): number {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;

  return strength;
}

/**
 * Get password requirements with their current status
 * @param password - The password to evaluate
 * @returns Array of requirement objects
 */
export function getPasswordRequirements(password: string): PasswordRequirement[] {
  return [
    {
      met: password.length >= 8,
      text: 'At least 8 characters',
    },
    {
      met: /[A-Z]/.test(password),
      text: 'One uppercase letter',
    },
    {
      met: /\d/.test(password),
      text: 'One number',
    },
  ];
}

/**
 * Configuration for password strength levels
 */
export const PASSWORD_STRENGTH_CONFIG: PasswordStrengthConfig[] = [
  { label: 'none', color: 'bg-border' },
  { label: 'weak', color: 'bg-muted-foreground/30' },
  { label: 'fair', color: 'bg-muted-foreground/50' },
  { label: 'good', color: 'bg-muted-foreground/70' },
  { label: 'strong', color: 'bg-primary' },
];
