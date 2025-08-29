// src/components/Testimonials/TestimonialsSection.tsx
'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO at TechStart",
      content: "Sulaiman delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise are unmatched.",
      rating: 5,
      project: "E-Commerce Website"
    },
    {
      name: "Michael Chen",
      role: "Product Manager at InnovateCo",
      content: "Working with Sulaiman was a game-changer for our mobile app. He transformed our vision into a polished, high-performance application.",
      rating: 5,
      project: "Mobile Fitness App"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director at GrowthLab",
      content: "The dashboard Sulaiman built revolutionized our data analysis capabilities. His solutions are both technically sound and user-friendly.",
      rating: 5,
      project: "Analytics Dashboard"
    },
    {
      name: "David Thompson",
      role: "CTO at DataFlow Systems",
      content: "Sulaiman's expertise in backend development helped us scale our platform to handle millions of users efficiently.",
      rating: 5,
      project: "Backend Optimization"
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextTestimonial(); // Swipe left
    }
    if (touchStart - touchEnd < -50) {
      prevTestimonial(); // Swipe right
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevTestimonial();
      if (e.key === 'ArrowRight') nextTestimonial();
      if (e.key === ' ') setIsPaused(prev => !prev);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextTestimonial, prevTestimonial]);

  return (
    <section id="testimonials" className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Client <span className="text-cyan-400">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Here's what clients and colleagues have to say about working with me.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div 
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/20 relative"
              >
                <Quote className="absolute top-6 left-6 text-cyan-400/20" size={32} />
                
                {/* Rating */}
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < testimonials[currentTestimonial].rating 
                        ? "text-yellow-400 fill-current" 
                        : "text-gray-600"
                      }
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 text-lg mb-8 italic leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </p>

                {/* Client Info */}
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full mr-4 flex items-center justify-center">
                    <div className="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonials[currentTestimonial].name[0]}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-cyan-400 text-sm">{testimonials[currentTestimonial].role}</p>
                    <p className="text-gray-500 text-sm">{testimonials[currentTestimonial].project}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700">
                  <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                    key={currentTestimonial}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
              {/* Play/Pause Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPaused(!isPaused)}
                className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-cyan-400"
                aria-label={isPaused ? "Play" : "Pause"}
              >
                {isPaused ? <Play size={20} /> : <Pause size={20} />}
              </motion.button>

              {/* Navigation Arrows */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-gray-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </motion.button>

              {/* Dots Indicator */}
              <div className="flex gap-2 mx-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentTestimonial 
                        ? 'bg-cyan-400 scale-110' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-gray-300"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;