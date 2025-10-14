import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mountain, Check, Flag, TrendingDown, Calendar, DollarSign, HelpCircle, Zap, Target } from "lucide-react";
import { useState } from "react";
import confetti from "canvas-confetti";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface Milestone {
  id: string;
  title: string;
  amount: number;
  completed: boolean;
  date?: Date;
  icon: string;
}

type PayoffMethod = 'snowball' | 'avalanche';

export const DebtPayoffRoadmap = () => {
  const navigate = useNavigate();
  const [payoffMethod, setPayoffMethod] = useState<PayoffMethod>('snowball');
  const [showMethodInfo, setShowMethodInfo] = useState(false);

  // Mock data - in production, this would come from user's actual debt data
  const totalDebt = 12450;
  const paidOff = 4350;
  const remaining = totalDebt - paidOff;
  const percentComplete = (paidOff / totalDebt) * 100;

  // Calculate days until debt-free (assuming average $350/month payment)
  const monthlyPayment = 350;
  const monthsRemaining = Math.ceil(remaining / monthlyPayment);
  const daysRemaining = monthsRemaining * 30;
  const debtFreeDate = new Date();
  debtFreeDate.setDate(debtFreeDate.getDate() + daysRemaining);

  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: "start",
      title: "Started Your Journey",
      amount: 0,
      completed: true,
      date: new Date("2024-01-01"),
      icon: "🎯",
    },
    {
      id: "first-1000",
      title: "First $1,000 Paid Off",
      amount: 1000,
      completed: true,
      date: new Date("2024-03-15"),
      icon: "💪",
    },
    {
      id: "quarter-way",
      title: "25% Complete!",
      amount: 3113,
      completed: true,
      date: new Date("2024-06-10"),
      icon: "🎉",
    },
    {
      id: "halfway",
      title: "Halfway There!",
      amount: 6225,
      completed: false,
      icon: "🏔️",
    },
    {
      id: "three-quarters",
      title: "75% Complete!",
      amount: 9338,
      completed: false,
      icon: "🚀",
    },
    {
      id: "almost-there",
      title: "Final Push",
      amount: 11400,
      completed: false,
      icon: "⚡",
    },
    {
      id: "debt-free",
      title: "Debt Freedom!",
      amount: 12450,
      completed: false,
      icon: "🎊",
    },
  ]);

  const handleMilestoneClick = (milestone: Milestone) => {
    if (milestone.completed) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#10B981", "#14B8A6"],
      });
    }
  };

  const getMethodInfo = (method: PayoffMethod) => {
    if (method === 'snowball') {
      return {
        title: 'Snowball Method',
        description: 'Pay off smallest debts first for quick wins and motivation',
        pros: ['Quick psychological wins', 'Builds momentum', 'Easier to stick with'],
        icon: <Zap className="w-5 h-5" />
      };
    } else {
      return {
        title: 'Avalanche Method',
        description: 'Pay off highest interest debts first to save more money',
        pros: ['Saves the most money', 'Mathematically optimal', 'Pays less interest'],
        icon: <Target className="w-5 h-5" />
      };
    }
  };

  const methodInfo = getMethodInfo(payoffMethod);

  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-slate-200/50 shadow-lg rounded-3xl">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 font-poppins">
              <Mountain className="w-5 h-5 text-emerald-600" />
              Your Debt Freedom Journey
            </h3>
            <p className="text-sm text-slate-600 mt-1 font-inter">
              You're crushing it! Keep going!
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-600 font-poppins">
              {Math.round(percentComplete)}%
            </div>
            <div className="text-xs text-slate-600 font-inter">Complete</div>
          </div>
        </div>

        {/* Payoff Strategy Selector */}
        <div className="mb-6 p-4 bg-white rounded-2xl border-2 border-brand-green/20">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-slate-900 font-poppins">Payoff Strategy</h4>
            <button
              onClick={() => setShowMethodInfo(!showMethodInfo)}
              className="text-brand-blue hover:text-brand-blue/80 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-2 mb-3">
            <Button
              variant={payoffMethod === 'snowball' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setPayoffMethod('snowball');
                navigate('/snowball-method');
              }}
              className={`flex-1 ${payoffMethod === 'snowball' ? 'bg-brand-green hover:bg-brand-green/90 text-white' : 'border-brand-green/30 text-brand-green hover:bg-brand-green/10'}`}
            >
              <Zap className="w-4 h-4 mr-2" />
              Snowball
            </Button>
            <Button
              variant={payoffMethod === 'avalanche' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setPayoffMethod('avalanche');
                navigate('/avalanche-method');
              }}
              className={`flex-1 ${payoffMethod === 'avalanche' ? 'bg-brand-blue hover:bg-brand-blue/90 text-white' : 'border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10'}`}
            >
              <Target className="w-4 h-4 mr-2" />
              Avalanche
            </Button>
          </div>

          {showMethodInfo && (
            <div className="bg-gradient-to-br from-brand-green/5 to-emerald-50 rounded-xl p-3 border border-brand-green/20 animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                {methodInfo.icon}
                <h5 className="text-sm font-bold text-slate-900 font-poppins">{methodInfo.title}</h5>
              </div>
              <p className="text-xs text-slate-700 mb-2 font-inter">{methodInfo.description}</p>
              <div className="space-y-1">
                {methodInfo.pros.map((pro, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-slate-600 font-inter">
                    <Check className="w-3 h-3 text-brand-green" />
                    {pro}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-3 p-2 bg-brand-green/10 rounded-lg">
            <p className="text-xs text-slate-700 font-inter">
              {payoffMethod === 'snowball'
                ? '💪 Focus: Smallest balance first for quick wins!'
                : '💰 Focus: Highest interest first to save money!'}
            </p>
          </div>
        </div>

        {/* Progress Stats - Mobile Optimized */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
          <div className="bg-white rounded-xl p-2 sm:p-3 text-center shadow-sm">
            <div className="flex justify-center mb-1">
              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
            </div>
            <div className="text-sm sm:text-lg font-bold text-slate-900 font-poppins">
              ${(paidOff / 1000).toFixed(0)}k
            </div>
            <div className="text-[10px] sm:text-xs text-slate-600 font-inter">Paid Off</div>
          </div>
          <div className="bg-white rounded-xl p-2 sm:p-3 text-center shadow-sm">
            <div className="flex justify-center mb-1">
              <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
            </div>
            <div className="text-sm sm:text-lg font-bold text-slate-900 font-poppins">
              ${(remaining / 1000).toFixed(1)}k
            </div>
            <div className="text-[10px] sm:text-xs text-slate-600 font-inter">Remaining</div>
          </div>
          <div className="bg-white rounded-xl p-2 sm:p-3 text-center shadow-sm">
            <div className="flex justify-center mb-1">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
            </div>
            <div className="text-sm sm:text-lg font-bold text-slate-900 font-poppins">{daysRemaining}</div>
            <div className="text-[10px] sm:text-xs text-slate-600 font-inter">Days Left</div>
          </div>
        </div>

        {/* Mountain Path Visualization - Enhanced */}
        <div className="relative mb-6 bg-gradient-to-b from-blue-50 via-white to-emerald-50 rounded-2xl p-3 sm:p-6 overflow-hidden border border-brand-green/10">
          {/* Decorative Mountain Background */}
          <div className="absolute bottom-0 right-0 text-brand-green/10">
            <Mountain className="w-32 h-32 sm:w-48 sm:h-48" />
          </div>

          {/* Current Progress Badge */}
          <div className="absolute top-2 right-2">
            <Badge className="bg-gradient-to-r from-brand-green to-emerald-500 text-white border-0 shadow-lg">
              {Math.round(percentComplete)}% Complete
            </Badge>
          </div>

          {/* Milestone Path */}
          <div className="relative space-y-3 sm:space-y-4">
            {milestones.map((milestone, index) => {
              const isCurrentMilestone = !milestone.completed && paidOff < milestone.amount && (index === 0 || milestones[index - 1].completed);

              return (
                <div
                  key={milestone.id}
                  className="flex items-center gap-2 sm:gap-4"
                  style={{
                    marginLeft: `${(index % 2) * 15}px`,
                  }}
                >
                  {/* Milestone Icon */}
                  <button
                    onClick={() => handleMilestoneClick(milestone)}
                    className={`relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl transition-all transform active:scale-95 sm:hover:scale-110 ${
                      milestone.completed
                        ? "bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg"
                        : isCurrentMilestone
                        ? "bg-gradient-to-br from-brand-blue to-brand-blue-light shadow-lg ring-4 ring-brand-blue/20 animate-pulse"
                        : "bg-slate-200 grayscale opacity-50"
                    }`}
                  >
                    {milestone.completed ? (
                      <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    ) : (
                      <span>{milestone.icon}</span>
                    )}
                    {isCurrentMilestone && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-yellow rounded-full animate-ping"></div>
                    )}
                  </button>

                  {/* Milestone Info */}
                  <div className={`flex-1 rounded-xl p-2 sm:p-3 shadow-sm ${
                    milestone.completed
                      ? 'bg-white border-2 border-brand-green/30'
                      : isCurrentMilestone
                      ? 'bg-white border-2 border-brand-blue/30 ring-2 ring-brand-blue/10'
                      : 'bg-white border border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-sm sm:text-base font-semibold truncate font-poppins ${
                            milestone.completed
                              ? "text-emerald-700"
                              : isCurrentMilestone
                              ? "text-brand-blue"
                              : "text-slate-500"
                          }`}
                        >
                          {milestone.title}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-600 font-inter">
                          ${(milestone.amount / 1000).toFixed(1)}k
                          {milestone.date && (
                            <span className="hidden sm:inline ml-2 text-xs">
                              {milestone.date.toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      {milestone.completed && (
                        <Badge className="bg-brand-green/10 text-brand-green border-0">
                          ✓
                        </Badge>
                      )}
                      {isCurrentMilestone && (
                        <Badge className="bg-brand-blue/10 text-brand-blue border-0 animate-pulse">
                          Next
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Connection Line */}
                  {index < milestones.length - 1 && (
                    <div
                      className={`absolute left-6 w-0.5 h-8 ${
                        milestone.completed
                          ? "bg-gradient-to-b from-emerald-400 to-teal-400"
                          : "bg-slate-200"
                      }`}
                      style={{
                        top: `${48 + index * 80}px`,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="mb-4 p-4 bg-white rounded-xl border-2 border-purple-200 text-center">
          <p className="text-sm font-semibold text-slate-900 italic font-poppins mb-1">
            "Every payment is a step closer to freedom"
          </p>
          <p className="text-xs text-slate-600 font-inter">
            You've paid off <span className="font-bold text-brand-green">${paidOff.toLocaleString()}</span>.
            That's amazing progress! 💪
          </p>
        </div>

        {/* Freedom Date Countdown */}
        <div className="bg-gradient-to-r from-brand-green via-emerald-500 to-teal-500 rounded-2xl p-3 sm:p-4 text-white text-center mb-4 shadow-lg">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Flag className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base font-semibold font-poppins">Projected Debt-Free Date</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold mb-1 font-poppins">
            {debtFreeDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="text-xs sm:text-sm opacity-90 font-inter">
            {daysRemaining} days to freedom! 🎊
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 sm:mt-6">
          <Button className="w-full bg-brand-green hover:bg-brand-green/90 active:bg-emerald-800 text-white h-11 sm:h-auto font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
            Make Extra Payment →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
