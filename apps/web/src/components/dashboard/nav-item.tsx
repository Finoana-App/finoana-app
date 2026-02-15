'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@workspace/ui/lib/utils';

export type NavigationKey = 'home' | 'profile' | 'settings';

export type NavItem = {
  key: NavigationKey;
  href: string;
  icon: React.ElementType;
  badge?: number;
};

interface NavItemProps {
  item: NavItem;
  label: string;
  lang: string;
  onClick?: () => void;
}

export function NavItem({ item, label, lang, onClick }: Readonly<NavItemProps>) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(item.href);

  return (
    <Link
      href={`/${lang}${item.href}`}
      onClick={onClick}
      aria-label={label}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all',
        isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-secondary'
      )}
    >
      <item.icon className="h-5 w-5" />
      <span>{label}</span>
      {item.badge && (
        <span className="bg-primary text-primary-foreground ml-auto rounded-full px-2 py-0.5 text-xs">
          {item.badge}
        </span>
      )}
    </Link>
  );
}
