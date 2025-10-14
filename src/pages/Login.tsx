import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  LogIn,
  Eye,
  EyeOff,
  Mail,
  Lock,
  AlertCircle,
  Loader2,
  CheckCircle,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';

interface LocationState {
  message?: string;
  from?: string;
}

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Rate limiting state
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(0);

  const MAX_ATTEMPTS = 5;
  const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

  // Show success message if coming from signup
  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
    }
  }, [state]);

  // Check for existing lockout
  useEffect(() => {
    const storedLockout = localStorage.getItem('loginLockout');
    if (storedLockout) {
      const lockoutTime = parseInt(storedLockout);
      if (Date.now() < lockoutTime) {
        setLockoutUntil(lockoutTime);
      } else {
        localStorage.removeItem('loginLockout');
        localStorage.removeItem('loginAttempts');
      }
    }

    const storedAttempts = localStorage.getItem('loginAttempts');
    if (storedAttempts) {
      setLoginAttempts(parseInt(storedAttempts));
    }
  }, []);

  // Update remaining lockout time
  useEffect(() => {
    if (lockoutUntil) {
      const interval = setInterval(() => {
        const remaining = lockoutUntil - Date.now();
        if (remaining <= 0) {
          setLockoutUntil(null);
          setLoginAttempts(0);
          localStorage.removeItem('loginLockout');
          localStorage.removeItem('loginAttempts');
          clearInterval(interval);
        } else {
          setRemainingTime(Math.ceil(remaining / 1000));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [lockoutUntil]);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if account is locked
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const minutes = Math.ceil(remainingTime / 60);
      toast.error(`Account locked. Try again in ${minutes} minute${minutes > 1 ? 's' : ''}.`);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { error } = await signIn({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe
      });

      if (error) {
        // Increment failed attempts
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        localStorage.setItem('loginAttempts', newAttempts.toString());

        // Check if should lock account
        if (newAttempts >= MAX_ATTEMPTS) {
          const lockoutTime = Date.now() + LOCKOUT_DURATION;
          setLockoutUntil(lockoutTime);
          localStorage.setItem('loginLockout', lockoutTime.toString());
          toast.error(`Too many failed attempts. Account locked for 15 minutes.`);
        } else {
          const remainingAttempts = MAX_ATTEMPTS - newAttempts;
          setErrors({ password: 'Invalid email or password' });
          toast.error(`Invalid email or password. ${remainingAttempts} attempt${remainingAttempts > 1 ? 's' : ''} remaining.`);
        }
        return;
      }

      // Success - reset attempts and redirect
      setLoginAttempts(0);
      localStorage.removeItem('loginAttempts');
      localStorage.removeItem('loginLockout');

      const redirectTo = state?.from || '/';
      navigate(redirectTo);
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
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
          <h1 className="text-4xl font-bold text-white mb-2 font-poppins">Welcome Back</h1>
          <p className="text-white/80 font-inter">Sign in to continue your financial journey</p>
        </div>

        {/* Login Card */}
        <Card className="p-8 rounded-3xl shadow-2xl border-0">
          {/* Lockout Warning */}
          {lockoutUntil && Date.now() < lockoutUntil && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-900 font-poppins">Account Temporarily Locked</p>
                  <p className="text-xs text-red-700 mt-1 font-inter">
                    Too many failed login attempts. Try again in {formatTime(remainingTime)}.
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  disabled={loading || (lockoutUntil !== null && Date.now() < lockoutUntil)}
                  autoComplete="email"
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
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-700 font-inter">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-brand-blue hover:underline font-semibold font-inter"
                >
                  Forgot Password?
                </Link>
              </div>
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
                  disabled={loading || (lockoutUntil !== null && Date.now() < lockoutUntil)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1 font-inter">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => handleChange('rememberMe', e.target.checked)}
                  className="w-4 h-4 rounded border-2 border-slate-300 text-brand-green focus:ring-2 focus:ring-brand-green/20"
                  disabled={loading}
                />
                <span className="text-sm text-slate-600 font-inter">Remember me</span>
              </label>

              {loginAttempts > 0 && loginAttempts < MAX_ATTEMPTS && (
                <Badge className="bg-orange-100 text-orange-700 border-0">
                  {MAX_ATTEMPTS - loginAttempts} attempts left
                </Badge>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || (lockoutUntil !== null && Date.now() < lockoutUntil)}
              className="w-full bg-brand-green hover:bg-brand-green/90 text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600 font-inter">
              Don't have an account?{' '}
              <Link to="/signup" className="text-brand-blue hover:underline font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-white font-poppins">Secure Login</p>
              <p className="text-xs text-white/80 mt-1 font-inter">
                Your data is encrypted and protected. We'll never share your information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
