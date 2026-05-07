import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Megaphone,
  Link2,
  Users,
  BarChart3,
  Lightbulb,
  Shield,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  LogOut,
  Moon,
  Sun,
  Package,
} from 'lucide-react';
import api from '../services/api';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    api.auth.logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Campaigns', href: '/campaigns', icon: Megaphone },
    { name: 'Tracking Links', href: '/tracking-links', icon: Link2 },
    { name: 'Customer Journey', href: '/customer-journey', icon: Users },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'AI Insights', href: '/ai-insights', icon: Lightbulb },
    { name: 'Fraud Detection', href: '/fraud-detection', icon: Shield },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-dark-950 transition-colors duration-300">
        {/* Sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col z-30">
          <div className="flex flex-col flex-grow pt-5 bg-white dark:bg-dark-900 border-r border-gray-200 dark:border-dark-700 overflow-y-auto backdrop-blur-xl">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 px-6 mb-8">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="flex items-center"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-glow">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <span className="ml-3 text-xl font-display font-bold text-gray-900 dark:text-white">Adwise</span>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex-grow flex flex-col px-3">
              <nav className="flex-1 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link key={item.name} to={item.href}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/50'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800'
                        }`}
                      >
                        <item.icon
                          className={`mr-3 flex-shrink-0 h-5 w-5 ${
                            isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                          }`}
                        />
                        {item.name}
                      </motion.div>
                    </Link>
                  );
                })}
              </nav>

              {/* Dark Mode Toggle */}
              <div className="mt-6 mb-4 px-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDarkMode(!darkMode)}
                  className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium rounded-xl bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700 transition-all"
                >
                  <span className="flex items-center">
                    {darkMode ? (
                      <Sun className="h-5 w-5 mr-3 text-yellow-500" />
                    ) : (
                      <Moon className="h-5 w-5 mr-3 text-gray-600" />
                    )}
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-gray-900/50 dark:bg-black/70 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", damping: 25 }}
                className="fixed inset-y-0 left-0 flex flex-col max-w-xs w-full bg-white dark:bg-dark-900 z-50 md:hidden"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full bg-dark-800 hover:bg-dark-700 transition-colors"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                </div>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-6 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-glow">
                      <span className="text-white font-bold text-xl">A</span>
                    </div>
                    <span className="ml-3 text-xl font-display font-bold text-gray-900 dark:text-white">Adwise</span>
                  </div>
                  <nav className="px-3 space-y-1">
                    {navigation.map((item) => {
                      const isActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all ${
                            isActive
                              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800'
                          }`}
                        >
                          <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500'}`} />
                          {item.name}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className="md:pl-64 flex flex-col flex-1">
          {/* Top navigation */}
          <div className="sticky top-0 z-20 flex-shrink-0 flex h-16 bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-dark-700">
            <button
              className="px-4 border-r border-gray-200 dark:border-dark-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-1 px-4 flex justify-between items-center">
              <div className="flex-1 flex max-w-2xl">
                <div className="relative w-full text-gray-400 dark:text-gray-500 focus-within:text-gray-600 dark:focus-within:text-gray-300">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-3">
                    <Search className="h-5 w-5" />
                  </div>
                  <input
                    className="block w-full h-full pl-10 pr-3 py-2 border-transparent bg-gray-100 dark:bg-dark-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white dark:focus:bg-dark-700 transition-all sm:text-sm"
                    placeholder="Search..."
                    type="search"
                  />
                </div>
              </div>
              <div className="ml-4 flex items-center md:ml-6 space-x-2">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800 transition-all relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-gray-400 dark:text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center ml-2"
                >
                  <img
                    className="h-8 w-8 rounded-full ring-2 ring-primary-500 dark:ring-primary-400"
                    src="https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff"
                    alt="User"
                  />
                </motion.button>
              </div>
            </div>
          </div>

          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
