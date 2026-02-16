'use client';

import { useDictionary } from '@/hooks/use-dictionary';
import { useFocusState } from '@/hooks/use-focus-state';

import { Dictionary } from '@/i18n/dictionaries/en';

import { AnimatedInput } from '../auth';

export function RightSidebar() {
  const { setFocused, clearFocus, isFocused } = useFocusState();

  const { dictionary } = useDictionary<Dictionary>();

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
    </aside>
  );
}
