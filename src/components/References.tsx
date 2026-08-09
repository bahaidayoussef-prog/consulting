import { motion } from 'framer-motion'

const LOGOS = [
  { name: 'Diana Holding', file: '/images/logos/diana-holding.svg', height: 34 },
  { name: 'Safari Groupe', file: '/images/logos/safari-groupe.png', height: 40 },
  { name: 'Maghreb Steel', file: '/images/logos/maghreb-steel.svg', height: 26 },
  { name: 'Casanet', file: '/images/logos/casanet.png', height: 46 },
]

const REFS = [
  {
    client: 'Renault-Nissan',
    sector: 'Automobile',
    mission: 'Conception greenfield logistique — site industriel de Tanger. Logistique amont, flux assemblage, standards SPR Groupe Renault.',
    result: 'Référence greenfield industrielle au Maroc',
    image: '/images/pharma.jpg',
    span: 2,
  },
  {
    client: "L'Oréal · Nestlé · Mars",
    sector: 'FMCG',
    mission: "Gestion opérationnelle d'une plateforme logistique 3PL de 21 000 m², 120 collaborateurs. Ingénierie des solutions logistiques pour les plus grandes marques FMCG du Maroc.",
    result: 'Productivité +35% · Taux de service 98,5%',
    image: '/images/hero-supply-chain.jpg',
    span: 1,
  },
  {
    client: 'Groupe Addoha',
    sector: 'Immobilier & Construction',
    mission: '31 chantiers simultanés. 710 millions MAD d\'achats annuels. Transformation complète de la fonction supply chain groupe.',
    result: '11% d\'économies réalisées sur le spend achats',
    image: '/images/construction.jpg',
    span: 1,
  },
  {
    client: 'Task Force Vaccination',
    sector: 'Mission Nationale COVID-19',
    mission: 'Expert métier bénévole pour la Task Force vaccination nationale. DDMRP, AMOA SI, gouvernance risques, cold chain national à l\'échelle du Royaume.',
    result: 'Cold chain national — vaccination de masse',
    image: '/images/healthcare.jpg',
    span: 1,
  },
  {
    client: 'PME & ETI Marocaines',
    sector: '110+ Missions · Tous secteurs',
    mission: 'Diagnostic, optimisation stocks, performance achats, schémas logistiques, AMOA SI, déploiement WMS/TMS/APS. De Casablanca à Agadir.',
    result: '110+ missions · 20+ ans · 0 commission',
    image: '/images/business.jpg',
    span: 2,
  },
]

interface RefCardProps {
  r: typeof REFS[0]
  index: number
}

function RefCard({ r, index }: RefCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.1 }}
      style={{
        gridColumn: r.span === 2 ? 'span 2' : 'span 1',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--dark-2)',
        cursor: 'default',
      }}
    >
      {/* Image */}
      <div style={{
        width: '100%',
        height: r.span === 2 ? 480 : 340,
        overflow: 'hidden',
        position: 'relative',
      }}>
        <motion.img
          src={r.image}
          alt={r.client}
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(20%) contrast(1.05)',
            display: 'block',
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 30%, rgba(10,20,32,0.88) 100%)',
        }} />

        {/* Sector tag */}
        <div style={{
          position: 'absolute',
          top: '1.5rem',
          left: '1.5rem',
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          background: 'rgba(10,20,32,0.7)',
          padding: '0.3rem 0.7rem',
          backdropFilter: 'blur(8px)',
        }}>
          {r.sector}
        </div>
      </div>

      {/* Text content */}
      <div style={{ padding: '2rem 2.5rem 2.5rem' }}>
        <h3 style={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: r.span === 2 ? 'clamp(1.8rem, 3vw, 3rem)' : 'clamp(1.4rem, 2vw, 2rem)',
          fontWeight: 800,
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          color: 'var(--navy)',
          marginBottom: '0.75rem',
        }}>
          {r.client}
        </h3>
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--dark-muted)',
          lineHeight: 1.75,
          fontWeight: 300,
          marginBottom: '1.5rem',
          maxWidth: r.span === 2 ? 560 : undefined,
        }}>
          {r.mission}
        </p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.62rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
        }}>
          <span style={{ display: 'block', width: 20, height: 1, background: 'var(--gold)' }} />
          {r.result}
        </div>
      </div>
    </motion.div>
  )
}

function LogoWall() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        marginBottom: '5rem',
        paddingTop: '3rem',
        borderTop: '1px solid var(--dark-border)',
      }}
    >
      <div style={{
        fontFamily: 'DM Mono, monospace',
        fontSize: '0.62rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--dark-muted)',
        marginBottom: '2.5rem',
      }}>
        Ils nous font confiance
      </div>
      <div className="logo-wall-grid" style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${LOGOS.length}, 1fr)`,
        gap: '2px',
        background: 'var(--dark-border)',
      }}>
        {LOGOS.map((logo) => (
          <div
            key={logo.name}
            className="logo-wall-tile"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 120,
              background: 'var(--dark)',
              padding: '1.5rem',
            }}
          >
            <img
              src={logo.file}
              alt={logo.name}
              style={{
                height: logo.height,
                maxWidth: '100%',
                width: 'auto',
                objectFit: 'contain',
                filter: 'grayscale(100%)',
                opacity: 0.55,
                transition: 'filter 0.4s ease, opacity 0.4s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'grayscale(0%)'
                e.currentTarget.style.opacity = '1'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'grayscale(100%)'
                e.currentTarget.style.opacity = '0.55'
              }}
            />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function References() {
  return (
    <section id="references" style={{ background: 'var(--dark-3)', padding: 'var(--sp)' }}>
      <div className="section-inner">

        {/* Header */}
        <div className="refs-header" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'end',
          marginBottom: '5rem',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: 'rgba(192,154,47,0.45)',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>
              06 / Références clients
            </div>
            <h2 style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 'clamp(2.8rem, 5.5vw, 7rem)',
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
              color: 'var(--navy)',
              margin: 0,
            }}>
              Des missions.
              <br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>
                Des résultats.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{
              fontSize: '1rem',
              color: 'var(--dark-muted)',
              lineHeight: 1.8,
              fontWeight: 300,
              maxWidth: 440,
              margin: 0,
            }}
          >
            Renault-Nissan, L&apos;Oréal, Nestlé, Mars, DHL, Groupe Addoha — 110+ missions
            réalisées au Maroc. Des secteurs variés, une méthode constante&nbsp;: les résultats
            avant les rapports.
          </motion.p>
        </div>

        <LogoWall />

        {/* Grid — hugeinc work layout */}
        <div className="refs-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2px',
        }}>
          {REFS.map((r, i) => (
            <RefCard key={r.client} r={r} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            marginTop: '4rem',
            paddingTop: '3rem',
            borderTop: '1px solid rgba(27,53,84,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          <p style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'rgba(27,53,84,0.55)',
            margin: 0,
          }}>
            Votre secteur n&apos;est peut-être pas encore dans la liste.
          </p>
          <a href="/contact" className="btn-primary">
            Discuter de votre projet →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
