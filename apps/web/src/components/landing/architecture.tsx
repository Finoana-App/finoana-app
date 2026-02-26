'use client';

import { useEffect, useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';

import { Dictionary } from '@/i18n/dictionaries/en';

gsap.registerPlugin(ScrollTrigger);

export function Architecture({ dict }: Readonly<{ dict: Dictionary }>) {
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
      id: 1,
      title: dict.architecture.sections.security.title,
      items: [
        dict.architecture.sections.security.items[0],
        dict.architecture.sections.security.items[1],
        dict.architecture.sections.security.items[2],
      ],
    },
    {
      id: 2,
      title: dict.architecture.sections.performance.title,
      items: [
        dict.architecture.sections.performance.items[0],
        dict.architecture.sections.performance.items[1],
        dict.architecture.sections.performance.items[2],
      ],
    },
    {
      id: 3,
      title: dict.architecture.sections.scale.title,
      items: [
        dict.architecture.sections.scale.items[0],
        dict.architecture.sections.scale.items[1],
        dict.architecture.sections.scale.items[2],
      ],
    },
  ];

  return (
    <section ref={sectionRef} id="architecture" className="section bg-foreground text-background">
      <div className="container-docs">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="arch-reveal bg-background/10 text-background/80 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase"
          >
            {dict.architecture.badge}
          </motion.span>
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="arch-reveal mt-6 text-balance">
            {dict.architecture.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="arch-reveal text-background/70 mt-4 text-lg"
          >
            {dict.architecture.subtitle}
          </motion.p>
        </div>
        <div className="arch-blocks grid gap-8 md:grid-cols-3 md:gap-12">
          {blocks.map((block) => (
            <motion.div key={block.id} className="arch-block" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <h3 className="border-background/20 mb-6 border-b pb-4 text-xl font-semibold">{block.title}</h3>
              <ul className="space-y-4">
                {block.items.map((item) => (
                  <li key={item} className="text-background/80 flex items-start gap-3">
                    <span className="text-background/40 mt-1.5 text-xs">●</span>
                    <span>{item}</span>
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
