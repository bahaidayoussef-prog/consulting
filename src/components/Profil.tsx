import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CREDENTIALS = [
  { label: 'Approche', value: 'Indépendant de tout éditeur logiciel' },
  { label: 'Certification', value: 'DDMRP Certified' },
  { label: 'Zone d’action', value: 'France & Europe · Maroc' },
  { label: 'Transmission', value: 'Académique & terrain' },
]

const STATS = [
  { value: '15+', label: "Ans d’expérience terrain" },
  { value: '110+', label: 'Missions réalisées' },
  { value: '710M', label: 'MAD d’achats pilotés' },
  { value: '6', label: 'Secteurs accompagnés' },
]

const HIGHLIGHTS = [
  {
    role: 'Grande Distribution & Retail',
    org: 'Optimisation flux, stocks & approvisionnement',
    period: 'Secteur accompagné',
    img: '/images/hero-warehouse.jpg',
  },
  {
    role: 'Industrie & Manufacture',
    org: 'Planification S&OP · déploiement DDMRP',
    period: 'Secteur accompagné',
    img: '/images/pharma.jpg',
  },
  {
    role: 'Immobilier & Construction',
    org: 'Logistique chantier · achats · coordination',
    period: 'Secteur accompagné',
    img: '/images/construction.jpg',
  },
  {
    role: 'Agroalimentaire',
    org: 'Traçabilité · supply critique · conformité',
    period: 'Secteur accompagné',
    img: '/images/hero-supply-chain.jpg',
  },
  {
    role: 'Santé & Pharmaceutique',
    org: 'Chaîne du froid · approvisionnement critique',
    period: 'Secteur accompagné',
    img: '/images/healthcare.jpg',
  },
  {
    role: 'Transport & Logistique 3PL',
    org: 'Schéma directeur · WMS · TMS · P&L',
    period: 'Secteur accompagné',
    img: '/images/agro.jpg',
  },
]

export default function Profil() {
  const heroRef = useRef(null)
  const inView = useInView(heroRef, { once: true, margin: '-80px' })
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' })

  return (
    <section id="profil" style={{ background: 'var(--paper)' }}>

      {/* ── HERO PORTRAIT — plein écran ── */}
      <div
        ref={heroRef}
        style={{
          position: 'relative',
          height: '90vh',
          minHeight: 600,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        {/* Background photo */}
        <motion.img
          src="/images/office.jpg"
          alt=""
          aria-hidden="true"
          initial={{ scale: 1.06 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
            filter: 'grayscale(15%) contrast(1.05)',
          }}
        />

        {/* Overlay gradients */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,20,32,0.3) 0%, transparent 30%, rgba(10,20,32,0.75) 75%, rgba(10,20,32,0.96) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(10,20,32,0.6) 0%, transparent 60%)',
        }} />

        {/* Section number */}
        <div style={{
          position: 'absolute',
          top: '3rem',
          left: '4rem',
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          color: 'rgba(192,154,47,0.6)',
          textTransform: 'uppercase',
        }}>
          09 / À propos
        </div>

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1300, margin: '0 auto',
          padding: '0 var(--sp-x) 5rem',
          width: '100%',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <div style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.62rem',
              letterSpacing: '0.18em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              Fondateur & Directeur — Essor Consulting
            </div>

            <h2 style={{
              fontFamily: 'Bodoni Moda, serif',
              fontSize: 'clamp(3.5rem, 8vw, 10rem)',
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
              color: 'var(--dark-text)',
              margin: '0 0 1rem 0',
            }}>
              Essor<span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>.</span>
            </h2>

            <p style={{
              fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
              color: 'rgba(235,232,225,0.65)',
              lineHeight: 1.8,
              fontWeight: 300,
              maxWidth: 520,
              marginTop: '1.5rem',
            }}>
              15 ans de missions terrain en Supply Chain au Maroc et en Europe.
              Une expertise construite projet par projet, pas dans les manuels.
              Un cabinet indépendant, sans allégeance à aucun éditeur.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── STATS BANDE ── */}
      <div
        ref={statsRef}
        style={{
          background: 'var(--ink)',
          padding: '3rem var(--sp-x)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="section-inner">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0',
          }}>
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                style={{
                  padding: '1.5rem 2rem',
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                }}
              >
                <div style={{
                  fontFamily: 'Bodoni Moda, serif',
                  fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
                  fontWeight: 700,
                  color: 'var(--gold)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  marginBottom: '0.35rem',
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(235,232,225,0.3)',
                }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTEURS — grille photos ── */}
      <div style={{ background: 'var(--paper)', padding: 'var(--sp)' }}>
        <div className="section-inner">

          {/* Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'end',
            marginBottom: '5rem',
          }}>
            <motion.h3
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'Bodoni Moda, serif',
                fontSize: 'clamp(2.2rem, 4vw, 5rem)',
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: '-0.025em',
                color: 'var(--ink)',
                margin: 0,
              }}
            >
              Notre expertise.
              <br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>
                Des résultats concrets.
              </span>
            </motion.h3>

            <div>
              {CREDENTIALS.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '100px 1fr',
                    gap: '1.5rem',
                    padding: '0.85rem 0',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <div style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.6rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(192,154,47,0.6)',
                    paddingTop: '0.1rem',
                  }}>
                    {c.label}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: 'var(--mid)',
                    fontWeight: 300,
                    lineHeight: 1.6,
                  }}>
                    {c.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Photos grid — 3×2 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2px',
          }}>
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.role}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.1 }}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'var(--dark)',
                }}
              >
                {/* Photo */}
                <motion.img
                  src={h.img}
                  alt={h.role}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    width: '100%',
                    height: 280,
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'grayscale(20%) contrast(1.05)',
                  }}
                />

                {/* Gradient + texte */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, transparent 30%, rgba(10,20,32,0.92) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.75rem',
                }}>
                  <div style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.58rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    marginBottom: '0.4rem',
                  }}>
                    {h.period}
                  </div>
                  <div style={{
                    fontFamily: 'Bodoni Moda, serif',
                    fontSize: 'clamp(1rem, 1.5vw, 1.3rem)',
                    fontWeight: 700,
                    color: 'var(--dark-text)',
                    lineHeight: 1.2,
                    marginBottom: '0.2rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {h.role}
                  </div>
                  <div style={{
                    fontSize: '0.82rem',
                    color: 'rgba(235,232,225,0.45)',
                    fontWeight: 300,
                  }}>
                    {h.org}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              marginTop: '4rem',
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            <a href="#contact" className="btn-primary">
              Prendre contact avec nous →
            </a>
            <a
              href="mailto:essor.consulting.maroc@gmail.com"
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--mid)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '2px',
                transition: 'color 0.2s',
              }}
            >
              essor.consulting.maroc@gmail.com
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}