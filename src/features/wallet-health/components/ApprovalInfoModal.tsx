import type { Approval } from '../types/approval.types'
import type { RevokeTransaction, ThreatLogApprovalRevoked } from '../types/thread-log.types'
import { Modal } from '../../../components/ui/Modal'
import { RISK_ICON } from '../constants'
import { AlertTriangle, Calendar, Fuel } from 'lucide-react'

/* ── Colour maps ─────────────────────────────────────────────────────────────── */

const RISK_TEXT_COLOR: Record<string, string> = {
  Critical: 'text-red-500',
  High: 'text-orange-500',
  Low: 'text-yellow-600',
  Safe: 'text-emerald-500',
}

const RISK_BADGE_BG: Record<string, string> = {
  Critical: 'bg-red-50 text-red-600 border-red-200',
  High: 'bg-orange-50 text-orange-600 border-orange-200',
  Low: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Safe: 'bg-emerald-50 text-emerald-600 border-emerald-200',
}

const TAG_STYLE: Record<string, string> = {
  UNLIMITED: 'bg-red-50 text-red-500 border-red-200',
  DANGER: 'bg-red-50 text-red-500 border-red-200',
  LIMITED: 'bg-slate-100 text-slate-500 border-slate-200',
}

import { motion } from 'motion/react'

function ScoreRing({ score, riskLevel }: { score: number; riskLevel: string }) {
  const strokeDasharray = `${score}, 100`

  // Use tailwind utility classes for the stroke color based on riskLevel
  const riskColorHex: Record<string, string> = {
    Critical: '#ef4444', // red-500
    High: '#fb923c', // orange-400
    Low: '#facc15', // yellow-400
    Safe: '#34d399', // emerald-400
  }

  const scoreColor = riskColorHex[riskLevel] ?? '#94a3b8' // slate-400

  return (
    <div className="relative mx-auto h-32 w-32">
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
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
        <span className="text-4xl font-extrabold text-slate-800">{score}</span>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 -mt-1">
          Score
        </span>
      </div>
    </div>
  )
}

/* ── Main component ──────────────────────────────────────────────────────────── */

export interface ApprovalInfoModalProps {
  isOpen: boolean
  onClose: () => void
  approval: Approval | ThreatLogApprovalRevoked
  /** If present, shows revoke-specific info (Gas Fee, Revoke Date) */
  revokeDate?: string
  transaction?: RevokeTransaction
}

