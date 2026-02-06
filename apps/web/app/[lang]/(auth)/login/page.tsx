import Link from 'next/link';

import { LoginForm, RightSideWrapper } from '@/components/auth';

export default function LoginPage() {
  return (
    <RightSideWrapper title="Welcome back." subtitle="Sign in to continue your journey.">
      <LoginForm />
      <p className="text-muted-foreground pt-4 text-center text-sm">
        New here?{' '}
        <Link href="/register" className="text-foreground underline-offset-4 hover:underline">
          Create an account
        </Link>
      </p>
    </RightSideWrapper>
  );
}
