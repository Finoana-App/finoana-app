import { Skeleton } from '@workspace/ui/components/skeleton';

export function BannerSkeleton() {
  return (
    <div className="relative">
      <div className="from-primary/20 to-accent/30 h-32 bg-linear-to-br sm:h-40" />
      <div className="px-4 pb-4 sm:px-5">
        <div className="-mt-12 mb-4 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
          <Skeleton className="border-background ring-primary/20 h-24 w-24 rounded-full border-4 ring-4 sm:h-32 sm:w-32" />
          <Skeleton className="h-9 w-32 rounded-md" />
        </div>
        <div className="mb-4 space-y-2">
          <Skeleton className="h-7 w-56 rounded" />
          <Skeleton className="h-5 w-64 rounded" />
        </div>
        <Skeleton className="mb-4 h-5 w-3/4 rounded" />
        <Skeleton className="h-5 w-44 rounded" />
      </div>
    </div>
  );
}
