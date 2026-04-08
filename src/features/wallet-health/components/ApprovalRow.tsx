import { useState } from 'react'
import type { Approval } from '../types'
import { RiskBadge } from './RiskBadge'
import { useWalletHealth } from '../hooks/useWalletHealth'
import { ConfirmationModal } from '../../../components/ui/ConfirmationModal'
import { ShieldOff } from 'lucide-react'

export function ApprovalRow({ approval }: { approval: Approval }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { revokeApproval } = useWalletHealth()

  const handleRevoke = () => {
    revokeApproval(approval.id, approval.contractName)
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="grid grid-cols-12 items-center gap-4 border-b border-slate-200/50 p-4 transition-colors hover:bg-white/30">
        <div className="col-span-12 md:col-span-4 flex items-center gap-3">
          {approval.tokenIcon ? (
            <img src={approval.tokenIcon} className="h-8 w-8 rounded-full shadow-sm" alt="" />
          ) : (
            <div className="h-8 w-8 rounded-full bg-slate-200" />
          )}
          <div>
            <p className="font-semibold text-slate-800">{approval.contractName}</p>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              {approval.contractAddress.slice(0, 6)}...{approval.contractAddress.slice(-4)}
            </p>
          </div>
        </div>

        <div className="col-span-6 md:col-span-2 hidden md:block">
          <p className="text-sm font-medium text-slate-800">{approval.network}</p>
        </div>

        <div className="col-span-6 md:col-span-2 hidden md:block">
          <p className="text-sm font-medium text-slate-800">{approval.allowance}</p>
          <p className="text-xs text-slate-500 mt-0.5">{approval.tokenSymbol}</p>
        </div>

        <div className="col-span-8 md:col-span-2">
          <RiskBadge level={approval.riskLevel} />
          {approval.riskReason && (
            <p
              className="mt-1 text-[10px] text-slate-500 max-w-[120px] truncate"
              title={approval.riskReason}
            >
              {approval.riskReason}
            </p>
          )}
        </div>

        <div className="col-span-4 md:col-span-2 flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg px-4 py-2 text-sm font-medium text-red-500 bg-red-500/10 hover:bg-red-500/20 transition-colors"
          >
            Revoke
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleRevoke}
        title="Revoke Approval"
        confirmText="Confirm Revoke"
        confirmColor="red"
        icon={<ShieldOff size={16} />}
        description={
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-xl bg-white/50 p-4 border border-slate-100">
              <img src={approval.tokenIcon} className="h-10 w-10 rounded-full" alt="" />
              <div>
                <p className="font-bold text-slate-800">{approval.contractName}</p>
                <p className="text-sm text-slate-500">
                  Contract: {approval.contractAddress.slice(0, 6)}...
                  {approval.contractAddress.slice(-4)}
                </p>
                <p className="text-sm text-slate-500">Token: {approval.tokenSymbol}</p>
              </div>
            </div>
            <div className="flex justify-between items-center rounded-xl bg-white/50 p-4 border border-slate-100">
              <span className="text-sm text-slate-500">Network</span>
              <span className="font-medium text-slate-800">{approval.network}</span>
            </div>
            <div className="flex justify-between items-center rounded-xl bg-white/50 p-4 border border-slate-100">
              <span className="text-sm text-slate-500">Estimated Gas Fee</span>
              <div className="text-right">
                <span className="font-bold text-slate-800">${approval.estimatedGasUSD}</span>
                <span className="ml-2 text-xs text-slate-500">
                  ({approval.estimatedGasEth} ETH)
                </span>
              </div>
            </div>
          </div>
        }
      />
    </>
  )
}
