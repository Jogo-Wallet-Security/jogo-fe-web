import { useEffect, useState } from 'react'
import { Moon, Wallet } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`fixed top-6 left-20 right-20 z-50 max-w-7xl mx-auto flex justify-between items-center rounded-2xl p-4 transition-all duration-300 ${
        scrolled
          ? 'border border-white/50 bg-white/20 backdrop-blur-sm'
          : 'border border-transparent bg-transparent'
      }`}
    >
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        <span className="text-stone font-bold text-xl">Jogo</span>
      </div>
      <div className="flex items-center justify-between gap-10">
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
