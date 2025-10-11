import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const factors = [
  {
    name: 'Payment History',
    weight: 35,
    impact: 'High',
    percentage: 100,
    color: 'emerald',
  },
  {
    name: 'Amounts Owed',
    weight: 30,
    impact: 'High',
    percentage: 45,
    color: 'amber',
  },
  {
    name: 'Length of History',
    weight: 15,
    impact: 'Medium',
    percentage: 85,
    color: 'emerald',
  },
  {
    name: 'Credit Mix',
    weight: 10,
    impact: 'Low',
    percentage: 70,
    color: 'lime',
  },
  {
    name: 'New Credit',
    weight: 10,
    impact: 'Low',
    percentage: 60,
    color: 'yellow',
  },
];

const helpingFactors = [
  '100% on-time payments',
  'Credit history over 5 years',
  'Mix of credit types',
  'Low number of accounts',
];

const hurtingFactors = [
  'Credit utilization at 45% (aim for <30%)',
  '2 hard inquiries in last 6 months',
  'One account with high balance',
];

export const ScoreFactors = () => {
  return (
    <Card className="bg-white border-slate-200/50 shadow-lg">
      <CardContent className="p-6 md:p-8">
        <h3 className="text-xl font-bold text-slate-900 mb-6">What Affects Your Score</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT: Score Factors */}
          <div className="space-y-6">
            <h4 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
              Score Factors
            </h4>
            
            {factors.map((factor, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full bg-${factor.color}-500`} />
                    <span className="text-sm font-semibold text-slate-900">
                      {factor.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      factor.impact === 'High' ? 'bg-red-100 text-red-700' :
                      factor.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {factor.impact}
                    </span>
                    <span className="text-xs text-slate-500">{factor.weight}%</span>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 h-full bg-gradient-to-r from-${factor.color}-400 to-${factor.color}-500 transition-all duration-1000 ease-out rounded-full`}
                    style={{ width: `${factor.percentage}%` }}
                  />
                </div>
                
                <p className="text-xs text-slate-600">{factor.percentage}% optimal</p>
              </div>
            ))}
          </div>

          {/* RIGHT: Insights */}
          <div className="space-y-6">
            {/* What's Helping */}
            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
              <h4 className="text-sm font-semibold text-emerald-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                What's Helping
              </h4>
              <ul className="space-y-3">
                {helpingFactors.map((factor, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-emerald-800">
                    <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What's Hurting */}
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <h4 className="text-sm font-semibold text-amber-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                What's Hurting
              </h4>
              <ul className="space-y-3">
                {hurtingFactors.map((factor, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-amber-800">
                    <span className="text-amber-600 font-bold mt-0.5">⚠</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
