import { motion } from 'motion/react'

export default function CTA() {
  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="rounded-3xl bg-[#3B82F6] px-12 py-16 text-center"
      >
        <h2 className="text-4xl font-bold text-white leading-tight">
          Secure your Web3 journey
          <br />
          today.
        </h2>
        <p className="mt-4 mx-auto max-w-lg text-white/80 text-sm leading-relaxed">
          Join thousands of users who trade with confidence. Get protected by the most advanced AI
          and community-driven security layer.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#3B82F6] transition-colors hover:bg-white/90 hover:cursor-pointer">
            Download Extension
          </button>
          <button className="rounded-xl border border-white px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 hover:cursor-pointer">
            View Documentation
          </button>
        </div>
      </motion.div>
    </section>
  )
}
