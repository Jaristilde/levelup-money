import { TrendingUp, TrendingDown, DollarSign, PieChart, Target, Shield, Calendar, Lightbulb, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MobileHeader from '@/components/MobileHeader';
import { calculateTotalDebt, calculateMonthlyIncome, calculateMonthlyExpenses, calculateNetBudget, calculateDTI, calculateTotalMinimumPayment } from '@/lib/calculations';

// David (35, Solution Aware) - Comprehensive Planning Dashboard
// Focus: Data-rich yet organized, with clear charts and actionable insights

export const DavidDashboard = () => {
  const { profile } = useAuth();

  // Extract first name from profile
  const getFirstName = () => {
    if (profile?.full_name) {
      return profile.full_name.split(' ')[0];
    }
    return 'User';
  };

  // Get real financial data from profile
  const creditCards = profile?.financial_profile?.credit_cards || [];
  const loans = profile?.financial_profile?.loans || [];
  const totalDebt = calculateTotalDebt(creditCards, loans);

  // Calculate debt breakdown
  const creditCardDebt = creditCards.reduce((sum, card) => sum + (card.balance || 0), 0);
  const loanDebt = loans.reduce((sum, loan) => sum + (loan.balance || 0), 0);
  const creditCardPercentage = totalDebt > 0 ? ((creditCardDebt / totalDebt) * 100).toFixed(0) : 0;
  const loanPercentage = totalDebt > 0 ? ((loanDebt / totalDebt) * 100).toFixed(0) : 0;

  // Get income and expense data (these would come from Budget page in real app)
  // For now, use mock income/expenses from financial profile
  const monthlyIncome = profile?.financial_profile?.monthly_income || 0;
  const monthlyExpenses = profile?.financial_profile?.monthly_expenses || 0;
  const budgetSurplus = monthlyIncome - monthlyExpenses;
  const hasBudgetData = monthlyIncome > 0 || monthlyExpenses > 0;

  // Calculate debt metrics
  const totalMinimumPayment = calculateTotalMinimumPayment([...creditCards.map(cc => ({ minimumPayment: cc.minimum_payment || 0 })), ...loans.map(loan => ({ minimumPayment: loan.monthly_payment || 0 }))]);
  const dtiRatio = calculateDTI(totalMinimumPayment, monthlyIncome);

  // Credit Score
  const creditScore = profile?.financial_profile?.credit_score || null;

  // Net Worth calculation: Assets - Total Debt
  // Check if user has assets tracked (not implemented yet in MVP)
  const hasAssets = false; // Will be true when asset tracking is added
  const totalAssets = 0; // Will come from asset tracking
  const netWorth = hasAssets ? totalAssets - totalDebt : null;

  return (
    <>
      <MobileHeader />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 lg:pb-8 pt-16 lg:pt-0">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 font-poppins">
            Welcome Back, {getFirstName()}
          </h1>
          <p className="text-lg text-slate-600 font-inter">Financial Snapshot</p>
        </header>

        {/* Top Stats Grid - Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Net Worth */}
          <Card className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-slate-100 to-slate-50 border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <DollarSign className="w-8 h-8 text-slate-400" />
              {!netWorth && (
                <div className="inline-block bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-full font-inter">
                  Not Set Up
                </div>
              )}
            </div>
            <p className="text-sm text-slate-600 mb-1 font-inter">Net Worth</p>
            {netWorth !== null ? (
              <>
                <p className="text-3xl font-bold text-slate-900 font-poppins">
                  ${netWorth.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500 mt-1 font-inter">Assets - Debt</p>
              </>
            ) : (
              <>
                <p className="text-2xl font-bold text-slate-500 font-poppins">—</p>
                <p className="text-xs text-brand-blue hover:text-brand-blue/80 mt-2 font-inter underline cursor-pointer">
                  Add your assets to calculate
                </p>
              </>
            )}
          </Card>

          {/* Credit Score */}
          <Card className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-slate-100 to-slate-50 border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <Shield className="w-8 h-8 text-slate-400" />
              <div className="inline-block bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-full font-inter">
                Not Connected
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1 font-inter">Credit Score</p>
            <p className="text-2xl font-bold text-slate-500 font-poppins">—</p>
            <Link to="/credit-report">
              <p className="text-xs text-brand-blue hover:text-brand-blue/80 mt-2 font-inter underline cursor-pointer">
                Connect Report
              </p>
            </Link>
          </Card>

          {/* Total Debt */}
          <Card className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <TrendingDown className="w-8 h-8 text-purple-600" />
              {totalDebt > 0 && (
                <Link to="/debt">
                  <div className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full font-inter hover:bg-purple-200 cursor-pointer">
                    Manage
                  </div>
                </Link>
              )}
            </div>
            <p className="text-sm text-slate-600 mb-1 font-inter">Total Debt</p>
            <p className="text-3xl font-bold text-slate-900 font-poppins">
              ${totalDebt.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-1 font-inter">
              {totalDebt > 0 ? `${creditCards.length + loans.length} accounts` : 'Debt-free!'}
            </p>
          </Card>

          {/* Budget Performance */}
          <Card className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${hasBudgetData ? (budgetSurplus >= 0 ? 'bg-gradient-to-br from-brand-yellow/10 to-amber-100/20 border-brand-yellow/30' : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200') : 'bg-gradient-to-br from-slate-100 to-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between mb-3">
              <PieChart className={`w-8 h-8 ${hasBudgetData ? (budgetSurplus >= 0 ? 'text-brand-yellow' : 'text-red-600') : 'text-slate-400'}`} />
              {hasBudgetData && (
                <div className={`inline-block ${budgetSurplus >= 0 ? 'bg-brand-green/10 text-brand-green' : 'bg-red-100 text-red-700'} text-xs font-bold px-2 py-1 rounded-full font-inter`}>
                  {budgetSurplus >= 0 ? 'Surplus' : 'Deficit'}
                </div>
              )}
            </div>
            <p className="text-sm text-slate-600 mb-1 font-inter">Monthly Budget</p>
            {hasBudgetData ? (
              <>
                <p className={`text-3xl font-bold font-poppins ${budgetSurplus >= 0 ? 'text-brand-green' : 'text-red-700'}`}>
                  {budgetSurplus >= 0 ? '+' : ''}${Math.abs(budgetSurplus).toLocaleString()}
                </p>
                <p className="text-xs text-slate-500 mt-1 font-inter">
                  {budgetSurplus >= 0 ? 'Income exceeds expenses' : 'Expenses exceed income'}
                </p>
              </>
            ) : (
              <>
                <p className="text-2xl font-bold text-slate-500 font-poppins">—</p>
                <Link to="/budget">
                  <p className="text-xs text-brand-blue hover:text-brand-blue/80 mt-2 font-inter underline cursor-pointer">
                    Set up your budget
                  </p>
                </Link>
              </>
            )}
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Net Worth Trend Card - Hidden until Phase 2 (Historical Tracking) */}
            <Card className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 font-poppins">
                    Financial Growth Tracking
                  </h3>
                  <p className="text-sm text-slate-600 font-inter">Coming Soon</p>
                </div>
              </div>

              {/* Empty State */}
              <div className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-slate-300">
                <TrendingUp className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-slate-700 mb-2 font-poppins">
                  Building Your Financial History
                </h4>
                <p className="text-sm text-slate-600 font-inter mb-4">
                  We're tracking your progress! Check back next month to see your net worth trend and growth statistics.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-inter">
                  <AlertCircle className="w-4 h-4" />
                  <span>Historical tracking available in Phase 2</span>
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
                      <p className="text-3xl font-bold text-slate-900 font-poppins">
                        ${totalDebt > 0 ? (totalDebt / 1000).toFixed(1) : '0'}k
                      </p>
                      <p className="text-xs text-slate-600 font-inter">Total</p>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="space-y-3">
                  {creditCardDebt > 0 && (
                    <div className="flex items-center justify-between p-3 bg-brand-green/10 rounded-lg border border-brand-green/20">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-brand-green rounded-full"></div>
                        <span className="text-sm font-medium text-slate-700 font-inter">Credit Cards</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-900 font-poppins">${creditCardDebt.toLocaleString()}</p>
                        <p className="text-xs text-slate-500 font-inter">{creditCardPercentage}%</p>
                      </div>
                    </div>
                  )}
                  {loanDebt > 0 && (
                    <div className="flex items-center justify-between p-3 bg-brand-blue/10 rounded-lg border border-brand-blue/20">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-brand-blue-light rounded-full"></div>
                        <span className="text-sm font-medium text-slate-700 font-inter">Loans</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-900 font-poppins">${loanDebt.toLocaleString()}</p>
                        <p className="text-xs text-slate-500 font-inter">{loanPercentage}%</p>
                      </div>
                    </div>
                  )}
                  {totalDebt === 0 && (
                    <div className="p-4 text-center bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-600 font-inter">No debt data available</p>
                      <Link to="/financial-profile">
                        <p className="text-xs text-brand-blue hover:underline mt-2 font-inter">
                          Add your financial profile →
                        </p>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {totalDebt > 0 && monthlyIncome > 0 && (
                <div className="mt-4 bg-brand-yellow/10 border border-brand-yellow/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-brand-yellow" />
                    <h4 className="text-sm font-bold text-slate-900 font-poppins">Insight</h4>
                  </div>
                  <p className="text-sm text-slate-700 font-inter">
                    Your <span className="font-semibold">debt-to-income ratio is {dtiRatio.toFixed(1)}%</span>.{' '}
                    {dtiRatio <= 36 ? 'This is excellent!' : dtiRatio <= 43 ? 'This is moderate.' : 'Consider focusing on debt reduction.'}
                    {dtiRatio <= 36 && ' Consider increasing payments to your highest interest debt to save on interest.'}
                  </p>
                </div>
              )}
            </Card>

            {/* Budget Performance Bar Chart */}
            <Card className="p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 font-poppins">
                    Monthly Budget Performance
                  </h3>
                  {hasBudgetData ? (
                    <p className={`text-sm font-semibold font-inter ${budgetSurplus >= 0 ? 'text-brand-green' : 'text-red-700'}`}>
                      {budgetSurplus >= 0 ? '+' : ''}${Math.abs(budgetSurplus).toLocaleString()} {budgetSurplus >= 0 ? 'Surplus' : 'Deficit'}
                    </p>
                  ) : (
                    <p className="text-sm text-slate-600 font-inter">No budget data</p>
                  )}
                </div>
                <Link to="/budget">
                  <Button variant="ghost" size="sm" className="text-brand-blue-light hover:bg-brand-blue-light/10">
                    {hasBudgetData ? 'Adjust Budget' : 'Set Up Budget'} →
                  </Button>
                </Link>
              </div>

              {hasBudgetData ? (
                <div className="space-y-4">
                  {/* Income vs Expenses Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700 font-inter">Income</span>
                      <span className="text-lg font-bold text-brand-green font-poppins">${monthlyIncome.toLocaleString()}</span>
                    </div>
                    <div className="h-8 bg-slate-100 rounded-lg overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-brand-green to-emerald-400"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700 font-inter">Expenses</span>
                      <span className="text-lg font-bold text-slate-900 font-poppins">${monthlyExpenses.toLocaleString()}</span>
                    </div>
                    <div className="h-8 bg-slate-100 rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-blue to-brand-blue-light"
                        style={{ width: monthlyIncome > 0 ? `${Math.min((monthlyExpenses / monthlyIncome) * 100, 100)}%` : '0%' }}
                      ></div>
                    </div>
                  </div>

                  <div className={`${budgetSurplus >= 0 ? 'bg-brand-green/10 border-brand-green/20' : 'bg-red-50 border-red-200'} rounded-lg p-4 border`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700 font-inter">Net Cashflow</span>
                      <span className={`text-2xl font-bold font-poppins ${budgetSurplus >= 0 ? 'text-brand-green' : 'text-red-700'}`}>
                        {budgetSurplus >= 0 ? '+' : ''}${Math.abs(budgetSurplus).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 rounded-xl p-12 text-center border-2 border-dashed border-slate-300">
                  <PieChart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-slate-700 mb-2 font-poppins">
                    No Budget Data
                  </h4>
                  <p className="text-sm text-slate-600 font-inter mb-4">
                    Set up your budget to track income and expenses.
                  </p>
                  <Link to="/budget">
                    <Button className="bg-brand-blue-light hover:bg-brand-blue text-white">
                      Create Budget →
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Goals & Quick Actions */}
          <div className="space-y-6">
            {/* Goals Progress At A Glance */}
            <Card className="p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4 font-poppins">Financial Goals</h3>

              {/* Empty State - No goals yet */}
              <div className="bg-slate-50 rounded-xl p-8 text-center border-2 border-dashed border-slate-300">
                <Target className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-700 mb-2 font-poppins">
                  No Goals Set Yet
                </h4>
                <p className="text-sm text-slate-600 font-inter mb-4">
                  Set your first financial goal to start tracking your progress.
                </p>
                <Link to="/goals">
                  <Button className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-semibold">
                    Set Your First Goal →
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Financial Tip Card */}
            <Card className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-brand-yellow/10 to-amber-100/20 border-brand-yellow/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-brand-yellow/20 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-brand-yellow" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-poppins">Financial Tip</h3>
              </div>
              <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                <p className="text-sm text-slate-700 font-inter">
                  <span className="font-bold text-brand-green">Build an emergency fund</span> of 3-6 months of expenses.
                  This safety net protects you from unexpected costs and helps avoid debt when emergencies arise.
                </p>
              </div>
              <Link to="/goals">
                <Button className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-slate-900 font-semibold">
                  Set Emergency Fund Goal
                </Button>
              </Link>
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
    </>
  );
};
