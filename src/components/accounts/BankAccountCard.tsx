import { TrendingUp, MoreHorizontal, Building2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RefreshCw, Eye, Download, Unlink } from 'lucide-react';

interface BankAccountCardProps {
  bankName: string;
  accountType: string;
  accountNumber: string;
  balance: number;
  change: number;
  income: number;
  expenses: number;
  transactions: number;
  gradient: string;
  status: 'synced' | 'error' | 'syncing';
}

export const BankAccountCard = ({
  bankName,
  accountType,
  accountNumber,
  balance,
  change,
  income,
  expenses,
  transactions,
  gradient,
  status,
}: BankAccountCardProps) => {
  const statusConfig = {
    synced: { label: '✓ Synced', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    error: { label: '✗ Error', color: 'bg-red-50 text-red-700 border-red-200' },
    syncing: { label: '⟳ Syncing', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  };

  return (
    <Card className="group relative overflow-hidden bg-white border-slate-200/50 p-6 shadow-lg shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Background gradient blob */}
      <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${gradient} blur-3xl opacity-10`} />
      
      <div className="relative">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            {/* Bank logo */}
            <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
              <Building2 className="h-7 w-7 text-white" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{bankName}</h3>
              <p className="text-sm text-slate-500">****{accountNumber} • {accountType}</p>
            </div>
          </div>
          
          {/* Status badge */}
          <span className={`rounded-full px-3 py-1.5 text-xs font-semibold border ${statusConfig[status].color}`}>
            {statusConfig[status].label}
          </span>
        </div>
        
        {/* Balance */}
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-500">Available Balance</p>
          <p className="mt-1 text-4xl font-bold text-slate-900">
            ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className={`mt-2 flex items-center gap-1 text-sm font-semibold ${
            change >= 0 ? 'text-emerald-600' : 'text-red-600'
          }`}>
            <TrendingUp className="h-4 w-4" />
            <span>{change >= 0 ? '+' : ''}${Math.abs(change).toLocaleString()} this month</span>
          </p>
        </div>
        
        {/* Quick stats grid */}
        <div className="mb-6 grid grid-cols-3 gap-4 rounded-xl bg-slate-50 p-4">
          <div>
            <p className="text-xs text-slate-500 mb-1">Income</p>
            <p className="font-semibold text-emerald-600">+${income.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Expenses</p>
            <p className="font-semibold text-red-600">-${expenses.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Transactions</p>
            <p className="font-semibold text-slate-900">{transactions}</p>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <Button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white">
            View Transactions
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="border-slate-200">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white z-50">
              <DropdownMenuItem>
                <RefreshCw className="mr-2 h-4 w-4" />
                Sync Now
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Export Transactions
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                <Unlink className="mr-2 h-4 w-4" />
                Disconnect Account
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
};
