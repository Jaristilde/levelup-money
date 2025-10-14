import { AwarenessLevel } from "@/components/onboarding/AwarenessQualificationStep";

export interface PersonalizedWelcome {
  greeting: string;
  subtitle: string;
  primaryCTA: string;
}

export interface DashboardConfig {
  showAllStats: boolean;
  priorityMetric: "credit" | "debt" | "savings" | "goals" | "networth";
  showAdvancedFeatures: boolean;
  showGamification: boolean;
  layout: "simple" | "balanced" | "comprehensive";
}

export const getPersonalizedWelcome = (
  awarenessLevel: AwarenessLevel | null,
  userName: string = "there"
): PersonalizedWelcome => {
  switch (awarenessLevel) {
    case "unaware":
      // Kevin - Casual, fun, lifestyle-focused
      return {
        greeting: `Hey ${userName}! 👋`,
        subtitle: "Your money is working in the background while you focus on what you love",
        primaryCTA: "Level Up",
      };

    case "problem-aware":
      // Jess - Empathetic, solution-focused, hopeful
      return {
        greeting: `Welcome back, ${userName}`,
        subtitle: "You're making real progress toward your financial freedom. Keep going!",
        primaryCTA: "See My Progress",
      };

    case "solution-aware":
      // David - Data-driven, comprehensive, reassuring
      return {
        greeting: `Welcome, ${userName}`,
        subtitle: "Your comprehensive financial overview is ready",
        primaryCTA: "View Full Report",
      };

    case "product-aware":
      // Maria - Efficiency-focused, optimization-oriented
      return {
        greeting: `${userName}, here's what matters`,
        subtitle: "Your optimized financial dashboard - because every decision counts",
        primaryCTA: "Optimize More",
      };

    case "most-aware":
      // Ben - Expert-level, comprehensive, mastery-focused
      return {
        greeting: `${userName}, welcome back`,
        subtitle: "Complete financial oversight at your fingertips",
        primaryCTA: "Advanced Analytics",
      };

    default:
      return {
        greeting: `Welcome back, ${userName}`,
        subtitle: "Here's what's happening with your finances",
        primaryCTA: "Get Started",
      };
  }
};

export const getDashboardConfig = (
  awarenessLevel: AwarenessLevel | null
): DashboardConfig => {
  switch (awarenessLevel) {
    case "unaware":
      // Kevin - Simple, gamified, single-focus
      return {
        showAllStats: false,
        priorityMetric: "goals",
        showAdvancedFeatures: false,
        showGamification: true,
        layout: "simple",
      };

    case "problem-aware":
      // Jess - Focus on debt and credit improvement
      return {
        showAllStats: true,
        priorityMetric: "debt",
        showAdvancedFeatures: false,
        showGamification: true,
        layout: "balanced",
      };

    case "solution-aware":
      // David - Comprehensive, data-driven
      return {
        showAllStats: true,
        priorityMetric: "networth",
        showAdvancedFeatures: true,
        showGamification: false,
        layout: "comprehensive",
      };

    case "product-aware":
      // Maria - Customizable, optimization-focused
      return {
        showAllStats: true,
        priorityMetric: "savings",
        showAdvancedFeatures: true,
        showGamification: false,
        layout: "comprehensive",
      };

    case "most-aware":
      // Ben - Full access, expert-level
      return {
        showAllStats: true,
        priorityMetric: "networth",
        showAdvancedFeatures: true,
        showGamification: false,
        layout: "comprehensive",
      };

    default:
      return {
        showAllStats: true,
        priorityMetric: "credit",
        showAdvancedFeatures: false,
        showGamification: true,
        layout: "balanced",
      };
  }
};

export const getQuickActionsForAvatar = (
  awarenessLevel: AwarenessLevel | null
): Array<{ title: string; description: string; action: string; icon: string }> => {
  switch (awarenessLevel) {
    case "unaware":
      return [
        {
          title: "Set Your First Goal",
          description: "Start small, think big",
          action: "/goals",
          icon: "target",
        },
        {
          title: "Connect Your Bank",
          description: "See everything in one place",
          action: "/accounts",
          icon: "link",
        },
      ];

    case "problem-aware":
      return [
        {
          title: "Create Debt Payoff Plan",
          description: "Your personalized roadmap to freedom",
          action: "/debt",
          icon: "trending-down",
        },
        {
          title: "Improve Credit Score",
          description: "See what's holding you back",
          action: "/credit-report",
          icon: "trending-up",
        },
      ];

    case "solution-aware":
      return [
        {
          title: "Financial Health Check",
          description: "Comprehensive analysis of your situation",
          action: "/credit-report",
          icon: "activity",
        },
        {
          title: "Plan Your Retirement",
          description: "Long-term wealth building strategies",
          action: "/retirement",
          icon: "calendar",
        },
      ];

    case "product-aware":
      return [
        {
          title: "Optimize Spending",
          description: "Find inefficiencies and save more",
          action: "/budget",
          icon: "zap",
        },
        {
          title: "Automate Everything",
          description: "Set it and forget it",
          action: "/settings",
          icon: "settings",
        },
      ];

    case "most-aware":
      return [
        {
          title: "Advanced Analytics",
          description: "Deep dive into your financial data",
          action: "/analytics",
          icon: "bar-chart",
        },
        {
          title: "Net Worth Tracking",
          description: "Complete wealth overview",
          action: "/networth",
          icon: "dollar-sign",
        },
      ];

    default:
      return [
        {
          title: "Connect Account",
          description: "Link your financial accounts",
          action: "/accounts",
          icon: "link",
        },
        {
          title: "Set a Goal",
          description: "Define your financial objectives",
          action: "/goals",
          icon: "target",
        },
      ];
  }
};
