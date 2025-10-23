import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, TrendingDown, DollarSign, Calendar, Percent, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DebtPayoffRoadmap } from '@/components/debt/DebtPayoffRoadmap';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { calculateTotalMinimumPayment, calculateDTI } from '@/lib/calculations';
import { useAuth } from '@/contexts/AuthContext';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';

interface Debt {
  id: string;
  name: string;
  type: 'credit-card' | 'student-loan' | 'personal-loan' | 'car-loan' | 'mortgage' | 'medical' | 'other';
  balance: number;
  interestRate: number;
  minimumPayment: number;
  dueDate: number; // Day of month
}

const Debt = () => {
  const { user, profile } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);
  const [loading, setLoading] = useState(false);

  // Get monthly income from profile for DTI calculation
  const monthlyIncome = profile?.financial_profile?.monthly_income || 0;

  // Load debts from Firestore profile
  const [debts, setDebts] = useState<Debt[]>([]);

  const [formData, setFormData] = useState<Partial<Debt>>({
    name: '',
    type: 'credit-card',
    balance: 0,
    interestRate: 0,
    minimumPayment: 0,
    dueDate: 1,
  });

  // Load debts from profile on mount
  useEffect(() => {
    console.log('🔵 Debt - useEffect triggered');
    console.log('🔵 User:', user?.uid);
    console.log('🔵 Profile:', profile);
    console.log('🔵 Financial Profile:', profile?.financial_profile);

    if (profile?.financial_profile) {
      console.log('🔵 Credit Cards:', profile.financial_profile.credit_cards);
      console.log('🔵 Loans:', profile.financial_profile.loans);

      // Map credit cards and loans from profile to debts array
      const creditCardDebts: Debt[] = (profile.financial_profile.credit_cards || []).map(card => ({
        id: card.id || Date.now().toString(),
        name: card.name || 'Credit Card',
        type: 'credit-card' as const,
        balance: card.balance || 0,
        interestRate: card.apr || 0,
        minimumPayment: card.minimum_payment || 0,
        dueDate: 1, // Default, could be added to schema later
      }));

      const loanDebts: Debt[] = (profile.financial_profile.loans || []).map(loan => ({
        id: loan.id || Date.now().toString(),
        name: loan.name || 'Loan',
        type: (loan.type === 'student' ? 'student-loan' :
               loan.type === 'personal' ? 'personal-loan' :
               loan.type === 'auto' ? 'car-loan' : 'other') as Debt['type'],
        balance: loan.balance || 0,
        interestRate: loan.apr || 0,
        minimumPayment: loan.monthly_payment || 0,
        dueDate: 1, // Default, could be added to schema later
      }));

      console.log('✅ Loaded credit card debts:', creditCardDebts);
      console.log('✅ Loaded loan debts:', loanDebts);

      setDebts([...creditCardDebts, ...loanDebts]);
    } else {
      console.log('⚠️ No financial_profile found in profile');
    }
  }, [profile, user]);

  // Calculate totals using centralized calculation functions
  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMinimumPayment = calculateTotalMinimumPayment(debts);
  const debtToIncomeRatio = calculateDTI(totalMinimumPayment, monthlyIncome);
  const avgInterestRate = debts.reduce((sum, debt) => sum + debt.interestRate, 0) / (debts.length || 1);

  // Helper function to save debts to Firestore
  const saveDebtsToFirestore = async (updatedDebts: Debt[]) => {
    console.log('🔵 saveDebtsToFirestore CALLED');
    console.log('🔵 Updated Debts:', updatedDebts);

    if (!user) {
      console.error('❌ No user found!');
      toast.error('User not found. Please log in again.');
      return false;
    }

    console.log('🔵 User ID:', user.uid);
    console.log('🔵 Firestore path: users/' + user.uid);

    setLoading(true);
    try {
      const userDocRef = doc(db, 'users', user.uid);
      console.log('🔵 Document reference created');

      // Separate debts into credit cards and loans
      const creditCards = updatedDebts
        .filter(debt => debt.type === 'credit-card')
        .map(debt => ({
          id: debt.id,
          name: debt.name,
          balance: debt.balance,
          apr: debt.interestRate,
          minimum_payment: debt.minimumPayment,
          credit_limit: 0, // Default, not tracked in this interface
        }));

      const loans = updatedDebts
        .filter(debt => debt.type !== 'credit-card')
        .map(debt => ({
          id: debt.id,
          name: debt.name,
          type: debt.type === 'student-loan' ? 'student' :
                debt.type === 'personal-loan' ? 'personal' :
                debt.type === 'car-loan' ? 'auto' : 'other',
          balance: debt.balance,
          apr: debt.interestRate,
          monthly_payment: debt.minimumPayment,
        }));

      console.log('🔵 Credit Cards to save:', creditCards);
      console.log('🔵 Loans to save:', loans);

      const dataToSave = {
        financial_profile: {
          credit_cards: creditCards,
          loans: loans,
          total_debt: totalDebt,
          last_updated: new Date().toISOString(),
        }
      };

      console.log('🔵 Data to save:', dataToSave);
      console.log('🔵 About to call setDoc with merge: true...');

      // Use setDoc with merge to create fields if they don't exist
      await setDoc(userDocRef, dataToSave, { merge: true });

      console.log('✅ Firestore write SUCCESS!');
      setLoading(false);
      return true;
    } catch (error: any) {
      console.error('❌ Firestore write FAILED!');
      console.error('❌ Error object:', error);
      console.error('❌ Error code:', error?.code);
      console.error('❌ Error message:', error?.message);
      console.error('❌ Full error:', JSON.stringify(error, null, 2));
      toast.error('Failed to save changes. Please try again.');
      setLoading(false);
      return false;
    }
  };

  const handleAddDebt = async () => {
    console.log('🔵 handleAddDebt CALLED');
    console.log('🔵 Form Data:', formData);

    if (formData.name && formData.balance !== undefined && formData.minimumPayment !== undefined) {
      console.log('✅ Validation passed');

      const newDebt: Debt = {
        id: Date.now().toString(),
        name: formData.name,
        type: formData.type as Debt['type'],
        balance: Number(formData.balance),
        interestRate: Number(formData.interestRate),
        minimumPayment: Number(formData.minimumPayment),
        dueDate: Number(formData.dueDate),
      };

      console.log('🔵 New Debt:', newDebt);
      console.log('🔵 Current debts:', debts);

      const updatedDebts = [...debts, newDebt];
      console.log('🔵 Updated debts:', updatedDebts);

      setDebts(updatedDebts);
      console.log('🔵 Local state updated, now calling Firestore...');

      const success = await saveDebtsToFirestore(updatedDebts);
      if (success) {
        console.log('✅ handleAddDebt completed successfully');
        toast.success('Debt added successfully!');
        resetForm();
        setShowAddModal(false);
      } else {
        console.error('❌ handleAddDebt failed, reverting state');
        // Revert on failure
        setDebts(debts);
      }
    } else {
      console.error('❌ Validation failed:', formData);
    }
  };

  const handleUpdateDebt = async () => {
    if (editingDebt && formData.name && formData.balance !== undefined && formData.minimumPayment !== undefined) {
      const updatedDebts = debts.map(debt =>
        debt.id === editingDebt.id
          ? {
              ...debt,
              name: formData.name!,
              type: formData.type as Debt['type'],
              balance: Number(formData.balance),
              interestRate: Number(formData.interestRate),
              minimumPayment: Number(formData.minimumPayment),
              dueDate: Number(formData.dueDate),
            }
          : debt
      );

      setDebts(updatedDebts);

      const success = await saveDebtsToFirestore(updatedDebts);
      if (success) {
        toast.success('Debt updated successfully!');
        resetForm();
        setEditingDebt(null);
      } else {
        // Revert on failure
        setDebts(debts);
      }
    }
  };

  const handleDeleteDebt = async (id: string) => {
    if (confirm('Are you sure you want to delete this debt?')) {
      const updatedDebts = debts.filter(debt => debt.id !== id);
      setDebts(updatedDebts);

      const success = await saveDebtsToFirestore(updatedDebts);
      if (success) {
        toast.success('Debt deleted successfully!');
      } else {
        // Revert on failure
        setDebts(debts);
      }
    }
  };

  const handleEditDebt = (debt: Debt) => {
    setEditingDebt(debt);
    setFormData({
      name: debt.name,
      type: debt.type,
      balance: debt.balance,
      interestRate: debt.interestRate,
      minimumPayment: debt.minimumPayment,
      dueDate: debt.dueDate,
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'credit-card',
      balance: 0,
      interestRate: 0,
      minimumPayment: 0,
      dueDate: 1,
    });
  };

  const getDebtTypeLabel = (type: Debt['type']) => {
    const labels = {
      'credit-card': 'Credit Card',
      'student-loan': 'Student Loan',
      'personal-loan': 'Personal Loan',
      'car-loan': 'Car Loan',
      'mortgage': 'Mortgage',
      'medical': 'Medical Debt',
      'other': 'Other',
    };
    return labels[type];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 lg:pb-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <nav className="text-sm text-slate-500 mb-2" aria-label="Breadcrumb">
                Home &gt; Debts
              </nav>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Debt Management
              </h1>
              <p className="text-slate-600">
                Track and manage all your debts in one place
              </p>
            </div>

            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Debt
            </Button>
          </div>
        </header>

        {/* Summary Cards */}
        <section className="mb-8" aria-label="Debt overview">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-slate-700">Total Debt</h3>
                  <TrendingDown className="w-5 h-5 text-red-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  ${totalDebt.toLocaleString()}
                </div>
                <div className="text-xs text-slate-600">{debts.length} accounts</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-slate-700">Min. Payment</h3>
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  ${totalMinimumPayment.toLocaleString()}
                </div>
                <div className="text-xs text-slate-600">per month</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-slate-700">Avg. Interest</h3>
                  <Percent className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {avgInterestRate.toFixed(1)}%
                </div>
                <div className="text-xs text-slate-600">across all debts</div>
              </CardContent>
            </Card>

            <Card className={`bg-gradient-to-br ${
              debtToIncomeRatio > 43 ? 'from-red-50 to-orange-50 border-red-200/50' :
              debtToIncomeRatio > 36 ? 'from-yellow-50 to-amber-50 border-yellow-200/50' :
              'from-green-50 to-emerald-50 border-green-200/50'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-slate-700">DTI Ratio</h3>
                  <Target className="w-5 h-5 text-slate-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {debtToIncomeRatio.toFixed(1)}%
                </div>
                <div className="text-xs text-slate-600">
                  {debtToIncomeRatio > 43 ? 'High' : debtToIncomeRatio > 36 ? 'Moderate' : 'Good'}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Debt List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Debt List */}
            <section aria-labelledby="debt-list-heading">
              <h2 id="debt-list-heading" className="text-2xl font-bold text-slate-900 mb-6">
                Your Debts
              </h2>

              {debts.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <TrendingDown className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">
                      No debts added yet
                    </h3>
                    <p className="text-slate-600 mb-6">
                      Start tracking your debts to create your path to financial freedom
                    </p>
                    <Button
                      onClick={() => setShowAddModal(true)}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Debt
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {debts.map((debt) => (
                    <Card key={debt.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-slate-900">
                                {debt.name}
                              </h3>
                              <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded">
                                {getDebtTypeLabel(debt.type)}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                              <div>
                                <div className="text-slate-600 text-xs mb-1">Balance</div>
                                <div className="font-semibold text-slate-900">
                                  ${debt.balance.toLocaleString()}
                                </div>
                              </div>
                              <div>
                                <div className="text-slate-600 text-xs mb-1">Interest Rate</div>
                                <div className="font-semibold text-slate-900">
                                  {debt.interestRate}%
                                </div>
                              </div>
                              <div>
                                <div className="text-slate-600 text-xs mb-1">Min. Payment</div>
                                <div className="font-semibold text-slate-900">
                                  ${debt.minimumPayment}
                                </div>
                              </div>
                              <div>
                                <div className="text-slate-600 text-xs mb-1">Due Date</div>
                                <div className="font-semibold text-slate-900">
                                  {debt.dueDate}{debt.dueDate === 1 ? 'st' : debt.dueDate === 2 ? 'nd' : debt.dueDate === 3 ? 'rd' : 'th'} of month
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditDebt(debt)}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteDebt(debt.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Progress bar showing how much is paid */}
                        <div className="mt-4">
                          <div className="flex justify-between text-xs text-slate-600 mb-2">
                            <span>Progress to payoff</span>
                            <span>Visualization coming soon</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Column - Roadmap */}
          <div className="space-y-6">
            <DebtPayoffRoadmap />
          </div>
        </div>

        {/* Add/Edit Debt Modal */}
        <Dialog open={showAddModal || editingDebt !== null} onOpenChange={(open) => {
          if (!open) {
            setShowAddModal(false);
            setEditingDebt(null);
            resetForm();
          }
        }}>
          <DialogContent className="sm:max-w-[500px] bg-white">
            <DialogHeader>
              <DialogTitle>{editingDebt ? 'Edit Debt' : 'Add New Debt'}</DialogTitle>
              <DialogDescription>
                {editingDebt ? 'Update the details of your debt' : 'Enter the details of your debt to start tracking it'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Debt Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Chase Credit Card"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Debt Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value as Debt['type'] })}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                    <SelectItem value="student-loan">Student Loan</SelectItem>
                    <SelectItem value="personal-loan">Personal Loan</SelectItem>
                    <SelectItem value="car-loan">Car Loan</SelectItem>
                    <SelectItem value="mortgage">Mortgage</SelectItem>
                    <SelectItem value="medical">Medical Debt</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="balance">Balance *</Label>
                  <Input
                    id="balance"
                    type="number"
                    placeholder="0"
                    value={formData.balance || ''}
                    onChange={(e) => setFormData({ ...formData, balance: Number(e.target.value) })}
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interestRate">Interest Rate (%) *</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.interestRate || ''}
                    onChange={(e) => setFormData({ ...formData, interestRate: Number(e.target.value) })}
                    className="bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minimumPayment">Minimum Payment *</Label>
                  <Input
                    id="minimumPayment"
                    type="number"
                    placeholder="0"
                    value={formData.minimumPayment || ''}
                    onChange={(e) => setFormData({ ...formData, minimumPayment: Number(e.target.value) })}
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date (Day of Month) *</Label>
                  <Input
                    id="dueDate"
                    type="number"
                    min="1"
                    max="31"
                    placeholder="1"
                    value={formData.dueDate || ''}
                    onChange={(e) => setFormData({ ...formData, dueDate: Number(e.target.value) })}
                    className="bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingDebt(null);
                  resetForm();
                }}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={editingDebt ? handleUpdateDebt : handleAddDebt}
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={loading}
              >
                {loading ? 'Saving...' : editingDebt ? 'Update Debt' : 'Add Debt'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Debt;
