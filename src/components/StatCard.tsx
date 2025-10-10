import { memo } from 'react';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface StatCardProps {
  stat: {
    icon: LucideIcon;
    label: string;
    value: string;
    subtitle?: string;
    progress?: number;
    link: string;
    color: string;
    bgColor: string;
  };
}

// Optimized stat card with memoization to prevent unnecessary re-renders
export const StatCard = memo(({ stat }: StatCardProps) => {
  const Icon = stat.icon;
  
  return (
    <Link to={stat.link}>
      <Card className="hover:shadow-xl transition-all duration-300 border-border hover:border-primary/50 h-full scale-95 md:scale-100">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <Icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <h3 className="text-xs font-medium text-muted-foreground mb-2">
            {stat.label}
          </h3>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-xl md:text-2xl font-bold text-foreground">
              {stat.value}
            </span>
          </div>
          {stat.subtitle && (
            <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
          )}
          {stat.progress !== undefined && (
            <Progress value={stat.progress} className="h-1.5 mt-2" />
          )}
        </CardContent>
      </Card>
    </Link>
  );
});

StatCard.displayName = 'StatCard';
