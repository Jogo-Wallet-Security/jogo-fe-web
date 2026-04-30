import type {
  HistoryTab,
  ThreatLogApprovalRevoked,
  ThreatLogScanComplete,
  ThreatLogThreatDetected,
} from '../types'

export interface HistoryRowViewModel {
  id: string
  iconChar: string
  title: string
  subtitle: string
  actionText: string
  subActionText: string
  riskLevel: string
  riskSubtext?: string
  dateIso: string
  statusFlag: string
}

export function revokeEventToRow(e: ThreatLogApprovalRevoked): HistoryRowViewModel {
  const token = (e.tokenName || e.asset || '—').slice(0, 10)
  const spender = (e.spender ?? '—').slice(0, 10)
  return {
    id: e.id,
    iconChar: token[0]?.toUpperCase() ?? '?',
    title: `Token: ${token}…`,
    subtitle: `Spender: ${spender}…`,
    actionText: 'Approval Revoked',
    subActionText: `Chain: ${e.chainName ?? e.chainId}`,
    riskLevel: e.riskLevel ?? 'None',
    riskSubtext: undefined,
    dateIso: e.revokeDate ?? e.createdAt ?? '',
    statusFlag: 'success',
  }
}

export function scanEventToRow(e: ThreatLogScanComplete): HistoryRowViewModel {
  const d = e.data
  return {
    id: e.id,
    iconChar: 'S',
    title: 'Scan Complete',
    subtitle: `${d.approvalCount ?? 0} approvals found`,
    actionText: 'Wallet Scan',
    subActionText: `Score: ${d.score ?? '—'}/100`,
    riskLevel: (d.criticalCount ?? 0) > 0 ? 'Critical' : 'Safe',
    riskSubtext: `Critical: ${d.criticalCount ?? 0}`,
    dateIso: e.createdAt,
    statusFlag: (d.criticalCount ?? 0) > 0 ? 'critical' : 'safe',
  }
}

export function threatEventToRow(e: ThreatLogThreatDetected): HistoryRowViewModel {
  const d = e.data
  return {
    id: e.id,
    iconChar: (d.source?.[0] ?? '!').toUpperCase(),
    title: d.source ?? 'Threat Detected',
    subtitle: d.explanation?.slice(0, 40) ?? '—',
    actionText: d.source ?? 'Unknown',
    subActionText: `Risk: ${d.riskLevel ?? '—'}`,
    riskLevel: d.riskLevel ?? 'None',
    riskSubtext: undefined,
    dateIso: e.createdAt,
    statusFlag: d.riskLevel?.toLowerCase() ?? 'warn',
  }
}

export function selectFilteredHistoryLogs(args: {
  revokeLogs: ThreatLogApprovalRevoked[]
  scanLogs: ThreatLogScanComplete[]
  threatLogs: ThreatLogThreatDetected[]
  search: string
}) {
  const searchLower = args.search.toLowerCase()

  const filteredRevoke = args.revokeLogs.filter((e) => {
    if (!searchLower) return true
    return (
      (e.asset ?? '').toLowerCase().includes(searchLower) ||
      (e.spender ?? '').toLowerCase().includes(searchLower) ||
      (e.tokenName ?? '').toLowerCase().includes(searchLower)
    )
  })

  const filteredScans = args.scanLogs.filter((e) => {
    if (!searchLower) return true
    return e.createdAt.toLowerCase().includes(searchLower)
  })

  const filteredThreats = args.threatLogs.filter((e) => {
    if (!searchLower) return true
    const d = e.data
    return (
      d.source?.toLowerCase().includes(searchLower) ||
      d.explanation?.toLowerCase().includes(searchLower) ||
      d.riskLevel?.toLowerCase().includes(searchLower) ||
      d.contractAddress?.toLowerCase().includes(searchLower) ||
      d.spenderAddress?.toLowerCase().includes(searchLower)
    )
  })

  return { filteredRevoke, filteredScans, filteredThreats }
}

export function selectHistoryRowsByTab(
  tab: HistoryTab,
  filtered: ReturnType<typeof selectFilteredHistoryLogs>,
): HistoryRowViewModel[] {
  if (tab === 'Revoke Logs') return filtered.filteredRevoke.map(revokeEventToRow)
  if (tab === 'Recent Scans') return filtered.filteredScans.map(scanEventToRow)
  return filtered.filteredThreats.map(threatEventToRow)
}

export function selectHistoryCounts(
  tab: HistoryTab,
  args: {
    revokeLogs: ThreatLogApprovalRevoked[]
    scanLogs: ThreatLogScanComplete[]
    threatLogs: ThreatLogThreatDetected[]
    filteredRevoke: ThreatLogApprovalRevoked[]
    filteredScans: ThreatLogScanComplete[]
    filteredThreats: ThreatLogThreatDetected[]
  },
) {
  const currentCount =
    tab === 'Revoke Logs'
      ? args.filteredRevoke.length
      : tab === 'Recent Scans'
        ? args.filteredScans.length
        : args.filteredThreats.length

  const totalCount =
    tab === 'Revoke Logs'
      ? args.revokeLogs.length
      : tab === 'Recent Scans'
        ? args.scanLogs.length
        : args.threatLogs.length

  return { currentCount, totalCount }
}
