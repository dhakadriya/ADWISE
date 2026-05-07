import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import PremiumButton from '../components/PremiumButton';
import Modal from '../components/Modal';
import { Plus, Edit2, Trash2, Play, TrendingUp, DollarSign, Calendar, Eye, MousePointer, Target, BarChart2, Percent, Check } from 'lucide-react';
import api from '../services/api';
import { containerVariants, itemVariants } from '../utils/animations';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [darkMode] = useState(true);
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    budget: '',
    status: 'ACTIVE',
    start_date: '',
    end_date: '',
    conversions: 0
  });

  const availableChannels = [
    'Google Ads',
    'Facebook',
    'Instagram',
    'LinkedIn',
    'Email',
    'Amazon Ads',
    'Twitter',
    'TikTok',
    'YouTube',
    'Pinterest'
  ];

  const toggleChannel = (channel) => {
    setSelectedChannels(prev => 
      prev.includes(channel)
        ? prev.filter(c => c !== channel)
        : [...prev, channel]
    );
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const data = await api.campaigns.getAll();
      setCampaigns(data);
    } catch (err) {
      setError(err.message || 'Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedChannels.length === 0) {
      setError('Please select at least one channel');
      return;
    }
    
    try {
      const budget = parseFloat(formData.budget.replace(/[$,₹]/g, ''));
      
      // Create a campaign for each selected channel
      for (const channel of selectedChannels) {
        const campaignData = {
          ...formData,
          channel: channel,
          budget: budget,
        };
        
        await api.campaigns.create(campaignData);
      }
      
      await fetchCampaigns();
      setIsModalOpen(false);
      setSelectedChannels([]);
      setFormData({ name: '', budget: '', status: 'ACTIVE', start_date: '', end_date: '', conversions: 0 });
    } catch (err) {
      setError(err.message || 'Failed to create campaign');
    }
  };

  const deleteCampaign = async (id) => {
    if (!window.confirm('Are you sure you want to delete this campaign?')) {
      return;
    }
    
    try {
      await api.campaigns.delete(id);
      await fetchCampaigns();
    } catch (err) {
      setError(err.message || 'Failed to delete campaign');
    }
  };

  const viewDetails = (campaign) => {
    setSelectedCampaign(campaign);
  };

  if (loading) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-dark-950 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading campaigns...</p>
          </div>
        </div>
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
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
        >
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </motion.div>
      )}
      
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Campaign Management</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Create and manage your marketing campaigns with detailed metrics</p>
        </div>
        <PremiumButton
          onClick={() => setIsModalOpen(true)}
          variant="primary"
          size="md"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Campaign
        </PremiumButton>
      </motion.div>

      {/* Stats Overview */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6 bg-white dark:bg-dark-800/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Campaigns</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{campaigns.length}</p>
            </div>
            <div className="p-3 bg-primary-500/10 rounded-xl">
              <TrendingUp className="h-8 w-8 text-primary-500" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 bg-white dark:bg-dark-800/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Budget</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                ₹{campaigns.reduce((sum, c) => sum + (c.budget || 0), 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-accent-500/10 rounded-xl">
              <DollarSign className="h-8 w-8 text-accent-500" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 bg-white dark:bg-dark-800/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                ₹{campaigns.reduce((sum, c) => sum + (c.revenue || 0), 0).toLocaleString(undefined, {maximumFractionDigits: 0})}
              </p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-xl">
              <BarChart2 className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 bg-white dark:bg-dark-800/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Campaigns</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {campaigns.filter(c => c.status === 'ACTIVE').length}
              </p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-xl">
              <Play className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Campaigns Grid */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 gap-6">
        {campaigns.length === 0 ? (
          <GlassCard className="col-span-full p-12 bg-white dark:bg-dark-800/50 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No campaigns yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Create your first campaign to get started!</p>
              <PremiumButton onClick={() => setIsModalOpen(true)} variant="primary">
                Create Campaign
              </PremiumButton>
            </div>
          </GlassCard>
        ) : (
          campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -2 }}
            >
              <GlassCard className="p-6 bg-white dark:bg-dark-800/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{campaign.name}</h3>
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          campaign.status === 'ACTIVE'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                        }`}
                      >
                        {campaign.status}
                      </span>
                      <span className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full">
                        {campaign.channel}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => viewDetails(campaign)}
                      className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteCampaign(campaign.id)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                  <div className="bg-gray-50 dark:bg-dark-900/50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">Budget</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">₹{campaign.budget?.toLocaleString()}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-dark-900/50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="h-4 w-4 text-green-500" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">Conversions</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{campaign.conversions || 0}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-dark-900/50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Eye className="h-4 w-4 text-blue-500" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">Impressions</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{campaign.impressions?.toLocaleString() || 0}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-dark-900/50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <MousePointer className="h-4 w-4 text-purple-500" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">Clicks</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{campaign.clicks?.toLocaleString() || 0}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-dark-900/50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Percent className="h-4 w-4 text-orange-500" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">CTR</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{campaign.ctr?.toFixed(2) || 0}%</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-dark-900/50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">ROI</p>
                    </div>
                    <p className={`text-lg font-bold ${campaign.roi >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {campaign.roi?.toFixed(1) || 0}%
                    </p>
                  </div>
                </div>

                {/* Additional Metrics Row */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                  <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">CPC</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">₹{campaign.cpc?.toFixed(2) || 0}</p>
                  </div>

                  <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">ROAS</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{campaign.roas?.toFixed(2) || 0}x</p>
                  </div>

                  <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">CPA</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">₹{campaign.cpa?.toFixed(2) || 0}</p>
                  </div>

                  <div className="text-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Conv. Rate</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{campaign.conversion_rate?.toFixed(2) || 0}%</p>
                  </div>

                  <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Revenue</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">₹{campaign.revenue?.toLocaleString(undefined, {maximumFractionDigits: 0}) || 0}</p>
                  </div>
                </div>

                {/* Date Range */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-dark-700">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Start: {new Date(campaign.start_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>End: {new Date(campaign.end_date).toLocaleDateString()}</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Create Campaign Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Campaign">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Campaign Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter campaign name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Channels (Multiple)
            </label>
            <div className="border border-gray-300 dark:border-dark-600 rounded-lg p-3 bg-white dark:bg-dark-700 max-h-48 overflow-y-auto">
              <div className="space-y-2">
                {availableChannels.map((channel) => (
                  <label
                    key={channel}
                    className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-dark-600 rounded-lg cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedChannels.includes(channel)}
                      onChange={() => toggleChannel(channel)}
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="ml-3 text-sm text-gray-900 dark:text-white">{channel}</span>
                  </label>
                ))}
              </div>
            </div>
            {selectedChannels.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedChannels.map((channel) => (
                  <span
                    key={channel}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-400"
                  >
                    {channel}
                    <button
                      type="button"
                      onClick={() => toggleChannel(channel)}
                      className="ml-2 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {selectedChannels.length === 0 
                ? 'Select at least one channel' 
                : `${selectedChannels.length} channel${selectedChannels.length > 1 ? 's' : ''} selected - Will create ${selectedChannels.length} campaign${selectedChannels.length > 1 ? 's' : ''}`
              }
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Budget per Channel (₹)</label>
            <input
              type="text"
              required
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="5000"
            />
            {selectedChannels.length > 0 && formData.budget && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Total budget: ₹{(parseFloat(formData.budget.replace(/[^0-9.]/g, '')) * selectedChannels.length).toLocaleString()}
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
              <input
                type="date"
                required
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Date</label>
              <input
                type="date"
                required
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <PremiumButton
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setSelectedChannels([]);
              }}
              variant="ghost"
            >
              Cancel
            </PremiumButton>
            <PremiumButton type="submit" variant="primary">
              Create {selectedChannels.length > 0 ? `${selectedChannels.length} Campaign${selectedChannels.length > 1 ? 's' : ''}` : 'Campaign'}
            </PremiumButton>
          </div>
        </form>
      </Modal>

      {/* Campaign Details Modal */}
      {selectedCampaign && (
        <Modal isOpen={!!selectedCampaign} onClose={() => setSelectedCampaign(null)} title="Campaign Details">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{selectedCampaign.name}</h3>
              <div className="flex gap-2">
                <span className={`px-3 py-1 text-xs rounded-full ${
                  selectedCampaign.status === 'ACTIVE'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                    : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                }`}>
                  {selectedCampaign.status}
                </span>
                <span className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full">
                  {selectedCampaign.channel}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-dark-900/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Budget</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{selectedCampaign.budget?.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-dark-900/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">₹{selectedCampaign.revenue?.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-dark-900/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">ROI</p>
                <p className={`text-2xl font-bold ${selectedCampaign.roi >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {selectedCampaign.roi?.toFixed(1)}%
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-dark-900/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">ROAS</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCampaign.roas?.toFixed(2)}x</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400">Impressions</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedCampaign.impressions?.toLocaleString()}</p>
              </div>
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400">Clicks</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedCampaign.clicks?.toLocaleString()}</p>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400">Conversions</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedCampaign.conversions}</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 dark:bg-dark-900/50 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400">CTR</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedCampaign.ctr?.toFixed(2)}%</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-dark-900/50 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400">CPC</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">₹{selectedCampaign.cpc?.toFixed(2)}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-dark-900/50 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400">CPA</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">₹{selectedCampaign.cpa?.toFixed(2)}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-dark-900/50 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400">Conv. Rate</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedCampaign.conversion_rate?.toFixed(2)}%</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-dark-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Campaign Duration</p>
              <p className="text-sm text-gray-900 dark:text-white">
                {new Date(selectedCampaign.start_date).toLocaleDateString()} - {new Date(selectedCampaign.end_date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </motion.div>
  );
};

export default Campaigns;
