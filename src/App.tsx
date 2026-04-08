import { Routes, Route, Navigate } from 'react-router'
import { useAccount } from 'wagmi'
import LandingPage from './pages/LandingPage'
import WalletHealth from './pages/WalletHealth'
import MempoolMonitor from './pages/MempoolMonitor'
import AuthGuard from './layouts/AuthGuard'

function CatchAllRoute() {
  const { isConnected, isConnecting, isReconnecting } = useAccount()

  if (isConnecting || isReconnecting) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[linear-gradient(to_right,#679EF8,#87B2F9,#769FF9,#AADEFD,#9FE1FA)]"></div>
    )
  }

  return isConnected ? <Navigate to="/wallet-health" replace /> : <Navigate to="/" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/wallet-health"
        element={
          <AuthGuard>
            <WalletHealth />
          </AuthGuard>
        }
      />
      <Route
        path="/mempool"
        element={
          <AuthGuard>
            <MempoolMonitor />
          </AuthGuard>
        }
      />
      <Route path="*" element={<CatchAllRoute />} />
    </Routes>
  )
}
