import { Link, useLocation } from 'react-router-dom';
import { Home, ShieldCheck, Target, Wallet, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { MobileDrawer } from './MobileDrawer';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/credit-report', icon: ShieldCheck, label: 'Credit' },
    { path: '/goals', icon: Target, label: 'Goals' },
    { path: '/budget', icon: Wallet, label: 'Accounts' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 h-[72px] bg-slate-900/95 backdrop-blur-2xl border-t border-slate-800 z-50 safe-area-inset-bottom"
        aria-label="Mobile navigation"
      >
        <div className="flex justify-around items-center h-full px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 px-3 py-2 transition-all min-h-[44px] min-w-[44px] relative rounded-xl",
                  active ? "text-emerald-400" : "text-slate-500"
                )}
                aria-current={active ? 'page' : undefined}
              >
                {active && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-emerald-400 rounded-full" />
                )}
                <Icon 
                  className={cn(
                    "w-6 h-6 transition-all",
                    active && "drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                  )} 
                  strokeWidth={2}
                  aria-hidden="true" 
                />
                <span className={cn(
                  "text-xs font-medium",
                  active ? "text-emerald-400" : "text-slate-500"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
          
          {/* More Button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col items-center justify-center gap-1 px-3 py-2 transition-all min-h-[44px] min-w-[44px] text-slate-500 hover:text-slate-300 rounded-xl"
            aria-label="More options"
          >
            <MoreHorizontal className="w-6 h-6" strokeWidth={2} aria-hidden="true" />
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </nav>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default Navigation;
