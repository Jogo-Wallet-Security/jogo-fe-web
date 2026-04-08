import { useState } from 'react'
import { useWalletHealth } from '../hooks/useWalletHealth'
import type { HistoryEvent } from '../types'
import { Search, SlidersHorizontal } from 'lucide-react'

// const TABS: HistoryTab[] = ['All', 'Revoke Logs', 'Recent Scans']

const riskBadge: Record<string, string> = {
  Critical: 'bg-red-100 text-red-600 border-red-200',
  High: 'bg-orange-100 text-orange-600 border-orange-200',
  Medium: 'bg-yellow-100 text-yellow-600 border-yellow-200',
  Low: 'bg-green-100 text-green-600 border-green-200',
  None: 'bg-slate-100 text-slate-500 border-slate-200',
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return (
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
    ', ' +
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  )
}

export function HistoryLog() {
  const { history, activeHistoryTab } = useWalletHealth()
  const [search, setSearch] = useState('')

  const filtered = history
    .filter((h: HistoryEvent) => {
      if (activeHistoryTab === 'Revoke Logs') return h.action === 'Revoke'
      if (activeHistoryTab === 'Recent Scans') return h.action === 'Scan'
      return true
    })
    .filter(
      (h: HistoryEvent) =>
        !search ||
        h.protocol?.toLowerCase().includes(search.toLowerCase()) ||
        h.description.toLowerCase().includes(search.toLowerCase()),
    )

  return (
    <div className="rounded-2xl border border-white/50 bg-white/60 backdrop-blur-md shadow-sm p-6">
      <h2 className="text-lg font-bold text-slate-800 mb-1">Recent Activity</h2>

      {/* Search + filter row */}
      <div className="flex items-center gap-2 mt-4 mb-5">
        <div className="flex-1 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
          <Search size={13} className="text-slate-400 flex-shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="flex-1 bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>
        <button className="rounded-lg border border-slate-200 bg-white p-2 hover:bg-slate-50 transition-colors">
          <SlidersHorizontal size={14} className="text-slate-500" />
        </button>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-12 gap-2 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200/60">
        <div className="col-span-3">Protocol / Site</div>
        <div className="col-span-3">Action</div>
        <div className="col-span-2">Risk Assessment</div>
        <div className="col-span-2">Date & Time</div>
        <div className="col-span-2 text-right">Status</div>
      </div>

      {/* Rows */}
      <div className="space-y-0">
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-slate-400 py-8">No activity found.</p>
        ) : (
          filtered.map((item: HistoryEvent) => (
            <div
              key={item.id}
              className="grid grid-cols-12 items-center gap-2 py-3 border-b border-slate-100 hover:bg-white/40 transition-colors"
            >
              <div className="col-span-3 flex items-center gap-2 min-w-0">
                <div className="h-7 w-7 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-slate-500">
                  {item.protocol?.[0] ?? '?'}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">
                    {item.protocol ?? 'Unknown'}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">{item.site ?? '-'}</p>
                </div>
              </div>
              <div className="col-span-3">
                <p className="text-xs text-slate-600">{item.description}</p>
              </div>
              <div className="col-span-2">
                {item.riskLevel ? (
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${riskBadge[item.riskLevel]}`}
                  >
                    {item.riskLevel} Risk
                  </span>
                ) : (
                  <span className="text-xs text-slate-400">—</span>
                )}
              </div>
              <div className="col-span-2">
                <p className="text-[10px] text-slate-500">{formatDate(item.timestamp)}</p>
              </div>
              <div className="col-span-2 flex justify-end">
                <button className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600 transition-colors">
                  Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
        <span>
          Showing 1–{filtered.length} of {history.length} results
        </span>
        <div className="flex gap-2">
          <button className="rounded-lg border border-slate-200 px-3 py-1 hover:bg-slate-50 text-slate-600 transition-colors">
            Previous
          </button>
          <button className="rounded-lg border border-slate-200 px-3 py-1 hover:bg-slate-50 text-slate-600 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
