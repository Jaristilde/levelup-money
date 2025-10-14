import { TrendingUp, Mountain, DollarSign, Calendar, Shield, Target, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { DebtPayoffRoadmap } from '@/components/debt/DebtPayoffRoadmap';

// Jess (29, Problem Aware) - Debt-Focused Dashboard
// Focus: Debt reduction journey with clear visualization and encouragement

export const JessDashboard = () => {
  const totalDebt = 22000;
  const paidOff = 3500;
  const debtProgress = (paidOff / totalDebt) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 lg:pb-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Header with Journey Theme */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-brand-green to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Mountain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-poppins">
                Hi Jess! Your Debt Payoff Journey
              </h1>
              <p className="text-lg text-slate-600 font-inter">Every payment is a step toward freedom 🎯</p>
            </div>
          </div>
        </header>

        {/* Hero Progress Card */}
        <Card className="mb-8 p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-brand-green via-emerald-500 to-teal-500 border-0 overflow-hidden relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
          </div>

          <div className="relative z-10">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <p className="text-white/90 text-sm mb-2 font-inter">You've Crushed</p>
                <p className="text-5xl font-bold text-white font-poppins">
                  ${paidOff.toLocaleString()}
                </p>
                <p className="text-white/80 text-sm mt-1 font-inter">of debt!</p>
              </div>
              <div className="text-center">
                <p className="text-white/90 text-sm mb-2 font-inter">Remaining</p>
                <p className="text-5xl font-bold text-white font-poppins">
                  ${(totalDebt - paidOff).toLocaleString()}
                </p>
                <p className="text-white/80 text-sm mt-1 font-inter">to go</p>
              </div>
              <div className="text-center">
                <p className="text-white/90 text-sm mb-2 font-inter">Progress</p>
                <p className="text-5xl font-bold text-white font-poppins">
                  {debtProgress.toFixed(0)}%
                </p>
                <p className="text-white/80 text-sm mt-1 font-inter">complete</p>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-1">
              <div
                className="bg-white h-4 rounded-xl transition-all duration-500 shadow-lg"
                style={{ width: `${debtProgress}%` }}
              />
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <Link to="/debt">
                <Button className="bg-white text-brand-green hover:bg-white/90 font-semibold px-8 shadow-lg">
                  View My Roadmap →
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Debt & Credit Focus */}
          <div className="lg:col-span-2 space-y-6">
            {/* Debt Payoff Roadmap */}
            <DebtPayoffRoadmap />

            {/* Credit Score with Trend */}
            <Link to="/credit-report">
              <Card className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1 font-poppins">
                      Your Credit Score
                    </h3>
                    <p className="text-sm text-slate-600 font-inter">On the Rise!</p>
                  </div>
                  <Shield className="w-10 h-10 text-brand-green" />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gradient-to-br from-brand-green/10 to-emerald-500/10 rounded-xl p-4 border border-brand-green/20">
                    <p className="text-sm text-slate-600 mb-2 font-inter">Current Score</p>
                    <p className="text-4xl font-bold text-slate-900 font-poppins">620</p>
                  </div>
                  <div className="bg-gradient-to-br from-brand-blue/10 to-brand-blue-light/10 rounded-xl p-4 border border-brand-blue/20">
                    <p className="text-sm text-slate-600 mb-2 font-inter">This Month</p>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-brand-green" />
                      <p className="text-4xl font-bold text-brand-green font-poppins">+8</p>
                    </div>
                  </div>
                </div>

                {/* Historical trend mini chart */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-end justify-between h-16 gap-2">
                    {[590, 600, 605, 610, 615, 620].map((score, index) => {
                      const height = ((score - 580) / 50) * 100;
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div
                            className="w-full bg-gradient-to-t from-brand-green to-emerald-400 rounded-t-lg transition-all duration-500"
                            style={{ height: `${height}%` }}
                          />
                          <span className="text-xs text-slate-500 mt-2 font-inter">{index === 5 ? 'Now' : ''}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Button className="w-full mt-4 bg-brand-green hover:bg-brand-green/90 text-white font-semibold">
                  Boost Your Score →
                </Button>
              </Card>
            </Link>

            {/* Budget Health */}
            <Link to="/budget">
              <Card className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1 font-poppins">
                      Budget Health
                    </h3>
                    <p className="text-sm text-brand-green font-semibold font-inter">On Track ✓</p>
                  </div>
                  <DollarSign className="w-10 h-10 text-brand-green" />
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 font-inter">Income vs Expenses</span>
                    <span className="text-sm font-bold text-brand-green font-inter">Surplus: $650</span>
                  </div>
                  <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="absolute h-full w-[75%] bg-gradient-to-r from-brand-green to-emerald-400 rounded-full" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1 font-inter">Monthly Income</p>
                    <p className="text-xl font-bold text-slate-900 font-poppins">$4,200</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1 font-inter">Expenses</p>
                    <p className="text-xl font-bold text-slate-900 font-poppins">$3,550</p>
                  </div>
                </div>

                <Button className="w-full mt-4 bg-brand-blue-light hover:bg-brand-blue text-white font-semibold">
                  Manage My Budget →
                </Button>
              </Card>
            </Link>
          </div>

          {/* Right Column - Support & Motivation */}
          <div className="space-y-6">
            {/* Emergency Fund Progress */}
            <Card className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-poppins">Emergency Fund</h3>
                  <p className="text-sm text-slate-600 font-inter">Building your safety net</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600 font-inter">Progress</span>
                  <span className="text-sm font-bold text-purple-600 font-inter">30%</span>
                </div>
                <Progress value={30} className="h-3 bg-slate-200 mb-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 font-inter">$1,500</span>
                  <span className="text-slate-600 font-inter">of $5,000</span>
                </div>
              </div>

              <Link to="/goals">
                <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold">
                  Add Funds
                </Button>
              </Link>
            </Card>

            {/* Supportive Quote */}
            <Card className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-brand-green/5 to-emerald-500/5 border-brand-green/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-green to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <blockquote className="text-lg font-semibold text-slate-900 mb-3 font-poppins italic">
                  "Every payment is a step closer to freedom"
                </blockquote>
                <p className="text-sm text-slate-600 font-inter">
                  Jess, you've already paid off <span className="font-bold text-brand-green">${paidOff.toLocaleString()}</span>.
                  That's incredible progress! Keep going! 💪
                </p>
              </div>
            </Card>

            {/* Next Payment Due */}
            <Card className="p-6 rounded-2xl shadow-lg border-2 border-brand-yellow/30 bg-gradient-to-br from-brand-yellow/5 to-amber-100/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-brand-yellow/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-brand-yellow" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-poppins">Upcoming Payment</h3>
                  <p className="text-sm text-slate-600 font-inter">Don't miss it!</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600 font-inter">Credit Card Minimum</span>
                  <span className="text-2xl font-bold text-slate-900 font-poppins">$150</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span className="font-inter">Due Date</span>
                  <span className="font-semibold font-inter">May 28, 2024</span>
                </div>
              </div>

              <Button className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-slate-900 font-semibold">
                Make Payment
              </Button>
            </Card>

            {/* AI Assistant for Debt Strategy */}
            <Card className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-brand-blue-light/10 to-brand-blue/5 border-brand-blue/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-blue-light rounded-full flex items-center justify-center">
                  <span className="text-xl">💬</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-poppins">Debt Strategy</h3>
              </div>
              <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                <p className="text-slate-700 text-sm font-inter">
                  "Jess, let's explore <span className="font-semibold text-brand-blue">debt consolidation options</span> that could save you money."
                </p>
              </div>
              <Link to="/chat">
                <Button className="w-full bg-brand-blue-light hover:bg-brand-blue text-white font-semibold">
                  Talk to AI Assistant
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
