import { TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', score: 650 },
  { month: 'Feb', score: 665 },
  { month: 'Mar', score: 680 },
  { month: 'Apr', score: 695 },
  { month: 'May', score: 705 },
  { month: 'Jun', score: 720 },
];

export const CreditScoreTracker = () => {
  const currentScore = 720;
  const maxScore = 850;
  const percentage = (currentScore / maxScore) * 100;
  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-slate-200/50 shadow-lg shadow-slate-900/5">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Credit Score Tracker</h3>
        
        {/* Circular Progress */}
        <div className="flex justify-center mb-8">
          <div className="relative w-[200px] h-[200px]">
            <svg className="transform -rotate-90" width="200" height="200">
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#14B8A6" />
                </linearGradient>
              </defs>
              <circle
                cx="100"
                cy="100"
                r="80"
                stroke="#E2E8F0"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                stroke="url(#scoreGradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-slate-900">{currentScore}</div>
              <div className="text-sm text-slate-600">/ {maxScore}</div>
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="h-[200px] mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="month" 
                stroke="#64748B" 
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#64748B" 
                style={{ fontSize: '12px' }}
                domain={[600, 800]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: '#10B981', r: 4 }}
                activeDot={{ r: 6 }}
                fill="url(#chartGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Progress Indicators */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span className="text-slate-700 font-medium">Excellent progress</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span className="text-slate-700 font-medium">On track to 750 by June</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
