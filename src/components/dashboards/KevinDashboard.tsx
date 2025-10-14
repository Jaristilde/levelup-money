import { TrendingUp, Award, Zap, Target, CheckCircle2, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import confetti from 'canvas-confetti';

// Kevin (24, Unaware) - Gamified Dashboard
// Focus: Simple, encouraging, gamified experience with clear next steps

export const KevinDashboard = () => {
  const currentLevel = 1;
  const levelProgress = 35;
  const totalPoints = 350;
  const nextLevelPoints = 1000;

  const handleQuestClick = (questId: string) => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-gray-50 to-white pb-20 lg:pb-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Gamified Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-green to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Star className="w-8 h-8 text-white" fill="white" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-brand-blue text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md font-poppins">
                  Lv.{currentLevel}
                </div>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-poppins">
                  Hello, Kevin! 🎮
                </h1>
                <p className="text-brand-blue text-lg font-semibold font-inter">
                  Level {currentLevel}: Starter Saver
                </p>
              </div>
            </div>
          </div>

          {/* Level Progress Bar */}
          <Card className="bg-gradient-to-r from-brand-green/10 to-emerald-400/10 border-brand-green/30 p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700 font-inter">
                Progress to Level 2
              </span>
              <span className="text-sm font-bold text-brand-green font-poppins">
                {totalPoints}/{nextLevelPoints} XP
              </span>
            </div>
            <Progress value={levelProgress} className="h-3 bg-slate-200" />
          </Card>
        </header>

        {/* Stats Grid - Large, Clear Numbers */}
        <section className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Credit Score Card - Primary Focus */}
            <Link to="/credit-report">
              <Card className="bg-gradient-to-br from-brand-green to-emerald-500 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-0">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white/90 text-sm mb-2 font-inter">Your Credit Score</p>
                    <p className="text-6xl font-bold text-white mb-2 font-poppins">580</p>
                    <div className="inline-block bg-brand-yellow text-slate-900 text-xs font-bold px-3 py-1 rounded-full font-inter">
                      Needs Work!
                    </div>
                  </div>
                  <TrendingUp className="w-10 h-10 text-white/80" />
                </div>
                <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-0 font-semibold font-inter">
                  Improve Now! →
                </Button>
              </Card>
            </Link>

            {/* Debt Snapshot */}
            <Link to="/debt">
              <Card className="bg-gradient-to-br from-brand-blue to-brand-blue-light p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-0">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white/90 text-sm mb-2 font-inter">Debt to Tackle</p>
                    <p className="text-5xl font-bold text-white mb-2 font-poppins">$12,500</p>
                    <p className="text-white/90 text-sm font-semibold font-inter">
                      💪 You've Got This!
                    </p>
                  </div>
                  <Target className="w-10 h-10 text-white/80" />
                </div>
                <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-0 font-semibold font-inter">
                  See Your Plan →
                </Button>
              </Card>
            </Link>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Quest Card */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-poppins">Current Quest</h3>
                  <p className="text-sm text-slate-600 font-inter">Complete to earn rewards!</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 mb-4 border-2 border-purple-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold text-slate-900 font-poppins">
                    🎯 Link Your First Account
                  </h4>
                  <Badge className="bg-brand-green text-white font-semibold">
                    +50 XP
                  </Badge>
                </div>
                <p className="text-slate-600 mb-4 font-inter">
                  Connect your bank account to see your full financial picture and unlock personalized insights!
                </p>
                <Progress value={65} className="h-3 bg-slate-200 mb-3" />
                <Button
                  onClick={() => handleQuestClick('link-account')}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600"
                >
                  Continue Quest →
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-3 border border-slate-200">
                  <p className="text-xs text-slate-500 mb-1 font-inter">Quest Points</p>
                  <p className="text-2xl font-bold text-brand-green font-poppins">50 XP</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-slate-200">
                  <p className="text-xs text-slate-500 mb-1 font-inter">Time Left</p>
                  <p className="text-2xl font-bold text-brand-blue font-poppins">2 Days</p>
                </div>
              </div>
            </Card>

            {/* Budgeting for Beginners */}
            <Link to="/budget">
              <Card className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br from-brand-gray-50 to-white border-2 border-brand-green/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-poppins">
                      This Month's "Safe to Spend"
                    </h3>
                    <p className="text-sm text-slate-600 font-inter">Money you can spend guilt-free!</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-brand-green to-emerald-500 rounded-2xl p-8 text-center shadow-lg mb-4">
                  <p className="text-white/90 text-sm mb-2 font-inter">Available Now</p>
                  <p className="text-6xl font-bold text-white font-poppins">$850</p>
                </div>

                <Button className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-semibold">
                  Track Spending →
                </Button>
              </Card>
            </Link>

            {/* Recent Activity - Simplified */}
            <Card className="p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-4 font-poppins">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { icon: CheckCircle2, text: "You checked your credit score!", points: "+10 XP", color: "text-brand-green" },
                  { icon: CheckCircle2, text: "Budget created for May 2024", points: "+25 XP", color: "text-brand-green" },
                  { icon: Star, text: "First badge earned: Account Explorer", points: "+50 XP", color: "text-brand-yellow" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <activity.icon className={`w-5 h-5 ${activity.color}`} />
                      <span className="text-slate-700 font-inter">{activity.text}</span>
                    </div>
                    <Badge className="bg-brand-green/10 text-brand-green border-0">
                      {activity.points}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Gamification & Quick Actions */}
          <div className="space-y-6">
            {/* Your Badges */}
            <Card className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-slate-50 to-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 font-poppins">Your Badges</h3>
                <Link to="/badges">
                  <Button variant="ghost" size="sm" className="text-brand-green hover:bg-brand-green/10">
                    View All
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { icon: "🎯", name: "First Budget", unlocked: true },
                  { icon: "🔗", name: "Account Linker", unlocked: true },
                  { icon: "📊", name: "Data Explorer", unlocked: true },
                  { icon: "❓", name: "Mystery", unlocked: false },
                  { icon: "❓", name: "Mystery", unlocked: false },
                  { icon: "❓", name: "Mystery", unlocked: false },
                ].map((badge, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center p-2 ${
                      badge.unlocked
                        ? 'bg-gradient-to-br from-brand-green to-emerald-500 shadow-lg'
                        : 'bg-slate-200'
                    }`}
                  >
                    <div className="text-3xl mb-1">{badge.icon}</div>
                    <p className={`text-[10px] text-center font-medium leading-tight ${
                      badge.unlocked ? 'text-white' : 'text-slate-400'
                    }`}>
                      {badge.name}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-brand-green/10 rounded-xl p-3 border border-brand-green/20">
                <p className="text-sm text-slate-700 font-inter">
                  <span className="font-bold text-brand-green">Next Level:</span> Novice Negotiator
                </p>
                <Progress value={35} className="h-2 bg-white mt-2" />
              </div>
            </Card>

            {/* AI Assistant Integration */}
            <Card className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-brand-blue-light/10 to-brand-blue/5 border-brand-blue/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-blue-light rounded-full flex items-center justify-center">
                  <span className="text-xl">💬</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-poppins">Need Help?</h3>
              </div>
              <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                <p className="text-slate-700 text-sm font-inter">
                  "Hey Kevin, need help understanding <span className="font-semibold text-brand-blue">'credit utilization'</span>?"
                </p>
              </div>
              <Link to="/chat">
                <Button className="w-full bg-brand-blue-light hover:bg-brand-blue text-white font-semibold">
                  Ask AI Assistant
                </Button>
              </Link>
            </Card>

            {/* Motivational Card */}
            <Card className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-green to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 font-poppins">
                  You're Doing Great!
                </h3>
                <p className="text-slate-600 text-sm font-inter leading-relaxed">
                  Every small step counts. Keep completing quests and watch your financial confidence grow! 🚀
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
