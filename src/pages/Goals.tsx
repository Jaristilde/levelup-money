import { useState } from 'react';
import { Target, Plus, CheckCircle2, TrendingUp, DollarSign, Home, Car, Plane, Shield, GraduationCap, Heart, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import confetti from 'canvas-confetti';

interface Goal {
  id: string;
  title: string;
  icon: 'home' | 'car' | 'plane' | 'shield' | 'graduation' | 'heart' | 'target' | 'dollar';
  target: number;
  current: number;
  targetDate: string;
  color: 'green' | 'blue' | 'orange' | 'purple' | 'pink' | 'yellow';
}

const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Emergency Fund',
      icon: 'shield',
      target: 5000,
      current: 2500,
      targetDate: 'Dec 2024',
      color: 'green'
    },
    {
      id: '2',
      title: 'Home Down Payment',
      icon: 'home',
      target: 50000,
      current: 15000,
      targetDate: 'Jan 2027',
      color: 'blue'
    },
    {
      id: '3',
      title: 'Become Debt Free',
      icon: 'target',
      target: 12450,
      current: 7470,
      targetDate: 'Nov 2026',
      color: 'orange'
    },
    {
      id: '4',
      title: 'Vacation Fund',
      icon: 'plane',
      target: 3000,
      current: 800,
      targetDate: 'Jun 2025',
      color: 'purple'
    }
  ]);

  const getIconComponent = (icon: Goal['icon']) => {
    const icons = {
      home: Home,
      car: Car,
      plane: Plane,
      shield: Shield,
      graduation: GraduationCap,
      heart: Heart,
      target: Target,
      dollar: DollarSign
    };
    return icons[icon];
  };

  const getColorClasses = (color: Goal['color']) => {
    const colors = {
      green: {
        bg: 'from-brand-green to-emerald-500',
        bgLight: 'bg-brand-green/10',
        border: 'border-brand-green/30',
        text: 'text-brand-green',
        shadow: 'shadow-brand-green/20'
      },
      blue: {
        bg: 'from-brand-blue to-brand-blue-light',
        bgLight: 'bg-brand-blue/10',
        border: 'border-brand-blue/30',
        text: 'text-brand-blue',
        shadow: 'shadow-brand-blue/20'
      },
      orange: {
        bg: 'from-orange-500 to-red-500',
        bgLight: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-600',
        shadow: 'shadow-orange-500/20'
      },
      purple: {
        bg: 'from-purple-500 to-pink-500',
        bgLight: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-600',
        shadow: 'shadow-purple-500/20'
      },
      pink: {
        bg: 'from-pink-500 to-rose-500',
        bgLight: 'bg-pink-50',
        border: 'border-pink-200',
        text: 'text-pink-600',
        shadow: 'shadow-pink-500/20'
      },
      yellow: {
        bg: 'from-brand-yellow to-amber-400',
        bgLight: 'bg-brand-yellow/10',
        border: 'border-brand-yellow/30',
        text: 'text-brand-yellow',
        shadow: 'shadow-brand-yellow/20'
      }
    };
    return colors[color];
  };

  const handleGoalClick = (goal: Goal) => {
    const progress = (goal.current / goal.target) * 100;
    if (progress >= 100) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2ECC71', '#10B981', '#14B8A6']
      });
    }
  };

  const totalSaved = goals.reduce((sum, goal) => sum + goal.current, 0);
  const totalTargets = goals.reduce((sum, goal) => sum + goal.target, 0);
  const overallProgress = (totalSaved / totalTargets) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 lg:pb-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <nav className="text-sm text-slate-500 mb-2 font-inter" aria-label="Breadcrumb">
                Home &gt; Goals
              </nav>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 font-poppins flex items-center gap-3">
                <Target className="w-8 h-8 text-brand-green" />
                Your Financial Milestones
              </h1>
              <p className="text-lg text-slate-600 font-inter">
                Track your progress and celebrate your wins
              </p>
            </div>

            <Button
              className="bg-brand-green hover:bg-brand-green/90 text-white shadow-lg font-semibold rounded-xl px-6"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Goal
            </Button>
          </div>
        </header>

        {/* Overall Progress Card */}
        <Card className="mb-8 p-6 rounded-3xl shadow-xl bg-gradient-to-br from-brand-green via-emerald-500 to-teal-500 border-0 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2 font-poppins">Overall Progress</h3>
              <p className="text-white/90 mb-4 font-inter">You're {overallProgress.toFixed(0)}% of the way to all your goals!</p>
              <div className="bg-white/20 rounded-full h-4 overflow-hidden backdrop-blur-sm">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
            <div className="flex gap-6 text-center">
              <div>
                <div className="text-4xl font-bold font-poppins">${(totalSaved / 1000).toFixed(1)}k</div>
                <div className="text-sm text-white/80 font-inter">Total Saved</div>
              </div>
              <div className="w-px bg-white/30"></div>
              <div>
                <div className="text-4xl font-bold font-poppins">{goals.length}</div>
                <div className="text-sm text-white/80 font-inter">Active Goals</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Goal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {goals.map((goal) => {
            const Icon = getIconComponent(goal.icon);
            const colorClasses = getColorClasses(goal.color);
            const progress = (goal.current / goal.target) * 100;
            const remaining = goal.target - goal.current;
            const isCompleted = progress >= 100;

            return (
              <Card
                key={goal.id}
                onClick={() => handleGoalClick(goal)}
                className={`p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 ${colorClasses.border} ${colorClasses.bgLight} relative overflow-hidden`}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 opacity-5">
                  <Icon className="w-32 h-32" />
                </div>

                {/* Completion Badge */}
                {isCompleted && (
                  <div className="absolute top-4 right-4 animate-bounce">
                    <Badge className="bg-gradient-to-r from-brand-green to-emerald-500 text-white border-0 shadow-lg">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Completed!
                    </Badge>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClasses.bg} flex items-center justify-center shadow-lg ${colorClasses.shadow} mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Goal Info */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-slate-900 mb-1 font-poppins">
                    {goal.title}
                  </h3>
                  <p className="text-sm text-slate-600 font-inter">
                    Target: <span className="font-semibold">${goal.target.toLocaleString()}</span> by {goal.targetDate}
                  </p>
                </div>

                {/* Progress Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700 font-inter">Progress</span>
                    <span className={`text-lg font-bold font-poppins ${colorClasses.text}`}>
                      {progress.toFixed(0)}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative">
                    <Progress
                      value={Math.min(progress, 100)}
                      className="h-3 bg-slate-200"
                    />
                    {isCompleted && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-brand-green animate-pulse" />
                      </div>
                    )}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-3">
                    <div className="bg-white rounded-xl p-3 border border-slate-200">
                      <p className="text-xs text-slate-600 mb-1 font-inter">Current</p>
                      <p className="text-lg font-bold text-slate-900 font-poppins">
                        ${goal.current.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200">
                      <p className="text-xs text-slate-600 mb-1 font-inter">Remaining</p>
                      <p className="text-lg font-bold text-slate-900 font-poppins">
                        ${remaining.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  className={`w-full mt-4 bg-gradient-to-r ${colorClasses.bg} text-white hover:opacity-90 shadow-lg ${colorClasses.shadow} font-semibold rounded-xl`}
                >
                  {isCompleted ? '🎉 Celebrate!' : 'Add Funds'}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Smart Recommendations Card */}
        <Card className="p-6 rounded-3xl shadow-lg bg-gradient-to-br from-brand-yellow/10 to-amber-100/20 border-2 border-brand-yellow/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-brand-yellow/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-brand-yellow" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-poppins">
                Smart Recommendation
              </h3>
              <p className="text-slate-700 mb-4 font-inter">
                Based on your spending, you could save an extra <span className="font-bold text-brand-green">$50/month</span> towards your Emergency Fund by reducing dining out expenses!
              </p>
              <Button
                variant="outline"
                className="border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-slate-900 font-semibold"
              >
                Accept Suggestion
              </Button>
            </div>
          </div>
        </Card>

        {/* Achievement Celebration - Full Screen */}
        {goals.some(g => (g.current / g.target) * 100 >= 100) && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div className="animate-pulse">
              <Sparkles className="w-32 h-32 text-brand-green opacity-20" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Goals;
