import { ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react'
import type { RiskLevel } from '../types'

type RiskConfig = {
  bg: string
  border: string
  text: string
  icon: React.ElementType
}

const riskConfig: Record<RiskLevel, RiskConfig> = {
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
  Low: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-500',
    icon: ShieldCheck,
  },
  Safe: {
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
