'use client';

import React, { ReactNode } from 'react';
import { config, projectId, siweConfig, metadata } from './siwe';

import { createWeb3Modal } from '@web3modal/wagmi/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { State, WagmiProvider } from 'wagmi';

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error('Project ID is not defined');

// Create modal
createWeb3Modal({
  metadata: metadata,
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  siweConfig,
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#39FF14',
    '--w3m-color-mix': '#F7CA18',
    '--w3m-color-mix-strength': 16,
    '--w3m-font-family': 'monospace',
    '--w3m-border-radius-master': '0px',
    '--w3m-font-size-master': '10px',
  }
});

export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
