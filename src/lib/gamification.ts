import { AwarenessLevel } from "@/components/onboarding/AwarenessQualificationStep";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: "getting-started" | "credit" | "debt" | "savings" | "streak" | "milestone";
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
  avatarRelevance: AwarenessLevel[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  badgeId: string;
  timestamp: Date;
}

// Badge definitions
export const BADGES: Badge[] = [
  // Getting Started (All Avatars)
  {
    id: "first-login",
    name: "Welcome Aboard",
    description: "Completed your first login",
    icon: "🎉",
    color: "from-purple-400 to-pink-500",
    category: "getting-started",
    unlocked: false,
    avatarRelevance: ["unaware", "problem-aware", "solution-aware", "product-aware", "most-aware"],
  },
  {
    id: "profile-complete",
    name: "All Set Up",
    description: "Completed your profile setup",
    icon: "✅",
    color: "from-blue-400 to-cyan-500",
    category: "getting-started",
    unlocked: false,
    avatarRelevance: ["unaware", "problem-aware", "solution-aware", "product-aware", "most-aware"],
  },
  {
    id: "first-goal",
    name: "Goal Getter",
    description: "Set your first financial goal",
    icon: "🎯",
    color: "from-emerald-400 to-teal-500",
    category: "getting-started",
    unlocked: false,
    avatarRelevance: ["unaware", "problem-aware", "solution-aware", "product-aware", "most-aware"],
  },

  // Streak Badges (Kevin & Jess - Gamification-focused)
  {
    id: "streak-3",
    name: "Building Habits",
    description: "Checked in 3 days in a row",
    icon: "🔥",
    color: "from-orange-400 to-red-500",
    category: "streak",
    unlocked: false,
    progress: 0,
    maxProgress: 3,
    avatarRelevance: ["unaware", "problem-aware"],
  },
  {
    id: "streak-7",
    name: "Week Warrior",
    description: "7-day check-in streak!",
    icon: "⚡",
    color: "from-yellow-400 to-orange-500",
    category: "streak",
    unlocked: false,
    progress: 0,
    maxProgress: 7,
    avatarRelevance: ["unaware", "problem-aware"],
  },
  {
    id: "streak-30",
    name: "Monthly Master",
    description: "30-day streak! You're unstoppable!",
    icon: "👑",
    color: "from-amber-400 to-yellow-500",
    category: "streak",
    unlocked: false,
    progress: 0,
    maxProgress: 30,
    avatarRelevance: ["unaware", "problem-aware"],
  },

  // Credit Score Badges (Jess, David)
  {
    id: "credit-improvement",
    name: "Score Booster",
    description: "Improved credit score by 10 points",
    icon: "📈",
    color: "from-emerald-400 to-teal-500",
    category: "credit",
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    avatarRelevance: ["problem-aware", "solution-aware"],
  },
  {
    id: "credit-700",
    name: "Good Credit Club",
    description: "Reached 700+ credit score",
    icon: "🌟",
    color: "from-green-400 to-emerald-500",
    category: "credit",
    unlocked: false,
    avatarRelevance: ["problem-aware", "solution-aware"],
  },
  {
    id: "credit-750",
    name: "Excellent Credit",
    description: "Reached 750+ credit score",
    icon: "💎",
    color: "from-cyan-400 to-blue-500",
    category: "credit",
    unlocked: false,
    avatarRelevance: ["problem-aware", "solution-aware", "product-aware"],
  },
  {
    id: "credit-800",
    name: "Credit Elite",
    description: "Achieved 800+ credit score!",
    icon: "🏆",
    color: "from-purple-400 to-pink-500",
    category: "credit",
    unlocked: false,
    avatarRelevance: ["solution-aware", "product-aware", "most-aware"],
  },

  // Debt Badges (Jess)
  {
    id: "first-payment",
    name: "Debt Destroyer",
    description: "Made your first extra debt payment",
    icon: "💪",
    color: "from-red-400 to-orange-500",
    category: "debt",
    unlocked: false,
    avatarRelevance: ["problem-aware"],
  },
  {
    id: "debt-1000",
    name: "Debt Denter",
    description: "Paid off $1,000 in debt",
    icon: "🔨",
    color: "from-orange-400 to-amber-500",
    category: "debt",
    unlocked: false,
    progress: 0,
    maxProgress: 1000,
    avatarRelevance: ["problem-aware", "solution-aware"],
  },
  {
    id: "debt-5000",
    name: "Debt Slayer",
    description: "Paid off $5,000 in debt!",
    icon: "⚔️",
    color: "from-blue-400 to-purple-500",
    category: "debt",
    unlocked: false,
    progress: 0,
    maxProgress: 5000,
    avatarRelevance: ["problem-aware", "solution-aware"],
  },
  {
    id: "debt-free",
    name: "Debt Freedom",
    description: "Completely debt free! 🎊",
    icon: "🎊",
    color: "from-green-400 to-teal-500",
    category: "debt",
    unlocked: false,
    avatarRelevance: ["problem-aware", "solution-aware"],
  },

  // Savings Badges (Kevin, David, Maria)
  {
    id: "first-save",
    name: "Savings Starter",
    description: "Saved your first $100",
    icon: "🐷",
    color: "from-pink-400 to-rose-500",
    category: "savings",
    unlocked: false,
    progress: 0,
    maxProgress: 100,
    avatarRelevance: ["unaware", "problem-aware", "solution-aware"],
  },
  {
    id: "emergency-fund",
    name: "Emergency Ready",
    description: "Built a $1,000 emergency fund",
    icon: "🛡️",
    color: "from-blue-400 to-indigo-500",
    category: "savings",
    unlocked: false,
    progress: 0,
    maxProgress: 1000,
    avatarRelevance: ["problem-aware", "solution-aware", "product-aware"],
  },
  {
    id: "savings-10k",
    name: "Five Figure Saver",
    description: "Saved $10,000!",
    icon: "💰",
    color: "from-emerald-400 to-green-500",
    category: "savings",
    unlocked: false,
    progress: 0,
    maxProgress: 10000,
    avatarRelevance: ["solution-aware", "product-aware", "most-aware"],
  },

  // Milestone Badges (All)
  {
    id: "first-month",
    name: "Monthly Milestone",
    description: "Used LevelUp Money for 1 month",
    icon: "📅",
    color: "from-violet-400 to-purple-500",
    category: "milestone",
    unlocked: false,
    avatarRelevance: ["unaware", "problem-aware", "solution-aware", "product-aware", "most-aware"],
  },
  {
    id: "six-months",
    name: "Half Year Hero",
    description: "6 months of financial tracking!",
    icon: "🌈",
    color: "from-pink-400 to-purple-500",
    category: "milestone",
    unlocked: false,
    avatarRelevance: ["unaware", "problem-aware", "solution-aware", "product-aware", "most-aware"],
  },
];

