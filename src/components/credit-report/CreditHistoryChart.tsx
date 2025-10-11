import { Card, CardContent } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const historyData = [
  { month: 'Jan 23', score: 650 },
  { month: 'Feb 23', score: 655 },
  { month: 'Mar 23', score: 665 },
  { month: 'Apr 23', score: 670 },
  { month: 'May 23', score: 675 },
  { month: 'Jun 23', score: 680 },
  { month: 'Jul 23', score: 685 },
  { month: 'Aug 23', score: 690 },
  { month: 'Sep 23', score: 695 },
  { month: 'Oct 23', score: 700 },
  { month: 'Nov 23', score: 705 },
  { month: 'Dec 23', score: 710 },
  { month: 'Jan 24', score: 715 },
  { month: 'Feb 24', score: 718 },
  { month: 'Mar 24', score: 720 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-4">
        <p className="text-sm font-semibold text-slate-900">{payload[0].payload.month}</p>
        <p className="text-2xl font-bold text-emerald-600 mt-1">{payload[0].value}</p>
        <p className="text-xs text-slate-500 mt-1">Credit Score</p>
      </div>
    );
  }
  return null;
};

export const CreditHistoryChart = () => {
  return (
    <Card className="bg-white border-slate-200/50 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900">Credit History Timeline</h3>
          <span className="text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full font-medium">
            Last 15 months
          </span>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historyData}>
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: '#94A3B8' }}
                stroke="#CBD5E1"
                tickLine={false}
              />
              <YAxis
                domain={[600, 750]}
                tick={{ fontSize: 12, fill: '#94A3B8' }}
                stroke="#CBD5E1"
                tickLine={false}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#10B981', strokeWidth: 2 }} />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#10B981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#scoreGradient)"
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">+70</p>
            <p className="text-xs text-slate-600 mt-1">Points gained</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">720</p>
            <p className="text-xs text-slate-600 mt-1">Current score</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">15</p>
            <p className="text-xs text-slate-600 mt-1">Months tracked</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
