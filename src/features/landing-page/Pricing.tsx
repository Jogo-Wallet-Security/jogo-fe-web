import { motion } from 'motion/react'
import { CircleCheck } from 'lucide-react'

const plans = [
  {
    plan: 'Browser Extension',
    description: 'Comprehensive real-time protection for every Web3 user.',
    price: '$0',
    period: '/ forever',
    features: [
      'Phishing Site Blocking',
      'Transaction Simulation',
      'Risk Score Analysis',
      'Approval Manager',
      'Wallet Health Monitoring',
    ],
    buttonText: 'Install Extension',
    isRecommended: false,
    bg: 'bg-gradient-to-br from-[#F3F9FF] to-[#BDD7FC] backdrop-blur-sm',
  },
  {
    plan: 'Guardian Plus',
    description: 'The first and only autonomous rescue layer for your assets.',
    price: '$19',
    period: '/ month',
    features: ['Everything in Extension', 'Wallet Health Monitoring'],
    buttonText: 'Get Started with Pro',
    isRecommended: false,
    bg: 'bg-gradient-to-b from-[#8DC4FE] to-[#50A2FE]',
  },
  {
    plan: 'Guardian Pro',
    badge: 'RECOMMENDED',
    description: 'The first and only autonomous rescue layer for your assets.',
    price: '$19',
    period: '/ month',
    features: [
      'Everything in Extension',
      'Autonomous Asset Rescue',
      'Mempool Approval Monitoring',
      'Priority Flashbots Access',
    ],
    buttonText: 'Get Started with Pro',
    isRecommended: true,
    bg: 'bg-gradient-to-b from-[#3B82F7] to-[#1D58DC]',
  },
]

export default function Pricing() {
  return (
    <section className="">
      <div className="grid grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.plan}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 * i, ease: 'easeOut' }}
            className={`relative flex flex-col h-[675px] rounded-4xl p-10 ${plan.bg} ${
              plan.isRecommended ? 'text-white' : ''
            }`}
          >
            {/* Badge */}
            {plan.badge && (
              <span className="rounded-full bg-white/20 px-3 py-0.5 text-[10px] w-fit tracking-widest text-white/75 mb-4">
                {plan.badge}
              </span>
            )}

            <h3
              className={`text-2xl font-bold ${plan.isRecommended ? 'text-white' : 'text-stone'}`}
            >
              {plan.plan}
            </h3>
            <p
              className={`mt-1 text-[16px] leading-relaxed ${plan.isRecommended ? 'text-white/80' : 'text-slate'}`}
            >
              {plan.description}
            </p>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-1">
              <span
                className={`text-5xl font-sora ${plan.isRecommended ? 'text-white' : 'text-stone'}`}
              >
                {plan.price}
              </span>
              <span
                className={`text-lg font-sora ${plan.isRecommended ? 'text-white/70' : 'text-slate'}`}
              >
                {plan.period}
              </span>
            </div>

            {/* Features */}
            <ul className="mt-6 flex flex-col gap-3 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-[16px]">
                  <CircleCheck
                    className={`h-4 w-4 flex-shrink-0 ${plan.isRecommended ? 'text-white' : 'text-[#1A57DB]'}`}
                  />
                  <span className={plan.isRecommended ? 'text-white' : 'text-stone/75'}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <button
              className={`mt-8 w-full rounded-xl py-3 text-sm font-semibold transition-colors hover:cursor-pointer ${
                plan.plan === 'Browser Extension'
                  ? 'border-2 border-blue-500 bg-transparent text-blue-500 hover:bg-white/30 hover:cursor-pointer'
                  : 'bg-white text-blue-400 hover:bg-gray-300 hover:cursor-pointer'
              }`}
            >
              {plan.buttonText}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
