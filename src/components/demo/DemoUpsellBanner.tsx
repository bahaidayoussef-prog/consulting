import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface DemoUpsellBannerProps {
  show: boolean
  onDismiss: () => void
}

export default function DemoUpsellBanner({ show, onDismiss }: DemoUpsellBannerProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            left: '1.5rem',
            right: '1.5rem',
            bottom: '1.5rem',
            zIndex: 200,
            background: 'var(--navy)',
            color: '#f0ede8',
            padding: '1.5rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            flexWrap: 'wrap',
            boxShadow: '0 20px 60px rgba(10,20,32,0.35)',
            maxWidth: 1300,
            margin: '0 auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--blue-bright)',
                border: '1px solid rgba(47,111,181,0.5)',
                padding: '0.35rem 0.6rem',
                flexShrink: 0,
              }}
            >
              Démo
            </span>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.95rem', fontWeight: 300, margin: 0, lineHeight: 1.5 }}>
              Vous testez la version démo. Passez à la version Pro déployée sur votre système réel.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
            <Link to="/contact" className="btn-primary" style={{ padding: '0.85rem 1.8rem', fontSize: '0.78rem' }}>
              Discuter de mon projet →
            </Link>
            <button
              onClick={onDismiss}
              aria-label="Fermer"
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(240,237,232,0.5)',
                fontSize: '1.3rem',
                lineHeight: 1,
                cursor: 'none',
                padding: '0.25rem',
              }}
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
