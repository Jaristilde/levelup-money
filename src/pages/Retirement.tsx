import { PiggyBank } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Retirement = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8 md:pt-20">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <PiggyBank className="w-8 h-8 text-primary" />
            {t('retirementTitle')}
          </h1>
          <p className="text-muted-foreground">
            Check your retirement readiness and plan for the future
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Retirement readiness features will be available soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Retirement;
