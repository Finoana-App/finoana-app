'use client';

import { motion } from 'motion/react';

import { Label } from '@workspace/ui/components/label';
import { Input } from '@workspace/ui/components/input';

import { Divider, OAuth, RightSideWrapper } from '@/components/auth';
import { useState } from 'react';
import { ArrowRight, Check, Eye, EyeOff } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import Link from 'next/link';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focused, setFocused] = useState<string | null>(null);

  const getPasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^a-zA-Z0-9]/.test(pass)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);

  const strengthConfig = [
    { label: '', color: 'bg-border' },
    { label: 'Weak', color: 'bg-muted-foreground/30' },
    { label: 'Fair', color: 'bg-muted-foreground/50' },
    { label: 'Good', color: 'bg-muted-foreground/70' },
    { label: 'Strong', color: 'bg-primary' },
  ];

  const inputVariants = {
    focused: { scale: 1.02, transition: { duration: 0.2 } },
    unfocused: { scale: 1, transition: { duration: 0.2 } },
  };

  return (
    <RightSideWrapper title="Join us." subtitle="Start your journey in faith today.">
      <form action="">
        <motion.div
          className="space-y-2"
          variants={inputVariants}
          animate={focused === 'name' ? 'focused' : 'unfocused'}
        >
          <Label htmlFor="name" className="text-muted-foreground text-xs tracking-wider uppercase">
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused(null)}
            className="bg-secondary placeholder:text-muted-foreground/50 focus-visible:ring-primary/20 h-14 rounded-2xl border-0 px-5 text-base transition-all focus-visible:ring-1"
          />
        </motion.div>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <Label htmlFor="password" className="text-muted-foreground text-xs tracking-wider uppercase">
            Password
          </Label>
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
          {password && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2 pt-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((level) => (
                  <motion.div
                    key={level}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: level * 0.1 }}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      passwordStrength >= level ? strengthConfig[passwordStrength]?.color : 'bg-border'
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground text-xs">{strengthConfig[passwordStrength]?.label}</p>
            </motion.div>
          )}
        </motion.div>
        <div className="space-y-2 py-2">
          {[
            { met: password.length >= 8, text: 'At least 8 characters' },
            { met: /[A-Z]/.test(password), text: 'One uppercase letter' },
            { met: /\d/.test(password), text: 'One number' },
          ].map((req, index) => (
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
        <p className="text-muted-foreground pt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-foreground underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </RightSideWrapper>
  );
}
