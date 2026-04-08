import { Search, ShieldAlert, Shield, Wallet } from 'lucide-react'
import { useMempoolMonitor } from '../hooks/useMempoolMonitor'

export function StatsRow() {
  const { stats } = useMempoolMonitor()

  const items = [
    {
      label: 'Transactions Screened',
      value: stats.transactionsScreened.toLocaleString(),
      icon: Search,
    },
    {
      label: 'Threats Detected',
      value: stats.threatsDetected.toLocaleString(),
      icon: ShieldAlert,
    },
    {
      label: 'Successful Rescue',
      value: stats.successfulRescue.toLocaleString(),
      icon: Shield,
    },
    {
      label: 'Rescued Assets',
      value: `$${stats.rescuedAssetsUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: Wallet,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, i) => {
        const Icon = item.icon
        return (
          <div
            key={i}
            className="flex items-center justify-between rounded-3xl border border-white/50 bg-white/40 backdrop-blur-md shadow-sm p-6"
          >
            <div>
              <p className="text-sm font-semibold text-slate-500 mb-1">{item.label}</p>
              <p className="text-3xl font-bold text-slate-800">{item.value}</p>
            </div>
            <div className="rounded-full p-3 bg-white/80 shadow-sm flex items-center justify-center">
              <Icon className="text-blue-500" size={24} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
