'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, Check, Clock, Shield, Zap, Mail, Phone, User, Building } from 'lucide-react';
import { PackageSelection } from '@/types/package';
import { sendPackageInquiry } from '@/utils/packageEmailService';
import { PackageDeal } from '@/data/services';

interface PackageWizardProps {
  isOpen: boolean;
  onClose: () => void;
  packageDeals: PackageDeal[];
}

const PackageWizard = ({ isOpen, onClose, packageDeals }: PackageWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<PackageDeal | null>(null);
  const [selection, setSelection] = useState<Partial<PackageSelection>>({
    addons: [],
    timeline: 'standard',
    supportLevel: 'basic',
    projectDetails: '',
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      company: ''
    }
  });

  const addons = [
    { 
      id: 'seo', 
      name: 'SEO Optimization', 
      price: 299,
      priceDisplay: '+$299' 
    },
    { 
      id: 'ecommerce', 
      name: 'E-commerce Functionality', 
      price: 499,
      priceDisplay: '+$499' 
    },
    { 
      id: 'hosting', 
      name: '1 Year Premium Hosting', 
      price: 199,
      priceDisplay: '+$199' 
    },
    { 
      id: 'training', 
      name: 'Training Session', 
      price: 149,
      priceDisplay: '+$149' 
    }
  ];

  const steps = [
    { number: 1, title: 'Select Package' },
    { number: 2, title: 'Customize' },
    { number: 3, title: 'Project Details' },
    { number: 4, title: 'Your Information' },
    { number: 5, title: 'Review & Submit' }
  ];

  const calculateTotalPrice = () => {
    if (!selectedPackage) return '$0';
    const basePrice = parseInt(selectedPackage.price.replace(/[^\d]/g, '')) || 0;
    const addonsTotal = selection.addons?.reduce((total, addonId) => {
      const addon = addons.find(a => a.id === addonId);
      return total + (addon?.price || 0);
    }, 0) || 0;
    const timelineCost = selection.timeline === 'expedited' ? 299 : 0;
    const supportCost = selection.supportLevel === 'priority' ? 199 : 
                       selection.supportLevel === 'enterprise' ? 499 : 0;
    const total = basePrice + addonsTotal + timelineCost + supportCost;
    return `$${total.toLocaleString()}`;
  };

  const handleAddonToggle = (addonId: string) => {
    setSelection(prev => ({
      ...prev,
      addons: prev.addons?.includes(addonId)
        ? prev.addons.filter(id => id !== addonId)
        : [...(prev.addons || []), addonId]
    }));
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('contactInfo.')) {
      const contactField = field.split('.')[1];
      setSelection(prev => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo!,
          [contactField]: value
        }
      }));
    } else {
      setSelection(prev => ({ ...prev, [field]: value }));
    }
  };

  const createMeetingDescription = () => {
    let description = `Package: ${selectedPackage?.name} (${selectedPackage?.price})\nFinal Total: ${calculateTotalPrice()}\n\nBreakdown:\n- Base Package: ${selectedPackage?.price}\n`;
    if (selection.addons && selection.addons.length > 0) {
      selection.addons.forEach(addonId => {
        const addon = addons.find(a => a.id === addonId);
        if (addon) description += `- ${addon.name}: ${addon.priceDisplay}\n`;
      });
    }
    if (selection.timeline === 'expedited') description += '- Expedited Timeline: +$299\n';
    if (selection.supportLevel !== 'basic') {
      description += `- ${selection.supportLevel} Support: ${selection.supportLevel === 'priority' ? '+$199' : '+$499'}\n`;
    }
    description += `\nProject Details:\n${selection.projectDetails || 'No details provided'}\n\nContact Information:\nName: ${selection.contactInfo?.name || 'Not provided'}\nEmail: ${selection.contactInfo?.email || 'Not provided'}\nPhone: ${selection.contactInfo?.phone || 'Not provided'}\nCompany: ${selection.contactInfo?.company || 'Not provided'}`;
    return description.trim();
  };

  const handleSubmit = async () => {
    if (!selectedPackage) return;
    try {
      const result = await sendPackageInquiry({
        ...selection,
        package: selectedPackage,
        totalPrice: calculateTotalPrice(),
        meetingDescription: createMeetingDescription()
      });
      if (result.success) {
        window.open(`https://cal.com/sulaiman-aremu?notes=${encodeURIComponent(createMeetingDescription())}`, '_blank');
        onClose();
      } else {
        alert('Failed to send inquiry. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 rounded-2xl border border-cyan-500/30 w-full max-w-4xl max-h-[95vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-cyan-500/20 flex-shrink-0">
          <h2 className="text-2xl font-bold text-white">Customize Your Package</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-2">
            <X size={24} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 bg-slate-800/50 flex-shrink-0">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= step.number ? 'bg-cyan-500 border-cyan-500 text-white' : 'border-gray-600 text-gray-400'
                }`}>
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-1 mx-2 ${currentStep > step.number ? 'bg-cyan-500' : 'bg-gray-600'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content - Scrollable area */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Package Selection */}
            {currentStep === 1 && (
              <motion.div key="step-1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">Select a Package</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packageDeals.map((pkg) => (
                    <div key={pkg.id} onClick={() => setSelectedPackage(pkg)} className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedPackage?.id === pkg.id ? 'border-cyan-500 bg-cyan-500/10' : 'border-gray-600 bg-slate-800/50 hover:border-cyan-400'
                    } ${pkg.popular ? 'ring-2 ring-cyan-500/30' : ''}`}>
                      {pkg.popular && <div className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3 inline-block">Most Popular</div>}
                      <h4 className="text-lg font-bold text-white mb-2">{pkg.name}</h4>
                      <div className="text-2xl font-bold text-cyan-400 mb-3">{pkg.price}</div>
                      <p className="text-gray-400 mb-4">{pkg.description}</p>
                      <ul className="space-y-2">
                        {pkg.features.slice(0, 4).map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-300">
                            <Check size={16} className="text-cyan-400 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Customization */}
            {currentStep === 2 && (
              <motion.div key="step-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                {/* Price Summary */}
                <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 p-4 rounded-lg border border-cyan-500/20">
                  <div className="flex justify-between items-center">
                    <div><h4 className="text-white font-semibold">Package: {selectedPackage?.name}</h4><p className="text-cyan-400 text-sm">{selectedPackage?.price}</p></div>
                    <div className="text-right"><p className="text-gray-400 text-sm">Total:</p><div className="text-2xl font-bold text-green-400">{calculateTotalPrice()}</div></div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-4">Customize Your Package</h3>
                
                {/* Addons */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center"><Zap size={20} className="text-cyan-400 mr-2" />Additional Services</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {addons.map((addon) => (
                      <label key={addon.id} className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selection.addons?.includes(addon.id) ? 'border-cyan-500 bg-cyan-500/10' : 'border-gray-600 bg-slate-800/50 hover:border-cyan-400'
                      }`}>
                        <div className="flex items-center">
                          <input type="checkbox" checked={selection.addons?.includes(addon.id)} onChange={() => handleAddonToggle(addon.id)} className="hidden" />
                          <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                            selection.addons?.includes(addon.id) ? 'bg-cyan-500 border-cyan-500' : 'border-gray-500'
                          }`}>
                            {selection.addons?.includes(addon.id) && <Check size={14} className="text-white" />}
                          </div>
                          <div className="text-white font-medium">{addon.name}</div>
                        </div>
                        <div className="text-cyan-400 font-semibold">{addon.priceDisplay}</div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center"><Clock size={20} className="text-cyan-400 mr-2" />Project Timeline</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[{ id: 'standard', label: 'Standard (2-4 weeks)', price: '+$0' }, { id: 'expedited', label: 'Expedited (1-2 weeks)', price: '+$299' }].map((option) => (
                      <label key={option.id} className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selection.timeline === option.id ? 'border-cyan-500 bg-cyan-500/10' : 'border-gray-600 bg-slate-800/50 hover:border-cyan-400'
                      }`}>
                        <input type="radio" name="timeline" value={option.id} checked={selection.timeline === option.id} onChange={(e) => handleInputChange('timeline', e.target.value)} className="hidden" />
                        <div className="flex justify-between items-center">
                          <div className="text-white font-medium">{option.label}</div>
                          <div className="text-cyan-400 font-semibold">{option.price}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Support Level */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center"><Shield size={20} className="text-cyan-400 mr-2" />Support Level</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[{ id: 'basic', label: 'Basic', price: '+$0' }, { id: 'priority', label: 'Priority', price: '+$199' }, { id: 'enterprise', label: 'Enterprise', price: '+$499' }].map((option) => (
                      <label key={option.id} className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selection.supportLevel === option.id ? 'border-cyan-500 bg-cyan-500/10' : 'border-gray-600 bg-slate-800/50 hover:border-cyan-400'
                      }`}>
                        <input type="radio" name="supportLevel" value={option.id} checked={selection.supportLevel === option.id} onChange={(e) => handleInputChange('supportLevel', e.target.value)} className="hidden" />
                        <div className="flex flex-col justify-between h-full">
                          <div className="text-white font-medium">{option.label}</div>
                          <div className="text-cyan-400 font-semibold text-right mt-2">{option.price}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Project Details */}
            {currentStep === 3 && (
              <motion.div key="step-3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">Tell Us About Your Project</h3>
                
                <div className="bg-slate-800/50 p-6 rounded-lg border border-cyan-500/20">
                  <label className="block text-white font-medium mb-3">
                    Project Description
                  </label>
                  <textarea
                    value={selection.projectDetails}
                    onChange={(e) => handleInputChange('projectDetails', e.target.value)}
                    placeholder="Describe your project goals, target audience, timeline expectations, and any specific requirements..."
                    className="w-full h-40 p-4 bg-slate-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    The more details you provide, the better we can tailor our solution to your needs.
                  </p>
                </div>

                {/* Current Selection Summary */}
                <div className="bg-slate-800/50 p-4 rounded-lg border border-cyan-500/20">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-3">Your Selection So Far</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Package:</span>
                      <span className="text-white">{selectedPackage?.name} ({selectedPackage?.price})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Timeline:</span>
                      <span className="text-white">{selection.timeline === 'expedited' ? 'Expedited (1-2 weeks)' : 'Standard (2-4 weeks)'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Support:</span>
                      <span className="text-white capitalize">{selection.supportLevel}</span>
                    </div>
                    {selection.addons && selection.addons.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-300">Addons:</span>
                        <span className="text-white">{selection.addons.length} selected</span>
                      </div>
                    )}
                    <div className="border-t border-gray-600 pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span className="text-cyan-400">Current Total:</span>
                        <span className="text-green-400">{calculateTotalPrice()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Contact Information */}
            {currentStep === 4 && (
              <motion.div key="step-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">Your Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-cyan-500/20">
                    <label className="block text-white font-medium mb-2 flex items-center">
                      <User size={16} className="mr-2 text-cyan-400" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={selection.contactInfo?.name}
                      onChange={(e) => handleInputChange('contactInfo.name', e.target.value)}
                      className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-cyan-500/20">
                    <label className="block text-white font-medium mb-2 flex items-center">
                      <Mail size={16} className="mr-2 text-cyan-400" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={selection.contactInfo?.email}
                      onChange={(e) => handleInputChange('contactInfo.email', e.target.value)}
                      className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-cyan-500/20">
                    <label className="block text-white font-medium mb-2 flex items-center">
                      <Phone size={16} className="mr-2 text-cyan-400" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={selection.contactInfo?.phone}
                      onChange={(e) => handleInputChange('contactInfo.phone', e.target.value)}
                      className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                      placeholder="080-1234-5678"
                    />
                  </div>
                  
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-cyan-500/20">
                    <label className="block text-white font-medium mb-2 flex items-center">
                      <Building size={16} className="mr-2 text-cyan-400" />
                      Company
                    </label>
                    <input
                      type="text"
                      value={selection.contactInfo?.company}
                      onChange={(e) => handleInputChange('contactInfo.company', e.target.value)}
                      className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                      placeholder="Company Name (Optional)"
                    />
                  </div>
                </div>

                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/20">
                  <h4 className="text-cyan-400 font-semibold mb-2">Next Steps</h4>
                  <p className="text-gray-300 text-sm">
                    After submitting, we'll schedule a discovery call to discuss your project in detail and provide a formal proposal.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 5: Review & Submit */}
            {currentStep === 5 && (
              <motion.div key="step-5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">Review Your Package</h3>
                
                {/* Package Summary */}
                <div className="bg-slate-800/50 p-6 rounded-lg border border-cyan-500/20">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-4">Package Summary</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Selected Package:</span>
                      <span className="text-white font-medium">{selectedPackage?.name} ({selectedPackage?.price})</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-300">Timeline:</span>
                      <span className="text-white">
                        {selection.timeline === 'expedited' ? 'Expedited (1-2 weeks)' : 'Standard (2-4 weeks)'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-300">Support Level:</span>
                      <span className="text-white capitalize">{selection.supportLevel}</span>
                    </div>
                    
                    {selection.addons && selection.addons.length > 0 && (
                      <div>
                        <span className="text-gray-300">Addons:</span>
                        <ul className="text-white mt-1 space-y-1">
                          {selection.addons.map(addonId => {
                            const addon = addons.find(a => a.id === addonId);
                            return addon ? <li key={addonId} className="flex justify-between">• {addon.name} <span className="text-cyan-400">{addon.priceDisplay}</span></li> : null;
                          })}
                        </ul>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-600 pt-3 mt-3">
                      <div className="flex justify-between text-lg font-semibold">
                        <span className="text-cyan-400">Final Total:</span>
                        <span className="text-green-400">{calculateTotalPrice()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-slate-800/50 p-6 rounded-lg border border-cyan-500/20">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-4">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-300">Name:</span>
                      <p className="text-white">{selection.contactInfo?.name || 'Not provided'}</p>
                    </div>
                    <div>
                      <span className="text-gray-300">Email:</span>
                      <p className="text-white">{selection.contactInfo?.email || 'Not provided'}</p>
                    </div>
                    <div>
                      <span className="text-gray-300">Phone:</span>
                      <p className="text-white">{selection.contactInfo?.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <span className="text-gray-300">Company:</span>
                      <p className="text-white">{selection.contactInfo?.company || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                {selection.projectDetails && (
                  <div className="bg-slate-800/50 p-6 rounded-lg border border-cyan-500/20">
                    <h4 className="text-lg font-semibold text-cyan-400 mb-4">Project Details</h4>
                    <p className="text-white whitespace-pre-wrap">{selection.projectDetails}</p>
                  </div>
                )}

                {/* Confirmation */}
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/20">
                  <h4 className="text-green-400 font-semibold mb-2">Ready to Get Started?</h4>
                  <p className="text-gray-300 text-sm">
                    Click "Schedule Discovery Call" to book a meeting and discuss your project. We'll send a confirmation email with all the details.
                  </p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Navigation - Always visible at bottom */}
        <div className="p-4 border-t border-cyan-500/20 bg-slate-800/50 sticky bottom-0">
          <div className="flex justify-between">
            <button onClick={() => setCurrentStep(prev => prev - 1)} disabled={currentStep === 1} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors">
              <ArrowLeft size={18} /> Back
            </button>

            {currentStep < steps.length ? (
              <button onClick={() => {
                if (currentStep === 1 && !selectedPackage) {
                  alert('Please select a package first!');
                  return;
                }
                setCurrentStep(prev => prev + 1);
              }} disabled={currentStep === 1 && !selectedPackage} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-600 transition-colors">
                Next <ArrowRight size={18} />
              </button>
            ) : (
              <button onClick={handleSubmit} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors">
                <Check size={18} /> Schedule Discovery Call
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PackageWizard;