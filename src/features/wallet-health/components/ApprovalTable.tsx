import { useState } from 'react'
import { useWalletHealth } from '../hooks/useWalletHealth'
import type { Approval } from '../types'
import { ConfirmationModal } from '../../../components/ui/ConfirmationModal'
import { ShieldOff, Info } from 'lucide-react'

const riskBadgeStyle: Record<string, string> = {
  Critical: 'bg-red-100 text-red-600 border border-red-200',
  High: 'bg-orange-100 text-orange-600 border border-orange-200',
  Medium: 'bg-yellow-100 text-yellow-600 border border-yellow-200',
  Low: 'bg-green-100 text-green-600 border border-green-200',
  None: 'bg-slate-100 text-slate-500 border border-slate-200',
}

const riskIcon: Record<string, string> = {
  Critical: '🛡️',
  High: '⚠️',
  Medium: '🟡',
  Low: '✅',
  None: '—',
}

const PAGE_SIZE = 5

function ApprovalRowCard({ approval }: { approval: Approval }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { revokeApproval } = useWalletHealth()

  return (
    <>
      {/* Each row is its own glass card */}
      <div className="grid grid-cols-12 items-center gap-3 rounded-2xl border border-white/50 bg-white/40 backdrop-blur-sm shadow-sm px-4 py-3 hover:bg-white/60 transition-all">
        {/* Asset / Spender */}
        <div className="col-span-4 flex items-center gap-3 min-w-0">
          <div className="relative flex-shrink-0">
            {approval.tokenIcon ? (
              <img
                src={approval.tokenIcon}
                className="h-9 w-9 rounded-full border border-white/60 shadow-sm"
                alt=""
                onError={(e) => {
                  ;(e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            ) : (
              <div className="h-9 w-9 rounded-full bg-slate-200" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">{approval.contractName}</p>
            <p className="text-[11px] text-slate-500 truncate">{approval.tokenSymbol} Token</p>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="col-span-3 flex items-center">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${riskBadgeStyle[approval.riskLevel]}`}
          >
            <span>{riskIcon[approval.riskLevel]}</span>
            {approval.riskLevel} Risk
          </span>
        </div>

        {/* Allowance */}
        <div className="col-span-3">
          <p className="text-sm font-semibold text-slate-800">{approval.allowance}</p>
          {approval.riskReason && (
            <p className="text-[10px] text-slate-400 truncate">{approval.riskReason}</p>
          )}
        </div>

        {/* Action */}
        <div className="col-span-2 flex items-center justify-end gap-2">
          <button className="rounded-full border border-slate-200 bg-white/60 p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
            <Info size={14} />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-xl border border-slate-200 bg-white/60 hover:bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all"
          >
            Revoke
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          revokeApproval(approval.id, approval.contractName)
          setIsModalOpen(false)
        }}
        title="Revoke Approval"
        confirmText="Confirm Revoke"
        confirmColor="red"
        icon={<ShieldOff size={16} />}
        description={
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-xl bg-white/50 p-4 border border-slate-100">
              {approval.tokenIcon && (
                <img src={approval.tokenIcon} className="h-10 w-10 rounded-full" alt="" />
              )}
              <div>
                <p className="font-bold text-slate-800">{approval.contractName}</p>
                <p className="text-sm text-slate-500">Token: {approval.tokenSymbol}</p>
              </div>
            </div>
            <div className="flex justify-between rounded-xl bg-white/50 p-4 border border-slate-100">
              <span className="text-sm text-slate-500">Network</span>
              <span className="font-medium text-slate-800">{approval.network}</span>
            </div>
            <div className="flex justify-between rounded-xl bg-white/50 p-4 border border-slate-100">
              <span className="text-sm text-slate-500">Est. Gas Fee</span>
              <span className="font-bold text-slate-800">
                ${approval.estimatedGasUSD}{' '}
                <span className="text-xs text-slate-400">({approval.estimatedGasEth} ETH)</span>
              </span>
            </div>
          </div>
        }
      />
    </>
  )
}

export function ApprovalTable() {
  const { filteredApprovals } = useWalletHealth()
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(filteredApprovals.length / PAGE_SIZE)
  const paginated = filteredApprovals.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
  const startNum = page * PAGE_SIZE + 1
  const endNum = Math.min((page + 1) * PAGE_SIZE, filteredApprovals.length)

  return (
    <div className="flex flex-col rounded-3xl border border-white/40 bg-white/20 backdrop-blur-md shadow-sm p-5 gap-2">
      {/* Column header */}
      <div className="grid grid-cols-12 gap-3 px-4 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-600 border-b border-white/30">
        <div className="col-span-4">Asset / Spender</div>
        <div className="col-span-3">Risk Assessment</div>
        <div className="col-span-3">Allowance</div>
        <div className="col-span-2 text-right">Action</div>
      </div>

      {/* Individual cards per row */}
      <div className="flex flex-col gap-2">
        {paginated.length === 0 ? (
          <div className="flex h-28 items-center justify-center text-sm text-slate-400">
            No approvals for this filter.
          </div>
        ) : (
          paginated.map((approval: Approval) => (
            <ApprovalRowCard key={approval.id} approval={approval} />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-3 mt-1 border-t border-white/30">
        <span>
          Showing {filteredApprovals.length === 0 ? 0 : startNum}–{endNum} of{' '}
          {filteredApprovals.length} results
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="rounded-lg border border-white/50 bg-white/40 px-3 py-1 hover:bg-white/60 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="rounded-lg border border-white/50 bg-white/40 px-3 py-1 hover:bg-white/60 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
