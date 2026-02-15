import { useState } from 'react';

/**
 * TODO: Implement reset password functionality
 */
export function useResetPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const submit = async () => {
    if (!email) return;

    setStatus('loading');
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('success');

    console.log('Password reset requested for:', email);
  };

  const reset = () => {
    setStatus('idle');
    setEmail('');
  };

  return {
    email,
    setEmail,
    status,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    submit,
    reset,
  };
}
