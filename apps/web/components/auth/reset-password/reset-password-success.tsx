import Link from 'next/link';

import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@workspace/ui/components/button';

import { Dictionary } from '@/i18n/dictionaries/en';

interface ResetPasswordSuccessProps {
  email: string;
  onRetry: () => void;
  dictionary: Dictionary | null;
}

const containerVariants = {
  focused: { scale: 1.02, transition: { duration: 0.2 } },
  unfocused: { scale: 1, transition: { duration: 0.2 } },
};

export function ResetPasswordSuccess({ email, onRetry, dictionary }: ResetPasswordSuccessProps) {
  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      <div className="flex justify-center">
        <div className="bg-primary/10 flex h-24 w-24 items-center justify-center rounded-full">
          <CheckCircle2 className="text-primary h-12 w-12" />
        </div>
      </div>
      <div className="bg-secondary rounded-2xl p-4 text-center">
        <p className="text-xs tracking-wider uppercase">{dictionary?.auth.resetPassword.mailSentTo}</p>
        <p className="font-medium">{email}</p>
      </div>
      <Button variant="outline" onClick={onRetry} className="h-14 w-full rounded-2xl">
        {dictionary?.auth.resetPassword.tryAgain}
      </Button>
      <Link href="/login" className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
        <ArrowLeft className="h-4 w-4" />
        {dictionary?.auth.resetPassword.backToSignIn}
      </Link>
    </motion.div>
  );
}
