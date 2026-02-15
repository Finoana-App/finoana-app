'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { getDictionary, Locale } from '@/i18n';

export function useDictionary<T>() {
  const pathname = usePathname();
  const lang = pathname.split('/')[1] as Locale;

  const [dictionary, setDictionary] = useState<T | null>(null);

  useEffect(() => {
    getDictionary(lang).then((dict) => setDictionary(dict as T));
  }, [lang]);

  return { dictionary, lang };
}
