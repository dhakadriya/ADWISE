import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import PremiumButton from '../components/PremiumButton';
import Modal from '../components/Modal';
import { Plus, Copy, ExternalLink, Check, Link2, TrendingUp } from 'lucide-react';
import api from '../services/api';
import { containerVariants, itemVariants } from '../utils/animations';

const TrackingLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [darkMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
  });

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const data = await api.trackingLinks.getAll();
      setLinks(data);
    } catch (err) {
      setError(err.message || 'Failed to load tracking links');
    } finally {
      setLoading(false);
    }
  };

  const generateUrl = () => {
    const { url, utm_source, utm_medium, utm_campaign, utm_term, utm_content } = formData;
    let trackingUrl = `${url}?utm_source=${utm_source}&utm_medium=${utm_medium}&utm_campaign=${utm_campaign.replace(/\s+/g, '_').toLowerCase()}`;
    if (utm_term) trackingUrl += `&utm_term=${utm_term}`;
    if (utm_content) trackingUrl += `&utm_content=${utm_content}`;
    return trackingUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const linkData = {
        ...formData,
        utm_campaign: formData.utm_campaign.replace(/\s+/g, '_').toLowerCase(),
      };
      await api.trackingLinks.create(linkData);
      await fetchLinks();
      setIsModalOpen(false);
      setFormData({ name: '', url: '', utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '' });
    } catch (err) {
      setError(err.message || 'Failed to create tracking link');
    }
  };

  const copyToClipboard = (link) => {
    let fullUrl = `${link.url}?utm_source=${link.utm_source}&utm_medium=${link.utm_medium}&utm_campaign=${link.utm_campaign}`;
    if (link.utm_term) fullUrl += `&utm_term=${link.utm_term}`;
    if (link.utm_content) fullUrl += `&utm_content=${link.utm_content}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(link.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-dark-950 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading tracking links...</p>
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
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Tracking Links</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Generate and manage UTM tracking links</p>
        </div>
        <PremiumButton
          onClick={() => setIsModalOpen(true)}
          variant="primary"
          size="md"
        >
          <Plus className="h-5 w-5 mr-2" />
          Generate Link
        </PremiumButton>
      </motion.div>

      {/* Stats Overview */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-6 bg-white dark:bg-dark-800/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Links</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{links.length}</p>
            </div>
            <div className="p-3 bg-primary-500/10 rounded-xl">
              <Link2 className="h-8 w-8 text-primary-500" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 bg-white dark:bg-dark-800/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Campaigns</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {new Set(links.map(l => l.utm_campaign)).size}
              </p>
            </div>
            <div className="p-3 bg-accent-500/10 rounded-xl">
              <TrendingUp className="h-8 w-8 text-accent-500" />
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Links Grid */}
      <motion.div variants={containerVariants} className="grid gap-4">
        {links.length === 0 ? (
          <GlassCard className="p-12 bg-white dark:bg-dark-800/50 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Link2 className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No tracking links yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Generate your first tracking link to start monitoring campaign performance!</p>
              <PremiumButton onClick={() => setIsModalOpen(true)} variant="primary">
                Generate Link
              </PremiumButton>
            </div>
          </GlassCard>
        ) : (
          links.map((link, index) => (
            <motion.div
              key={link.id}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -2 }}
            >
              <GlassCard className="p-6 bg-white dark:bg-dark-800/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{link.name}</h3>
                    <div className="flex items-center space-x-3 mb-3 flex-wrap">
                      <span className="px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-400 rounded-full">
                        {link.utm_source}
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full">
                        {link.utm_medium}
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full">
                        {link.utm_campaign}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <code className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-dark-700 px-3 py-2 rounded-lg flex-1 break-all">
                        {link.url}?utm_source={link.utm_source}&utm_medium={link.utm_medium}&utm_campaign={link.utm_campaign}
                      </code>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => copyToClipboard(link)}
                      className="p-2 text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                      title="Copy to clipboard"
                    >
                      {copiedId === link.id ? (
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </motion.button>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={`${link.url}?utm_source=${link.utm_source}&utm_medium=${link.utm_medium}&utm_campaign=${link.utm_campaign}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                      title="Open link"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </motion.a>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))
        )}
      </motion.div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Generate Tracking Link">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Link Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Summer Campaign Link"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Base URL</label>
            <input
              type="url"
              required
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Source</label>
            <input
              type="text"
              required
              value={formData.utm_source}
              onChange={(e) => setFormData({ ...formData, utm_source: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="google, facebook, newsletter"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Medium</label>
            <input
              type="text"
              required
              value={formData.utm_medium}
              onChange={(e) => setFormData({ ...formData, utm_medium: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="cpc, social, email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Campaign</label>
            <input
              type="text"
              required
              value={formData.utm_campaign}
              onChange={(e) => setFormData({ ...formData, utm_campaign: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Summer Sale"
            />
          </div>
          {formData.url && formData.utm_source && formData.utm_medium && formData.utm_campaign && (
            <div className="bg-gray-50 dark:bg-dark-700 p-3 rounded-lg">
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Preview:</p>
              <code className="text-xs text-gray-600 dark:text-gray-400 break-all">{generateUrl()}</code>
            </div>
          )}
          <div className="flex justify-end space-x-3 pt-4">
            <PremiumButton
              type="button"
              onClick={() => setIsModalOpen(false)}
              variant="ghost"
            >
              Cancel
            </PremiumButton>
            <PremiumButton type="submit" variant="primary">
              Generate Link
            </PremiumButton>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
};

export default TrackingLinks;
