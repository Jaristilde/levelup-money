import { CreditCard, Building2, GraduationCap, Car } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AccountCardProps {
  type: 'credit-card' | 'loan' | 'student-loan' | 'auto-loan';
  name: string;
  accountNumber: string;
  balance: number;
  limit?: number;
  status: 'good' | 'warning' | 'error';
  payment: 'on-time' | 'late' | 'missed';
  opened: string;
}

const accountIcons = {
  'credit-card': CreditCard,
  'loan': Building2,
  'student-loan': GraduationCap,
  'auto-loan': Car,
};

const accountGradients = {
  'credit-card': 'from-blue-500 to-indigo-600',
  'loan': 'from-purple-500 to-pink-600',
  'student-loan': 'from-orange-500 to-red-600',
  'auto-loan': 'from-teal-500 to-cyan-600',
};

const statusColors = {
  good: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  error: 'bg-red-50 text-red-700 border-red-200',
};

const statusLabels = {
  good: 'Good Standing',
  warning: 'Needs Attention',
  error: 'Past Due',
};

export const AccountCard = ({
  type,
  name,
  accountNumber,
  balance,
  limit,
  status,
  payment,
  opened,
}: AccountCardProps) => {
  const Icon = accountIcons[type];
  const gradient = accountGradients[type];
  const utilization = limit ? (balance / limit) * 100 : 0;
  const utilizationColor = utilization < 30 ? 'from-emerald-500 to-teal-500' : 
                           utilization < 50 ? 'from-yellow-500 to-orange-500' : 
                           'from-red-500 to-pink-500';

  return (
    <Card className="bg-white border-slate-200/50 p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-slate-900 group-hover:text-slate-700 transition-colors">
              {name}
            </h3>
            <p className="text-sm text-slate-600">
              {type === 'credit-card' ? 'Credit Card' : 
               type === 'student-loan' ? 'Student Loan' :
               type === 'auto-loan' ? 'Auto Loan' : 'Loan'} • ****{accountNumber}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1.5 text-xs font-semibold rounded-full border ${statusColors[status]}`}>
          {statusLabels[status]}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-xs text-slate-500 mb-1 font-medium">Balance</p>
          <p className="font-bold text-slate-900">${balance.toLocaleString()}</p>
        </div>
        {limit && (
          <div>
            <p className="text-xs text-slate-500 mb-1 font-medium">Limit</p>
            <p className="font-bold text-slate-900">${limit.toLocaleString()}</p>
          </div>
        )}
        {limit && (
          <div>
            <p className="text-xs text-slate-500 mb-1 font-medium">Utilization</p>
            <p className="font-bold text-slate-900">{utilization.toFixed(1)}%</p>
          </div>
        )}
        <div>
          <p className="text-xs text-slate-500 mb-1 font-medium">Payment</p>
          <p className={`font-bold ${
            payment === 'on-time' ? 'text-emerald-600' :
            payment === 'late' ? 'text-amber-600' :
            'text-red-600'
          }`}>
            {payment === 'on-time' ? '✓ On-time' :
             payment === 'late' ? '⚠ Late' :
             '✗ Missed'}
          </p>
        </div>
      </div>

      {/* Utilization Bar (only for credit cards) */}
      {limit && (
        <div className="mb-4">
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${utilizationColor} rounded-full transition-all duration-1000 ease-out`}
              style={{ width: `${utilization}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <p className="text-xs text-slate-500">
          Opened: <span className="font-medium text-slate-700">{opened}</span>
        </p>
        <button className="text-sm font-medium text-slate-600 hover:text-slate-900 group-hover:underline transition-colors">
          View Details →
        </button>
      </div>
    </Card>
  );
};
