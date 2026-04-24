export type HistoryActionType = 'Revoke' | 'Approval' | 'Blocked' | 'Scan' | 'Threat'

export type RevokeMethod =
  | 'Auto — drain blocked'
  | 'Auto — precautionary'
  | 'Manual — user initiated'

export type ScanOutcome = 'Cancelled (warned)' | 'Approved' | 'Blocked' | 'Pending'

export type ThreatOutcome =
  | 'Assets rescued'
  | 'Monitoring — no action yet'
  | 'Rescue failed — manual action needed'
  | 'Confirmed drain'

// ─── Revoke Log ──────────────────────────────────────────────────────────────
export interface RevokeLog {
  id: string
  timestamp: string
  riskLevel?: 'Critical' | 'High' | 'Medium' | 'Low' | 'None'
  /** Token / contract revoked — e.g. "USDC approval on 0x1a2b…" */
  tokenContract: string
  tokenSymbol: string
  /** Why the revoke was triggered */
  triggerReason: string
  revokeMethod: RevokeMethod
  attackerAddress?: string
  valueAtRisk?: string
  gasUsed?: string
  revokeStatus: string
  blockNumber?: string
  txHash?: string
  safeWallet?: string
}

// ─── Recent Scan Log ─────────────────────────────────────────────────────────
export interface ScanLog {
  id: string
  timestamp: string
  riskLevel?: 'Critical' | 'High' | 'Medium' | 'Low' | 'None'
  /** Protocol / site name */
  protocol: string
  site: string
  actionDetected: string
  riskScore: number
  domainVerified: boolean
  domainNote?: string
  contractAddress?: string
  approvalScope?: string
  signatureType?: string
  userAction: ScanOutcome
  /** Threat flag tags */
  flags?: string[]
}

// ─── Recent Threat Log ───────────────────────────────────────────────────────
export interface ThreatLog {
  id: string
  timestamp: string
  riskLevel?: 'Critical' | 'High' | 'Medium' | 'Low' | 'None'
  /** e.g. "Drain attempt" */
  incidentTitle: string
  /** Pending tx short hash */
  pendingTx: string
  targetingNote: string
  threatType: string
  confidenceScore: number
  attackerAddress?: string
  targetToken: string
  targetValue?: string
  mempoolBlock?: string
  responseTaken: string
  outcome: ThreatOutcome
  relatedRevokeId?: string
  etherscanTx?: string
}

// ─── Shared ──────────────────────────────────────────────────────────────────

/** Legacy shape kept for backward-compat with the store's history array */
export interface HistoryEvent {
  id: string
  action: HistoryActionType
  description: string
  timestamp: string
  protocol?: string
  site?: string
  riskLevel?: 'Critical' | 'High' | 'Medium' | 'Low' | 'None'
  targetContract?: string
  txHash?: string
}

export type HistoryTab = 'Revoke Logs' | 'Recent Scans' | 'Recent Thread'
