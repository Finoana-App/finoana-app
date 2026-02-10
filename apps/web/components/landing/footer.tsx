'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';

import { motion } from 'motion/react';

import { Dictionary } from '@/i18n/dictionaries/en';

export function Footer({ dict }: Readonly<{ dict: Dictionary }>) {
  const { theme } = useTheme();

  const currentYear = new Date().getFullYear();

  const links = [
    { key: 'about', label: dict.footer.links.about, href: '#' },
    { key: 'privacy', label: dict.footer.links.privacy, href: '#' },
    { key: 'terms', label: dict.footer.links.terms, href: '#' },
    { key: 'contact', label: dict.footer.links.contact, href: '#' },
  ];

  return (
    <footer className="bg-foreground text-background border-border border-t py-16 md:py-24">
      <div className="container-docs">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <motion.span
              className="flex items-center gap-2 text-xl font-semibold tracking-tight"
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={
                  theme === 'dark'
                    ? '/images/logo_finoana_v2_monochrome_dark_stroke.png'
                    : '/images/logo_finoana_v2_monochrome_light_stroke.png'
                }
                alt="Finoana"
                width={100}
                height={100}
                suppressHydrationWarning
              />
              Finoana
            </motion.span>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-background mt-2 text-sm">
              {dict.footer.tagline}
            </motion.p>
          </div>
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap gap-6">
            {links.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-background hover:text-background/70 text-sm transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
        </div>
        <div className="divider my-8" />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-background text-sm">
          © {currentYear} {dict.footer.copyright}
        </motion.p>
      </div>
    </footer>
  );
}
