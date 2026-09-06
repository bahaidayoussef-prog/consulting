import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Retour en haut"
          className="back-to-top-btn"
          style={{
            position: 'fixed',
            bottom: '6.25rem',
            right: '1.5rem',
            zIndex: 90,
            width: 48,
            height: 48,
            background: 'var(--blue-bright)',
            border: 'none',
            borderRadius: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(47,111,181,0.35)',
            transition: 'background 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--blue-bright)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--blue-bright)')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0e1f30" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
