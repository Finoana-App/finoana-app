'use client';

import { useEffect, useRef, useState } from 'react';

import { useTheme } from 'next-themes';
import Image from 'next/image';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Apple, Play, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';

import { Dictionary } from '@/i18n/dictionaries/en';

gsap.registerPlugin(ScrollTrigger);

export function MobileDownload({ dict }: { dict: Dictionary }) {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll('.reveal-mobile');

    gsap.fromTo(
      elements,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section ref={sectionRef} id="mobile" className="bg-surface py-24 md:py-32">
      <div className="container-docs">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="reveal-mobile bg-background border-border mb-8 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium tracking-wide uppercase"
          >
            <Smartphone className="h-3.5 w-3.5" />
            {dict.mobile.badge}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="reveal-mobile mb-6 text-3xl font-light tracking-tight md:text-4xl lg:text-5xl"
          >
            {dict.mobile.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="reveal-mobile text-muted-foreground mx-auto mb-12 max-w-xl text-lg"
          >
            {dict.mobile.subtitle}
          </motion.p>
          <div className="reveal-mobile relative mb-12">
            <div className="bg-background border-foreground/20 relative mx-auto h-96 w-48 overflow-hidden rounded-[2.5rem] border-4 shadow-2xl">
              <div className="bg-surface absolute inset-3 flex flex-col items-center justify-center rounded-4xl">
                <Image
                  src={
                    theme === 'dark'
                      ? '/images/logo_finoana_v2_monochrome_light_stroke.png'
                      : '/images/logo_finoana_v2_monochrome_dark_stroke.png'
                  }
                  alt="Finoana"
                  width={100}
                  height={100}
                  suppressHydrationWarning
                />
                <span className="text-muted-foreground text-xs tracking-widest uppercase">
                  {dict.mobile.comingSoon}
                </span>
              </div>
              <div className="bg-foreground/20 absolute top-3 left-1/2 h-5 w-20 -translate-x-1/2 rounded-full" />
            </div>
            <div className="bg-foreground/5 absolute top-1/2 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
          </div>
          <div className="reveal-mobile mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="bg-background border-border flex cursor-not-allowed items-center gap-3 rounded-xl border px-6 py-3 opacity-60">
              <Apple className="h-6 w-6" />
              <div className="text-left">
                <span className="text-muted-foreground block text-[10px] tracking-wide uppercase">
                  {dict.mobile.comingSoon}
                </span>
                <span className="text-sm font-medium">{dict.mobile.ios}</span>
              </div>
            </div>
            <div className="bg-background border-border flex cursor-not-allowed items-center gap-3 rounded-xl border px-6 py-3 opacity-60">
              <Play className="h-6 w-6" />
              <div className="text-left">
                <span className="text-muted-foreground block text-[10px] tracking-wide uppercase">
                  {dict.mobile.comingSoon}
                </span>
                <span className="text-sm font-medium">{dict.mobile.android}</span>
              </div>
            </div>
          </div>
          <div className="reveal-mobile mx-auto max-w-md">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <Input
                  type="email"
                  placeholder={dict.mobile.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background border-border h-12 flex-1"
                  required
                />
                <Button type="submit" className="h-12 px-6">
                  {dict.mobile.notify}
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-background border-border rounded-lg border px-6 py-4"
              >
                <p className="text-muted-foreground text-sm">{dict.mobile.successMessage}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
