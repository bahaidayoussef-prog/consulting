import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { getFlag, setFlag } from '../utils/localFlags'

const KEY = 'nxt_cookie_ack'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!getFlag(KEY)) {
      const t = setTimeout(() => setVisible(true), 900)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = () => {
    setFlag(KEY, '1')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          exit={{ y: '110%' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Information cookies"
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 200,
            background: 'var(--navy)',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            padding: '1rem clamp(1rem, 4vw, 3rem)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.85rem',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.8)',
              fontWeight: 300,
              maxWidth: 620,
            }}
          >
            Ce site utilise des cookies de mesure d&apos;audience (Google Analytics) pour améliorer votre
            expérience. En poursuivant votre navigation, vous les acceptez.{' '}
            <Link to="/confidentialite" style={{ color: 'var(--blue-bright-on-dark, #8fbce8)' }}>
              En savoir plus
            </Link>
            .
          </p>
          <button
            onClick={accept}
            style={{
              flexShrink: 0,
              background: 'var(--blue-bright)',
              color: '#fff',
              border: 'none',
              padding: '0.7rem 1.6rem',
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              cursor: 'pointer',
            }}
          >
            J&apos;ai compris
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
