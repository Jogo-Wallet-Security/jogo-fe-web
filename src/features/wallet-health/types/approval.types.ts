export type RiskLevel = 'Safe' | 'Low' | 'High' | 'Critical'

export interface SpenderMeta {
  name: string
  isVerified: boolean
}

export interface RiskSignal {
  title: string
  description: string
}

export interface WhatWillHappen {
  label: string
  tag: string
}

export interface Approval {
  spender: string
  asset: string
  assetType: string
  tokenName: string
  tokenSymbol: string
  allowance: string
  isUnlimited: boolean
  action: string
  riskScore: number
  riskLevel: RiskLevel
  explanation?: string
  riskSignals: RiskSignal[]
  whatWillHappen: WhatWillHappen[]
  spenderMeta: SpenderMeta
  chainId: number
  chainName: string
}

export interface ScoreImpact {
  reason: string
  penalty: number
  count: number
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
  scoreImpact?: ScoreImpact[]
}

export interface WalletScore {
  walletSecurityScore: number
  grade: string
  gradeColor: string
  scoreImpact?: ScoreImpact[]
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
  gasUnits: number
  gasPriceGwei: string
  ethCost: string
  usdCost: string
  calldata: string
}

export interface RevokeInstructionsResponse {
  ok: boolean
  message: string
  txInstructions: {
    to: string
    data: string
    value: string
    chainId: number
  }
}
