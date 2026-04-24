import { create } from 'zustand'
import type {
  ApprovalsResponse,
  RiskLevel,
  TotalFilter,
  WalletScore,
} from '../types/approval.types'

interface ApprovalsState {
  data: ApprovalsResponse | null
  loading: boolean
  error: string | null
  activeQualityFilter: RiskLevel | 'All'
  filterCount: TotalFilter
  walletScore: WalletScore
  setQualityFilter: (filter: RiskLevel | 'All') => void
  setData: (data: ApprovalsResponse) => void
  setLoading: (loading: boolean) => void
  setFilterCount: (filterCount: TotalFilter) => void
  setError: (error: string | null) => void
  setWalletScore: (walletScore: WalletScore) => void
}

export const useApprovalsStore = create<ApprovalsState>((set) => ({
  data: null,
  loading: false,
  error: null,
  activeQualityFilter: 'All',
  filterCount: {
    totalAll: 0,
    totalSafe: 0,
    totalLow: 0,
    totalHigh: 0,
    totalCritical: 0,
  },
  walletScore: {
    walletSecurityScore: 100,
    grade: 'A',
    gradeColor: '#BEE1C7',
  },

  setFilterCount: (filterCount: TotalFilter) => set({ filterCount }),
  setQualityFilter: (filter) => set({ activeQualityFilter: filter }),
  setData: (data) => set({ data }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setWalletScore: (walletScore) => set({ walletScore }),
}))
