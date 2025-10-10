import { ArrowRight, TrendingUp, DollarSign, Target, Award, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

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
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-12">
        {/* Hero Section */}
        <Card className="border-2 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <CardContent className="p-12 md:p-16 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Improve Your Credit Score by 100+ Points in 90 Days
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-6 max-w-3xl mx-auto">
              Join 50,000+ people who achieved financial freedom
            </p>
            <Link to="/milestones">
              <Button 
                variant="success" 
                size="lg" 
                className="text-lg px-12 py-6 h-12 min-w-[200px] mt-6"
              >
                Start Free Assessment
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Credit Score - Primary Focus */}
        <div className="space-y-6">
          <Card className="border-2 border-success/20 bg-gradient-to-br from-success/5 to-background max-w-2xl mx-auto">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-xl font-semibold text-muted-foreground mb-6">
                {t('creditScore')}
              </h2>
              <div className="relative inline-flex items-center justify-center mb-6">
                {/* Progress Ring */}
                <svg className="w-64 h-64 transform -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="112"
                    stroke="hsl(var(--muted))"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="128"
                    cy="128"
                    r="112"
                    stroke="hsl(var(--success))"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${(650 / 850) * 703.72} 703.72`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[120px] font-bold leading-none text-foreground">
                    650
                  </span>
                  <span className="text-2xl font-medium text-success mt-2">+15</span>
                  <span className="text-sm text-muted-foreground mt-1">/ 850</span>
                </div>
              </div>
              <Link to="/credit-report">
                <Button variant="outline" size="lg" className="mt-4">
                  View Full Report
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Financial Wellness Snapshot */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">{t('financialSnapshot')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.slice(1).map((stat) => {
              const Icon = stat.icon;
              return (
                <Link key={stat.label} to={stat.link}>
                  <Card className="hover:shadow-xl transition-all duration-300 border-border hover:border-primary/50 h-full">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                          <Icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <h3 className="text-xs font-medium text-muted-foreground mb-2">
                        {stat.label}
                      </h3>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-2xl font-bold text-foreground">
                          {stat.value}
                        </span>
                      </div>
                      {stat.subtitle && (
                        <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                      )}
                      {stat.progress !== undefined && (
                        <Progress value={stat.progress} className="h-1.5 mt-2" />
                      )}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Journey Progress */}
        <Card className="border-2 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {t('journeyProgress')}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {t('overallCompletion')}: 2 {t('completedMilestones')} • 29%
            </p>
            <Progress value={29} className="h-3 mb-4" />
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {t('nextMilestone')}: <span className="font-medium text-foreground">Emergency Vault</span>
              </p>
              <Link to="/milestones">
                <Button variant="outline" size="sm">
                  {t('viewFullJourney')}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">{t('quickActions')}</h2>
          <Link to="/chat" className="block">
            <Button variant="outline" className="w-full justify-between h-12 text-base border-2 hover:bg-accent/10 transition-all">
              <span className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                {t('askAIAssistant')}
              </span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/dispute-letter" className="block">
            <Button variant="link" className="w-full justify-start h-10 text-base text-primary hover:text-primary/80">
              {t('generateDisputeLetter')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
