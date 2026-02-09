import { RightSideWrapper } from '@/components/auth';
import { ResetPasswordForm } from '@/components/auth';

import { getDictionary, Locale } from '@/i18n';

export default async function ForgotPassword({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  const dict = await getDictionary(lang);

  return (
    <RightSideWrapper
      title={dict.auth.resetPassword.forgotPassword}
      subtitle={dict.auth.resetPassword.forgotPasswordSubtitle}
    >
      <ResetPasswordForm />
    </RightSideWrapper>
  );
}
