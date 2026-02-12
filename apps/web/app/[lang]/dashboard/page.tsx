'use client';

import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@workspace/ui/components/button';

import { useAuthContext } from '@/lib/firebase/auth-context';

export default function Dashboard() {
  const { signOut } = useAuthContext();

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <h1>This should be a protected page</h1>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="button"
          className="group bg-primary hover:bg-primary/90 h-14 w-full gap-2 rounded-2xl text-base font-medium transition-all"
          onClick={() => signOut()}
        >
          Sign out
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </main>
  );
}
