import React from 'react';
import Card from '../components/Card';
import { MousePointerClick, Globe, UserPlus, ShoppingCart, CheckCircle } from 'lucide-react';

const CustomerJourney = () => {
  const journeySteps = [
    { id: 1, title: 'Ad Click', icon: MousePointerClick, count: 5420, color: 'from-blue-500 to-blue-600' },
    { id: 2, title: 'Website Visit', icon: Globe, count: 4230, color: 'from-purple-500 to-purple-600' },
    { id: 3, title: 'Signup', icon: UserPlus, count: 2150, color: 'from-pink-500 to-pink-600' },
    { id: 4, title: 'Add to Cart', icon: ShoppingCart, count: 1680, color: 'from-orange-500 to-orange-600' },
    { id: 5, title: 'Purchase', icon: CheckCircle, count: 1428, color: 'from-green-500 to-green-600' },
  ];

  const touchpoints = [
    { id: 1, customer: 'John Doe', journey: ['Google Ads', 'Homepage', 'Product Page', 'Signup', 'Purchase'], time: '2 days', value: '$125' },
    { id: 2, customer: 'Jane Smith', journey: ['Facebook', 'Blog Post', 'Product Page', 'Signup', 'Cart', 'Purchase'], time: '5 days', value: '$89' },
    { id: 3, customer: 'Mike Johnson', journey: ['Email', 'Landing Page', 'Signup', 'Purchase'], time: '1 day', value: '$210' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customer Journey</h1>
        <p className="mt-1 text-sm text-gray-500">Visualize how customers interact with your brand</p>
      </div>

      <Card className="p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-8">Journey Flow</h3>
        <div className="flex items-center justify-between">
          {journeySteps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-lg mb-3`}>
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{step.title}</h4>
                <p className="text-2xl font-bold text-gray-900">{step.count.toLocaleString()}</p>
                {index < journeySteps.length - 1 && (
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round((journeySteps[index + 1].count / step.count) * 100)}% conversion
                  </p>
                )}
              </div>
              {index < journeySteps.length - 1 && (
                <div className="flex-1 h-1 bg-gradient-to-r from-gray-300 to-gray-400 mx-4 relative">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-purple-600"
                    style={{ width: `${(journeySteps[index + 1].count / step.count) * 100}%` }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Customer Touchpoints</h3>
        <div className="space-y-4">
          {touchpoints.map((touchpoint) => (
            <div key={touchpoint.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{touchpoint.customer}</h4>
                  <p className="text-sm text-gray-500">Journey time: {touchpoint.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{touchpoint.value}</p>
                  <p className="text-xs text-gray-500">Total value</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {touchpoint.journey.map((step, index) => (
                  <React.Fragment key={index}>
                    <span className="px-3 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-full">
                      {step}
                    </span>
                    {index < touchpoint.journey.length - 1 && (
                      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CustomerJourney;
