'use client'
import React, { useState } from 'react';
import { Search, User, Wallet, Bell, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSidebar } from '@/lib/context/SidebarContext';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className = '' }: SidebarProps) {
  const { activePage, setActivePage } = useSidebar();
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const sidebarItems = [
    { icon: Search, key: 'search', path: '/', tooltip: 'Search', description: 'Find users and wallets' },
    { icon: User, key: 'profile', path: '/profile', tooltip: 'Profile', description: 'View and edit your profile' },
    { icon: Wallet, key: 'wallet', path: '/wallet', tooltip: 'Wallet', description: 'Manage your crypto assets' },
    { icon: Bell, key: 'notifications', path: '/notifications', tooltip: 'Notifications', description: 'Check your alerts' },
    { icon: Briefcase, key: 'jobs', path: '/jobs', tooltip: 'Jobs', description: 'Explore job opportunities' },
  ];

  const handleClick = (key: string, path: string) => {
    setActivePage(key);
    router.push(path);
  };

  return (
    <div className={`w-20 bg-white flex flex-col items-center justify-center space-y-6 border-r-4 border-black fixed left-0 top-0 h-full ${className}`}>
      <div className="bg-white rounded-md border-2 border-black shadow-[0_4px_0_rgba(0,0,0,1)] p-2">
        {sidebarItems.map((item) => (
          <div 
            key={item.key} 
            className="relative mb-4 last:mb-0"
            onMouseEnter={() => setHoveredItem(item.key)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link
              href={item.path}
              onClick={() => handleClick(item.key, item.path)}
              className={`p-2 hover:bg-[#39FF14] rounded-md transition-colors ${
                activePage === item.key ? 'bg-[#39FF14] text-black' : 'bg-white text-black'
              } border-2 border-black shadow-[0_2px_0_rgba(0,0,0,1)] hover:shadow-[0_4px_0_rgba(0,0,0,1)] active:shadow-none flex items-center justify-center`}
            >
              <item.icon className="w-6 h-6" />
            </Link>
            <div className="absolute top-0 left-full w-4 h-full" />
            <AnimatePresence>
              {hoveredItem === item.key && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="absolute left-full top-0 ml-4 bg-white text-gray-900 py-1 px-2 rounded-md z-50 w-28 border-2 border-black shadow-[0_2px_0_rgba(0,0,0,1)]"
                >
                  <p className="font-bold text-xs mb-0.5">{item.tooltip}</p>
                  <p className="text-[9px] leading-tight ">{item.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
