import { useEffect, useRef, useCallback } from 'react'
import { useApprovalsStore } from '../store/approvalStore'
import { fetchApprovals } from '../api/approvalsApi'
import type { ApprovalsParams } from '../types/approval.types'
import { selectFilterCountFromResponse } from '../selectors/approvalSelectors'

export function useApprovals(params: ApprovalsParams | null) {
  const {
    data,
    loading,
    error,
    activeQualityFilter,
    setData,
    setLoading,
    setError,
    setQualityFilter,
  } = useApprovalsStore()

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
      const resp = await fetchApprovals(paramsRef.current, signal)
      setData(resp)
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      if (!signal.aborted) setLoading(false)
    }
  }, [setData, setLoading, setError])

  useEffect(() => {
    if (!params) return
    run()
    return () => controllerRef.current?.abort()
  }, [params?.address, params?.riskLevel, params?.search, params?.page, params?.perPage])

  return {
    data,
    filterCount: selectFilterCountFromResponse(data),
    activeQualityFilter,
    setQualityFilter,
    isLoading: loading,
    error,
    refetch: run,
  }
}
