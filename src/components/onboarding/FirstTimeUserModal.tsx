import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Activity } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';

interface FirstTimeUserModalProps {
  open: boolean;
  onComplete: () => void;
}

const FirstTimeUserModal = ({ open, onComplete }: FirstTimeUserModalProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    referralSource: '',
    primaryGoal: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const referralOptions = [
    'Social Media (Instagram, Facebook, TikTok)',
    'Friend or Family',
    'Google Search',
    'YouTube',
    'Podcast',
    'Blog/Article',
    'Other'
  ];

  const goalOptions = [
    'Build Emergency Fund',
    'Pay Off Debt',
    'Save for Home Down Payment',
    'Retirement Planning',
    'Improve Credit Score',
    'Budget Better',
    'Save for Education',
    'Build Wealth',
    'Other'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.primaryGoal) {
      newErrors.primaryGoal = 'Please select your primary financial goal';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (!user) {
      toast.error('User not found. Please try logging in again.');
      return;
    }

    setLoading(true);

    try {
      const userDocRef = doc(db, 'users', user.uid);
      
      // Use setDoc with merge:true to create or update the document
      await setDoc(userDocRef, {
        full_name: `${formData.firstName} ${formData.lastName}`,
        first_name: formData.firstName,
        last_name: formData.lastName,
        referral_source: formData.referralSource || null,
        primary_financial_goal: formData.primaryGoal,
        onboarding_completed: true,
        updated_at: serverTimestamp()
      }, { merge: true });

      toast.success('Welcome to LevelUp Money! 🎉');
      onComplete();
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast.error('Failed to complete onboarding. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const isFormValid = formData.firstName.trim() && 
                      formData.lastName.trim() && 
                      formData.primaryGoal;

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent 
        className="max-w-[600px] max-h-[90vh] overflow-y-auto p-0 gap-0"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="bg-white rounded-lg">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-brand-green rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-3xl font-poppins">LU</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 font-poppins">
              Let's start with the basics
            </h1>
            <p className="text-lg text-slate-600 font-inter">
              To create your account, we'll need some personal information.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="px-8 pb-6 space-y-3">
            <div className="flex items-center gap-3 text-slate-700">
              <Lock className="w-5 h-5 text-brand-green flex-shrink-0" />
              <span className="text-sm font-inter">Your information is securely encrypted</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <Shield className="w-5 h-5 text-brand-green flex-shrink-0" />
              <span className="text-sm font-inter">We'll never sell your personal info</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <Activity className="w-5 h-5 text-brand-green flex-shrink-0" />
              <span className="text-sm font-inter">Your credit won't be impacted</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-8">
            <div className="space-y-5">
              {/* First Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">
                  First name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-green/20 outline-none transition-all font-inter ${
                    errors.firstName ? 'border-red-500' : 'border-slate-300 focus:border-brand-green'
                  }`}
                  placeholder=""
                  disabled={loading}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600 font-inter">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">
                  Last name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-green/20 outline-none transition-all font-inter ${
                    errors.lastName ? 'border-red-500' : 'border-slate-300 focus:border-brand-green'
                  }`}
                  placeholder=""
                  disabled={loading}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600 font-inter">{errors.lastName}</p>
                )}
              </div>

              {/* Referral Source (Optional) */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">
                  How did you hear about LevelUp Money? <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <select
                  value={formData.referralSource}
                  onChange={(e) => handleChange('referralSource', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all font-inter bg-white"
                  disabled={loading}
                >
                  <option value="">Select...</option>
                  {referralOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Primary Goal (Required) */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">
                  What's your primary financial goal?
                </label>
                <select
                  value={formData.primaryGoal}
                  onChange={(e) => handleChange('primaryGoal', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-green/20 outline-none transition-all font-inter bg-white ${
                    errors.primaryGoal ? 'border-red-500' : 'border-slate-300 focus:border-brand-green'
                  }`}
                  disabled={loading}
                >
                  <option value="">Select your main goal...</option>
                  {goalOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.primaryGoal && (
                  <p className="mt-1 text-sm text-red-600 font-inter">{errors.primaryGoal}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!isFormValid || loading}
                className="w-full bg-brand-green hover:bg-brand-green/90 text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {loading ? 'Saving...' : 'Continue'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FirstTimeUserModal;

