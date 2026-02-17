import { Settings } from 'lucide-react';

import { User } from '@workspace/types';
import { Button } from '@workspace/ui/components/button';

import { UserAvatar } from './user-avatar';

type Props = { user: User };

export function UserIdentity({ user }: Readonly<Props>) {
  return (
    <div className="flex w-full items-end justify-between gap-4">
      <div className="flex flex-col items-start gap-4">
        <UserAvatar user={user} />
        <div>
          <h2 className="text-xl font-bold sm:text-2xl">{user.displayName || 'Anonymous User'}</h2>
          <p className="text-muted-foreground text-sm sm:text-base">@{user.username.replaceAll(/\s/g, '')}</p>
        </div>
      </div>
      <Button variant="outline" className="gap-2">
        <Settings className="h-4 w-4" />
        Edit Profile
      </Button>
    </div>
  );
}
