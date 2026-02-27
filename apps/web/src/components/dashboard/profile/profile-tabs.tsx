'use client';

import { motion } from 'motion/react';

import { cn } from '@workspace/ui/lib/utils';

import { Dictionary } from '@/i18n/dictionaries/en';

interface ProfileTabsProps {
  active: ProfileTabKey;
  dictionary: Dictionary | null;
  onChange: (key: ProfileTabKey) => void;
}

interface ProfileTabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const PROFILE_TAB_CONFIG: ReadonlyArray<{
  dictKey: keyof Dictionary['dashboard']['profile']['tabs'];
}> = [{ dictKey: 'all' }, { dictKey: 'prayers' }, { dictKey: 'testimonies' }, { dictKey: 'devotions' }] as const;

export type ProfileTabKey = (typeof PROFILE_TAB_CONFIG)[number]['dictKey'];

export function getProfileTabs(dictionary: Dictionary | null) {
  return PROFILE_TAB_CONFIG.map((t) => ({
    key: t.dictKey,
    label: dictionary?.dashboard.profile.tabs[t.dictKey] ?? t.dictKey,
  }));
}

export function ProfileTab({ label, isActive, onClick }: Readonly<ProfileTabProps>) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex-1 cursor-pointer py-4 text-sm font-medium transition-colors',
        isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
      )}
    >
      {label}
      {isActive && (
        <motion.span
          layoutId="activeTab"
          className="bg-primary absolute bottom-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </button>
  );
}

export function ProfileTabs({ active, dictionary, onChange }: Readonly<ProfileTabsProps>) {
  const tabs = getProfileTabs(dictionary);

  return (
    <div className="border-border border-b">
      <div className="flex">
        {tabs.map((tab) => (
          <ProfileTab key={tab.key} label={tab.label} isActive={active === tab.key} onClick={() => onChange(tab.key)} />
        ))}
      </div>
    </div>
  );
}
