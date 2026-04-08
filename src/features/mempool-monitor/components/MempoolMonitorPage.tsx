import { StatsRow } from './StatsRow'
import { GasReserveCard } from './GasReserveCard'
import { SideCards } from './SideCards'
import { useMempoolMonitor } from '../hooks/useMempoolMonitor'

export function MempoolMonitorPage() {
  const { activeProtection } = useMempoolMonitor()
  const isMonitoring = !activeProtection.isPaused

  return (
    <div className="w-full flex flex-col pt-24 pb-8 space-y-8">
      {/* ── Section 1: Header ── */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Mempool Analitic Dashboard</h1>
          <p className="text-sm text-slate-500">
            Real-time analysis of mempool transactions in Base Network.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/50 bg-white/60 backdrop-blur-sm px-4 py-1.5 shadow-sm">
          <span
            className={`block w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-500' : 'bg-red-500'}`}
          />
          <span
            className={`text-sm font-semibold ${isMonitoring ? 'text-green-600' : 'text-red-500'}`}
          >
            {isMonitoring ? 'Active Monitoring' : 'Monitoring Paused'}
          </span>
        </div>
      </section>

      {/* ── Section 2: Stats Row ── */}
      <section>
        <StatsRow />
      </section>

      {/* ── Section 3: Lower layout ── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8">
          <GasReserveCard />
        </div>
        <div className="lg:col-span-4">
          <SideCards />
        </div>
      </section>
    </div>
  )
}
