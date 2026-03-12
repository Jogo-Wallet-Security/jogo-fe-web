import { motion } from 'motion/react'
import { Activity, ShieldCheck, BrainCircuit, Zap } from 'lucide-react'
import mempoolImg from '../../assets/images/landing-page/mempool-analytic-dashboard.svg'

const features = [
  {
    title: 'Mempool Monitoring',
    description: '24/7 scanning for pending malicious approvals against your wallet.',
    icon: <Activity className="h-5 w-5 text-blue-400" />,
  },
  {
    title: 'Safe Vault',
    description: 'Automated transfer to your pre-configured hardware wallet destination.',
    icon: <ShieldCheck className="h-5 w-5 text-blue-400" />,
  },
  {
    title: 'AI Prediction',
    description: 'Detecting drainer logic patterns before they reach the mainnet.',
    icon: <BrainCircuit className="h-5 w-5 text-blue-400" />,
  },
  {
    title: 'Flashbots Rescue',
    description: 'Bypassing the public mempool to prevent front-running by hackers.',
    icon: <Zap className="h-5 w-5 text-blue-400" />,
  },
]

export default function GuardianPro() {
  return (
    <section className="py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-stone leading-tight">
          Guardian Pro: The Ultimate Safety Net
        </h2>
        <p className="mt-3 max-w-3xl text-slate leading-relaxed">
          When traditional security fails, Guardian Pro takes control. Using high-frequency
          Flashbots bundles, we move your assets to safety faster than any human or script can
          react.
        </p>
      </motion.div>

      {/* Mempool Analytic Dashboard image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-10"
      >
        <img
          src={mempoolImg}
          alt="Mempool Analytic Dashboard"
          className="w-full rounded-2xl drop-shadow-lg"
        />
      </motion.div>

      {/* Feature cards */}
      <div className="mt-12 grid grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 * i, ease: 'easeOut' }}
            className="rounded-2xl border-2 border-blue-100 bg-gradient-to-br from-white/75 to-[#B3D1FD] backdrop-blur-sm p-5"
          >
            <div className="mb-3 flex h-10 w-10">{feature.icon}</div>
            <h4 className="font-semibold text-stone text-sm">{feature.title}</h4>
            <p className="mt-1 text-slate text-sm leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
