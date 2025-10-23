import { Download, AlertCircle, Share2, TrendingUp, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import DisputeLetterModal from '@/components/DisputeLetterModal';

const CreditReport = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6M');
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  // Credit score not connected yet
  const creditScore = null;
  const previousScore = null;
  const scoreChange = 0;
  const scorePercentage = 0;

  // Determine score range and color
  const getScoreInfo = (score: number) => {
    if (score >= 800) return { label: 'Exceptional', color: 'text-brand-green', bgColor: 'bg-brand-green', gradient: 'from-brand-green to-emerald-500' };
    if (score >= 740) return { label: 'Very Good', color: 'text-brand-green', bgColor: 'bg-brand-green', gradient: 'from-brand-green to-emerald-500' };
    if (score >= 670) return { label: 'Good', color: 'text-brand-blue', bgColor: 'bg-brand-blue', gradient: 'from-brand-blue to-brand-blue-light' };
    if (score >= 580) return { label: 'Fair', color: 'text-brand-yellow', bgColor: 'bg-brand-yellow', gradient: 'from-brand-yellow to-amber-400' };
    return { label: 'Poor', color: 'text-brand-red', bgColor: 'bg-brand-red', gradient: 'from-brand-red to-red-500' };
  };

  const scoreInfo = creditScore ? getScoreInfo(creditScore) : { label: 'Not Connected', color: 'text-slate-500', bgColor: 'bg-slate-500', gradient: 'from-slate-400 to-slate-500' };

  // Historical data for trend chart (empty until credit report connected)
  const historicalData: Array<{ month: string; score: number }> = [];

  // Credit factors with status
  const creditFactors = [
    {
      name: 'Payment History',
      status: 'excellent',
      percentage: 100,
      description: 'Excellent! Always on time.',
      icon: CheckCircle,
      color: 'text-brand-green',
      bgColor: 'bg-brand-green/10',
      borderColor: 'border-brand-green/20',
      impact: 'Positive'
    },
    {
      name: 'Credit Utilization',
      status: 'warning',
      percentage: 25,
      description: '25% - Keep it below 30% for a better score.',
      icon: AlertTriangle,
      color: 'text-brand-yellow',
      bgColor: 'bg-brand-yellow/10',
      borderColor: 'border-brand-yellow/30',
      impact: 'Actionable'
    },
    {
      name: 'Length of Credit History',
      status: 'good',
      percentage: 100,
      description: '7 years - Good!',
      icon: CheckCircle,
      color: 'text-brand-green',
      bgColor: 'bg-brand-green/10',
      borderColor: 'border-brand-green/20',
      impact: 'Positive'
    },
    {
      name: 'Credit Mix',
      status: 'good',
      percentage: 100,
      description: 'Healthy mix of credit cards and loans.',
      icon: CheckCircle,
      color: 'text-brand-green',
      bgColor: 'bg-brand-green/10',
      borderColor: 'border-brand-green/20',
      impact: 'Positive'
    },
    {
      name: 'New Credit',
      status: 'warning',
      percentage: 67,
      description: 'Opened 2 new accounts in last 6 months. Be mindful.',
      icon: AlertTriangle,
      color: 'text-brand-yellow',
      bgColor: 'bg-brand-yellow/10',
      borderColor: 'border-brand-yellow/30',
      impact: 'Watch'
    },
  ];

  // Actionable recommendations
  const recommendations = [
    {
      title: 'Pay down your highest credit card balance',
      description: 'Reducing your credit card balance to reduce utilization from 25% to 10%.',
      impact: 'Could improve score by 15-25 points',
      cta: 'Make a Payment',
      link: '/debt',
      priority: 'high'
    },
    {
      title: 'Set up autopay for all bills',
      description: 'Ensure on-time payments and maintain your perfect payment history.',
      impact: 'Protects your score',
      cta: 'Set Autopay',
      link: '/accounts',
      priority: 'medium'
    },
    {
      title: 'Consider disputing this old negative item',
      description: 'You have 1 item that may be outdated or inaccurate on your report.',
      impact: 'Could improve score by 10-15 points',
      cta: 'Learn More',
      link: '/dispute-letter',
      priority: 'medium'
    },
  ];

  const celebrateScoreIncrease = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  if (scoreChange > 0) {
    setTimeout(() => celebrateScoreIncrease(), 1000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 lg:pb-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <nav className="text-sm text-slate-500 mb-2 font-inter" aria-label="Breadcrumb">
                Home &gt; Credit Report
              </nav>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 font-poppins">
                Credit Report
              </h1>
              <p className="text-slate-600 flex items-center gap-2 font-inter">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Updated: 2 hours ago
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="gap-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                onClick={() => setIsDisputeModalOpen(true)}
              >
                <AlertCircle className="w-4 h-4" />
                Dispute Error
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Score and Factors */}
          <div className="lg:col-span-2 space-y-6">
            {/* Connect Credit Report Placeholder */}
            <Card className="p-8 md:p-12 rounded-3xl shadow-2xl bg-gradient-to-br from-brand-blue/5 to-brand-green/5 border-2 border-dashed border-slate-300">
              <div className="text-center max-w-2xl mx-auto">
                {/* Icon */}
                <div className="w-24 h-24 bg-gradient-to-br from-brand-blue to-brand-green rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <AlertCircle className="w-12 h-12 text-white" />
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-poppins">
                  Connect Your Credit Report
                </h2>

                {/* Description */}
                <p className="text-lg text-slate-600 mb-8 font-inter">
                  Get your real credit score from all 3 bureaus (Experian, Equifax, TransUnion) 
                  and unlock personalized insights to improve your financial health.
                </p>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-4 mb-8 text-left">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <CheckCircle className="w-6 h-6 text-brand-green mb-2" />
                    <h3 className="font-semibold text-slate-900 mb-1 font-poppins">100% Free</h3>
                    <p className="text-sm text-slate-600 font-inter">No hidden fees or credit card required</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <CheckCircle className="w-6 h-6 text-brand-green mb-2" />
                    <h3 className="font-semibold text-slate-900 mb-1 font-poppins">Secure & Private</h3>
                    <p className="text-sm text-slate-600 font-inter">Bank-level 256-bit encryption</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <CheckCircle className="w-6 h-6 text-brand-green mb-2" />
                    <h3 className="font-semibold text-slate-900 mb-1 font-poppins">No Impact</h3>
                    <p className="text-sm text-slate-600 font-inter">Soft pull won't affect your score</p>
                  </div>
                </div>

                {/* CTA Button */}
                <Button 
                  size="lg"
                  className="bg-brand-green hover:bg-brand-green/90 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Check Credit Report
                </Button>

                <p className="text-sm text-slate-500 mt-4 font-inter">
                  Powered by Experian • Takes less than 2 minutes
                </p>
              </div>
            </Card>

            {/* Historical Trend Chart */}
            <Card className="p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 font-poppins">Credit Score History</h3>
                  <p className="text-sm text-slate-600 font-inter">Track your progress over time</p>
                </div>
                <div className="flex gap-2">
                  {['1M', '3M', '6M', '1Y'].map((period) => (
                    <Button
                      key={period}
                      variant={selectedPeriod === period ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setSelectedPeriod(period)}
                      className={selectedPeriod === period ? 'bg-brand-green hover:bg-brand-green/90 text-white' : ''}
                    >
                      {period}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Line Graph */}
              <div className="bg-slate-50 rounded-xl p-6">
                <div className="flex items-end justify-between h-48 gap-4">
                  {historicalData.map((data, index) => {
                    const height = ((data.score - 650) / 100) * 100;
                    const isLatest = index === historicalData.length - 1;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div className="relative w-full flex flex-col items-center">
                          <span className={`text-xs font-semibold mb-1 ${isLatest ? 'text-brand-green' : 'text-slate-600'} font-inter`}>
                            {data.score}
                          </span>
                          <div
                            className={`w-full bg-gradient-to-t ${isLatest ? 'from-brand-green to-emerald-400' : 'from-brand-blue to-brand-blue-light'} rounded-t-lg transition-all duration-500 relative group cursor-pointer hover:from-brand-green hover:to-emerald-400`}
                            style={{ height: `${height}%` }}
                          >
                            {isLatest && (
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brand-green text-white text-xs px-2 py-1 rounded font-semibold whitespace-nowrap shadow-lg">
                                Current
                              </div>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-slate-500 mt-1 font-inter">{data.month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Factors Affecting Score */}
            <Card className="p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-6 font-poppins">Factors Affecting Your Score</h3>

              <div className="space-y-4">
                {creditFactors.map((factor, index) => {
                  const Icon = factor.icon;
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border ${factor.bgColor} ${factor.borderColor}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${factor.color}`} />
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900 font-poppins">{factor.name}</h4>
                            <p className={`text-xs ${factor.color} font-medium font-inter`}>{factor.impact}</p>
                          </div>
                        </div>
                        <Badge className={`${factor.bgColor} ${factor.color} border-0`}>
                          {factor.percentage}%
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-700 mb-2 font-inter">{factor.description}</p>
                      {factor.percentage < 100 && (
                        <Progress value={factor.percentage} className="h-2 bg-slate-200" />
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Right Column - Recommendations */}
          <div className="space-y-6">
            <Card className="p-6 rounded-2xl shadow-lg sticky top-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 font-poppins">
                Actionable Recommendations
              </h3>
              <p className="text-sm text-slate-600 mb-6 font-inter">
                Complete these actions to improve your credit score
              </p>

              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 ${
                      rec.priority === 'high'
                        ? 'bg-brand-green/5 border-brand-green/30'
                        : 'bg-brand-blue/5 border-brand-blue/20'
                    }`}
                  >
                    {rec.priority === 'high' && (
                      <Badge className="bg-brand-green text-white border-0 mb-3">
                        High Impact
                      </Badge>
                    )}
                    <h4 className="text-sm font-bold text-slate-900 mb-2 font-poppins">
                      {rec.title}
                    </h4>
                    <p className="text-xs text-slate-600 mb-3 font-inter">
                      {rec.description}
                    </p>
                    <div className="bg-white rounded-lg p-3 mb-3">
                      <p className="text-xs font-semibold text-brand-green font-inter">
                        💡 {rec.impact}
                      </p>
                    </div>
                    <Button
                      className={`w-full ${
                        rec.priority === 'high'
                          ? 'bg-brand-green hover:bg-brand-green/90 text-white'
                          : 'bg-brand-blue hover:bg-brand-blue/90 text-white'
                      }`}
                      onClick={() => window.location.href = rec.link}
                    >
                      {rec.cta} →
                    </Button>
                  </div>
                ))}
              </div>

              {/* Gamification - Score Booster Badge */}
              <div className="mt-6 p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-green to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1 font-poppins">
                  Score Booster Achievement!
                </h4>
                <p className="text-xs text-slate-600 font-inter">
                  Your score increased by {scoreChange} points. Keep it up!
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Dispute Letter Modal */}
      <DisputeLetterModal
        isOpen={isDisputeModalOpen}
        onClose={() => setIsDisputeModalOpen(false)}
      />
    </div>
  );
};

export default CreditReport;
