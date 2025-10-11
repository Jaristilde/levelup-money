import { ArrowRight, TrendingUp, DollarSign, Target, Award, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CreditScoreCard } from '@/components/CreditScoreCard';
import { StatCard } from '@/components/StatCard';

const Home = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: TrendingUp,
      label: t('creditScore'),
      value: '650',
      change: '+15',
      link: '/credit-report',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      icon: DollarSign,
      label: t('monthlyBudget'),
      value: '$2,400',
      subtitle: '$600 left',
      link: '/budget',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Target,
      label: t('debtPayoff'),
      value: '45%',
      progress: 45,
      link: '/debt',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      icon: Award,
      label: t('savingsGoal'),
      value: '$1,200',
      subtitle: 'of $3,000',
      link: '/goals',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-4 py-4 md:py-6 space-y-8 md:space-y-12">
        {/* Hero Section */}
        <section aria-label="Welcome banner">
          <Card className="border-2 bg-gradient-to-br from-primary/10 via-background to-accent/10">
            <CardContent className="p-6 md:p-16 text-center">
              <h1 className="text-3xl md:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
                Improve Your Credit Score by 100+ Points in 90 Days
              </h1>
              <p className="text-muted-foreground text-sm md:text-xl mb-4 md:mb-6 max-w-3xl mx-auto">
                Join 50,000+ people who achieved financial freedom
              </p>
              <Link to="/milestones">
                <Button 
                  variant="success" 
                  size="lg" 
                  aria-label="Start your free credit assessment"
                  className="text-base md:text-lg px-8 md:px-12 h-12 min-w-[200px] mt-2 md:mt-6"
                >
                  Start Free Assessment
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* Credit Score - Primary Focus */}
        <section aria-label="Current credit score">
          <CreditScoreCard score={650} change={15} maxScore={850} t={t} />
        </section>

        {/* Financial Wellness Snapshot */}
        <section aria-labelledby="financial-snapshot-heading">
          <h2 id="financial-snapshot-heading" className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">
            {t('financialSnapshot')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6" role="list">
            {stats.slice(1).map((stat) => (
              <div key={stat.label} role="listitem">
                <StatCard stat={stat} />
              </div>
            ))}
          </div>
        </section>

        {/* Journey Progress */}
        <section aria-labelledby="journey-progress-heading">
          <Card className="border-2 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-4">
              <h3 id="journey-progress-heading" className="text-base md:text-lg font-semibold text-foreground mb-2">
                {t('journeyProgress')}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground mb-3">
                {t('overallCompletion')}: 2 {t('completedMilestones')} • 29%
              </p>
              <Progress value={29} className="h-3 mb-4" aria-label="Journey completion: 29 percent" />
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
                <p className="text-xs md:text-sm text-muted-foreground">
                  {t('nextMilestone')}: <span className="font-medium text-foreground">Emergency Vault</span>
                </p>
                <Link to="/milestones" className="w-full md:w-auto">
                  <Button variant="outline" size="sm" className="min-h-[44px] w-full md:w-auto" aria-label="View your full financial journey">
                    {t('viewFullJourney')}
                    <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Actions */}
        <section aria-labelledby="quick-actions-heading">
          <h2 id="quick-actions-heading" className="text-lg md:text-xl font-semibold text-foreground mb-4">
            {t('quickActions')}
          </h2>
          <div className="space-y-4">
            <Link to="/chat" className="block">
              <Button variant="outline" className="w-full justify-between min-h-[44px] md:h-12 text-sm md:text-base border-2 hover:bg-accent/10 transition-all" aria-label="Ask AI assistant for financial advice">
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" aria-hidden="true" />
                  {t('askAIAssistant')}
                </span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Button>
            </Link>
            <Link to="/dispute-letter" className="block">
              <Button variant="link" className="w-full justify-start min-h-[44px] text-sm md:text-base text-primary hover:text-primary/80" aria-label="Generate a credit report dispute letter">
                {t('generateDisputeLetter')}
                <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
