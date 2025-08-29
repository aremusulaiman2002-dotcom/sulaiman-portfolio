'use client';

import { motion } from 'framer-motion';
import { Code2, Palette, Server, ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Add this function to scroll to the contact section
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent animate-pulse"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 max-w-6xl mx-auto"
      >
        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          Sulaiman Aremu
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Crafting <span className="text-cyan-400 font-semibold">digital experiences</span> through 
          innovative coding, stunning design and cutting-edge IT solutions
        </motion.p>

        {/* Skills badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { icon: <Code2 size={20} />, text: "Web Development", color: "from-cyan-500 to-cyan-600" },
            { icon: <Palette size={20} />, text: "Graphic Design", color: "from-purple-500 to-purple-600" },
            { icon: <Server size={20} />, text: "IT Solutions", color: "from-blue-500 to-blue-600" }
          ].map((skill, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${skill.color} text-white shadow-lg border border-white/10`}
            >
              {skill.icon}
              <span className="text-sm font-medium">{skill.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToProjects}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-lg font-semibold text-white shadow-xl hover:shadow-2xl transition-all"
          >
            View My Work
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            className="px-8 py-4 bg-white/10 rounded-lg text-lg font-semibold text-white border border-white/20 hover:bg-white/20 transition-all"
          >
            Contact Me
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400 hover:text-cyan-400 cursor-pointer"
            onClick={scrollToProjects}
          >
            <ArrowDown size={24} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;