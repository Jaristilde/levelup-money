import { ArrowRight, TrendingUp, DollarSign, Target, Award } from 'lucide-react';
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
    },
    {
      icon: DollarSign,
      label: t('monthlyBudget'),
      value: '$2,400',
      subtitle: '$600 left',
      link: '/budget',
      color: 'text-primary',
    },
    {
      icon: Target,
      label: t('debtPayoff'),
      value: '45%',
      progress: 45,
      link: '/debt',
      color: 'text-secondary',
    },
    {
      icon: Award,
      label: t('savingsGoal'),
      value: '$1,200',
      subtitle: 'of $3,000',
      link: '/goals',
      color: 'text-success',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t('welcomeTitle')}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t('welcomeSubtitle')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.label} to={stat.link}>
                <Card className="hover:shadow-lg transition-shadow border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.label}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold text-foreground">
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

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground mb-3">Quick Actions</h2>
          <Link to="/dispute-letter">
            <Button className="w-full justify-between bg-primary hover:bg-primary/90 text-primary-foreground">
              <span>Generate Dispute Letter</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/chat">
            <Button variant="outline" className="w-full justify-between">
              <span>Ask AI Assistant</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
