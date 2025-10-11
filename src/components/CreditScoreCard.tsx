import { memo, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CreditScoreCardProps {
  score: number;
  change: number;
  maxScore: number;
  t: any;
}

// Optimized credit score card with memoization
export const CreditScoreCard = memo(({ score, change, maxScore, t }: CreditScoreCardProps) => {
  // Memoize expensive calculations
  const circumference = useMemo(() => 2 * Math.PI * 84, []);
  const circumferenceLarge = useMemo(() => 2 * Math.PI * 112, []);
  const strokeDasharray = useMemo(
    () => `${(score / maxScore) * circumference} ${circumference}`,
    [score, maxScore, circumference]
  );
  const strokeDasharrayLarge = useMemo(
    () => `${(score / maxScore) * circumferenceLarge} ${circumferenceLarge}`,
    [score, maxScore, circumferenceLarge]
  );

  return (
    <Card className="border-2 border-success/20 bg-gradient-to-br from-success/5 to-background max-w-2xl mx-auto">
      <CardContent className="p-6 md:p-12 text-center">
        <h2 className="text-lg md:text-xl font-semibold text-muted-foreground mb-4 md:mb-6">
          {t('creditScore')}
        </h2>
        <div 
          className="relative inline-flex items-center justify-center mb-4 md:mb-6"
          role="img"
          aria-label={`Credit score ${score} out of ${maxScore}, increased by ${change} points`}
        >
          <svg className="w-48 h-48 md:w-64 md:h-64 transform -rotate-90" aria-hidden="true">
...
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true">
            <span className="text-[80px] md:text-[120px] font-bold leading-none text-foreground">
              {score}
            </span>
            <span className="text-xl md:text-2xl font-medium text-success mt-1 md:mt-2">
              +{change}
            </span>
            <span className="text-xs md:text-sm text-muted-foreground mt-0.5 md:mt-1">
              / {maxScore}
            </span>
          </div>
        </div>
        <Link to="/credit-report">
          <Button variant="outline" size="lg" className="mt-2 md:mt-4 min-h-[44px]" aria-label="View your full credit report">
            View Full Report
            <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
});

CreditScoreCard.displayName = 'CreditScoreCard';
