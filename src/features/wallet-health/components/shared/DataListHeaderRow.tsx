interface DataListHeaderColumn {
  key: string
  label: string
  className?: string
}

interface DataListHeaderRowProps {
  columns: DataListHeaderColumn[]
  className?: string
}

export function DataListHeaderRow({
  columns,
  className = 'grid grid-cols-12 gap-4 pb-3 border-b border-slate-200 text-xs font-medium text-slate-500 tracking-widest uppercase',
}: DataListHeaderRowProps) {
  return (
    <div className={className}>
      {columns.map((column) => (
        <div key={column.key} className={column.className}>
          {column.label}
        </div>
      ))}
    </div>
  )
}
