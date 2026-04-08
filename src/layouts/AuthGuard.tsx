import { useAccount } from 'wagmi'
import { Navigate } from 'react-router'
import type { ReactNode } from 'react'

interface AuthGuardProps {
  children: ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isConnected, isConnecting, isReconnecting } = useAccount()

  if (isConnecting || isReconnecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!isConnected) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
