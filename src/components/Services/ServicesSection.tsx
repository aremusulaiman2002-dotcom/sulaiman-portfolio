'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Clock } from 'lucide-react';
import { services, packageDeals, valueProps, ServiceItem } from '@/data/services';
import ServiceCard from './ServiceCard';
import PackageCard from './PackageCard';

const ServicesSection = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  // Add null check for services
  if (!services || services.length === 0) {
    return (
      <section id="services" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Services</h2>
          <p className="text-gray-400">No services available at the moment.</p>
        </div>
      </section>
    );
  }

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
                key={service.category || categoryIndex}
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
                  {/* FIXED: Added null check and proper property name */}
                  {service.items && service.items.map((item: ServiceItem, index) => (
                    <ServiceCard
                      key={`${service.category}-${index}`}
                      service={item}
                      category={service}
                      isPopular={item.mostPopular || false}
                    />
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
            {packageDeals && packageDeals.map((pkg) => (
              <PackageCard
                key={pkg.id}
                packageDeal={pkg}
                allPackages={packageDeals}
              />
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
            {valueProps && valueProps.map((prop, index) => {
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