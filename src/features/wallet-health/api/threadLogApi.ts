import { apiClient } from '@/libs/apiClients'
import type { ThreatLogParams, ThreatLogResponse } from '../types/thread-log.types'

export async function fetchThreatLog(
  params: ThreatLogParams,
  signal?: AbortSignal,
): Promise<ThreatLogResponse> {
  return apiClient.get<ThreatLogResponse>(
    '/threat-log',
    params as unknown as Record<string, unknown>,
    signal,
  )
}
