'use client';

import { useEffect, useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';

import { Dictionary } from '@/i18n/dictionaries/en';

gsap.registerPlugin(ScrollTrigger);

export function Features({ dict }: Readonly<{ dict: Dictionary }>) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.feature-header',
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
        '.feature-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: dict.features.items.prayer.title,
      desc: dict.features.items.prayer.desc,
      number: '01',
    },
    {
      title: dict.features.items.testimony.title,
      desc: dict.features.items.testimony.desc,
      number: '02',
    },
    {
      title: dict.features.items.groups.title,
      desc: dict.features.items.groups.desc,
      number: '03',
    },
    {
      title: dict.features.items.resources.title,
      desc: dict.features.items.resources.desc,
      number: '04',
    },
    {
      title: dict.features.items.moments.title,
      desc: dict.features.items.moments.desc,
      number: '05',
    },
    {
      title: dict.features.items.safe.title,
      desc: dict.features.items.safe.desc,
      number: '06',
    },
  ];

  return (
    <section ref={sectionRef} id="features" className="section">
      <div className="container-docs">
        <div className="mb-16 max-w-3xl md:mb-24">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="feature-header badge-mono">
            {dict.features.header.badge}
          </motion.span>
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="feature-header mt-6 text-balance">
            {dict.features.header.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="feature-header text-muted-foreground mt-4 text-lg"
          >
            {dict.features.header.subtitle}
          </motion.p>
        </div>
        <div className="features-grid bg-border grid gap-px overflow-hidden rounded-lg md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <motion.div
              key={feature.number}
              className="feature-item bg-background group cursor-default p-8 md:p-10"
              whileHover={{ backgroundColor: 'hsl(var(--surface))' }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-muted-foreground text-xs font-medium tracking-wider">{feature.number}</span>
              <h3 className="mt-4 mb-3 text-xl font-semibold transition-transform duration-300 group-hover:translate-x-1">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
