import { motion } from 'motion/react'
import { CircleCheck } from 'lucide-react'

export interface Plan {
  plan: string
  description: string
  price: string
  period: string
  features: string[]
  buttonText: string
  isRecommended: boolean
  bg: string
  badge?: string
  tier?: number
}

/** Map API response to display Plan */
export interface ApiPlan {
  tier: number
  name: string
  priceEth: string
  features: string[]
}

const PLAN_META: Record<
  number,
  { description: string; bg: string; badge?: string; buttonText: string }
> = {
  0: {
    description: 'Comprehensive real-time protection for every Web3 user.',
    bg: 'bg-gradient-to-br from-[#F3F9FF] to-[#BDD7FC] backdrop-blur-sm',
    buttonText: 'Install Extension',
  },
  1: {
    description: 'The first and only autonomous rescue layer for your assets.',
    bg: 'bg-gradient-to-b from-[#8DC4FE] to-[#50A2FE]',
    buttonText: 'Get Started with Plus',
  },
  2: {
    description: 'The first and only autonomous rescue layer for your assets.',
    bg: 'bg-gradient-to-b from-[#3B82F7] to-[#1D58DC]',
    badge: 'RECOMMENDED',
    buttonText: 'Get Started with Pro',
  },
}

export function apiPlanToDisplayPlan(apiPlan: ApiPlan): Plan {
  const meta = PLAN_META[apiPlan.tier] ?? {
    description: '',
    bg: 'bg-gradient-to-br from-[#F3F9FF] to-[#BDD7FC]',
    buttonText: 'Get Started',
  }
  const priceLabel = apiPlan.priceEth === '0' ? 'Free' : `${apiPlan.priceEth} ETH`
  const period = apiPlan.priceEth === '0' ? '/ forever' : '/ month'

  return {
    tier: apiPlan.tier,
    plan: apiPlan.name,
    description: meta.description,
    price: priceLabel,
    period,
    features: apiPlan.features,
    buttonText: meta.buttonText,
    isRecommended: apiPlan.tier === 2,
    bg: meta.bg,
    badge: meta.badge,
  }
}

interface PricingCardsProps {
  plans: Plan[]
  onAction?: (plan: Plan) => void
  isLoading?: boolean
}

export function PricingCards({ plans, onAction, isLoading }: PricingCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {plans.map((plan, i) => (
        <motion.div
          key={plan.plan}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 * i, ease: 'easeOut' }}
          className={`relative flex flex-col min-h-[580px] rounded-4xl p-10 ${plan.bg} ${
            plan.isRecommended ? 'text-white' : ''
          }`}
        >
          {/* Badge */}
          {plan.badge && (
            <span className="rounded-full bg-white/20 px-3 py-0.5 text-[10px] w-fit tracking-widest text-white/75 mb-4">
              {plan.badge}
            </span>
          )}

          <h3 className={`text-2xl font-bold ${plan.isRecommended ? 'text-white' : 'text-stone'}`}>
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
              className={`text-3xl font-sora ${plan.isRecommended ? 'text-white' : 'text-stone'}`}
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
            onClick={() => onAction && onAction(plan)}
            disabled={isLoading}
            className={`mt-8 w-full rounded-xl py-3 text-sm font-semibold transition-colors hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
              plan.tier === 0
                ? 'border-2 border-blue-500 bg-transparent text-blue-500 hover:bg-white/30'
                : 'bg-white text-blue-500 hover:bg-blue-50'
            }`}
          >
            {isLoading ? 'Processing...' : plan.buttonText}
          </button>
        </motion.div>
      ))}
    </div>
  )
}
