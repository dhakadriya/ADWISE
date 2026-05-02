import React, { useState } from 'react';
import Card from '../components/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const [selectedModel, setSelectedModel] = useState('multi-touch');

  const attributionData = [
    { channel: 'Google Ads', firstClick: 35, lastClick: 28, multiTouch: 32 },
    { channel: 'Facebook', firstClick: 25, lastClick: 30, multiTouch: 27 },
    { channel: 'Instagram', firstClick: 20, lastClick: 18, multiTouch: 19 },
    { channel: 'Email', firstClick: 15, lastClick: 20, multiTouch: 17 },
    { channel: 'Organic', firstClick: 5, lastClick: 4, multiTouch: 5 },
  ];

  const channelMetrics = [
    { channel: 'Google Ads', contribution: '32%', revenue: '$14,474', conversions: 456, roi: '285%' },
    { channel: 'Facebook', contribution: '27%', revenue: '$12,212', conversions: 385, roi: '245%' },
    { channel: 'Instagram', contribution: '19%', revenue: '$8,594', conversions: 271, roi: '198%' },
    { channel: 'Email', contribution: '17%', revenue: '$7,689', conversions: 243, roi: '412%' },
    { channel: 'Organic', contribution: '5%', revenue: '$2,262', conversions: 73, roi: 'N/A' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Attribution</h1>
        <p className="mt-1 text-sm text-gray-500">Understand which channels drive the most value</p>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setSelectedModel('first-click')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedModel === 'first-click'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          First Click
        </button>
        <button
          onClick={() => setSelectedModel('last-click')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedModel === 'last-click'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Last Click
        </button>
        <button
          onClick={() => setSelectedModel('multi-touch')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedModel === 'multi-touch'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Multi-Touch
        </button>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Attribution Model Comparison</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={attributionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="channel" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Bar dataKey="firstClick" fill="#0ea5e9" name="First Click" radius={[8, 8, 0, 0]} />
            <Bar dataKey="lastClick" fill="#a855f7" name="Last Click" radius={[8, 8, 0, 0]} />
            <Bar dataKey="multiTouch" fill="#10b981" name="Multi-Touch" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Channel Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Channel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contribution %
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ROI
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {channelMetrics.map((metric, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{metric.channel}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-gradient-to-r from-primary-500 to-purple-600 h-2 rounded-full"
                          style={{ width: metric.contribution }}
                        />
                      </div>
                      <span className="text-sm text-gray-900">{metric.contribution}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    {metric.revenue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {metric.conversions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {metric.roi}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