export function ApprovalInfoModal({
  isOpen,
  onClose,
  approval,
  revokeDate,
  transaction,
}: ApprovalInfoModalProps) {
  const riskLevel = approval.riskLevel || 'Safe'
  const RiskIcon = RISK_ICON[riskLevel as keyof typeof RISK_ICON] ?? RISK_ICON.Safe
  const signalCount = approval.riskSignals?.length ?? 0

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Approval Detail" maxWidth="max-w-4xl">
      <div className="flex flex-col gap-6">
        {/* ── Two-column layout ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
          {/* LEFT — Score ring + badge + explanation */}
          <div className="flex flex-col items-center gap-3 rounded-2xl bg-gradient-to-br from-slate-50/80 to-white/50 border border-white/60 p-5 col-span-5">
            {/* Risk badge */}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border ${RISK_BADGE_BG[riskLevel]}`}
            >
              <RiskIcon size={12} />
              {riskLevel} Risk
            </span>

            {/* Donut */}
            <ScoreRing score={approval.riskScore} riskLevel={riskLevel} />

            {/* Verdict */}
            <p className={`text-sm font-bold ${RISK_TEXT_COLOR[riskLevel]}`}>
              {riskLevel === 'Critical'
                ? 'Critical Risk Detected'
                : riskLevel === 'High'
                  ? 'High Risk Detected'
                  : riskLevel === 'Low'
                    ? 'Low Risk Detected'
                    : 'No Risk Detected'}
            </p>

            {/* AI Explanation */}
            {approval.explanation && (
              <div className="w-full mt-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 mb-1 flex items-center gap-1">
                  <span className="text-indigo-400">✦</span> AI Explanation
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">{approval.explanation}</p>
              </div>
            )}
          </div>

          {/* RIGHT — Action Details + Risk signals + What will happen */}
          <div className="flex flex-col gap-4 col-span-7">
            {/* Action Details */}
            <div className="rounded-2xl bg-white/50 border border-white/60 p-4">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3">
                Action Details
              </h4>
              <div className="flex flex-col">
                <div className="flex justify-between items-center py-2.5 border-b border-slate-100/60">
                  <span className="text-xs text-slate-500">Type</span>
                  <span className="text-xs font-medium text-slate-800">
                    {approval.action || 'Token Approval'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-slate-100/60">
                  <span className="text-xs text-slate-500">Target Contract</span>
                  <span className="text-[11px] font-medium text-indigo-500 bg-indigo-50/80 px-2 py-0.5 rounded border border-indigo-100/50 font-mono">
                    {approval.spender
                      ? `${approval.spender.slice(0, 6)}...${approval.spender.slice(-4)}`
                      : '-'}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2.5">
                  <span className="text-xs text-slate-500">Network</span>
                  <span className="text-xs font-medium text-slate-800">
                    {approval.chainName || 'Base'}
                  </span>
                </div>
              </div>
            </div>

            {/* Revoke Info (only shown for revoked approvals) */}
            {revokeDate && (
              <div className="rounded-2xl bg-white/50 border border-white/60 p-4">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Revoke Info
                </h4>
                <div className="flex flex-col">
                  <div className="flex justify-between items-center py-2.5 border-b border-slate-100/60">
                    <span className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Calendar size={12} /> Revoke Date
                    </span>
                    <span className="text-xs font-medium text-slate-800">
                      {new Date(revokeDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  {transaction && (
                    <>
                      <div className="flex justify-between items-center py-2.5 border-b border-slate-100/60">
                        <span className="text-xs text-slate-500 flex items-center gap-1.5">
                          <Fuel size={12} /> Gas Fee
                        </span>
                        <span className="text-xs font-medium text-slate-800">
                          {transaction.gasCostUsd ? `$${transaction.gasCostUsd}` : '—'}
                          {transaction.gasCostEth && (
                            <span className="text-slate-400 ml-1">
                              ({transaction.gasCostEth} ETH)
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2.5">
                        <span className="text-xs text-slate-500">Tx Hash</span>
                        {transaction.explorerUrl ? (
                          <a
                            href={transaction.explorerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-medium text-indigo-500 bg-indigo-50/80 px-2 py-0.5 rounded border border-indigo-100/50 font-mono hover:underline"
                          >
                            {transaction.txHash
                              ? `${transaction.txHash.slice(0, 6)}...${transaction.txHash.slice(-4)}`
                              : '—'}
                          </a>
                        ) : (
                          <span className="text-[11px] font-medium text-indigo-500 bg-indigo-50/80 px-2 py-0.5 rounded border border-indigo-100/50 font-mono">
                            {transaction.txHash
                              ? `${transaction.txHash.slice(0, 6)}...${transaction.txHash.slice(-4)}`
                              : '—'}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Risk Signals */}
            <div className="rounded-2xl bg-white/50 border border-white/60 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Risk Signals
                </h4>
                {signalCount > 0 && (
                  <span className="rounded-full bg-red-50 border border-red-200 px-2 py-0.5 text-[10px] font-bold text-red-500">
                    {signalCount} Found{signalCount > 1 ? 's' : ''}
                  </span>
                )}
              </div>

              {signalCount === 0 ? (
                <p className="text-xs text-slate-400 italic">No risk signals found.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {approval.riskSignals.map((signal, idx) => (
                    <div key={idx} className="flex gap-2.5">
                      <div className="mt-0.5 flex-shrink-0">
                        <AlertTriangle size={14} className="text-red-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-700 leading-tight">
                          {signal.title}
                        </p>
                        <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                          {signal.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* What Will Happen */}
            <div className="rounded-2xl bg-white/50 border border-white/60 p-4">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3">
                What Will Happen
              </h4>

              {(approval.whatWillHappen?.length ?? 0) === 0 ? (
                <p className="text-xs text-slate-400 italic">No consequences identified.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {approval.whatWillHappen.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl bg-white/70 border border-slate-100 px-3 py-2.5"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`flex-shrink-0 h-5 w-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                            item.tag === 'DANGER' || item.tag === 'UNLIMITED'
                              ? 'bg-red-100 text-red-500'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {item.label.charAt(0).toUpperCase()}
                        </span>
                        <span className="text-xs font-medium text-slate-700 truncate">
                          {item.label}
                        </span>
                      </div>
                      <span
                        className={`flex-shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
                          TAG_STYLE[item.tag] ?? TAG_STYLE.LIMITED
                        }`}
                      >
                        {item.tag}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
