import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        relative overflow-hidden
        bg-white/10 dark:bg-white/5
        backdrop-blur-xl
        border border-white/20 dark:border-white/10
        rounded-2xl
        shadow-lg dark:shadow-2xl
        ${className}
      `}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 opacity-50" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
