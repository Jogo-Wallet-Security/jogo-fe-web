import { useState } from 'react'
import { useAccount, useChainId } from 'wagmi'
import { useThreatLog } from '../hooks/useThreatLog'
import { ShieldAlert, ScanLine, Zap } from 'lucide-react'
import {
  selectFilteredHistoryLogs,
  selectHistoryCounts,
  selectHistoryRowsByTab,
} from '../selectors/historySelectors'
import { DataListFooter } from './shared/DataListFooter'
import { DataListHeaderRow } from './shared/DataListHeaderRow'
import { TableSearchInput } from './shared/TableSearchInput'
import { HistoryTableRow } from './history/HistoryTableRow'

// ─── Tab config ──────────────────────────────────────────────────────────────

const TAB_CONFIG = [
  { key: 'Revoke Logs' as const, label: 'Revoke Logs', Icon: ShieldAlert },
  { key: 'Recent Scans' as const, label: 'Recent Scans', Icon: ScanLine },
  { key: 'Recent Threats' as const, label: 'Recent Threats', Icon: Zap },
]

// ─── Main component ──────────────────────────────────────────────────────────

export function HistoryLog() {
  const { address } = useAccount()
  const chainId = useChainId()
  const [search, setSearch] = useState('')

  const baseParams =
    address && chainId
      ? {
          wallet: address,
          chainId,
        }
      : null

  const threatLogState = useThreatLog(baseParams)
  const revokeLogs = threatLogState.revokeLogs ?? []
  const scanLogs = threatLogState.scanLogs ?? []
  const threatLogs = threatLogState.threatLogs ?? []
  const activeHistoryTab = threatLogState.activeHistoryTab
  const setHistoryTab = threatLogState.setHistoryTab
  const isLoading = threatLogState.isLoading
  const error = threatLogState.error

  const { filteredRevoke, filteredScans, filteredThreats } = selectFilteredHistoryLogs({
    revokeLogs,
    scanLogs,
    threatLogs,
    search,
  })
  const rowViewModels = selectHistoryRowsByTab(activeHistoryTab, {
    filteredRevoke,
    filteredScans,
    filteredThreats,
  })

  const renderRows = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        </div>
      )
    }

    if (error) {
      return <p className="text-red-400 text-sm py-10 text-center">{error}</p>
    }

    if (activeHistoryTab === 'Revoke Logs') {
      if (filteredRevoke.length === 0)
        return <p className="text-slate-400 text-sm py-10 text-center">No revoke logs found.</p>
      return rowViewModels.map((row) => <HistoryTableRow key={row.id} {...row} />)
    }

    if (activeHistoryTab === 'Recent Scans') {
      if (filteredScans.length === 0)
        return <p className="text-slate-400 text-sm py-10 text-center">No scan logs found.</p>
      return rowViewModels.map((row) => <HistoryTableRow key={row.id} {...row} />)
    }

    if (activeHistoryTab === 'Recent Threats') {
      if (filteredThreats.length === 0)
        return <p className="text-slate-400 text-sm py-10 text-center">No threat logs found.</p>
      return rowViewModels.map((row) => <HistoryTableRow key={row.id} {...row} />)
    }

    return null
  }

  const { currentCount, totalCount } = selectHistoryCounts(activeHistoryTab, {
    revokeLogs,
    scanLogs,
    threatLogs,
    filteredRevoke,
    filteredScans,
    filteredThreats,
  })

  return (
    <div className="flex flex-col lg:flex-row w-full lg:min-h-[600px] items-stretch relative rounded-3xl overflow-hidden border border-white/40 bg-sky-frost shadow-md text-left">
      {/* Sidebar / Tab nav */}
      <div className="flex flex-col w-full lg:w-64 items-start gap-2 p-6 bg-white/40 border-b lg:border-b-0 lg:border-r border-white/20 backdrop-blur-md shrink-0">
        <div className="pb-4 w-full">
          <div className="font-semibold text-slate-400 text-xs tracking-widest uppercase">
            History Log
          </div>
        </div>
        <div className="flex flex-row lg:flex-col gap-2 w-full overflow-x-auto pb-2 lg:pb-0">
          {TAB_CONFIG.map(({ key, label, Icon }) => {
            const isActive = activeHistoryTab === key
            return (
              <button
                key={key}
                onClick={() => setHistoryTab(key)}
                className={`w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-2xl transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                    : 'text-slate-600 hover:bg-white/50'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-white' : 'text-slate-500'} />
                <span className="font-medium text-sm">{label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold text-slate-800 whitespace-nowrap">
            Recent Activity
          </h2>
          <div className="flex items-center gap-2">
            <TableSearchInput value={search} onChange={setSearch} placeholder="Search..." />
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 flex flex-col min-h-[300px]">
          {/* Column headers */}
          <DataListHeaderRow
            columns={[
              {
                key: 'site',
                label: 'Protocol / Site',
                className: 'col-span-4 lg:col-span-3 pl-2 sm:pl-4',
              },
              { key: 'action', label: 'Action', className: 'col-span-4 lg:col-span-3' },
              { key: 'risk', label: 'Risk Assessment', className: 'col-span-4 lg:col-span-3' },
              { key: 'time', label: 'Date & Time', className: 'hidden lg:block col-span-2' },
              {
                key: 'status',
                label: 'Status',
                className: 'hidden lg:block col-span-1 text-right pr-2 sm:pr-4',
              },
            ]}
          />

          {/* Rows */}
          <div className="flex flex-col divide-y divide-slate-100/50 mt-1">{renderRows()}</div>
        </div>

        {/* Footer */}
        <DataListFooter
          start={currentCount === 0 ? 0 : 1}
          end={currentCount}
          total={totalCount}
          canPrev={false}
          canNext={false}
        />
      </div>
    </div>
  )
}
