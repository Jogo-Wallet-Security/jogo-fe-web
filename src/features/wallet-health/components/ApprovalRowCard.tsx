import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useRevokeEstimate } from '../hooks/useRevokeEstimate'
import { useRevokeApproval } from '../hooks/useRevokeApproval'
import type { Approval } from '../types/approval.types'
import { ConfirmationModal } from '../../../components/ui/ConfirmationModal'
import { ApprovalInfoModal } from './ApprovalInfoModal'
import { ShieldOff, Info, Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { RISK_ICON } from '../constants'

const STATUS_LABEL: Record<string, string> = {
  idle: '',
  preparing: 'Preparing transaction…',
  'awaiting-wallet': 'Confirm in your wallet…',
  mining: 'Transaction submitted, mining…',
  logging: 'Recording revoke…',
  success: 'Revoke successful!',
  error: 'Revoke failed',
}

export function ApprovalRowCard({ approval }: { approval: Approval }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isInfoOpen, setIsInfoOpen] = useState(false)
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

  const {
    status,
    error: revokeError,
    revoke,
    reset,
  } = useRevokeApproval(approval, address, estimate, () => {
    setTimeout(() => {
      setIsModalOpen(false)
      // eslint-disable-next-line react-hooks/immutability
      reset()

      window.location.reload()
    }, 1500)
  })

  const isRevoking = status !== 'idle' && status !== 'success' && status !== 'error'

  return (
    <>
      {/* Each row is its own glass card */}
      <div className="grid grid-cols-12 items-center gap-3 rounded-2xl border border-white/50 bg-white/40 backdrop-blur-sm shadow-sm px-4 py-3 hover:bg-white/60 transition-all">
        {/* Asset / Spender */}
        <div className="col-span-3 flex items-center gap-3 min-w-0">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">{approval.tokenName}</p>
            <p className="text-[11px] text-slate-500 truncate">{approval.assetType}</p>
          </div>
        </div>

        <div className="col-span-2 flex items-center text-sm font-medium text-slate-700">
          {approval.action || '-'}
        </div>

        {/* Risk Assessment */}
        <div className="col-span-2 flex items-center">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium risk-badge-${(approval.riskLevel || 'None').toLowerCase()}`}
          >
            {(() => {
              const RiskIcon = RISK_ICON[approval.riskLevel || 'None']
              return <RiskIcon size={14} />
            })()}
            {approval.riskLevel} Risk
          </span>
        </div>

        {/* Allowance */}
        <div className="col-span-3">
          <p className="text-sm font-semibold text-slate-800">
            {approval.isUnlimited
              ? 'Unlimited'
              : approval.allowance?.length > 10
                ? approval.allowance.slice(0, 10) + '...'
                : approval.allowance}
          </p>
          {approval.explanation && (
            <p className="text-[10px] text-slate-400 truncate">{approval.explanation}</p>
          )}
        </div>

        {/* Action */}
        <div className="col-span-2 flex items-center justify-end gap-2">
          <button
            onClick={() => setIsInfoOpen(true)}
            className="rounded-full border border-slate-200 bg-white/60 p-1.5 text-slate-400 hover:text-slate-600 transition-colors hover:cursor-pointer"
          >
            <Info size={14} />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-xl border border-slate-200 bg-white/60 hover:bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all hover:cursor-pointer"
          >
            Revoke
          </button>
        </div>
      </div>

      {/* Info Detail Modal */}
      <ApprovalInfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        approval={approval}
      />

      {/* Revoke Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => {
          if (!isRevoking) {
            setIsModalOpen(false)
            reset()
          }
        }}
        onConfirm={revoke}
        title="Revoke Approval"
        confirmText={
          isRevoking
            ? STATUS_LABEL[status]
            : status === 'success'
              ? 'Revoke successful!'
              : 'Confirm Revoke'
        }
        confirmColor="red"
        isConfirming={isRevoking || status === 'success'}
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
                className={`inline-flex items-center gap-1 font-bold risk-badge-${(approval.riskLevel || 'None').toLowerCase()}`}
              >
                {(() => {
                  const RiskIcon = RISK_ICON[approval.riskLevel || 'None']
                  return <RiskIcon size={12} />
                })()}
                {approval.riskLevel}
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
                {approval.isUnlimited
                  ? '∞ Unlimited'
                  : approval.allowance?.length > 10
                    ? approval.allowance.slice(0, 10) + '...'
                    : approval.allowance}
              </span>
            </div>

            {/* Network — from approval */}
            <div className="flex justify-between rounded-xl bg-white/50 p-4 border border-slate-100">
              <span className="text-sm text-slate-500">Network</span>
              <span className="font-medium text-slate-800">{approval.chainName || 'Base'}</span>
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
                  ${estimate.usdCost}{' '}
                  <span className="text-xs text-slate-400">({estimate.ethCost} ETH)</span>
                </span>
              ) : (
                <span className="text-slate-400 text-xs">—</span>
              )}
            </div>

            {/* Revoke Status Feedback */}
            {status !== 'idle' && (
              <div
                className={`flex items-center gap-2 rounded-xl p-4 border text-sm font-medium ${
                  status === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : status === 'error'
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'bg-blue-50 border-blue-200 text-blue-700'
                }`}
              >
                {status === 'success' ? (
                  <CheckCircle2 size={16} />
                ) : status === 'error' ? (
                  <XCircle size={16} />
                ) : (
                  <Loader2 size={16} className="animate-spin" />
                )}
                <span>{revokeError ?? STATUS_LABEL[status]}</span>
              </div>
            )}
          </div>
        }
      />
    </>
  )
}
