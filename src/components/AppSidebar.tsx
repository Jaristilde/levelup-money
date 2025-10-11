import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, CreditCard, Target, List, BookOpen, Settings, HelpCircle, LogOut, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const AppSidebar = () => {
  const { t } = useLanguage();
  const { state } = useSidebar();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: t('home') },
    { path: '/credit-report', icon: FileText, label: t('creditReport') },
    { path: '/debt', icon: CreditCard, label: 'Accounts' },
    { path: '/goals', icon: Target, label: t('goals') },
    { path: '/budget', icon: List, label: 'Transactions' },
    { path: '/milestones', icon: BookOpen, label: 'Education' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent>
        {/* Logo */}
        <div className="p-6 flex items-center gap-3" role="banner">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center" aria-hidden="true">
            <span className="text-primary-foreground font-bold text-lg">FW</span>
          </div>
          {state !== 'collapsed' && (
            <span className="font-bold text-lg text-foreground">FinWell</span>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.path}
                        end={item.path === '/'}
                        aria-label={item.label}
                        className={({ isActive }) =>
                          isActive
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }
                      >
                        <Icon className="w-5 h-5" aria-hidden="true" />
                        {state !== 'collapsed' && <span>{item.label}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Separator className="mb-4" />
        
        {/* User Profile */}
        <button 
          className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted cursor-pointer mb-2 w-full text-left"
          aria-label="View user profile"
        >
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          {state !== 'collapsed' && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">User</p>
              <p className="text-xs text-muted-foreground truncate">user@finwell.com</p>
            </div>
          )}
        </button>

        {/* Help & Logout */}
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="flex-1" aria-label="Help and support">
            <HelpCircle className="w-5 h-5" aria-hidden="true" />
          </Button>
          <Button variant="ghost" size="icon" className="flex-1" aria-label="Logout">
            <LogOut className="w-5 h-5" aria-hidden="true" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
