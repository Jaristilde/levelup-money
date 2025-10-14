import { useState } from 'react';
import { Wallet, Plus, TrendingUp, TrendingDown, DollarSign, Trash2, Edit2, Check, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface IncomeSource {
  id: string;
  name: string;
  amount: number;
  frequency: 'weekly' | 'monthly';
}

interface ExpenseCategory {
  id: string;
  category: string;
  amount: number;
}

const Budget = () => {
  // Income State
  const [incomes, setIncomes] = useState<IncomeSource[]>([
    { id: '1', name: 'Salary', amount: 4000, frequency: 'monthly' },
  ]);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [newIncome, setNewIncome] = useState<{ name: string; amount: number; frequency: 'weekly' | 'monthly' }>({ name: '', amount: 0, frequency: 'monthly' });

  // Expense State
  const [expenses, setExpenses] = useState<ExpenseCategory[]>([
    { id: '1', category: 'rent', amount: 1500 },
    { id: '2', category: 'groceries', amount: 400 },
    { id: '3', category: 'transportation', amount: 200 },
  ]);

  // Expense categories with labels
  const expenseCategories = {
    // Fixed Expenses
    rent: 'Rent/Mortgage',
    utilities: 'Utilities',
    phone: 'Phone',
    internet: 'Internet',
    insurance: 'Insurance',
    // Variable Expenses
    groceries: 'Groceries',
    gas: 'Gas/Fuel',
    shopping: 'Shopping',
    entertainment: 'Entertainment',
    dining: 'Dining Out',
    // Medical
    medical: 'Doctor Visits',
    medications: 'Medications',
    health_insurance: 'Health Insurance',
    // Transportation
    transportation: 'Transportation',
    car_maintenance: 'Car Maintenance',
    parking: 'Parking',
    public_transport: 'Public Transport',
    // Fitness
    gym: 'Gym',
    sports: 'Sports Equipment',
    wellness: 'Wellness',
    // Education
    tuition: 'Tuition',
    books: 'Books',
    materials: 'Materials',
    courses: 'Courses',
    // Other
    subscriptions: 'Subscriptions',
    personal_care: 'Personal Care',
    pets: 'Pet Care',
    savings: 'Savings',
    debt_payments: 'Debt Payments',
    other: 'Other',
  };

  // Calculate totals
  const monthlyIncome = incomes.reduce((sum, income) => {
    return sum + (income.frequency === 'weekly' ? income.amount * 4.33 : income.amount);
  }, 0);

  const weeklyIncome = monthlyIncome / 4.33;

  const monthlyExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const weeklyExpenses = monthlyExpenses / 4.33;

  const monthlySafeToSpend = monthlyIncome - monthlyExpenses;
  const weeklySafeToSpend = weeklyIncome - weeklyExpenses;

  // Income handlers
  const handleAddIncome = () => {
    if (newIncome.name && newIncome.amount > 0) {
      setIncomes([...incomes, { id: Date.now().toString(), ...newIncome }]);
      setNewIncome({ name: '', amount: 0, frequency: 'monthly' });
      setShowAddIncome(false);
    }
  };

  const handleDeleteIncome = (id: string) => {
    setIncomes(incomes.filter(income => income.id !== id));
  };

  // Expense handlers
  const handleUpdateExpense = (id: string, amount: number) => {
    setExpenses(expenses.map(expense =>
      expense.id === id ? { ...expense, amount } : expense
    ));
  };

  const handleAddExpense = () => {
    // Find first category not already in use
    const usedCategories = expenses.map(e => e.category);
    const availableCategory = Object.keys(expenseCategories).find(
      cat => !usedCategories.includes(cat)
    );

    if (availableCategory) {
      setExpenses([...expenses, {
        id: Date.now().toString(),
        category: availableCategory,
        amount: 0,
      }]);
    }
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleCategoryChange = (id: string, newCategory: string) => {
    setExpenses(expenses.map(expense =>
      expense.id === id ? { ...expense, category: newCategory } : expense
    ));
  };

  // Calculate expense percentages
  const getExpensePercentage = (amount: number) => {
    if (monthlyIncome === 0) return 0;
    return ((amount / monthlyIncome) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 lg:pb-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <nav className="text-sm text-slate-500 mb-2" aria-label="Breadcrumb">
                Home &gt; Budget
              </nav>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                <Wallet className="w-8 h-8 text-emerald-600" />
                Budget Planner
              </h1>
              <p className="text-slate-600">
                Track your income and expenses to manage your finances effectively
              </p>
            </div>
          </div>
        </header>

        {/* Budget Summary Dashboard */}
        <section className="mb-8" aria-label="Budget summary">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Total Income */}
            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-slate-700">Total Income</h3>
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  ${monthlyIncome.toFixed(0)}
                </div>
                <div className="text-xs text-slate-600">
                  ${weeklyIncome.toFixed(0)} per week
                </div>
              </CardContent>
            </Card>

            {/* Total Expenses */}
            <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-slate-700">Total Expenses</h3>
                  <TrendingDown className="w-5 h-5 text-red-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  ${monthlyExpenses.toFixed(0)}
                </div>
                <div className="text-xs text-slate-600">
                  ${weeklyExpenses.toFixed(0)} per week
                </div>
              </CardContent>
            </Card>

            {/* Safe to Spend (Monthly) */}
            <Card className={`bg-gradient-to-br ${
              monthlySafeToSpend >= 0
                ? 'from-emerald-50 to-green-50 border-emerald-200/50'
                : 'from-red-50 to-pink-50 border-red-200/50'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-slate-700">Safe to Spend</h3>
                  <DollarSign className={`w-5 h-5 ${monthlySafeToSpend >= 0 ? 'text-emerald-600' : 'text-red-600'}`} />
                </div>
                <div className={`text-3xl font-bold mb-2 ${monthlySafeToSpend >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                  ${Math.abs(monthlySafeToSpend).toFixed(0)}
                </div>
                <div className="text-xs text-slate-600">
                  {monthlySafeToSpend >= 0 ? 'Surplus' : 'Deficit'} per month
                </div>
              </CardContent>
            </Card>

            {/* Weekly Safe to Spend */}
            <Card className={`bg-gradient-to-br ${
              weeklySafeToSpend >= 0
                ? 'from-blue-50 to-cyan-50 border-blue-200/50'
                : 'from-orange-50 to-amber-50 border-orange-200/50'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-slate-700">Weekly Budget</h3>
                  <DollarSign className={`w-5 h-5 ${weeklySafeToSpend >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
                </div>
                <div className={`text-3xl font-bold mb-2 ${weeklySafeToSpend >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>
                  ${Math.abs(weeklySafeToSpend).toFixed(0)}
                </div>
                <div className="text-xs text-slate-600">
                  {weeklySafeToSpend >= 0 ? 'Available' : 'Over budget'} per week
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Income Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
                Income Sources
              </h2>
              <Button
                onClick={() => setShowAddIncome(true)}
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Income
              </Button>
            </div>

            <Card className="mb-4">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {incomes.map((income) => (
                    <div key={income.id} className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900">{income.name}</div>
                        <div className="text-sm text-slate-600">
                          ${income.amount.toLocaleString()} per {income.frequency}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteIncome(income.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}

                  {showAddIncome && (
                    <div className="p-4 bg-white border-2 border-emerald-200 rounded-lg space-y-3">
                      <div>
                        <Label htmlFor="income-name">Income Name</Label>
                        <Input
                          id="income-name"
                          placeholder="e.g., Salary, Freelance"
                          value={newIncome.name}
                          onChange={(e) => setNewIncome({ ...newIncome, name: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="income-amount">Amount</Label>
                          <Input
                            id="income-amount"
                            type="number"
                            placeholder="0"
                            value={newIncome.amount || ''}
                            onChange={(e) => setNewIncome({ ...newIncome, amount: Number(e.target.value) })}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="income-frequency">Frequency</Label>
                          <Select
                            value={newIncome.frequency}
                            onValueChange={(value) => setNewIncome({ ...newIncome, frequency: value as 'weekly' | 'monthly' })}
                          >
                            <SelectTrigger id="income-frequency" className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={handleAddIncome}
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700 flex-1"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Add
                        </Button>
                        <Button
                          onClick={() => {
                            setShowAddIncome(false);
                            setNewIncome({ name: '', amount: 0, frequency: 'monthly' });
                          }}
                          size="sm"
                          variant="outline"
                          className="flex-1"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Expenses Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <TrendingDown className="w-6 h-6 text-red-600" />
                Expenses
              </h2>
              <Button
                onClick={handleAddExpense}
                size="sm"
                className="bg-red-600 hover:bg-red-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {expenses.map((expense) => (
                    <div key={expense.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <Select
                          value={expense.category}
                          onValueChange={(value) => handleCategoryChange(expense.id, value)}
                        >
                          <SelectTrigger className="h-9 bg-white text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white max-h-[300px]">
                            {Object.entries(expenseCategories).map(([key, label]) => (
                              <SelectItem key={key} value={key} className="text-sm">
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-28">
                        <Input
                          type="number"
                          placeholder="0"
                          value={expense.amount || ''}
                          onChange={(e) => handleUpdateExpense(expense.id, Number(e.target.value))}
                          className="h-9 text-sm"
                        />
                      </div>
                      <div className="text-xs text-slate-600 w-12 text-right">
                        {getExpensePercentage(expense.amount)}%
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteExpense(expense.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 h-9 w-9 p-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-slate-900">Monthly Total:</span>
                    <span className="text-2xl font-bold text-slate-900">
                      ${monthlyExpenses.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-slate-600">
                    <span>Weekly Total:</span>
                    <span className="font-semibold">
                      ${weeklyExpenses.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Spending by Category Breakdown */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Spending Breakdown
          </h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {expenses
                  .sort((a, b) => b.amount - a.amount)
                  .map((expense) => {
                    const percentage = getExpensePercentage(expense.amount);
                    return (
                      <div key={expense.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-slate-700">
                            {expenseCategories[expense.category as keyof typeof expenseCategories]}
                          </span>
                          <span className="text-slate-900 font-semibold">
                            ${expense.amount.toFixed(0)} ({percentage}%)
                          </span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all"
                            style={{ width: `${Math.min(Number(percentage), 100)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Budget;
