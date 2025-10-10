import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const CreditScoreSkeleton = () => {
  return (
    <Card className="border-2 border-muted bg-gradient-to-br from-muted/5 to-background max-w-2xl mx-auto">
      <CardContent className="p-8 md:p-12 text-center">
        <Skeleton className="h-6 w-32 mx-auto mb-6" />
        <div className="relative inline-flex items-center justify-center mb-6">
          <Skeleton className="w-64 h-64 rounded-full" />
        </div>
        <Skeleton className="h-10 w-48 mx-auto mt-4" />
      </CardContent>
    </Card>
  );
};
