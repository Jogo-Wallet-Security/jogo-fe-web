import { CheckCircle2, Loader2, Plus } from 'lucide-react'
import { useMempoolMonitor } from '../hooks/useMempoolMonitor'

export function GasReserveCard() {
  const { gasReserve, isTopUpPending, topUpGas } = useMempoolMonitor()

  return (
    <div className="rounded-[2rem] border border-white/50 bg-white/40 backdrop-blur-md shadow-sm p-8 flex flex-col h-full justify-between">
      <div>
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Gas Reserve</h2>
            <p className="text-sm text-slate-500 mt-1">
              Maintains active protection and enables automated rescues.
            </p>
          </div>
          <button
            onClick={() => topUpGas(0.1)}
            disabled={isTopUpPending}
            className="flex items-center gap-1.5 bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {isTopUpPending ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
            Top up
          </button>
        </div>
      </div>

      <div className="mt-16">
        <div className="flex items-baseline gap-4 mb-4">
          <span className="text-5xl font-mono font-bold text-slate-800">
            {gasReserve.ethAmount.toFixed(3)} ETH
          </span>
          <span className="text-xl font-mono text-slate-500">
            (${gasReserve.usdAmount.toFixed(2)})
          </span>
        </div>

        {/* Progress bar container */}
        <div className="h-3 w-full bg-white/50 rounded-full overflow-hidden mb-4 shadow-inner">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-1000"
            style={{ width: `${Math.min((gasReserve.ethAmount / 0.05) * 100, 100)}%` }} // arbitrary scale
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5">
            {gasReserve.healthy ? (
              <>
                <CheckCircle2 className="text-green-500" size={16} />
                <span className="font-semibold text-green-600">Reserve Healthy</span>
              </>
            ) : (
              <>
                <span className="font-semibold text-red-500">Reserve Low</span>
              </>
            )}
          </div>
          <span className="text-slate-500 font-medium">
            Est. coverage: ~{gasReserve.estimatedDays} days
          </span>
        </div>
      </div>
    </div>
  )
}
