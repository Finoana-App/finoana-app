'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@workspace/ui/lib/utils';

export type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
};

export function NavItem({ item, onClick }: Readonly<{ item: NavItem; onClick?: () => void }>) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      onClick={onClick}
      aria-label={item.name}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all',
        isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-secondary'
      )}
    >
      <item.icon className="h-5 w-5" />
      <span>{item.name}</span>
      {item.badge && (
        <span className="bg-primary text-primary-foreground ml-auto rounded-full px-2 py-0.5 text-xs">
          {item.badge}
        </span>
      )}
    </Link>
  );
}
