import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import PremiumButton from '../components/PremiumButton';
import Modal from '../components/Modal';
import { Plus, Edit2, Trash2, Play, Pause, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import api from '../services/api';
import { containerVariants, itemVariants } from '../utils/animations';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    budget: '',
    status: 'ACTIVE',
    start_date: '',
    end_date: '',
  });

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
    try {
      const campaignData = {
        ...formData,
        budget: parseFloat(formData.budget.replace(/[$,]/g, '')),
      };
      
      await api.campaigns.create(campaignData);
      await fetchCampaigns();
      setIsModalOpen(false);
      setFormData({ name: '', budget: '', status: 'ACTIVE', start_date: '', end_date: '' });
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
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Create and manage your marketing campaigns</p>
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
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                ${campaigns.reduce((sum, c) => sum + (c.budget || 0), 0).toLocaleString()}
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
      <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              whileHover={{ y: -5 }}
            >
              <GlassCard className="p-6 bg-white dark:bg-dark-800/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{campaign.name}</h3>
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        campaign.status === 'ACTIVE'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                          : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </div>
                  <div className="flex space-x-2">
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

                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <DollarSign className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-400">Budget:</span>
                    <span className="ml-auto font-semibold text-gray-900 dark:text-white">
                      ${campaign.budget?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-400">Start:</span>
                    <span className="ml-auto text-gray-900 dark:text-white">
                      {new Date(campaign.start_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-400">End:</span>
                    <span className="ml-auto text-gray-900 dark:text-white">
                      {new Date(campaign.end_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Performance</span>
                    <span className="text-accent-500 font-semibold">+23.5%</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))
        )}
      </motion.div>

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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Budget</label>
            <input
              type="text"
              required
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="$5,000"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
              <input
                type="datetime-local"
                required
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Date</label>
              <input
                type="datetime-local"
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
              onClick={() => setIsModalOpen(false)}
              variant="ghost"
            >
              Cancel
            </PremiumButton>
            <PremiumButton type="submit" variant="primary">
              Create Campaign
            </PremiumButton>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
};

export default Campaigns;
