import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'

const PAGES = [
  {
    num: '01',
    href: '/services',
    label: 'Nos Services',
    desc: 'Conseil opérationnel · Systèmes WMS/TMS · Méthode DDMRP · Transformation 90 jours',
    bg: 'var(--paper)',
    color: 'var(--ink)',
  },
  {
    num: '02',
    href: '/references',
    label: 'Références',
    desc: '110+ missions · Renault, DHL, OCP, L\'Oréal · Études de cas détaillées',
    bg: 'var(--dark)',
    color: 'var(--dark-text)',
  },
  {
    num: '03',
    href: '/formation',
    label: 'Formations',
    desc: 'Devenir Responsable Logistique · Formation 1 jour · Casablanca',
    bg: 'var(--ink)',
    color: 'var(--dark-text)',
  },
  {
    num: '04',
    href: '/a-propos',
    label: 'À propos',
    desc: '20+ ans de terrain · Indépendant · DDMRP Certifié · France, Maroc & Europe',
    bg: 'var(--paper)',
    color: 'var(--ink)',
  },
]

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />

      {/* Pages grid */}
      <section style={{ background: 'var(--dark)', padding: 'var(--sp)' }}>
        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: '4rem' }}
          >
            <div className="section-tag" style={{ color: 'var(--gold)' }}>
              <span>ESSOR CONSULTING</span>
            </div>
            <h2
              style={{
                fontFamily: 'Bodoni Moda, serif',
                fontSize: 'clamp(2.5rem, 4vw, 5rem)',
                fontWeight: 400,
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                color: 'var(--dark-text)',
                margin: 0,
              }}
            >
              Supply Chain,<br />
              <span style={{ fontStyle: 'italic', fontWeight: 300 }}>réinventée.</span>
            </h2>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2px',
            }}
          >
            {PAGES.map(({ num, href, label, desc, bg, color }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              >
                <Link
                  to={href}
                  style={{
                    display: 'block',
                    background: bg,
                    color,
                    padding: '3rem 2.5rem',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                >
                  <div
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.6rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                      marginBottom: '2rem',
                    }}
                  >
                    {num}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Bodoni Moda, serif',
                      fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                      fontWeight: 700,
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                      marginBottom: '1rem',
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '0.88rem',
                      lineHeight: 1.7,
                      opacity: 0.6,
                      fontWeight: 300,
                    }}
                  >
                    {desc}
                  </div>
                  <div
                    style={{
                      marginTop: '2.5rem',
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.65rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                    }}
                  >
                    Découvrir →
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Contact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              marginTop: '5rem',
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link to="/contact" className="btn-primary">
              Prendre contact →
            </Link>
            <Link
              to="/blog"
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(235,232,225,0.45)',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                paddingBottom: '2px',
                transition: 'color 0.2s',
              }}
            >
              Lire nos articles →
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
