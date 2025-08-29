// src/components/About/AboutSection.tsx
'use client';
import { motion } from 'framer-motion';
import { User, Award, Clock, Heart, Download } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    { icon: Award, label: "Projects Completed", value: "50+" },
    { icon: Clock, label: "Hours Coded", value: "5000+" },
    { icon: User, label: "Happy Clients", value: "25+" },
    { icon: Heart, label: "Coffee Cups", value: "1000+" }
  ];

  return (
    <section id="about" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Profile Image Placeholder */}
            <div className="w-full h-96 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl flex items-center justify-center">
              <User size={80} className="text-cyan-400 opacity-50" />
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-800/50 backdrop-blur-md rounded-xl p-4 text-center border border-cyan-500/20"
                  >
                    <IconComponent size={32} className="text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About <span className="text-cyan-400">Me</span>
            </h2>
            
            <p className="text-gray-400 text-lg mb-6">
              Hello! I'm Sulaiman, a passionate full-stack developer and digital creator with 
              over 5 years experience in building innovative web and mobile solutions.
            </p>
            
            <p className="text-gray-400 text-lg mb-6">
              My journey into the tech industry started with curiosity and has evolved into a career 
              dedicated to creating meaningful digital solutions that solve real-world problems 
              and drive business growth.
            </p>

            <p className="text-gray-400 text-lg mb-8">
              When I'm not coding, you can find me exploring new technologies, contributing to 
              open-source projects, or sharing knowledge with the developer community.
            </p>

            {/* Key Focus Areas */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">What I Focus On:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Clean, maintainable code",
                  "User-centered design",
                  "Performance optimization",
                  "Scalable architecture",
                  "Security best practices",
                  "Continuous learning"
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="/resume.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors flex items-center gap-2"
              >
                <Download size={20} />
                Download Resume
              </motion.a>
              
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-cyan-500 text-cyan-400 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-500/10 transition-colors"
              >
                Let's Talk
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;