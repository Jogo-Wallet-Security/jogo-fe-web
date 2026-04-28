import { useState, useEffect } from 'react'
import { parseEther } from 'viem'
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'
import {
  PricingCards,
  apiPlanToDisplayPlan,
  type Plan,
  type ApiPlan,
} from '../components/shared/PricingCards'
import JogoSubscriptionAbi from '../abi/JogoSubscription.json'

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'
const SUBSCRIPTION_CONTRACT_ADDRESS = '0xf28a9956241F4470dBaA1ef58229EfA52B187582' as const

export default function PricingPage() {
  const { address } = useAccount()
  const [plans, setPlans] = useState<Plan[]>([])
  const [loadingPlans, setLoadingPlans] = useState(true)
  const [activePlan, setActivePlan] = useState<string | null>(null)
  const [txSuccess, setTxSuccess] = useState(false)

  const { data: hash, isPending, writeContract, error: writeError, reset } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  // Fetch plans from API
  useEffect(() => {
    fetch(`${API_BASE}/subscription/plans`)
      .then((res) => res.json())
      .then((data: ApiPlan[]) => setPlans(data.map(apiPlanToDisplayPlan)))
      .catch(console.error)
      .finally(() => setLoadingPlans(false))
  }, [])

  // Handle tx success
  useEffect(() => {
    if (isConfirmed && activePlan) {
      setTxSuccess(true)
      setActivePlan(null)
      // Sync backend with new on-chain subscription
      if (address) {
        fetch(`${API_BASE}/subscription/sync/${address}`, { method: 'POST' }).catch(console.error)
      }
    }
  }, [isConfirmed, activePlan, address])

  // Handle tx error
  useEffect(() => {
    if (writeError) {
      console.error(writeError)
      setActivePlan(null)
    }
  }, [writeError])

  const handleAction = (plan: Plan) => {
    if (plan.tier === 0) {
      window.open('https://chrome.google.com/webstore', '_blank')
      return
    }

    const priceWei = parseEther(plan.tier === 1 ? '0.0039' : '0.0082')

    setActivePlan(plan.plan)
    setTxSuccess(false)
    reset()

    writeContract({
      address: SUBSCRIPTION_CONTRACT_ADDRESS,
      abi: JogoSubscriptionAbi,
      functionName: 'subscribe',
      args: [plan.tier as number],
      value: priceWei,
    })
  }

  const isTransacting = isPending || isConfirming

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[linear-gradient(to_right,#679EF8,#87B2F9,#769FF9,#AADEFD,#9FE1FA)] px-20 pt-6">
      {/* Vertical fade to #D6E7FF */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_0%,#D6E7FF_60%)]" />

      <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-between">
        <div>
          <Navbar />

          {/* Page Content */}
          <div className="mt-28 pb-16">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-stone mb-4">
                Simple, transparent pricing
              </h1>
              <p className="text-slate text-lg max-w-2xl mx-auto">
                Choose the protection level that fits your needs. Upgrade anytime to access advanced
                autonomous rescue features.
              </p>
            </div>

            {/* Success Banner */}
            {txSuccess && (
              <div className="mb-8 rounded-2xl bg-green-500/20 border border-green-500/30 px-6 py-4 text-center">
                <p className="text-green-700 font-semibold">
                  🎉 Subscription activated! Your plan is now live.
                </p>
                {hash && (
                  <a
                    href={`https://sepolia.basescan.org/tx/${hash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-green-600 hover:underline"
                  >
                    View transaction →
                  </a>
                )}
              </div>
            )}

            {/* Error Banner */}
            {writeError && (
              <div className="mb-8 rounded-2xl bg-red-500/20 border border-red-500/30 px-6 py-4 text-center">
                <p className="text-red-700 font-semibold">Transaction failed. Please try again.</p>
                <p className="text-sm text-red-600 mt-1 truncate">{writeError.message}</p>
              </div>
            )}

            {/* Skeleton loaders */}
            {loadingPlans ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="min-h-[580px] rounded-4xl bg-white/30 animate-pulse" />
                ))}
              </div>
            ) : (
              <PricingCards plans={plans} onAction={handleAction} isLoading={isTransacting} />
            )}

            {/* Pending tx indicator */}
            {isTransacting && activePlan && (
              <div className="mt-6 text-center text-slate text-sm">
                {isPending
                  ? `⏳ Confirm "${activePlan}" subscription in your wallet...`
                  : `⛓ Transaction submitted. Waiting for confirmation...`}
                {hash && (
                  <a
                    href={`https://sepolia.basescan.org/tx/${hash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-2 text-blue-600 hover:underline"
                  >
                    View on explorer →
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
