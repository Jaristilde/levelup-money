import { useState } from 'react';
import { Plus, Wallet, DollarSign, TrendingDown, TrendingUp, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OverviewCard } from '@/components/accounts/OverviewCard';
import { BankAccountCard } from '@/components/accounts/BankAccountCard';
import { CreditCardVisual } from '@/components/accounts/CreditCardVisual';
import { EmptyAccountsState } from '@/components/accounts/EmptyAccountsState';
import { AccountsSkeletons } from '@/components/accounts/AccountsSkeletons';
import { LinkAccountModal } from '@/components/accounts/LinkAccountModal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Debt = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [hasAccounts] = useState(true); // Set to false to show empty state

  // Mock data
  const bankAccounts = [
    {
      bankName: 'Chase Checking',
      accountType: 'Checking',
      accountNumber: '4582',
      balance: 12450,
      change: 520,
      income: 3240,
      expenses: 2720,
      transactions: 142,
      gradient: 'from-blue-500 to-indigo-600',
      status: 'synced' as const,
    },
    {
      bankName: 'Ally Savings',
      accountType: 'Savings',
      accountNumber: '8923',
      balance: 24350,
      change: 1200,
      income: 1200,
      expenses: 0,
      transactions: 3,
      gradient: 'from-purple-500 to-pink-600',
      status: 'synced' as const,
    },
  ];

  const creditCards = [
    {
      cardName: 'Freedom',
      lastFour: '4582',
      balance: 2450,
      limit: 10000,
      gradient: 'from-slate-900 via-slate-800 to-slate-900',
      brand: 'visa' as const,
    },
    {
      cardName: 'Sapphire',
      lastFour: '7621',
      balance: 1280,
      limit: 15000,
      gradient: 'from-blue-900 via-indigo-900 to-blue-900',
      brand: 'visa' as const,
    },
  ];

  const totalBalance = bankAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalDebt = creditCards.reduce((sum, card) => sum + card.balance, 0);
  const totalChange = bankAccounts.reduce((sum, acc) => sum + acc.change, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 lg:pb-8">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
          <AccountsSkeletons />
        </div>
      </div>
    );
  }

  if (!hasAccounts) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 lg:pb-8">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
          <EmptyAccountsState onLinkAccount={() => setShowLinkModal(true)} />
          <LinkAccountModal isOpen={showLinkModal} onClose={() => setShowLinkModal(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 lg:pb-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <nav className="text-sm text-slate-500 mb-2" aria-label="Breadcrumb">
                Home &gt; Accounts
              </nav>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Accounts
              </h1>
              <p className="text-slate-600">
                Manage all your financial accounts in one place
              </p>
            </div>
            
            <Button
              onClick={() => setShowLinkModal(true)}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Link New Account
            </Button>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search accounts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48 bg-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="all">All Accounts</SelectItem>
                <SelectItem value="banking">Banking</SelectItem>
                <SelectItem value="credit">Credit Cards</SelectItem>
                <SelectItem value="loans">Loans</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        {/* Overview Cards */}
        <section className="mb-8" aria-label="Financial overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OverviewCard
              title="Total Balance"
              amount={`$${totalBalance.toLocaleString()}`}
              change={`+$${totalChange.toLocaleString()}`}
              changePercent="1.2%"
              isPositive={true}
              icon={Wallet}
              gradient="from-emerald-500 to-teal-500"
            />
            <OverviewCard
              title="Total Debt"
              amount={`$${totalDebt.toLocaleString()}`}
              change="-$350"
              changePercent="2.7%"
              isPositive={true}
              icon={TrendingDown}
              gradient="from-red-500 to-pink-500"
            />
            <OverviewCard
              title="Cash Flow"
              amount={`$${totalChange.toLocaleString()}`}
              change="This month"
              changePercent=""
              isPositive={true}
              icon={TrendingUp}
              gradient="from-blue-500 to-indigo-500"
            />
          </div>
        </section>

        {/* Banking Accounts */}
        <section className="mb-8" aria-labelledby="banking-heading">
          <h2 id="banking-heading" className="text-2xl font-bold text-slate-900 mb-6">
            Banking Accounts
          </h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {bankAccounts.map((account, index) => (
              <BankAccountCard key={index} {...account} />
            ))}
          </div>
        </section>

        {/* Credit Cards */}
        <section aria-labelledby="credit-cards-heading">
          <h2 id="credit-cards-heading" className="text-2xl font-bold text-slate-900 mb-6">
            Credit Cards
          </h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {creditCards.map((card, index) => (
              <CreditCardVisual key={index} {...card} />
            ))}
          </div>
        </section>
      </div>

      {/* Link Account Modal */}
      <LinkAccountModal isOpen={showLinkModal} onClose={() => setShowLinkModal(false)} />
    </div>
  );
};

export default Debt;
