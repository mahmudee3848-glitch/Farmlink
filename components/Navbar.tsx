import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sprout, User, Tractor, ShoppingBasket, Activity, LogIn, LogOut } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  userName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentRole, setRole, isLoggedIn, onLogout, userName }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getNavLinks = () => {
    switch (currentRole) {
      case UserRole.FARMER:
        return [
          { name: 'My Farm', path: '/farmer', icon: Tractor },
          { name: 'Listings', path: '/farmer/listings', icon: Sprout },
        ];
      case UserRole.BUYER:
        return [
          { name: 'Marketplace', path: '/market', icon: ShoppingBasket },
          { name: 'My Orders', path: '/market/orders', icon: User },
        ];
      case UserRole.OPS:
        return [
          { name: 'Dashboard', path: '/ops', icon: Activity },
          { name: 'Logistics', path: '/ops/logistics', icon: Tractor },
        ];
      default:
        return [];
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-primary-600 p-1.5 rounded-lg">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">FarmLink</span>
            </Link>
            
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {getNavLinks().map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${
                    isActive(link.path)
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <link.icon className="h-4 w-4 mr-2" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                            {userName ? userName.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="hidden md:block">
                            <p className="text-sm font-medium text-gray-900">{userName}</p>
                            <p className="text-xs text-gray-500 capitalize">{currentRole.toLowerCase()}</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => {
                            onLogout();
                            navigate('/');
                        }}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                        title="Logout"
                    >
                        <LogOut className="h-5 w-5" />
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <Link to="/auth" className="text-gray-500 hover:text-gray-900 font-medium text-sm flex items-center">
                        <LogIn className="h-4 w-4 mr-1" /> Login
                    </Link>
                    <Link 
                        to="/auth" 
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 shadow-sm"
                    >
                        Sign Up
                    </Link>
                </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isLoggedIn && (
        <div className="sm:hidden flex justify-around border-t border-gray-200 bg-gray-50 py-2">
            {getNavLinks().map((link) => (
                <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center px-3 py-1 text-xs font-medium ${
                    isActive(link.path) ? 'text-primary-600' : 'text-gray-500'
                }`}
                >
                <link.icon className="h-5 w-5 mb-1" />
                {link.name}
                </Link>
            ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;