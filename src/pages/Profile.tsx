import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  User,
  Mail,
  Lock,
  Calendar,
  Shield,
  Save,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  Camera,
  UserCircle
} from 'lucide-react';

const Profile = () => {
  const { user, profile, updateProfile, updatePassword } = useAuth();

  // Profile edit state
  const [profileData, setProfileData] = useState({
    full_name: '',
    email: '',
    avatar_type: 'david' as 'kevin' | 'jess' | 'david' | 'maria' | 'ben'
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const avatarTypes = [
    { value: 'kevin', label: 'Kevin - Getting Started', desc: 'New to financial management' },
    { value: 'jess', label: 'Jess - Debt Fighter', desc: 'Focused on debt reduction' },
    { value: 'david', label: 'David - Comprehensive Planner', desc: 'Detailed financial tracking' },
    { value: 'maria', label: 'Maria - Optimizer', desc: 'Efficiency focused' },
    { value: 'ben', label: 'Ben - Advanced Investor', desc: 'Investment tracking' }
  ];

  useEffect(() => {
    if (profile) {
      setProfileData({
        full_name: profile.full_name,
        email: profile.email,
        avatar_type: profile.avatar_type
      });
    }
  }, [profile]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingProfile(true);

    try {
      const { error } = await updateProfile({
        full_name: profileData.full_name,
        avatar_type: profileData.avatar_type
      });

      if (error) {
        toast.error('Failed to update profile');
        return;
      }

      // Update awareness level in localStorage if avatar type changed
      if (profileData.avatar_type !== profile?.avatar_type) {
        const awarenessMap = {
          'kevin': 'unaware',
          'jess': 'problem-aware',
          'david': 'solution-aware',
          'maria': 'product-aware',
          'ben': 'most-aware'
        };
        localStorage.setItem('awarenessLevel', awarenessMap[profileData.avatar_type]);
        toast.success('Dashboard updated! Refresh to see changes.');
      }
    } finally {
      setLoadingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate
    const newErrors: Record<string, string> = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoadingPassword(true);

    try {
      // In a real app, you'd verify current password first
      const { error } = await updatePassword(passwordData.newPassword);

      if (error) {
        toast.error('Failed to update password');
        return;
      }

      // Clear form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } finally {
      setLoadingPassword(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 lg:pb-8">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Header */}
        <header className="mb-8">
          <nav className="text-sm text-slate-500 mb-2 font-inter" aria-label="Breadcrumb">
            Home &gt; Profile
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 font-poppins">
            Account Settings
          </h1>
          <p className="text-lg text-slate-600 font-inter">
            Manage your account information and preferences
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Info Card */}
          <Card className="p-6 rounded-3xl shadow-lg lg:col-span-1">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-brand-green to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <UserCircle className="w-16 h-16 text-white" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 font-poppins mb-1">
                {profile?.full_name || 'User'}
              </h3>

              <p className="text-sm text-slate-600 font-inter mb-4">
                {profile?.email}
              </p>

              <Badge className={`${profile?.email_verified ? 'bg-brand-green' : 'bg-orange-500'} text-white border-0 mb-6`}>
                <Shield className="w-3 h-3 mr-1" />
                {profile?.email_verified ? 'Verified' : 'Unverified'}
              </Badge>

              <div className="bg-slate-50 rounded-xl p-4 text-left">
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-2 font-inter">
                  <Calendar className="w-4 h-4" />
                  <span>Member since</span>
                </div>
                <p className="text-sm font-semibold text-slate-900 font-poppins">
                  {profile?.created_at ? formatDate(profile.created_at) : 'N/A'}
                </p>
              </div>
            </div>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <Card className="p-6 rounded-3xl shadow-lg">
              <h2 className="text-xl font-bold text-slate-900 mb-6 font-poppins flex items-center gap-2">
                <User className="w-5 h-5 text-brand-green" />
                Profile Information
              </h2>

              <form onSubmit={handleProfileSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.full_name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, full_name: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all font-inter"
                    disabled={loadingProfile}
                  />
                </div>

                {/* Email (read-only) */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={profileData.email}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50 text-slate-500 font-inter cursor-not-allowed"
                      disabled
                    />
                    <p className="mt-1 text-xs text-slate-500 font-inter">
                      Email cannot be changed. Contact support if you need to update it.
                    </p>
                  </div>
                </div>

                {/* Dashboard Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">
                    Dashboard Type
                  </label>
                  <select
                    value={profileData.avatar_type}
                    onChange={(e) => setProfileData(prev => ({ ...prev, avatar_type: e.target.value as any }))}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all font-inter bg-white"
                    disabled={loadingProfile}
                  >
                    {avatarTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label} - {type.desc}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-slate-600 font-inter">
                    Changes your dashboard layout and features to match your financial journey
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={loadingProfile}
                  className="w-full bg-brand-green hover:bg-brand-green/90 text-white py-3 rounded-xl shadow-lg font-semibold"
                >
                  {loadingProfile ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </form>
            </Card>

            {/* Change Password */}
            <Card className="p-6 rounded-3xl shadow-lg">
              <h2 className="text-xl font-bold text-slate-900 mb-6 font-poppins flex items-center gap-2">
                <Lock className="w-5 h-5 text-brand-green" />
                Change Password
              </h2>

              <form onSubmit={handlePasswordSubmit} className="space-y-5">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) => {
                        setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }));
                        setErrors(prev => ({ ...prev, currentPassword: '' }));
                      }}
                      className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none transition-all font-inter ${
                        errors.currentPassword ? 'border-red-500' : 'border-slate-200 focus:border-brand-green'
                      }`}
                      placeholder="••••••••"
                      disabled={loadingPassword}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1 font-inter">
                      <AlertCircle className="w-4 h-4" />
                      {errors.currentPassword}
                    </p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) => {
                        setPasswordData(prev => ({ ...prev, newPassword: e.target.value }));
                        setErrors(prev => ({ ...prev, newPassword: '' }));
                      }}
                      className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none transition-all font-inter ${
                        errors.newPassword ? 'border-red-500' : 'border-slate-200 focus:border-brand-green'
                      }`}
                      placeholder="••••••••"
                      disabled={loadingPassword}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1 font-inter">
                      <AlertCircle className="w-4 h-4" />
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={(e) => {
                        setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }));
                        setErrors(prev => ({ ...prev, confirmPassword: '' }));
                      }}
                      className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none transition-all font-inter ${
                        errors.confirmPassword ? 'border-red-500' : 'border-slate-200 focus:border-brand-green'
                      }`}
                      placeholder="••••••••"
                      disabled={loadingPassword}
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

                <Button
                  type="submit"
                  disabled={loadingPassword}
                  className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white py-3 rounded-xl shadow-lg font-semibold"
                >
                  {loadingPassword ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Update Password
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
