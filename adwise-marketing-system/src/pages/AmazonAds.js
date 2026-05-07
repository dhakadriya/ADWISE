import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AnimatedStatCard from '../components/AnimatedStatCard';
import GlassCard from '../components/GlassCard';
import { Package, TrendingUp, DollarSign, Eye, MousePointer, Target, ExternalLink } from 'lucide-react';
import api from '../services/api';
import { containerVariants, itemVariants, chartVariants } from '../utils/animations';

const AmazonAds = () => {
  const [amazonData, setAmazonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [darkMode] = useState(true);

  useEffect(() => {
    fetchAmazonData();
  }, []);

  const fetchAmazonData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/analytics/amazon');
      const data = await response.json();
      setAmazonData(data);
    } catch (err) {
      setError(err.message || 'Failed to load Amazon Ads data');
    } finally {
      setLoading(false);
    }
  };

  // Weekly performance data
  const weeklyData = [
    { week: 'Week 1', impressions: 95000, clicks: 2100, conversions: 145, acos: 31.2 },
    { week: 'Week 2', impressions: 102000, clicks: 2350, conversions: 168, acos: 29.8 },
    { week: 'Week 3', impressions: 98500, clicks: 2280, conversions: 152, acos: 33.5 },
    { week: 'Week 4', impressions: 77500, clicks: 1770, conversions: 125, acos: 32.1 },
  ];

  if (loading) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-dark-950 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading Amazon Ads data...</p>
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        
        {/* Content */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10 p-6 space-y-6"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
                  Amazon Ads Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Real-time Amazon Advertising campaign performance
                </p>
              </div>
              <a
                href={amazonData?.service_info?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                <Package className="w-5 h-5" />
                View Service
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Service Info Banner */}
            <GlassCard className="p-4 bg-gradient-to-r from-orange-500/10 to-blue-500/10 border-orange-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {amazonData?.service_info?.provider} - {amazonData?.service_info?.package}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Monthly Package Cost: ₹{amazonData?.service_info?.cost?.toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  {amazonData?.service_info?.features?.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="px-2 py-1 text-xs bg-white dark:bg-dark-800 rounded-full text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            <AnimatedStatCard
              title="Total Campaigns"
              value={amazonData?.total_campaigns || 0}
              change="+3 this month"
              icon={Package}
              trend="up"
            />
            <AnimatedStatCard
              title="Total Conversions"
              value={amazonData?.total_conversions || 0}
              change="+18%"
              icon={Target}
              trend="up"
            />
            <AnimatedStatCard
              title="Total Impressions"
              value={amazonData?.total_impressions || 0}
              change="+12%"
              icon={Eye}
              trend="up"
            />
            <AnimatedStatCard
              title="Total Clicks"
              value={amazonData?.total_clicks || 0}
              change="+15%"
              icon={MousePointer}
              trend="up"
            />
          </motion.div>

          {/* Amazon Metrics */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            <GlassCard className="p-6 bg-white dark:bg-dark-800/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Average ACOS</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {amazonData?.average_acos?.toFixed(1)}%
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">Advertising Cost of Sales</p>
                </div>
                <div className="p-3 bg-orange-500/10 rounded-xl">
                  <DollarSign className="h-8 w-8 text-orange-500" />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 bg-white dark:bg-dark-800/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Average ROAS</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {amazonData?.average_roas?.toFixed(2)}x
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">Return on Ad Spend</p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-xl">
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 bg-white dark:bg-dark-800/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Average CTR</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {amazonData?.average_ctr?.toFixed(2)}%
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Click Through Rate</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <MousePointer className="h-8 w-8 text-blue-500" />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 bg-white dark:bg-dark-800/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Average CPC</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    ₹{amazonData?.average_cpc?.toFixed(2)}
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Cost Per Click</p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <DollarSign className="h-8 w-8 text-purple-500" />
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Charts Section */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <motion.div variants={chartVariants}>
              <GlassCard className="p-6 bg-white dark:bg-dark-800/50">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Weekly Performance Trend
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#f0f0f0'} />
                    <XAxis dataKey="week" stroke={darkMode ? '#94a3b8' : '#6b7280'} />
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
                    <Line type="monotone" dataKey="conversions" stroke="#ff9800" strokeWidth={2} name="Conversions" />
                    <Line type="monotone" dataKey="clicks" stroke="#2196f3" strokeWidth={2} name="Clicks" />
                  </LineChart>
                </ResponsiveContainer>
              </GlassCard>
            </motion.div>

            <motion.div variants={chartVariants}>
              <GlassCard className="p-6 bg-white dark:bg-dark-800/50">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Campaign Performance
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={amazonData?.campaigns || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#f0f0f0'} />
                    <XAxis dataKey="name" stroke={darkMode ? '#94a3b8' : '#6b7280'} hide />
                    <YAxis stroke={darkMode ? '#94a3b8' : '#6b7280'} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                        border: darkMode ? '1px solid #334155' : '1px solid #e5e7eb',
                        borderRadius: '8px',
                        color: darkMode ? '#ffffff' : '#000000'
                      }}
                    />
                    <Bar dataKey="conversions" fill="#ff9800" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </GlassCard>
            </motion.div>
          </motion.div>

          {/* Campaign Cards */}
          <motion.div variants={containerVariants}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Active Campaigns</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {amazonData?.campaigns?.map((campaign, index) => (
                <motion.div key={index} variants={itemVariants} whileHover={{ y: -5 }}>
                  <GlassCard className="p-6 bg-white dark:bg-dark-800/50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {campaign.name}
                        </h4>
                        <span className="px-3 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full">
                          {campaign.status}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Budget:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">₹{campaign.budget?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Conversions:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{campaign.conversions}</span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AmazonAds;
