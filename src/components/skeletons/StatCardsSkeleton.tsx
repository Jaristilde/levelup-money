import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const StatCardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="h-full">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <Skeleton className="w-10 h-10 rounded-lg" />
              <Skeleton className="w-4 h-4" />
            </div>
            <Skeleton className="h-3 w-20 mb-2" />
            <Skeleton className="h-8 w-24 mb-2" />
            <Skeleton className="h-3 w-16" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
