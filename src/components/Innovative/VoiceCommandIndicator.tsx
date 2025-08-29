'use client';

import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';
import { useEffect, useState } from 'react'; // Add this import

const VoiceCommandIndicator = () => {
  const { isListening } = useVoiceCommands();
  const [isClient, setIsClient] = useState(false); // Add this state

  // Add this useEffect to detect client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render anything during server-side rendering
  if (!isClient) {
    return null;
  }

  // Now this check is safe - it only runs on the client
  if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
    return null; // Don't show if not supported
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-20 left-4 z-50"
    >
      <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-white text-sm font-medium ${
        isListening 
          ? 'bg-gradient-to-r from-red-500 to-pink-600 shadow-lg' 
          : 'bg-gradient-to-r from-green-500 to-emerald-600'
      }`}>
        {isListening ? (
          <>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <MicOff size={16} />
            </motion.div>
            <span>Listening...</span>
          </>
        ) : (
          <>
            <Mic size={16} />
            <span>Voice Ready</span>
          </>
        )}
      </div>
      
      {/* Voice command hints */}
      {!isListening && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-2 p-3 bg-slate-800/90 backdrop-blur-md rounded-lg border border-cyan-500/30 text-xs text-gray-300 max-w-xs"
        >
          <p className="font-semibold text-cyan-400 mb-1">Try saying:</p>
          <ul className="space-y-1">
            <li>"Show projects"</li>
            <li>"Go home"</li>
            <li>"Open chat"</li>
            <li>"Show skills"</li>
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VoiceCommandIndicator;