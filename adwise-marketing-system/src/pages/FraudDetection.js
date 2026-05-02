import React from 'react';
import Card from '../components/Card';
import { AlertTriangle, Shield, Activity, TrendingDown } from 'lucide-react';

const FraudDetection = () => {
  const alerts = [
    {
      id: 1,
      severity: 'high',
      title: 'Suspicious Click Pattern Detected',
      description: 'Unusual spike in clicks from IP range 192.168.x.x with 0% conversion rate.',
      source: 'Google Ads - Summer Sale Campaign',
      timestamp: '2 hours ago',
      affectedClicks: 342,
      estimatedLoss: '$1,026',
    },
    {
      id: 2,
      severity: 'medium',
      title: 'Abnormal Traffic Source',
      description: 'High volume of traffic from unknown referrer with very short session duration.',
      source: 'Facebook Ads - Product Launch',
      timestamp: '5 hours ago',
      affectedClicks: 156,
      estimatedLoss: '$468',
    },
    {
      id: 3,
      severity: 'low',
      title: 'Bot Activity Detected',
      description: 'Automated bot behavior identified based on user agent patterns.',
      source: 'Instagram Ads - Brand Awareness',
      timestamp: '1 day ago',
      affectedClicks: 89,
      estimatedLoss: '$178',
    },
  ];

  const stats = [
    { title: 'Total Alerts', value: '12', change: '-15%', icon: AlertTriangle, color: 'red' },
    { title: 'Blocked Clicks', value: '587', change: '+8%', icon: Shield, color: 'green' },
    { title: 'Money Saved', value: '$1,761', change: '+12%', icon: TrendingDown, color: 'blue' },
    { title: 'Detection Rate', value: '94.2%', change: '+2%', icon: Activity, color: 'purple' },
  ];

  const getSeverityColor = (severity) => {
    const colors = {
      high: 'bg-red-100 text-red-800 border-red-300',
      medium: 'bg-orange-100 text-orange-800 border-orange-300',
      low: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    };
    return colors[severity];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Fraud Detection</h1>
        <p className="mt-1 text-sm text-gray-500">Monitor and prevent fraudulent activity in your campaigns</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className={`mt-2 text-sm ${stat.color === 'green' || stat.color === 'blue' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} vs last week
                </p>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`border-l-4 rounded-lg p-4 ${getSeverityColor(alert.severity)} bg-opacity-50`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-5 w-5" />
                    <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{alert.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-600">
                    <span className="font-medium">{alert.source}</span>
                    <span>•</span>
                    <span>{alert.timestamp}</span>
                  </div>
                  <div className="mt-3 flex items-center space-x-6">
                    <div>
                      <p className="text-xs text-gray-500">Affected Clicks</p>
                      <p className="text-sm font-semibold text-gray-900">{alert.affectedClicks}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Estimated Loss</p>
                      <p className="text-sm font-semibold text-red-600">{alert.estimatedLoss}</p>
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex flex-col space-y-2">
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Investigate
                  </button>
                  <button className="px-4 py-2 bg-red-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-red-700 transition-colors">
                    Block Source
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Protection Rules</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Block suspicious IPs</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Filter bot traffic</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm font-medium text-gray-900">Click fraud prevention</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Blocked Sources</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">192.168.1.0/24</p>
                <p className="text-xs text-gray-500">Blocked 2 hours ago</p>
              </div>
              <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                Unblock
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">suspicious-bot-ua</p>
                <p className="text-xs text-gray-500">Blocked 1 day ago</p>
              </div>
              <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                Unblock
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FraudDetection;