// Get relevant badges for an avatar
export const getRelevantBadges = (awarenessLevel: AwarenessLevel | null): Badge[] => {
  if (!awarenessLevel) return BADGES;
  return BADGES.filter((badge) => badge.avatarRelevance.includes(awarenessLevel));
};

// Get user's badges from localStorage
export const getUserBadges = (): Badge[] => {
  const stored = localStorage.getItem("userBadges");
  if (!stored) return BADGES;

  try {
    const storedBadges = JSON.parse(stored);
    return BADGES.map((badge) => {
      const userBadge = storedBadges.find((b: Badge) => b.id === badge.id);
      return userBadge || badge;
    });
  } catch {
    return BADGES;
  }
};

// Save user badges to localStorage
export const saveUserBadges = (badges: Badge[]): void => {
  localStorage.setItem("userBadges", JSON.stringify(badges));
};

// Unlock a badge
export const unlockBadge = (badgeId: string): Badge | null => {
  const badges = getUserBadges();
  const badge = badges.find((b) => b.id === badgeId);

  if (!badge || badge.unlocked) return null;

  badge.unlocked = true;
  badge.unlockedAt = new Date();
  saveUserBadges(badges);

  return badge;
};

// Update badge progress
export const updateBadgeProgress = (badgeId: string, progress: number): Badge | null => {
  const badges = getUserBadges();
  const badge = badges.find((b) => b.id === badgeId);

  if (!badge || badge.unlocked) return null;

  badge.progress = progress;

  // Auto-unlock if progress reaches max
  if (badge.maxProgress && progress >= badge.maxProgress) {
    badge.unlocked = true;
    badge.unlockedAt = new Date();
  }

  saveUserBadges(badges);

  return badge.unlocked ? badge : null;
};

// Get user level based on unlocked badges
export const getUserLevel = (): number => {
  const badges = getUserBadges();
  const unlockedCount = badges.filter((b) => b.unlocked).length;
  return Math.floor(unlockedCount / 3) + 1;
};

// Get total points
export const getTotalPoints = (): number => {
  const badges = getUserBadges();
  return badges.filter((b) => b.unlocked).length * 10;
};

// Check and unlock onboarding badges
export const checkOnboardingBadges = (): Badge[] => {
  const newBadges: Badge[] = [];

  // Check if onboarding is complete
  if (localStorage.getItem("hasCompletedOnboarding") === "true") {
    const badge = unlockBadge("first-login");
    if (badge) newBadges.push(badge);

    const profileBadge = unlockBadge("profile-complete");
    if (profileBadge) newBadges.push(profileBadge);
  }

  // Check if goal is set
  if (localStorage.getItem("selectedGoal")) {
    const goalBadge = unlockBadge("first-goal");
    if (goalBadge) newBadges.push(goalBadge);
  }

  return newBadges;
};
