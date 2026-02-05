"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import { useLanguage } from "@/contexts/language-context";

export function Footer() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();

  const currentYear = new Date().getFullYear();

  const links = [
    { key: "footer.links.about", href: "#" },
    { key: "footer.links.privacy", href: "#" },
    { key: "footer.links.terms", href: "#" },
    { key: "footer.links.contact", href: "#" },
  ];

  return (
    <footer className="py-16 md:py-24 border-t border-border">
      <div className="container-docs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <motion.span
              className="text-xl flex items-center gap-2 font-semibold tracking-tight"
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={
                  theme === "dark"
                    ? "/images/logo_finoana_v2_monochrome_light_stroke.png"
                    : "/images/logo_finoana_v2_monochrome_dark_stroke.png"
                }
                alt="Finoana"
                width={100}
                height={100}
              />
              Finoana
            </motion.span>
            <motion.p
              key={`footer-tagline-${language}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-sm text-muted-foreground"
            >
              {t("footer.tagline")}
            </motion.p>
          </div>
          <motion.nav
            key={`footer-nav-${language}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-6"
          >
            {links.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {t(link.key)}
              </a>
            ))}
          </motion.nav>
        </div>
        <div className="divider my-8" />
        <motion.p
          key={`footer-copyright-${language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-muted-foreground"
        >
          ©{currentYear} {t("footer.copyright")}
        </motion.p>
      </div>
    </footer>
  );
}
