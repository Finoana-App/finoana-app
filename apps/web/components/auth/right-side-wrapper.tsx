'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import gsap from 'gsap';

interface RightSideWrapperProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function RightSideWrapper({ title, subtitle, children }: RightSideWrapperProps) {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(logoRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative flex flex-col justify-center"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="bg-primary/2 absolute top-10 right-10 h-32 w-32 rounded-full blur-2xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="bg-primary/3 absolute bottom-20 left-0 h-40 w-40 rounded-full blur-3xl"
          animate={{
            y: [0, 15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="bg-primary/2 absolute top-1/2 right-0 h-24 w-24 rounded-full blur-xl"
          animate={{
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>
      <div ref={logoRef} className="relative z-10 mb-12">
        <div className="mb-8 inline-flex items-center gap-2">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Heart className="fill-primary text-primary h-6 w-6" />
          </motion.div>
          <span className="text-lg font-medium tracking-tight">Finoana</span>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-3 text-4xl font-light tracking-tight md:text-5xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-muted-foreground text-lg font-light"
        >
          {subtitle}
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
