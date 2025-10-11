import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import AppSidebar from "@/components/AppSidebar";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load all route components
const Home = lazy(() => import("./pages/Home"));
const Milestones = lazy(() => import("./pages/Milestones"));
const CreditReport = lazy(() => import("./pages/CreditReport"));
const DisputeLetter = lazy(() => import("./pages/DisputeLetter"));
const Budget = lazy(() => import("./pages/Budget"));
const Debt = lazy(() => import("./pages/Debt"));
const Goals = lazy(() => import("./pages/Goals"));
const Retirement = lazy(() => import("./pages/Retirement"));
const Chat = lazy(() => import("./pages/Chat"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Onboarding = lazy(() => import("./pages/Onboarding"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-background p-4 md:p-8" role="status" aria-live="polite">
    <span className="sr-only">Loading page content...</span>
    <div className="max-w-7xl mx-auto space-y-6">
      <Skeleton className="h-12 w-64" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
      <Skeleton className="h-96" />
    </div>
  </div>
);

// Optimized QueryClient with caching for better performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh
      gcTime: 10 * 60 * 1000, // 10 minutes - cache time (formerly cacheTime)
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
      refetchOnMount: false, // Don't refetch on component mount
      retry: 1, // Reduce retry attempts
    },
  },
});

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding");
  
  if (hasCompletedOnboarding !== "true") {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/onboarding" element={<Onboarding />} />
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <div className="flex min-h-screen w-full bg-white">
                        {/* Desktop Sidebar - Always visible */}
                        <AppSidebar />
                        
                        {/* Main Content */}
                        <div className="flex-1 flex flex-col w-full ml-64">
                          {/* Mobile Header */}
                          <header className="md:hidden h-14 border-b border-gray-200 flex items-center px-4 bg-white sticky top-0 z-40">
                            <span className="font-semibold text-gray-900">LevelUp Money</span>
                          </header>

                          {/* Page Content */}
                          <main className="flex-1 pb-20 md:pb-8 transition-opacity duration-150 bg-gray-50" role="main">
                            <Suspense fallback={<PageLoader />}>
                              <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/milestones" element={<Milestones />} />
                                <Route path="/credit-report" element={<CreditReport />} />
                                <Route path="/dispute-letter" element={<DisputeLetter />} />
                                <Route path="/budget" element={<Budget />} />
                                <Route path="/debt" element={<Debt />} />
                                <Route path="/goals" element={<Goals />} />
                                <Route path="/retirement" element={<Retirement />} />
                                <Route path="/chat" element={<Chat />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="*" element={<NotFound />} />
                              </Routes>
                            </Suspense>
                          </main>
                        </div>

                        {/* Mobile Bottom Navigation */}
                        <Navigation />
                      </div>
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
