import { apiClient } from '@/libs/apiClients'
import type {
  ApprovalsParams,
  ApprovalsResponse,
  RevokeEstimateParams,
  RevokeEstimate,
} from '../types/approval.types'

export async function fetchApprovals(
  params: ApprovalsParams,
  signal?: AbortSignal,
): Promise<ApprovalsResponse> {
  return apiClient.get<ApprovalsResponse>(
    '/wallet/approvals',
    params as unknown as Record<string, unknown>,
    signal,
  )
}

export async function fetchRevokeEstimate(
  params: RevokeEstimateParams,
  signal?: AbortSignal,
): Promise<RevokeEstimate> {
  return apiClient.post<RevokeEstimate>('/wallet/revoke-estimate', params, signal)
}
