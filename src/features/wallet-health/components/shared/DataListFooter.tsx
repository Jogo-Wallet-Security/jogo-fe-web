import type { ReactNode } from 'react'

interface DataListFooterProps {
  start: number
  end: number
  total: number
  onPrev?: () => void
  onNext?: () => void
  canPrev?: boolean
  canNext?: boolean
  isLoading?: boolean
  rightSlot?: ReactNode
  className?: string
}

export function DataListFooter({
  start,
  end,
  total,
  onPrev,
  onNext,
  canPrev = true,
  canNext = true,
  isLoading = false,
  rightSlot,
  className = 'flex items-center justify-between pt-5 mt-auto border-t border-slate-200 w-full',
}: DataListFooterProps) {
  return (
    <div className={className}>
      <p className="text-sm text-slate-500">
        Showing{' '}
        <span className="font-medium text-slate-900">
          {start}–{end}
        </span>{' '}
        of <span className="font-medium text-slate-900">{total}</span> results
      </p>

      {rightSlot ?? (
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={!canPrev || isLoading}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors bg-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={onNext}
            disabled={!canNext || isLoading}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors bg-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
