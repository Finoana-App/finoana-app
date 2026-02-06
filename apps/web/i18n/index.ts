export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'fr'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

const dictionaries = {
  en: () => import('./dictionaries/en').then((module) => module.en),
  fr: () => import('./dictionaries/fr').then((module) => module.fr),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};
