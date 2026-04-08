import type { MempoolStats, GasReserve, SafeWallet, ActiveProtection } from '../types'

export const mockMempoolStats: MempoolStats = {
  transactionsScreened: 24847,
  threatsDetected: 19,
  successfulRescue: 10,
  rescuedAssetsUsd: 1245.89,
}

export const mockGasReserve: GasReserve = {
  ethAmount: 0.012,
  usdAmount: 32.5,
  healthy: true,
  estimatedDays: 45,
}

export const mockSafeWallet: SafeWallet = {
  address: '0x1a2b...9f0e',
  lastVerified: 'today',
}

export const mockActiveProtection: ActiveProtection = {
  realTimeMonitoring: true,
  smartContractScanning: true,
  automatedAssetRescue: true,
  isPaused: false,
}
