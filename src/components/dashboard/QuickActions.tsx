import { Link, CreditCard, Target, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link as RouterLink } from 'react-router-dom';

const actions = [
  {
    icon: Link,
    label: 'Connect Account',
    href: '/debt',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: CreditCard,
    label: 'Pay Bill',
    href: '/budget',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Target,
    label: 'Set Goal',
    href: '/goals',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: FileText,
    label: 'View Report',
    href: '/credit-report',
    gradient: 'from-orange-500 to-red-500',
  },
];

export const QuickActions = () => {
  return (
    <Card className="bg-white border-slate-200/50 shadow-lg shadow-slate-900/5">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h3>
        
        <div className="space-y-3">
          {actions.map((action, index) => (
            <RouterLink key={index} to={action.href}>
              <Button
                variant="outline"
                className="w-full h-12 justify-start gap-3 group hover:border-slate-300 transition-all"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${action.gradient} flex items-center justify-center`}>
                  <action.icon className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-slate-900">{action.label}</span>
              </Button>
            </RouterLink>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
