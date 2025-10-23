import { useState, useEffect } from 'react';
import { AwarenessLevel } from '@/components/onboarding/AwarenessQualificationStep';
import { KevinDashboard } from '@/components/dashboards/KevinDashboard';
import { JessDashboard } from '@/components/dashboards/JessDashboard';
import { DavidDashboard } from '@/components/dashboards/DavidDashboard';
import { MariaDashboard } from '@/components/dashboards/MariaDashboard';
import { BenDashboard } from '@/components/dashboards/BenDashboard';
import FirstTimeUserModal from '@/components/onboarding/FirstTimeUserModal';
import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const { profile, refreshSession, loading: authLoading } = useAuth();
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // Get user's awareness level from localStorage
  const awarenessLevel = localStorage.getItem("awarenessLevel") as AwarenessLevel | null;

  // Check if user needs to complete onboarding
  useEffect(() => {
    // Wait for auth to finish loading AND profile to be available
    if (!authLoading && profile) {
      const needsOnboarding = profile.onboarding_completed === false;
      setShowOnboardingModal(needsOnboarding);
      setIsChecking(false);
    } else if (!authLoading && !profile) {
      // Auth loaded but no profile yet - this is likely a brand new user
      // Show onboarding modal after a short wait (2 seconds)
      const timeout = setTimeout(() => {
        // If profile still hasn't loaded, assume new user and show onboarding
        setShowOnboardingModal(true);
        setIsChecking(false);
      }, 2000); // Wait 2 seconds for profile to load
      
      return () => clearTimeout(timeout);
    }
  }, [profile, authLoading]);

  const handleOnboardingComplete = async () => {
    setShowOnboardingModal(false);
    // Refresh the profile to get updated data
    await refreshSession();
  };

  // Show loading state while auth is loading or checking profile
  if (authLoading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-inter">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show onboarding modal for first-time users
  if (showOnboardingModal) {
    return <FirstTimeUserModal open={showOnboardingModal} onComplete={handleOnboardingComplete} />;
  }

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
