import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  UserPlus,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Check,
  X,
  AlertCircle,
  Loader2,
  Sparkles,
  Apple
} from 'lucide-react';
import { toast } from 'sonner';

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  bgColor: string;
}

const Signup = () => {
  const { signUp, signInWithGoogle, signInWithApple } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
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

  // Validate email format
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

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

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service and Privacy Policy';
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
      const { error } = await signUp({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        avatarType: 'david' // Default avatar
      });

      if (error) {
        if (error.message.includes('already registered')) {
          setErrors({ email: 'This email is already registered' });
          toast.error('This email is already registered');
        } else {
          toast.error(error.message || 'Failed to create account');
        }
        return;
      }

      // Success - redirect to login with message
      navigate('/login', {
        state: {
          message: 'Account created successfully! Please check your email to verify your account.'
        }
      });
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast.error(error.message || 'Failed to sign in with Google');
        return;
      }
      // Success - redirect to onboarding
      navigate('/onboarding');
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Google sign-in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await signInWithApple();
      if (error) {
        toast.error(error.message || 'Failed to sign in with Apple');
        return;
      }
      // Success - redirect to onboarding
      navigate('/onboarding');
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Apple sign-in error:', error);
    } finally {
      setLoading(false);
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
          <h1 className="text-4xl font-bold text-white mb-2 font-poppins">Create Your Account</h1>
          <p className="text-white/80 font-inter">Start your journey to financial freedom</p>
        </div>

        {/* Signup Card */}
        <Card className="p-8 rounded-3xl shadow-2xl border-0">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Social Login Buttons */}
            <div className="space-y-3">
              {/* Google Sign-In */}
              <Button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                variant="outline"
                className="w-full py-6 rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all font-inter font-semibold text-slate-700"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              {/* Apple Sign-In */}
              <Button
                type="button"
                onClick={handleAppleSignIn}
                disabled={loading}
                variant="outline"
                className="w-full py-6 rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all font-inter font-semibold text-slate-700"
              >
                <Apple className="w-5 h-5 mr-3" />
                Continue with Apple
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500 font-inter">Or continue with email</span>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none transition-all font-inter ${
                    errors.fullName ? 'border-red-500' : 'border-slate-200 focus:border-brand-green'
                  }`}
                  placeholder="John Doe"
                  disabled={loading}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1 font-inter">
                  <AlertCircle className="w-4 h-4" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none transition-all font-inter ${
                    errors.email ? 'border-red-500' : 'border-slate-200 focus:border-brand-green'
                  }`}
                  placeholder="john@example.com"
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1 font-inter">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">
                Password
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
                    <Badge className={`${passwordStrength.color} bg-transparent border-0`}>
                      {passwordStrength.label}
                    </Badge>
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
                Confirm Password
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

            {/* Terms Checkbox */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
                  className="w-5 h-5 mt-0.5 rounded border-2 border-slate-300 text-brand-green focus:ring-2 focus:ring-brand-green/20"
                  disabled={loading}
                />
                <span className="text-sm text-slate-600 font-inter">
                  I agree to the{' '}
                  <Link to="/terms" className="text-brand-blue hover:underline font-semibold">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-brand-blue hover:underline font-semibold">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1 font-inter">
                  <AlertCircle className="w-4 h-4" />
                  {errors.agreeToTerms}
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
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5 mr-2" />
                  Create Account
                </>
              )}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600 font-inter">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-blue hover:underline font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </Card>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-1 gap-3">
          {[
            'Free credit score monitoring',
            'Personalized financial guidance',
            'Debt payoff calculators'
          ].map((benefit, index) => (
            <div key={index} className="flex items-center gap-3 text-white font-inter">
              <Sparkles className="w-5 h-5 text-brand-yellow" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Signup;
