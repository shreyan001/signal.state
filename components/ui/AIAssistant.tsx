import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Send, Sparkles } from 'lucide-react';

export default function AIAssistant() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setChatMessages([...chatMessages, { role: 'user', content: input }]);
      setTimeout(() => {
        setChatMessages(prev => [...prev, { role: 'assistant', content: `Here's a response to your query: ${input}` }]);
      }, 500);
      setInput('');
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="bg-white overflow-hidden border-2 border-black shadow-lg flex flex-col"
        initial={{ width: "60px" }}
        animate={{ width: isAIOpen ? "384px" : "60px" }}
        transition={{ duration: 0.3 }}
        style={{ 
          position: 'fixed', 
          right: 0, 
          top: 'calc(10% + 60px)',
          height: 'calc(80% - 60px)',
          zIndex: 40
        }}
      >
        <button 
          className="absolute top-20 -left-3 transform bg-[#39FF14] text-black border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200 z-10 rounded-full p-2"
          onClick={() => setIsAIOpen(!isAIOpen)}
        >
          {isAIOpen ? <ChevronRight /> : <ChevronLeft />}
        </button>
        
        {!isAIOpen && (
          <div className="h-full flex flex-col items-center justify-between py-8">
            <div className="flex-grow" />
            <div className="text-[17px] font-bold text-black -rotate-90 whitespace-nowrap">
              AI Assistant
            </div>
            <div className="flex-grow flex items-end">
              <Sparkles size={16} className="text-[#39FF14] mb-4" />
            </div>
          </div>
        )}
        
        {isAIOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col h-full"
          >
            <div className="p-6 border-b-2 border-black flex items-center space-x-3">
              <Sparkles size={24} className="text-[#39FF14]" />
              <h2 className="text-xl font-bold text-black">AI Assistant</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`p-2 rounded-md ${msg.role === 'user' ? 'bg-[#39FF14] text-black ml-8' : 'bg-blue-100 text-black mr-8'} border-2 border-black shadow-[0_2px_0_rgba(0,0,0,1)]`}>
                  {msg.content}
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t-2 border-black">
              <div className="flex space-x-2">
                <input 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  placeholder="Ask me anything..." 
                  className="flex-grow bg-white text-black border-2 border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#39FF14] focus:border-[#39FF14] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
                />
                <button type="submit" className="bg-[#39FF14] text-black px-4 py-2 rounded-md hover:bg-[#32D612] transition-colors border-2 border-black shadow-[0_2px_0_rgba(0,0,0,1)]">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
