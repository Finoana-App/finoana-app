'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';

import { Locale } from '@/i18n';
import { Dictionary } from '@/i18n/dictionaries/en';

export function Header({ currentLang, dict }: { currentLang: Locale; dict: Dictionary }) {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { key: 'vision', label: dict.nav?.vision || 'Vision', href: '#vision' },
    { key: 'features', label: dict.nav?.features || 'Features', href: '#features' },
    { key: 'architecture', label: dict.nav?.architecture || 'Architecture', href: '#architecture' },
    { key: 'values', label: dict.nav?.values || 'Values', href: '#values' },
  ];

  const switchLanguage = (locale: Locale) => {
    if (!pathname) return;

    const segments = pathname.split('/');
    segments[1] = locale;
    const newPath = segments.join('/');

    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;

    router.push(newPath);
  };

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
            href={`/${currentLang}`}
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
                {item.label}
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
                onClick={() => switchLanguage('en')}
                className={`lang-option cursor-pointer rounded-full ${
                  currentLang === 'en' ? 'active' : 'opacity-50 hover:opacity-75'
                }`}
                whileTap={{ scale: 0.95 }}
                layout
                aria-label="Switch to English"
              >
                🇺🇸
              </motion.button>
              <span className="text-border">/</span>
              <motion.button
                onClick={() => switchLanguage('fr')}
                className={`lang-option cursor-pointer rounded-full ${
                  currentLang === 'fr' ? 'active' : 'opacity-50 hover:opacity-75'
                }`}
                whileTap={{ scale: 0.95 }}
                layout
                aria-label="Switch to French"
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
