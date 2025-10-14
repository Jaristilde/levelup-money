import { Settings, Zap, TrendingUp, PieChart, Target, Plus, ChevronRight, Calendar, CreditCard, Receipt, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

// Maria (32, Product Aware) - Optimization & Customization Dashboard
// Focus: Efficiency, customization, and fine-tuning with quick actions

export const MariaDashboard = () => {
  const budgetEfficiency = 85;
  const creditScore = 710;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 lg:pb-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Header with Customization Focus */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 font-poppins">
                Hi Maria! Your Financial Hub
              </h1>
              <p className="text-lg text-slate-600 font-inter">
                Everything optimized, just the way you like it
              </p>
            </div>
            <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
              <Settings className="w-4 h-4 mr-2" />
              Customize Dashboard
            </Button>
          </div>
        </header>

        {/* Quick Actions Bar */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-4 overflow-x-auto">
          <div className="flex gap-3 min-w-max">
            <Button className="bg-brand-green hover:bg-brand-green/90 text-white font-semibold whitespace-nowrap">
              <Plus className="w-4 h-4 mr-2" />
              Add Transaction
            </Button>
            <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue/10 whitespace-nowrap">
              <Receipt className="w-4 h-4 mr-2" />
              Transfer Funds
            </Button>
            <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue/10 whitespace-nowrap">
              <CreditCard className="w-4 h-4 mr-2" />
              Link New Account
            </Button>
            <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue/10 whitespace-nowrap">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Customizable Widgets */}
          <div className="lg:col-span-2 space-y-6">
            {/* Budget Optimization Widget */}
            <Card className="p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 font-poppins">
                    Budget Optimization
                  </h3>
                  <p className="text-sm text-slate-600 font-inter">Your efficiency score</p>
                </div>
                <Link to="/budget">
                  <Button variant="ghost" size="sm" className="text-brand-blue-light hover:bg-brand-blue-light/10">
                    Optimize Now →
                  </Button>
                </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Efficiency Circle */}
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#EAECEE"
                        strokeWidth="12"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#2ECC71"
                        strokeWidth="12"
                        strokeDasharray="251.33"
                        strokeDashoffset={251.33 - (251.33 * budgetEfficiency) / 100}
                        className="transition-all duration-1000"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-5xl font-bold text-brand-green font-poppins">{budgetEfficiency}%</p>
                      <p className="text-sm text-slate-600 font-inter">Efficient</p>
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700 font-inter">Allocated</span>
                      <span className="text-sm font-bold text-slate-900 font-poppins">$3,800</span>
                    </div>
                    <Progress value={90} className="h-2 bg-slate-200" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700 font-inter">Spent</span>
                      <span className="text-sm font-bold text-slate-900 font-poppins">$3,420</span>
                    </div>
                    <Progress value={81} className="h-2 bg-slate-200" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700 font-inter">Remaining</span>
                      <span className="text-sm font-bold text-brand-green font-poppins">$380</span>
                    </div>
                    <Progress value={9} className="h-2 bg-slate-200" />
                  </div>
                  <div className="bg-brand-green/10 rounded-lg p-3 border border-brand-green/20">
                    <p className="text-sm text-slate-700 font-inter">
                      <span className="font-bold text-brand-green">Great job!</span> You're staying under budget this month.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pie Chart - Allocated vs Spent */}
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-slate-900 mb-3 font-poppins">Spending by Category</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { category: 'Housing', amount: '$1,200', color: 'bg-brand-green' },
                    { category: 'Food', amount: '$450', color: 'bg-brand-blue' },
                    { category: 'Transport', amount: '$200', color: 'bg-purple-500' },
                    { category: 'Other', amount: '$1,570', color: 'bg-brand-yellow' },
                  ].map((item) => (
                    <div key={item.category} className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="text-xs text-slate-600 font-inter">{item.category}</span>
                      </div>
                      <span className="text-sm font-bold text-slate-900 font-poppins">{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Spending Categories Hotlist */}
            <Card className="p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900 font-poppins">
                  Top Spending Categories
                </h3>
                <Link to="/budget">
                  <Button variant="ghost" size="sm" className="text-brand-blue-light hover:bg-brand-blue-light/10">
                    View All →
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {[
                  { category: 'Groceries', spent: 450, budget: 500, icon: '🛒', color: 'brand-green' },
                  { category: 'Transportation', spent: 200, budget: 250, icon: '🚗', color: 'brand-blue' },
                  { category: 'Dining Out', spent: 180, budget: 150, icon: '🍽️', color: 'brand-red' },
                  { category: 'Entertainment', spent: 120, budget: 200, icon: '🎬', color: 'purple-500' },
                ].map((item) => {
                  const percentage = (item.spent / item.budget) * 100;
                  const isOverBudget = percentage > 100;
                  return (
                    <div key={item.category} className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900 font-poppins">{item.category}</h4>
                            <p className="text-xs text-slate-600 font-inter">
                              ${item.spent} of ${item.budget}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-bold ${isOverBudget ? 'text-brand-red' : 'text-brand-green'} font-poppins`}>
                            {isOverBudget ? `+$${item.spent - item.budget}` : `$${item.budget - item.spent} left`}
                          </p>
                          <ChevronRight className="w-4 h-4 text-slate-400 ml-auto" />
                        </div>
                      </div>
                      <Progress
                        value={Math.min(percentage, 100)}
                        className={`h-2 ${isOverBudget ? 'bg-brand-red/20' : 'bg-slate-200'}`}
                      />
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Credit Score Health - Compact */}
            <Card className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-brand-blue/5 to-brand-blue-light/5 border-brand-blue/20">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-1 font-poppins">
                    Credit Score Health
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 font-inter">You're in excellent shape!</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-600 mb-1 font-inter">Current Score</p>
                      <p className="text-4xl font-bold text-brand-blue font-poppins">{creditScore}</p>
                      <div className="inline-block bg-brand-green/10 text-brand-green text-xs font-bold px-2 py-1 rounded-full mt-2">
                        Excellent
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1 font-inter">This Month</p>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-brand-green" />
                        <p className="text-4xl font-bold text-brand-green font-poppins">+5</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Link to="/credit-report">
                  <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold">
                    Maintain Score →
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Debt Progress Summary - Compact */}
            <Card className="p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 font-poppins">Debt Progress</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-slate-600 mb-1 font-inter">Total Balance</p>
                      <p className="text-2xl font-bold text-slate-900 font-poppins">$8,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1 font-inter">Paid This Month</p>
                      <p className="text-2xl font-bold text-brand-green font-poppins">$420</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1 font-inter">Debt-Free By</p>
                      <p className="text-2xl font-bold text-brand-blue font-poppins">2026</p>
                    </div>
                  </div>
                </div>

                <Link to="/debt">
                  <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                    Refine Plan →
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Right Column - Quick Access & Upcoming */}
          <div className="space-y-6">
            {/* Upcoming Bills Card */}
            <Card className="p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-brand-blue" />
                <h3 className="text-lg font-bold text-slate-900 font-poppins">Upcoming Bills</h3>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Credit Card', amount: '$150', date: 'May 28', urgent: true },
                  { name: 'Rent', amount: '$1,200', date: 'June 1', urgent: false },
                  { name: 'Utilities', amount: '$85', date: 'June 5', urgent: false },
                ].map((bill, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 ${
                      bill.urgent
                        ? 'bg-brand-yellow/10 border-brand-yellow/30'
                        : 'bg-slate-50 border-slate-200'
                    } hover:shadow-md transition-all cursor-pointer`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-900 font-poppins">{bill.name}</span>
                      <span className="text-lg font-bold text-slate-900 font-poppins">{bill.amount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-600 font-inter">Due {bill.date}</span>
                      {bill.urgent && (
                        <span className="text-xs bg-brand-yellow text-slate-900 px-2 py-1 rounded-full font-semibold">
                          Due Soon
                        </span>
                      )}
                    </div>
                    <Button size="sm" className="w-full mt-3 bg-brand-green hover:bg-brand-green/90 text-white">
                      Pay Now
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Savings Opportunities */}
            <Card className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-brand-green/10 to-emerald-500/10 border-brand-green/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-brand-green/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-poppins">Smart Insights</h3>
              </div>

              <div className="space-y-3">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-sm text-slate-700 mb-2 font-inter">
                    <span className="font-bold text-brand-green">Maria</span>, I've identified <span className="font-bold">3 areas</span> for potential savings this month:
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2 font-inter">
                      <span className="text-brand-green">•</span> Switch to annual subscriptions: Save $45/mo
                    </li>
                    <li className="flex items-center gap-2 font-inter">
                      <span className="text-brand-green">•</span> Reduce dining out: Save $80/mo
                    </li>
                    <li className="flex items-center gap-2 font-inter">
                      <span className="text-brand-green">•</span> Lower insurance premium: Save $25/mo
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-brand-green/30">
                  <p className="text-sm font-bold text-brand-green mb-1 font-poppins">Total Monthly Savings</p>
                  <p className="text-3xl font-bold text-brand-green font-poppins">$150</p>
                </div>

                <Button className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-semibold">
                  Apply Suggestions
                </Button>
              </div>
            </Card>

            {/* Goals Quick View */}
            <Card className="p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-brand-blue" />
                  <h3 className="text-lg font-bold text-slate-900 font-poppins">Active Goals</h3>
                </div>
                <Link to="/goals">
                  <Button variant="ghost" size="sm" className="text-brand-blue-light hover:bg-brand-blue-light/10">
                    View All
                  </Button>
                </Link>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Emergency Fund', progress: 60, color: 'brand-green' },
                  { name: 'Vacation', progress: 35, color: 'brand-blue' },
                  { name: 'New Car', progress: 20, color: 'purple-500' },
                ].map((goal) => (
                  <div key={goal.name} className="p-3 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700 font-inter">{goal.name}</span>
                      <span className="text-sm font-bold text-slate-900 font-poppins">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2 bg-white" />
                  </div>
                ))}
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
                  "Need help optimizing your budget or want personalized financial advice?"
                </p>
              </div>
              <Link to="/chat">
                <Button className="w-full bg-brand-blue-light hover:bg-brand-blue text-white font-semibold">
                  Chat Now
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
