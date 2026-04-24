export type RiskLevel = 'Safe' | 'Low' | 'High' | 'Critical'

export interface SpenderMeta {
  name: string
  isVerified: boolean
}

export interface Approval {
  spender: string
  asset: string
  assetType: string
  tokenName: string
  tokenSymbol: string
  allowance: string
  isUnlimited: boolean
  riskScore: number
  riskLevel: RiskLevel
  explanation: string
  spenderMeta: SpenderMeta
}

export interface ApprovalsResponse {
  approvals: Approval[]
  totalActive: number
  totalFiltered: number
  totalAll: number
  totalSafe: number
  totalLow: number
  totalHigh: number
  totalCritical: number
  page: number
  perPage: number
  totalPages: number
  walletSecurityScore: number
  grade: string
  gradeColor: string
  signals: string[]
}

export interface WalletScore {
  walletSecurityScore: number
  grade: string
  gradeColor: string
}

export interface TotalFilter {
  totalAll: number
  totalSafe: number
  totalLow: number
  totalHigh: number
  totalCritical: number
}

export interface ApprovalsParams {
  address: string
  chainId: number
  riskLevel?: RiskLevel
  search?: string
  page?: number
  perPage?: number
}

export interface RevokeEstimateParams {
  owner: string
  spender: string
  asset: string
  assetType: string
  chainId: number
}

export interface RevokeEstimate {
  gasEstimateEth: string
  gasEstimateUSD: string
  chainId: number
  network: string
}
