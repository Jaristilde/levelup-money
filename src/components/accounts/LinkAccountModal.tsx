import { useState } from 'react';
import { X, Search, Shield, Lock, CheckCircle2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LinkAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const popularBanks = [
  { name: 'Chase', logo: '🏦', gradient: 'from-blue-600 to-blue-700' },
  { name: 'Bank of America', logo: '🏛️', gradient: 'from-red-600 to-red-700' },
  { name: 'Wells Fargo', logo: '🏪', gradient: 'from-yellow-600 to-orange-600' },
  { name: 'Citi', logo: '🏢', gradient: 'from-blue-500 to-blue-600' },
  { name: 'Capital One', logo: '💳', gradient: 'from-red-500 to-pink-600' },
  { name: 'US Bank', logo: '🏦', gradient: 'from-blue-700 to-indigo-700' },
];

export const LinkAccountModal = ({ isOpen, onClose }: LinkAccountModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [step, setStep] = useState<'select' | 'connecting' | 'success'>('select');

  const handleBankSelect = (bankName: string) => {
    setStep('connecting');
    // Simulate connection
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onClose();
        setStep('select');
      }, 2000);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        {step === 'select' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-900">
                Link Your Account
              </DialogTitle>
              <p className="text-slate-600 mt-2">
                Connect your bank securely to start tracking your finances
              </p>
            </DialogHeader>

            {/* Security badges */}
            <div className="flex items-center justify-center gap-6 py-4 border-y border-slate-100">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>256-bit SSL</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Lock className="w-4 h-4 text-blue-600" />
                <span>Read-only</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span>SOC 2 Certified</span>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search for your bank..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>

            {/* Popular banks */}
            <div>
              <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3">
                Popular Banks
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {popularBanks
                  .filter(bank => 
                    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((bank, index) => (
                    <button
                      key={index}
                      onClick={() => handleBankSelect(bank.name)}
                      className="group relative overflow-hidden rounded-xl border-2 border-slate-200 bg-white p-4 text-left transition-all hover:border-emerald-500 hover:shadow-lg"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${bank.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                      <div className="relative flex items-center gap-3">
                        <div className="text-3xl">{bank.logo}</div>
                        <span className="font-semibold text-slate-900">{bank.name}</span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>

            {/* Security note */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-900">
                <Shield className="w-4 h-4 inline mr-2" />
                Your credentials are encrypted and never stored. We use bank-level security to keep your information safe.
              </p>
            </div>
          </>
        )}

        {step === 'connecting' && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-6 animate-pulse">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Connecting Securely...</h3>
            <p className="text-slate-600">Establishing encrypted connection with your bank</p>
            <div className="flex gap-2 mt-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Account Linked Successfully!</h3>
            <p className="text-slate-600">Syncing your transactions...</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
