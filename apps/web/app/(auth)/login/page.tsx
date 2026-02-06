'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Divider, OAuth, RightSideWrapper } from '@/components/auth';

import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const inputVariants = {
    focused: { scale: 1.02, transition: { duration: 0.2 } },
    unfocused: { scale: 1, transition: { duration: 0.2 } },
  };

  return (
    <RightSideWrapper title="Welcome back." subtitle="Sign in to continue your journey.">
      <form action="" className="space-y-6">
        <motion.div
          className="space-y-2"
          variants={inputVariants}
          animate={focused === 'email' ? 'focused' : 'unfocused'}
        >
          <Label htmlFor="email" className="text-muted-foreground text-xs tracking-wider uppercase">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            className="bg-secondary placeholder:text-muted-foreground/50 focus-visible:ring-primary/20 h-14 rounded-2xl border-0 px-5 text-base transition-all focus-visible:ring-1"
          />
        </motion.div>
        <motion.div
          className="space-y-2"
          variants={inputVariants}
          animate={focused === 'password' ? 'focused' : 'unfocused'}
        >
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-muted-foreground text-xs tracking-wider uppercase">
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-muted-foreground hover:text-foreground text-xs transition-colors"
            >
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused(null)}
              className="bg-secondary placeholder:text-muted-foreground/50 focus-visible:ring-primary/20 h-14 rounded-2xl border-0 px-5 pr-14 text-base transition-all focus-visible:ring-1"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-5 -translate-y-1/2 transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </motion.div>
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
        <p className="text-muted-foreground pt-4 text-center text-sm">
          New here?{' '}
          <Link href="/register" className="text-foreground underline-offset-4 hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </RightSideWrapper>
  );
}
