import { User } from '@workspace/types';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@workspace/ui/components/dialog';

import { FollowButton } from '@/components/shared';

import { useFollowUserList } from '@/lib/hooks/use-follow';

interface FollowingListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
}

export function FollowingListDialog({ open, onOpenChange, user }: Readonly<FollowingListDialogProps>) {
  const { data: following, isLoading } = useFollowUserList(user?.id, 'following');
  const followingList = following?.following ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader className="mb-4">
          <DialogTitle>Following</DialogTitle>
          <DialogDescription>Users followed by {user.displayName}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {followingList.map((user) => (
            <div key={user.id} className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.photoUrl ?? undefined} alt={user.displayName ?? ''} />
                <AvatarFallback>{user.displayName?.charAt(0) || user.username?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-foreground truncate text-sm leading-none font-semibold">{user.displayName}</p>
                <p className="text-muted-foreground truncate text-xs">@{user.username}</p>
              </div>
              <FollowButton userId={user.id} initialIsFollowing={true} />
            </div>
          ))}
          {!isLoading && followingList.length === 0 && (
            <p className="text-muted-foreground py-4 text-center text-sm">No following found.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
