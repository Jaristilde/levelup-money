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
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarContent className="bg-white">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3 bg-white" role="banner">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-lg flex items-center justify-center" aria-hidden="true">
            <span className="text-white font-bold text-lg">FW</span>
          </div>
          {state !== 'collapsed' && (
            <span className="font-bold text-lg text-gray-900">FinWell</span>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-3">
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
                          `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            isActive
                              ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                              : 'text-gray-900 hover:bg-gray-100'
                          }`
                        }
                      >
                        <Icon className="w-5 h-5" aria-hidden="true" />
                        {state !== 'collapsed' && <span className="font-medium">{item.label}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 bg-white">
        <Separator className="mb-4 bg-gray-200" />
        
        {/* User Profile */}
        <button 
          className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 cursor-pointer mb-2 w-full text-left transition-colors"
          aria-label="View user profile"
        >
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-emerald-500 text-white">
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          {state !== 'collapsed' && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">User</p>
              <p className="text-xs text-gray-600 truncate">user@finwell.com</p>
            </div>
          )}
        </button>

        {/* Help & Logout */}
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="flex-1 text-gray-700 hover:bg-gray-100 hover:text-gray-900" aria-label="Help and support">
            <HelpCircle className="w-5 h-5" aria-hidden="true" />
          </Button>
          <Button variant="ghost" size="icon" className="flex-1 text-gray-700 hover:bg-gray-100 hover:text-gray-900" aria-label="Logout">
            <LogOut className="w-5 h-5" aria-hidden="true" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
