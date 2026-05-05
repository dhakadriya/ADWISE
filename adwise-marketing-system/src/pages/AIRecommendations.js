import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import PremiumButton from '../components/PremiumButton';
import { TrendingUp, TrendingDown, AlertCircle, Lightbulb, ArrowRight, Sparkles } from 'lucide-react';
import { containerVariants, itemVariants } from '../utils/animations';

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
      green: {
        gradient: 'from-green-500 to-green-600',
        text: 'text-green-600 dark:text-green-400',
        bg: 'bg-green-50 dark:bg-green-900/30',
        border: 'border-green-200 dark:border-green-800',
      },
      orange: {
        gradient: 'from-orange-500 to-orange-600',
        text: 'text-orange-600 dark:text-orange-400',
        bg: 'bg-orange-50 dark:bg-orange-900/30',
        border: 'border-orange-200 dark:border-orange-800',
      },
      blue: {
        gradient: 'from-blue-500 to-blue-600',
        text: 'text-blue-600 dark:text-blue-400',
        bg: 'bg-blue-50 dark:bg-blue-900/30',
        border: 'border-blue-200 dark:border-blue-800',
      },
      red: {
        gradient: 'from-red-500 to-red-600',
        text: 'text-red-600 dark:text-red-400',
        bg: 'bg-red-50 dark:bg-red-900/30',
        border: 'border-red-200 dark:border-red-800',
      },
    };
    return colors[color];
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white flex items-center">
          <Sparkles className="h-8 w-8 mr-3 text-primary-500" />
          AI Recommendations
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Data-driven insights to optimize your marketing performance</p>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 border-primary-200 dark:border-primary-800">
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{recommendations.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Active Recommendations</p>
          </div>
        </GlassCard>
        <GlassCard className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-900 dark:text-white">$6,000</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Potential Monthly Gain</p>
          </div>
        </GlassCard>
        <GlassCard className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-200 dark:border-orange-800">
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-900 dark:text-white">89%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Avg. Confidence Score</p>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div variants={containerVariants} className="grid gap-6">
        {recommendations.map((rec, index) => {
          const colorClasses = getColorClasses(rec.color);

          return (
            <motion.div
              key={rec.id}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -3 }}
            >
              <GlassCard className={`p-6 border-l-4 ${colorClasses.border} bg-white dark:bg-dark-800/50`}>
                <div className="flex items-start">
                  <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <rec.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{rec.title}</h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{rec.description}</p>
                      </div>
                      <span className={`ml-4 px-3 py-1 text-xs font-semibold rounded-full ${colorClasses.bg} ${colorClasses.text}`}>
                        {rec.impact} Impact
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Potential</p>
                          <p className={`text-sm font-semibold ${colorClasses.text}`}>
                            {rec.potentialGain || rec.potentialSaving || rec.potentialLoss}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Confidence</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{rec.confidence}</p>
                        </div>
                      </div>
                      <PremiumButton
                        variant="primary"
                        size="sm"
                        className={`bg-gradient-to-r ${colorClasses.gradient}`}
                      >
                        Apply
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </PremiumButton>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default AIRecommendations;
