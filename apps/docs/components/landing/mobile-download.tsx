"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { useTheme } from "next-themes";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Smartphone, Apple, Play } from "lucide-react";

import { useLanguage } from "@/contexts/language-context";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function MobileDownload() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll(".reveal-mobile");

    gsap.fromTo(
      elements,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
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
      setEmail("");
    }
  };

  return (
    <section ref={sectionRef} id="mobile" className="py-24 md:py-32 bg-surface">
      <div className="container-docs">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            key={`mobile-badge-${language}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="reveal-mobile inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border text-xs font-medium tracking-wide uppercase mb-8"
          >
            <Smartphone className="w-3.5 h-3.5" />
            {t("mobile.badge")}
          </motion.div>
          <motion.h2
            key={`mobile-title-${language}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="reveal-mobile text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-6"
          >
            {t("mobile.title")}
          </motion.h2>
          <motion.p
            key={`mobile-subtitle-${language}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="reveal-mobile text-lg text-muted-foreground mb-12 max-w-xl mx-auto"
          >
            {t("mobile.subtitle")}
          </motion.p>
          <div className="reveal-mobile relative mb-12">
            <div className="relative mx-auto w-48 h-96 bg-background rounded-[2.5rem] border-4 border-foreground/20 shadow-2xl overflow-hidden">
              <div className="absolute inset-3 bg-surface rounded-4xl flex flex-col items-center justify-center">
                <Image
                  src={
                    theme === "dark"
                      ? "/images/logo_finoana_v2_monochrome_light_stroke.png"
                      : "/images/logo_finoana_v2_monochrome_dark_stroke.png"
                  }
                  alt="Finoana"
                  width={100}
                  height={100}
                  suppressHydrationWarning
                />
                <span className="text-xs text-muted-foreground uppercase tracking-widest">
                  {t("mobile.comingSoon")}
                </span>
              </div>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-foreground/20 rounded-full" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-foreground/5 rounded-full blur-3xl -z-10" />
          </div>
          <div className="reveal-mobile flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <div className="flex items-center gap-3 px-6 py-3 bg-background border border-border rounded-xl opacity-60 cursor-not-allowed">
              <Apple className="w-6 h-6" />
              <div className="text-left">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wide block">
                  {t("mobile.comingSoon")}
                </span>
                <span className="text-sm font-medium">{t("mobile.ios")}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-background border border-border rounded-xl opacity-60 cursor-not-allowed">
              <Play className="w-6 h-6" />
              <div className="text-left">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wide block">
                  {t("mobile.comingSoon")}
                </span>
                <span className="text-sm font-medium">
                  {t("mobile.android")}
                </span>
              </div>
            </div>
          </div>
          <div className="reveal-mobile max-w-md mx-auto">
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Input
                  type="email"
                  placeholder={t("mobile.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 bg-background border-border"
                  required
                />
                <Button type="submit" className="h-12 px-6">
                  {t("mobile.notify")}
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4 px-6 bg-background border border-border rounded-lg"
              >
                <p className="text-sm text-muted-foreground">
                  {language === "en"
                    ? "Thank you! We'll notify you when the app launches."
                    : "Merci ! Nous vous informerons du lancement de l'application."}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
