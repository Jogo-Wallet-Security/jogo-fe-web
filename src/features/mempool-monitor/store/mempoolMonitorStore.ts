import { create } from 'zustand'
import type { MempoolStats, GasReserve, SafeWallet, ActiveProtection } from '../types'
import {
  mockMempoolStats,
  mockGasReserve,
  mockSafeWallet,
  mockActiveProtection,
} from '../data/mockData'

interface MempoolMonitorState {
  stats: MempoolStats
  gasReserve: GasReserve
  safeWallet: SafeWallet
  activeProtection: ActiveProtection
  isTopUpPending: boolean

  toggleProtection: () => void
  topUpGas: (amount: number) => void
  changeSafeWallet: (newAddress: string) => void
}

export const useMempoolMonitorStore = create<MempoolMonitorState>((set) => ({
  stats: mockMempoolStats,
  gasReserve: mockGasReserve,
  safeWallet: mockSafeWallet,
  activeProtection: mockActiveProtection,
  isTopUpPending: false,

  toggleProtection: () =>
    set((state) => ({
      activeProtection: {
        ...state.activeProtection,
        isPaused: !state.activeProtection.isPaused,
      },
    })),

  topUpGas: (amount) => {
    set({ isTopUpPending: true })
    setTimeout(() => {
      set((state) => ({
        isTopUpPending: false,
        gasReserve: {
          ...state.gasReserve,
          ethAmount: state.gasReserve.ethAmount + amount,
          usdAmount: state.gasReserve.usdAmount + amount * 3000, // naive mock conversion
          healthy: true,
          estimatedDays: state.gasReserve.estimatedDays + 30, // mock bump
        },
      }))
    }, 1500)
  },

  changeSafeWallet: (newAddress) =>
    set((state) => ({
      safeWallet: {
        ...state.safeWallet,
        address: newAddress,
        lastVerified: 'just now',
      },
    })),
}))
