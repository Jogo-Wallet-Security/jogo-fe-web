export type ThreatLogEventType = 'SCAN_COMPLETE' | 'THREAT_DETECTED' | 'APPROVAL_REVOKED'

export interface ScanCompleteData {
  score: number
  approvalCount: number
  criticalCount: number
}

export interface ThreatDetectedData {
  threatType?: string
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  description?: string
  [key: string]: unknown
}

export interface ApprovalRevokedData {
  tokenAddress?: string
  spender?: string
  [key: string]: unknown
}

type EventDataMap = {
  SCAN_COMPLETE: ScanCompleteData
  THREAT_DETECTED: ThreatDetectedData
  APPROVAL_REVOKED: ApprovalRevokedData
}

export interface ThreatLogEvent<T extends ThreatLogEventType = ThreatLogEventType> {
  id: string
  eventType: T
  walletAddress: string
  chainId: number
  data: EventDataMap[T]
  createdAt: string
}

export interface ThreatLogResponse {
  events: ThreatLogEvent[]
  total: number
  page: number
  perPage: number
  totalPages: number
}

export interface ThreatLogParams {
  wallet: string
  chainId: number
  eventType?: ThreatLogEventType | ''
  page?: number
  perPage?: number
}
