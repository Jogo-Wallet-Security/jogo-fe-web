import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { base } from 'wagmi/chains'

export const wagmiConfig = getDefaultConfig({
  appName: 'Jogo',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  chains: [base],
  ssr: false,
})
