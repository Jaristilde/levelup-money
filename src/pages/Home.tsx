import { ArrowRight, TrendingUp, DollarSign, Target, Award, Lightbulb, Phone, ExternalLink, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MilestoneMap } from '@/components/MilestoneMap';

const Home = () => {
  const { t, language, setLanguage } = useLanguage();

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

  const creditBureaus = [
    {
      name: 'Equifax',
      phone: '1-800-685-1111',
      url: 'https://www.annualcreditreport.com',
      color: 'text-[#DA291C]',
    },
    {
      name: 'Experian',
      phone: '1-888-397-3742',
      url: 'https://www.annualcreditreport.com',
      color: 'text-[#003087]',
    },
    {
      name: 'TransUnion',
      phone: '1-800-916-8800',
      url: 'https://www.annualcreditreport.com',
      color: 'text-[#0094D9]',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            {t('welcomeTitle')}
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            {t('welcomeSubtitle')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.label} to={stat.link}>
                <Card className="hover:shadow-lg transition-all duration-300 border-border hover:border-primary/50 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
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

        {/* Credit Bureau Section */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {t('freeCreditReportTitle')}
              </h2>
              <p className="text-muted-foreground">
                {t('freeCreditReportSubtitle')}
              </p>
            </div>
            <Select value={language} onValueChange={(val) => setLanguage(val as 'en' | 'es')}>
              <SelectTrigger className="w-[180px] border-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">🇺🇸 English</SelectItem>
                <SelectItem value="es">🇪🇸 Español</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Credit Bureaus Table */}
          <Card className="border-2">
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {creditBureaus.map((bureau) => (
                  <div
                    key={bureau.name}
                    className="flex items-center justify-between p-4 md:p-6 gap-4 hover:bg-accent/5 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center flex-shrink-0">
                        <span className={`font-bold text-xl ${bureau.color}`}>
                          {bureau.name[0]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-lg ${bureau.color}`}>
                          {bureau.name}
                        </h3>
                        <a
                          href={`tel:${bureau.phone}`}
                          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                        >
                          <Phone className="w-3 h-3" />
                          {bureau.phone}
                        </a>
                      </div>
                    </div>
                    <Button
                      asChild
                      className="flex-shrink-0 bg-primary hover:bg-primary/90"
                    >
                      <a
                        href={bureau.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        {t('viewReport')}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Educational Notice */}
          <Card className="border-2 border-warning/30 bg-warning/5">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Lightbulb className="w-6 h-6 text-warning flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">
                    {t('didYouKnow')}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('legalNotice')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Money Milestone Map */}
        <MilestoneMap />
      </div>
    </div>
  );
};

export default Home;
