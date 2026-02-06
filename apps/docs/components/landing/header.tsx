'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

import { useLanguage } from '@/contexts/language-context';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { key: 'nav.vision', href: '#vision' },
    { key: 'nav.features', href: '#features' },
    { key: 'nav.architecture', href: '#architecture' },
    { key: 'nav.values', href: '#values' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-background/80 border-border-subtle fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md"
    >
      <div className="container-docs">
        <nav className="flex h-16 items-center justify-between md:h-20">
          <motion.a
            href="#"
            className="flex items-center text-xl font-semibold tracking-tight"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src={
                theme === 'dark'
                  ? '/images/logo_finoana_v2_monochrome_light_stroke.png'
                  : '/images/logo_finoana_v2_monochrome_dark_stroke.png'
              }
              alt="Finoana"
              width={100}
              height={100}
              suppressHydrationWarning
            />
            <span className="hidden md:block">Finoana</span>
          </motion.a>
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a key={item.key} href={item.href} className="nav-link text-sm font-medium">
                {t(item.key)}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <motion.button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hover:bg-secondary cursor-pointer rounded-full p-2 transition-colors duration-200"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              <Sun className="hidden h-4 w-4 dark:block" />
              <Moon className="block h-4 w-4 dark:hidden" />
            </motion.button>
            <div className="lang-toggle">
              <motion.button
                onClick={() => setLanguage('en')}
                className={`lang-option cursor-pointer rounded-full ${language === 'en' ? 'active' : ''}`}
                whileTap={{ scale: 0.95 }}
                layout
              >
                🇺🇸
              </motion.button>
              <span className="text-border">/</span>
              <motion.button
                onClick={() => setLanguage('fr')}
                className={`lang-option cursor-pointer rounded-full ${language === 'fr' ? 'active' : ''}`}
                whileTap={{ scale: 0.95 }}
                layout
              >
                🇫🇷
              </motion.button>
            </div>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
