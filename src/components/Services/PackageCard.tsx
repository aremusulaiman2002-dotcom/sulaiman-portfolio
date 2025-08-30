'use client';
import { motion } from 'framer-motion';
import { Check, Star, ArrowRight } from 'lucide-react';
import { PackageDeal } from '@/data/services';
import { useState } from 'react';
import PackageWizard from './PackageWizard';

interface PackageCardProps {
  packageDeal: PackageDeal;
  allPackages: PackageDeal[];
}

export default function PackageCard({ packageDeal, allPackages }: PackageCardProps) {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Safety checks
  if (!packageDeal) {
    console.error('PackageCard: packageDeal prop is undefined');
    return null;
  }

  const handleClick = () => {
    console.log('Opening package wizard for:', packageDeal.name);
    setIsWizardOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: Math.random() * 0.2 }}
        className={`relative rounded-2xl p-8 border-2 backdrop-blur-md transition-all hover:scale-105 cursor-pointer ${
          packageDeal.popular 
            ? 'border-cyan-500 bg-gradient-to-b from-cyan-900/20 to-slate-900 shadow-2xl shadow-cyan-500/20' 
            : 'border-cyan-500/30 bg-slate-800/50 hover:border-cyan-500/60'
        }`}
        onClick={handleClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {packageDeal.popular && (
          <motion.div
            initial={{ scale: 0, y: -20 }}
            whileInView={{ scale: 1, y: 0 }}
            className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"
          >
            <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center shadow-lg">
              <Star size={14} className="mr-1 fill-current" /> MOST POPULAR
            </span>
          </motion.div>
        )}
        
        <div className="text-center mb-8">
          <h4 className="text-2xl font-bold text-white mb-2">{packageDeal.name || 'Package'}</h4>
          <div className="flex items-baseline justify-center">
            <span className="text-4xl font-bold text-cyan-400">{packageDeal.price || '$0'}</span>
            <span className="text-gray-400 ml-2 text-sm">one-time</span>
          </div>
          <p className="text-gray-400 mt-2 text-sm">{packageDeal.description || 'Package description'}</p>
        </div>
        
        <ul className="space-y-3 mb-8">
          {packageDeal.features?.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start text-sm"
            >
              <Check size={16} className="text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">{feature}</span>
            </motion.li>
          )) || (
            <li className="text-gray-400 text-sm">No features listed</li>
          )}
        </ul>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center transition-all ${
            packageDeal.popular
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-2xl hover:shadow-cyan-500/30'
              : 'bg-slate-700 text-cyan-400 hover:bg-slate-600 hover:text-white'
          }`}
        >
          Select Package <ArrowRight size={18} className="ml-2" />
        </motion.button>
      </motion.div>

      <PackageWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        packageDeals={allPackages}
      />
    </>
  );
}