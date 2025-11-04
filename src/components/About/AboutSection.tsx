// src/components/About/AboutSection.tsx
'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Award, Clock, User, Heart, Download, X, Eye } from 'lucide-react';
import Image from 'next/image';

const AboutSection = () => {
  const [showResumeModal, setShowResumeModal] = useState(false);

  const stats = [
    { icon: Award, label: "Projects Completed", value: "50+" },
    { icon: Clock, label: "Hours Coded", value: "5000+" },
    { icon: User, label: "Happy Clients", value: "25+" },
    { icon: Heart, label: "Coffee Cups", value: "1000+" }
  ];

  return (
    <>
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
              {/* Profile Image */}
              <div className="w-full h-96 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl overflow-hidden relative">
                <Image
                  src="/images/about/profile.jpg"
                  alt="Sulaiman - Full Stack Developer"
                  fill
                  className="object-cover object-top"
                  priority
                />
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
                <motion.button
                  onClick={() => setShowResumeModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors flex items-center gap-2"
                >
                  <Eye size={20} />
                  View Resume
                </motion.button>
                
                <motion.a
                  href="/documents/resume.pdf"  // Updated path
                  download="Sulaiman_Resume.pdf"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-cyan-500 text-cyan-400 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-500/10 transition-colors flex items-center gap-2"
                >
                  <Download size={20} />
                  Download PDF
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

      {/* Resume Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-slate-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-cyan-500/20"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-700">
              <h3 className="text-white text-2xl font-bold">My Resume</h3>
              <button
                onClick={() => setShowResumeModal(false)}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* PDF Viewer */}
            <div className="h-[70vh] bg-slate-900">
              <iframe
                src="/documents/resume.pdf"  // Updated path
                className="w-full h-full"
                title="Sulaiman's Resume"
              />
            </div>
            
            {/* Modal Footer */}
            <div className="flex justify-between items-center p-6 border-t border-slate-700">
              <p className="text-gray-400 text-sm">
                Having trouble viewing? Download the PDF instead.
              </p>
              <motion.a
                href="/documents/resume.pdf"  // Updated path
                download="Sulaiman_Resume.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors flex items-center gap-2"
                onClick={() => setShowResumeModal(false)}
              >
                <Download size={20} />
                Download PDF
              </motion.a>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default AboutSection;