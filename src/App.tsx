import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { GamificationProvider } from "@/contexts/GamificationContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import AppSidebar from "@/components/AppSidebar";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load all route components
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Home = lazy(() => import("./pages/Home"));
const Milestones = lazy(() => import("./pages/Milestones"));
const CreditReport = lazy(() => import("./pages/CreditReport"));
const DisputeLetter = lazy(() => import("./pages/DisputeLetter"));
const Budget = lazy(() => import("./pages/Budget"));
const Debt = lazy(() => import("./pages/Debt"));
const SnowballMethod = lazy(() => import("./pages/SnowballMethod"));
const AvalancheMethod = lazy(() => import("./pages/AvalancheMethod"));
const Goals = lazy(() => import("./pages/Goals"));
const Retirement = lazy(() => import("./pages/Retirement"));
const Chat = lazy(() => import("./pages/Chat"));
const Settings = lazy(() => import("./pages/Settings"));
const Profile = lazy(() => import("./pages/Profile"));
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

// Protected Route - requires authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public Route - redirects to dashboard if already logged in
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <GamificationProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    {/* ============================================ */}
                    {/* PUBLIC ROUTES - No authentication required  */}
                    {/* ============================================ */}
                    
                    {/* Landing Page - Root URL (/) */}
                    <Route 
                      path="/" 
                      element={
                        <PublicRoute>
                          <Landing />
                        </PublicRoute>
                      } 
                    />

                    {/* Authentication Pages */}
                    <Route 
                      path="/login" 
                      element={
                        <PublicRoute>
                          <Login />
                        </PublicRoute>
                      } 
                    />
                    
                    <Route 
                      path="/signup" 
                      element={
                        <PublicRoute>
                          <Signup />
                        </PublicRoute>
                      } 
                    />
                    
                    <Route 
                      path="/forgot-password" 
                      element={
                        <PublicRoute>
                          <ForgotPassword />
                        </PublicRoute>
                      } 
                    />
                    
                    <Route 
                      path="/reset-password" 
                      element={
                        <ResetPassword />
                      } 
                    />

                    <Route 
                      path="/onboarding" 
                      element={
                        <PublicRoute>
                          <Onboarding />
                        </PublicRoute>
                      } 
                    />

                    {/* ============================================ */}
                    {/* PROTECTED ROUTES - Require authentication   */}
                    {/* ============================================ */}
                    
                    {/* All app routes wrapped in protected layout */}
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <div className="flex min-h-screen w-full">
                            <AppSidebar />
                            <div className="flex-1 flex flex-col w-full lg:ml-[280px]">
                              <header className="lg:hidden h-16 border-b border-slate-800 flex items-center justify-between px-4 bg-gradient-to-r from-slate-900 to-slate-950 backdrop-blur-xl sticky top-0 z-40">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <span className="text-white font-bold text-sm">LU</span>
                                  </div>
                                  <span className="text-base font-semibold text-white">LevelUp Money</span>
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full" />
                              </header>
                              <main className="flex-1 pb-20 lg:pb-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen transition-all duration-200" role="main">
                                <Home />
                              </main>
                            </div>
                            <Navigation />
                          </div>
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/milestones"
                      element={
                        <ProtectedRoute>
                          <div className="flex min-h-screen w-full">
                            <AppSidebar />
                            <div className="flex-1 flex flex-col w-full lg:ml-[280px]">
                              <header className="lg:hidden h-16 border-b border-slate-800 flex items-center justify-between px-4 bg-gradient-to-r from-slate-900 to-slate-950 backdrop-blur-xl sticky top-0 z-40">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <span className="text-white font-bold text-sm">LU</span>
                                  </div>
                                  <span className="text-base font-semibold text-white">LevelUp Money</span>
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full" />
                              </header>
                              <main className="flex-1 pb-20 lg:pb-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen transition-all duration-200" role="main">
                                <Milestones />
                              </main>
                            </div>
                            <Navigation />
                          </div>
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/credit-report"
                      element={
                        <ProtectedRoute>
                          <div className="flex min-h-screen w-full">
                            <AppSidebar />
                            <div className="flex-1 flex flex-col w-full lg:ml-[280px]">
                              <header className="lg:hidden h-16 border-b border-slate-800 flex items-center justify-between px-4 bg-gradient-to-r from-slate-900 to-slate-950 backdrop-blur-xl sticky top-0 z-40">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <span className="text-white font-bold text-sm">LU</span>
                                  </div>
                                  <span className="text-base font-semibold text-white">LevelUp Money</span>
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full" />
                              </header>
                              <main className="flex-1 pb-20 lg:pb-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen transition-all duration-200" role="main">
                                <CreditReport />
                              </main>
                            </div>
                            <Navigation />
                          </div>
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/dispute-letter"
                      element={
                        <ProtectedRoute>
                          <div className="flex min-h-screen w-full">
                            <AppSidebar />
                            <div className="flex-1 flex flex-col w-full lg:ml-[280px]">
                              <header className="lg:hidden h-16 border-b border-slate-800 flex items-center justify-between px-4 bg-gradient-to-r from-slate-900 to-slate-950 backdrop-blur-xl sticky top-0 z-40">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <span className="text-white font-bold text-sm">LU</span>
                                  </div>
                                  <span className="text-base font-semibold text-white">LevelUp Money</span>
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full" />
                              </header>
                              <main className="flex-1 pb-20 lg:pb-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen transition-all duration-200" role="main">
                                <DisputeLetter />
                              </main>
                            </div>
                            <Navigation />
                          </div>
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/budget"
                      element={
                        <ProtectedRoute>
                          <div className="flex min-h-screen w-full">
                            <AppSidebar />
                            <div className="flex-1 flex flex-col w-full lg:ml-[280px]">
                              <header className="lg:hidden h-16 border-b border-slate-800 flex items-center justify-between px-4 bg-gradient-to-r from-slate-900 to-slate-950 backdrop-blur-xl sticky top-0 z-40">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <span className="text-white font-bold text-sm">LU</span>
                                  </div>
                                  <span className="text-base font-semibold text-white">LevelUp Money</span>
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full" />
                              </header>
                              <main className="flex-1 pb-20 lg:pb-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen transition-all duration-200" role="main">
                                <Budget />
                              </main>
                            </div>
                            <Navigation />
                          </div>
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/debt"
                      element={
                        <ProtectedRoute>
                          <div className="flex min-h-screen w-full">
                            <AppSidebar />
                            <div className="flex-1 flex flex-col w-full lg:ml-[280px]">
                              <header className="lg:hidden h-16 border-b border-slate-800 flex items-center justify-between px-4 bg-gradient-to-r from-slate-900 to-slate-950 backdrop-blur-xl sticky top-0 z-40">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <span className="text-white font-bold text-sm">LU</span>
                                  </div>
                                  <span className="text-base font-semibold text-white">LevelUp Money</span>
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full" />
                              </header>
                              <main className="flex-1 pb-20 lg:pb-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen transition-all duration-200" role="main">
                                <Debt />
                              </main>
                            </div>
                            <Navigation />
                          </div>
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/snowball-method"
                      element={
                        <ProtectedRoute>
                          <div className="flex min-h-screen w-full">
                            <AppSidebar />
                            <div className="flex-1 flex flex-col w-full lg:ml-[280px]">
                              <header className="lg:hidden h-16 border-b border-slate-800 flex items-center justify-between px-4 bg-gradient-to-r from-slate-900 to-slate-950 backdrop-blur-xl sticky top-0 z-40">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <span className="text-white font-bold text-sm">LU</span>
                                  </div>
                                  <span className="text-base font-semibold text-white">LevelUp Money</span>
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full" />
                              </header>
                              <main className="flex-1 pb-20 lg:pb-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen transition-all duration-200" role="main">
                                <SnowballMethod />
                              </main>
                            </div>
                            <Navigation />
                          </div>
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/avalanche-method"
                      element={
                        <ProtectedRoute>
                          <div className="flex min-h-screen w-full">
                            <AppSidebar />
                            <div className="flex-1 flex flex-col w-full lg:ml-[280px]">
                              <header className="lg:hidden h-16 border-b border-slate-800 flex items-center justify-between px-4 bg-gradient-to-r from-slate-900 to-slate-950 backdrop-blur-xl sticky top-0 z-40">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <span className="text-white font-bold text-sm">LU</span>
                                  </div>
                                  <span className="text-base font-semibold text-white">LevelUp Money</span>
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full" />
                              </header>
                              <main className="flex-1 pb-20 lg:pb-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen transition-all duration-200" role="main">
                                <AvalancheMethod />
                              </main>
                            </div>
                            <Navigation />
                          </div>
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/goals"
                      element={
                        <ProtectedRoute>
                          <div className="flex min-h-screen w-full">
                            <AppSidebar />
                            <div className="flex-1 flex flex-col w-full lg:ml-[280px]">
                              <header className="lg:hidden h-16 border-b border-slate-800 flex items-center justify-between px-4 bg-gradient-to-r from-slate-900 to-slate-950 backdrop-blur-xl sticky top-0 z-40">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <span className="text-white font-bold text-sm">LU</span>
                                  </div>
                                  <span className="text-base font-semibold text-white">LevelUp Money</span>
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full" />
                              </header>
                              <main className="flex-1 pb-20 lg:pb-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen transition-all duration-200" role="main">
                                <Goals />
                              </main>
                            </div>
                            <Navigation />
                          </div>
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/accounts"
                      element={
                        <ProtectedRoute>
                          <div className="flex min-h-screen w-full">
                            <AppSidebar />
                            <div className="flex-1 flex flex-col w-full lg:ml-[280px]">
                              <header className="lg:hidden h-16 border-b border-slate-800 flex items-center justify-between px-4 bg-gradient-to-r from-slate-900 to-slate-950 backdrop-blur-xl sticky top-0 z-40">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <span className="text-white font-bold text-sm">LU</span>
                                  </div>
                                  <span className="text-base font-semibold text-white">LevelUp Money</span>
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full" />
                              </header>
                              <main className="flex-1 pb-20 lg:pb-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen transition-all duration-200" role="main">
                                <Debt />
                              </main>
                            </div>
                            <Navigation />
                          </div>
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/retirement"
                      element={
                        <ProtectedRoute>
                          <div className="flex min-h-screen w-full">
                            <AppSidebar />
                            <div className="flex-1 flex flex-col w-full lg:ml-[280px]">
                              <header className="lg:hidden h-16 border-b border-slate-800 flex items-center justify-between px-4 bg-gradient-to-r from-slate-900 to-slate-950 backdrop-blur-xl sticky top-0 z-40">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <span className="text-white font-bold text-sm">LU</span>
                                  </div>
                                  <span className="text-base font-semibold text-white">LevelUp Money</span>
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full" />
                              </header>
                              <main className="flex-1 pb-20 lg:pb-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen transition-all duration-200" role="main">
                                <Retirement />
                              </main>
                            </div>
                            <Navigation />
                          </div>
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/chat"
                      element={
                        <ProtectedRoute>
                          <div className="flex min-h-screen w-full">
                            <AppSidebar />
                            <div className="flex-1 flex flex-col w-full lg:ml-[280px]">
                              <header className="lg:hidden h-16 border-b border-slate-800 flex items-center justify-between px-4 bg-gradient-to-r from-slate-900 to-slate-950 backdrop-blur-xl sticky top-0 z-40">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <span className="text-white font-bold text-sm">LU</span>
                                  </div>
                                  <span className="text-base font-semibold text-white">LevelUp Money</span>
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full" />
                              </header>
                              <main className="flex-1 pb-20 lg:pb-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen transition-all duration-200" role="main">
                                <Chat />
                              </main>
                            </div>
                            <Navigation />
                          </div>
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <div className="flex min-h-screen w-full">
                            <AppSidebar />
                            <div className="flex-1 flex flex-col w-full lg:ml-[280px]">
                              <header className="lg:hidden h-16 border-b border-slate-800 flex items-center justify-between px-4 bg-gradient-to-r from-slate-900 to-slate-950 backdrop-blur-xl sticky top-0 z-40">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <span className="text-white font-bold text-sm">LU</span>
                                  </div>
                                  <span className="text-base font-semibold text-white">LevelUp Money</span>
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full" />
                              </header>
                              <main className="flex-1 pb-20 lg:pb-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen transition-all duration-200" role="main">
                                <Profile />
                              </main>
                            </div>
                            <Navigation />
                          </div>
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/settings"
                      element={
                        <ProtectedRoute>
                          <div className="flex min-h-screen w-full">
                            <AppSidebar />
                            <div className="flex-1 flex flex-col w-full lg:ml-[280px]">
                              <header className="lg:hidden h-16 border-b border-slate-800 flex items-center justify-between px-4 bg-gradient-to-r from-slate-900 to-slate-950 backdrop-blur-xl sticky top-0 z-40">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <span className="text-white font-bold text-sm">LU</span>
                                  </div>
                                  <span className="text-base font-semibold text-white">LevelUp Money</span>
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full" />
                              </header>
                              <main className="flex-1 pb-20 lg:pb-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen transition-all duration-200" role="main">
                                <Settings />
                              </main>
                            </div>
                            <Navigation />
                          </div>
                        </ProtectedRoute>
                      }
                    />

                    {/* 404 Not Found - Catch all */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </TooltipProvider>
          </GamificationProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;