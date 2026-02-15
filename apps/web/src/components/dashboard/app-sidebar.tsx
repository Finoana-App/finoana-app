'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';

import { LogOut, PenSquare } from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@workspace/ui/components/button';

import { useDictionary } from '@/hooks/use-dictionary';

import { useAuthContext } from '@/lib/firebase/auth-context';

import { Dictionary } from '@/i18n/dictionaries/en';

import { NAVIGATION, UserProfileLink } from './mobile-header';
import { NavItem } from './nav-item';

export function AppSidebar() {
  const { dictionary, lang } = useDictionary<Dictionary>();

  const { theme } = useTheme();

  const { signOut, loading } = useAuthContext();

  return (
    <aside className="sticky top-0 flex h-screen w-full flex-col px-4 py-6">
      <div className="mb-6 flex items-center gap-2 px-3">
        <Image
          src={
            theme === 'dark'
              ? '/images/logo_finoana_v2_monochrome_light_stroke.png'
              : '/images/logo_finoana_v2_monochrome_dark_stroke.png'
          }
          className="h-20 w-20"
          alt="Finoana"
          width={100}
          height={100}
          suppressHydrationWarning
        />
        <div className="flex flex-col">
          <h1 className="text-primary flex items-center gap-2 text-2xl font-bold">Finoana</h1>
          <p className="text-muted-foreground mt-1 text-xs">{dictionary?.dashboard.navigation.faithCommunity}</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        {NAVIGATION.map((item) => (
          <NavItem key={item.key} item={item} label={dictionary?.dashboard.navigation[item.key] || ''} lang={lang} />
        ))}
      </nav>
      <div className="my-6 space-y-2">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={() => console.log('Create post')}
            className="group bg-primary hover:bg-primary/90 h-14 w-full cursor-pointer gap-2 rounded-2xl text-base font-medium transition-all"
          >
            {dictionary?.dashboard.navigation.shareThought}
            <PenSquare className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={() => signOut()}
            className="group border-border text-primary hover:bg-secondary h-14 w-full cursor-pointer gap-2 rounded-2xl bg-transparent text-base font-medium transition-all"
            disabled={loading}
          >
            {dictionary?.dashboard.navigation.logout}
            <LogOut className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
      <div className="border-sidebar-border border-t pt-4">
        <UserProfileLink />
      </div>
    </aside>
  );
}
