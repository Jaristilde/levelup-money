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
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <Card className="border-2 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <CardContent className="p-8 md:p-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('welcomeTitle')}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-6 max-w-3xl mx-auto">
              {t('welcomeSubtitle')}
            </p>
            <Link to="/milestones">
              <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg">
                {t('startJourney')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Financial Wellness Snapshot */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">{t('financialSnapshot')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Link key={stat.label} to={stat.link}>
                  <Card className="hover:shadow-lg transition-all duration-300 border-border hover:border-primary/50 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                          <Icon className={`w-8 h-8 ${stat.color}`} />
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        {stat.label}
                      </h3>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-bold text-foreground">
                          {stat.value}
                        </span>
                        {stat.change && (
                          <span className="text-sm font-medium text-success">
                            {stat.change}
                          </span>
                        )}
                      </div>
                      {stat.subtitle && (
                        <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
                      )}
                      {stat.progress !== undefined && (
                        <Progress value={stat.progress} className="h-2 mt-3" />
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
          <CardContent className="p-6">
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
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">{t('quickActions')}</h2>
          <Link to="/dispute-letter" className="block">
            <Button className="w-full justify-between h-14 text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all">
              <span>{t('generateDisputeLetter')}</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/chat" className="block">
            <Button variant="outline" className="w-full justify-between h-14 text-base border-2 hover:bg-accent/10 transition-all">
              <span className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                {t('askAIAssistant')}
              </span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
