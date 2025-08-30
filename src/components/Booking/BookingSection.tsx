// src/components/Booking/BookingSection.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Mail, X } from 'lucide-react';
import CalComWidget from './CalComWidget';

const BookingSection = () => {
  const [showCalWidget, setShowCalWidget] = useState(false);

  return (
    <section id="booking" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Book a <span className="text-cyan-400">Session</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to start your project? Schedule a call and let's discuss how I can help bring your ideas to life.
          </p>
        </motion.div>

        {!showCalWidget ? (
          /* Booking CTA */
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/30 mb-8">
              <Calendar size={64} className="text-cyan-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Book Consultation</h3>
              <p className="text-gray-400 mb-6">
                Choose a time that works best for you. I'll send you a confirmation and calendar invite immediately.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="text-left p-4 bg-slate-700/30 rounded-lg">
                  <Clock size={24} className="text-cyan-400 mb-2" />
                  <h4 className="font-semibold text-white mb-1">Free Consultation</h4>
                  <p className="text-gray-400 text-sm">30-minute discovery call</p>
                </div>
                <div className="text-left p-4 bg-slate-700/30 rounded-lg">
                  <User size={24} className="text-cyan-400 mb-2" />
                  <h4 className="font-semibold text-white mb-1">Project Discussion</h4>
                  <p className="text-gray-400 text-sm">1-hour detailed planning</p>
                </div>
              </div>

              <button
                onClick={() => setShowCalWidget(true)}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/30 transition-all"
              >
                View Available Times
              </button>
            </div>

            {/* Contact alternatives */}
            <div className="text-center text-gray-400">
              <p>Prefer to email directly?</p>
              <a 
                href="mailto:aremusulaiman2002@gmail.com" 
                className="text-cyan-400 hover:text-cyan-300"
              >
                aremusulaiman2002@gmail.com
              </a>
            </div>
          </motion.div>
        ) : (
          /* Cal.com Widget */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Select a Time</h3>
              <button
                onClick={() => setShowCalWidget(false)}
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-lg"
              >
                <X size={18} /> Back
              </button>
            </div>
            
            <CalComWidget calLink="sulaiman-aremu" />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BookingSection;