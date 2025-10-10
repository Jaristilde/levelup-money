import { useState } from 'react';
import { CheckCircle2, Circle, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';

interface ChecklistItem {
  id: string;
  label: string;
  isDone: boolean;
}

interface MilestoneCardProps {
  number: number;
  title: string;
  goal: string;
  checklist: ChecklistItem[];
  targetAmount?: number;
  onChecklistChange: (itemId: string, checked: boolean) => void;
  details?: string;
}

export const MilestoneCard = ({
  number,
  title,
  goal,
  checklist,
  targetAmount,
  onChecklistChange,
  details,
}: MilestoneCardProps) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const completedItems = checklist.filter(item => item.isDone).length;
  const progress = (completedItems / checklist.length) * 100;
  const isComplete = completedItems === checklist.length;
  
  const getStatusColor = () => {
    if (isComplete) return 'text-success';
    if (completedItems > 0) return 'text-warning';
    return 'text-muted-foreground';
  };
  
  const getStatusBg = () => {
    if (isComplete) return 'bg-success/10 border-success/30';
    if (completedItems > 0) return 'bg-warning/10 border-warning/30';
    return 'bg-muted/10 border-border';
  };

  return (
    <Card className={`transition-all duration-300 border-2 ${getStatusBg()}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${getStatusBg()}`}>
              {isComplete ? (
                <CheckCircle2 className="w-6 h-6 text-success" />
              ) : (
                <span className={getStatusColor()}>{number}</span>
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{goal}</p>
            </div>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-primary">
                <Info className="w-4 h-4 mr-1" />
                {t('viewDetails')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-muted-foreground">{goal}</p>
                {details && <p className="text-sm">{details}</p>}
                {targetAmount && (
                  <div className="p-4 rounded-lg bg-primary/10">
                    <p className="text-sm text-muted-foreground">{t('starterTarget')}</p>
                    <p className="text-2xl font-bold text-primary">${targetAmount.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-3 mb-4">
          {checklist.map((item) => (
            <div key={item.id} className="flex items-start gap-3 p-2 rounded hover:bg-accent/5 transition-colors">
              <Checkbox
                id={item.id}
                checked={item.isDone}
                onCheckedChange={(checked) => onChecklistChange(item.id, checked === true)}
                className="mt-1"
              />
              <label
                htmlFor={item.id}
                className={`text-sm cursor-pointer flex-1 ${
                  item.isDone ? 'line-through text-muted-foreground' : 'text-foreground'
                }`}
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {completedItems} of {checklist.length} completed
            </span>
            <span className={`font-medium ${getStatusColor()}`}>
              {isComplete ? t('complete') : completedItems > 0 ? t('inProgress') : t('notStarted')}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};
