import Link from 'next/link';

import { RegisterForm, RightSideWrapper } from '@/components/auth';

export default function RegisterPage() {
  return (
    <RightSideWrapper title="Join us." subtitle="Start your journey in faith today.">
      <RegisterForm />
      <p className="text-muted-foreground pt-4 text-center text-sm">
        Already have an account?{' '}
        <Link href="/login" className="text-foreground underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </RightSideWrapper>
  );
}
