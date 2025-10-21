import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const MobileHeader = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 px-4 flex items-center justify-between">
      {/* Logout Button - Top Left */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 py-2 text-slate-900 hover:bg-slate-100 rounded-lg transition-all font-medium text-sm"
        style={{ fontWeight: 600, color: '#1F2937' }}
      >
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </button>

      {/* Logo - Center */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
        <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-base font-poppins">LU</span>
        </div>
        <span 
          className="text-base font-semibold font-poppins mobile-brand-text"
          style={{ color: '#1F2937', fontWeight: 600 }}
        >
          LevelUp Money
        </span>
      </div>

      {/* Empty div for balance */}
      <div className="w-20"></div>
    </div>
  );
};

export default MobileHeader;

