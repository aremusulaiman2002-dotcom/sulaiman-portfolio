'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MessageSquare } from 'lucide-react';
import { sendEmail } from '@/utils/emailService';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await sendEmail({
        name: formData.name,        // ← FIXED: Changed from from_name
        email: formData.email,      // ← FIXED: Changed from from_email
        message: formData.message,
        to_email: 'aremusulaiman2002@gmail.com'
      });

      if (result.success) {
        alert('Message sent successfully! I will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        alert('Failed to send message. Please try again or contact me directly.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
            <textarea
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all resize-vertical"
              placeholder="How can I help you with your project?"
            ></textarea>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Sending...
            </>
          ) : (
            <>
              <Send size={20} className="group-hover:animate-bounce" />
              Send Message
            </>
          )}
        </motion.button>

        <div className="text-center text-sm text-gray-500 pt-4">
          <p className="flex items-center justify-center gap-2">
            <Phone size={16} />
            <span>+234 707 350 4211</span>
          </p>
          <p className="flex items-center justify-center gap-2 mt-1">
            <Mail size={16} />
            <a href="mailto:aremusulaiman2002@gmail.com" className="text-cyan-400 hover:text-cyan-300">
              aremusulaiman2002@gmail.com
            </a>
          </p>
        </div>
      </form>
    </motion.div>
  );
}