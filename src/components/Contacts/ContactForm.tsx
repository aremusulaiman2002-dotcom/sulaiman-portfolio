'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MessageSquare } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - connect to your backend or email service
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
          <input
            type="text"
            required
            className="w-full bg-slate-800 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            required
            className="w-full bg-slate-800 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
          <input
            type="tel"
            className="w-full bg-slate-800 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="+1 (555) 000-0000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Service Needed</label>
          <select className="w-full bg-slate-800 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
            <option value="">Select a service</option>
            <option value="web-development">Web Development</option>
            <option value="graphic-design">Graphic Design</option>
            <option value="it-solutions">IT Solutions</option>
            <option value="consulting">Tech Consulting</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Project Budget</label>
        <select className="w-full bg-slate-800 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
          <option value="">Select budget range</option>
          <option value="1000-5000">$1,000 - $5,000</option>
          <option value="5000-10000">$5,000 - $10,000</option>
          <option value="10000-25000">$10,000 - $25,000</option>
          <option value="25000+">$25,000+</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Project Details</label>
        <textarea
          rows={4}
          className="w-full bg-slate-800 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Tell me about your project, goals, and timeline..."
        ></textarea>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all"
      >
        <Send size={20} />
        Send Proposal Request
      </motion.button>
    </form>
  );
}