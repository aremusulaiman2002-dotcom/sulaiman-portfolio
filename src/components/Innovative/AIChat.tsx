'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, X, Mic, MicOff } from 'lucide-react';

// Simulated AI response function (replace with actual Gemini API later)
const simulateAIResponse = async (userMessage: string): Promise<string> => {
  // This is a simulation - replace with actual Gemini API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const responses = [
        `I'm Sulaiman's AI assistant! He's an expert in ${userMessage.toLowerCase()} and would love to discuss this with you.`,
        `Sulaiman has extensive experience with ${userMessage.toLowerCase()}. He's currently working on innovative projects in this area.`,
        `Great question about ${userMessage.toLowerCase()}! Sulaiman is passionate about this technology and has built several projects using it.`,
        `Sulaiman is proficient in ${userMessage.toLowerCase()} and enjoys pushing the boundaries of what's possible with this technology.`
      ];
      resolve(responses[Math.floor(Math.random() * responses.length)]);
    }, 1000);
  });
};

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Get AI response
    const aiResponse = await simulateAIResponse(input);
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
  };

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      console.warn('Speech recognition not supported in this browser');
      setInput('Voice input is not supported in your browser');
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-2xl flex items-center justify-center"
        aria-label="Open chat"
      >
        <Bot size={24} />
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, x: 100 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 100, x: 100 }}
            className="fixed bottom-24 right-8 z-50 w-96 h-96 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-cyan-500/30 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-cyan-500/20 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="text-cyan-400" size={20} />
                <span className="text-cyan-400 font-semibold">Sulaiman's AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="text-center text-gray-400 mt-16">
                  <Bot size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Hi! I'm Sulaiman's AI assistant. Ask me about his skills, projects, or experience!</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
                  >
                    <div className={`inline-block px-3 py-2 rounded-lg max-w-xs ${
                      msg.role === 'user' 
                        ? 'bg-cyan-600 text-white' 
                        : 'bg-slate-800 text-gray-200'
                    }`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-cyan-500/20">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me about Sulaiman's work..."
                  className="flex-1 bg-slate-800 border border-cyan-500/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  onClick={startVoiceInput}
                  className={`p-2 rounded-lg ${
                    isListening ? 'bg-red-500' : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                  title="Voice input"
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                </button>
                <button
                  onClick={handleSend}
                  className="p-2 bg-cyan-600 rounded-lg hover:bg-cyan-500"
                  title="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;