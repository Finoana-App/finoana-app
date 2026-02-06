'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useLanguage } from '@/contexts/language-context';

gsap.registerPlugin(ScrollTrigger);

export function Architecture() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.arch-reveal',
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
        '.arch-block',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.arch-blocks',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const blocks = [
    {
      title: 'architecture.security.title',
      items: ['architecture.security.item1', 'architecture.security.item2', 'architecture.security.item3'],
    },
    {
      title: 'architecture.performance.title',
      items: ['architecture.performance.item1', 'architecture.performance.item2', 'architecture.performance.item3'],
    },
    {
      title: 'architecture.scale.title',
      items: ['architecture.scale.item1', 'architecture.scale.item2', 'architecture.scale.item3'],
    },
  ];

  return (
    <section ref={sectionRef} id="architecture" className="section bg-foreground text-background">
      <div className="container-docs">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <motion.span
            key={`arch-badge-${language}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="arch-reveal bg-background/10 text-background/80 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase"
          >
            {t('architecture.badge')}
          </motion.span>
          <motion.h2
            key={`arch-title-${language}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="arch-reveal mt-6 text-balance"
          >
            {t('architecture.title')}
          </motion.h2>
          <motion.p
            key={`arch-subtitle-${language}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="arch-reveal text-background/70 mt-4 text-lg"
          >
            {t('architecture.subtitle')}
          </motion.p>
        </div>
        <div className="arch-blocks grid gap-8 md:grid-cols-3 md:gap-12">
          {blocks.map((block) => (
            <motion.div
              key={`${block.title}-${language}`}
              className="arch-block"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="border-background/20 mb-6 border-b pb-4 text-xl font-semibold">{t(block.title)}</h3>
              <ul className="space-y-4">
                {block.items.map((item) => (
                  <li key={`${item}-${language}`} className="text-background/80 flex items-start gap-3">
                    <span className="text-background/40 mt-1.5 text-xs">●</span>
                    <span>{t(item)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <div className="bg-background/5 border-background/10 mt-16 rounded-lg border p-6 font-mono text-sm md:mt-24 md:p-8">
          <div className="text-background/40 mb-2">{`// system.config`}</div>
          <div className="text-background/80">
            <span className="text-background/50">encryption:</span> AES-256-GCM
          </div>
          <div className="text-background/80">
            <span className="text-background/50">auth:</span> zero-knowledge
          </div>
          <div className="text-background/80">
            <span className="text-background/50">availability:</span> 99.99%
          </div>
        </div>
      </div>
    </section>
  );
}
