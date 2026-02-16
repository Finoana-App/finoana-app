import '@workspace/ui/globals.css';

import { NotFound as NotFoundComponent } from '@/components/not-found';

export default function NotFoundPage() {
  return <NotFoundComponent redirect="/" />;
}
