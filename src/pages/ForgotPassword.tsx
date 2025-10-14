import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mail, AlertCircle, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const { error } = await resetPassword(email);

      if (error) {
        setError(error.message || 'Failed to send reset email');
        toast.error('Failed to send reset email. Please try again.');
        return;
      }

      setEmailSent(true);
    } catch (error) {
      setError('An unexpected error occurred');
      toast.error('An unexpected error occurred');
      console.error('Password reset error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-blue via-brand-blue/90 to-brand-green flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/landing" className="inline-flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-brand-green font-bold text-2xl font-poppins">LU</span>
              </div>
            </Link>
          </div>

          <Card className="p-8 rounded-3xl shadow-2xl border-0 text-center">
            <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-brand-green" />
            </div>

            <h1 className="text-2xl font-bold text-slate-900 mb-3 font-poppins">
              Check Your Email
            </h1>

            <p className="text-slate-600 mb-6 font-inter">
              We've sent a password reset link to <span className="font-semibold">{email}</span>.
              Click the link in the email to reset your password.
            </p>

            <div className="bg-blue-50 border-2 border-brand-blue/20 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm text-slate-700 font-inter">
                <strong className="font-semibold">Didn't receive the email?</strong>
                <br />
                • Check your spam folder
                <br />
                • Make sure the email address is correct
                <br />• The link expires in 1 hour
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => {
                  setEmailSent(false);
                  setEmail('');
                }}
                variant="outline"
                className="w-full border-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl py-6"
              >
                Send Again
              </Button>

              <Link to="/login">
                <Button
                  variant="ghost"
                  className="w-full text-brand-blue hover:bg-brand-blue/5 rounded-xl py-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Sign In
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

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
          <h1 className="text-4xl font-bold text-white mb-2 font-poppins">Forgot Password?</h1>
          <p className="text-white/80 font-inter">
            Enter your email and we'll send you a link to reset your password
          </p>
        </div>

        {/* Forgot Password Card */}
        <Card className="p-8 rounded-3xl shadow-2xl border-0">
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
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none transition-all font-inter ${
                    error ? 'border-red-500' : 'border-slate-200 focus:border-brand-green'
                  }`}
                  placeholder="john@example.com"
                  disabled={loading}
                  autoComplete="email"
                  autoFocus
                />
              </div>
              {error && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1 font-inter">
                  <AlertCircle className="w-4 h-4" />
                  {error}
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
                  Sending Reset Link...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5 mr-2" />
                  Send Reset Link
                </>
              )}
            </Button>
          </form>

          {/* Back to Login */}
          <div className="mt-6">
            <Link to="/login">
              <Button
                variant="ghost"
                className="w-full text-brand-blue hover:bg-brand-blue/5 rounded-xl py-3"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign In
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
