// src/components/Services/ServiceCard.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Zap, Clock, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import ServiceModal from './ServiceModal';
import { ServiceItem, ServiceCategory } from '@/data/services';

interface ServiceCardProps {
  serviceItem: ServiceItem;
  category: ServiceCategory;
  isPopular?: boolean;
}

export default function ServiceCard({ serviceItem, category, isPopular = false }: ServiceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Convert ServiceItem to the format expected by ServiceModal
  const modalService = {
    id: Math.random(),
    title: serviceItem.name,
    description: serviceItem.details,
    emoji: category.icon,
    features: serviceItem.details.split(', '),
    price: {
      basic: serviceItem.price,
      professional: serviceItem.price,
      enterprise: serviceItem.price
    },
    deliveryTime: "2-4 weeks",
    mostPopular: isPopular
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ 
          y: -8, 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-md rounded-2xl border p-6 h-full overflow-hidden group ${
          isPopular 
            ? 'border-cyan-500/30 shadow-2xl shadow-cyan-500/10' 
            : 'border-white/10 hover:border-cyan-500/20'
        }`}
      >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Floating Particles */}
        <AnimatePresence>
          {isHovered && (
            <>
              <motion.div
                initial={{ scale: 0, opacity: 0, x: -10, y: -10 }}
                animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0, x: 10, y: 10 }}
                animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-purple-400 rounded-full"
              />
            </>
          )}
        </AnimatePresence>

        {isPopular && (
          <motion.div
            initial={{ scale: 0, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"
          >
            <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg shadow-cyan-500/25">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Star size={14} fill="currentColor" />
              </motion.div>
              Most Popular
            </div>
          </motion.div>
        )}

        {/* Header */}
        <div className="text-center mb-6 relative z-10">
          <motion.div
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0
            }}
            transition={{ duration: 0.3 }}
            className="text-4xl mb-2 inline-block"
          >
            {category.icon}
          </motion.div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {serviceItem.name}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {serviceItem.details}
          </p>
        </div>

        {/* Pricing */}
        <div className="text-center mb-6 relative z-10">
          <div className="flex justify-center items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {serviceItem.price}
            </span>
            <span className="text-gray-400 text-sm">Starting price</span>
          </div>
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            className="flex items-center justify-center gap-2 text-sm text-gray-400"
          >
            <Clock size={14} />
            <span>2-4 weeks delivery</span>
          </motion.div>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-6 relative z-10">
          {serviceItem.details.split(', ').slice(0, 3).map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 group/feature"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="p-1 bg-green-500/10 rounded-full"
              >
                <Check size={14} className="text-green-400" />
              </motion.div>
              <span className="text-sm text-gray-300 group-hover/feature:text-white transition-colors">
                {feature}
              </span>
            </motion.div>
          ))}
          {serviceItem.details.split(', ').length > 3 && (
            <div className="text-center pt-2">
              <span className="text-xs text-cyan-400">
                +{serviceItem.details.split(', ').length - 3} more features
              </span>
            </div>
          )}
        </div>

        {/* Urgency Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-4 relative z-10"
        >
          <div className="text-xs text-amber-400 flex items-center justify-center gap-1 bg-amber-500/10 py-1 px-3 rounded-full">
            <Clock size={12} />
            <span>Limited availability</span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="w-full relative overflow-hidden group/btn"
        >
          {/* Button background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg"></div>
          
          {/* Animated overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity rounded-lg"></div>
          
          {/* Button content */}
          <div className="relative z-10 bg-gradient-to-r from-cyan-600/10 to-purple-600/10 backdrop-blur-sm py-3 rounded-lg font-semibold flex items-center justify-center gap-2 border border-cyan-500/30 group-hover/btn:border-cyan-500/50 transition-all">
            <Zap size={16} className="text-cyan-400" />
            <span className="text-white">Get Started</span>
            <motion.span
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight size={16} className="text-cyan-400" />
            </motion.span>
          </div>
        </motion.button>

        {/* Glow effect on hover */}
        <div className={`absolute -inset-2 bg-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}></div>
      </motion.div>

      {/* Service Modal */}
      <ServiceModal
        service={modalService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}"// Build verification: import fix confirmed $(date)" 
