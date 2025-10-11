import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const OverviewCardSkeleton = () => (
  <Card className="bg-white border-slate-200/50">
    <CardContent className="p-6">
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="w-12 h-12 rounded-xl" />
      </div>
      <Skeleton className="h-4 w-24 mb-3" />
      <Skeleton className="h-10 w-32 mb-3" />
      <Skeleton className="h-4 w-28" />
    </CardContent>
  </Card>
);

export const AccountCardSkeleton = () => (
  <Card className="bg-white border-slate-200/50 p-6">
    <div className="mb-6 flex items-start justify-between">
      <div className="flex items-center gap-4">
        <Skeleton className="h-14 w-14 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
    
    <div className="mb-6">
      <Skeleton className="h-4 w-28 mb-2" />
      <Skeleton className="h-10 w-40 mb-2" />
      <Skeleton className="h-4 w-32" />
    </div>
    
    <Skeleton className="h-20 w-full rounded-xl mb-6" />
    
    <div className="flex gap-2">
      <Skeleton className="h-10 flex-1 rounded-lg" />
      <Skeleton className="h-10 w-10 rounded-lg" />
    </div>
  </Card>
);

export const AccountsSkeletons = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <OverviewCardSkeleton key={i} />
        ))}
      </div>

      {/* Account Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ animationDelay: `${i * 100}ms` }}>
            <AccountCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
};
