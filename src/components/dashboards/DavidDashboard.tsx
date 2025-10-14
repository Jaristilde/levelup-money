import { TrendingUp, TrendingDown, DollarSign, PieChart, Target, Shield, Calendar, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

// David (35, Solution Aware) - Comprehensive Planning Dashboard
// Focus: Data-rich yet organized, with clear charts and actionable insights

export const DavidDashboard = () => {
  const netWorth = 45000;
  const netWorthChange = 5;
  const creditScore = 685;
  const totalDebt = 15000;
  const debtReduction = 500;
  const budgetSurplus = 350;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 lg:pb-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 font-poppins">
            Welcome Back, David
          </h1>
          <p className="text-lg text-slate-600 font-inter">Financial Snapshot</p>
        </header>

        {/* Top Stats Grid - Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Net Worth */}
          <Card className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-brand-green/5 to-emerald-500/5 border-brand-green/20">
            <div className="flex items-center justify-between mb-3">
              <DollarSign className="w-8 h-8 text-brand-green" />
              <div className="flex items-center gap-1 text-brand-green">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold font-inter">+{netWorthChange}%</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1 font-inter">Net Worth</p>
            <p className="text-3xl font-bold text-slate-900 font-poppins">
              ${netWorth.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-1 font-inter">↑ $2,150 last month</p>
          </Card>

          {/* Credit Score */}
          <Card className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-brand-blue/5 to-brand-blue-light/5 border-brand-blue/20">
            <div className="flex items-center justify-between mb-3">
              <Shield className="w-8 h-8 text-brand-blue" />
              <div className="inline-block bg-brand-green/10 text-brand-green text-xs font-bold px-2 py-1 rounded-full font-inter">
                Good
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1 font-inter">Credit Score</p>
            <p className="text-3xl font-bold text-slate-900 font-poppins">{creditScore}</p>
            <div className="mt-2 flex items-center gap-1">
              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full w-[68%] bg-gradient-to-r from-brand-green to-emerald-400 rounded-full" />
              </div>
            </div>
          </Card>

          {/* Total Debt */}
          <Card className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <TrendingDown className="w-8 h-8 text-purple-600" />
              <div className="flex items-center gap-1 text-brand-green">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm font-semibold font-inter">${debtReduction}</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1 font-inter">Total Debt</p>
            <p className="text-3xl font-bold text-slate-900 font-poppins">
              ${totalDebt.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-1 font-inter">↓ ${debtReduction} this month</p>
          </Card>

          {/* Budget Performance */}
          <Card className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-brand-yellow/10 to-amber-100/20 border-brand-yellow/30">
            <div className="flex items-center justify-between mb-3">
              <PieChart className="w-8 h-8 text-brand-yellow" />
              <div className="inline-block bg-brand-green/10 text-brand-green text-xs font-bold px-2 py-1 rounded-full font-inter">
                Surplus
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1 font-inter">Monthly Budget</p>
            <p className="text-3xl font-bold text-brand-green font-poppins">
              +${budgetSurplus}
            </p>
            <p className="text-xs text-slate-500 mt-1 font-inter">Income exceeds expenses</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Net Worth Trend Card */}
            <Card className="p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 font-poppins">
                    Net Worth Trend
                  </h3>
                  <p className="text-sm text-slate-600 font-inter">Last 6 months</p>
                </div>
                <Link to="/milestones">
                  <Button variant="ghost" size="sm" className="text-brand-blue-light hover:bg-brand-blue-light/10">
                    View Details →
                  </Button>
                </Link>
              </div>

              {/* Line Graph Visualization */}
              <div className="bg-slate-50 rounded-xl p-6 mb-4">
                <div className="flex items-end justify-between h-48 gap-3">
                  {[38000, 40000, 41500, 42800, 43700, 45000].map((value, index) => {
                    const height = ((value - 35000) / 15000) * 100;
                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div className="relative w-full flex flex-col items-center">
                          <span className="text-xs font-semibold text-slate-700 mb-1 font-inter">
                            ${(value / 1000).toFixed(0)}k
                          </span>
                          <div
                            className="w-full bg-gradient-to-t from-brand-green to-emerald-400 rounded-t-lg transition-all duration-500 relative group cursor-pointer hover:from-brand-green hover:to-brand-green"
                            style={{ height: `${height}%` }}
                          >
                            {index === 5 && (
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brand-green text-white text-xs px-2 py-1 rounded font-semibold whitespace-nowrap shadow-lg">
                                Current
                              </div>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-slate-500 mt-1 font-inter">{months[index]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-brand-green/10 rounded-lg p-3 text-center border border-brand-green/20">
                  <p className="text-xs text-slate-600 mb-1 font-inter">6-Month Growth</p>
                  <p className="text-xl font-bold text-brand-green font-poppins">+18.4%</p>
                </div>
                <div className="bg-brand-blue/10 rounded-lg p-3 text-center border border-brand-blue/20">
                  <p className="text-xs text-slate-600 mb-1 font-inter">Monthly Avg</p>
                  <p className="text-xl font-bold text-brand-blue font-poppins">+$1,167</p>
                </div>
                <div className="bg-purple-100 rounded-lg p-3 text-center border border-purple-200">
                  <p className="text-xs text-slate-600 mb-1 font-inter">Projected (1Y)</p>
                  <p className="text-xl font-bold text-purple-600 font-poppins">$59k</p>
                </div>
              </div>
            </Card>

            {/* Debt Overview with Donut Chart */}
            <Card className="p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 font-poppins">
                    Debt Portfolio Analysis
                  </h3>
                  <p className="text-sm text-slate-600 font-inter">Breakdown by type</p>
                </div>
                <Link to="/debt">
                  <Button variant="ghost" size="sm" className="text-brand-blue-light hover:bg-brand-blue-light/10">
                    Strategize Payoff →
                  </Button>
                </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Donut Chart Visualization */}
                <div className="flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    {/* Donut segments */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* Credit Card - 40% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#2ECC71"
                        strokeWidth="20"
                        strokeDasharray="100.53 251.33"
                        className="transition-all duration-500"
                      />
                      {/* Student Loan - 35% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#3498DB"
                        strokeWidth="20"
                        strokeDasharray="87.96 251.33"
                        strokeDashoffset="-100.53"
                        className="transition-all duration-500"
                      />
                      {/* Personal Loan - 25% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#9333EA"
                        strokeWidth="20"
                        strokeDasharray="62.83 251.33"
                        strokeDashoffset="-188.49"
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-3xl font-bold text-slate-900 font-poppins">$15k</p>
                      <p className="text-xs text-slate-600 font-inter">Total</p>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-brand-green/10 rounded-lg border border-brand-green/20">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-brand-green rounded-full"></div>
                      <span className="text-sm font-medium text-slate-700 font-inter">Credit Cards</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900 font-poppins">$6,000</p>
                      <p className="text-xs text-slate-500 font-inter">40%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-brand-blue/10 rounded-lg border border-brand-blue/20">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-brand-blue-light rounded-full"></div>
                      <span className="text-sm font-medium text-slate-700 font-inter">Student Loan</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900 font-poppins">$5,250</p>
                      <p className="text-xs text-slate-500 font-inter">35%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-100 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
                      <span className="text-sm font-medium text-slate-700 font-inter">Personal Loan</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900 font-poppins">$3,750</p>
                      <p className="text-xs text-slate-500 font-inter">25%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-brand-yellow/10 border border-brand-yellow/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-brand-yellow" />
                  <h4 className="text-sm font-bold text-slate-900 font-poppins">Insight</h4>
                </div>
                <p className="text-sm text-slate-700 font-inter">
                  Your <span className="font-semibold">debt-to-income ratio is 0.28</span>. This is excellent!
                  Consider increasing payments to your highest interest debt to save $1,200 in interest.
                </p>
              </div>
            </Card>

            {/* Budget Performance Bar Chart */}
            <Card className="p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 font-poppins">
                    Monthly Budget Performance
                  </h3>
                  <p className="text-sm text-brand-green font-semibold font-inter">+$350 Surplus</p>
                </div>
                <Link to="/budget">
                  <Button variant="ghost" size="sm" className="text-brand-blue-light hover:bg-brand-blue-light/10">
                    Adjust Budget →
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {/* Income vs Expenses Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700 font-inter">Income</span>
                    <span className="text-lg font-bold text-brand-green font-poppins">$5,200</span>
                  </div>
                  <div className="h-8 bg-slate-100 rounded-lg overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-brand-green to-emerald-400"></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700 font-inter">Expenses</span>
                    <span className="text-lg font-bold text-slate-900 font-poppins">$4,850</span>
                  </div>
                  <div className="h-8 bg-slate-100 rounded-lg overflow-hidden">
                    <div className="h-full w-[93%] bg-gradient-to-r from-brand-blue to-brand-blue-light"></div>
                  </div>
                </div>

                <div className="bg-brand-green/10 rounded-lg p-4 border border-brand-green/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700 font-inter">Net Cashflow</span>
                    <span className="text-2xl font-bold text-brand-green font-poppins">+$350</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Goals & Quick Actions */}
          <div className="space-y-6">
            {/* Goals Progress At A Glance */}
            <Card className="p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4 font-poppins">Goal Progress</h3>

              <div className="space-y-4">
                <Link to="/goals">
                  <div className="p-4 bg-gradient-to-br from-brand-green/10 to-emerald-500/10 rounded-xl border border-brand-green/20 hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-700 font-inter">Home Downpayment</span>
                      <span className="text-sm font-bold text-brand-green font-inter">40%</span>
                    </div>
                    <Progress value={40} className="h-2 bg-white" />
                    <p className="text-xs text-slate-600 mt-2 font-inter">$20,000 of $50,000</p>
                  </div>
                </Link>

                <Link to="/retirement">
                  <div className="p-4 bg-gradient-to-br from-brand-blue/10 to-brand-blue-light/10 rounded-xl border border-brand-blue/20 hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-700 font-inter">Retirement</span>
                      <span className="text-sm font-bold text-brand-blue font-inter">On Track</span>
                    </div>
                    <Progress value={62} className="h-2 bg-white" />
                    <p className="text-xs text-slate-600 mt-2 font-inter">$45,000 invested</p>
                  </div>
                </Link>

                <Link to="/goals">
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-700 font-inter">Emergency Fund</span>
                      <span className="text-sm font-bold text-purple-600 font-inter">75%</span>
                    </div>
                    <Progress value={75} className="h-2 bg-white" />
                    <p className="text-xs text-slate-600 mt-2 font-inter">$7,500 of $10,000</p>
                  </div>
                </Link>
              </div>

              <Link to="/goals">
                <Button className="w-full mt-4 bg-brand-green hover:bg-brand-green/90 text-white font-semibold">
                  Manage All Goals →
                </Button>
              </Link>
            </Card>

            {/* Key Insight Card */}
            <Card className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-brand-yellow/10 to-amber-100/20 border-brand-yellow/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-brand-yellow/20 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-brand-yellow" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-poppins">This Month's Insight</h3>
              </div>
              <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                <p className="text-sm text-slate-700 font-inter">
                  You spent <span className="font-bold text-brand-red">15% more on dining out</span> this month.
                  Opportunity to save <span className="font-bold text-brand-green">$150</span>!
                </p>
              </div>
              <Button className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-slate-900 font-semibold">
                View Spending Analysis
              </Button>
            </Card>

            {/* Upcoming Events */}
            <Card className="p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-brand-blue" />
                <h3 className="text-lg font-bold text-slate-900 font-poppins">Upcoming</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-sm font-semibold text-slate-900 mb-1 font-inter">Rent Payment</p>
                  <p className="text-xs text-slate-600 font-inter">Due June 1 • $1,500</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-sm font-semibold text-slate-900 mb-1 font-inter">Credit Card Payment</p>
                  <p className="text-xs text-slate-600 font-inter">Due May 28 • $250</p>
                </div>
              </div>
            </Card>

            {/* AI Assistant */}
            <Card className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-brand-blue-light/10 to-brand-blue/5 border-brand-blue/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-blue-light rounded-full flex items-center justify-center">
                  <span className="text-xl">💬</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-poppins">AI Assistant</h3>
              </div>
              <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                <p className="text-slate-700 text-sm font-inter">
                  "David, I can help analyze your <span className="font-semibold text-brand-blue">investment portfolio</span> and suggest optimizations."
                </p>
              </div>
              <Link to="/chat">
                <Button className="w-full bg-brand-blue-light hover:bg-brand-blue text-white font-semibold">
                  Get Portfolio Analysis
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
