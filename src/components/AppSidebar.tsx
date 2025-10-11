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
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AppSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationGroups = [
    {
      label: 'OVERVIEW',
      items: [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/milestones', icon: TrendingUp, label: 'Progress' },
      ]
    },
    {
      label: 'FINANCIAL HEALTH',
      items: [
        { path: '/credit-report', icon: ShieldCheck, label: 'Credit Report' },
        { path: '/budget', icon: Wallet, label: 'Accounts' },
        { path: '/debt', icon: Receipt, label: 'Transactions' },
      ]
    },
    {
      label: 'GOALS & PLANNING',
      items: [
        { path: '/goals', icon: Target, label: 'Goals' },
        { path: '/retirement', icon: TrendingDown, label: 'Debts' },
        { path: '/budget', icon: PieChart, label: 'Budget' },
      ]
    },
    {
      label: 'RESOURCES',
      items: [
        { path: '/chat', icon: GraduationCap, label: 'Education' },
        { path: '/chat', icon: Users, label: 'Community' },
      ]
    }
  ];

  const bottomItems = [
    { path: '/settings', icon: UserCircle, label: 'Profile' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const isActive = (path: string) => currentPath === path;

  return (
    <aside 
      className="hidden lg:flex fixed left-0 top-0 h-screen w-[280px] flex-col bg-gradient-to-b from-slate-900 to-slate-950 backdrop-blur-xl border-r border-slate-800 z-50"
      aria-label="Main navigation"
    >
      {/* Logo Section */}
      <div className="h-20 flex items-center gap-3 px-8 border-b border-slate-800/50">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <span className="text-white font-bold text-lg">LU</span>
        </div>
        <span className="text-lg font-semibold text-white tracking-tight">LevelUp Money</span>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {navigationGroups.map((group) => (
          <div key={group.label}>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-4">
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
                      "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                      active 
                        ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-white border-l-2 border-emerald-400 shadow-lg shadow-emerald-500/20 font-semibold" 
                        : "text-slate-300 hover:bg-white/5 hover:text-white hover:translate-x-1"
                    )}
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
      <div className="border-t border-slate-800 p-4 space-y-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                active 
                  ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-white border-l-2 border-emerald-400 shadow-lg shadow-emerald-500/20 font-semibold" 
                  : "text-slate-300 hover:bg-white/5 hover:text-white hover:translate-x-1"
              )}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default AppSidebar;
