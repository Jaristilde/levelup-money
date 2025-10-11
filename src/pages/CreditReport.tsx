import { Download, AlertCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CreditScoreHero } from '@/components/credit-report/CreditScoreHero';
import { ScoreRangeIndicator } from '@/components/credit-report/ScoreRangeIndicator';
import { ScoreFactors } from '@/components/credit-report/ScoreFactors';
import { AccountCard } from '@/components/credit-report/AccountCard';
import { CreditHistoryChart } from '@/components/credit-report/CreditHistoryChart';

const CreditReport = () => {
  const accounts = [
    {
      type: 'credit-card' as const,
      name: 'Chase Freedom',
      accountNumber: '4582',
      balance: 2450,
      limit: 10000,
      status: 'good' as const,
      payment: 'on-time' as const,
      opened: 'Jan 2020',
    },
    {
      type: 'student-loan' as const,
      name: 'Student Loan',
      accountNumber: '8923',
      balance: 18450,
      status: 'good' as const,
      payment: 'on-time' as const,
      opened: 'Aug 2018',
    },
    {
      type: 'auto-loan' as const,
      name: 'Auto Loan',
      accountNumber: '2341',
      balance: 12350,
      status: 'good' as const,
      payment: 'on-time' as const,
      opened: 'Mar 2022',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 lg:pb-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <nav className="text-sm text-slate-500 mb-2" aria-label="Breadcrumb">
                Home &gt; Credit Report
              </nav>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Credit Report
              </h1>
              <p className="text-slate-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Updated: 2 hours ago
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <AlertCircle className="w-4 h-4" />
                Dispute Error
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Score Section */}
        <section className="mb-8" aria-label="Credit score overview">
          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
              <CreditScoreHero score={720} />
            </div>
            <div className="lg:col-span-3">
              <ScoreRangeIndicator score={720} />
            </div>
          </div>
        </section>

        {/* Score Factors */}
        <section className="mb-8" aria-label="Credit score factors">
          <ScoreFactors />
        </section>

        {/* Accounts Section */}
        <section className="mb-8" aria-labelledby="accounts-heading">
          <div className="flex items-center justify-between mb-6">
            <h2 id="accounts-heading" className="text-2xl font-bold text-slate-900">
              Accounts
            </h2>
            <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
              View All →
            </Button>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {accounts.map((account, index) => (
              <AccountCard key={index} {...account} />
            ))}
          </div>
        </section>

        {/* Credit History Chart */}
        <section aria-label="Credit history timeline">
          <CreditHistoryChart />
        </section>
      </div>
    </div>
  );
};

export default CreditReport;
