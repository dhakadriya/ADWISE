import React, { useState } from 'react';
import Card from '../components/Card';
import Modal from '../components/Modal';
import { Plus, Copy, ExternalLink, Check } from 'lucide-react';

const TrackingLinks = () => {
  const [links, setLinks] = useState([
    { id: 1, url: 'https://example.com/?utm_source=google&utm_medium=cpc&utm_campaign=summer_sale', source: 'Google', medium: 'CPC', campaign: 'Summer Sale' },
    { id: 2, url: 'https://example.com/?utm_source=facebook&utm_medium=social&utm_campaign=product_launch', source: 'Facebook', medium: 'Social', campaign: 'Product Launch' },
    { id: 3, url: 'https://example.com/?utm_source=email&utm_medium=newsletter&utm_campaign=holiday_special', source: 'Email', medium: 'Newsletter', campaign: 'Holiday Special' },
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tracking Links</h1>
          <p className="mt-1 text-sm text-gray-500">Generate and manage UTM tracking links</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 transition-all"
        >
          <Plus className="h-5 w-5 mr-2" />
          Generate Link
        </button>
      </div>

      <div className="grid gap-4">
        {links.map((link) => (
          <Card key={link.id} className="p-6" hover>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="px-3 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                    {link.source}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                    {link.medium}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                    {link.campaign}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <code className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg flex-1 break-all">
                    {link.url}
                  </code>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => copyToClipboard(link.url, link.id)}
                  className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  {copiedId === link.id ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  title="Open link"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Generate Tracking Link">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Base URL</label>
            <input
              type="url"
              required
              value={formData.baseUrl}
              onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
            <input
              type="text"
              required
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="google, facebook, newsletter"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Medium</label>
            <input
              type="text"
              required
              value={formData.medium}
              onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="cpc, social, email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign</label>
            <input
              type="text"
              required
              value={formData.campaign}
              onChange={(e) => setFormData({ ...formData, campaign: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Summer Sale"
            />
          </div>
          {formData.baseUrl && formData.source && formData.medium && formData.campaign && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs font-medium text-gray-700 mb-1">Preview:</p>
              <code className="text-xs text-gray-600 break-all">{generateUrl()}</code>
            </div>
          )}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 transition-all"
            >
              Generate Link
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TrackingLinks;
