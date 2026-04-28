import {
  ShieldX,
  TriangleAlert,
  CircleAlert,
  CircleCheck,
  Minus,
  type LucideIcon,
} from 'lucide-react'
import type { RiskLevel } from './types'

// ─── Risk Display ─────────────────────────────────────────────────────────────

export const RISK_ICON: Record<RiskLevel | 'None', LucideIcon> = {
  Critical: ShieldX,
  High: TriangleAlert,
  Low: CircleAlert,
  Safe: CircleCheck,
  None: Minus,
}

export const RISK_DOT_COLOR: Record<RiskLevel | 'All', string> = {
  All: 'bg-slate-400',
  Critical: 'bg-red-500',
  High: 'bg-orange-400',
  Low: 'bg-yellow-400',
  Safe: 'bg-green-400',
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export const PAGE_OPTIONS = [10, 25, 50, 100] as const

// ─── Filter Options ───────────────────────────────────────────────────────────

export const RISK_FILTERS: (RiskLevel | 'All')[] = ['All', 'Critical', 'High', 'Low', 'Safe']
