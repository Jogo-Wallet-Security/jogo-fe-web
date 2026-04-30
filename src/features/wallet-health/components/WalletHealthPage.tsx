import { StatsBar } from './StatsBar'
import { WalletScoreGauge } from './WalletScoreGauge'
import { ApprovalTable } from './ApprovalTable'
import { HistoryLog } from './HistoryLog'

export function WalletHealthPage() {
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* Left: Score Gauge */}
          <div className="lg:col-span-4">
            <WalletScoreGauge />
          </div>

          <ApprovalTable />
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
