'use client';

import { motion } from 'motion/react';

export function LoadingScreen() {
  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="bg-primary/3 absolute top-1/3 left-1/3 h-80 w-80 rounded-full blur-3xl"
          animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="bg-primary/2 absolute right-1/3 bottom-1/3 h-64 w-64 rounded-full blur-3xl"
          animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          <motion.div
            className="border-border h-16 w-16 rounded-full border"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="bg-primary h-2 w-2 rounded-full"
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-border relative h-px w-32 overflow-hidden rounded-full"
        >
          <motion.div
            className="bg-primary/30 absolute inset-y-0 left-0 w-1/3 rounded-full"
            animate={{ x: ['-100%', '400%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-primary font-medium tracking-[0.3em] uppercase"
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}
