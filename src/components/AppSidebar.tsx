import { Link } from 'react-router-dom';
import { LayoutDashboard, Settings } from 'lucide-react';

const AppSidebar = () => {
  return (
    <aside 
      className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 z-50"
      aria-label="Main navigation"
    >
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">FW</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">FinWell</span>
        </div>
        
        {/* Navigation */}
        <nav className="space-y-2">
          <Link 
            to="/" 
            className="flex items-center gap-3 px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Home"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Home</span>
          </Link>
          
          <Link 
            to="/settings" 
            className="flex items-center gap-3 px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
