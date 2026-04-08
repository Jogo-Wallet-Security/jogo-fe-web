import { useWalletHealthStore } from '../store/walletHealthStore'
import type { HistoryEvent } from '../types'

export function useWalletHealth() {
  const store = useWalletHealthStore()

  const filteredApprovals = store.approvals.filter((app) =>
    store.activeQualityFilter === 'All' ? true : app.riskLevel === store.activeQualityFilter,
  )

  const filteredHistory = store.history.filter((hist) => {
    if (store.activeHistoryTab === 'All') return true
    if (store.activeHistoryTab === 'Revoke Logs') return hist.action === 'Revoke'
    if (store.activeHistoryTab === 'Recent Scans') return hist.action === 'Scan'
    return true
  })

  const revokeApproval = (id: string, contractName: string) => {
    const newEvent: HistoryEvent = {
      id: `hist_${Date.now()}`,
      action: 'Revoke',
      description: `Revoked approval for ${contractName}`,
      timestamp: new Date().toISOString(),
      txHash: '0x' + Math.random().toString(16).slice(2, 10) + '...',
    }
    store.revokeApproval(id, newEvent)
  }

  const rescanWallet = () => {
    const newEvent: HistoryEvent = {
      id: `hist_${Date.now()}`,
      action: 'Scan',
      description: 'User initiated deep wallet scan',
      timestamp: new Date().toISOString(),
    }
    store.rescanWallet(newEvent)
  }

  return {
    ...store,
    filteredApprovals,
    filteredHistory,
    revokeApproval,
    rescanWallet,
  }
}
