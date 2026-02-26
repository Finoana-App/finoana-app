'use client';

import { useEffect, useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';

import { Dictionary } from '@/i18n/dictionaries/en';

gsap.registerPlugin(ScrollTrigger);

export function Vision({ dict }: Readonly<{ dict: Dictionary }>) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.vision-reveal',
        { opacity: 0, y: 50 },
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
        '.vision-card',
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.vision-cards',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const principles = [
    {
      title: dict.vision.principles.community.title,
      desc: dict.vision.principles.community.desc,
      icon: '◯',
    },
    {
      title: dict.vision.principles.scripture.title,
      desc: dict.vision.principles.scripture.desc,
      icon: '◇',
    },
    {
      title: dict.vision.principles.accessible.title,
      desc: dict.vision.principles.accessible.desc,
      icon: '△',
    },
  ];

  return (
    <section ref={sectionRef} id="vision" className="section bg-surface">
      <div className="container-docs">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="vision-reveal badge-mono">
            {dict.vision.badge}
          </motion.span>
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="vision-reveal mt-6 text-balance">
            {dict.vision.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="vision-reveal text-muted-foreground mt-6 text-lg leading-relaxed text-pretty"
          >
            {dict.vision.description}
          </motion.p>
        </div>
        <div className="vision-cards grid gap-6 md:grid-cols-3 md:gap-8">
          {principles.map((principle) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="vision-card doc-card group"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-muted-foreground group-hover:text-foreground mb-4 block text-2xl transition-colors duration-300">
                {principle.icon}
              </span>
              <h3 className="mb-3 text-xl font-semibold">{principle.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{principle.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
