import { useState, useEffect } from 'react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import {
  PricingCards,
  apiPlanToDisplayPlan,
  type Plan,
  type ApiPlan,
} from '../../components/shared/PricingCards'

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export default function Pricing() {
  const { openConnectModal } = useConnectModal()
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/subscription/plans`)
      .then((res) => res.json())
      .then((data: ApiPlan[]) => setPlans(data.map(apiPlanToDisplayPlan)))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleAction = (plan: Plan) => {
    if (plan.tier === 0) {
      window.open('https://chrome.google.com/webstore', '_blank')
    } else if (openConnectModal) {
      openConnectModal()
    }
  }

  if (loading) {
    return (
      <section className="flex justify-center py-20">
        <div className="flex gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-80 h-[580px] rounded-4xl bg-white/40 animate-pulse" />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="">
      <PricingCards plans={plans} onAction={handleAction} />
    </section>
  )
}
