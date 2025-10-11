import { useState } from 'react';
import { CreditCard, Plus, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface Debt {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
}

const Debt = () => {
  const { t } = useLanguage();
  const [debts, setDebts] = useState<Debt[]>([]);
  const [strategy, setStrategy] = useState<'snowball' | 'avalanche'>('snowball');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    balance: '',
    interestRate: '',
    minimumPayment: '',
  });

  const handleAddDebt = () => {
    if (!formData.name || !formData.balance) {
      toast.error('Please fill in at least debt name and balance');
      return;
    }

    const newDebt: Debt = {
      id: Date.now().toString(),
      name: formData.name,
      balance: parseFloat(formData.balance),
      interestRate: parseFloat(formData.interestRate) || 0,
      minimumPayment: parseFloat(formData.minimumPayment) || 0,
    };

    setDebts([...debts, newDebt]);
    setFormData({ name: '', balance: '', interestRate: '', minimumPayment: '' });
    setShowForm(false);
    toast.success('Debt added successfully');
  };

  const handleRemoveDebt = (id: string) => {
    setDebts(debts.filter(d => d.id !== id));
    toast.success('Debt removed');
  };

  const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8 md:pt-20">
      <div className="max-w-4xl mx-auto px-4 py-4 md:py-6">
        <header className="mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-primary" aria-hidden="true" />
            {t('debtTitle')}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Create a strategic plan to pay off your debts
          </p>
        </header>

        <section aria-labelledby="total-debt-heading">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle id="total-debt-heading">{t('totalDebt')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-center py-4" role="status" aria-live="polite" aria-atomic="true">
                ${totalDebt.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="strategy-heading">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle id="strategy-heading">{t('payoffStrategy')}</CardTitle>
              <CardDescription>Choose your preferred debt payoff method</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={strategy} onValueChange={(v) => setStrategy(v as 'snowball' | 'avalanche')}>
                <SelectTrigger aria-label="Select debt payoff strategy">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="snowball">Snowball (Smallest Balance First)</SelectItem>
                  <SelectItem value="avalanche">Avalanche (Highest Interest First)</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="debt-list-heading">
          <h2 id="debt-list-heading" className="sr-only">Your Debts</h2>
          <div className="space-y-4 mb-6" role="list">
            {debts.map((debt) => (
              <Card key={debt.id} role="listitem">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{debt.name}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveDebt(debt.id)}
                      aria-label={`Remove ${debt.name} debt`}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" aria-hidden="true" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Balance:</span>
                      <span className="font-semibold">${debt.balance.toFixed(2)}</span>
                    </div>
                    {debt.interestRate > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Interest Rate:</span>
                        <span>{debt.interestRate}%</span>
                      </div>
                    )}
                    {debt.minimumPayment > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Minimum Payment:</span>
                        <span>${debt.minimumPayment.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {showForm ? (
          <Card>
            <CardHeader>
              <CardTitle>Add New Debt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="debt-name">Debt Name <span aria-label="required">*</span></Label>
                <Input
                  id="debt-name"
                  placeholder="Credit Card, Student Loan, etc."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  aria-required="true"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="debt-balance">Balance <span aria-label="required">*</span></Label>
                <Input
                  id="debt-balance"
                  type="number"
                  placeholder="5000"
                  value={formData.balance}
                  onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                  aria-required="true"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                <Input
                  id="interest-rate"
                  type="number"
                  placeholder="18.5"
                  value={formData.interestRate}
                  onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="min-payment">Minimum Payment</Label>
                <Input
                  id="min-payment"
                  type="number"
                  placeholder="150"
                  value={formData.minimumPayment}
                  onChange={(e) => setFormData({ ...formData, minimumPayment: e.target.value })}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handleAddDebt} className="flex-1 min-h-[48px]">Add Debt</Button>
                <Button variant="outline" onClick={() => setShowForm(false)} className="flex-1 min-h-[44px]">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Button onClick={() => setShowForm(true)} className="w-full min-h-[48px]" aria-label="Add a new debt">
            <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
            Add Debt
          </Button>
        )}
      </div>
    </div>
  );
};

export default Debt;
