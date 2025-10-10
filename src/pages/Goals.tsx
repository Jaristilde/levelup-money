import { useState } from 'react';
import { Target, Plus, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/ui/loading-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  timeframe: string;
}

const Goals = () => {
  const { t } = useLanguage();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    target: '',
    current: '',
    timeframe: '3',
  });

  const handleAddGoal = async () => {
    if (!formData.title || !formData.target) {
      toast.error('Please fill in goal name and target amount');
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));

    const newGoal: Goal = {
      id: Date.now().toString(),
      title: formData.title,
      target: parseFloat(formData.target),
      current: parseFloat(formData.current) || 0,
      timeframe: formData.timeframe,
    };

    setGoals([...goals, newGoal]);
    setFormData({ title: '', target: '', current: '', timeframe: '3' });
    setLoading(false);
    setSuccess(true);
    toast.success('Goal added successfully');
    
    setTimeout(() => {
      setSuccess(false);
      setShowForm(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8 md:pt-20">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Target className="w-8 h-8 text-primary" />
            {t('goalsTitle')}
          </h1>
          <p className="text-muted-foreground">
            Set and achieve your financial goals step by step
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {goals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            const monthlyTarget = (goal.target - goal.current) / parseInt(goal.timeframe);
            
            return (
              <Card key={goal.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{goal.title}</span>
                    {progress >= 100 && <CheckCircle2 className="w-6 h-6 text-success" />}
                  </CardTitle>
                  <CardDescription>
                    Target: ${goal.target.toFixed(2)} in {goal.timeframe} months
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span className="font-semibold">{progress.toFixed(0)}%</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Current</p>
                      <p className="text-lg font-semibold">${goal.current.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Monthly Target</p>
                      <p className="text-lg font-semibold">${monthlyTarget.toFixed(2)}</p>
                    </div>
                  </div>
                  {progress < 100 && (
                    <p className="text-xs text-muted-foreground">
                      Save ${monthlyTarget.toFixed(2)} per month to reach your goal
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {showForm ? (
          <Card>
            <CardHeader>
              <CardTitle>{t('setNewGoal')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goal-title">Goal Name *</Label>
                <Input
                  id="goal-title"
                  placeholder="Emergency Fund, Vacation, etc."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal-target">Target Amount *</Label>
                <Input
                  id="goal-target"
                  type="number"
                  placeholder="3000"
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal-current">Current Savings</Label>
                <Input
                  id="goal-current"
                  type="number"
                  placeholder="500"
                  value={formData.current}
                  onChange={(e) => setFormData({ ...formData, current: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeframe">Timeframe (Months)</Label>
                <Select value={formData.timeframe} onValueChange={(v) => setFormData({ ...formData, timeframe: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 months</SelectItem>
                    <SelectItem value="6">6 months</SelectItem>
                    <SelectItem value="12">12 months</SelectItem>
                    <SelectItem value="24">24 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <LoadingButton 
                  onClick={handleAddGoal} 
                  className="flex-1"
                  loading={loading}
                  success={success}
                  loadingText="Adding..."
                  successText="✓ Added"
                >
                  Add Goal
                </LoadingButton>
                <Button 
                  variant="outline" 
                  onClick={() => setShowForm(false)} 
                  className="flex-1"
                  disabled={loading || success}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Button onClick={() => setShowForm(true)} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            {t('setNewGoal')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Goals;
