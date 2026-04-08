import { Shield, Twitter, Github } from 'lucide-react'
import { Link } from 'react-router' // or 'react-router-dom' - user uses 'react-router' in App.tsx

export default function Footer() {
  return (
    <footer className="w-full mt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="rounded-3xl border border-white/50 bg-white/40 backdrop-blur-md p-10 lg:p-14 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-16">
            <div className="col-span-1 md:col-span-1 border-r-0 md:border-r border-transparent">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-600 rounded p-1.5 flex items-center justify-center">
                  <Shield size={20} className="text-white" />
                </div>
                <span className="text-slate-800 font-bold text-xl">Jogo</span>
              </div>
              <p className="text-sm text-slate-500 max-w-[240px]">
                The guardian of your digital assets. Real-time protection for the decentralized web.
              </p>
            </div>

            <div className="col-span-1">
              <h3 className="font-semibold text-slate-800 mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="#"
                    className="text-sm text-slate-500 hover:text-blue-500 transition-colors"
                  >
                    Extension
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-slate-500 hover:text-blue-500 transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-slate-500 hover:text-blue-500 transition-colors"
                  >
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-1">
              <h3 className="font-semibold text-slate-800 mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="#"
                    className="text-sm text-slate-500 hover:text-blue-500 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-slate-500 hover:text-blue-500 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-slate-500 hover:text-blue-500 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-1">
              <h3 className="font-semibold text-slate-800 mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="#"
                    className="text-sm text-slate-500 hover:text-blue-500 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-slate-500 hover:text-blue-500 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center px-4 lg:px-8">
          <p className="text-xs text-slate-500">© 2023 Jogo Security Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
              <Twitter size={16} />
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
              <Github size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
