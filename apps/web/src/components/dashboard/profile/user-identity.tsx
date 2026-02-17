import { Settings, Shield, ShieldCheck, ShieldX } from 'lucide-react';

import { User } from '@workspace/types';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';

import { Dictionary } from '@/i18n/dictionaries/en';

import { UserAvatar } from './user-avatar';

interface UserIdentityProps {
  user: User;
  dictionary: Dictionary | null;
}

interface UserPrivacyBadgeProps {
  privacyLevel: User['privacyLevel'];
  dictionary: Dictionary | null;
}

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost';

export function UserPrivacyBadge({ privacyLevel, dictionary }: Readonly<UserPrivacyBadgeProps>) {
  const getBadgeVariant = (): { icon: React.ReactNode; variant: BadgeVariant; label: string } | null => {
    switch (privacyLevel) {
      case 'public':
        return {
          icon: <ShieldCheck className="h-3 w-3" />,
          variant: 'default',
          label: dictionary?.dashboard.profile.privacy.public ?? 'Public',
        };
      case 'private':
        return {
          icon: <Shield className="h-3 w-3" />,
          variant: 'secondary',
          label: dictionary?.dashboard.profile.privacy.private ?? 'Private',
        };
      case 'anonymous':
        return {
          icon: <ShieldX className="h-3 w-3" />,
          variant: 'destructive',
          label: dictionary?.dashboard.profile.privacy.anonymous ?? 'Anonymous',
        };
      default:
        return null;
    }
  };

  const badge = getBadgeVariant();
  if (!badge) return null;

  return (
    <Badge variant={badge.variant} className="gap-1">
      {badge.icon}
      <span>{badge.label}</span>
    </Badge>
  );
}

export function UserIdentity({ user, dictionary }: Readonly<UserIdentityProps>) {
  return (
    <div className="flex w-full items-end justify-between gap-4">
      <div className="flex flex-col items-start gap-4">
        <div className="relative">
          <UserAvatar user={user} />
        </div>
        <div className="flex flex-col items-start gap-5 lg:flex-row">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">{user.displayName}</h2>
            <p className="text-muted-foreground text-sm sm:text-base">@{user.username.replaceAll(/\s/g, '')}</p>
          </div>
          <UserPrivacyBadge privacyLevel={user.privacyLevel} dictionary={dictionary} />
        </div>
      </div>
      <Button variant="outline" className="gap-2">
        <Settings className="h-4 w-4" />
        {dictionary?.dashboard.profile.editProfile}
      </Button>
    </div>
  );
}
