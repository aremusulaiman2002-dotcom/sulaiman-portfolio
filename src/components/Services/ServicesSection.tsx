// src/components/Services/ServicesSection.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Shield, Clock, ArrowRight } from 'lucide-react';
import { services, packageDeals, valueProps } from '@/data/services';

const ServicesSection = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Professional <span className="text-cyan-400">Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive solutions tailored to your business needs. Transparent pricing with no hidden costs.
          </p>
        </motion.div>

        {/* Individual Services */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-12 text-center">À La Carte Services</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.2 }}
                className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all group"
              >
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-3 group-hover:scale-110 transition-transform">{service.icon}</span>
                  <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {service.category}
                  </h4>
                </div>
                
                <div className="space-y-4">
                  {service.items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all group-hover/item"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-cyan-300 group-hover/item:text-cyan-400 transition-colors">
                          {item.name}
                        </h5>
                        <span className="text-lg font-bold text-white">{item.price}</span>
                      </div>
                      <p className="text-gray-400 text-sm group-hover/item:text-gray-300 transition-colors">
                        {item.details}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Package Deals */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-12 text-center">Package Deals</h3>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Save up to 20% with our bundled packages. Everything you need for a complete digital presence.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packageDeals.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative rounded-2xl p-8 border-2 backdrop-blur-md transition-all hover:scale-105 cursor-pointer ${
                  pkg.popular 
                    ? 'border-cyan-500 bg-gradient-to-b from-cyan-900/20 to-slate-900 shadow-2xl shadow-cyan-500/20' 
                    : 'border-cyan-500/30 bg-slate-800/50 hover:border-cyan-500/60'
                }`}
                onClick={() => setSelectedPackage(pkg.name)}
              >
                {pkg.popular && (
                  <motion.div
                    initial={{ scale: 0, y: -20 }}
                    whileInView={{ scale: 1, y: 0 }}
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                  >
                    <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center shadow-lg">
                      <Star size={14} className="mr-1 fill-current" /> MOST POPULAR
                    </span>
                  </motion.div>
                )}
                
                <div className="text-center mb-8">
                  <h4 className="text-2xl font-bold text-white mb-2">{pkg.name}</h4>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-cyan-400">{pkg.price}</span>
                    {pkg.name !== "Enterprise Package" && (
                      <span className="text-gray-400 ml-2 text-sm">one-time</span>
                    )}
                  </div>
                  <p className="text-gray-400 mt-2 text-sm">{pkg.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
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
                  ))}
                </ul>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center transition-all ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-2xl hover:shadow-cyan-500/30'
                      : 'bg-slate-700 text-cyan-400 hover:bg-slate-600 hover:text-white'
                  }`}
                >
                  Select Package <ArrowRight size={18} className="ml-2" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-2xl p-8 border border-cyan-500/30 backdrop-blur-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((prop, index) => {
              const IconComponent = prop.icon === 'Zap' ? Zap : prop.icon === 'Shield' ? Shield : Clock;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/20 mb-4">
                    <IconComponent size={24} className="text-cyan-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{prop.title}</h4>
                  <p className="text-gray-400">{prop.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;