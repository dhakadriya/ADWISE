import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import StatCard from '../components/StatCard';
import Card from '../components/Card';
import { Megaphone, TrendingUp, DollarSign, Users } from 'lucide-react';
import api from '../services/api';
import { containerVariants, itemVariants, chartVariants } from '../utils/animations';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    { name: 'Google Ads', value: 35, color: '#0ea5e9' },
    { name: 'Facebook', value: 25, color: '#a855f7' },
    { name: 'Instagram', value: 20, color: '#ec4899' },
    { name: 'Email', value: 15, color: '#10b981' },
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
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome back! Here's what's happening with your campaigns.</p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={itemVariants} whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
          <StatCard
            title="Total Campaigns"
            value={dashboardData?.total_campaigns?.toString() || '0'}
            change="+12%"
            trend="up"
            icon={Megaphone}
          />
        </motion.div>
        <motion.div variants={itemVariants} whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
          <StatCard
            title="Total Conversions"
            value={dashboardData?.total_conversions?.toString() || '0'}
            change="+18%"
            trend="up"
            icon={TrendingUp}
          />
        </motion.div>
        <motion.div variants={itemVariants} whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
          <StatCard
            title="Revenue Generated"
            value={`$${dashboardData?.total_revenue?.toFixed(2) || '0.00'}`}
            change="+23%"
            trend="up"
            icon={DollarSign}
          />
        </motion.div>
        <motion.div variants={itemVariants} whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
          <StatCard
            title="CAC"
            value={`$${dashboardData?.customer_acquisition_cost?.toFixed(2) || '0.00'}`}
            change="-8%"
            trend="up"
            icon={Users}
          />
        </motion.div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <motion.div variants={chartVariants} whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2} />
                <Line type="monotone" dataKey="conversions" stroke="#a855f7" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div variants={chartVariants} whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Channel Contribution</h3>
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
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div variants={chartVariants} whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300 }}>
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaignData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="conversions" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
