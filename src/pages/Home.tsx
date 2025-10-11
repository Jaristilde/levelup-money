import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { StatCard } from '@/components/StatCard';
import { CreditScoreTracker } from '@/components/dashboard/CreditScoreTracker';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { GoalsProgress } from '@/components/dashboard/GoalsProgress';
import { PersonalizedInsights } from '@/components/dashboard/PersonalizedInsights';

const Home = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: TrendingUp,
      label: 'Credit Score',
      value: '720',
      subtitle: '+15 ↑',
      link: '/credit-report',
      color: 'text-white',
      bgColor: 'from-emerald-400 to-teal-500',
    },
    {
      icon: TrendingDown,
      label: 'Total Debt',
      value: '$12,450',
      subtitle: '-$350 ↓',
      link: '/debt',
      color: 'text-white',
      bgColor: 'from-blue-400 to-cyan-500',
    },
    {
      icon: DollarSign,
      label: 'Savings',
      value: '$5,240',
      subtitle: '+$520 ↑',
      link: '/budget',
      color: 'text-white',
      bgColor: 'from-purple-400 to-pink-500',
    },
    {
      icon: Target,
      label: 'Goals Progress',
      value: '3/5',
      progress: 60,
      link: '/goals',
      color: 'text-white',
      bgColor: 'from-orange-400 to-red-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 lg:pb-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Header Section */}
        <header className="mb-8 md:mb-12">
          <nav className="text-sm text-slate-500 mb-4" aria-label="Breadcrumb">
            Home &gt; Dashboard
          </nav>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Welcome back, Alex
              </h1>
              <p className="text-base md:text-lg text-slate-600">
                Here's what's happening with your finances
              </p>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="mb-8 md:mb-12" aria-label="Financial statistics overview">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <StatCard stat={stat} />
              </div>
            ))}
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <CreditScoreTracker />
            <RecentActivity />
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6 md:space-y-8">
            <QuickActions />
            <GoalsProgress />
          </div>
        </div>

        {/* Insights Section */}
        <section aria-label="Personalized financial insights">
          <PersonalizedInsights />
        </section>
      </div>
    </div>
  );
};

export default Home;
