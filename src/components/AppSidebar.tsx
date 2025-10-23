import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  ShieldCheck,
  Wallet,
  Receipt,
  Target,
  TrendingDown,
  PieChart,
  GraduationCap,
  Users,
  UserCircle,
  Settings,
  ChevronRight,
  LogOut,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const AppSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { profile, signOut } = useAuth();

  const navigationGroups = [
    {
      label: 'OVERVIEW',
      items: [
        { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/milestones', icon: TrendingUp, label: 'Progress' },
      ]
    },
    {
      label: 'FINANCIAL HEALTH',
      items: [
        { path: '/credit-report', icon: ShieldCheck, label: 'Credit Report' },
        { path: '/financial-profile', icon: FileText, label: 'Financial Profile' },
        { path: '/accounts', icon: Wallet, label: 'Accounts' },
        { path: '/budget', icon: PieChart, label: 'Budget' },
        { path: '/debt', icon: TrendingDown, label: 'Debts' },
      ]
    },
    {
      label: 'GOALS & PLANNING',
      items: [
        { path: '/goals', icon: Target, label: 'Goals' },
        { path: '/retirement', icon: GraduationCap, label: 'Retirement' },
      ]
    },
    {
      label: 'RESOURCES',
      items: [
        { path: '/chat', icon: Users, label: 'AI Assistant' },
      ]
    }
  ];

  const bottomItems = [
    { path: '/profile', icon: UserCircle, label: 'Profile' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const isActive = (path: string) => currentPath === path;

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <aside
      className="hidden lg:flex fixed left-0 top-0 h-screen w-[280px] flex-col bg-brand-green backdrop-blur-xl border-r border-white/10 z-50"
      aria-label="Main navigation"
    >
      {/* Logo Section */}
      <div className="h-20 flex items-center gap-3 px-8 border-b border-white/10">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-brand-green font-bold text-lg font-poppins">LU</span>
        </div>
        <span className="text-lg font-semibold text-white tracking-tight font-poppins" style={{ color: '#FFFFFF', fontWeight: 600 }}>LevelUp Money</span>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {navigationGroups.map((group) => (
          <div key={group.label}>
            <h3 className="text-xs uppercase tracking-wider mb-2 px-4 font-inter" style={{ color: '#FFFFFF', fontWeight: 600, opacity: 0.9 }}>
              {group.label}
            </h3>
            <nav className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 font-inter",
                      active
                        ? "bg-white/20 shadow-lg backdrop-blur-sm"
                        : "hover:bg-white/10 hover:translate-x-1"
                    )}
                    style={{
                      color: '#FFFFFF',
                      fontWeight: active ? 600 : 600
                    }}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                    <span>{item.label}</span>
                    {active && <ChevronRight className="w-4 h-4 ml-auto" aria-hidden="true" />}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10 p-4 space-y-1">
        {/* User Info */}
        {profile && (
          <div className="px-4 py-3 mb-2 bg-white/10 rounded-xl">
            <p className="text-xs text-white/70 font-inter mb-1">Logged in as</p>
            <p className="text-sm font-semibold text-white font-inter truncate">
              {profile.full_name}
            </p>
            <p className="text-xs text-white/60 font-inter truncate">
              {profile.email}
            </p>
          </div>
        )}

        {bottomItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 font-inter",
                active
                  ? "bg-white/20 shadow-lg backdrop-blur-sm"
                  : "hover:bg-white/10 hover:translate-x-1"
              )}
              style={{
                color: '#FFFFFF',
                fontWeight: 600
              }}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 font-inter hover:bg-red-500/20 hover:translate-x-1"
          style={{
            color: '#FFFFFF',
            fontWeight: 600
          }}
        >
          <LogOut className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
