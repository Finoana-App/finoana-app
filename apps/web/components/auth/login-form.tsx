'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@workspace/ui/components/button';
import { ArrowRight } from 'lucide-react';

import { Divider, OAuth, AnimatedInput, PasswordInput } from '@/components/auth';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AnimatedInput
        id="email"
        type="email"
        label="Email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        focused={focused === 'email'}
        onFocus={() => setFocused('email')}
        onBlur={() => setFocused(null)}
      />
      <PasswordInput
        id="password"
        label="Password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        focused={focused === 'password'}
        onFocus={() => setFocused('password')}
        onBlur={() => setFocused(null)}
        showForgotPassword
      />
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          className="group bg-primary hover:bg-primary/90 h-14 w-full gap-2 rounded-2xl text-base font-medium transition-all"
        >
          Continue
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
      <Divider />
      <OAuth />
    </form>
  );
}
