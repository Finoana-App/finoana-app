import YouVersion from '@glowstudent/youversion';

import { Locale } from '@/i18n';

function mapLocaleToLanguage(locale: Locale) {
  switch (locale) {
    case 'fr':
      return 'fr,en';
    case 'en':
    default:
      return 'en';
  }
}

export async function getVerseOfTheDay(locale: Locale) {
  const language = mapLocaleToLanguage(locale);

  return YouVersion.getVerseOfTheDay(language);
}
