'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Calendar } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "aremusulaiman2002@gmail.com",
      link: "mailto:aremusulaiman2002@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+234 7073504211",
      link: "tel:+2347073504211"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Available Worldwide",
      link: "#"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get In <span className="text-cyan-400">Touch</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to start your next project? Let's discuss how we can work together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Let's Connect</h3>
            <div className="space-y-6 mb-8">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <motion.a
                    key={index}
                    href={method.link}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center p-4 bg-slate-800/50 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all group"
                  >
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-cyan-500/20 transition-colors">
                      <IconComponent size={24} className="text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">{method.label}</div>
                      <div className="text-white font-semibold">{method.value}</div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
            <div className="space-y-4">
              <motion.a
                href="#booking"
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all group"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center mr-4">
                    <Calendar size={20} className="text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Book a Consultation</div>
                    <div className="text-cyan-400 text-sm">Schedule a free call</div>
                  </div>
                </div>
                <div className="text-cyan-400 group-hover:translate-x-1 transition-transform">→</div>
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="your.email@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                <input type="text" name="subject" required value={formData.subject} onChange={handleInputChange} className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="What's this about?" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                <textarea name="message" rows={5} required value={formData.message} onChange={handleInputChange} className="w-full bg-slate-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="Tell me about your project..." />
              </div>
              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2">
                <Send size={20} /> Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// MAKE SURE THIS LINE IS AT THE END:
export default ContactSection;