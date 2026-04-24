// import { useState } from 'react'
// import { useWalletHealth } from '../hooks/useWalletHealth'
// import {
//   Search,
//   ShieldAlert,
//   ScanLine,
//   Zap,
// } from 'lucide-react'

// // ─── Shared helpers ──────────────────────────────────────────────────────────

// function RiskBadge({ level }: { level?: string }) {
//   if (!level) return <span className="text-xs text-slate-400">—</span>
//   return (
//     <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold risk-badge-${(level || 'None').toLowerCase()}`}>
//       {level}
//     </span>
//   )
// }

// function formatDate(iso: string) {
//   const d = new Date(iso)
//   return (
//     d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
//     ', ' +
//     d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
//   )
// }

// // ─── Generic Row Component ───────────────────────────────────────────────────

// function getStatusColor(status: string) {
//   const s = (status || '').toLowerCase()
//   if (s.includes('blocked') || s.includes('drain') || s.includes('failed') || s.includes('critical')) return 'bg-red-500'
//   if (s.includes('warn') || s.includes('medium') || s.includes('high')) return 'bg-orange-500'
//   if (s.includes('success') || s.includes('rescue') || s.includes('low') || s.includes('safe') || s.includes('monit')) return 'bg-emerald-500'
//   return 'bg-blue-500'
// }

// function HistoryTableRow({
//   iconChar,
//   title,
//   subtitle,
//   actionText,
//   subActionText,
//   riskLevel,
//   riskSubtext,
//   dateIso,
//   statusFlag,
// }: {
//   iconChar: string;
//   title: string;
//   subtitle: string;
//   actionText: string;
//   subActionText: string;
//   riskLevel: string;
//   riskSubtext?: string;
//   dateIso: string;
//   statusFlag: string;
// }) {
//   const dotColor = getStatusColor(statusFlag || riskLevel)

//   return (
//     <div className="grid grid-cols-12 gap-4 py-4 items-center group hover:bg-white/40 transition-colors px-2 -mx-2 sm:px-4 sm:-mx-4 rounded-2xl">
//       {/* Protocol / Site */}
//       <div className="col-span-4 lg:col-span-3 flex items-center gap-3 min-w-0">
//         <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm shrink-0 border border-slate-100">
//           <span className="text-lg font-bold text-slate-700">{iconChar}</span>
//           <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${dotColor}`}></div>
//         </div>
//         <div className="min-w-0 flex-1">
//           <p className="font-semibold text-slate-900 text-sm truncate">{title || 'Unknown'}</p>
//           <p className="text-xs text-slate-500 truncate">{subtitle || '—'}</p>
//         </div>
//       </div>

//       {/* Action */}
//       <div className="col-span-4 lg:col-span-3 min-w-0">
//         <p className="text-sm font-medium text-slate-700 truncate">{actionText || 'Interaction'}</p>
//         <p className="text-xs text-slate-500 truncate">{subActionText || '—'}</p>
//       </div>

//       {/* Risk Assessment */}
//       <div className="col-span-4 lg:col-span-3 min-w-0">
//         <div className="flex flex-col items-start gap-1">
//           <RiskBadge level={riskLevel} />
//           {riskSubtext && <p className="text-[10px] text-slate-400 truncate w-full">{riskSubtext}</p>}
//         </div>
//       </div>

//       {/* Date & Time */}
//       <div className="hidden lg:block col-span-2 min-w-0">
//         <p className="text-sm text-slate-500 truncate">{formatDate(dateIso)}</p>
//       </div>

//       {/* Status */}
//       <div className="hidden lg:flex col-span-1 justify-end shrink-0">
//         <button className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-[0px_1px_2px_#0000000d] text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
//           Details
//         </button>
//       </div>
//     </div>
//   )
// }

// const TAB_CONFIG = [
//   { key: 'Revoke Logs' as const, label: 'Revoke Logs', Icon: ShieldAlert },
//   { key: 'Recent Scans' as const, label: 'Recent Scans', Icon: ScanLine },
//   { key: 'Recent Thread' as const, label: 'Recent Threats', Icon: Zap },
// ]

// export function HistoryLog() {
//   const { revokeLogs, scanLogs, threatLogs, activeHistoryTab, setHistoryTab } = useWalletHealth()
//   const [search, setSearch] = useState('')

//   const filteredRevoke = revokeLogs.filter(
//     (r) =>
//       !search ||
//       r.tokenContract.toLowerCase().includes(search.toLowerCase()) ||
//       r.triggerReason.toLowerCase().includes(search.toLowerCase()),
//   )

//   const filteredScans = scanLogs.filter(
//     (s) =>
//       !search ||
//       s.protocol.toLowerCase().includes(search.toLowerCase()) ||
//       s.actionDetected.toLowerCase().includes(search.toLowerCase()),
//   )

//   const filteredThreats = threatLogs.filter(
//     (t) =>
//       !search ||
//       t.incidentTitle.toLowerCase().includes(search.toLowerCase()) ||
//       t.threatType.toLowerCase().includes(search.toLowerCase()),
//   )

