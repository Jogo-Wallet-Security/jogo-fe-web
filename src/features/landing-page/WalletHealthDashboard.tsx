import { motion } from 'motion/react'
import { CircleCheck, Gavel, WandSparkles, History, LayoutPanelLeft } from 'lucide-react'
import dashboardImg from '../../assets/images/landing-page/dashboard-preview.svg'

const features = [
  {
    icon: <CircleCheck className="h-5 w-5 text-blue-500" />,
    title: 'Active Approvals Scanner',
    description: 'Deep scan for ERC-20 & NFT permissions.',
  },
  {
    icon: <Gavel className="h-5 w-5 text-blue-500" />,
    title: 'Permission Audit',
    description: 'See exactly what contracts can access your funds.',
  },
  {
    icon: <WandSparkles className="h-5 w-5 text-blue-500" />,
    title: 'One-Click Revoke',
    description: 'Revoke dangerous approvals directly from the dashboard.',
  },
  {
    icon: <History className="h-5 w-5 text-blue-500" />,
    title: 'Historical Threat Log',
    description: 'All threat events logged with expandable details.',
  },
]

export default function WalletHealthDashboard() {
  return (
    <section className="py-24">
      <div className="flex items-center gap-16">
        {/* Left side - Text content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex-shrink-0 max-w-md"
        >
          {/* Icon */}
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500">
            <LayoutPanelLeft color="white" fill="white" />
          </div>

          <h2 className="text-4xl font-bold text-stone leading-tight">Wallet Health Dashboard</h2>
          <p className="mt-3 text-slate leading-relaxed">
            Shows comprehensive security status of user's wallet. We query the blockchain for all
            active approvals across Base.
          </p>

          {/* Feature list */}
          <div className="mt-8 flex flex-col gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * i, ease: 'easeOut' }}
                className="flex items-start gap-3"
              >
                <div className="mt-0.5 flex-shrink-0">{feature.icon}</div>
                <div>
                  <h4 className="font-semibold text-stone text-sm">{feature.title}</h4>
                  <p className="text-slate text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right side - Dashboard image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="flex-1"
        >
          <img src={dashboardImg} alt="Wallet Health Dashboard" className="w-full drop-shadow-lg" />
        </motion.div>
      </div>
    </section>
  )
}
