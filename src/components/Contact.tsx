import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const deliverables = [
  "Un premier diagnostic de vos enjeux Supply Chain",
  "2 à 3 leviers concrets à activer rapidement",
  "Une orientation claire sur les prochaines étapes — avec ou sans nous",
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contact"
      style={{ background: 'var(--dark)', overflow: 'hidden', position: 'relative' }}
    >
      {/* Decorative gold glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '30%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,146,42,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={ref}
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '8rem 4rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6rem',
          alignItems: 'center',
        }}
      >
        {/* Left — editorial */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-tag" style={{ color: 'rgba(212,168,67,0.9)' }}>
            Prenons contact
          </div>
          <h2
            style={{
              fontFamily: 'Bodoni Moda, serif',
              fontSize: 'clamp(2.2rem, 4vw, 4rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              marginBottom: '1.5rem',
              color: 'var(--dark-text)',
            }}
          >
            Prêt à transformer votre Supply Chain en avantage compétitif&nbsp;?
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--dark-muted)',
              lineHeight: 1.8,
              maxWidth: 460,
            }}
          >
            Le premier échange est gratuit, dure 45 minutes, et n&apos;engage à rien. Nous venons préparés.
            Vous repartez avec des actions concrètes.
          </p>

          <div
            style={{
              marginTop: '3rem',
              paddingTop: '3rem',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {[
              { label: 'essor.consulting.maroc@gmail.com', href: 'mailto:essor.consulting.maroc@gmail.com', tag: 'Email' },
              { label: '+212 06 63 44 92 00', href: 'tel:+212663449200', tag: 'Tél' },
              { label: 'WhatsApp', href: 'https://wa.me/212663449200', tag: 'WA' },
              { label: 'Casablanca, Maroc', href: undefined, tag: 'Lieu' },
            ].map(({ tag, label, href }) => (
              <div
                key={label}
                style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}
              >
                <span style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.55rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(192,154,47,0.5)',
                  flexShrink: 0,
                  width: 28,
                }}>
                  {tag}
                </span>
                {href ? (
                  <a
                    href={href}
                    style={{
                      fontSize: '0.9rem',
                      color: 'rgba(227,226,226,0.6)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--gold)')}
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = 'rgba(227,226,226,0.6)')
                    }
                  >
                    {label}
                  </a>
                ) : (
                  <span style={{ fontSize: '0.9rem', color: 'rgba(227,226,226,0.6)' }}>
                    {label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — CTA card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '3.5rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top accent */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
              }}
            />

            <h3
              style={{
                fontFamily: 'Bodoni Moda, serif',
                fontSize: '1.3rem',
                fontWeight: 700,
                color: 'var(--dark-text)',
                marginBottom: '2rem',
              }}
            >
              Vous repartez avec :
            </h3>

            <ul style={{ listStyle: 'none', marginBottom: '3rem' }}>
              {deliverables.map((d, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.9rem 0',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    fontSize: '0.92rem',
                    color: 'rgba(227,226,226,0.8)',
                    lineHeight: 1.6,
                  }}
                >
                  <span
                    style={{
                      color: 'var(--gold)',
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.75rem',
                      marginTop: '0.2em',
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {d}
                </motion.li>
              ))}
            </ul>

            <motion.a
              href="mailto:essor.consulting.maroc@gmail.com"
              whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(184,146,42,0.3)' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                background: 'var(--gold)',
                color: 'var(--dark)',
                padding: '1.1rem 2.5rem',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
                borderRadius: '2px',
                letterSpacing: '0.03em',
                transition: 'background 0.25s',
              }}
            >
              Réserver mon échange découverte →
            </motion.a>

            <p
              style={{
                textAlign: 'center',
                marginTop: '1rem',
                fontSize: '0.78rem',
                color: 'rgba(227,226,226,0.3)',
                fontFamily: 'DM Mono, monospace',
                letterSpacing: '0.08em',
              }}
            >
              GRATUIT · SANS ENGAGEMENT · 45 MINUTES
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
