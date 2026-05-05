import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const AnimatedStatCard = ({ title, value, change, icon: Icon, trend = 'up', prefix = '', suffix = '' }) => {
  const isNumeric = typeof value === 'number';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative group"
    >
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
      
      {/* Card */}
      <div className="relative bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-2xl p-6 shadow-lg">
        {/* Icon with glow */}
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-primary-500/10 rounded-xl group-hover:bg-primary-500/20 transition-colors">
            <Icon className="w-6 h-6 text-primary-500 dark:text-primary-400" />
          </div>
          
          {/* Trend badge */}
          {change && (
            <span className={`text-sm font-medium ${
              trend === 'up' ? 'text-accent-500 dark:text-accent-400' : 'text-red-500 dark:text-red-400'
            }`}>
              {change}
            </span>
          )}
        </div>
        
        {/* Value */}
        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          {prefix}
          {isNumeric ? (
            <CountUp end={value} duration={2} separator="," decimals={value % 1 !== 0 ? 2 : 0} />
          ) : (
            value
          )}
          {suffix}
        </div>
        
        {/* Title */}
        <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
      </div>
    </motion.div>
  );
};

export default AnimatedStatCard;
