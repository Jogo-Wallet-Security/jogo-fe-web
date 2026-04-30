import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, type Theme } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { wagmiConfig } from './libs/wagmi'

const queryClient = new QueryClient()

// Custom blue/indigo theme matching Jogo's brand aesthetic
const jogoTheme: Theme = {
  blurs: {
    modalOverlay: 'blur(12px)',
  },
  colors: {
    accentColor: '#3B82F6',
    accentColorForeground: '#ffffff',
    actionButtonBorder: 'rgba(99, 102, 241, 0.3)',
    actionButtonBorderMobile: 'rgba(99, 102, 241, 0.3)',
    actionButtonSecondaryBackground: 'rgba(99, 102, 241, 0.15)',
    closeButton: 'rgba(199, 210, 254, 0.8)',
    closeButtonBackground: 'rgba(99, 102, 241, 0.2)',
    connectButtonBackground: '#3B82F6',
    connectButtonBackgroundError: '#ef4444',
    connectButtonInnerBackground: 'linear-gradient(135deg, #4F46E5, #3B82F6)',
    connectButtonText: '#ffffff',
    connectButtonTextError: '#ffffff',
    connectionIndicator: '#34d399',
    downloadBottomCardBackground: 'linear-gradient(180deg, #1e1b4b, #1e1b4b)',
    downloadTopCardBackground: 'linear-gradient(180deg, #312e81, #1e1b4b)',
    error: '#ef4444',
    generalBorder: 'rgba(99, 102, 241, 0.25)',
    generalBorderDim: 'rgba(99, 102, 241, 0.1)',
    menuItemBackground: 'rgba(79, 70, 229, 0.15)',
    modalBackdrop: 'rgba(15, 10, 60, 0.6)',
    modalBackground: 'linear-gradient(145deg, #0f0a3c 0%, #1a1060 50%, #0d1547 100%)',
    modalBorder: 'rgba(99, 102, 241, 0.35)',
    modalText: '#e0e7ff',
    modalTextDim: 'rgba(165, 180, 252, 0.6)',
    modalTextSecondary: 'rgba(165, 180, 252, 0.8)',
    profileAction: 'rgba(79, 70, 229, 0.2)',
    profileActionHover: 'rgba(79, 70, 229, 0.35)',
    profileForeground: 'rgba(15, 10, 60, 0.9)',
    selectedOptionBorder: 'rgba(99, 102, 241, 0.6)',
    standby: '#f59e0b',
  },
  fonts: {
    body: "'Inter', 'Outfit', system-ui, sans-serif",
  },
  radii: {
    actionButton: '12px',
    connectButton: '12px',
    menuButton: '12px',
    modal: '20px',
    modalMobile: '20px',
  },
  shadows: {
    connectButton: '0 4px 24px rgba(59, 130, 246, 0.35)',
    dialog: '0 20px 60px rgba(59, 130, 246, 0.25), 0 0 0 1px rgba(99, 102, 241, 0.2)',
    profileDetailsAction: '0 2px 12px rgba(79, 70, 229, 0.3)',
    selectedOption: '0 2px 12px rgba(99, 102, 241, 0.4)',
    selectedWallet: '0 4px 20px rgba(99, 102, 241, 0.35)',
    walletLogo: '0 2px 8px rgba(79, 70, 229, 0.25)',
  },
}

createRoot(document.getElementById('root')!).render(
  <WagmiProvider config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider theme={jogoTheme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>,
)
