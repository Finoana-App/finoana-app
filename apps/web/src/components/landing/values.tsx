'use client';

import { useEffect, useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';

import { Dictionary } from '@/i18n/dictionaries/en';

gsap.registerPlugin(ScrollTrigger);

export function Values({ dict }: Readonly<{ dict: Dictionary }>) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.values-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.value-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.values-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const values = [
    { title: dict.values.items.faith.title, desc: dict.values.items.faith.desc },
    { title: dict.values.items.simplicity.title, desc: dict.values.items.simplicity.desc },
    { title: dict.values.items.privacy.title, desc: dict.values.items.privacy.desc },
    { title: dict.values.items.community.title, desc: dict.values.items.community.desc },
  ];

  return (
    <section ref={sectionRef} id="values" className="section bg-surface">
      <div className="container-docs">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="values-reveal badge-mono">
            {dict.values.badge}
          </motion.span>
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="values-reveal mt-6 text-balance">
            {dict.values.title}
          </motion.h2>
        </div>
        <div className="values-grid mx-auto grid max-w-4xl gap-6 md:grid-cols-2 md:gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="value-card border-border bg-background group relative rounded-lg border p-8 md:p-10"
              whileHover={{
                borderColor: 'hsl(var(--foreground) / 0.2)',
                transition: { duration: 0.3 },
              }}
            >
              <span className="text-muted-foreground/20 group-hover:text-muted-foreground/30 absolute top-6 right-6 text-5xl font-light transition-colors duration-300">
                {(index + 1).toString().padStart(2, '0')}
              </span>

              <h3 className="mb-4 pr-12 text-xl font-semibold">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
