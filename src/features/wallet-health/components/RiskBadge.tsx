import { ShieldAlert, ShieldCheck, AlertTriangle, AlertCircle } from 'lucide-react'
import type { RiskLevel } from '../types'

const riskConfig = {
  Critical: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-500',
    icon: ShieldAlert,
  },
  High: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    text: 'text-orange-500',
    icon: AlertTriangle,
  },
  Medium: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    text: 'text-yellow-600',
    icon: AlertCircle,
  },
  Low: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-500',
    icon: ShieldCheck,
  },
  None: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-500',
    icon: ShieldCheck,
  },
}

export function RiskBadge({ level }: { level: RiskLevel }) {
  const config = riskConfig[level]
  const Icon = config.icon

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${config.bg} ${config.border} ${config.text}`}
    >
      <Icon size={12} />
      <span>{level} Risk</span>
    </div>
  )
}
