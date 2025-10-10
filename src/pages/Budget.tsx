import { useState } from 'react';
import { Wallet, Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Budget = () => {
  const { t } = useLanguage();
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');

  const handleCalculate = () => {
    if (!income || !expenses) {
      toast.error('Please enter both income and expenses');
      return;
    }
    const cashFlow = parseFloat(income) - parseFloat(expenses);
    toast.success(`Your monthly cash flow is $${cashFlow.toFixed(2)}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8 md:pt-20">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Wallet className="w-8 h-8 text-primary" />
            {t('budgetTitle')}
          </h1>
          <p className="text-muted-foreground">
            Track your income and expenses to manage your cash flow
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                {t('income')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="income">Monthly Income</Label>
                <Input
                  id="income"
                  type="number"
                  placeholder="3000"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-destructive" />
                {t('expenses')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="expenses">Monthly Expenses</Label>
                <Input
                  id="expenses"
                  type="number"
                  placeholder="2400"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-primary mb-6">
          <CardHeader>
            <CardTitle>{t('cashFlow')}</CardTitle>
            <CardDescription>Your monthly financial balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center py-6">
              {income && expenses ? (
                <span className={(parseFloat(income) - parseFloat(expenses)) >= 0 ? 'text-success' : 'text-destructive'}>
                  ${(parseFloat(income) - parseFloat(expenses)).toFixed(2)}
                </span>
              ) : (
                <span className="text-muted-foreground">$0.00</span>
              )}
            </div>
            <Button onClick={handleCalculate} className="w-full">
              Calculate Cash Flow
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Budget;
