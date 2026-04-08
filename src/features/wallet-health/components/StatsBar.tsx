import { useWalletHealth } from '../hooks/useWalletHealth'
import { Shield, ShieldOff, Search } from 'lucide-react'

export function StatsBar() {
  const { walletScore } = useWalletHealth()

  const stats = [
    {
      label: 'Threats Blocked',
      value: walletScore.threatsBlocked,
      badge: '+2 this week',
      badgeBg: 'bg-green-100 text-green-600',
      icon: Shield,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-400',
    },
    {
      label: 'Permissions Revoked',
      value: walletScore.autoRevoked,
      badge: 'Last 30 days',
      badgeBg: 'bg-slate-100 text-slate-500',
      icon: ShieldOff,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-400',
    },
    {
      label: 'Sites Analyzed',
      value: walletScore.sitesAnalyzed.toLocaleString(),
      badge: '+5%',
      badgeBg: 'bg-green-100 text-green-600',
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
            className="flex items-center justify-between rounded-2xl border border-white/50 bg-white/60 backdrop-blur-md shadow-sm p-5"
          >
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
              <span
                className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${stat.badgeBg}`}
              >
                {stat.badge}
              </span>
            </div>
            <div className={`rounded-2xl p-3 ${stat.iconBg}`}>
              <Icon className={stat.iconColor} size={22} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
