import { Link, useLocation } from 'react-router-dom';
import { 
  X,
  TrendingUp,
  Receipt,
  TrendingDown,
  PieChart,
  GraduationCap,
  Users,
  UserCircle,
  Settings,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const MobileDrawer = ({ open, onClose }: MobileDrawerProps) => {
  const location = useLocation();
  const { signOut, profile } = useAuth();

  const menuItems = [
    { path: '/milestones', icon: TrendingUp, label: 'Progress' },
    { path: '/debt', icon: Receipt, label: 'Transactions' },
    { path: '/retirement', icon: TrendingDown, label: 'Debts' },
    { path: '/budget', icon: PieChart, label: 'Budget' },
    { path: '/chat', icon: GraduationCap, label: 'Education' },
    { path: '/chat', icon: Users, label: 'Community' },
    { path: '/settings', icon: UserCircle, label: 'Profile' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await signOut();
    onClose();
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div 
        className="lg:hidden fixed right-0 top-0 bottom-0 w-[320px] bg-gradient-to-b from-slate-900 to-slate-950 z-[70] animate-in slide-in-from-right duration-300 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="More menu"
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <span className="text-lg font-semibold text-white">More Options</span>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={`${item.path}-${item.label}`}
                to={item.path}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  active 
                    ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-white border-l-2 border-emerald-400 shadow-lg shadow-emerald-500/20" 
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                )}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                <span className="flex-1">{item.label}</span>
                <ChevronRight className="w-4 h-4 opacity-50" aria-hidden="true" />
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-800 space-y-4">
          {/* User Info */}
          {profile && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">{profile.full_name}</div>
                <div className="text-xs text-slate-400 truncate">{profile.email}</div>
              </div>
            </div>
          )}
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl transition-all duration-200 font-medium text-sm"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};
