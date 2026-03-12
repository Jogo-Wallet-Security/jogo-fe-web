import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import step1Img from '../../assets/images/landing-page/step-1.svg'
import step2Img from '../../assets/images/landing-page/step-2.svg'
import step3Img from '../../assets/images/landing-page/step-3.svg'
import { FilePenLine, Link2, Zap } from 'lucide-react'

const steps = [
  {
    title: 'Before you click',
    description:
      'Our engine scans every URL for phishing signatures, drainers, and social engineering patterns before the page even loads.',
    image: step1Img,
    imageAlt: 'Phishing site detected',
    icon: <Link2 color="white" />,
  },
  {
    title: 'Before you sign',
    description:
      "Real-time transaction simulation shows you exactly what assets will leave and enter your wallet before you hit 'Sign'.",
    image: step2Img,
    imageAlt: 'Transaction simulation',
    icon: <FilePenLine className="h-5 w-5 text-white" />,
  },
  {
    title: 'If an attack slips through',
    description:
      'Guardian Pro monitors the mempool for malicious approvals and automatically out-bids hackers to rescue your assets.',
    image: step3Img,
    imageAlt: 'Mempool monitoring',
    icon: <Zap className="h-5 w-5 text-white" />,
  },
]

export default function MultiLayeredSecurity() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={containerRef} className="py-24 mt-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold text-stone">Multi-Layered Security</h2>
        <p className="mt-3 text-lg text-slate">
          We guard your wallet at every step of your Web3 journey.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Center line track (gray background) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-stone/10" />

        {/* Center line progress (animated fill) */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-400 to-blue-600 origin-top"
        />

        {/* Steps */}
        <div className="relative flex flex-col gap-32">
          {steps.map((step, i) => {
            const isEven = i % 2 === 0
            return (
              <div key={step.title} className="relative flex items-center">
                {/* Dot on the line */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className={`absolute left-1/2 -translate-x-1/2 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg`}
                >
                  <div className="bg-blue-500 p-2 rounded-full">{step.icon}</div>
                </motion.div>

                {/* Content row */}
                <div className="grid w-full grid-cols-2 gap-16">
                  {/* Text side */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className={`flex flex-col justify-center ${isEven ? 'items-end text-right pr-12' : 'items-start text-left pl-12 col-start-2'}`}
                  >
                    <h3 className="text-2xl font-bold font-sora text-stone/80">{step.title}</h3>
                    <p className="mt-2 max-w-md text-[16px] text-slate leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>

                  {/* Image side */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className={`flex ${isEven ? 'justify-start pl-12' : 'justify-end pr-12 col-start-1 row-start-1'}`}
                  >
                    <img
                      src={step.image}
                      alt={step.imageAlt}
                      className="w-full max-w-md drop-shadow-lg"
                    />
                  </motion.div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
