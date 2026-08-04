import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const GOLD = 'rgba(184,146,42,1)'

const items = [
  {
    title: 'Indépendance totale',
    desc: 'Nous ne touchons aucune commission de tout éditeur, intégrateur ou fournisseur. Notre rémunération vient exclusivement de vous.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round">
        <line x1="12" y1="2" x2="12" y2="22" />
        <path d="M3 7h18" />
        <path d="M5 7 L2 14 h6 Z" />
        <path d="M19 7 L16 14 h6 Z" />
        <line x1="3" y1="22" x2="21" y2="22" />
      </svg>
    ),
  },
  {
    title: 'Transparence des prix',
    desc: 'Toutes nos offres standardisées sont affichées publiquement avec leur tarif. Pas de "nous reviendrons vers vous après évaluation interne".',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="16" y2="11" />
        <line x1="8" y1="15" x2="13" y2="15" />
      </svg>
    ),
  },
  {
    title: 'Engagement sur résultats',
    desc: 'Sur les missions à fort enjeu (Achats, Stocks), nous proposons une part de rémunération indexée sur le gain réel mesuré.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round">
        <polyline points="3 17 9 11 13 15 21 7" />
        <polyline points="17 7 21 7 21 11" />
        <line x1="3" y1="21" x2="21" y2="21" />
        <line x1="3" y1="3" x2="3" y2="21" />
      </svg>
    ),
  },
  {
    title: 'Confidentialité absolue',
    desc: 'Aucun nom de client ne sera jamais cité sans accord écrit. Les références publiques sont celles que nos clients souhaitent rendre publiques.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2L4 6v6c0 5.5 3.5 10.7 8 12 4.5-1.3 8-6.5 8-12V6l-8-4z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
]

export default function Engagement() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="engagement" style={{ background: 'var(--navy)', color: 'var(--dark-text)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
      <div className="section-inner" ref={ref}>
        <div style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          color: 'rgba(192,154,47,0.45)',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
        }}>
          07 / Notre engagement éthique
        </div>
        <h2
          style={{
            fontFamily: 'Bodoni Moda, serif',
            fontSize: 'clamp(2.8rem, 5.5vw, 7rem)',
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: '-0.025em',
            marginBottom: '5rem',
            color: 'var(--dark-text)',
          }}
        >
          Ce qui nous distingue vraiment.
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
          }}
        >
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(184,146,42,0.12)' }}
              style={{
                padding: '2.5rem 2rem',
                border: '1px solid rgba(255,255,255,0.08)',
                position: 'relative',
                transition: 'box-shadow 0.3s',
              }}
            >
              {/* Gold top accent bar */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 40,
                  height: 2,
                  background: 'var(--gold)',
                }}
              />
              <span style={{ marginBottom: '1.25rem', display: 'block' }}>
                {item.icon}
              </span>
              <h3
                style={{
                  fontFamily: 'Bodoni Moda, serif',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--dark-text)',
                  marginBottom: '0.75rem',
                }}
              >
                {item.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'rgba(227,226,226,0.6)', lineHeight: 1.7 }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
