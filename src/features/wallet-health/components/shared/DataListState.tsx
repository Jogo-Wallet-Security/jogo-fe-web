import { Loader2 } from 'lucide-react'
import type { ReactNode } from 'react'

interface DataListStateProps {
  isLoading: boolean
  error?: string | null
  isEmpty: boolean
  loadingText: string
  emptyText: string
  children: ReactNode
}

export function DataListState({
  isLoading,
  error,
  isEmpty,
  loadingText,
  emptyText,
  children,
}: DataListStateProps) {
  if (isLoading) {
    return (
      <div className="flex h-full min-h-[200px] items-center justify-center text-sm text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin text-slate-500 mr-2" />
        {loadingText}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full min-h-[200px] items-center justify-center text-sm text-red-500">
        {error}
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className="flex h-full min-h-[200px] items-center justify-center text-sm text-slate-400">
        {emptyText}
      </div>
    )
  }

  return <>{children}</>
}
