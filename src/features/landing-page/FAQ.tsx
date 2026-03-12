import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Does JOGO store my private keys?',
    answer:
      'No. JOGO is a non-custodial security layer. We never have access to your private keys, seed phrases, or funds. Our extension intercepts transaction requests locally on your device.',
  },
  {
    question: 'How does the Autonomous Rescue work?',
    answer:
      'Our AI monitors the mempool for malicious transactions targeting your wallet. If a threat is detected, the system automatically triggers a front-run transaction to move your assets to your pre-configured safe vault before the drainer can execute.',
  },
  {
    question: 'Is it compatible with Ledger/Trezor?',
    answer:
      'Yes, JOGO is fully compatible with major hardware wallets. Since we work at the browser extension level, we can intercept and simulate transactions before you confirm them on your Ledger or Trezor device.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="py-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-3xl font-bold text-stone mb-4 mt-6"
      >
        Frequently Asked Questions
      </motion.h2>

      <div className="mx-auto flex flex-col gap-3">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i
          return (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 * i }}
              className="rounded-xl border border-white/40 bg-white/30 backdrop-blur-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left hover:cursor-pointer"
              >
                <span className="font-semibold text-stone text-sm">{faq.question}</span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown className="h-4 w-4 text-slate" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <p className="px-6 pb-4 text-sm text-slate leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
