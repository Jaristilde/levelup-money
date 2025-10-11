import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface CreditScoreHeroProps {
  score: number;
  maxScore?: number;
}

const getScoreColor = (score: number) => {
  if (score < 580) return { color: '#EF4444', label: 'POOR', gradient: 'from-red-400 to-red-500' };
  if (score < 670) return { color: '#F97316', label: 'FAIR', gradient: 'from-orange-400 to-orange-500' };
  if (score < 740) return { color: '#EAB308', label: 'GOOD', gradient: 'from-yellow-400 to-yellow-500' };
  if (score < 800) return { color: '#84CC16', label: 'VERY GOOD', gradient: 'from-lime-400 to-lime-500' };
  return { color: '#10B981', label: 'EXCELLENT', gradient: 'from-emerald-400 to-teal-500' };
};

const getSubtitle = (score: number) => {
  if (score < 580) return 'Work needed to improve';
  if (score < 670) return 'On track to Good';
  if (score < 740) return 'On track to Excellent';
  if (score < 800) return 'Almost at Excellent';
  return 'Outstanding credit!';
};

export const CreditScoreHero = ({ score, maxScore = 850 }: CreditScoreHeroProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const { color, label, gradient } = getScoreColor(score);
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = score / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  return (
    <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200/50 shadow-xl">
      <CardContent className="p-8 md:p-12">
        <div className="flex flex-col items-center">
          {/* Circular Progress Ring */}
          <div className="relative w-[280px] h-[280px] mb-8">
            <svg className="transform -rotate-90" width="280" height="280">
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={color} />
                </linearGradient>
              </defs>
              {/* Background ring */}
              <circle
                cx="140"
                cy="140"
                r="120"
                stroke="#E2E8F0"
                strokeWidth="20"
                fill="none"
              />
              {/* Progress ring */}
              <circle
                cx="140"
                cy="140"
                r="120"
                stroke="url(#scoreGradient)"
                strokeWidth="20"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-2000 ease-out"
                style={{ 
                  filter: 'drop-shadow(0 4px 12px rgba(16, 185, 129, 0.3))',
                }}
              />
            </svg>
            
            {/* Score Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div 
                className="text-7xl font-bold mb-2 transition-all duration-300"
                style={{ color }}
              >
                {animatedScore}
              </div>
              <div className="text-lg text-slate-500">/ {maxScore}</div>
            </div>
          </div>

          {/* Label and Subtitle */}
          <div className="text-center">
            <h2 
              className="text-3xl font-bold mb-2 tracking-wide"
              style={{ color }}
            >
              {label}
            </h2>
            <p className="text-lg text-slate-600">
              {getSubtitle(score)}
            </p>
          </div>

          {/* Score Range */}
          <div className="w-full mt-8 flex items-center justify-between text-sm text-slate-500">
            <span>300</span>
            <span>850</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
