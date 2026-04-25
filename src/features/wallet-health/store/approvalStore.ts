import { create } from 'zustand'
import type { ApprovalsResponse, RiskLevel } from '../types/approval.types'

interface ApprovalsState {
  data: ApprovalsResponse | null
  loading: boolean
  error: string | null
  activeQualityFilter: RiskLevel | 'All'
  setQualityFilter: (filter: RiskLevel | 'All') => void
  setData: (data: ApprovalsResponse) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useApprovalsStore = create<ApprovalsState>((set) => ({
  data: null,
  loading: false,
  error: null,
  activeQualityFilter: 'All',

  setQualityFilter: (filter) => set({ activeQualityFilter: filter }),
  setData: (data) => set({ data }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}))
