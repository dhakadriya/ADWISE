import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, TrendingUp, Users, DollarSign, Target, Zap, Shield, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PremiumButton from '../components/PremiumButton';
import GlassCard from '../components/GlassCard';

const LandingPage = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Multi-Touch Attribution',
      description: 'Track every touchpoint in your customer journey with precision analytics.'
    },
    {
      icon: Zap,
      title: 'Real-Time Insights',
      description: 'Get instant updates on campaign performance and conversion metrics.'
    },
    {
      icon: Target,
      title: 'AI-Powered Optimization',
      description: 'Let AI recommend the best channels and budget allocation strategies.'
    },
    {
      icon: Shield,
      title: 'Fraud Detection',
      description: 'Protect your budget with advanced fraud detection algorithms.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'TechCorp',
      content: 'Adwise helped us increase ROI by 250% in just 3 months. The insights are game-changing!',
      avatar: '👩‍💼'
    },
    {
      name: 'Michael Chen',
      role: 'Growth Lead',
      company: 'StartupXYZ',
      content: 'Finally, a platform that shows us exactly which channels drive real results. Worth every penny.',
      avatar: '👨‍💻'
    },
    {
      name: 'Emily Rodriguez',
      role: 'CMO',
      company: 'E-commerce Plus',
      content: 'The AI recommendations alone saved us $50K in wasted ad spend. Incredible tool!',
      avatar: '👩‍🎨'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-dark-950 to-accent-900/20 animate-gradient bg-[length:400%_400%]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-500 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="relative z-20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-xl font-display font-bold">Adwise</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Link to="/login">
              <PremiumButton variant="ghost" size="sm">Sign In</PremiumButton>
            </Link>
            <Link to="/signup">
              <PremiumButton variant="primary" size="sm">Get Started</PremiumButton>
            </Link>
          </motion.div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
            <span className="text-sm text-primary-300">Now with AI-powered insights</span>
          </motion.div>
          
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-primary-200 to-accent-200 bg-clip-text text-transparent">
              Track. Analyze.
              <br />
              Optimize Your
              <br />
              Marketing ROI
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto"
          >
            The all-in-one marketing attribution platform that helps you understand
            which channels drive real results. Make data-driven decisions with confidence.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
          >
            <Link to="/signup">
              <PremiumButton variant="primary" size="lg" className="group">
                Get Started Free
                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </PremiumButton>
            </Link>
            
            <PremiumButton variant="ghost" size="lg">
              <Play className="inline-block mr-2 w-5 h-5" />
              Watch Demo
            </PremiumButton>
          </motion.div>
          
          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { icon: TrendingUp, value: '250%', label: 'Average ROI Increase' },
              { icon: Users, value: '10K+', label: 'Active Users' },
              { icon: DollarSign, value: '$2M+', label: 'Revenue Tracked' },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <stat.icon className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-400">
              Powerful features to optimize your marketing performance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="p-6 h-full">
                  <div className="p-3 bg-primary-500/10 rounded-xl w-fit mb-4">
                    <feature.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Loved by marketers worldwide
            </h2>
            <p className="text-xl text-gray-400">
              See what our customers have to say
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role} at {testimonial.company}</div>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.content}"</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-12">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Ready to optimize your marketing?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Join thousands of marketers who trust Adwise for their attribution needs
              </p>
              <Link to="/signup">
                <PremiumButton variant="primary" size="lg" className="group">
                  Start Free Trial
                  <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                </PremiumButton>
              </Link>
              <p className="text-sm text-gray-500 mt-4">No credit card required • 14-day free trial</p>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <span className="font-display font-bold">Adwise</span>
          </div>
          <div className="text-sm text-gray-400">
            © 2026 Adwise Marketing System. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
