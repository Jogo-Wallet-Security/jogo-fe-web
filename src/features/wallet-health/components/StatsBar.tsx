import { Shield, ShieldOff, Search } from 'lucide-react'
import { useThreatLogStore } from '../store/threatLogStore'

export function StatsBar() {
  const { TotalThreatLog } = useThreatLogStore()

  const stats = [
    {
      label: 'Threats Blocked',
      value: TotalThreatLog.totalThreatDetected,
      icon: Shield,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-400',
    },
    {
      label: 'Permissions Revoked',
      value: TotalThreatLog.totalApprovalRevoked,
      icon: ShieldOff,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-400',
    },
    {
      label: 'Sites Analyzed',
      value: TotalThreatLog.totalScanComplete,
      icon: Search,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-400',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <div
            key={i}
            className="flex items-center justify-between rounded-2xl border border-white/50 bg-sky-frost backdrop-blur-md shadow-sm p-5"
          >
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">{stat.label}</p>
              <div className="flex gap-2">
                <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
              </div>
            </div>
            <div className={`rounded-full p-3 ${stat.iconBg}`}>
              <Icon className={stat.iconColor} size={22} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
