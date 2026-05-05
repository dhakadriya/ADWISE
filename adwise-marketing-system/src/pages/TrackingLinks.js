import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import PremiumButton from '../components/PremiumButton';
import Modal from '../components/Modal';
import { Plus, Copy, ExternalLink, Check, Link2, TrendingUp } from 'lucide-react';
import { containerVariants, itemVariants } from '../utils/animations';

const TrackingLinks = () => {
  const [links, setLinks] = useState([
    { id: 1, url: 'https://example.com/?utm_source=google&utm_medium=cpc&utm_campaign=summer_sale', source: 'Google', medium: 'CPC', campaign: 'Summer Sale', clicks: 1234 },
    { id: 2, url: 'https://example.com/?utm_source=facebook&utm_medium=social&utm_campaign=product_launch', source: 'Facebook', medium: 'Social', campaign: 'Product Launch', clicks: 892 },
    { id: 3, url: 'https://example.com/?utm_source=email&utm_medium=newsletter&utm_campaign=holiday_special', source: 'Email', medium: 'Newsletter', campaign: 'Holiday Special', clicks: 567 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [formData, setFormData] = useState({
    baseUrl: '',
    source: '',
    medium: '',
    campaign: '',
  });

  const generateUrl = () => {
    const { baseUrl, source, medium, campaign } = formData;
    return `${baseUrl}?utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign.replace(/\s+/g, '_').toLowerCase()}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLink = {
      id: links.length + 1,
      url: generateUrl(),
      source: formData.source,
      medium: formData.medium,
      campaign: formData.campaign,
      clicks: 0,
    };
    setLinks([...links, newLink]);
    setIsModalOpen(false);
    setFormData({ baseUrl: '', source: '', medium: '', campaign: '' });
  };

  const copyToClipboard = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
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
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Clicks</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalClicks.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-accent-500/10 rounded-xl">
              <TrendingUp className="h-8 w-8 text-accent-500" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 bg-white dark:bg-dark-800/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Clicks/Link</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {links.length > 0 ? Math.round(totalClicks / links.length) : 0}
              </p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Links Grid */}
      <motion.div variants={containerVariants} className="grid gap-4">
        {links.map((link, index) => (
          <motion.div
            key={link.id}
            variants={itemVariants}
            custom={index}
            whileHover={{ y: -2 }}
          >
            <GlassCard className="p-6 bg-white dark:bg-dark-800/50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-400 rounded-full">
                      {link.source}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full">
                      {link.medium}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full">
                      {link.campaign}
                    </span>
                    <span className="ml-auto px-3 py-1 text-xs font-medium bg-accent-100 dark:bg-accent-900/30 text-accent-800 dark:text-accent-400 rounded-full">
                      {link.clicks} clicks
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-dark-700 px-3 py-2 rounded-lg flex-1 break-all">
                      {link.url}
                    </code>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => copyToClipboard(link.url, link.id)}
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
                    href={link.url}
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
        ))}
      </motion.div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Generate Tracking Link">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Base URL</label>
            <input
              type="url"
              required
              value={formData.baseUrl}
              onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Source</label>
            <input
              type="text"
              required
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="google, facebook, newsletter"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Medium</label>
            <input
              type="text"
              required
              value={formData.medium}
              onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="cpc, social, email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Campaign</label>
            <input
              type="text"
              required
              value={formData.campaign}
              onChange={(e) => setFormData({ ...formData, campaign: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Summer Sale"
            />
          </div>
          {formData.baseUrl && formData.source && formData.medium && formData.campaign && (
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
