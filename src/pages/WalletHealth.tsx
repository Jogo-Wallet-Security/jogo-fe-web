import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'
import { WalletHealthPage } from '../features/wallet-health'

export default function WalletHealth() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[linear-gradient(to_right,#679EF8,#87B2F9,#769FF9,#AADEFD,#9FE1FA)] px-20 pt-6">
      {/* Vertical fade to #D6E7FF */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_0%,#D6E7FF_60%)]" />

      <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-between">
        <div>
          <Navbar />
          <WalletHealthPage />
        </div>
        <Footer />
      </div>
    </div>
  )
}
