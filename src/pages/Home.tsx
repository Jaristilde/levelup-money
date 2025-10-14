import { AwarenessLevel } from '@/components/onboarding/AwarenessQualificationStep';
import { KevinDashboard } from '@/components/dashboards/KevinDashboard';
import { JessDashboard } from '@/components/dashboards/JessDashboard';
import { DavidDashboard } from '@/components/dashboards/DavidDashboard';
import { MariaDashboard } from '@/components/dashboards/MariaDashboard';
import { BenDashboard } from '@/components/dashboards/BenDashboard';

const Home = () => {
  // Get user's awareness level from localStorage
  const awarenessLevel = localStorage.getItem("awarenessLevel") as AwarenessLevel | null;

  // Route to appropriate dashboard based on awareness level
  switch (awarenessLevel) {
    case 'unaware':
      return <KevinDashboard />;
    case 'problem-aware':
      return <JessDashboard />;
    case 'solution-aware':
      return <DavidDashboard />;
    case 'product-aware':
      return <MariaDashboard />;
    case 'most-aware':
      return <BenDashboard />;
    default:
      // Default to David's dashboard (comprehensive) if no awareness level is set
      return <DavidDashboard />;
  }
};

export default Home;
