import { StatsBar } from './StatsBar'
import { WalletScoreGauge } from './WalletScoreGauge'
import { ApprovalTable } from './ApprovalTable'
import { HistoryLog } from './HistoryLog'
import { useWalletHealth } from '../hooks/useWalletHealth'
import { RotateCw } from 'lucide-react'
import type { RiskLevel } from '../types'

const FILTERS: (RiskLevel | 'All')[] = ['All', 'Critical', 'High', 'Medium', 'Low']

const dotColor: Record<string, string> = {
  All: 'bg-slate-400',
  Critical: 'bg-red-500',
  High: 'bg-orange-400',
  Medium: 'bg-yellow-400',
  Low: 'bg-green-400',
}

export function WalletHealthPage() {
  const { approvals, activeQualityFilter, setQualityFilter, isScanning, rescanWallet } =
    useWalletHealth()

  const countFor = (filter: RiskLevel | 'All') =>
    filter === 'All' ? approvals.length : approvals.filter((a) => a.riskLevel === filter).length

  return (
    <div className="w-full flex flex-col pt-24 pb-16 space-y-14">
      {/* ── Section 1: Wallet Health Check ── */}
      <section>
        {/* Section header row */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1">Wallet Health Check</h1>
            <p className="text-sm text-slate-500">
              Real-time analysis of your token approvals and permissions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Score Gauge */}
          <div className="lg:col-span-4">
            <WalletScoreGauge />
          </div>

          {/* Right: Filter bar + Rescan + Table */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            {/* Filter row — OUTSIDE the card */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                {FILTERS.map((filter) => {
                  const count = countFor(filter)
                  const active = activeQualityFilter === filter
                  return (
                    <button
                      key={filter}
                      onClick={() => setQualityFilter(filter)}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all border ${
                        active
                          ? 'bg-slate-800 text-white border-slate-800 shadow-md'
                          : 'bg-white/60 text-slate-600 border-white/50 hover:bg-white/80 backdrop-blur-sm'
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${dotColor[filter]}`} />
                      {filter}
                      <span className={`ml-0.5 ${active ? 'text-white/70' : 'text-slate-400'}`}>
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <span className="text-slate-400">Sort by:</span>
                  <select className="bg-transparent font-semibold text-slate-700 outline-none cursor-pointer">
                    <option>Risk Level</option>
                    <option>Date</option>
                    <option>Allowance</option>
                  </select>
                </div>
                <button
                  onClick={rescanWallet}
                  disabled={isScanning}
                  className="flex items-center gap-1.5 rounded-xl border border-white/50 bg-white/60 backdrop-blur-sm hover:bg-white/80 text-xs text-slate-700 px-3 py-1.5 font-semibold transition-all shadow-sm disabled:opacity-50"
                >
                  <RotateCw size={12} className={isScanning ? 'animate-spin' : ''} />
                  {isScanning ? 'Scanning…' : 'Rescan Wallet'}
                </button>
              </div>
            </div>

            {/* The actual table */}
            <ApprovalTable />
          </div>
        </div>
      </section>

      {/* ── Section 2: Wallet Health History ── */}
      <section>
        <h2 className="text-3xl font-bold text-slate-900 mb-1">Wallet Health History</h2>
        <p className="text-sm text-slate-500 mb-6">
          Real-time analysis of your token approvals and permissions.
        </p>

        <StatsBar />
        <HistoryLog />
      </section>
    </div>
  )
}
