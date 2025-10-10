import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface SnapshotData {
  annualIncome: number;
  monthlyExpenses: number;
  totalSavings: number;
  emergencyFund: number;
}

export const SnapshotTool = ({ onComplete }: { onComplete: (data: SnapshotData) => void }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<SnapshotData>({
    annualIncome: 0,
    monthlyExpenses: 0,
    totalSavings: 0,
    emergencyFund: 0,
  });

  const handleSave = () => {
    if (formData.annualIncome === 0) {
      toast.error('Please enter your annual income');
      return;
    }
    
    onComplete(formData);
    toast.success('Snapshot saved successfully!');
    setIsOpen(false);
  };

  const calculateStarterTarget = (income: number) => {
    if (income >= 10000 && income <= 30000) return 1000;
    if (income > 30000 && income <= 40000) return 2000;
    if (income > 40000 && income <= 50000) return 2500;
    if (income > 50000 && income <= 80000) return 3000;
    if (income > 80000 && income <= 120000) return 3500;
    return 3000;
  };

  const dtiRatio = formData.annualIncome > 0 
    ? ((formData.monthlyExpenses * 12) / formData.annualIncome * 100).toFixed(1)
    : '0';

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Calculator className="w-4 h-4" />
          {t('snapshotTitle')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('snapshotTitle')}</DialogTitle>
          <p className="text-sm text-muted-foreground">{t('snapshotSubtitle')}</p>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="annualIncome">{t('annualIncome')}</Label>
              <Input
                id="annualIncome"
                type="number"
                placeholder="$50,000"
                value={formData.annualIncome || ''}
                onChange={(e) => setFormData({ ...formData, annualIncome: parseFloat(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyExpenses">{t('monthlyExpenses')}</Label>
              <Input
                id="monthlyExpenses"
                type="number"
                placeholder="$3,000"
                value={formData.monthlyExpenses || ''}
                onChange={(e) => setFormData({ ...formData, monthlyExpenses: parseFloat(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalSavings">{t('totalSavings')}</Label>
              <Input
                id="totalSavings"
                type="number"
                placeholder="$5,000"
                value={formData.totalSavings || ''}
                onChange={(e) => setFormData({ ...formData, totalSavings: parseFloat(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyFund">{t('emergencyFund')}</Label>
              <Input
                id="emergencyFund"
                type="number"
                placeholder="$2,000"
                value={formData.emergencyFund || ''}
                onChange={(e) => setFormData({ ...formData, emergencyFund: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>

          {formData.annualIncome > 0 && (
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">{t('snapshotSummary')}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('dtiRatio')}</p>
                    <p className="text-xl font-bold text-foreground">{dtiRatio}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('starterTarget')}</p>
                    <p className="text-xl font-bold text-primary">
                      ${calculateStarterTarget(formData.annualIncome).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Button onClick={handleSave} className="w-full">
            {t('saveSnapshot')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
