'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@workspace/ui/lib/utils';

import { useDictionary } from '@/hooks/use-dictionary';

import { Dictionary } from '@/i18n/dictionaries/en';

import { NAVIGATION } from './mobile-header';

export const BOTTOM_NAV = NAVIGATION.filter((item) =>
  ['Home', 'Explore', 'Notifications', 'Profile'].includes(item.key)
);

export function MobileBottomNav() {
  const pathname = usePathname();
  const { dictionary, lang } = useDictionary<Dictionary>();

  if (!dictionary) return null;

  const bottomItems = NAVIGATION.filter((item) => BOTTOM_NAV.includes(item));

  return (
    <nav className="border-border bg-background/95 fixed inset-x-0 bottom-0 z-50 border-t px-2 py-2 backdrop-blur-md lg:hidden">
      <div className="flex items-center justify-around">
        {bottomItems.map((item) => {
          const isActive = pathname.startsWith(`/${lang}${item.href}`);

          return (
            <Link
              key={item.key}
              href={`/${lang}${item.href}`}
              aria-label={dictionary.dashboard.navigation[item.key]}
              className={cn(
                'flex flex-col items-center gap-1 rounded-lg px-4 py-2',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{dictionary.dashboard.navigation[item.key]}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
