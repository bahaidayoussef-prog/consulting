import { motion } from 'framer-motion'

export default function DimensionnementCTA() {
  return (
    <section style={{ background: 'var(--dark-2)', padding: '4rem 4rem' }}>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: '#ffffff',
            border: '1px solid rgba(27,53,84,0.12)',
            padding: 'clamp(2rem, 4vw, 3.5rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2.5rem',
            flexWrap: 'wrap',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 3, background: 'var(--blue-bright)' }} />

          <div style={{ maxWidth: 560 }}>
            <div style={{
              fontFamily: 'DM Mono, monospace', fontSize: '0.62rem',
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'rgba(192,154,47,0.75)', marginBottom: '1rem',
            }}>
              Outil gratuit
            </div>
            <div style={{
              fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)',
              fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em',
              color: 'var(--ink)', marginBottom: '0.75rem',
            }}>
              Combien de m² pour votre entrepôt&nbsp;?
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--mid)', lineHeight: 1.7, margin: 0 }}>
              Simulateur de dimensionnement en 2 minutes : surface, baies de rayonnage, quais recommandés — une estimation directionnelle avant d'aller plus loin.
            </p>
          </div>

          <a href="/outils/dimensionnement-entrepot" className="btn-primary" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
            Estimer gratuitement →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
