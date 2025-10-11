import { TrendingUp, CreditCard, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const activities = [
  {
    icon: TrendingUp,
    label: 'Credit score updated',
    time: '2 hours ago',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
  },
  {
    icon: CreditCard,
    label: 'New account linked',
    time: 'Yesterday',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    icon: Target,
    label: 'Goal milestone reached',
    time: '3 days ago',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
];

export const RecentActivity = () => {
  return (
    <Card className="bg-white border-slate-200/50 shadow-lg shadow-slate-900/5">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Activity</h3>
        
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <div className={`w-10 h-10 rounded-xl ${activity.bgColor} flex items-center justify-center flex-shrink-0`}>
                <activity.icon className={`w-5 h-5 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900">{activity.label}</p>
                <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
