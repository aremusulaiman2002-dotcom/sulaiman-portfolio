'use client';
import { motion } from 'framer-motion';
import { X, ArrowRight, Mail, Phone, User, Building, MessageSquare, Star, Check, Clock } from 'lucide-react';
import { useState } from 'react';
import { Service } from '@/data/services';
import { sendContactInquiry } from '@/utils/packageEmailService';

interface ServiceModalProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceModal({ service, isOpen, onClose }: ServiceModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const formDataObject = Object.fromEntries(formData.entries());
    
    try {
      const result = await sendContactInquiry({
        name: formDataObject.name,
        email: formDataObject.email,
        phone: formDataObject.phone,
        company: formDataObject.company,
        message: `Service Inquiry: ${service.title}\n\n${formDataObject.message}`
      });
      
      if (result.success) {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-cyan-500/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-cyan-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 p-6 border-b border-cyan-500/20">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-3xl bg-cyan-500/20 p-3 rounded-xl"
              >
                {service.emoji}
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{service.title}</h2>
                <p className="text-cyan-300 font-semibold text-lg">{service.price.basic}</p>
                <p className="text-gray-400 text-sm mt-1">{service.description}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800/50"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Service Features */}
        <div className="p-6">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-cyan-400 rounded-full"></div>
              <h3 className="text-lg font-semibold text-white">What's Included</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-cyan-500/30 transition-colors group"
                >
                  <div className="bg-cyan-500/10 p-1 rounded mr-3 group-hover:bg-cyan-500/20 transition-colors">
                    <Check size={14} className="text-cyan-400" />
                  </div>
                  <span className="text-gray-200 text-sm group-hover:text-white transition-colors">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock size={18} className="text-cyan-400 mr-2" />
                <span className="text-white font-semibold">Delivery</span>
              </div>
              <p className="text-gray-300 text-sm">{service.deliveryTime}</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 text-center">
              <div className="flex items-center justify-center mb-2">
                <Star size={18} className="text-cyan-400 mr-2" />
                <span className="text-white font-semibold">Popular</span>
              </div>
              <p className="text-gray-300 text-sm">{service.mostPopular ? 'Most Chosen' : 'Quality Service'}</p>
            </div>
          </div>

          {/* Get Free Quote Form */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-xl border border-cyan-500/20 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-purple-500/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-6 text-center flex items-center justify-center">
                <MessageSquare size={24} className="text-cyan-400 mr-3" />
                Get Your Free Quote
              </h3>
              
              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-green-900/20 p-6 rounded-lg border border-green-500/30 text-center"
                >
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check size={24} className="text-green-400" />
                  </div>
                  <h4 className="text-green-400 font-semibold mb-2">Success!</h4>
                  <p className="text-gray-300 text-sm">We'll contact you within 24 hours with your personalized quote.</p>
                </motion.div>
              ) : submitStatus === 'error' ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-red-900/20 p-6 rounded-lg border border-red-500/30 text-center"
                >
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <X size={24} className="text-red-400" />
                  </div>
                  <h4 className="text-red-400 font-semibold mb-2">Oops!</h4>
                  <p className="text-gray-300 text-sm">Something went wrong. Please try again.</p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-white text-sm flex items-center">
                        <User size={16} className="mr-2 text-cyan-400" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full p-3 bg-slate-700/80 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-white text-sm flex items-center">
                        <Mail size={16} className="mr-2 text-cyan-400" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full p-3 bg-slate-700/80 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-white text-sm flex items-center">
                        <Phone size={16} className="mr-2 text-cyan-400" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full p-3 bg-slate-700/80 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        placeholder="080-1234-5678"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-white text-sm flex items-center">
                        <Building size={16} className="mr-2 text-cyan-400" />
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        className="w-full p-3 bg-slate-700/80 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        placeholder="Company name (optional)"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white text-sm flex items-center">
                      <MessageSquare size={16} className="mr-2 text-cyan-400" />
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      className="w-full p-3 bg-slate-700/80 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 resize-none transition-all"
                      placeholder="Tell us about your project vision, requirements, and timeline..."
                      defaultValue={`I'm interested in the ${service.title} service and would like to discuss my project.`}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white py-4 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/20"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Get Free Quote
                        <ArrowRight size={18} />
                      </>
                    )}
                  </motion.button>

                  <p className="text-gray-400 text-sm text-center">
                    ✨ We'll provide a detailed quote within 24 hours
                  </p>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}