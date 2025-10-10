import { Link, useLocation } from 'react-router-dom';
import { Home, MapPin, FileText, FileCheck, Wallet, CreditCard, Target, PiggyBank, MessageCircle, Settings, Languages } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { path: '/', icon: Home, label: t('home') },
    { path: '/milestones', icon: MapPin, label: t('milestones') },
    { path: '/credit-report', icon: FileText, label: t('creditReport') },
    { path: '/budget', icon: Wallet, label: t('budget') },
    { path: '/debt', icon: CreditCard, label: t('debt') },
    { path: '/goals', icon: Target, label: t('goals') },
    { path: '/dispute-letter', icon: FileCheck, label: t('disputeLetter') },
    { path: '/retirement', icon: PiggyBank, label: t('retirement') },
    { path: '/chat', icon: MessageCircle, label: t('chat') },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 md:top-0 md:bottom-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - desktop only */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">FW</span>
            </div>
            <span className="font-semibold text-foreground">FinWell</span>
          </div>

          {/* Mobile nav */}
          <div className="flex md:hidden justify-around w-full">
            {navItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Language toggle & settings */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="relative"
            >
              <Languages className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 text-xs font-bold">
                {language.toUpperCase()}
              </span>
            </Button>
            <Link to="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
