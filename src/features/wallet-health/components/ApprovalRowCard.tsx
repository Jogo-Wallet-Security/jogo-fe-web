import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useWalletHealth } from '../hooks/useWalletHealth'
import { useRevokeEstimate } from '../hooks/useRevokeEstimate'
import type { Approval } from '../types/approval.types'
import { ConfirmationModal } from '../../../components/ui/ConfirmationModal'
import { ShieldOff, Info, Loader2 } from 'lucide-react'
import { RISK_ICON } from '../constants'

export function ApprovalRowCard({ approval }: { approval: Approval }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { revokeApproval } = useWalletHealth()
  const { address } = useAccount()

  const {
    estimate,
    isLoading: estimateLoading,
    error: estimateError,
  } = useRevokeEstimate(
    isModalOpen && address
      ? {
          owner: address,
          spender: approval.spender,
          asset: approval.asset,
          assetType: approval.assetType,
          chainId: import.meta.env.VITE_CHAIN_ID,
        }
      : null,
  )

  return (
    <>
      {/* Each row is its own glass card */}
      <div className="grid grid-cols-12 items-center gap-3 rounded-2xl border border-white/50 bg-white/40 backdrop-blur-sm shadow-sm px-4 py-3 hover:bg-white/60 transition-all">
        {/* Asset / Spender */}
        <div className="col-span-4 flex items-center gap-3 min-w-0">
          {/* <div className="relative flex-shrink-0">
            {approval.tokenIcon ? (
              <img
                src={approval.tokenIcon}
                className="h-9 w-9 rounded-full border border-white/60 shadow-sm"
                alt=""
                onError={(e) => {
                  ; (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            ) : (
              <div className="h-9 w-9 rounded-full bg-slate-200" />
            )}
          </div> */}

          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">{approval.tokenName}</p>
            <p className="text-[11px] text-slate-500 truncate">{approval.tokenSymbol} Token</p>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="col-span-3 flex items-center">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold risk-badge-${(approval.riskLevel || 'None').toLowerCase()}`}
          >
            <span>{RISK_ICON[approval.riskLevel]}</span>
            {approval.riskLevel} Risk
          </span>
        </div>

        {/* Allowance */}
        <div className="col-span-3">
          <p className="text-sm font-semibold text-slate-800">{approval.allowance}</p>
          {approval.explanation && (
            <p className="text-[10px] text-slate-400 truncate">{approval.explanation}</p>
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
          revokeApproval(approval.spender, approval.asset)
          setIsModalOpen(false)
        }}
        title="Revoke Approval"
        confirmText="Confirm Revoke"
        confirmColor="red"
        icon={<ShieldOff size={16} />}
        description={
          <div className="space-y-3">
            {/* Token + Spender header */}
            <div className="flex items-center justify-between rounded-xl bg-white/50 p-4 border border-slate-100">
              <div>
                <p className="font-bold text-slate-800">{approval.tokenName}</p>
                <p className="text-sm text-slate-500">
                  {approval.tokenSymbol} · {approval.assetType}
                </p>
              </div>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold risk-badge-${(approval.riskLevel || 'None').toLowerCase()}`}
              >
                {RISK_ICON[approval.riskLevel]} {approval.riskLevel}
              </span>
            </div>

            {/* Spender */}
            <div className="flex justify-between items-center rounded-xl bg-white/50 p-4 border border-slate-100">
              <span className="text-sm text-slate-500">Spender</span>
              <div className="text-right">
                <p className="font-medium text-slate-800 text-sm">
                  {approval.spenderMeta.name}
                  {approval.spenderMeta.isVerified && (
                    <span className="ml-1.5 text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-1.5 py-0.5">
                      ✓ Verified
                    </span>
                  )}
                </p>
                <p className="text-[10px] text-slate-400 font-mono truncate max-w-[160px]">
                  {approval.spender}
                </p>
              </div>
            </div>

            {/* Allowance */}
            <div className="flex justify-between rounded-xl bg-white/50 p-4 border border-slate-100">
              <span className="text-sm text-slate-500">Allowance</span>
              <span
                className={`font-semibold text-sm ${approval.isUnlimited ? 'text-red-500' : 'text-slate-800'}`}
              >
                {approval.isUnlimited ? '∞ Unlimited' : approval.allowance}
              </span>
            </div>

            {/* Network — from estimate */}
            <div className="flex justify-between rounded-xl bg-white/50 p-4 border border-slate-100">
              <span className="text-sm text-slate-500">Network</span>
              {estimateLoading ? (
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Loader2 size={12} className="animate-spin" /> Loading…
                </span>
              ) : estimate ? (
                <span className="font-medium text-slate-800">{estimate.network}</span>
              ) : (
                <span className="text-slate-400 text-xs">—</span>
              )}
            </div>

            {/* Gas Fee — from estimate */}
            <div className="flex justify-between rounded-xl bg-white/50 p-4 border border-slate-100">
              <span className="text-sm text-slate-500">Est. Gas Fee</span>
              {estimateLoading ? (
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Loader2 size={12} className="animate-spin" /> Estimating…
                </span>
              ) : estimateError ? (
                <span className="text-xs text-red-400">Could not estimate</span>
              ) : estimate ? (
                <span className="font-bold text-slate-800">
                  ${estimate.gasEstimateUSD}{' '}
                  <span className="text-xs text-slate-400">({estimate.gasEstimateEth} ETH)</span>
                </span>
              ) : (
                <span className="text-slate-400 text-xs">—</span>
              )}
            </div>
          </div>
        }
      />
    </>
  )
}
