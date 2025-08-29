// src/components/Footer/Footer.tsx (UPDATED)
'use client';
import { motion } from 'framer-motion';
import { Code2, Mail, Github, Linkedin, Twitter, Heart, ArrowUp, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link'; // Added Link import

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/sulaiman-aremu", label: "LinkedIn" }, // Fixed LinkedIn URL
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:aremusulaiman2002@gmail.com", label: "Email" }
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const bottomThreshold = 100;
      
      const isAtBottom = scrollTop + windowHeight >= documentHeight - bottomThreshold;
      setShowScrollTop(isAtBottom);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-cyan-500/20 relative">
      {/* Scroll to top button with lower z-index */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 bg-cyan-500 text-white p-3 rounded-full shadow-2xl hover:bg-cyan-600 transition-colors z-30"
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="text-cyan-400" size={28} />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                SulaimanDev
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Creating innovative digital solutions that drive business growth and user engagement.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-slate-700 transition-colors"
                    aria-label={social.label}
                  >
                    <IconComponent size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors hover:translate-x-1 transform duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Services</h3>
            <ul className="space-y-3">
              {["Web Development", "Mobile Apps", "UI/UX Design", "Consultation", "Maintenance"].map((service, index) => (
                <li key={index}>
                  <span className="text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-cyan-400" />
                <a 
                  href="mailto:aremusulaiman2002@gmail.com" 
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  aremusulaiman2002@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-cyan-400" />
                <a 
                  href="tel:+2347073504211" 
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  +234 707 350 4211
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm flex items-center">
            © {currentYear} SulaimanDev. Made with <Heart size={14} className="text-red-400 mx-1" /> and Next.js
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;