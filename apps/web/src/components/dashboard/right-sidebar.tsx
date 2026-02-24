'use client';

import { VerseOfTheDay as VerseOfTheDayType } from '@workspace/types';

import { Suggestions, VerseOfTheDay } from '@/components/dashboard';
import { AnimatedInput } from '@/components/shared';

import { useDictionary } from '@/hooks/use-dictionary';
import { useFocusState } from '@/hooks/use-focus-state';

import { Dictionary } from '@/i18n/dictionaries/en';

export function RightSidebar({ verse }: Readonly<{ verse: VerseOfTheDayType }>) {
  const { setFocused, clearFocus, isFocused } = useFocusState();

  const { dictionary } = useDictionary<Dictionary>();

  const currentYear = new Date().getFullYear();

  return (
    <aside className="bg-background scrollbar-peaceful sticky top-0 h-screen w-80 overflow-y-auto px-4 py-6">
      <div className="mb-6">
        <AnimatedInput
          placeholder={dictionary?.dashboard.searchPlaceholder}
          id="search"
          focused={isFocused('search')}
          onFocus={() => setFocused('search')}
          onBlur={clearFocus}
        />
      </div>
      <VerseOfTheDay title={dictionary?.dashboard.verseOfTheDayTitle as string} verse={verse} />
      <Suggestions />
      <div className="mt-6 px-2">
        <p className="text-muted-foreground text-xs leading-relaxed">{dictionary?.dashboard.rightSidebarFooter}</p>
        <p className="text-muted-foreground mt-2 text-xs">© {currentYear} Finoana</p>
      </div>
    </aside>
  );
}
