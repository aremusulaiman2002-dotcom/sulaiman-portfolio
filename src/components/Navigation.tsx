// src/components/Navigation/Navigation.tsx (SMOOTHER SCROLL)
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Code2, 
  Sparkles, 
  Home, 
  Zap, 
  Briefcase, 
  Settings, 
  User, 
  Mail 
} from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  const navItems = [
    { name: 'Home', href: '#home', icon: <Home size={18} /> },
    { name: 'Services', href: '#services', icon: <Zap size={18} /> },
    { name: 'Projects', href: '#projects', icon: <Briefcase size={18} /> },
    { name: 'Skills', href: '#skills', icon: <Settings size={18} /> },
    { name: 'About', href: '#about', icon: <User size={18} /> },
    { name: 'Contact', href: '#contact', icon: <Mail size={18} /> },
  ];

  // Custom smooth scroll function with slower speed
  const smoothScrollTo = (targetPosition: number, duration: number = 1500) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    // Easing function for smooth acceleration and deceleration
    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  };

  const scrollToSection = async (href: string) => {
    // Close menu immediately for mobile
    if (isMobile) {
      setIsOpen(false);
      // Wait for menu animation to complete and DOM to update
      await new Promise(resolve => setTimeout(resolve, 350));
    }
    
    try {
      const element = document.querySelector(href);
      if (!element) {
        console.error(`Element not found: ${href}`);
        return;
      }
      
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const offset = 80; // Height of your fixed navbar
      const targetPosition = absoluteElementTop - offset;
      
      // Use custom smooth scroll instead of native smooth scroll
      smoothScrollTo(targetPosition, 1200); // 1200ms = 1.2 seconds duration
      
    } catch (error) {
      console.error('Error scrolling to section:', error);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-cyan-500/20 shadow-2xl' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => scrollToSection('#home')}
          >
            <div className="relative">
              <Code2 className="text-cyan-400 group-hover:text-purple-400 transition-colors" size={28} />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 bg-cyan-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              SulaimanDev
            </span>
            <Sparkles className="text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
          </motion.div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-300 hover:text-cyan-400 transition-colors font-medium flex items-center gap-2 group text-sm lg:text-base"
              >
                <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                  {item.icon}
                </span>
                {item.name}
              </motion.button>
            ))}
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#booking')}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-2xl hover:shadow-cyan-500/30 transition-all flex items-center gap-2 group text-sm lg:text-base"
            >
              <span className="group-hover:animate-bounce">🚀</span>
              Book Consultation
            </motion.button>
          </div>

          {/* Mobile Menu Button - Visible only on mobile */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-gray-300 hover:text-cyan-400 transition-colors p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation - Slides down from top */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="bg-slate-800/95 backdrop-blur-md rounded-lg p-4 border border-cyan-500/20">
                <div className="flex flex-col gap-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection(item.href)}
                      className="text-gray-300 hover:text-cyan-400 transition-colors text-left py-3 px-4 rounded-lg hover:bg-slate-700/50 flex items-center gap-3 text-base"
                    >
                      {item.icon}
                      {item.name}
                    </motion.button>
                  ))}
                  
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection('#booking')}
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium mt-2 flex items-center justify-center gap-2 text-base"
                  >
                    <span className="animate-pulse">🚀</span>
                    Book Consultation
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;