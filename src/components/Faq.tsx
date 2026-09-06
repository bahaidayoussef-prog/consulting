import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { servicesFAQ } from './Conseil'
import { FAQ as formationFAQ } from '../data/formations'
import { SchemaScript } from './SchemaHelper'
import { generateFAQSchema } from '../utils/seoData'

const ease = [0.16, 1, 0.3, 1] as const

function FAQItem({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease }}
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '1.75rem 0',
          textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '1.05rem', fontWeight: 600, color: 'var(--navy)' }}>
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: '1.4rem', color: 'var(--blue-bright)', flexShrink: 0, lineHeight: 1 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ fontSize: '0.95rem', color: 'var(--dark-muted)', lineHeight: 1.8, fontWeight: 300, paddingBottom: '1.75rem', maxWidth: 760 }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function FAQSection({ num, title, items }: { num: string; title: string; items: Array<{ q: string; a: string }> }) {
  return (
    <div style={{ marginBottom: '5rem' }}>
      <div
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--mid)',
          marginBottom: '1.5rem',
        }}
      >
        {num}
      </div>
      <h2
        style={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
          fontWeight: 800,
          lineHeight: 0.98,
          letterSpacing: '-0.02em',
          color: 'var(--navy)',
          margin: '0 0 2.5rem',
        }}
      >
        {title}
      </h2>
      <div style={{ maxWidth: 900 }}>
        {items.map((item, i) => (
          <FAQItem key={i} item={item} />
        ))}
      </div>
    </div>
  )
}

export default function Faq() {
  const allFAQ = [...servicesFAQ, ...formationFAQ]

  return (
    <section style={{ background: '#ffffff', padding: '2rem 4rem 8rem', color: 'var(--navy)' }}>
      <SchemaScript schema={generateFAQSchema(allFAQ)} />
      <div className="section-inner">
        <FAQSection num="01 / Conseil & Diagnostic" title="Missions de conseil." items={servicesFAQ} />
        <FAQSection num="02 / Formation" title="Programmes de formation." items={formationFAQ} />
      </div>
    </section>
  )
}
