import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { MousePointerClick, Globe, UserPlus, ShoppingCart, CheckCircle, ArrowRight } from 'lucide-react';
import { containerVariants, itemVariants } from '../utils/animations';

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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Customer Journey</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Visualize how customers interact with your brand</p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <GlassCard className="p-8 bg-white dark:bg-dark-800/50">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-8">Journey Flow</h3>
          <div className="flex items-center justify-between">
            {journeySteps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-lg mb-3`}
                  >
                    <step.icon className="h-10 w-10 text-white" />
                  </motion.div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{step.title}</h4>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{step.count.toLocaleString()}</p>
                  {index < journeySteps.length - 1 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {Math.round((journeySteps[index + 1].count / step.count) * 100)}% conversion
                    </p>
                  )}
                </div>
                {index < journeySteps.length - 1 && (
                  <div className="flex-1 h-1 bg-gray-200 dark:bg-dark-700 mx-4 relative rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(journeySteps[index + 1].count / step.count) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-accent-500"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      <motion.div variants={itemVariants}>
        <GlassCard className="p-6 bg-white dark:bg-dark-800/50">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Customer Touchpoints</h3>
          <div className="space-y-4">
            {touchpoints.map((touchpoint, index) => (
              <motion.div
                key={touchpoint.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="border border-gray-200 dark:border-dark-700 rounded-xl p-4 hover:border-primary-300 dark:hover:border-primary-700 transition-all bg-gray-50 dark:bg-dark-900/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{touchpoint.customer}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Journey time: {touchpoint.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">{touchpoint.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total value</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                  {touchpoint.journey.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center flex-shrink-0">
                      <span className="px-3 py-1 text-xs font-medium bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full whitespace-nowrap">
                        {step}
                      </span>
                      {stepIndex < touchpoint.journey.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-600 mx-1" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

export default CustomerJourney;
