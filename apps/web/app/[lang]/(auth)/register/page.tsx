import Link from 'next/link';

import { RegisterForm, RightSideWrapper } from '@/components/auth';

import { getDictionary, Locale } from '@/i18n';

export default async function RegisterPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  const dict = await getDictionary(lang);

  return (
    <RightSideWrapper title={dict.auth.joinUs} subtitle={dict.auth.registerSubtitle}>
      <RegisterForm />
      <p className="text-muted-foreground pt-4 text-center text-sm">
        {dict.auth.haveAccount}{' '}
        <Link href="/login" className="text-foreground underline-offset-4 hover:underline">
          {dict.auth.signin}
        </Link>
      </p>
    </RightSideWrapper>
  );
}
