import { useRef, useCallback } from 'react'
import { fetchThreatLog } from '../api/threadLogApi'
import type { ThreatLogParams } from '../types'
import { useThreatLogStore } from '../store/threatLogStore'

export function useThreatLog(params: ThreatLogParams | null) {
  const { data, loading, error, setData, setLoading, setError } = useThreatLogStore()

  const paramsRef = useRef(params)
  paramsRef.current = params

  const controllerRef = useRef<AbortController | null>(null)

  const run = useCallback(async () => {
    if (!paramsRef.current) return

    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller
    const { signal } = controller

    setLoading(true)
    setError(null)

    try {
      const resp = await fetchThreatLog(paramsRef.current, signal)
      setData(resp)
      //   setWalletScore({
      //     walletSecurityScore: resp.walletSecurityScore,
      //     grade: resp.grade,
      //     gradeColor: resp.gradeColor,
      //   })
      //   setFilterCount({
      //     totalAll: resp.totalAll,
      //     totalSafe: resp.totalSafe,
      //     totalLow: resp.totalLow,
      //     totalHigh: resp.totalHigh,
      //     totalCritical: resp.totalCritical,
      //   })
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      if (!signal.aborted) setLoading(false)
    }
  }, [setData, setLoading, setError])

  //   useEffect(() => {
  //     if (!params) return
  //     run()
  //     return () => controllerRef.current?.abort()
  //   }, [params?.address, params?.riskLevel, params?.search, params?.page, params?.perPage])

  return {
    data,
    // filterCount,
    // activeQualityFilter,
    // setQualityFilter,
    isLoading: loading,
    error,
    refetch: run,
  }
}
