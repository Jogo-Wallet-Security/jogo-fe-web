export interface MempoolStats {
  transactionsScreened: number
  threatsDetected: number
  successfulRescue: number
  rescuedAssetsUsd: number
}

export interface GasReserve {
  ethAmount: number
  usdAmount: number
  healthy: boolean
  estimatedDays: number
}

export interface SafeWallet {
  address: string
  lastVerified: string
}

export interface ActiveProtection {
  realTimeMonitoring: boolean
  smartContractScanning: boolean
  automatedAssetRescue: boolean
  isPaused: boolean
}
