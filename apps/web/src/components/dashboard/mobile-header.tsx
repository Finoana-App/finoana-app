'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Bell, Bookmark, BookOpen, Heart, Home, Menu, PenSquare, Search, Settings, User, Users } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@workspace/ui/components/sheet';

import { currentUser } from '@/assets/mocks';

import { NavItem } from './nav-item';

export const NAVIGATION = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Explore', href: '/explore', icon: Search },
  { name: 'Notifications', href: '/notifications', icon: Bell, badge: 3 },
  { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
  { name: 'Community', href: '/community', icon: Users },
  { name: 'Devotionals', href: '/devotionals', icon: BookOpen },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function UserProfileLink({ onClick }: Readonly<{ onClick?: () => void }>) {
  return (
    <Link
      href="/profile"
      onClick={onClick}
      className="hover:bg-secondary flex items-center gap-3 rounded-lg px-3 py-2 transition-colors"
    >
      <Avatar className="ring-primary/20 h-10 w-10 ring-2">
        <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{currentUser.name}</p>
        <p className="text-muted-foreground truncate text-xs">@{currentUser.username}</p>
      </div>
    </Link>
  );
}

export function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-border bg-background/95 sticky top-0 z-50 flex items-center justify-between border-b px-4 py-3 backdrop-blur-md lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <div className="flex h-full flex-col px-4 py-6">
            <SheetTitle>
              <div className="mb-8 px-3">
                <h1 className="font-display text-primary flex items-center gap-2 text-2xl font-bold">
                  <Heart className="fill-primary h-6 w-6" />
                  Finoana
                </h1>
                <SheetDescription className="text-muted-foreground mt-1 text-xs">Faith in Community</SheetDescription>
              </div>
            </SheetTitle>
            <nav className="flex-1 space-y-1">
              {NAVIGATION.map((item) => (
                <NavItem key={item.name} item={item} onClick={() => setOpen(false)} />
              ))}
            </nav>
            <div className="border-border border-t pt-4">
              <UserProfileLink onClick={() => setOpen(false)} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/" className="flex items-center gap-2">
        <Heart className="text-primary fill-primary h-5 w-5" />
        <span className="font-display text-lg font-bold">Finoana</span>
      </Link>
      <Button variant="ghost" size="icon" aria-label="Create post">
        <PenSquare className="h-5 w-5" />
      </Button>
    </header>
  );
}
