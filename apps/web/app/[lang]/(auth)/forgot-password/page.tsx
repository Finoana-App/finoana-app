import { ResetPasswordForm, RightSideWrapper } from '@/components/auth';

import { getDictionary, Locale } from '@/i18n';

export default async function ForgotPasswordPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  const dict = await getDictionary(lang);

  return (
    <RightSideWrapper title={dict.auth.resetPassword.title} subtitle={dict.auth.resetPassword.subtitle}>
      <ResetPasswordForm />
    </RightSideWrapper>
  );
}
