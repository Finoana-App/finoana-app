'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@workspace/ui/components/button';
import { ArrowRight } from 'lucide-react';
import { Divider, OAuth, AnimatedInput, PasswordInputWithStrength } from '@/components/auth';
import { useFocusState } from '@/hooks/use-focus-state';

export function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setFocused, clearFocus, isFocused } = useFocusState();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AnimatedInput
        id="name"
        type="text"
        label="Full Name"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        focused={isFocused('name')}
        onFocus={() => setFocused('name')}
        onBlur={clearFocus}
      />
      <AnimatedInput
        id="email"
        type="email"
        label="Email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        focused={isFocused('email')}
        onFocus={() => setFocused('email')}
        onBlur={clearFocus}
      />
      <PasswordInputWithStrength
        id="password"
        label="Password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        focused={isFocused('password')}
        onFocus={() => setFocused('password')}
        onBlur={clearFocus}
      />
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          className="group bg-primary hover:bg-primary/90 h-14 w-full gap-2 rounded-2xl text-base font-medium transition-all"
        >
          Create Account
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
      <Divider />
      <OAuth />
    </form>
  );
}
