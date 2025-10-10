import { useState } from 'react';
import { Wallet, Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingButton } from '@/components/ui/loading-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Budget = () => {
  const { t } = useLanguage();
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCalculate = async () => {
    if (!income || !expenses) {
      toast.error('Please enter both income and expenses');
      return;
    }
    
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const cashFlow = parseFloat(income) - parseFloat(expenses);
    setLoading(false);
    setSuccess(true);
    toast.success(`Your monthly cash flow is $${cashFlow.toFixed(2)}`);
    
    setTimeout(() => setSuccess(false), 2000);
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
            <LoadingButton 
              onClick={handleCalculate} 
              className="w-full"
              loading={loading}
              success={success}
              loadingText="Calculating..."
              successText="✓ Complete"
            >
              Calculate Cash Flow
            </LoadingButton>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Budget;
