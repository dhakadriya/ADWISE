import React from 'react';
import Card from '../components/Card';
import { TrendingUp, TrendingDown, AlertCircle, Lightbulb, ArrowRight } from 'lucide-react';

const AIRecommendations = () => {
  const recommendations = [
    {
      id: 1,
      type: 'increase',
      title: 'Increase Google Ads Budget',
      description: 'Your Google Ads campaigns are performing 35% above average. Consider increasing budget by 30% to maximize conversions.',
      impact: 'High',
      potentialGain: '+$4,200/month',
      confidence: '92%',
      icon: TrendingUp,
      color: 'green',
    },
    {
      id: 2,
      type: 'decrease',
      title: 'Reduce Instagram Spend',
      description: 'Instagram campaigns show declining ROI over the past 3 months. Consider reallocating 20% of budget to better-performing channels.',
      impact: 'Medium',
      potentialSaving: '$1,800/month',
      confidence: '87%',
      icon: TrendingDown,
      color: 'orange',
    },
    {
      id: 3,
      type: 'optimize',
      title: 'Optimize Email Campaign Timing',
      description: 'Analysis shows 45% higher open rates when emails are sent on Tuesday mornings. Adjust your email schedule accordingly.',
      impact: 'Medium',
      potentialGain: '+18% engagement',
      confidence: '89%',
      icon: Lightbulb,
      color: 'blue',
    },
    {
      id: 4,
      type: 'warning',
      title: 'Facebook Ad Fatigue Detected',
      description: 'Your Facebook ads have been running for 45 days with the same creative. Refresh ad content to prevent audience fatigue.',
      impact: 'High',
      potentialLoss: '-$2,500/month',
      confidence: '94%',
      icon: AlertCircle,
      color: 'red',
    },
    {
      id: 5,
      type: 'increase',
      title: 'Expand to LinkedIn Ads',
      description: 'Based on your B2B customer profile, LinkedIn Ads could generate 25% more qualified leads. Start with a $2,000 test budget.',
      impact: 'High',
      potentialGain: '+120 leads/month',
      confidence: '85%',
      icon: TrendingUp,
      color: 'green',
    },
    {
      id: 6,
      type: 'optimize',
      title: 'Improve Landing Page Conversion',
      description: 'Your landing page bounce rate is 15% higher than industry average. A/B test a simplified design to improve conversions.',
      impact: 'Medium',
      potentialGain: '+8% conversion rate',
      confidence: '91%',
      icon: Lightbulb,
      color: 'blue',
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      green: 'from-green-500 to-green-600 text-green-600 bg-green-50 border-green-200',
      orange: 'from-orange-500 to-orange-600 text-orange-600 bg-orange-50 border-orange-200',
      blue: 'from-blue-500 to-blue-600 text-blue-600 bg-blue-50 border-blue-200',
      red: 'from-red-500 to-red-600 text-red-600 bg-red-50 border-red-200',
    };
    return colors[color];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Recommendations</h1>
        <p className="mt-1 text-sm text-gray-500">Data-driven insights to optimize your marketing performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-primary-50 to-purple-50 border-primary-200">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">6</p>
            <p className="text-sm text-gray-600 mt-1">Active Recommendations</p>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">$6,000</p>
            <p className="text-sm text-gray-600 mt-1">Potential Monthly Gain</p>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">89%</p>
            <p className="text-sm text-gray-600 mt-1">Avg. Confidence Score</p>
          </div>
        </Card>
      </div>

      <div className="grid gap-6">
        {recommendations.map((rec) => {
          const colorClasses = getColorClasses(rec.color);
          const [gradientClass, textClass, bgClass, borderClass] = colorClasses.split(' ');

          return (
            <Card key={rec.id} className={`p-6 border-l-4 ${borderClass}`} hover>
              <div className="flex items-start">
                <div className={`w-12 h-12 bg-gradient-to-br ${gradientClass} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <rec.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{rec.title}</h3>
                      <p className="mt-1 text-sm text-gray-600">{rec.description}</p>
                    </div>
                    <span className={`ml-4 px-3 py-1 text-xs font-semibold rounded-full ${bgClass} ${textClass}`}>
                      {rec.impact} Impact
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div>
                        <p className="text-xs text-gray-500">Potential</p>
                        <p className={`text-sm font-semibold ${textClass}`}>
                          {rec.potentialGain || rec.potentialSaving || rec.potentialLoss}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Confidence</p>
                        <p className="text-sm font-semibold text-gray-900">{rec.confidence}</p>
                      </div>
                    </div>
                    <button className={`inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r ${gradientClass} hover:shadow-lg transition-all`}>
                      Apply
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AIRecommendations;
