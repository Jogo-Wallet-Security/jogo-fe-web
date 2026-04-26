import { useState } from 'react'
import type { ThreatLogApprovalRevoked } from '../../types/thread-log.types'
import { ApprovalInfoModal } from '../ApprovalInfoModal'
import { RISK_ICON } from '../../constants'

export function RevokedApprovalRow({ row }: { row: ThreatLogApprovalRevoked }) {
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  function formatDate(iso: string) {
    const d = new Date(iso)
    return (
      d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
      ', ' +
      d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    )
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-3 py-4 items-center group hover:bg-white/40 transition-colors px-2 -mx-2 sm:px-4 sm:-mx-4 rounded-2xl border-b border-white/20 last:border-0">
        {/* Protocol / Asset (col-span-3) */}
        <div className="col-span-3 flex items-center gap-3 min-w-0">
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-slate-900 text-sm truncate">
              {row.tokenName || row.asset || 'Unknown Token'}
            </p>
            <p className="text-xs text-slate-500 truncate">{row.assetType || 'Unknown Type'}</p>
          </div>
        </div>

        {/* Action (col-span-2) */}
        <div className="col-span-2 min-w-0">
          <p className="text-sm font-medium text-slate-700">{row.action || '-'}</p>
        </div>

        {/* Risk Assessment (col-span-2) */}
        <div className="col-span-2 min-w-0">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium risk-badge-${(row.riskLevel || 'None').toLowerCase()}`}
          >
            {(() => {
              const RiskIcon = RISK_ICON[row.riskLevel || 'None']
              return <RiskIcon size={14} />
            })()}
            {row.riskLevel} Risk
          </span>
        </div>

        {/* Allowance (col-span-3) */}
        <div className="col-span-2 min-w-0">
          <p className="text-sm font-semibold text-slate-800">
            {row.isUnlimited
              ? 'Unlimited'
              : row.allowance?.length > 10
                ? row.allowance.slice(0, 10) + '...'
                : row.allowance}
          </p>
          {row.explanation && (
            <p className="text-[10px] text-slate-400 truncate">{row.explanation}</p>
          )}
        </div>

        <div className="hidden lg:block col-span-2 min-w-0">
          <p className="text-sm text-slate-500 truncate">{formatDate(row.revokeDate)}</p>
        </div>

        <div className="hidden lg:flex col-span-1 justify-end shrink-0">
          <button
            className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-[0px_1px_2px_#0000000d] text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            onClick={() => setIsInfoOpen(true)}
          >
            Details
          </button>
        </div>
      </div>

      <ApprovalInfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        approval={row}
        revokeDate={row.revokeDate}
        transaction={row.transaction}
      />
    </>
  )
}
