import { Search } from 'lucide-react'

interface TableSearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function TableSearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  className = 'w-full sm:w-64',
}: TableSearchInputProps) {
  return (
    <div
      className={`flex items-center gap-2 rounded-xl bg-white/50 px-4 py-2 border border-white focus-within:border-blue-200 focus-within:ring-2 focus-within:ring-blue-50 transition-all shadow-sm ${className}`}
    >
      <Search size={14} className="text-slate-400 flex-shrink-0" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
      />
    </div>
  )
}
