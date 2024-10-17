'use client'
import React, { createContext, useContext, useState } from 'react';

type SidebarContextType = {
  activePage: string;
  setActivePage: (page: string) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [activePage, setActivePage] = useState('search');

  return (
    <SidebarContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

// Add this line to export the hook directly

