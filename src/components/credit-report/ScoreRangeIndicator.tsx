import { Card, CardContent } from '@/components/ui/card';

interface ScoreRangeIndicatorProps {
  score: number;
}

const ranges = [
  { min: 300, max: 579, label: 'Poor', color: 'bg-gradient-to-r from-red-100 to-red-200', textColor: 'text-red-700' },
  { min: 580, max: 669, label: 'Fair', color: 'bg-gradient-to-r from-orange-100 to-orange-200', textColor: 'text-orange-700' },
  { min: 670, max: 739, label: 'Good', color: 'bg-gradient-to-r from-yellow-100 to-yellow-200', textColor: 'text-yellow-700' },
  { min: 740, max: 799, label: 'Very Good', color: 'bg-gradient-to-r from-lime-100 to-lime-200', textColor: 'text-lime-700' },
  { min: 800, max: 850, label: 'Excellent', color: 'bg-gradient-to-r from-emerald-100 to-emerald-200', textColor: 'text-emerald-700' },
];

export const ScoreRangeIndicator = ({ score }: ScoreRangeIndicatorProps) => {
  const getCurrentRange = () => {
    return ranges.find(range => score >= range.min && score <= range.max);
  };

  const getScorePosition = () => {
    const totalRange = 850 - 300;
    const scoreOffset = score - 300;
    return (scoreOffset / totalRange) * 100;
  };

  const currentRange = getCurrentRange();
  const position = getScorePosition();

  return (
    <Card className="bg-white border-slate-200/50 shadow-lg">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Credit Score Range</h3>
        
        <div className="relative">
          {/* Range segments */}
          <div className="flex h-16 rounded-xl overflow-hidden border border-slate-200">
            {ranges.map((range, index) => (
              <div
                key={index}
                className={`flex-1 ${range.color} flex items-center justify-center text-xs font-semibold ${range.textColor} transition-all hover:scale-105 hover:z-10 cursor-pointer group relative`}
                title={`${range.label}: ${range.min}-${range.max}`}
              >
                <span className="hidden md:block">{range.label}</span>
                
                {/* Hover tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                  <div className="font-semibold">{range.label}</div>
                  <div className="text-slate-300">{range.min}-{range.max}</div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                </div>
              </div>
            ))}
          </div>

          {/* Current score marker */}
          <div
            className="absolute -top-8 transform -translate-x-1/2 transition-all duration-1000 ease-out"
            style={{ left: `${position}%` }}
          >
            <div className="relative flex flex-col items-center">
              <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-lg animate-pulse">
                {score}
              </div>
              <div className="w-0.5 h-20 bg-slate-900 mt-1" />
              <div className="w-3 h-3 bg-slate-900 rounded-full -mt-1 animate-pulse" />
            </div>
          </div>

          {/* Labels below */}
          <div className="flex justify-between mt-4 text-xs text-slate-600">
            <span className="font-medium">300</span>
            <span className="font-medium">850</span>
          </div>
        </div>

        {/* Current range info */}
        {currentRange && (
          <div className={`mt-6 p-4 rounded-xl ${currentRange.color} border border-slate-200`}>
            <p className={`text-sm font-semibold ${currentRange.textColor}`}>
              You're in the {currentRange.label} range ({currentRange.min}-{currentRange.max})
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
