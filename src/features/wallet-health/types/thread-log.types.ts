export type ThreatLogEventType = 'SCAN_COMPLETE' | 'THREAT_DETECTED' | 'APPROVAL_REVOKED'

// ─── Data payloads (used inside `data` field for non-revoke events) ───────────

export interface ScanCompleteData {
  score: number
  approvalCount: number
  criticalCount: number
}

export interface ThreatDetectedData {
  source: string
  riskLevel: string
  explanation?: string
  spenderAddress: string
  contractAddress: string
  riskSignals?: { title: string; description: string }[]
  whatWillHappen?: { label: string; tag: string }[]
}

// ─── Revoke transaction info ──────────────────────────────────────────────────

export interface RevokeTransaction {
  txHash: string
  gasCostEth?: string
  gasCostUsd?: string
  explorerUrl?: string
}

// ─── Per-event shapes ─────────────────────────────────────────────────────────

export interface ThreatLogScanComplete {
  id: string
  eventType: 'SCAN_COMPLETE'
  walletAddress: string
  chainId: number
  data: ScanCompleteData
  createdAt: string
}

export interface ThreatLogThreatDetected {
  id: string
  eventType: 'THREAT_DETECTED'
  walletAddress: string
  chainId: number
  data: ThreatDetectedData
  createdAt: string
}

/**
 * APPROVAL_REVOKED events are flat — the approval fields live at the root level,
 * NOT nested under a `data` key.
 */
export interface ThreatLogApprovalRevoked {
  id: string
  eventType: 'APPROVAL_REVOKED'
  walletAddress?: string
  chainId: number
  createdAt?: string

  // Revoke metadata
  revokeDate: string
  transaction: RevokeTransaction

  // Flat approval fields
  spender: string
  asset: string
  assetType: string
  tokenName: string
  tokenSymbol: string
  allowance: string
  isUnlimited: boolean
  action: string
  riskScore: number
  riskLevel: string
  explanation?: string
  riskSignals: { title: string; description: string }[]
  whatWillHappen: { label: string; tag: string }[]
  spenderMeta: { name: string | null; isVerified: boolean }
  chainName: string
}

export type ThreatLogItem =
  | ThreatLogScanComplete
  | ThreatLogThreatDetected
  | ThreatLogApprovalRevoked

// ─── API response ─────────────────────────────────────────────────────────────

export interface ThreatLogResponse {
  success: boolean
  wallet_address: string
  total: number
  totalScanComplete: number
  totalThreatDetected: number
  totalApprovalRevoked: number
  page: number
  page_size: number
  totalPages: number
  data: ThreatLogItem[]
}

// ─── Query params ─────────────────────────────────────────────────────────────

export interface ThreatLogParams {
  wallet: string
  chainId: number
  eventType?: ThreatLogEventType | ''
  search?: string
  page?: number
  perPage?: number
}

export interface TotalThreatLogResponse {
  totalApprovalRevoked: number
  totalScanComplete: number
  totalThreatDetected: number
}
