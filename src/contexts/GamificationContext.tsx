import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Badge, checkOnboardingBadges } from "@/lib/gamification";
import { BadgeUnlockNotification } from "@/components/gamification/BadgeUnlockNotification";

interface GamificationContextType {
  showBadgeUnlock: (badge: Badge) => void;
  checkBadges: () => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error("useGamification must be used within GamificationProvider");
  }
  return context;
};

interface GamificationProviderProps {
  children: ReactNode;
}

export const GamificationProvider = ({ children }: GamificationProviderProps) => {
  const [unlockedBadge, setUnlockedBadge] = useState<Badge | null>(null);
  const [badgeQueue, setBadgeQueue] = useState<Badge[]>([]);

  // Check for onboarding badges on mount
  useEffect(() => {
    const newBadges = checkOnboardingBadges();
    if (newBadges.length > 0) {
      setBadgeQueue(newBadges);
    }
  }, []);

  // Show badges from queue one at a time
  useEffect(() => {
    if (badgeQueue.length > 0 && !unlockedBadge) {
      const [nextBadge, ...rest] = badgeQueue;
      setUnlockedBadge(nextBadge);
      setBadgeQueue(rest);
    }
  }, [badgeQueue, unlockedBadge]);

  const showBadgeUnlock = (badge: Badge) => {
    setBadgeQueue((prev) => [...prev, badge]);
  };

  const checkBadges = () => {
    const newBadges = checkOnboardingBadges();
    if (newBadges.length > 0) {
      setBadgeQueue((prev) => [...prev, ...newBadges]);
    }
  };

  const handleCloseBadge = () => {
    setUnlockedBadge(null);
  };

  return (
    <GamificationContext.Provider value={{ showBadgeUnlock, checkBadges }}>
      {children}
      {unlockedBadge && (
        <BadgeUnlockNotification
          badge={unlockedBadge}
          onClose={handleCloseBadge}
        />
      )}
    </GamificationContext.Provider>
  );
};