//   // Map to common standard
//   const renderRows = () => {
//     if (activeHistoryTab === 'Revoke Logs') {
//       if (filteredRevoke.length === 0) return <p className="text-slate-400 text-sm py-10 text-center">No revoke logs found.</p>
//       return filteredRevoke.map(r => (
//         <HistoryTableRow
//           key={r.id}
//           iconChar={r.tokenContract[0]?.toUpperCase() || '?'}
//           title={r.tokenContract}
//           subtitle={`Safe: ${r.safeWallet || '—'}`}
//           actionText={r.triggerReason}
//           subActionText={`Method: ${r.revokeMethod}`}
//           riskLevel={r.riskLevel || 'None'}
//           riskSubtext={`Value at Risk: ${r.valueAtRisk}`}
//           dateIso={r.timestamp}
//           statusFlag={r.revokeStatus}
//         />
//       ))
//     }
//     if (activeHistoryTab === 'Recent Scans') {
//       if (filteredScans.length === 0) return <p className="text-slate-400 text-sm py-10 text-center">No scan logs found.</p>
//       return filteredScans.map(s => (
//         <HistoryTableRow
//           key={s.id}
//           iconChar={s.protocol[0]?.toUpperCase() || '?'}
//           title={s.protocol}
//           subtitle={s.site}
//           actionText={s.actionDetected}
//           subActionText={`Scope: ${s.approvalScope || '—'}`}
//           riskLevel={s.riskLevel || 'None'}
//           riskSubtext={`Score: ${s.riskScore}/100`}
//           dateIso={s.timestamp}
//           statusFlag={s.userAction}
//         />
//       ))
//     }
//     if (activeHistoryTab === 'Recent Thread') {
//       if (filteredThreats.length === 0) return <p className="text-slate-400 text-sm py-10 text-center">No threat logs found.</p>
//       return filteredThreats.map(t => (
//         <HistoryTableRow
//           key={t.id}
//           iconChar={t.incidentTitle[0]?.toUpperCase() || '!'}
//           title={t.incidentTitle}
//           subtitle={t.targetToken}
//           actionText={t.threatType}
//           subActionText={t.responseTaken}
//           riskLevel={t.riskLevel || 'None'}
//           riskSubtext={`Confidence: ${t.confidenceScore}%`}
//           dateIso={t.timestamp}
//           statusFlag={t.outcome}
//         />
//       ))
//     }
//     return null
//   }

//   const currentCount = activeHistoryTab === 'Revoke Logs' ? filteredRevoke.length : activeHistoryTab === 'Recent Scans' ? filteredScans.length : filteredThreats.length
//   const totalCount = activeHistoryTab === 'Revoke Logs' ? revokeLogs.length : activeHistoryTab === 'Recent Scans' ? scanLogs.length : threatLogs.length

//   return (
//     <div className="flex flex-col lg:flex-row w-full lg:min-h-[600px] items-stretch relative rounded-3xl overflow-hidden border border-white/40 bg-sky-frost shadow-md text-left">

//       {/* Sidebar Section */}
//       <div className="flex flex-col w-full lg:w-64 items-start gap-2 p-6 bg-white/40 border-b lg:border-b-0 lg:border-r border-white/20 backdrop-blur-md shrink-0">
//         <div className="pb-4 w-full">
//           <div className="font-semibold text-slate-400 text-xs tracking-widest uppercase">
//             History Log
//           </div>
//         </div>
//         <div className="flex flex-row lg:flex-col gap-2 w-full overflow-x-auto pb-2 lg:pb-0">
//           {TAB_CONFIG.map(({ key, label, Icon }) => {
//             const isActive = activeHistoryTab === key
//             return (
//               <button
//                 key={key}
//                 onClick={() => setHistoryTab(key)}
//                 className={`w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-2xl transition-all whitespace-nowrap shrink-0 ${isActive
//                   ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
//                   : 'text-slate-600 hover:bg-white/50'
//                   }`}
//               >
//                 <Icon size={16} className={isActive ? "text-white" : "text-slate-500"} />
//                 <span className="font-medium text-sm">{label}</span>
//               </button>
//             )
//           })}
//         </div>
//       </div>

//       {/* Main Table Section */}
//       <div className="flex flex-col flex-1 min-w-0 p-6 sm:p-8">

//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//           <h2 className="text-xl font-semibold text-slate-800 whitespace-nowrap">Recent Activity</h2>

//           <div className="flex items-center gap-2">
//             <div className="flex items-center gap-2 rounded-xl bg-white/50 px-4 py-2 w-full sm:w-64 border border-white focus-within:border-blue-200 focus-within:ring-2 focus-within:ring-blue-50 transition-all shadow-sm">
//               <Search size={14} className="text-slate-400 flex-shrink-0" />
//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search..."
//                 className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Unified Table */}
//         <div className="flex-1 flex flex-col min-h-[300px]">

//           {/* Table Header */}
//           <div className="grid grid-cols-12 gap-4 pb-3 border-b border-slate-200 text-xs font-medium text-slate-500 tracking-widest uppercase">
//             <div className="col-span-4 lg:col-span-3 pl-2 sm:pl-4">Protocol / Site</div>
//             <div className="col-span-4 lg:col-span-3">Action</div>
//             <div className="col-span-4 lg:col-span-3">Risk Assessment</div>
//             <div className="hidden lg:block col-span-2">Date & Time</div>
//             <div className="hidden lg:block col-span-1 text-right pr-2 sm:pr-4">Status</div>
//           </div>

//           {/* Rows Container */}
//           <div className="flex-col flex divide-y divide-slate-100/50 mt-1">
//             {renderRows()}
//           </div>
//         </div>

//         {/* Pagination Footer */}
//         <div className="flex items-center justify-between pt-5 mt-auto border-t border-slate-200 w-full">
//           <p className="text-sm text-slate-500">
//             Showing <span className="font-medium text-slate-900">1-{currentCount}</span> of <span className="font-medium text-slate-900">{totalCount}</span> results
//           </p>
//           <div className="flex items-center gap-2">
//             <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors bg-white">
//               Previous
//             </button>
//             <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors bg-white">
//               Next
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   )
// }
