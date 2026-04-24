import { create } from 'zustand'
import type { ThreatLogResponse, ThreatLogEventType } from '../types'

interface ApprovalsState {
  data: ThreatLogResponse | null
  loading: boolean
  error: string | null
  activeEventType: ThreatLogEventType | 'SCAN_COMPLETE'
  setData: (data: ThreatLogResponse) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setActiveEventType: (walletScore: ThreatLogEventType) => void
}

export const useThreatLogStore = create<ApprovalsState>((set) => ({
  data: null,
  loading: false,
  error: null,
  activeEventType: 'SCAN_COMPLETE',
  setData: (data) => set({ data }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setActiveEventType: (activeEventType) => set({ activeEventType }),
}))
