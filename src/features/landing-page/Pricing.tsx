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
  },
  {
    plan: 'Guardian Plus',
    description: 'The first and only autonomous rescue layer for your assets.',
    price: '$19',
    period: '/ month',
    features: ['Everything in Extension', 'Wallet Health Monitoring'],
    buttonText: 'Get Started with Pro',
    isRecommended: false,
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
            transition={{ duration: 0.5, delay: 0.1 * i, ease: 'easeOut' }}
            className={`relative flex flex-col h-[675px] rounded-2xl p-6 ${
              plan.isRecommended
                ? 'bg-gradient-to-b from-[#5B9CF6] to-[#A8D4FA] text-white'
                : 'bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-sm border border-white/40'
            }`}
          >
            {/* Badge */}
            {plan.badge && (
              <span className="absolute top-4 right-4 rounded-full bg-white/20 px-3 py-0.5 text-[10px] font-semibold tracking-wider text-white">
                {plan.badge}
              </span>
            )}

            <h3 className={`text-xl font-bold ${plan.isRecommended ? 'text-white' : 'text-stone'}`}>
              {plan.plan}
            </h3>
            <p
              className={`mt-1 text-sm leading-relaxed ${plan.isRecommended ? 'text-white/80' : 'text-slate'}`}
            >
              {plan.description}
            </p>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-1">
              <span
                className={`text-4xl font-bold ${plan.isRecommended ? 'text-white' : 'text-stone'}`}
              >
                {plan.price}
              </span>
              <span className={`text-sm ${plan.isRecommended ? 'text-white/70' : 'text-slate'}`}>
                {plan.period}
              </span>
            </div>

            {/* Features */}
            <ul className="mt-6 flex flex-col gap-3 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <CircleCheck
                    className={`h-4 w-4 flex-shrink-0 ${plan.isRecommended ? 'text-white' : 'text-blue-500'}`}
                  />
                  <span className={plan.isRecommended ? 'text-white' : 'text-stone'}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <button
              className={`mt-8 w-full rounded-xl py-3 text-sm font-semibold transition-colors hover:cursor-pointer ${
                plan.isRecommended
                  ? 'border border-white bg-transparent text-white hover:bg-white/10'
                  : 'border border-stone/20 bg-transparent text-stone hover:bg-white/40'
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
