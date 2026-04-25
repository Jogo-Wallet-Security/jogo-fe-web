import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { Moon, Wallet, LogOut } from 'lucide-react'
import { useDisconnect } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ConfirmationModal } from '../components/ui/ConfirmationModal'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { disconnect } = useDisconnect()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`fixed top-6 left-4 right-4 z-50 max-w-8xl mx-auto flex justify-between items-center rounded-2xl p-4 transition-all duration-300 ${
        scrolled
          ? 'border border-white/50 bg-white/20 backdrop-blur-sm'
          : 'border border-transparent bg-transparent'
      }`}
    >
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        <span className="text-stone font-bold text-xl">Jogo</span>
      </div>

      <ConnectButton.Custom>
        {({ account, chain, openConnectModal, openAccountModal, mounted }) => {
          const connected = mounted && account && chain

          return (
            <>
              {/* Nav Links — conditional on connection state */}
              <div className="flex items-center justify-between gap-10">
                {connected ? (
                  <>
                    <button
                      onClick={() => navigate('/wallet-health')}
                      className={`cursor-pointer flex items-center gap-1.5 transition-colors ${location.pathname.includes('/wallet-health') ? 'text-stone font-bold' : 'text-slate hover:text-stone hover:font-bold'}`}
                    >
                      Wallet Health
                    </button>
                    <button
                      onClick={() => navigate('/mempool')}
                      className={`cursor-pointer flex items-center gap-1.5 transition-colors ${location.pathname.includes('/mempool') ? 'text-stone font-bold' : 'text-slate hover:text-stone'}`}
                    >
                      Mempool Monitor
                    </button>
                    <button
                      onClick={() => navigate('/settings')}
                      className={`cursor-pointer flex items-center gap-1.5 transition-colors ${location.pathname.includes('/settings') ? 'text-stone font-bold' : 'text-slate hover:text-stone'}`}
                    >
                      Settings
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-slate font-medium cursor-pointer hover:text-stone transition-colors">
                      Features
                    </p>
                    <p className="text-slate font-medium cursor-pointer hover:text-stone transition-colors">
                      Pricing
                    </p>
                    <p className="text-slate font-medium cursor-pointer hover:text-stone transition-colors">
                      FAQs
                    </p>
                  </>
                )}
              </div>

              {/* Right side actions */}
              <div className="flex items-center gap-4">
                <Moon
                  className="text-slate cursor-pointer hover:text-stone transition-colors"
                  size={20}
                />
                {connected ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={openAccountModal}
                      className="px-4 py-1 border border-white/50 bg-white/20 backdrop-blur-sm text-slate rounded-lg hover:text-white hover:bg-blue-600 transition-colors flex items-center hover:cursor-pointer"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 flex-shrink-0" />
                      <p>{account.displayName}</p>
                    </button>
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="px-2 py-2 border border-white/50 bg-white/20 backdrop-blur-sm text-slate rounded-lg hover:text-white hover:bg-red-600 transition-colors flex items-center hover:cursor-pointer"
                      title="Log Out"
                    >
                      <LogOut size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={openConnectModal}
                    className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center hover:cursor-pointer"
                  >
                    <Wallet className="inline-block mr-2" size={16} />
                    <p>Log In With Wallet</p>
                  </button>
                )}
              </div>
            </>
          )
        }}
      </ConnectButton.Custom>

      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          setShowLogoutModal(false)
          disconnect()
        }}
        title="Confirm Logout"
        description={
          <p className="text-slate-600">
            Are you sure you want to disconnect your wallet? You will need to reconnect to securely
            access your dashboard again.
          </p>
        }
        confirmText="Log Out"
        confirmColor="red"
        icon={<LogOut size={16} />}
      />
    </div>
  )
}
