import { Link, useLocation } from 'react-router-dom';
import { Home, MapPin, FileText, FileCheck, Wallet, CreditCard, Target, PiggyBank, MessageCircle, Settings, Languages } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: '/', icon: Home, label: t('home'), name: 'Dashboard' },
    { path: '/credit-report', icon: FileText, label: t('creditReport'), name: 'Report' },
    { path: '/debt', icon: CreditCard, label: 'Accounts', name: 'Accounts' },
    { path: '/goals', icon: Target, label: t('goals'), name: 'Goals' },
    { path: '/settings', icon: Settings, label: 'Profile', name: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 md:hidden h-16">
      <div className="flex justify-around items-center h-full px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 transition-all min-h-[44px] min-w-[44px] relative ${
                isActive ? 'text-primary' : 'text-muted-foreground/60'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'text-primary' : ''}`} />
              <span className={`text-[10px] font-medium leading-tight ${isActive ? 'text-primary' : ''}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
