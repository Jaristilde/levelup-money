import { Target, AlertTriangle, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const insights = [
  {
    icon: Target,
    text: 'Your credit score increased 15 points this month - great work!',
    type: 'success',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    icon: AlertTriangle,
    text: 'Credit utilization is 45% - try keeping it under 30% for better scores.',
    type: 'warning',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    icon: Sparkles,
    text: "You're on track to reach your emergency fund goal by June!",
    type: 'info',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
];

export const PersonalizedInsights = () => {
  return (
    <Card className="bg-white border-slate-200/50 shadow-lg shadow-slate-900/5">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          💡 Personalized Insights
        </h3>
        
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl ${insight.bgColor} flex items-start gap-3`}
            >
              <insight.icon className={`w-5 h-5 ${insight.iconColor} flex-shrink-0 mt-0.5`} />
              <p className="text-sm text-slate-700 leading-relaxed">{insight.text}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
