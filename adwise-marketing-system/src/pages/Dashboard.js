import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import AnimatedStatCard from '../components/AnimatedStatCard';
import GlassCard from '../components/GlassCard';
import { Megaphone, TrendingUp, DollarSign, Users, Moon, Sun } from 'lucide-react';
import api from '../services/api';
import { containerVariants, itemVariants, chartVariants } from '../utils/animations';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await api.analytics.getDashboard();
      setDashboardData(data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Mock data for charts
  const performanceData = [
    { month: 'Jan', revenue: 4000, conversions: 240 },
    { month: 'Feb', revenue: 3000, conversions: 198 },
    { month: 'Mar', revenue: 5000, conversions: 320 },
    { month: 'Apr', revenue: 4500, conversions: 280 },
    { month: 'May', revenue: 6000, conversions: 390 },
    { month: 'Jun', revenue: 7500, conversions: 450 },
  ];

  const channelData = [
    { name: 'Google Ads', value: 35, color: '#6366f1' },
    { name: 'Facebook', value: 25, color: '#a855f7' },
    { name: 'Instagram', value: 20, color: '#ec4899' },
    { name: 'Email', value: 15, color: '#22c55e' },
    { name: 'Organic', value: 5, color: '#f59e0b' },
  ];

  const campaignData = [
    { name: 'Summer Sale', conversions: 450 },
    { name: 'Product Launch', conversions: 380 },
    { name: 'Holiday Special', conversions: 320 },
    { name: 'Brand Awareness', conversions: 280 },
  ];

  if (loading) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-dark-950 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-dark-950 p-6">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-dark-950 transition-colors duration-300">
        {/* Background effects */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        </div>
        
        {/* Content */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10 p-6 space-y-6"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome back! Here's your marketing performance overview.
              </p>
            </div>
            
            {/* Dark mode toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl hover:shadow-lg transition-all"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </motion.button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            <AnimatedStatCard
              title="Total Campaigns"
              value={dashboardData?.total_campaigns || 0}
              change="+12%"
              icon={Megaphone}
              trend="up"
            />
            <AnimatedStatCard
              title="Total Conversions"
              value={dashboardData?.total_conversions || 0}
              change="+18%"
              icon={TrendingUp}
              trend="up"
            />
            <AnimatedStatCard
              title="Revenue Generated"
              value={dashboardData?.total_revenue || 0}
              change="+23%"
              icon={DollarSign}
              trend="up"
              prefix="$"
            />
            <AnimatedStatCard
              title="CAC"
              value={dashboardData?.customer_acquisition_cost || 0}
              change="-8%"
              icon={Users}
              trend="up"
              prefix="$"
            />
          </motion.div>

          {/* Charts Section */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <motion.div variants={chartVariants}>
              <GlassCard className="p-6 bg-white dark:bg-dark-800/50">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Performance Over Time
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#f0f0f0'} />
                    <XAxis dataKey="month" stroke={darkMode ? '#94a3b8' : '#6b7280'} />
                    <YAxis stroke={darkMode ? '#94a3b8' : '#6b7280'} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                        border: darkMode ? '1px solid #334155' : '1px solid #e5e7eb',
                        borderRadius: '8px',
                        color: darkMode ? '#ffffff' : '#000000'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} />
                    <Line type="monotone" dataKey="conversions" stroke="#22c55e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </GlassCard>
            </motion.div>

            <motion.div variants={chartVariants}>
              <GlassCard className="p-6 bg-white dark:bg-dark-800/50">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Channel Contribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {channelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                        border: darkMode ? '1px solid #334155' : '1px solid #e5e7eb',
                        borderRadius: '8px',
                        color: darkMode ? '#ffffff' : '#000000'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </GlassCard>
            </motion.div>
          </motion.div>

          {/* Campaign Comparison */}
          <motion.div variants={chartVariants}>
            <GlassCard className="p-6 bg-white dark:bg-dark-800/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Campaign Comparison
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={campaignData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#f0f0f0'} />
                  <XAxis dataKey="name" stroke={darkMode ? '#94a3b8' : '#6b7280'} />
                  <YAxis stroke={darkMode ? '#94a3b8' : '#6b7280'} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                      border: darkMode ? '1px solid #334155' : '1px solid #e5e7eb',
                      borderRadius: '8px',
                      color: darkMode ? '#ffffff' : '#000000'
                    }}
                  />
                  <Bar dataKey="conversions" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
