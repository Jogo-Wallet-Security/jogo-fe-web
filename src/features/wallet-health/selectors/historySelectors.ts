import type { HistoryTab, ThreatLogEvent } from '../types'

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

export function revokeEventToRow(e: ThreatLogEvent<'APPROVAL_REVOKED'>): HistoryRowViewModel {
  const d = e.data
  const token = (d.tokenAddress ?? e.walletAddress).slice(0, 10)
  const spender = (d.spender ?? '—').slice(0, 10)
  return {
    id: e.id,
    iconChar: token[0]?.toUpperCase() ?? '?',
    title: `Token: ${token}…`,
    subtitle: `Spender: ${spender}…`,
    actionText: 'Approval Revoked',
    subActionText: `Chain: ${e.chainId}`,
    riskLevel: 'None',
    riskSubtext: undefined,
    dateIso: e.createdAt,
    statusFlag: 'success',
  }
}

export function scanEventToRow(e: ThreatLogEvent<'SCAN_COMPLETE'>): HistoryRowViewModel {
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

export function threatEventToRow(e: ThreatLogEvent<'THREAT_DETECTED'>): HistoryRowViewModel {
  const d = e.data
  return {
    id: e.id,
    iconChar: (d.threatType?.[0] ?? '!').toUpperCase(),
    title: d.threatType ?? 'Threat Detected',
    subtitle: d.description?.slice(0, 40) ?? '—',
    actionText: d.threatType ?? 'Unknown',
    subActionText: `Severity: ${d.severity ?? '—'}`,
    riskLevel: d.severity ?? 'None',
    riskSubtext: undefined,
    dateIso: e.createdAt,
    statusFlag: d.severity?.toLowerCase() ?? 'warn',
  }
}

export function selectFilteredHistoryLogs(args: {
  revokeLogs: ThreatLogEvent<'APPROVAL_REVOKED'>[]
  scanLogs: ThreatLogEvent<'SCAN_COMPLETE'>[]
  threatLogs: ThreatLogEvent<'THREAT_DETECTED'>[]
  search: string
}) {
  const searchLower = args.search.toLowerCase()

  const filteredRevoke = args.revokeLogs.filter((e) => {
    if (!searchLower) return true
    const d = e.data
    return (
      d.tokenAddress?.toLowerCase().includes(searchLower) ||
      d.spender?.toLowerCase().includes(searchLower)
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
      d.threatType?.toLowerCase().includes(searchLower) ||
      d.description?.toLowerCase().includes(searchLower) ||
      d.severity?.toLowerCase().includes(searchLower)
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
    revokeLogs: ThreatLogEvent<'APPROVAL_REVOKED'>[]
    scanLogs: ThreatLogEvent<'SCAN_COMPLETE'>[]
    threatLogs: ThreatLogEvent<'THREAT_DETECTED'>[]
    filteredRevoke: ThreatLogEvent<'APPROVAL_REVOKED'>[]
    filteredScans: ThreatLogEvent<'SCAN_COMPLETE'>[]
    filteredThreats: ThreatLogEvent<'THREAT_DETECTED'>[]
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
