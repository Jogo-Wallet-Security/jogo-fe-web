import { Wallet, Check, PauseCircle, PlayCircle } from 'lucide-react'
import { useMempoolMonitor } from '../hooks/useMempoolMonitor'

export function SideCards() {
  const { safeWallet, activeProtection, toggleProtection } = useMempoolMonitor()

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Safe Wallet Card */}
      <div className="rounded-[2rem] border border-white/50 bg-white/40 backdrop-blur-md shadow-sm p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-slate-800 mb-4">Safe Wallet</h3>
          <div className="rounded-2xl bg-white/60 border border-white/50 p-4 flex items-center gap-4 mb-4">
            <div className="bg-green-100 rounded-xl p-2.5">
              <Wallet className="text-green-600" size={20} />
            </div>
            <div>
              <p className="font-semibold text-slate-800">{safeWallet.address}</p>
              <p className="text-xs text-slate-500">Last verified {safeWallet.lastVerified}</p>
            </div>
          </div>
        </div>
        <button className="w-full py-2.5 rounded-xl bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 transition-colors">
          Change safe wallet
        </button>
      </div>

      {/* Active Protection Card */}
      <div className="rounded-[2rem] border border-white/50 bg-white/40 backdrop-blur-md shadow-sm p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-slate-800 mb-6">Active Protection</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Check className="text-green-500" size={18} />
              <span
                className={`text-sm font-medium ${activeProtection.isPaused ? 'text-slate-400' : 'text-slate-700'}`}
              >
                Real-time Mempool Monitoring
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="text-green-500" size={18} />
              <span
                className={`text-sm font-medium ${activeProtection.isPaused ? 'text-slate-400' : 'text-slate-700'}`}
              >
                Smart Contract Scanning
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="text-green-500" size={18} />
              <span
                className={`text-sm font-medium ${activeProtection.isPaused ? 'text-slate-400' : 'text-slate-700'}`}
              >
                Automated Asset Rescue
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={toggleProtection}
          className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          {activeProtection.isPaused ? (
            <>
              <PlayCircle size={18} /> Resume protection
            </>
          ) : (
            <>
              <PauseCircle size={18} /> Pause protection
            </>
          )}
        </button>
      </div>
    </div>
  )
}
