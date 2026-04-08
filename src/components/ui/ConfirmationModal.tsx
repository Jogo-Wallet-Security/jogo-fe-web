import type { ReactNode } from 'react'
import { Modal } from './Modal'

export interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description?: ReactNode
  confirmText?: string
  cancelText?: string
  confirmColor?: 'blue' | 'red'
  isConfirming?: boolean
  icon?: ReactNode
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmColor = 'blue',
  isConfirming = false,
  icon,
}: ConfirmationModalProps) {
  const colorStyles = {
    blue: 'bg-[#3B82F6] hover:bg-blue-600 text-white shadow-blue-500/20',
    red: 'bg-[#F04438] hover:bg-red-600 text-white shadow-red-500/20',
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col">
        {description && <div className="mb-6">{description}</div>}

        <div className="mt-4 flex w-full items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isConfirming}
            className="flex-1 rounded-xl border border-slate-200 bg-transparent px-4 py-3 font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:cursor-pointer disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isConfirming}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-[15px] font-medium shadow-lg transition-colors hover:cursor-pointer disabled:opacity-50 ${
              colorStyles[confirmColor]
            }`}
          >
            {icon}
            {isConfirming ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  )
}
