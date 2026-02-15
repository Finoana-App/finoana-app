'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@workspace/ui/lib/utils';

import { NAVIGATION } from './mobile-header';

export const BOTTOM_NAV = NAVIGATION.filter((item) =>
  ['Home', 'Explore', 'Notifications', 'Profile'].includes(item.name)
);

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="border-border bg-background/95 fixed inset-x-0 bottom-0 z-50 border-t px-2 py-2 backdrop-blur-md lg:hidden">
      <div className="flex items-center justify-around">
        {BOTTOM_NAV.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              aria-label={item.name}
              className={cn(
                'flex flex-col items-center gap-1 rounded-lg px-4 py-2',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
