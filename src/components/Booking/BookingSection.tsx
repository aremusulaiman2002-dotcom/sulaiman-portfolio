// Create: src/components/Booking/BookingSection.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle, X } from 'lucide-react';

const BookingSection = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    { id: 'consultation', name: 'Free Consultation', duration: '30 min', price: 'Free' },
    { id: 'web-dev', name: 'Web Development', duration: '1 hour', price: '$150' },
    { id: 'design', name: 'Design Discussion', duration: '45 min', price: '$100' },
    { id: 'tech', name: 'Tech Strategy', duration: '1 hour', price: '$200' },
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitted(true);
    
    // Here you would integrate with:
    // 1. Calendar service (Google Calendar, Cal.com)
    // 2. Email notification (SendGrid, Nodemailer)
    // 3. Database storage
  };

  const resetBooking = () => {
    setSelectedService('');
    setSelectedDate(null);
    setSelectedTime('');
    setStep(1);
    setIsSubmitted(false);
    setFormData({ name: '', email: '', phone: '', company: '', message: '' });
  };

  if (isSubmitted) {
    return (
      <section id="booking" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/30"
          >
            <CheckCircle size={64} className="text-cyan-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Booking Confirmed!</h3>
            <p className="text-gray-400 mb-6">
              Thank you for booking a session. You'll receive a confirmation email with calendar details shortly.
            </p>
            <div className="bg-slate-700/30 rounded-lg p-4 mb-6">
              <p className="text-cyan-300 font-semibold">{services.find(s => s.id === selectedService)?.name}</p>
              <p className="text-gray-400">
                {selectedDate?.toLocaleDateString()} at {selectedTime}
              </p>
            </div>
            <button
              onClick={resetBooking}
              className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors"
            >
              Book Another Session
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

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
            Ready to start your project? Let's discuss your ideas and how we can bring them to life.
          </p>
        </motion.div>

        {/* Booking Steps */}
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step >= stepNumber
                    ? 'bg-cyan-500 border-cyan-500 text-white'
                    : 'border-gray-600 text-gray-400'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNumber ? 'bg-cyan-500' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Service Selection */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/30"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <User className="mr-2" size={24} />
                Select Service
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedService === service.id
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-gray-600 bg-slate-700/30 hover:border-cyan-400'
                    }`}
                  >
                    <h4 className="font-bold text-white mb-2">{service.name}</h4>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{service.duration}</span>
                      <span className="text-cyan-300">{service.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!selectedService}
                className="w-full bg-cyan-500 text-white py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-600 transition-colors"
              >
                Continue to Date & Time
              </button>
            </motion.div>
          )}

          {/* Step 2: Date & Time Selection */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/30"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Calendar className="mr-2" size={24} />
                Select Date & Time
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Date Picker */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Select Date
                  </label>
                  <div className="grid grid-cols-7 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                      <div
                        key={day}
                        onClick={() => setSelectedDate(new Date(Date.now() + day * 24 * 60 * 60 * 1000))}
                        className={`p-3 text-center rounded-lg cursor-pointer ${
                          selectedDate?.getDate() === new Date(Date.now() + day * 24 * 60 * 60 * 1000).getDate()
                            ? 'bg-cyan-500 text-white'
                            : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                        }`}
                      >
                        {new Date(Date.now() + day * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                          weekday: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Available Times
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <div
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 text-center rounded-lg cursor-pointer ${
                          selectedTime === time
                            ? 'bg-cyan-500 text-white'
                            : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                        }`}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-slate-700 text-white py-4 rounded-lg font-semibold hover:bg-slate-600 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1 bg-cyan-500 text-white py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-600 transition-colors"
                >
                  Continue to Details
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Contact Information */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/30"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <MessageSquare className="mr-2" size={24} />
                Your Information
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-slate-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-slate-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-slate-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full bg-slate-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="Company name (optional)"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Details
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Tell me about your project, goals, and any specific requirements..."
                  />
                </div>

                {/* Booking Summary */}
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="font-bold text-white mb-2">Booking Summary</h4>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>Service: {services.find(s => s.id === selectedService)?.name}</p>
                    <p>Date: {selectedDate?.toLocaleDateString()}</p>
                    <p>Time: {selectedTime}</p>
                    <p className="text-cyan-300">Price: {services.find(s => s.id === selectedService)?.price}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 bg-slate-700 text-white py-4 rounded-lg font-semibold hover:bg-slate-600 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-cyan-500 text-white py-4 rounded-lg font-semibold hover:bg-cyan-600 transition-colors flex items-center justify-center"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingSection;