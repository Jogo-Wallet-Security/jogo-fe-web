import { motion } from 'motion/react'
import { AlertTriangle, ShieldOff } from 'lucide-react'
import { useApprovalsStore } from '../store/approvalStore'
import {
  selectFilterCountFromResponse,
  selectWalletScoreFromResponse,
} from '../selectors/approvalSelectors'

export function WalletScoreGauge() {
  const data = useApprovalsStore((state) => state.data)
  const walletScore = selectWalletScoreFromResponse(data)
  const filterCount = selectFilterCountFromResponse(data)
  const score = walletScore?.walletSecurityScore

  const scoreColor = score < 50 ? '#f97316' : score < 80 ? '#f59e0b' : '#10b981'
  const statusLabel = score < 50 ? 'Attention Needed' : score < 80 ? 'Beware' : 'All Safe!'
  const strokeDasharray = `${score}, 100`

  const criticalCount = filterCount.totalCritical
  const highCount = filterCount.totalHigh
  const criticalPenalty = criticalCount * 15
  const highPenalty = highCount * 5

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col rounded-3xl border border-white/40 bg-white/20 backdrop-blur-md shadow-sm  p-6 ">
        {/* Label */}
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 text-center mb-4">
          Wallet Health
        </p>

        {/* Gauge */}
        <div className="relative mx-auto mb-4 h-36 w-36">
          <svg viewBox="0 0 36 36" className="h-full w-full rotate-120">
            <path
              stroke="#e2e8f0"
              strokeWidth="3"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <motion.path
              initial={{ strokeDasharray: '0, 100' }}
              animate={{ strokeDasharray }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              stroke={scoreColor}
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-slate-800">{score}</span>
          </div>
        </div>

        {/* Status label */}
        <p className="text-center font-semibold text-slate-700 mb-1">{statusLabel}</p>
        <p className="text-center text-xs text-slate-500 mb-5 leading-relaxed">
          Your wallet security score is impacted by active approvals.
        </p>

        {/* Score Impact breakdown */}
        <div className="rounded-xl border border-white/50 bg-white/60 backdrop-blur-md p-3 mb-4 space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
            Score Impact
          </p>
          {criticalCount > 0 && (
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="h-2 w-2 rounded-full bg-red-500 inline-block" />
                {criticalCount} Critical Approval{criticalCount > 1 ? 's' : ''}
              </span>
              <span className="font-bold text-red-500">-{criticalPenalty}</span>
            </div>
          )}
          {highCount > 0 && (
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="h-2 w-2 rounded-full bg-orange-400 inline-block" />
                {highCount} High Risk
              </span>
              <span className="font-bold text-orange-500">-{highPenalty}</span>
            </div>
          )}
        </div>
      </div>
      {/* Critical Risk Alert */}
      {criticalCount > 0 && (
        <div className="rounded-3xl border border-red-100 bg-gradient-to-br from-red-50/60 to-orange-50/60 shadow-sm px-4 py-8 mb-4">
          {' '}
          <div className="flex items-start gap-2 mb-2">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="text-red-500" size={18} />
            </div>{' '}
            <div>
              <p className="font-bold text-red-700">Critical Risk Detected</p>
              <p className="text-2xs text-red-600 leading-relaxed mt-0.5 pr-10">
                You have {criticalCount} approval{criticalCount > 1 ? 's' : ''} that grant
                {criticalCount === 1 ? 's' : ''} unlimited access to your funds.
              </p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-500 hover:bg-red-600 transition-colors px-3 py-2 text-xs font-semibold text-white mt-4">
            <ShieldOff size={13} /> Revoke All Critical
          </button>
        </div>
      )}
    </div>
  )
}
