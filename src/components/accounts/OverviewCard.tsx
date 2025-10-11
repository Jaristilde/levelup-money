import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface OverviewCardProps {
  title: string;
  amount: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  icon: LucideIcon;
  gradient: string;
}

export const OverviewCard = ({
  title,
  amount,
  change,
  changePercent,
  isPositive,
  icon: Icon,
  gradient,
}: OverviewCardProps) => {
  return (
    <Card className="group relative overflow-hidden bg-white border-slate-200/50 shadow-lg shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Background gradient blob */}
      <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${gradient} blur-3xl opacity-20`} />
      
      <CardContent className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-2">
          {title}
        </h3>
        
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-4xl font-bold text-slate-900">{amount}</span>
        </div>
        
        <div className={`flex items-center gap-1 text-sm font-semibold ${
          isPositive ? 'text-emerald-600' : 'text-red-600'
        }`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{change}</span>
          <span className="text-slate-500 font-normal">({changePercent})</span>
        </div>
      </CardContent>
    </Card>
  );
};
