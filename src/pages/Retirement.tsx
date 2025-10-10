import { useState } from 'react';
import { PiggyBank, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const Retirement = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    age: '',
    retirementAge: '65',
    currentSavings: '',
    monthlyContribution: '',
    annualIncome: '',
  });
  const [result, setResult] = useState<any>(null);

  const handleCheck = () => {
    if (!formData.age || !formData.annualIncome) {
      toast.error('Please fill in your age and annual income');
      return;
    }

    const age = parseInt(formData.age);
    const retirementAge = parseInt(formData.retirementAge);
    const yearsUntilRetirement = retirementAge - age;
    const currentSavings = parseFloat(formData.currentSavings) || 0;
    const monthlyContribution = parseFloat(formData.monthlyContribution) || 0;
    const annualIncome = parseFloat(formData.annualIncome);

    // Simple retirement calculation
    const recommendedSavings = annualIncome * 10; // Rule of thumb: 10x annual income by retirement
    const projectedSavings = currentSavings + (monthlyContribution * 12 * yearsUntilRetirement * 1.05); // Assuming 5% growth
    const readinessPercentage = Math.min((projectedSavings / recommendedSavings) * 100, 100);
    const monthlyNeeded = Math.max((recommendedSavings - projectedSavings) / (yearsUntilRetirement * 12), 0);

    setResult({
      recommendedSavings,
      projectedSavings,
      readinessPercentage,
      monthlyNeeded,
      yearsUntilRetirement,
      status: readinessPercentage >= 80 ? 'good' : readinessPercentage >= 50 ? 'fair' : 'behind',
    });

    toast.success('Retirement readiness calculated!');
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8 md:pt-20">
      <div className="max-w-4xl mx-auto px-4 py-4 md:py-6">
        <div className="mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <PiggyBank className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            {t('retirementTitle')}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Check your retirement readiness and plan for the future
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
            <CardDescription>Enter your details to check retirement readiness</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="age">Current Age *</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="35"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="retirement-age">Planned Retirement Age</Label>
                <Input
                  id="retirement-age"
                  type="number"
                  placeholder="65"
                  value={formData.retirementAge}
                  onChange={(e) => setFormData({ ...formData, retirementAge: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="income">Annual Income *</Label>
              <Input
                id="income"
                type="number"
                placeholder="50000"
                value={formData.annualIncome}
                onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="savings">Current Retirement Savings</Label>
              <Input
                id="savings"
                type="number"
                placeholder="25000"
                value={formData.currentSavings}
                onChange={(e) => setFormData({ ...formData, currentSavings: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthly">Monthly Contribution</Label>
              <Input
                id="monthly"
                type="number"
                placeholder="500"
                value={formData.monthlyContribution}
                onChange={(e) => setFormData({ ...formData, monthlyContribution: e.target.value })}
              />
            </div>
            <Button onClick={handleCheck} className="w-full min-h-[48px]">
              {t('checkReadiness')}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <div className="space-y-4">
            <Card className={`border-2 ${
              result.status === 'good' ? 'border-success' :
              result.status === 'fair' ? 'border-warning' :
              'border-destructive'
            }`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {result.status === 'good' ? (
                    <><CheckCircle2 className="w-6 h-6 text-success" /> On Track!</>
                  ) : result.status === 'fair' ? (
                    <><AlertCircle className="w-6 h-6 text-warning" /> Getting There</>
                  ) : (
                    <><AlertCircle className="w-6 h-6 text-destructive" /> Need to Catch Up</>
                  )}
                </CardTitle>
                <CardDescription>Your retirement readiness score</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Readiness</span>
                    <span className="font-semibold">{result.readinessPercentage.toFixed(0)}%</span>
                  </div>
                  <Progress value={result.readinessPercentage} className="h-3" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Projected Savings</p>
                    <p className="text-xl font-bold">${result.projectedSavings.toFixed(0)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Recommended</p>
                    <p className="text-xl font-bold">${result.recommendedSavings.toFixed(0)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.monthlyNeeded > 0 ? (
                  <>
                    <p className="text-sm">
                      To reach your retirement goal, you should save an additional <span className="font-semibold">${result.monthlyNeeded.toFixed(2)}/month</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      You have {result.yearsUntilRetirement} years until retirement to build your savings.
                    </p>
                  </>
                ) : (
                  <p className="text-sm">
                    Great job! You're on track to meet your retirement goals. Keep up your current savings rate.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Retirement;
