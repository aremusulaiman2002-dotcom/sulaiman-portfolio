'use client';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { useState } from 'react';
import ServiceModal from './ServiceModal';
import { ServiceItem, ServiceCategory } from '@/data/services';

interface ServiceCardProps {
  serviceItem: ServiceItem;
  category: ServiceCategory;
  isPopular?: boolean;
}

interface ModalService {
  id: number;
  title: string;
  description: string;
  emoji: string;
  features: string[];
  price: {
    basic: string;
    professional: string;
    enterprise: string;
  };
  deliveryTime: string;
  mostPopular: boolean;
}

export default function ServiceCard({ serviceItem, category, isPopular = false }: ServiceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const modalService: ModalService = {
    id: Math.floor(Math.random() * 1000),
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

  const handleCardClick = () => {
    console.log('Service card clicked:', serviceItem.name);
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: Math.random() * 0.1 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all group-hover/item cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="flex justify-between items-start mb-2">
          <h5 className="font-semibold text-cyan-300 group-hover/item:text-cyan-400 transition-colors">
            {serviceItem.name}
          </h5>
          <span className="text-lg font-bold text-white">{serviceItem.price}</span>
        </div>
        <p className="text-gray-400 text-sm group-hover/item:text-gray-300 transition-colors">
          {serviceItem.details}
        </p>
        
        {isPopular && (
          <div className="mt-2 flex items-center">
            <Star size={14} className="text-yellow-400 mr-1 fill-current" />
            <span className="text-xs text-yellow-400">Most Popular</span>
          </div>
        )}

        {/* REMOVED THE GET FREE QUOTE BUTTON */}
        {/* The entire card is now clickable to open the modal */}
      </motion.div>

      <ServiceModal
        service={modalService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}