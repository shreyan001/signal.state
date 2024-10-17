'use client'
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import AIAssistant from './ui/AIAssistant'; // Import the new component


export default function Component() {
  const [searchTerm, setSearchTerm] = useState('');
 
  const users = [
    { name: 'Bianc8.eth', id: '#1696', score: 140, verified: true },
    { name: 'leal.eth', id: '#1008', score: 136, verified: true, special: '🍊' },
    { name: 'limone.eth', id: '#1979', score: 129, verified: true, special: '🍋' },
    { name: 'join.base.eth', id: '#3231', score: 128, verified: true, special: '🐸' },
    { name: 'JulioMCruz.base.eth', id: '#1287', score: 123, verified: true },
    { name: 'Juampi @/build', id: '#1022', score: 117, verified: true, special: '🍊' },
    { name: 'Tamrat', id: '#353674', score: 117, verified: true },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-black font-mono">
      
      <div className="flex flex-1">
        

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
        <AIAssistant /> {/* Use the new component */}
      </div>
    </div>
  );
}
