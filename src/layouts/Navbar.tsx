import { Moon, Wallet } from 'lucide-react'

export default function Navbar() {
  return (
    <div className="w-full border flex justify-between items-center border-white/50 rounded-2xl bg-white/20 backdrop-blur-sm p-4 mb-6">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        <span className="text-stone font-bold text-xl">Jogo</span>
      </div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-slate">Features</p>
        <p className="text-slate">Pricing</p>
        <p className="text-slate">FAQs</p>
      </div>
      <div className="flex items-center gap-4">
        <Moon className="text-slate cursor-pointer" size={20} />
        <button className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center hover:cursor-pointer">
          <Wallet className="inline-block mr-2" size={16} />
          <p>Log In With Wallet</p>
        </button>
      </div>
    </div>
  )
}
