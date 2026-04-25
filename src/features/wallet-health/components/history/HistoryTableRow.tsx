function HistoryRiskBadge({ level }: { level?: string }) {
  if (!level) return <span className="text-xs text-slate-400">—</span>
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold risk-badge-${(level || 'None').toLowerCase()}`}
    >
      {level}
    </span>
  )
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return (
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
    ', ' +
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  )
}

function getStatusColor(status: string) {
  const s = (status || '').toLowerCase()
  if (
    s.includes('blocked') ||
    s.includes('drain') ||
    s.includes('failed') ||
    s.includes('critical')
  )
    return 'bg-red-500'
  if (s.includes('warn') || s.includes('medium') || s.includes('high')) return 'bg-orange-500'
  if (
    s.includes('success') ||
    s.includes('rescue') ||
    s.includes('low') ||
    s.includes('safe') ||
    s.includes('monit')
  )
    return 'bg-emerald-500'
  return 'bg-blue-500'
}

interface HistoryTableRowProps {
  iconChar: string
  title: string
  subtitle: string
  actionText: string
  subActionText: string
  riskLevel: string
  riskSubtext?: string
  dateIso: string
  statusFlag: string
}

export function HistoryTableRow({
  iconChar,
  title,
  subtitle,
  actionText,
  subActionText,
  riskLevel,
  riskSubtext,
  dateIso,
  statusFlag,
}: HistoryTableRowProps) {
  const dotColor = getStatusColor(statusFlag || riskLevel)

  return (
    <div className="grid grid-cols-12 gap-4 py-4 items-center group hover:bg-white/40 transition-colors px-2 -mx-2 sm:px-4 sm:-mx-4 rounded-2xl">
      <div className="col-span-4 lg:col-span-3 flex items-center gap-3 min-w-0">
        <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm shrink-0 border border-slate-100">
          <span className="text-lg font-bold text-slate-700">{iconChar}</span>
          <div
            className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${dotColor}`}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-slate-900 text-sm truncate">{title || 'Unknown'}</p>
          <p className="text-xs text-slate-500 truncate">{subtitle || '—'}</p>
        </div>
      </div>

      <div className="col-span-4 lg:col-span-3 min-w-0">
        <p className="text-sm font-medium text-slate-700 truncate">{actionText || 'Interaction'}</p>
        <p className="text-xs text-slate-500 truncate">{subActionText || '—'}</p>
      </div>

      <div className="col-span-4 lg:col-span-3 min-w-0">
        <div className="flex flex-col items-start gap-1">
          <HistoryRiskBadge level={riskLevel} />
          {riskSubtext && (
            <p className="text-[10px] text-slate-400 truncate w-full">{riskSubtext}</p>
          )}
        </div>
      </div>

      <div className="hidden lg:block col-span-2 min-w-0">
        <p className="text-sm text-slate-500 truncate">{formatDate(dateIso)}</p>
      </div>

      <div className="hidden lg:flex col-span-1 justify-end shrink-0">
        <button className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-[0px_1px_2px_#0000000d] text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
          Details
        </button>
      </div>
    </div>
  )
}
