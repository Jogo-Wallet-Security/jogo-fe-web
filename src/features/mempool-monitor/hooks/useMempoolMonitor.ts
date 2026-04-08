import { useMempoolMonitorStore } from '../store/mempoolMonitorStore'

export function useMempoolMonitor() {
  const stats = useMempoolMonitorStore((state) => state.stats)
  const gasReserve = useMempoolMonitorStore((state) => state.gasReserve)
  const safeWallet = useMempoolMonitorStore((state) => state.safeWallet)
  const activeProtection = useMempoolMonitorStore((state) => state.activeProtection)
  const isTopUpPending = useMempoolMonitorStore((state) => state.isTopUpPending)
  const toggleProtection = useMempoolMonitorStore((state) => state.toggleProtection)
  const topUpGas = useMempoolMonitorStore((state) => state.topUpGas)
  const changeSafeWallet = useMempoolMonitorStore((state) => state.changeSafeWallet)

  return {
    stats,
    gasReserve,
    safeWallet,
    activeProtection,
    isTopUpPending,
    toggleProtection,
    topUpGas,
    changeSafeWallet,
  }
}
