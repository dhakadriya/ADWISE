import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import PremiumButton from '../components/PremiumButton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { containerVariants, itemVariants } from '../utils/animations';

const Analytics = () => {
  const [selectedModel, setSelectedModel] = useState('multi-touch');
  const [darkMode] = useState(true);

  const attributionData = [
    { channel: 'Google Ads', firstClick: 35, lastClick: 28, multiTouch: 32 },
    { channel: 'Facebook', firstClick: 25, lastClick: 30, multiTouch: 27 },
    { channel: 'Instagram', firstClick: 20, lastClick: 18, multiTouch: 19 },
    { channel: 'Email', firstClick: 15, lastClick: 20, multiTouch: 17 },
    { channel: 'Organic', firstClick: 5, lastClick: 4, multiTouch: 5 },
  ];

  const channelMetrics = [
    { channel: 'Google Ads', contribution: 32, revenue: '$14,474', conversions: 456, roi: '285%' },
    { channel: 'Facebook', contribution: 27, revenue: '$12,212', conversions: 385, roi: '245%' },
    { channel: 'Instagram', contribution: 19, revenue: '$8,594', conversions: 271, roi: '198%' },
    { channel: 'Email', contribution: 17, revenue: '$7,689', conversions: 243, roi: '412%' },
    { channel: 'Organic', contribution: 5, revenue: '$2,262', conversions: 73, roi: 'N/A' },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Analytics & Attribution</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Understand which channels drive the most value</p>
      </motion.div>

      <motion.div variants={itemVariants} className="flex space-x-4">
        <PremiumButton
          onClick={() => setSelectedModel('first-click')}
          variant={selectedModel === 'first-click' ? 'primary' : 'ghost'}
          size="sm"
        >
          First Click
        </PremiumButton>
        <PremiumButton
          onClick={() => setSelectedModel('last-click')}
          variant={selectedModel === 'last-click' ? 'primary' : 'ghost'}
          size="sm"
        >
          Last Click
        </PremiumButton>
        <PremiumButton
          onClick={() => setSelectedModel('multi-touch')}
          variant={selectedModel === 'multi-touch' ? 'primary' : 'ghost'}
          size="sm"
        >
          Multi-Touch
        </PremiumButton>
      </motion.div>

      <motion.div variants={itemVariants}>
        <GlassCard className="p-6 bg-white dark:bg-dark-800/50">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Attribution Model Comparison</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={attributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#f0f0f0'} />
              <XAxis dataKey="channel" stroke={darkMode ? '#94a3b8' : '#6b7280'} />
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
              <Bar dataKey="firstClick" fill="#6366f1" name="First Click" radius={[8, 8, 0, 0]} />
              <Bar dataKey="lastClick" fill="#a855f7" name="Last Click" radius={[8, 8, 0, 0]} />
              <Bar dataKey="multiTouch" fill="#22c55e" name="Multi-Touch" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </motion.div>

      <motion.div variants={itemVariants}>
        <GlassCard className="bg-white dark:bg-dark-800/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Channel Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-700">
              <thead className="bg-gray-50 dark:bg-dark-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Channel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Contribution %
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Conversions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    ROI
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-dark-800/30 divide-y divide-gray-200 dark:divide-dark-700">
                {channelMetrics.map((metric, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{metric.channel}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 dark:bg-dark-700 rounded-full h-2 mr-2">
                          <div
                            className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
                            style={{ width: `${metric.contribution}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-900 dark:text-white">{metric.contribution}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-semibold">
                      {metric.revenue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {metric.conversions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                        {metric.roi}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;
