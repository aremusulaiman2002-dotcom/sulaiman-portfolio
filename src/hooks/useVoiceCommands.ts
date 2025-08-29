import { useState, useEffect } from 'react';

export const useVoiceCommands = () => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const commands: { [key: string]: () => void } = {
      'go home': () => scrollToSection('#home'),
      'show projects': () => scrollToSection('#projects'),
      'show skills': () => scrollToSection('#skills'),
      'show about': () => scrollToSection('#about'),
      'show contact': () => scrollToSection('#contact'),
      'open chat': () => {
        const chatBtn = document.querySelector('[aria-label="Open chat"]') as HTMLElement;
        chatBtn?.click();
      },
      'close chat': () => {
        const closeBtn = document.querySelector('[aria-label="Close chat"]') as HTMLElement;
        closeBtn?.click();
      }
    };

    const scrollToSection = (selector: string) => {
      const element = document.querySelector(selector);
      element?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleVoiceCommand = (transcript: string) => {
      const command = Object.keys(commands).find(cmd => 
        transcript.toLowerCase().includes(cmd)
      );
      
      if (command) {
        commands[command]();
        return true;
      }
      return false;
    };

    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        console.log('Voice recognition started');
      };
      
      recognition.onend = () => {
        setIsListening(false);
        console.log('Voice recognition ended');
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        console.log('Voice command:', transcript);
        handleVoiceCommand(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      try {
        recognition.start();
      } catch (error) {
        console.warn('Speech recognition not supported or permission denied');
      }

      return () => {
        try {
          recognition.stop();
        } catch (error) {
          console.log('Recognition already stopped');
        }
      };
    } else {
      console.warn('Speech Recognition API not supported in this browser');
    }
  }, []);

  return { isListening };
};