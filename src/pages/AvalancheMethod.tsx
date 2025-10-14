import { useState } from 'react';
import { Target, Plus, Trash2, Edit2, Check, X, TrendingDown, DollarSign, Calendar, Award, ArrowLeft, AlertCircle, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

interface Debt {
  id: string;
  name: string;
  balance: number;
  minimumPayment: number;
  interestRate: number;
  type: 'credit-card' | 'loan' | 'medical' | 'other';
}

const AvalancheMethod = () => {
  const [extraPayment, setExtraPayment] = useState(350);
  const [isAddingDebt, setIsAddingDebt] = useState(false);
  const [editingDebtId, setEditingDebtId] = useState<string | null>(null);

  // Form state for new/editing debt
  const [formData, setFormData] = useState({
    name: '',
    balance: '',
    minimumPayment: '',
    interestRate: '',
    type: 'credit-card' as Debt['type']
  });

  const [debts, setDebts] = useState<Debt[]>([
    {
      id: '1',
      name: 'Credit Card (Chase)',
      balance: 1200,
      minimumPayment: 35,
      interestRate: 18.99,
      type: 'credit-card'
    },
    {
      id: '2',
      name: 'Medical Bill',
      balance: 1800,
      minimumPayment: 50,
      interestRate: 0,
      type: 'medical'
    },
    {
      id: '3',
      name: 'Personal Loan',
      balance: 3450,
      minimumPayment: 120,
      interestRate: 12.5,
      type: 'loan'
    },
    {
      id: '4',
      name: 'Credit Card (Capital One)',
      balance: 6000,
      minimumPayment: 150,
      interestRate: 22.99,
      type: 'credit-card'
    }
  ]);

  // Sort debts by interest rate (highest first) - Avalanche Method
  const sortedDebts = [...debts].sort((a, b) => b.interestRate - a.interestRate);

  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMinimumPayment = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0);
  const totalMonthlyPayment = totalMinimumPayment + extraPayment;

  // Calculate payoff timeline
  const calculatePayoffTimeline = () => {
    let remainingDebts = sortedDebts.map(d => ({ ...d, remainingBalance: d.balance }));
    let month = 0;
    let totalInterestPaid = 0;
    const payoffSchedule: { month: number; debtName: string; balance: number }[] = [];

    while (remainingDebts.some(d => d.remainingBalance > 0)) {
      month++;
      let availableExtra = extraPayment;

      // Pay minimums on all debts
      remainingDebts = remainingDebts.map(debt => {
        if (debt.remainingBalance <= 0) return debt;

        const monthlyInterest = (debt.remainingBalance * (debt.interestRate / 100)) / 12;
        totalInterestPaid += monthlyInterest;
        const principalPayment = debt.minimumPayment - monthlyInterest;

        return {
          ...debt,
          remainingBalance: Math.max(0, debt.remainingBalance - principalPayment)
        };
      });

      // Apply extra payment to highest interest rate debt
      for (let i = 0; i < remainingDebts.length; i++) {
        if (remainingDebts[i].remainingBalance > 0 && availableExtra > 0) {
          const extraApplied = Math.min(availableExtra, remainingDebts[i].remainingBalance);
          remainingDebts[i].remainingBalance -= extraApplied;
          availableExtra -= extraApplied;

          if (remainingDebts[i].remainingBalance === 0) {
            payoffSchedule.push({
              month,
              debtName: remainingDebts[i].name,
              balance: debts.find(d => d.id === remainingDebts[i].id)?.balance || 0
            });
          }
          break;
        }
      }

      // Safety check to prevent infinite loop
      if (month > 360) break;
    }

    return { months: month, totalInterestPaid, payoffSchedule };
  };

  // Calculate Snowball method for comparison
  const calculateSnowballComparison = () => {
    const snowballSorted = [...debts].sort((a, b) => a.balance - b.balance);
    let remainingDebts = snowballSorted.map(d => ({ ...d, remainingBalance: d.balance }));
    let month = 0;
    let totalInterestPaid = 0;

    while (remainingDebts.some(d => d.remainingBalance > 0)) {
      month++;
      let availableExtra = extraPayment;

      remainingDebts = remainingDebts.map(debt => {
        if (debt.remainingBalance <= 0) return debt;

        const monthlyInterest = (debt.remainingBalance * (debt.interestRate / 100)) / 12;
        totalInterestPaid += monthlyInterest;
        const principalPayment = debt.minimumPayment - monthlyInterest;

        return {
          ...debt,
          remainingBalance: Math.max(0, debt.remainingBalance - principalPayment)
        };
      });

      for (let i = 0; i < remainingDebts.length; i++) {
        if (remainingDebts[i].remainingBalance > 0 && availableExtra > 0) {
          const extraApplied = Math.min(availableExtra, remainingDebts[i].remainingBalance);
          remainingDebts[i].remainingBalance -= extraApplied;
          availableExtra -= extraApplied;
          break;
        }
      }

      if (month > 360) break;
    }

    return { months: month, totalInterestPaid };
  };

  const timeline = calculatePayoffTimeline();
  const snowballTimeline = calculateSnowballComparison();
  const debtFreeDate = new Date();
  debtFreeDate.setMonth(debtFreeDate.getMonth() + timeline.months);

  const interestSavings = snowballTimeline.totalInterestPaid - timeline.totalInterestPaid;
  const timeSavings = snowballTimeline.months - timeline.months;

  const handleAddDebt = () => {
    if (!formData.name || !formData.balance || !formData.minimumPayment) return;

    const newDebt: Debt = {
      id: Date.now().toString(),
      name: formData.name,
      balance: parseFloat(formData.balance),
      minimumPayment: parseFloat(formData.minimumPayment),
      interestRate: parseFloat(formData.interestRate) || 0,
      type: formData.type
    };

    setDebts([...debts, newDebt]);
    resetForm();
  };

  const handleEditDebt = () => {
    if (!editingDebtId || !formData.name || !formData.balance || !formData.minimumPayment) return;

    setDebts(debts.map(debt =>
      debt.id === editingDebtId
        ? {
            ...debt,
            name: formData.name,
            balance: parseFloat(formData.balance),
            minimumPayment: parseFloat(formData.minimumPayment),
            interestRate: parseFloat(formData.interestRate) || 0,
            type: formData.type
          }
        : debt
    ));
    resetForm();
  };

  const handleDeleteDebt = (id: string) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  const startEdit = (debt: Debt) => {
    setFormData({
      name: debt.name,
      balance: debt.balance.toString(),
      minimumPayment: debt.minimumPayment.toString(),
      interestRate: debt.interestRate.toString(),
      type: debt.type
    });
    setEditingDebtId(debt.id);
    setIsAddingDebt(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      balance: '',
      minimumPayment: '',
      interestRate: '',
      type: 'credit-card'
    });
    setIsAddingDebt(false);
    setEditingDebtId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 lg:pb-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Header */}
        <header className="mb-8">
          <Link to="/debt" className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-blue/80 mb-4 font-inter text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Back to Debt Management
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-blue-light rounded-2xl flex items-center justify-center shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-poppins">
                    Avalanche Method Calculator
                  </h1>
                  <p className="text-lg text-slate-600 font-inter">
                    Pay off highest interest debts first to save money
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setIsAddingDebt(true)}
              className="bg-brand-blue hover:bg-brand-blue/90 text-white shadow-lg font-semibold rounded-xl px-6"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Debt
            </Button>
          </div>
        </header>

        {/* Info Banner */}
        <div className="mb-6 bg-gradient-to-r from-brand-blue/10 to-brand-blue-light/10 border-2 border-brand-blue/30 rounded-xl p-4 flex items-start gap-3">
          <div className="w-10 h-10 bg-brand-blue/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Target className="w-5 h-5 text-brand-blue" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1 font-poppins">
              How the Avalanche Method Works
            </h3>
            <p className="text-sm text-slate-700 font-inter">
              Focus on paying off your highest interest rate debt first while making minimum payments on others. This mathematically
              optimal approach saves you the most money in interest, even if it takes longer to see your first debt paid off.
            </p>
          </div>
        </div>

        {/* Savings Comparison Banner */}
        {interestSavings > 0 && (
          <div className="mb-6 bg-gradient-to-r from-brand-green to-emerald-500 text-white rounded-xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/90 font-inter">Avalanche vs Snowball Savings</p>
                  <p className="text-3xl font-bold font-poppins">${Math.round(interestSavings).toLocaleString()}</p>
                  <p className="text-sm text-white/90 font-inter">
                    {timeSavings > 0 ? `Save ${timeSavings} months` : 'Same timeline'} and ${Math.round(interestSavings).toLocaleString()} in interest
                  </p>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-sm text-white/90 font-inter mb-1">Mathematically Optimal</p>
                <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                  💰 Best for Savings
                </Badge>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Debts List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add/Edit Debt Form */}
            {isAddingDebt && (
              <Card className="p-6 rounded-3xl shadow-lg border-2 border-brand-blue/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900 font-poppins">
                    {editingDebtId ? 'Edit Debt' : 'Add New Debt'}
                  </h3>
                  <button
                    onClick={resetForm}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-600" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">Debt Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-inter"
                      placeholder="e.g., Chase Credit Card"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">Current Balance</label>
                    <input
                      type="number"
                      value={formData.balance}
                      onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                      className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-inter"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">Minimum Payment</label>
                    <input
                      type="number"
                      value={formData.minimumPayment}
                      onChange={(e) => setFormData({ ...formData, minimumPayment: e.target.value })}
                      className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-inter"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">Interest Rate (%)</label>
                    <input
                      type="number"
                      value={formData.interestRate}
                      onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                      className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-inter"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">Debt Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as Debt['type'] })}
                      className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-inter bg-white"
                    >
                      <option value="credit-card">Credit Card</option>
                      <option value="loan">Loan</option>
                      <option value="medical">Medical Bill</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={resetForm}
                    variant="outline"
                    className="flex-1 border-2 border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={editingDebtId ? handleEditDebt : handleAddDebt}
                    disabled={!formData.name || !formData.balance || !formData.minimumPayment}
                    className="flex-1 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold rounded-xl"
                  >
                    {editingDebtId ? 'Update Debt' : 'Add Debt'}
                  </Button>
                </div>
              </Card>
            )}

            {/* Debts List - Sorted by Interest Rate (Highest First) */}
            <Card className="p-6 rounded-3xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-poppins">Your Debts</h3>
                  <p className="text-sm text-slate-600 font-inter">Sorted by interest rate (highest first)</p>
                </div>
                <Badge className="bg-brand-blue/10 text-brand-blue border-0 px-3 py-1">
                  {debts.length} {debts.length === 1 ? 'Debt' : 'Debts'}
                </Badge>
              </div>

              {sortedDebts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-600 font-inter">No debts added yet. Click "Add Debt" to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedDebts.map((debt, index) => (
                    <div
                      key={debt.id}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        index === 0
                          ? 'bg-gradient-to-r from-brand-blue/10 to-brand-blue-light/10 border-brand-blue/30 shadow-lg'
                          : 'bg-white border-slate-200 hover:border-brand-blue/20'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-base font-bold text-slate-900 font-poppins">{debt.name}</h4>
                            {index === 0 && (
                              <Badge className="bg-brand-blue text-white border-0 text-xs">
                                <Target className="w-3 h-3 mr-1" />
                                Focus Here!
                              </Badge>
                            )}
                            {index === 1 && (
                              <Badge className="bg-brand-green/10 text-brand-green border-0 text-xs">
                                Next Up
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-600 font-inter">
                            <span className="capitalize">{debt.type.replace('-', ' ')}</span>
                            <span>•</span>
                            <span className="font-bold text-brand-blue">{debt.interestRate}% APR</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => startEdit(debt)}
                            className="w-8 h-8 rounded-lg bg-brand-blue/10 hover:bg-brand-blue/20 flex items-center justify-center transition-colors"
                          >
                            <Edit2 className="w-4 h-4 text-brand-blue" />
                          </button>
                          <button
                            onClick={() => handleDeleteDebt(debt.id)}
                            className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white rounded-xl p-3 border border-slate-200">
                          <p className="text-xs text-slate-600 mb-1 font-inter">Balance</p>
                          <p className="text-lg font-bold text-slate-900 font-poppins">
                            ${debt.balance.toLocaleString()}
                          </p>
                        </div>
                        <div className="bg-white rounded-xl p-3 border border-slate-200">
                          <p className="text-xs text-slate-600 mb-1 font-inter">Min. Payment</p>
                          <p className="text-lg font-bold text-slate-900 font-poppins">
                            ${debt.minimumPayment.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {index === 0 && (
                        <div className="mt-3 p-3 bg-white rounded-xl border-2 border-brand-blue/30">
                          <p className="text-xs font-semibold text-brand-blue font-inter">
                            💡 Apply your extra ${extraPayment} payment here to minimize interest charges!
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Summary & Projections */}
          <div className="space-y-6">
            {/* Extra Payment Input */}
            <Card className="p-6 rounded-3xl shadow-lg bg-gradient-to-br from-brand-blue via-brand-blue-light to-blue-500 text-white">
              <h3 className="text-lg font-bold mb-2 font-poppins">Extra Monthly Payment</h3>
              <p className="text-sm text-white/90 mb-4 font-inter">
                Amount available beyond minimum payments
              </p>
              <div className="relative mb-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold">$</span>
                <input
                  type="number"
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(parseFloat(e.target.value) || 0)}
                  className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl text-3xl font-bold text-white placeholder-white/50 focus:border-white focus:ring-2 focus:ring-white/30 outline-none transition-all font-poppins"
                  min="0"
                  step="10"
                />
              </div>
              <p className="text-xs text-white/80 font-inter">
                Total monthly payment: ${totalMonthlyPayment.toLocaleString()}
              </p>
            </Card>

            {/* Summary Stats */}
            <Card className="p-6 rounded-3xl shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4 font-poppins">Payoff Summary</h3>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-slate-600" />
                    <p className="text-xs text-slate-600 font-inter">Total Debt</p>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 font-poppins">
                    ${totalDebt.toLocaleString()}
                  </p>
                </div>

                <div className="p-4 bg-brand-blue/10 rounded-xl border-2 border-brand-blue/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-brand-blue" />
                    <p className="text-xs text-slate-600 font-inter">Time to Debt Freedom</p>
                  </div>
                  <p className="text-2xl font-bold text-brand-blue font-poppins">
                    {timeline.months} months
                  </p>
                  <p className="text-xs text-slate-600 mt-1 font-inter">
                    {debtFreeDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                </div>

                <div className="p-4 bg-brand-green/10 rounded-xl border-2 border-brand-green/20">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingDown className="w-4 h-4 text-brand-green" />
                    <p className="text-xs text-slate-600 font-inter">Total Interest</p>
                  </div>
                  <p className="text-2xl font-bold text-brand-green font-poppins">
                    ${Math.round(timeline.totalInterestPaid).toLocaleString()}
                  </p>
                  {interestSavings > 0 && (
                    <p className="text-xs text-brand-green font-semibold mt-1 font-inter">
                      Save ${Math.round(interestSavings).toLocaleString()} vs Snowball
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 text-center">
                <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-900 font-poppins mb-1">
                  Money Saver Achievement
                </p>
                <p className="text-xs text-slate-600 font-inter">
                  The most cost-effective debt payoff strategy!
                </p>
              </div>
            </Card>

            {/* Payoff Order */}
            <Card className="p-6 rounded-3xl shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4 font-poppins">Payoff Order</h3>

              <div className="space-y-2">
                {sortedDebts.map((debt, index) => (
                  <div
                    key={debt.id}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm font-poppins ${
                      index === 0
                        ? 'bg-brand-blue text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate font-inter">
                        {debt.name}
                      </p>
                      <p className="text-xs text-slate-600 font-inter">
                        {debt.interestRate}% APR • ${debt.balance.toLocaleString()}
                      </p>
                    </div>
                    {index === 0 && <Check className="w-5 h-5 text-brand-blue" />}
                  </div>
                ))}
              </div>
            </Card>

            {/* Compare with Snowball */}
            <Link to="/snowball-method">
              <Card className="p-4 rounded-2xl shadow-lg bg-gradient-to-r from-brand-green/10 to-emerald-50 border-2 border-brand-green/30 hover:border-brand-green/50 transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900 font-poppins mb-1">
                      Compare with Snowball
                    </p>
                    <p className="text-xs text-slate-600 font-inter">
                      See quick wins approach
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-brand-green/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 text-brand-green" />
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvalancheMethod;
