"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/contexts/language-context";

gsap.registerPlugin(ScrollTrigger);

export function Vision() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".vision-reveal",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        ".vision-card",
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".vision-cards",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const principles = [
    {
      title: "vision.principle1.title",
      desc: "vision.principle1.desc",
      icon: "◯",
    },
    {
      title: "vision.principle2.title",
      desc: "vision.principle2.desc",
      icon: "◇",
    },
    {
      title: "vision.principle3.title",
      desc: "vision.principle3.desc",
      icon: "△",
    },
  ];

  return (
    <section ref={sectionRef} id="vision" className="section bg-surface">
      <div className="container-docs">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <motion.span
            key={`vision-badge-${language}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="vision-reveal badge-mono"
          >
            {t("vision.badge")}
          </motion.span>

          <motion.h2
            key={`vision-title-${language}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="vision-reveal mt-6 text-balance"
          >
            {t("vision.title")}
          </motion.h2>
          <motion.p
            key={`vision-desc-${language}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="vision-reveal mt-6 text-lg text-muted-foreground leading-relaxed text-pretty"
          >
            {t("vision.description")}
          </motion.p>
        </div>
        <div className="vision-cards grid md:grid-cols-3 gap-6 md:gap-8">
          {principles.map((principle) => (
            <motion.div
              key={`${principle.title}-${language}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="vision-card doc-card group"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-2xl mb-4 block text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {principle.icon}
              </span>
              <h3 className="text-xl font-semibold mb-3">
                {t(principle.title)}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t(principle.desc)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
