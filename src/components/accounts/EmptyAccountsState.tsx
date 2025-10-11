import { Wallet, Plus, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyAccountsStateProps {
  onLinkAccount: () => void;
}

export const EmptyAccountsState = ({ onLinkAccount }: EmptyAccountsStateProps) => {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-xl shadow-emerald-500/30">
        <Wallet className="h-10 w-10 text-white" />
      </div>
      
      <h3 className="mb-3 text-3xl font-bold text-slate-900">
        Connect Your First Account
      </h3>
      
      <p className="mb-8 max-w-md text-lg text-slate-600 leading-relaxed">
        Link your bank accounts, credit cards, and loans to get a complete view of your finances and start improving your credit score.
      </p>
      
      <Button
        onClick={onLinkAccount}
        className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-6 text-lg font-semibold text-white shadow-lg shadow-emerald-500/50 transition-all hover:shadow-xl hover:shadow-emerald-500/50 hover:scale-105"
      >
        <Plus className="mr-2 h-6 w-6" />
        Link Your First Account
      </Button>
      
      <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
        <Shield className="h-4 w-4" />
        <span>Bank-level 256-bit encryption • Your data is never sold</span>
      </div>
      
      {/* Trust badges */}
      <div className="mt-8 flex items-center gap-8 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
          <span>FDIC Insured</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
          <span>SOC 2 Certified</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full" />
          <span>Read-only Access</span>
        </div>
      </div>
    </div>
  );
};
