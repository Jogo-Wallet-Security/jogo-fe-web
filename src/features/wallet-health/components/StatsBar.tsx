import { Shield, ShieldOff, Search } from 'lucide-react'

export function StatsBar() {
  const stats = [
    {
      label: 'Threats Blocked',
      value: 0,
      badge: '+2 this week',
      badgeBg: 'bg-green-100 text-green-600',
      icon: Shield,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-400',
    },
    {
      label: 'Permissions Revoked',
      value: 0,
      badge: 'Last 30 days',
      badgeBg: 'bg-slate-100 text-slate-500',
      icon: ShieldOff,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-400',
    },
    {
      label: 'Sites Analyzed',
      value: 0,
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
            className="flex items-center justify-between rounded-2xl border border-white/50 bg-sky-frost backdrop-blur-md shadow-sm p-5"
          >
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">{stat.label}</p>
              <div className="flex gap-2">
                <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                <span
                  className={`mt-1.5 inline-block rounded-full h-fit px-2.5 py-0.5 text-3xs font-semibold ${stat.badgeBg}`}
                >
                  {stat.badge}
                </span>
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
