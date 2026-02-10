'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ArrowLeft, Home } from 'lucide-react';
import { motion, type Transition } from 'motion/react';

import { Button } from '@workspace/ui/components/button';

interface NotFoundProps {
  redirect: string;
}

const EASE: Transition['ease'] = [0.25, 0.46, 0.45, 0.94];

const fadeScaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    duration: 0.6,
    ease: EASE,
  } satisfies Transition,
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    delay,
    ease: EASE,
  } satisfies Transition,
});

function AnimatedBlob({
  className,
  animate,
  transition,
}: Readonly<{
  className: string;
  animate: Record<string, number[]>;
  transition: Record<string, unknown>;
}>) {
  return (
    <motion.div className={`absolute rounded-full blur-3xl ${className}`} animate={animate} transition={transition} />
  );
}

export function NotFound({ redirect }: Readonly<NotFoundProps>) {
  const pathname = usePathname();

  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden p-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <AnimatedBlob
          className="bg-primary/2 top-1/4 left-1/4 h-64 w-64"
          animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <AnimatedBlob
          className="bg-primary/3 right-1/4 bottom-1/4 h-80 w-80"
          animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-md text-center">
        <motion.div {...fadeScaleIn} className="mb-8">
          <h1 className="text-foreground/10 text-[10rem] leading-none font-extralight tracking-tighter select-none md:text-[12rem]">
            404
          </h1>
        </motion.div>
        <motion.div {...fadeUp(0.2)} className="-mt-20 mb-8">
          <h2 className="text-foreground mb-3 text-2xl font-light tracking-tight md:text-3xl">Page not found</h2>
          <p className="text-muted-foreground leading-relaxed font-light">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </motion.div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-border mx-auto mb-8 h-px w-16"
        />
        <motion.div {...fadeUp(0.5)} className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild className="h-11 gap-2 rounded-full px-6">
            <Link href={redirect}>
              <Home className="h-4 w-4" />
              Go home
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground h-11 gap-2 rounded-full px-6"
            onClick={() => globalThis.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Button>
        </motion.div>
        {pathname && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-muted-foreground/60 mt-12 font-mono text-xs"
          >
            {pathname}
          </motion.p>
        )}
      </div>
    </div>
  );
}
