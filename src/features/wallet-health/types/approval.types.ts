export type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low' | 'None'

export interface Approval {
  id: string
  contractName: string
  contractAddress: string
  tokenName: string
  tokenSymbol: string
  tokenIcon?: string
  network: string
  estimatedGasUSD: number
  estimatedGasEth: number
  riskLevel: RiskLevel
  riskReason?: string
  dateApproved: string
  allowance: string | 'Unlimited'
}

export interface WalletScore {
  score: number // 0-100
  lastScanned: string
  threatsBlocked: number
  autoRevoked: number
  sitesAnalyzed: number
}
