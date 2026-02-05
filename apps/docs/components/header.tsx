"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { key: "nav.vision", href: "#vision" },
    { key: "nav.features", href: "#features" },
    { key: "nav.architecture", href: "#architecture" },
    { key: "nav.values", href: "#values" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border-subtle"
    >
      <div className="container-docs">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <motion.a
            href="#"
            className="text-xl font-semibold tracking-tight"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Finoana
          </motion.a>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="nav-link text-sm font-medium"
              >
                {t(item.key)}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg hover:bg-secondary transition-colors duration-200"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              <Sun className="w-4 h-4 hidden dark:block" />
              <Moon className="w-4 h-4 block dark:hidden" />
            </motion.button>
            <div className="lang-toggle">
              <motion.button
                onClick={() => setLanguage("en")}
                className={`lang-option ${language === "en" ? "active" : ""}`}
                whileTap={{ scale: 0.95 }}
                layout
              >
                EN
              </motion.button>
              <span className="text-border">/</span>
              <motion.button
                onClick={() => setLanguage("fr")}
                className={`lang-option ${language === "fr" ? "active" : ""}`}
                whileTap={{ scale: 0.95 }}
                layout
              >
                FR
              </motion.button>
            </div>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
