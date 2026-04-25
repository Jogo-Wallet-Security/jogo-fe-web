import { apiClient } from '@/libs/apiClients'
import type {
  ApprovalsParams,
  ApprovalsResponse,
  RevokeEstimateParams,
  RevokeEstimate,
  RevokeInstructionsResponse,
  Approval,
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

export async function fetchRevokeInstructions(
  params: RevokeEstimateParams,
): Promise<RevokeInstructionsResponse> {
  return apiClient.post<RevokeInstructionsResponse>('/wallet/revoke', params)
}

export async function logRevokeEvent(payload: {
  walletAddress: string
  chainId: number
  approval: Approval
  transaction: {
    txHash: string
    gasCostEth?: string
    gasCostUsd?: string
  }
}): Promise<{ ok: boolean }> {
  return apiClient.post<{ ok: boolean }>('/threat-log/revoke-log', payload)
}
