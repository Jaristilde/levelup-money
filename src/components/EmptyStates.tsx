import { 
  CreditCard, 
  List, 
  Search, 
  AlertTriangle, 
  WifiOff,
  UserCircle2,
  TrendingUp
} from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';

interface EmptyDashboardProps {
  onConnect: () => void;
  onTour: () => void;
}

export const EmptyDashboard = ({ onConnect, onTour }: EmptyDashboardProps) => (
  <EmptyState
    icon={UserCircle2}
    title="Welcome! Let's build your financial future"
    description="Connect your accounts to get started tracking your credit score and achieving financial freedom"
    action={{
      label: "Connect First Account",
      onClick: onConnect,
      variant: "success"
    }}
    secondaryAction={{
      label: "Take a Tour",
      onClick: onTour,
      variant: "outline"
    }}
  />
);

interface NoAccountsProps {
  onConnect: () => void;
  onLearnMore: () => void;
}

export const NoAccounts = ({ onConnect, onLearnMore }: NoAccountsProps) => (
  <EmptyState
    icon={CreditCard}
    title="No accounts connected yet"
    description="Connect your bank to track your finances and monitor your credit score in real-time"
    action={{
      label: "Connect Account",
      onClick: onConnect,
      variant: "success"
    }}
    secondaryAction={{
      label: "Why do I need to connect?",
      onClick: onLearnMore,
      variant: "ghost"
    }}
  />
);

interface NoTransactionsProps {
  onConnect: () => void;
}

export const NoTransactions = ({ onConnect }: NoTransactionsProps) => (
  <EmptyState
    icon={List}
    title="No transactions yet"
    description="Transactions will appear here once you connect your accounts. Start tracking your spending today!"
    action={{
      label: "Connect Account",
      onClick: onConnect,
      variant: "success"
    }}
  />
);

interface SearchNoResultsProps {
  searchTerm: string;
  recentSearches?: string[];
  onRecentSearch?: (term: string) => void;
}

export const SearchNoResults = ({ 
  searchTerm, 
  recentSearches = [],
  onRecentSearch 
}: SearchNoResultsProps) => (
  <EmptyState
    icon={Search}
    title="No results found"
    description={`We couldn't find any results for "${searchTerm}". Try adjusting your search terms or filters.`}
    quickActions={recentSearches.length > 0 && onRecentSearch ? 
      recentSearches.map(term => ({
        label: term,
        onClick: () => onRecentSearch(term)
      })) : undefined
    }
  />
);

interface ErrorStateCustomProps {
  message?: string;
  onRetry: () => void;
  onSupport?: () => void;
}

export const ErrorStateCustom = ({ 
  message = "We couldn't load this data", 
  onRetry,
  onSupport 
}: ErrorStateCustomProps) => (
  <EmptyState
    icon={AlertTriangle}
    title="Oops! Something went wrong"
    description={`${message}. Please try again or contact support if the problem persists.`}
    action={{
      label: "Retry",
      onClick: onRetry,
      variant: "default"
    }}
    secondaryAction={onSupport ? {
      label: "Contact Support",
      onClick: onSupport,
      variant: "outline"
    } : undefined}
  />
);

interface OfflineStateProps {
  lastUpdated?: string;
  onRetry: () => void;
}

export const OfflineState = ({ lastUpdated, onRetry }: OfflineStateProps) => (
  <EmptyState
    icon={WifiOff}
    title="You're offline"
    description={`Check your internet connection and try again.${lastUpdated ? ` Last updated: ${lastUpdated}` : ''}`}
    action={{
      label: "Try Again",
      onClick: onRetry,
      variant: "default"
    }}
  />
);

interface NoCreditDataProps {
  onGetStarted: () => void;
}

export const NoCreditData = ({ onGetStarted }: NoCreditDataProps) => (
  <EmptyState
    icon={TrendingUp}
    title="No credit data available"
    description="Connect your accounts to view your credit score and start improving your financial health"
    action={{
      label: "Get Started",
      onClick: onGetStarted,
      variant: "success"
    }}
  />
);
