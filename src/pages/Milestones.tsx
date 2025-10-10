import { useLanguage } from '@/contexts/LanguageContext';
import { MilestoneMap } from '@/components/MilestoneMap';

const Milestones = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        <div className="mb-4 md:mb-6">
          <h1 className="text-2xl md:text-5xl font-bold text-foreground mb-2 md:mb-3">
            {t('milestonePageTitle')}
          </h1>
          <p className="text-muted-foreground text-base md:text-xl">
            {t('milestonePageSubtitle')}
          </p>
        </div>
        
        <MilestoneMap />
      </div>
    </div>
  );
};

export default Milestones;
