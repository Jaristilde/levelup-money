import { TrendingUp, TrendingDown, DollarSign, BarChart3, LineChart, FileText, Settings, Download, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

// Ben (42, Most Aware) - Advanced Analytics Dashboard
// Focus: Sophisticated, data-dense dashboard with customizable reports and advanced controls

export const BenDashboard = () => {
  const cashFlow = 1500;
  const investmentGrowth = 1.2;
  const creditScore = null; // Not connected
  const debtToIncome = 0.25;
  const portfolioValue = 180000;
  const monthlyBudget = 4500;
  const budgetAllocated = 90;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 lg:pb-8">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Advanced Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-poppins">
                Ben, Your Financial Command Center
              </h1>
              <p className="text-lg text-slate-600 font-inter">
                Advanced analytics and portfolio insights
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" className="border-slate-300 hover:bg-slate-100">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>

          {/* Executive Summary Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <Card className="p-4 rounded-xl shadow-sm border-l-4 border-brand-green">
              <p className="text-xs text-slate-600 mb-1 font-inter">Cash Flow</p>
              <p className="text-2xl font-bold text-brand-green font-poppins">+${cashFlow}</p>
              <p className="text-xs text-slate-500 font-inter">Monthly average</p>
            </Card>
            <Card className="p-4 rounded-xl shadow-sm border-l-4 border-brand-blue">
              <p className="text-xs text-slate-600 mb-1 font-inter">Investment Growth</p>
              <p className="text-2xl font-bold text-brand-blue font-poppins">+{investmentGrowth}%</p>
              <p className="text-xs text-slate-500 font-inter">Year-to-date</p>
            </Card>
            <Card className="p-4 rounded-xl shadow-sm border-l-4 border-purple-500">
              <p className="text-xs text-slate-600 mb-1 font-inter">Debt-to-Income</p>
              <p className="text-2xl font-bold text-purple-600 font-poppins">{debtToIncome}</p>
              <p className="text-xs text-slate-500 font-inter">Excellent ratio</p>
            </Card>
            <Card className="p-4 rounded-xl shadow-sm border-l-4 border-brand-yellow">
              <p className="text-xs text-slate-600 mb-1 font-inter">Budget Efficiency</p>
              <p className="text-2xl font-bold text-brand-yellow font-poppins">{budgetAllocated}%</p>
              <p className="text-xs text-slate-500 font-inter">Well allocated</p>
            </Card>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content - 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            {/* Portfolio Performance */}
            <Card className="p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 font-poppins">
                    Investment Portfolio Performance
                  </h3>
                  <p className="text-sm text-slate-600 font-inter">Real-time tracking and analytics</p>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-brand-green/10 text-brand-green border-0">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +3% YTD
                  </Badge>
                  <Button variant="ghost" size="sm" className="text-brand-blue-light hover:bg-brand-blue-light/10">
                    Details →
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-brand-green/10 to-emerald-500/10 rounded-xl p-4 border border-brand-green/20">
                  <p className="text-xs text-slate-600 mb-1 font-inter">Portfolio Value</p>
                  <p className="text-3xl font-bold text-slate-900 mb-1 font-poppins">
                    ${(portfolioValue / 1000).toFixed(0)}k
                  </p>
                  <div className="flex items-center gap-1 text-brand-green">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-xs font-semibold font-inter">+$5,400</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-brand-blue/10 to-brand-blue-light/10 rounded-xl p-4 border border-brand-blue/20">
                  <p className="text-xs text-slate-600 mb-1 font-inter">Stocks</p>
                  <p className="text-2xl font-bold text-slate-900 mb-1 font-poppins">$108k</p>
                  <p className="text-xs text-brand-green font-semibold font-inter">+2.8%</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                  <p className="text-xs text-slate-600 mb-1 font-inter">Bonds</p>
                  <p className="text-2xl font-bold text-slate-900 mb-1 font-poppins">$54k</p>
                  <p className="text-xs text-brand-green font-semibold font-inter">+1.5%</p>
                </div>

                <div className="bg-gradient-to-br from-brand-yellow/10 to-amber-100/20 rounded-xl p-4 border border-brand-yellow/30">
                  <p className="text-xs text-slate-600 mb-1 font-inter">Cash</p>
                  <p className="text-2xl font-bold text-slate-900 mb-1 font-poppins">$18k</p>
                  <p className="text-xs text-slate-500 font-inter">Liquid</p>
                </div>
              </div>

              {/* Advanced Chart */}
              <div className="bg-slate-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="bg-white text-xs">1M</Button>
                    <Button size="sm" variant="ghost" className="text-xs">3M</Button>
                    <Button size="sm" variant="ghost" className="text-xs">6M</Button>
                    <Button size="sm" variant="ghost" className="text-xs">1Y</Button>
                    <Button size="sm" variant="ghost" className="text-xs">5Y</Button>
                  </div>
                </div>

                {/* Line Graph */}
                <div className="flex items-end justify-between h-40 gap-2">
                  {[170, 172, 174, 171, 175, 178, 177, 180, 176, 179, 182, 180].map((value, index) => {
                    const height = ((value - 165) / 20) * 100;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-xs text-slate-600 mb-1 font-inter">
                          {index === 11 ? `${value}k` : ''}
                        </span>
                        <div className="w-full relative">
                          <div
                            className="w-full bg-gradient-to-t from-brand-blue to-brand-blue-light rounded-t transition-all duration-500 hover:from-brand-blue-light hover:to-brand-blue"
                            style={{ height: `${height}px` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Advanced Analytics Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Credit Health & Alerts */}
              <Card className="p-6 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900 font-poppins">
                    Credit Health & Alerts
                  </h3>
                  <Link to="/credit-report">
                    <Button variant="ghost" size="sm" className="text-brand-blue-light hover:bg-brand-blue-light/10">
                      Report →
                    </Button>
                  </Link>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 font-inter">Credit Score</span>
                    <Badge className="bg-slate-100 text-slate-600 border-0">Not Connected</Badge>
                  </div>
                  <p className="text-5xl font-bold text-slate-400 mb-2 font-poppins">—</p>
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <span className="font-inter">Connect your report to see your score</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-700 font-inter">Payment History</span>
                    <Badge className="bg-brand-green/10 text-brand-green border-0">100%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-700 font-inter">Credit Utilization</span>
                    <Badge className="bg-brand-green/10 text-brand-green border-0">12%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-700 font-inter">Credit Age</span>
                    <Badge className="bg-brand-green/10 text-brand-green border-0">15 yrs</Badge>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-xs text-green-800 font-inter">
                    ✓ No major alerts. Your credit health is exceptional.
                  </p>
                </div>
              </Card>

              {/* Debt Portfolio Analysis */}
              <Card className="p-6 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900 font-poppins">
                    Debt Portfolio Analysis
                  </h3>
                  <Link to="/debt">
                    <Button variant="ghost" size="sm" className="text-brand-blue-light hover:bg-brand-blue-light/10">
                      Model →
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-600 mb-1 font-inter">Debt-to-Income Ratio</p>
                    <p className="text-3xl font-bold text-slate-900 font-poppins">{debtToIncome}</p>
                    <Badge className="bg-brand-green/10 text-brand-green border-0 mt-2">Excellent</Badge>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-600 mb-1 font-inter">Total Debt</p>
                    <p className="text-3xl font-bold text-slate-900 font-poppins">$12k</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingDown className="w-3 h-3 text-brand-green" />
                      <span className="text-xs text-brand-green font-semibold font-inter">-$450</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-600 font-inter">Mortgage</span>
                      <span className="text-sm font-bold text-slate-900 font-poppins">$8,500</span>
                    </div>
                    <Progress value={71} className="h-1.5 bg-slate-200" />
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-600 font-inter">Auto Loan</span>
                      <span className="text-sm font-bold text-slate-900 font-poppins">$3,500</span>
                    </div>
                    <Progress value={29} className="h-1.5 bg-slate-200" />
                  </div>
                </div>

                <Button className="w-full mt-4 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold">
                  Model Payoff Scenarios
                </Button>
              </Card>
            </div>

            {/* Budget Control Panel */}
            <Card className="p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 font-poppins">
                    Budget Control Panel
                  </h3>
                  <p className="text-sm text-slate-600 font-inter">
                    ${monthlyBudget}/mo ({budgetAllocated}% Allocated)
                  </p>
                </div>
                <Link to="/budget">
                  <Button variant="ghost" size="sm" className="text-brand-blue-light hover:bg-brand-blue-light/10">
                    Adjust →
                  </Button>
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { category: 'Fixed Costs', amount: 2800, allocated: 2800, color: 'brand-blue' },
                  { category: 'Variable', amount: 850, allocated: 1200, color: 'brand-green' },
                  { category: 'Savings/Invest', amount: 850, allocated: 500, color: 'purple-500' },
                ].map((item) => {
                  const percentage = (item.amount / item.allocated) * 100;
                  return (
                    <div key={item.category} className="p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-slate-700 font-poppins">{item.category}</span>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Settings className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-2xl font-bold text-slate-900 mb-2 font-poppins">
                        ${item.amount}
                      </p>
                      <Progress value={percentage} className="h-2 bg-slate-200 mb-2" />
                      <p className="text-xs text-slate-600 font-inter">
                        of ${item.allocated} allocated
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Right Sidebar - Reports & Quick Actions */}
          <div className="space-y-6">
            {/* Customizable Reports */}
            <Card className="p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-brand-blue" />
                <h3 className="text-lg font-bold text-slate-900 font-poppins">Reports</h3>
              </div>

              <div className="space-y-2">
                {[
                  { name: 'Tax Prep Report', icon: FileText, color: 'brand-green' },
                  { name: 'Net Worth Trends', icon: LineChart, color: 'brand-blue' },
                  { name: 'Spending Forecast', icon: BarChart3, color: 'purple-500' },
                  { name: 'Investment Analysis', icon: TrendingUp, color: 'brand-yellow' },
                ].map((report) => {
                  const Icon = report.icon;
                  return (
                    <button
                      key={report.name}
                      className="w-full p-3 bg-slate-50 hover:bg-slate-100 rounded-lg flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 text-${report.color}`} />
                        <span className="text-sm font-medium text-slate-700 font-inter">{report.name}</span>
                      </div>
                      <Download className="w-4 h-4 text-slate-400" />
                    </button>
                  );
                })}
              </div>

              <Button className="w-full mt-4 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold">
                Generate Custom Report
              </Button>
            </Card>

            {/* Market Conditions Alert */}
            <Card className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-brand-yellow/10 to-amber-100/20 border-brand-yellow/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-yellow/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-brand-yellow" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-poppins">Market Alert</h3>
              </div>

              <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                <p className="text-sm text-slate-700 mb-2 font-inter">
                  <span className="font-bold">S&P 500:</span> +0.8% today
                </p>
                <p className="text-sm text-slate-700 mb-2 font-inter">
                  <span className="font-bold">Interest Rates:</span> Unchanged at 5.25%
                </p>
                <p className="text-xs text-slate-600 font-inter">
                  Based on current market trends, consider rebalancing your portfolio.
                </p>
              </div>

              <Button className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-slate-900 font-semibold">
                Review Strategy
              </Button>
            </Card>

            {/* Optimization Suggestions */}
            <Card className="p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4 font-poppins">
                Optimization Suggestions
              </h3>

              <div className="space-y-3">
                <div className="p-3 bg-brand-green/10 rounded-lg border border-brand-green/20">
                  <p className="text-xs font-semibold text-slate-900 mb-1 font-poppins">Tax Optimization</p>
                  <p className="text-xs text-slate-600 font-inter">
                    Max out 401(k) to save $1,800 in taxes
                  </p>
                </div>

                <div className="p-3 bg-brand-blue/10 rounded-lg border border-brand-blue/20">
                  <p className="text-xs font-semibold text-slate-900 mb-1 font-poppins">Rebalancing</p>
                  <p className="text-xs text-slate-600 font-inter">
                    Portfolio drift detected: +2% stocks
                  </p>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-xs font-semibold text-slate-900 mb-1 font-poppins">Debt Payoff</p>
                  <p className="text-xs text-slate-600 font-inter">
                    Extra $200/mo could save $3.2k interest
                  </p>
                </div>
              </div>
            </Card>

            {/* AI Assistant */}
            <Card className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-brand-blue-light/10 to-brand-blue/5 border-brand-blue/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-blue-light rounded-full flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-poppins">AI Advisor</h3>
              </div>
              <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                <p className="text-slate-700 text-sm font-inter">
                  "Ben, what if we <span className="font-semibold text-brand-blue">rebalance your investments</span> based on current market trends?"
                </p>
              </div>
              <Link to="/chat">
                <Button className="w-full bg-brand-blue-light hover:bg-brand-blue text-white font-semibold">
                  Run Analysis
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
