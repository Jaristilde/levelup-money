import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Lock, Eye, EyeOff, AlertCircle, Loader2, Check, X } from 'lucide-react';
import { toast } from 'sonner';

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  bgColor: string;
}

const ResetPassword = () => {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Password strength calculation
  const calculatePasswordStrength = (password: string): PasswordStrength => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 2) return { score, label: 'Weak', color: 'text-red-600', bgColor: 'bg-red-600' };
    if (score <= 3) return { score, label: 'Fair', color: 'text-orange-600', bgColor: 'bg-orange-600' };
    if (score <= 4) return { score, label: 'Good', color: 'text-yellow-600', bgColor: 'bg-yellow-600' };
    return { score, label: 'Strong', color: 'text-brand-green', bgColor: 'bg-brand-green' };
  };

  const passwordStrength = formData.password ? calculatePasswordStrength(formData.password) : null;

  // Validation checks
  const passwordRequirements = [
    { label: 'At least 8 characters', met: formData.password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(formData.password) },
    { label: 'Contains number', met: /\d/.test(formData.password) },
    { label: 'Contains special character', met: /[^a-zA-Z0-9]/.test(formData.password) }
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!passwordRequirements.every(req => req.met)) {
      newErrors.password = 'Password does not meet all requirements';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);

    try {
      const { error } = await updatePassword(formData.password);

      if (error) {
        if (error.message.includes('token')) {
          toast.error('Reset link expired. Please request a new one.');
          setTimeout(() => navigate('/forgot-password'), 2000);
        } else {
          toast.error(error.message || 'Failed to reset password');
        }
        return;
      }

      toast.success('Password reset successfully!');
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Password reset error:', error);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue via-brand-blue/90 to-brand-green flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link to="/landing" className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl">
              <span className="text-brand-green font-bold text-2xl font-poppins">LU</span>
            </div>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2 font-poppins">Reset Password</h1>
          <p className="text-white/80 font-inter">Choose a new password for your account</p>
        </div>

        {/* Reset Password Card */}
        <Card className="p-8 rounded-3xl shadow-2xl border-0">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none transition-all font-inter ${
                    errors.password ? 'border-red-500' : 'border-slate-200 focus:border-brand-green'
                  }`}
                  placeholder="••••••••"
                  disabled={loading}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && passwordStrength && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold font-inter">Password Strength</span>
                    <span className={`text-xs font-semibold ${passwordStrength.color} font-inter`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength.bgColor} transition-all duration-300`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-3 space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs font-inter">
                      {req.met ? (
                        <Check className="w-4 h-4 text-brand-green" />
                      ) : (
                        <X className="w-4 h-4 text-slate-400" />
                      )}
                      <span className={req.met ? 'text-brand-green' : 'text-slate-600'}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {errors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1 font-inter">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none transition-all font-inter ${
                    errors.confirmPassword ? 'border-red-500' : 'border-slate-200 focus:border-brand-green'
                  }`}
                  placeholder="••••••••"
                  disabled={loading}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1 font-inter">
                  <AlertCircle className="w-4 h-4" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-green hover:bg-brand-green/90 text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Resetting Password...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  Reset Password
                </>
              )}
            </Button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-brand-blue hover:underline font-semibold font-inter">
              Back to Sign In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
