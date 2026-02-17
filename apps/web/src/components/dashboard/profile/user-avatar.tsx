import { User } from '@workspace/types';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';

type Props = { user: User };

export function UserAvatar({ user }: Readonly<Props>) {
  return (
    <Avatar className="border-background ring-primary/20 h-24 w-24 border-4 ring-4 sm:h-32 sm:w-32">
      <AvatarImage src={user.photoUrl ?? undefined} alt={user.displayName ?? 'User avatar'} />
      <AvatarFallback className="bg-primary/10 text-primary text-2xl sm:text-3xl">
        {user.displayName?.charAt(0) ?? '?'}
      </AvatarFallback>
    </Avatar>
  );
}
