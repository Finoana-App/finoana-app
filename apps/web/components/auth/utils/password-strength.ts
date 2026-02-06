export interface PasswordRequirement {
  met: boolean;
  text: string;
}

export interface PasswordStrengthConfig {
  label: string;
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
      text: 'At least 8 characters'
    },
    {
      met: /[A-Z]/.test(password),
      text: 'One uppercase letter'
    },
    {
      met: /\d/.test(password),
      text: 'One number'
    },
  ];
}

/**
 * Configuration for password strength levels
 */
export const PASSWORD_STRENGTH_CONFIG: PasswordStrengthConfig[] = [
  { label: '', color: 'bg-border' },
  { label: 'Weak', color: 'bg-muted-foreground/30' },
  { label: 'Fair', color: 'bg-muted-foreground/50' },
  { label: 'Good', color: 'bg-muted-foreground/70' },
  { label: 'Strong', color: 'bg-primary' },
];