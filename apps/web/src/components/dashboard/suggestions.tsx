import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';

export const currentUser = {
  id: '1',
  name: 'Grace Emmanuel',
  username: 'graceemmanuel',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
  bio: "Walking by faith, not by sight. 🕊️ Sharing God's love one day at a time.",
  followers: 342,
  following: 128,
  joinedDate: 'March 2023',
};

export const users = [
  currentUser,
  {
    id: '2',
    name: 'Pastor David',
    username: 'pastordavid',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Shepherd of Grace Community Church. Teaching the Word with love.',
    followers: 2841,
    following: 312,
    joinedDate: 'January 2022',
  },
  {
    id: '3',
    name: 'Sarah Faith',
    username: 'sarahfaith',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Worship leader | Songwriter | Lover of Jesus',
    followers: 1204,
    following: 456,
    joinedDate: 'June 2022',
  },
  {
    id: '4',
    name: 'Brother James',
    username: 'brotherjames',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Youth ministry leader. Helping the next generation find their purpose in Christ.',
    followers: 892,
    following: 234,
    joinedDate: 'September 2022',
  },
  {
    id: '5',
    name: 'Mary Hope',
    username: 'maryhope',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    bio: "Mom of 3 | Women's ministry | Finding joy in everyday moments",
    followers: 567,
    following: 189,
    joinedDate: 'November 2022',
  },
];

export const suggestedUsers = users.slice(1, 4);

export function Suggestions() {
  return (
    <Card className="shadow-soft p-4">
      <h3 className="mb-4 text-sm font-semibold">People to Follow</h3>
      <div className="space-y-4">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="text-muted-foreground truncate text-xs">@{user.username}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground h-8 px-3 text-xs"
            >
              Follow
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
