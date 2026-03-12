import { Twitter, Github } from 'lucide-react'

const footerLinks = {
  Product: ['Extension', 'Dashboard', 'API'],
  Company: ['About Us', 'Careers', 'Blog'],
  Legal: ['Privacy Policy', 'Terms of Service'],
}

export default function Footer() {
  return (
    <footer className="border-t mb-20 border-white/30 bg-gradient-to-r from-white/40 via-white/40 to-[#C2DBFC] px-6 rounded-lg pt-12 pb-8">
      <div className="grid grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Jogo" className="h-8 w-8" />
            <span className="text-stone font-bold text-lg">Jogo</span>
          </div>
          <p className="mt-3 text-slate text-sm leading-relaxed">
            The guardian of your digital assets. Real-time protection for the decentralized web.
          </p>
        </div>

        {/* Links */}
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <h4 className="font-semibold text-stone text-sm">{category}</h4>
            <ul className="mt-3 flex flex-col gap-2">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate text-sm hover:text-stone transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="mt-12 flex items-center justify-between border-t border-white/30 pt-6">
        <p className="text-slate text-xs">&copy; 2025 Jogo Security Inc. All rights reserved.</p>
        <div className="flex items-center gap-3">
          <a href="#" className="text-slate hover:text-stone transition-colors">
            <Twitter className="h-4 w-4" />
          </a>
          <a href="#" className="text-slate hover:text-stone transition-colors">
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
