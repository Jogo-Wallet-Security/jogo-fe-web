import { create } from 'zustand'
import type { Approval, HistoryEvent, WalletScore, RiskLevel, HistoryTab } from '../types'
import { mockApprovals, mockHistory, mockWalletScore } from '../data/mockData'

interface WalletHealthState {
  walletScore: WalletScore
  approvals: Approval[]
  history: HistoryEvent[]
  activeHistoryTab: HistoryTab
  activeQualityFilter: RiskLevel | 'All'
  isScanning: boolean

  setHistoryTab: (tab: HistoryTab) => void
  setQualityFilter: (filter: RiskLevel | 'All') => void
  revokeApproval: (id: string, newHistoryEvent: HistoryEvent) => void
  rescanWallet: (newHistoryEvent: HistoryEvent) => void
}

const calculateScore = (approvals: Approval[]): number => {
  let penalty = 0
  approvals.forEach((app) => {
    if (app.riskLevel === 'Critical') penalty += 15
    if (app.riskLevel === 'High') penalty += 5
    if (app.riskLevel === 'Medium') penalty += 2
  })
  return Math.max(0, Math.min(100, 100 - penalty))
}

export const useWalletHealthStore = create<WalletHealthState>((set) => ({
  walletScore: { ...mockWalletScore, score: calculateScore(mockApprovals) },
  approvals: mockApprovals,
  history: mockHistory,
  activeHistoryTab: 'All',
  activeQualityFilter: 'All',
  isScanning: false,

  setHistoryTab: (tab) => set({ activeHistoryTab: tab }),
  setQualityFilter: (filter) => set({ activeQualityFilter: filter }),
  revokeApproval: (id, newHistoryEvent) =>
    set((state) => {
      const newApprovals = state.approvals.filter((a) => a.id !== id)
      const newScore = calculateScore(newApprovals)
      return {
        approvals: newApprovals,
        walletScore: { ...state.walletScore, score: newScore },
        history: [newHistoryEvent, ...state.history],
      }
    }),
  rescanWallet: (newHistoryEvent) => {
    set({ isScanning: true })
    setTimeout(() => {
      set((state) => ({
        isScanning: false,
        walletScore: { ...state.walletScore, lastScanned: new Date().toISOString() },
        history: [newHistoryEvent, ...state.history],
      }))
    }, 1500)
  },
}))
