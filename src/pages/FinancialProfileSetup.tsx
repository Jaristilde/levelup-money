import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lock, Plus, Trash2, Shield, DollarSign, CreditCard as CreditCardIcon, Home, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db, CreditCard, Loan } from '@/lib/firebase';
import { toast } from 'sonner';

const FinancialProfileSetup = () => {
  const { user, profile, refreshSession } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Personal Information
  const [ssnLastFour, setSsnLastFour] = useState('');
  const [showSSN, setShowSSN] = useState(false);
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthYear, setBirthYear] = useState('');
  
  // Address
  const [street, setStreet] = useState('');
  const [apt, setApt] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  // Credit Score
  const [creditScore, setCreditScore] = useState('');

  // Credit Cards
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  
  // Loans
  const [loans, setLoans] = useState<Loan[]>([]);

  // Income & Expenses
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const usStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const addCreditCard = () => {
    const newCard: CreditCard = {
      id: Date.now().toString(),
      name: '',
      balance: 0,
      credit_limit: 0,
      apr: 0,
      minimum_payment: 0
    };
    setCreditCards([...creditCards, newCard]);
  };

  const removeCreditCard = (id: string) => {
    setCreditCards(creditCards.filter(card => card.id !== id));
  };

  const updateCreditCard = (id: string, field: keyof CreditCard, value: any) => {
    setCreditCards(creditCards.map(card =>
      card.id === id ? { ...card, [field]: value } : card
    ));
  };

  const addLoan = () => {
    const newLoan: Loan = {
      id: Date.now().toString(),
      type: 'student',
      name: '',
      balance: 0,
      monthly_payment: 0,
      apr: 0
    };
    setLoans([...loans, newLoan]);
  };

  const removeLoan = (id: string) => {
    setLoans(loans.filter(loan => loan.id !== id));
  };

  const updateLoan = (id: string, field: keyof Loan, value: any) => {
    setLoans(loans.map(loan =>
      loan.id === id ? { ...loan, [field]: value } : loan
    ));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // SSN validation (optional but if provided, must be 4 digits)
    if (ssnLastFour && (ssnLastFour.length !== 4 || !/^\d{4}$/.test(ssnLastFour))) {
      newErrors.ssn = 'Must be exactly 4 digits';
    }

    // Date of Birth validation
    if (birthMonth && birthDay && birthYear) {
      const age = new Date().getFullYear() - parseInt(birthYear);
      if (age < 18) {
        newErrors.dob = 'You must be 18 or older';
      }
    }

    // Credit score validation
    if (creditScore) {
      const score = parseInt(creditScore);
      if (score < 300 || score > 850) {
        newErrors.creditScore = 'Credit score must be between 300 and 850';
      }
    }

    // Zip code validation
    if (zip && !/^\d{5}$/.test(zip)) {
      newErrors.zip = 'Must be 5 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotalDebt = () => {
    const cardDebt = creditCards.reduce((sum, card) => sum + (card.balance || 0), 0);
    const loanDebt = loans.reduce((sum, loan) => sum + (loan.balance || 0), 0);
    return cardDebt + loanDebt;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    if (!user) {
      toast.error('User not found. Please log in again.');
      return;
    }

    setLoading(true);

    try {
      const userDocRef = doc(db, 'users', user.uid);
      
      const dateOfBirth = (birthMonth && birthDay && birthYear)
        ? new Date(parseInt(birthYear), months.indexOf(birthMonth), parseInt(birthDay)).toISOString()
        : undefined;

      await updateDoc(userDocRef, {
        financial_profile: {
          // Personal Information
          ssn_last_four: ssnLastFour || null,
          date_of_birth: dateOfBirth || null,
          address: (street && city && state && zip) ? {
            street,
            apt: apt || undefined,
            city,
            state,
            zip
          } : null,
          
          // Credit Score
          credit_score: creditScore ? parseInt(creditScore) : null,
          
          // Debts
          credit_cards: creditCards.filter(card => card.name && card.balance > 0),
          loans: loans.filter(loan => loan.name && loan.balance > 0),
          total_debt: calculateTotalDebt(),
          
          // Income & Expenses
          monthly_income: monthlyIncome ? parseFloat(monthlyIncome) : null,
          monthly_expenses: monthlyExpenses ? parseFloat(monthlyExpenses) : null,
          
          // Metadata
          profile_completed: true,
          last_updated: new Date().toISOString()
        },
        updated_at: serverTimestamp()
      });

      await refreshSession();
      toast.success('Financial profile saved successfully! 🎉');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving financial profile:', error);
      toast.error('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
      {/* Header */}
      <header className="mb-8">
        <nav className="text-sm text-slate-500 mb-2 font-inter" aria-label="Breadcrumb">
          Home &gt; Financial Profile
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 font-poppins">
          Financial Profile Setup
        </h1>
        <p className="text-lg text-slate-600 font-inter">
          Help us personalize your experience by sharing your financial information
        </p>
      </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <Card className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-brand-green" />
              <h2 className="text-2xl font-bold text-slate-900 font-poppins">
                Personal Information
              </h2>
            </div>
            
            <div className="space-y-4">
              {/* SSN Last 4 (Optional) */}
              <div>
                <Label htmlFor="ssn" className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  Last 4 digits of SSN
                  <span className="text-xs text-slate-500 font-normal">(Optional - for future credit monitoring)</span>
                </Label>
                <div className="relative">
                  <Input
                    id="ssn"
                    type={showSSN ? 'text' : 'password'}
                    value={ssnLastFour}
                    onChange={(e) => setSsnLastFour(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="••••"
                    maxLength={4}
                    className={`pr-10 ${errors.ssn ? 'border-red-500' : ''}`}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSSN(!showSSN)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showSSN ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.ssn && <p className="mt-1 text-sm text-red-600">{errors.ssn}</p>}
                <p className="mt-1 text-xs text-slate-500 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  256-bit encrypted • Never stored in plain text
                </p>
              </div>

              {/* Date of Birth */}
              <div>
                <Label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date of Birth
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  <Select value={birthMonth} onValueChange={setBirthMonth}>
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map(month => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={birthDay} onValueChange={setBirthDay}>
                    <SelectTrigger>
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                        <SelectItem key={day} value={day.toString()}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={birthYear} onValueChange={setBirthYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob}</p>}
              </div>

              {/* Address */}
              <div>
                <Label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Home Address
                </Label>
                <div className="space-y-3">
                  <Input
                    placeholder="Street Address"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    disabled={loading}
                  />
                  <Input
                    placeholder="Apt / Unit (optional)"
                    value={apt}
                    onChange={(e) => setApt(e.target.value)}
                    disabled={loading}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      disabled={loading}
                    />
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger>
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                      <SelectContent>
                        {usStates.map(st => (
                          <SelectItem key={st} value={st}>{st}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Input
                    placeholder="ZIP Code"
                    value={zip}
                    onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                    maxLength={5}
                    className={errors.zip ? 'border-red-500' : ''}
                    disabled={loading}
                  />
                  {errors.zip && <p className="mt-1 text-sm text-red-600">{errors.zip}</p>}
                </div>
              </div>
            </div>
          </Card>

          {/* Credit Score Section */}
          <Card className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-brand-green" />
              <h2 className="text-2xl font-bold text-slate-900 font-poppins">
                Credit Score
              </h2>
            </div>
            
            <div>
              <Label htmlFor="creditScore" className="text-sm font-semibold text-slate-700 mb-2">
                Current Credit Score (from Credit Karma, Experian, etc.)
              </Label>
              <Input
                id="creditScore"
                type="number"
                value={creditScore}
                onChange={(e) => setCreditScore(e.target.value)}
                placeholder="e.g., 720"
                min="300"
                max="850"
                className={errors.creditScore ? 'border-red-500' : ''}
                disabled={loading}
              />
              {errors.creditScore && <p className="mt-1 text-sm text-red-600">{errors.creditScore}</p>}
              <p className="mt-1 text-xs text-slate-500">Score range: 300-850</p>
            </div>
          </Card>

          {/* Credit Cards Section */}
          <Card className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <CreditCardIcon className="w-6 h-6 text-brand-green" />
                <h2 className="text-2xl font-bold text-slate-900 font-poppins">
                  Credit Cards
                </h2>
              </div>
              <Button
                type="button"
                onClick={addCreditCard}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                disabled={loading}
              >
                <Plus className="w-4 h-4" />
                Add Card
              </Button>
            </div>

            {creditCards.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <CreditCardIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No credit cards added yet. Click "Add Card" to get started.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {creditCards.map((card) => (
                  <div key={card.id} className="bg-slate-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold text-slate-700">Card Details</Label>
                      <Button
                        type="button"
                        onClick={() => removeCreditCard(card.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        disabled={loading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        placeholder="Card Name (e.g., Chase Sapphire)"
                        value={card.name}
                        onChange={(e) => updateCreditCard(card.id, 'name', e.target.value)}
                        disabled={loading}
                      />
                      <Input
                        type="number"
                        placeholder="Current Balance"
                        value={card.balance || ''}
                        onChange={(e) => updateCreditCard(card.id, 'balance', parseFloat(e.target.value) || 0)}
                        disabled={loading}
                      />
                      <Input
                        type="number"
                        placeholder="Credit Limit"
                        value={card.credit_limit || ''}
                        onChange={(e) => updateCreditCard(card.id, 'credit_limit', parseFloat(e.target.value) || 0)}
                        disabled={loading}
                      />
                      <Input
                        type="number"
                        placeholder="APR % (optional)"
                        value={card.apr || ''}
                        onChange={(e) => updateCreditCard(card.id, 'apr', parseFloat(e.target.value) || 0)}
                        disabled={loading}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Loans Section */}
          <Card className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-brand-green" />
                <h2 className="text-2xl font-bold text-slate-900 font-poppins">
                  Loans
                </h2>
              </div>
              <Button
                type="button"
                onClick={addLoan}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                disabled={loading}
              >
                <Plus className="w-4 h-4" />
                Add Loan
              </Button>
            </div>

            {loans.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No loans added yet. Click "Add Loan" to get started.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {loans.map((loan) => (
                  <div key={loan.id} className="bg-slate-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold text-slate-700">Loan Details</Label>
                      <Button
                        type="button"
                        onClick={() => removeLoan(loan.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        disabled={loading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Select
                        value={loan.type}
                        onValueChange={(value: any) => updateLoan(loan.id, 'type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Loan Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student Loan</SelectItem>
                          <SelectItem value="auto">Auto Loan</SelectItem>
                          <SelectItem value="personal">Personal Loan</SelectItem>
                          <SelectItem value="mortgage">Mortgage</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Loan Name (e.g., Federal Student Loan)"
                        value={loan.name}
                        onChange={(e) => updateLoan(loan.id, 'name', e.target.value)}
                        disabled={loading}
                      />
                      <Input
                        type="number"
                        placeholder="Current Balance"
                        value={loan.balance || ''}
                        onChange={(e) => updateLoan(loan.id, 'balance', parseFloat(e.target.value) || 0)}
                        disabled={loading}
                      />
                      <Input
                        type="number"
                        placeholder="Monthly Payment (optional)"
                        value={loan.monthly_payment || ''}
                        onChange={(e) => updateLoan(loan.id, 'monthly_payment', parseFloat(e.target.value) || 0)}
                        disabled={loading}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Income & Expenses Section */}
          <Card className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-6 h-6 text-brand-green" />
              <h2 className="text-2xl font-bold text-slate-900 font-poppins">
                Income & Expenses
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="income" className="text-sm font-semibold text-slate-700 mb-2">
                  Monthly Income (after taxes)
                </Label>
                <Input
                  id="income"
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  placeholder="e.g., 4500"
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="expenses" className="text-sm font-semibold text-slate-700 mb-2">
                  Monthly Expenses
                </Label>
                <Input
                  id="expenses"
                  type="number"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(e.target.value)}
                  placeholder="e.g., 3200"
                  disabled={loading}
                />
              </div>
            </div>
          </Card>

          {/* Summary Card */}
          {(creditCards.length > 0 || loans.length > 0 || monthlyIncome || monthlyExpenses) && (
            <Card className="p-6 md:p-8 bg-gradient-to-br from-brand-green/5 to-emerald-50">
              <h3 className="text-xl font-bold text-slate-900 mb-4 font-poppins">Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {calculateTotalDebt() > 0 && (
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Total Debt</p>
                    <p className="text-2xl font-bold text-slate-900">
                      ${calculateTotalDebt().toLocaleString()}
                    </p>
                  </div>
                )}
                {creditScore && (
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Credit Score</p>
                    <p className="text-2xl font-bold text-brand-green">{creditScore}</p>
                  </div>
                )}
                {monthlyIncome && (
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Monthly Income</p>
                    <p className="text-2xl font-bold text-slate-900">
                      ${parseFloat(monthlyIncome).toLocaleString()}
                    </p>
                  </div>
                )}
                {monthlyExpenses && (
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Monthly Expenses</p>
                    <p className="text-2xl font-bold text-slate-900">
                      ${parseFloat(monthlyExpenses).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              type="button"
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="flex-1"
              disabled={loading}
            >
              Skip for Now
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-brand-green hover:bg-brand-green/90 text-white"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </form>

      {/* Privacy Notice */}
      <div className="mt-8 text-center text-sm text-slate-500">
        <p className="flex items-center justify-center gap-2 mb-2">
          <Lock className="w-4 h-4" />
          Your data is encrypted and securely stored
        </p>
        <p>We never share your personal information with third parties</p>
      </div>
    </div>
  );
};

export default FinancialProfileSetup;

