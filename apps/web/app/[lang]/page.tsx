import { Header, Hero, Vision } from '@/components/landing';

import { getDictionary, Locale } from '@/i18n';

export default async function HomePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <section className="bg-background min-h-screen">
      <Header currentLang={lang} dict={dict} />
      <article>
        <Hero dict={dict} />
        <Vision dict={dict} />
      </article>
    </section>
  );
}
