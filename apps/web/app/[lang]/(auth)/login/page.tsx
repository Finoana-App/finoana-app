import Link from 'next/link';

import { LoginForm, RightSideWrapper } from '@/components/auth';

import { getDictionary, Locale } from '@/i18n';

export default async function LoginPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  const dict = await getDictionary(lang);

  return (
    <RightSideWrapper title={dict.auth.welcomeBack} subtitle={dict.auth.loginSubtitle}>
      <LoginForm />
      <p className="text-muted-foreground pt-4 text-center text-sm">
        {dict.auth.newHere}{' '}
        <Link href={`/${lang}/register`} className="text-foreground underline-offset-4 hover:underline">
          {dict.auth.createAccount}
        </Link>
      </p>
    </RightSideWrapper>
  );
}
