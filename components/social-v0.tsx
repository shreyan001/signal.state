'use client'
import React, { useState } from 'react'
import { Search, User, Wallet, Bell, Briefcase, ChevronRight, ChevronLeft, Send, DollarSign } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ConnectButton from './ui/WalletButton'


export default function Component() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAIOpen, setIsAIOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([])
  const [input, setInput] = useState('')
  const [activeSection, setActiveSection] = useState('search')

  const users = [
    { name: 'Bianc8.eth', id: '#1696', score: 140, verified: true },
    { name: 'leal.eth', id: '#1008', score: 136, verified: true, special: '🍊' },
    { name: 'limone.eth', id: '#1979', score: 129, verified: true, special: '🍋' },
    { name: 'join.base.eth', id: '#3231', score: 128, verified: true, special: '🐸' },
    { name: 'JulioMCruz.base.eth', id: '#1287', score: 123, verified: true },
    { name: 'Juampi @/build', id: '#1022', score: 117, verified: true, special: '🍊' },
    { name: 'Tamrat', id: '#353674', score: 117, verified: true },
  ]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setChatMessages([...chatMessages, { role: 'user', content: input }])
      setTimeout(() => {
        setChatMessages(prev => [...prev, { role: 'assistant', content: `Here's a response to your query: ${input}` }])
      }, 500)
      setInput('')
    }
  }

  const sidebarItems = [
    { icon: Search, label: 'Search', key: 'search' },
    { icon: User, label: 'Profile', key: 'profile' },
    { icon: Wallet, label: 'Wallet', key: 'wallet' },
    { icon: Bell, label: 'Notifications', key: 'notifications' },
    { icon: Briefcase, label: 'Jobs', key: 'jobs' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white text-black font-mono">
      {/* Navbar */}
      <nav className="bg-gray-100 border-b-4 border-black p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-[#39FF14]">L</span>
          <h1 className="text-xl font-bold">sign?.state( )</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-white px-3 py-1 rounded-md border-2 border-black shadow-[0_2px_0_rgba(0,0,0,1)]">
            <DollarSign className="w-5 h-5 text-[#39FF14] mr-2" />
            <span className="font-bold">USDT/INR: 82.45</span>
          </div>
         <ConnectButton />
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-16 bg-gray-100 flex flex-col items-center py-4 space-y-6 border-r-2 border-black">
          {sidebarItems.map((item, index) => (
            <button 
              key={index} 
              className={`p-2 hover:bg-gray-200 rounded-md transition-colors ${activeSection === item.key ? 'bg-[#39FF14] text-black' : ''}`}
              onClick={() => setActiveSection(item.key)}
            >
              <item.icon className="w-6 h-6" />
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-black">Wallet Directory</h1>
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by wallet address or username"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white text-black placeholder-gray-500 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-[#39FF14] border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)]"
                />
                <Search className="absolute left-3 top-2.5 text-gray-500" />
              </div>
            </div>
            <div className="space-y-4">
              {users
                .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-md border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)]">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold border-2 border-black">
                          {user.name[0]}
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-[#39FF14] text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold border border-black">
                          {user.score}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-1">
                          <span className="font-semibold">{user.name}</span>
                          {user.verified && <span className="text-[#39FF14]">✓</span>}
                          {user.special && <span>{user.special}</span>}
                        </div>
                        <div className="text-gray-500 text-xs">{user.id}</div>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-[#39FF14] text-black rounded-md font-bold text-sm hover:bg-[#32D612] transition-colors border-2 border-black shadow-[0_2px_0_rgba(0,0,0,1)]">
                      View Profile
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* AI Assistant Panel */}
        <AnimatePresence>
          <motion.div 
            className="w-96 bg-white overflow-hidden border-l-2 border-black flex flex-col"
            initial={{ width: "60px" }}
            animate={{ width: isAIOpen ? "384px" : "60px" }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', right: 0, top: 0, bottom: 0, zIndex: 50 }}
          >
            <button 
              className="absolute top-20 -left-3 transform bg-[#39FF14] text-black border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] hover:shadow-[0_2px_0_rgba(0,0,0,1)] active:shadow-none transition-all duration-200 z-10 rounded-full p-2"
              onClick={() => setIsAIOpen(!isAIOpen)}
            >
              {isAIOpen ? <ChevronRight /> : <ChevronLeft />}
            </button>
            
            {!isAIOpen && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-sm font-bold">
                AI Trading Assistant
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
                <div className="p-6 border-b-2 border-black">
                  <h2 className="text-xl font-bold mb-4 text-black">AI Trading Assistant</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`p-2 rounded-md ${msg.role === 'user' ? 'bg-[#39FF14] text-black ml-8' : 'bg-gray-200 text-black mr-8'} border-2 border-black shadow-[0_2px_0_rgba(0,0,0,1)]`}>
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
                      className="flex-grow bg-white text-black border-2 border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#39FF14] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
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
      </div>
    </div>
  )
}