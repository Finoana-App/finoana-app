"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { useLanguage } from "@/contexts/language-context";

export function Hero() {
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-element",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.3,
        },
      );
      gsap.fromTo(
        ".hero-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.8,
        },
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center pt-20"
    >
      <div className="container-docs text-center">
        <motion.div
          key={`badge-${language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="hero-element"
        >
          <span className="badge-mono">{t("hero.badge")}</span>
        </motion.div>
        <motion.h1
          ref={titleRef}
          key={`title-${language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="hero-element mt-8 mb-6"
        >
          {t("hero.title")}
        </motion.h1>
        <div className="hero-element flex justify-center my-8">
          <div className="hero-line h-px w-24 bg-foreground origin-left" />
        </div>
        <motion.p
          ref={subtitleRef}
          key={`subtitle-${language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="hero-element max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          {t("hero.subtitle")}
        </motion.p>
        <motion.div
          key={`cta-${language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="hero-element flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <motion.a
            href="#features"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-foreground text-background font-medium rounded-lg transition-all duration-300 hover:bg-foreground/90"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t("hero.cta.primary")}
          </motion.a>
          <motion.a
            href="#architecture"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-border text-foreground font-medium rounded-lg transition-all duration-300 hover:border-foreground/40 hover:bg-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t("hero.cta.secondary")}
          </motion.a>
        </motion.div>
        <motion.div
          className="hero-element absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-px h-16 bg-linear-to-b from-transparent via-border to-border" />
        </motion.div>
      </div>
    </section>
  );
}
