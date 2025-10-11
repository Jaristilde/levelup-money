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
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Wallet className="w-8 h-8 text-primary" aria-hidden="true" />
            {t('budgetTitle')}
          </h1>
          <p className="text-muted-foreground">
            Track your income and expenses to manage your cash flow
          </p>
        </header>

        <section aria-labelledby="income-expenses-heading">
          <h2 id="income-expenses-heading" className="sr-only">Income and Expenses Input</h2>
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-success" aria-hidden="true" />
                  {t('income')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="income">Monthly Income <span aria-label="required">*</span></Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="3000"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    aria-required="true"
                    aria-describedby="income-description"
                  />
                  <span id="income-description" className="sr-only">Enter your total monthly income</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-destructive" aria-hidden="true" />
                  {t('expenses')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="expenses">Monthly Expenses <span aria-label="required">*</span></Label>
                  <Input
                    id="expenses"
                    type="number"
                    placeholder="2400"
                    value={expenses}
                    onChange={(e) => setExpenses(e.target.value)}
                    aria-required="true"
                    aria-describedby="expenses-description"
                  />
                  <span id="expenses-description" className="sr-only">Enter your total monthly expenses</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section aria-labelledby="cash-flow-heading">
          <Card className="border-primary mb-6">
            <CardHeader>
              <CardTitle id="cash-flow-heading">{t('cashFlow')}</CardTitle>
              <CardDescription>Your monthly financial balance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-center py-6" role="status" aria-live="polite">
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
                aria-label="Calculate your monthly cash flow"
              >
                Calculate Cash Flow
              </LoadingButton>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Budget;
