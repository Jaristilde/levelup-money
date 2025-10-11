import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const goals = [
  {
    name: 'Emergency Fund',
    progress: 70,
    color: 'bg-gradient-to-r from-emerald-500 to-teal-500',
  },
  {
    name: 'Pay off CC Debt',
    progress: 45,
    color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
  },
  {
    name: 'Save $10k',
    progress: 25,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
  },
];

export const GoalsProgress = () => {
  return (
    <Card className="bg-white border-slate-200/50 shadow-lg shadow-slate-900/5">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Goals Progress</h3>
        
        <div className="space-y-6">
          {goals.map((goal, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-900">{goal.name}</span>
                <span className="text-sm font-bold text-slate-600">{goal.progress}%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${goal.color} transition-all duration-1000 ease-out rounded-full`}
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
