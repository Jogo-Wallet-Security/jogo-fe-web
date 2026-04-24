import { useWalletHealth } from '../hooks/useWalletHealth'
import type { RiskLevel } from '../types'

const FLITERS: (RiskLevel | 'All')[] = ['All', 'Critical', 'High', 'Low']

export function RiskFilterBar() {
  const { activeQualityFilter, setQualityFilter } = useWalletHealth()

  return (
    <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      {FLITERS.map((filter) => (
        <button
          key={filter}
          onClick={() => setQualityFilter(filter)}
          className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            activeQualityFilter === filter
              ? 'bg-blue-500 text-white shadow-md'
              : 'border border-white/40 bg-white/40 text-slate-600 hover:bg-white/60'
          }`}
        >
          {filter === 'All' ? 'All Approvals' : `${filter} Risk`}
        </button>
      ))}
    </div>
  )
}
