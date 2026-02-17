import { Calendar } from 'lucide-react';

import { User } from '@workspace/types';

import { formatJoinDate } from '@/components/utils/date-format';

type Props = { user: User };

export function UserMeta({ user }: Readonly<Props>) {
  if (!user.createdAt) return null;

  return (
    <div className="text-muted-foreground mb-4 flex flex-wrap gap-4 text-sm">
      <span className="flex items-center gap-1">
        <Calendar className="h-4 w-4" />
        Joined {formatJoinDate(user.createdAt)}
      </span>
    </div>
  );
}
