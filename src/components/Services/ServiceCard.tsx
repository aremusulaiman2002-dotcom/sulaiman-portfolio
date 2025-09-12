'use client';
import { useState } from 'react';
import { Service } from '@/data/services';
import { ServiceCategory } from '@/data/services';
import ServiceModal from './ServiceModal';

interface ServiceCardProps {
  service: Service;
  category: ServiceCategory;
  isPopular: boolean;
}

export default function ServiceCard({ service, category, isPopular }: ServiceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="bg-slate-800/30 rounded-lg p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-colors cursor-pointer group"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Service Title and Price */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
            {service.title}
          </h3>
          <span className="text-cyan-400 font-semibold">
            {service.price.basic}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
          {service.description}
        </p>

        {/* Minimal indicator */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{category.category}</span>
          {isPopular && (
            <span className="text-amber-400">★ Popular</span>
          )}
        </div>
      </div>

      <ServiceModal
        service={service}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}