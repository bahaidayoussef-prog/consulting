import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const CARDS = [
  {
    num: '01',
    title: 'Consultants seniors',
    desc: 'Certifiés DDMRP, formés sur le terrain, pilotes de vos transformations les plus complexes.',
  },
  {
    num: '02',
    title: 'Consultants juniors',
    desc: 'Formés en interne, rigueur méthodologique et disponibilité pour chaque mission.',
  },
  {
    num: '03',
    title: 'Équipe administrative',
    desc: 'Chevronnée et investie, garante de la fluidité de chaque projet, du devis au bilan.',
  },
]

export default function Team() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ background: 'var(--dark)' }}>
      <div className="section-inner" style={{ padding: 'var(--sp)' }} ref={ref}>
        <div
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'var(--blue-bright)',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <span style={{ display: 'block', width: 24, height: 1, background: 'var(--blue-bright)', opacity: 0.5 }} />
          Équipe · Organisation
        </div>

        <div className="team-header-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'end', marginBottom: '4rem' }}>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 'clamp(2.2rem, 4vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--navy)',
              margin: 0,
            }}
          >
            Une équipe complète, à la hauteur de vos enjeux.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontSize: '1rem',
              color: 'var(--mid)',
              lineHeight: 1.8,
              fontWeight: 300,
              margin: 0,
            }}
          >
            Du diagnostic à la transformation opérationnelle, chaque mission s&apos;appuie sur une
            équipe pluridisciplinaire, pas sur un consultant isolé.
          </motion.p>
        </div>

        {/* 3 cards */}
        <div className="team-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
          {CARDS.map((c, i) => (
            <motion.div
              key={c.num}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.1 }}
              style={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderTop: '2px solid var(--blue-bright)',
                padding: '2.5rem 2rem',
              }}
            >
              <div style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.14em',
                color: 'var(--blue-bright)',
                marginBottom: '1.5rem',
              }}>
                {c.num}
              </div>
              <h3 style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '1.2rem',
                fontWeight: 800,
                color: 'var(--navy)',
                marginBottom: '0.85rem',
                lineHeight: 1.2,
              }}>
                {c.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--mid)', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom banner — 2 columns */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '3rem',
          }}
        >
          <div
            className="team-banner-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '3rem',
              background: 'var(--dark-2)',
              padding: '3rem',
            }}
          >
            <div style={{ borderRight: '1px solid var(--border)', paddingRight: '3rem' }} className="team-banner-col">
              <h4 style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '1.1rem',
                fontWeight: 800,
                color: 'var(--navy)',
                marginBottom: '0.75rem',
              }}>
                Accompagnement des directions
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--mid)', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
                Nous accompagnons vos comités de direction dans la conduite du changement —
                diagnostic, méthode, outils, jusqu&apos;à l&apos;autonomie complète de vos équipes.
              </p>
            </div>
            <div>
              <h4 style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '1.1rem',
                fontWeight: 800,
                color: 'var(--navy)',
                marginBottom: '0.75rem',
              }}>
                Formation de vos équipes
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--mid)', lineHeight: 1.75, fontWeight: 300, marginBottom: '1.25rem' }}>
                À tous les niveaux, présentiel ou distanciel.
              </p>
              <Link
                to="/formation"
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--blue-bright)',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(47,111,181,0.3)',
                  paddingBottom: '2px',
                }}
              >
                Voir nos formations →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
