import { useRef, useCallback, useEffect } from 'react'
import { fetchThreatLog } from '../api/threadLogApi'
import type { ThreatLogEvent, ThreatLogEventType, HistoryTab, ThreatLogParams } from '../types'
import { useThreatLogStore } from '../store/threatLogStore'

export interface UseThreatLogBaseParams {
  wallet: string
  chainId: number
}

export function useThreatLog(baseParams: UseThreatLogBaseParams | null = null) {
  const {
    revokeLogs,
    scanLogs,
    threatLogs,
    loadingRevoke,
    loadingScan,
    loadingThreat,
    errorRevoke,
    errorScan,
    errorThreat,
    activeHistoryTab,
    setRevokeLogs,
    setScanLogs,
    setThreatLogs,
    setLoadingRevoke,
    setLoadingScan,
    setLoadingThreat,
    setErrorRevoke,
    setErrorScan,
    setErrorThreat,
    setActiveHistoryTab,
    setTotalThreatLog,
  } = useThreatLogStore()

  const paramsRef = useRef(baseParams)
  paramsRef.current = baseParams

  // One AbortController per event type
  const revokeCtrl = useRef<AbortController | null>(null)
  const scanCtrl = useRef<AbortController | null>(null)
  const threatCtrl = useRef<AbortController | null>(null)

  // ── Generic fetch helper ──────────────────────────────────────────────────
  async function fetchForType<T extends ThreatLogEventType>(
    eventType: T,
    ctrl: React.MutableRefObject<AbortController | null>,
    setLoading: (v: boolean) => void,
    setError: (v: string | null) => void,
    setData: (logs: ThreatLogEvent<T>[]) => void,
  ) {
    if (!paramsRef.current) return
    ctrl.current?.abort()
    const controller = new AbortController()
    ctrl.current = controller
    const { signal } = controller

    setLoading(true)
    setError(null)

    try {
      const params: ThreatLogParams = { ...paramsRef.current, eventType }
      const resp = await fetchThreatLog(params, signal)
      // Cast: the API filters by eventType so every event matches T
      setData(resp.events as ThreatLogEvent<T>[])
      setTotalThreatLog({
        totalApprovalRevoked: resp.totalApprovalRevoked,
        totalScanComplete: resp.totalScanComplete,
        totalThreatDetected: resp.totalThreatDetected,
      })
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      if (!signal.aborted) setLoading(false)
    }
  }

  // ── Per-type refetch callbacks ────────────────────────────────────────────
  const refetchRevoke = useCallback(
    () =>
      fetchForType('APPROVAL_REVOKED', revokeCtrl, setLoadingRevoke, setErrorRevoke, setRevokeLogs),
    [setLoadingRevoke, setErrorRevoke, setRevokeLogs],
  )

  const refetchScan = useCallback(
    () => fetchForType('SCAN_COMPLETE', scanCtrl, setLoadingScan, setErrorScan, setScanLogs),
    [setLoadingScan, setErrorScan, setScanLogs],
  )

  const refetchThreat = useCallback(
    () =>
      fetchForType('THREAT_DETECTED', threatCtrl, setLoadingThreat, setErrorThreat, setThreatLogs),
    [setLoadingThreat, setErrorThreat, setThreatLogs],
  )

  const fetchActiveTab = useCallback(() => {
    if (activeHistoryTab === 'Revoke Logs') return refetchRevoke()
    if (activeHistoryTab === 'Recent Scans') return refetchScan()
    return refetchThreat()
  }, [activeHistoryTab, refetchRevoke, refetchScan, refetchThreat])

  // ── Fetch only the active tab on mount / changes ──────────────────────────
  useEffect(() => {
    if (!baseParams) return
    fetchActiveTab()
    return () => {
      revokeCtrl.current?.abort()
      scanCtrl.current?.abort()
      threatCtrl.current?.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseParams?.wallet, baseParams?.chainId, activeHistoryTab, fetchActiveTab])

  // ── Tab navigation ────────────────────────────────────────────────────────
  const setHistoryTab = useCallback(
    (tab: HistoryTab) => {
      setActiveHistoryTab(tab)
    },
    [setActiveHistoryTab],
  )

  return {
    // Data
    revokeLogs,
    scanLogs,
    threatLogs,

    // Per-type loading/error
    loadingRevoke,
    loadingScan,
    loadingThreat,
    errorRevoke,
    errorScan,
    errorThreat,

    // Convenience: loading/error for the active tab
    isLoading:
      activeHistoryTab === 'Revoke Logs'
        ? loadingRevoke
        : activeHistoryTab === 'Recent Scans'
          ? loadingScan
          : loadingThreat,
    error:
      activeHistoryTab === 'Revoke Logs'
        ? errorRevoke
        : activeHistoryTab === 'Recent Scans'
          ? errorScan
          : errorThreat,

    // Tab navigation
    activeHistoryTab,
    setHistoryTab,

    // Manual refetch per type
    refetchRevoke,
    refetchScan,
    refetchThreat,
  }
}
