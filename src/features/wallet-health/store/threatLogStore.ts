import { create } from 'zustand'
import type { ThreatLogEvent, HistoryTab, TotalThreatLogResponse } from '../types'

interface ThreatLogState {
  revokeLogs: ThreatLogEvent<'APPROVAL_REVOKED'>[]
  scanLogs: ThreatLogEvent<'SCAN_COMPLETE'>[]
  threatLogs: ThreatLogEvent<'THREAT_DETECTED'>[]

  // Per-type loading / error
  loadingRevoke: boolean
  loadingScan: boolean
  loadingThreat: boolean
  errorRevoke: string | null
  errorScan: string | null
  errorThreat: string | null

  // Tab navigation
  activeHistoryTab: HistoryTab

  TotalThreatLog: TotalThreatLogResponse

  // Setters
  setRevokeLogs: (logs: ThreatLogEvent<'APPROVAL_REVOKED'>[]) => void
  setScanLogs: (logs: ThreatLogEvent<'SCAN_COMPLETE'>[]) => void
  setThreatLogs: (logs: ThreatLogEvent<'THREAT_DETECTED'>[]) => void

  setLoadingRevoke: (v: boolean) => void
  setLoadingScan: (v: boolean) => void
  setLoadingThreat: (v: boolean) => void
  setErrorRevoke: (v: string | null) => void
  setErrorScan: (v: string | null) => void
  setErrorThreat: (v: string | null) => void

  setTotalThreatLog: (totalThreatLog: TotalThreatLogResponse) => void

  setActiveHistoryTab: (tab: HistoryTab) => void
}

export const useThreatLogStore = create<ThreatLogState>((set) => ({
  revokeLogs: [],
  scanLogs: [],
  threatLogs: [],

  loadingRevoke: false,
  loadingScan: false,
  loadingThreat: false,

  errorRevoke: null,
  errorScan: null,
  errorThreat: null,

  TotalThreatLog: {
    totalApprovalRevoked: 0,
    totalScanComplete: 0,
    totalThreatDetected: 0,
  },
  activeHistoryTab: 'Revoke Logs',
  setRevokeLogs: (revokeLogs) => set({ revokeLogs }),
  setScanLogs: (scanLogs) => set({ scanLogs }),
  setThreatLogs: (threatLogs) => set({ threatLogs }),

  setLoadingRevoke: (loadingRevoke) => set({ loadingRevoke }),
  setLoadingScan: (loadingScan) => set({ loadingScan }),
  setLoadingThreat: (loadingThreat) => set({ loadingThreat }),
  setErrorRevoke: (errorRevoke) => set({ errorRevoke }),
  setErrorScan: (errorScan) => set({ errorScan }),
  setErrorThreat: (errorThreat) => set({ errorThreat }),

  setTotalThreatLog: (totalThreatLog) => set({ TotalThreatLog: totalThreatLog }),
  setActiveHistoryTab: (activeHistoryTab) => set({ activeHistoryTab }),
}))
