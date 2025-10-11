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
    <Link to={stat.link} aria-label={`View ${stat.label}: ${stat.value}`}>
      <div className="group relative bg-white rounded-2xl border border-slate-200/50 p-6 shadow-lg shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.bgColor} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${stat.color}`} aria-hidden="true" />
          </div>
          {stat.subtitle && (
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              {stat.subtitle}
            </span>
          )}
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
          {stat.label}
        </p>
        <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
        {stat.progress !== undefined && (
          <div className="mt-4">
            <Progress value={stat.progress} className="h-2" aria-label={`Progress: ${stat.progress} percent`} />
          </div>
        )}
      </div>
    </Link>
  );
});

StatCard.displayName = 'StatCard';
