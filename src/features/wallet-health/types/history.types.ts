export type HistoryActionType = 'Revoke' | 'Approval' | 'Blocked' | 'Scan'

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

export type HistoryTab = 'All' | 'Revoke Logs' | 'Recent Scans'
