import { useState, useEffect } from 'react'
import { useAccount, useChainId } from 'wagmi'
// import { useWalletHealth } from '../hooks/useWalletHealth'
import { useApprovals } from '../hooks/useApprovals'
import { useApprovalsStore } from '../store/approvalStore'
import type { Approval } from '../types/approval.types'
import { PAGE_OPTIONS, RISK_FILTERS, RISK_DOT_COLOR } from '../constants'
import { ApprovalRowCard } from './ApprovalRowCard'
import { DataListFooter } from './shared/DataListFooter'
import { DataListHeaderRow } from './shared/DataListHeaderRow'
import { DataListState } from './shared/DataListState'
import { TableSearchInput } from './shared/TableSearchInput'

export function ApprovalTable() {
  const { address } = useAccount()
  const chainId = useChainId()
  // const { rescanWallet, isScanning } = useWalletHealth()

  // ── Local UI state ──────────────────────────────────────────────────────────
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(handler)
  }, [search])

  const activeQualityFilter = useApprovalsStore((s) => s.activeQualityFilter)

  const params =
    address && chainId
      ? {
          address: address,
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
      {/* <div className="flex justify-end">
        <button
          onClick={rescanWallet}
          disabled={isScanning}
          className="flex items-center gap-2 rounded-xl border border-white/50 bg-white/60 backdrop-blur-sm hover:bg-white/80 text-sm text-slate-700 px-4 py-2.5 font-semibold transition-all shadow-sm disabled:opacity-50"
        >
          <RotateCw size={14} className={isScanning ? 'animate-spin' : ''} />
          {isScanning ? 'Scanning…' : 'Rescan Wallet'}
        </button>
      </div> */}

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
                    ? 'bg-slate-300 text-slate-800 border-slate-300 shadow-md'
                    : 'bg-white/60 text-slate-600 border-white/50 hover:bg-white/80 backdrop-blur-sm'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${RISK_DOT_COLOR[filter]}`} />
                {filter}
                <span className={`ml-0.5 ${active ? 'text-slate-800/70' : 'text-slate-400'}`}>
                  {count ?? 0}
                </span>
              </button>
            )
          })}
        </div>

        {/* Search box */}
        <div className="flex items-center gap-2">
          <TableSearchInput
            value={search}
            onChange={(value) => {
              setSearch(value)
              setPage(1)
            }}
            placeholder="Search token or spender..."
          />
        </div>
      </div>

      {/* Table card */}
      <div className="flex flex-col rounded-3xl border border-white/40 bg-white/20 backdrop-blur-md shadow-sm p-5 gap-2">
        {/* Column header */}
        <DataListHeaderRow
          className="grid grid-cols-12 gap-3 px-4 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-600 border-b border-white/30"
          columns={[
            { key: 'token', label: 'Protocol / Asset', className: 'col-span-3' },
            { key: 'action', label: 'Action', className: 'col-span-2' },
            { key: 'risk', label: 'Risk Assessment', className: 'col-span-2' },
            { key: 'allowance', label: 'Allowance', className: 'col-span-3' },
            { key: 'action', label: '', className: 'col-span-1' },
          ]}
        />

        {/* Rows */}
        <div className="flex flex-col gap-2 min-h-[300px]">
          <DataListState
            isLoading={isLoading}
            error={isError ? 'Failed to load approvals. Please try again.' : null}
            isEmpty={approvalsList.length === 0}
            loadingText="Loading approvals..."
            emptyText="No approvals found for this filter."
          >
            {approvalsList.map((approval: Approval) => (
              <ApprovalRowCard key={approval.asset} approval={approval} />
            ))}
          </DataListState>
        </div>

        {/* Pagination */}
        <DataListFooter
          className="flex items-center justify-between text-xs text-slate-500 pt-3 mt-1 border-t border-white/30"
          start={totalItems === 0 ? 0 : startNum}
          end={endNum}
          total={totalItems}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
          canPrev={page > 1}
          canNext={page < totalPages}
          isLoading={isLoading}
          rightSlot={
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 border-r border-white/30 pr-3">
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
          }
        />
      </div>
    </div>
  )
}
