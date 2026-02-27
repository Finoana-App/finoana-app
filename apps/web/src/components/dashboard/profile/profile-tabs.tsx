import { motion } from 'motion/react';

import { cn } from '@workspace/ui/lib/utils';

interface ProfileTabsProps {
  active: string;
  onChange: (t: string) => void;
}

const TABS = ['All', 'Prayers', 'Testimonies', 'Devotions'];

export function ProfileTabs({ active, onChange }: Readonly<ProfileTabsProps>) {
  return (
    <div className="border-border border-b">
      <div className="flex">
        {TABS.map((tab) => {
          const isActive = active === tab;
          return (
            <button
              key={tab}
              onClick={() => onChange(tab)}
              className={cn(
                'relative flex-1 cursor-pointer py-4 text-sm font-medium transition-colors',
                isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
              )}
            >
              {tab}
              {isActive && (
                <motion.span
                  layoutId="activeTab"
                  className="bg-primary absolute bottom-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
