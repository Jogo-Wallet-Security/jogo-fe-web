import type { ApprovalsResponse, TotalFilter, WalletScore } from '../types'

const EMPTY_FILTER_COUNT: TotalFilter = {
  totalAll: 0,
  totalSafe: 0,
  totalLow: 0,
  totalHigh: 0,
  totalCritical: 0,
}

const DEFAULT_WALLET_SCORE: WalletScore = {
  walletSecurityScore: 0,
  grade: '-',
  gradeColor: '#cbd5e1',
}

export function selectFilterCountFromResponse(data: ApprovalsResponse | null): TotalFilter {
  if (!data) return EMPTY_FILTER_COUNT
  return {
    totalAll: data.totalActive || 0,
    totalSafe: data.totalSafe,
    totalLow: data.totalLow,
    totalHigh: data.totalHigh,
    totalCritical: data.totalCritical,
  }
}

export function selectWalletScoreFromResponse(data: ApprovalsResponse | null): WalletScore {
  if (!data) return DEFAULT_WALLET_SCORE
  return {
    walletSecurityScore: data.walletSecurityScore,
    grade: data.grade,
    gradeColor: data.gradeColor,
  }
}
