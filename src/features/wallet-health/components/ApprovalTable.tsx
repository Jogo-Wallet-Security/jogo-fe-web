import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useWalletHealth } from '../hooks/useWalletHealth'
import { useApprovals } from '../hooks/useApprovals'
import { useApprovalsStore } from '../store/approvalStore'
import type { Approval } from '../types/approval.types'
import { Loader2, RotateCw, Search } from 'lucide-react'
import { PAGE_OPTIONS, RISK_FILTERS, RISK_DOT_COLOR } from '../constants'
import { ApprovalRowCard } from './ApprovalRowCard'

export function ApprovalTable() {
  const { address } = useAccount()
  const { rescanWallet, isScanning } = useWalletHealth()

  // ── Local UI state ──────────────────────────────────────────────────────────
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(25)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(handler)
  }, [search])

  const activeQualityFilter = useApprovalsStore((s) => s.activeQualityFilter)

  const params = address
    ? {
        address: import.meta.env.VITE_DUMMY_WALLET,
        chainId: Number(import.meta.env.VITE_CHAIN_ID),
        riskLevel: activeQualityFilter === 'All' ? undefined : activeQualityFilter,
        search: debouncedSearch || undefined,
        page,
        perPage,
      }
    : null

  const { data, isLoading, error, filterCount, setQualityFilter } = useApprovals(params)

  // ── Derived values ──────────────────────────────────────────────────────────
  const isError = !!error
  const approvalsList = data?.approvals ?? []
  const totalItems = data?.totalFiltered ?? 0
  const totalPages = data?.totalPages ?? 0

  const startNum = totalItems === 0 ? 0 : (page - 1) * perPage + 1
  const endNum = Math.min(page * perPage, totalItems)

  /** Map each filter label → its count coming from the backend tally */
  const countFor = (filter: (typeof RISK_FILTERS)[number]): number => {
    if (filter === 'All') return filterCount.totalAll
    if (filter === 'Critical') return filterCount.totalCritical
    if (filter === 'High') return filterCount.totalHigh
    if (filter === 'Low') return filterCount.totalLow
    if (filter === 'Safe') return filterCount.totalSafe
    return 0
  }

  // Reset to page 1 when risk-level filter changes
  const handleSetQualityFilter = (f: (typeof RISK_FILTERS)[number]) => {
    setQualityFilter(f)
    setPage(1)
  }

  return (
    <div className="lg:col-span-8 flex flex-col gap-3">
      {/* Rescan button */}
      <div className="flex justify-end">
        <button
          onClick={rescanWallet}
          disabled={isScanning}
          className="flex items-center gap-2 rounded-xl border border-white/50 bg-white/60 backdrop-blur-sm hover:bg-white/80 text-sm text-slate-700 px-4 py-2.5 font-semibold transition-all shadow-sm disabled:opacity-50"
        >
          <RotateCw size={14} className={isScanning ? 'animate-spin' : ''} />
          {isScanning ? 'Scanning…' : 'Rescan Wallet'}
        </button>
      </div>

      {/* Filter row — OUTSIDE the card */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Risk-level pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {RISK_FILTERS.map((filter) => {
            const count = countFor(filter)
            const active = activeQualityFilter === filter
            return (
              <button
                key={filter}
                onClick={() => handleSetQualityFilter(filter)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all border ${
                  active
                    ? 'bg-slate-800 text-white border-slate-800 shadow-md'
                    : 'bg-white/60 text-slate-600 border-white/50 hover:bg-white/80 backdrop-blur-sm'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${RISK_DOT_COLOR[filter]}`} />
                {filter}
                <span className={`ml-0.5 ${active ? 'text-white/70' : 'text-slate-400'}`}>
                  {count ?? 0}
                </span>
              </button>
            )
          })}
        </div>

        {/* Search box */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl bg-white/50 px-4 py-2 w-full sm:w-64 border border-white focus-within:border-blue-200 focus-within:ring-2 focus-within:ring-blue-50 transition-all shadow-sm">
            <Search size={14} className="text-slate-400 flex-shrink-0" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              placeholder="Search token or spender…"
              className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Table card */}
      <div className="flex flex-col rounded-3xl border border-white/40 bg-white/20 backdrop-blur-md shadow-sm p-5 gap-2">
        {/* Column header */}
        <div className="grid grid-cols-12 gap-3 px-4 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-600 border-b border-white/30">
          <div className="col-span-4">Asset / Spender</div>
          <div className="col-span-3">Risk Assessment</div>
          <div className="col-span-3">Allowance</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-2 min-h-[300px]">
          {isLoading ? (
            <div className="flex h-full min-h-[200px] items-center justify-center text-sm text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin text-slate-500 mr-2" />
              Loading approvals...
            </div>
          ) : isError ? (
            <div className="flex h-full min-h-[200px] items-center justify-center text-sm text-red-500">
              Failed to load approvals. Please try again.
            </div>
          ) : approvalsList.length === 0 ? (
            <div className="flex h-full min-h-[200px] items-center justify-center text-sm text-slate-400">
              No approvals found for this filter.
            </div>
          ) : (
            approvalsList.map((approval: Approval) => (
              <ApprovalRowCard key={approval.asset} approval={approval} />
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-3 mt-1 border-t border-white/30">
          <div className="flex items-center gap-3">
            <span>
              Showing {totalItems === 0 ? 0 : startNum}–{endNum} of {totalItems} results
            </span>
            <div className="flex items-center gap-1.5 border-l border-white/30 pl-3">
              <span className="text-slate-400">Per page:</span>
              <select
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value))
                  setPage(1)
                }}
                className="bg-transparent font-semibold text-slate-700 outline-none cursor-pointer hover:text-slate-900 transition-colors"
              >
                {PAGE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || isLoading}
              className="rounded-lg border border-white/50 bg-white/40 px-3 py-1 hover:bg-white/60 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages || isLoading}
              className="rounded-lg border border-white/50 bg-white/40 px-3 py-1 hover:bg-white/60 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
