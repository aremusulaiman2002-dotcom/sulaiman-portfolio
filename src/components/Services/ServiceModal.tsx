// src/components/Services/ServiceModal.tsx
'use client';
import { motion } from 'framer-motion';
import { X, ArrowRight, Mail, Phone } from 'lucide-react';
import { Service } from '@/data/services';

interface ServiceModalProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceModal({ service, isOpen, onClose }: ServiceModalProps) {
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    console.log('Service inquiry:', {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      service: service.title,
      budget: service.price.professional
    });

    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-slate-900 border border-cyan-500/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{service.emoji}</span>
            <div>
              <h2 className="text-xl font-bold text-white">{service.title}</h2>
              <p className="text-cyan-400 text-sm">Starting at {service.price.basic}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-800"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              Interested in {service.title}?
            </h3>
            <p className="text-gray-400 text-sm">
              {service.description}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Details *
              </label>
              <textarea
                name="message"
                placeholder="Tell me about your project goals, timeline, and budget..."
                rows={4}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                required
              />
            </div>

            <input type="hidden" name="service" value={service.title} />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all"
            >
              Get Free Quote <ArrowRight size={16} />
            </motion.button>
          </form>

          <div className="mt-6 pt-6 border-t border-cyan-500/20">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Prefer direct contact?</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="mailto:aremusulaiman2002@gmail.com"
                className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg text-cyan-400 hover:bg-slate-700 transition-colors text-sm"
              >
                <Mail size={16} />
                Email directly
              </a>
              <a
                href="tel:+2347073504211"
                className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg text-cyan-400 hover:bg-slate-700 transition-colors text-sm"
              >
                <Phone size={16} />
                Call now
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}// Build fix: $(date) 
