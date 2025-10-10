import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { MilestoneCard } from './MilestoneCard';
import { SnapshotTool } from './SnapshotTool';
import { ImageIcon } from 'lucide-react';

interface ChecklistItem {
  id: string;
  label: string;
  isDone: boolean;
}

interface MilestoneData {
  id: number;
  checklist: ChecklistItem[];
}

export const MilestoneMap = () => {
  const { t } = useLanguage();
  const [annualIncome, setAnnualIncome] = useState(50000);
  const [snapshotCompleted, setSnapshotCompleted] = useState(false);
  const [milestones, setMilestones] = useState<MilestoneData[]>([
    {
      id: 1,
      checklist: [
        { id: 'm1_1', label: t('m1_check1'), isDone: false },
        { id: 'm1_2', label: t('m1_check2'), isDone: false },
        { id: 'm1_3', label: t('m1_check3'), isDone: false },
      ],
    },
    {
      id: 2,
      checklist: [
        { id: 'm2_1', label: t('m2_check1'), isDone: false },
        { id: 'm2_2', label: t('m2_check2'), isDone: false },
        { id: 'm2_3', label: t('m2_check3'), isDone: false },
      ],
    },
    {
      id: 3,
      checklist: [
        { id: 'm3_1', label: t('m3_check1'), isDone: false },
        { id: 'm3_2', label: t('m3_check2'), isDone: false },
        { id: 'm3_3', label: t('m3_check3'), isDone: false },
      ],
    },
    {
      id: 4,
      checklist: [
        { id: 'm4_1', label: t('m4_check1'), isDone: false },
        { id: 'm4_2', label: t('m4_check2'), isDone: false },
        { id: 'm4_3', label: t('m4_check3'), isDone: false },
      ],
    },
    {
      id: 5,
      checklist: [
        { id: 'm5_1', label: t('m5_check1'), isDone: false },
        { id: 'm5_2', label: t('m5_check2'), isDone: false },
        { id: 'm5_3', label: t('m5_check3'), isDone: false },
      ],
    },
    {
      id: 6,
      checklist: [
        { id: 'm6_1', label: t('m6_check1'), isDone: false },
        { id: 'm6_2', label: t('m6_check2'), isDone: false },
        { id: 'm6_3', label: t('m6_check3'), isDone: false },
      ],
    },
    {
      id: 7,
      checklist: [
        { id: 'm7_1', label: t('m7_check1'), isDone: false },
        { id: 'm7_2', label: t('m7_check2'), isDone: false },
        { id: 'm7_3', label: t('m7_check3'), isDone: false },
      ],
    },
  ]);

  const calculateStarterTarget = (income: number) => {
    if (income >= 10000 && income <= 30000) return 1000;
    if (income > 30000 && income <= 40000) return 2000;
    if (income > 40000 && income <= 50000) return 2500;
    if (income > 50000 && income <= 80000) return 3000;
    if (income > 80000 && income <= 120000) return 3500;
    return 3000;
  };

  const handleChecklistChange = (milestoneId: number, itemId: string, checked: boolean) => {
    setMilestones(prev =>
      prev.map(m =>
        m.id === milestoneId
          ? {
              ...m,
              checklist: m.checklist.map(item =>
                item.id === itemId ? { ...item, isDone: checked } : item
              ),
            }
          : m
      )
    );
  };

  const handleSnapshotComplete = (data: any) => {
    setAnnualIncome(data.annualIncome);
    setSnapshotCompleted(true);
    // Auto-check the snapshot checklist item
    handleChecklistChange(1, 'm1_3', true);
  };

  const generationalStats = [
    { label: t('genZ'), percent: '72%', color: 'bg-[#8B5CF6]' },
    { label: t('millennials'), percent: '65%', color: 'bg-[#EC4899]' },
    { label: t('genX'), percent: '57%', color: 'bg-[#F59E0B]' },
    { label: t('babyBoomers'), percent: '44%', color: 'bg-[#10B981]' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Band */}
      <Card className="border-2 overflow-hidden">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t('milestoneMapTitle')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t('milestoneMapSubtitle')}
              </p>
              <div className="pt-4">
                <SnapshotTool onComplete={handleSnapshotComplete} />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-border flex items-center justify-center">
                <div className="text-center space-y-2">
                  <ImageIcon className="w-16 h-16 mx-auto text-primary/50" />
                  <p className="text-sm font-medium text-muted-foreground">{t('memeLabel')}</p>
                  <p className="text-xs text-muted-foreground/70">Upload custom image in settings</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generational Stats Strip */}
      <Card className="border-2 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
            {t('whoStuck')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {generationalStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`w-16 h-16 ${stat.color} rounded-full mx-auto mb-2 flex items-center justify-center`}>
                  <span className="text-white font-bold text-xl">{stat.percent}</span>
                </div>
                <p className="text-sm font-medium text-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            <a
              href="https://www.marketwatch.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              {t('sourceCaption')}
            </a>
          </p>
        </CardContent>
      </Card>

      {/* Milestone Cards */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground">Your Journey</h3>
        
        <MilestoneCard
          number={1}
          title={t('milestone1')}
          goal={t('milestone1Goal')}
          checklist={milestones[0].checklist}
          targetAmount={calculateStarterTarget(annualIncome)}
          onChecklistChange={(itemId, checked) => handleChecklistChange(1, itemId, checked)}
        />

        <MilestoneCard
          number={2}
          title={t('milestone2')}
          goal={t('milestone2Goal')}
          checklist={milestones[1].checklist}
          onChecklistChange={(itemId, checked) => handleChecklistChange(2, itemId, checked)}
        />

        <MilestoneCard
          number={3}
          title={t('milestone3')}
          goal={t('milestone3Goal')}
          checklist={milestones[2].checklist}
          onChecklistChange={(itemId, checked) => handleChecklistChange(3, itemId, checked)}
        />

        <MilestoneCard
          number={4}
          title={t('milestone4')}
          goal={t('milestone4Goal')}
          checklist={milestones[3].checklist}
          onChecklistChange={(itemId, checked) => handleChecklistChange(4, itemId, checked)}
        />

        <MilestoneCard
          number={5}
          title={t('milestone5')}
          goal={t('milestone5Goal')}
          checklist={milestones[4].checklist}
          onChecklistChange={(itemId, checked) => handleChecklistChange(5, itemId, checked)}
        />

        <MilestoneCard
          number={6}
          title={t('milestone6')}
          goal={t('milestone6Goal')}
          checklist={milestones[5].checklist}
          onChecklistChange={(itemId, checked) => handleChecklistChange(6, itemId, checked)}
        />

        <MilestoneCard
          number={7}
          title={t('milestone7')}
          goal={t('milestone7Goal')}
          checklist={milestones[6].checklist}
          onChecklistChange={(itemId, checked) => handleChecklistChange(7, itemId, checked)}
        />
      </div>
    </div>
  );
};
