import { useEffect, useRef, useState, useCallback } from 'react'
import { fetchRevokeEstimate } from '../api/approvalsApi'
import type { RevokeEstimate, RevokeEstimateParams } from '../types/approval.types'

interface UseRevokeEstimateResult {
  estimate: RevokeEstimate | null
  isLoading: boolean
  error: string | null
}

export function useRevokeEstimate(params: RevokeEstimateParams | null): UseRevokeEstimateResult {
  const [estimate, setEstimate] = useState<RevokeEstimate | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const paramsRef = useRef(params)
  paramsRef.current = params

  const controllerRef = useRef<AbortController | null>(null)

  const run = useCallback(async () => {
    if (!paramsRef.current) return

    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller
    const { signal } = controller

    setIsLoading(true)
    setError(null)

    try {
      const data = await fetchRevokeEstimate(paramsRef.current, signal)
      setEstimate(data)
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      setError(err instanceof Error ? err.message : 'Could not fetch estimate')
    } finally {
      if (!signal.aborted) setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!params) {
      // Reset when modal closes
      setEstimate(null)
      setError(null)
      return
    }

    run()
    return () => controllerRef.current?.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.owner, params?.spender, params?.asset, params?.chainId])

  return { estimate, isLoading, error }
}
