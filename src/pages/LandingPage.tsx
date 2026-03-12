import { motion } from 'motion/react'
import Navbar from '../layouts/Navbar'
import centerImg from '../assets/images/landing-page/center.svg'
import leftImg from '../assets/images/landing-page/left.svg'
import rightImg from '../assets/images/landing-page/right.svg'
import MultiLayeredSecurity from '../features/landing-page/MultiLayeredSecurity'
import WalletHealthDashboard from '../features/landing-page/WalletHealthDashboard'
import GuardianPro from '../features/landing-page/GuardianPro'
import Pricing from '../features/landing-page/Pricing'
import FAQ from '../features/landing-page/FAQ'
import CTA from '../features/landing-page/CTA'
import Footer from '../features/landing-page/Footer'

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[linear-gradient(to_right,#679EF8,#87B2F9,#769FF9,#AADEFD,#9FE1FA)] px-20 py-6">
      {/* Vertical fade to #D6E7FF */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_0%,#D6E7FF_60%)]" />

      <div className="relative max-w-7xl mx-auto">
        <Navbar />

        {/* Hero */}
        <section className="mt-20 flex flex-col items-start w-full text-start">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-outfit text-7xl font-bold leading-tight"
          >
            <span className="bg-gradient-to-r from-[#4018F4] to-[#221678] text-transparent bg-clip-text inline-block">
              Intercept. Detect. Rescue.{' '}
            </span>
            <span className="text-stone/75">This is what wallet security should look like.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="mt-6 text-slate text-xl"
          >
            Your wallet's last line of defence shouldn't be you. Jogo scans every transaction before
            you sign it, watches the mempool for drain attempts in real time, and autonomously
            rescues your assets to a safe wallet all before most security tools have even sent you a
            notification.
          </motion.p>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
            className="mt-3 inline-flex items-start font-medium gap-1.5 rounded-lg border border-white/40 bg-white/40 backdrop-blur-sm px-4 py-1.5 text-sm text-stone"
          >
            <span className="text-teal-400">●</span>
            AI-Powered Wallet Protection
          </motion.div>

          <div className="flex flex-col items-center justify-center w-full">
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
              className="mt-8 flex items-center gap-4"
            >
              <button className="rounded-lg font-bold bg-[#3B82F6] px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-blue-600 hover:cursor-pointer">
                Download Extension
              </button>
              <button className="rounded-lg border font-semibold border-stone/20 bg-white/30 backdrop-blur-sm px-6 py-4 text-sm font-medium text-stone/75 transition-colors hover:bg-white/50 hover:cursor-pointer">
                View Demo →
              </button>
            </motion.div>

            {/* UI Cards */}
            <div className="relative mt-16 flex items-end justify-center w-full max-w-4xl h-105">
              {/* Left card */}
              <motion.img
                src={leftImg}
                alt="Jogo wallet health"
                initial={{ opacity: 0, x: -60, y: 40 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
                className="absolute left-0 bottom-0 w-[400px] top-10 drop-shadow-xl"
              />

              {/* Center card */}
              <motion.img
                src={centerImg}
                alt="Jogo safe to proceed"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.65, ease: 'easeOut' }}
                className="relative z-10 w-[400px] top-44 drop-shadow-2xl"
              />

              {/* Right card */}
              <motion.img
                src={rightImg}
                alt="Jogo scanning"
                initial={{ opacity: 0, x: 60, y: 40 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8, ease: 'easeOut' }}
                className="absolute right-0 bottom-0 w-[400px] top-10 drop-shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Multi Layered Security */}
        <MultiLayeredSecurity />

        {/* Wallet Health Dashboard */}
        <WalletHealthDashboard />

        {/* Guardian Pro */}
        <GuardianPro />

        {/* Pricing */}
        <Pricing />

        {/* FAQ */}
        <FAQ />

        {/* CTA */}
        <CTA />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
