import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Formation from '../components/Formation'

export default function FormationPage() {
  return (
    <>
      <PageHero
        num="03"
        title="Nos"
        titleItalic="Formations."
        subtitle="Montée en compétences opérationnelle. Formateurs praticiens, pas théoriciens."
        tag="ACADÉMIE · TERRAIN"
      />
      <Formation />

      {/* CTA vers landing page standalone */}
      <div style={{ background: 'var(--ink)', padding: '5rem 4rem' }}>
        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}
          >
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>
              PROGRAMME PHARE
            </div>
            <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.02em', color: 'var(--dark-text)', margin: 0 }}>
              Devenir Responsable<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>Logistique.</span>
            </h2>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '1rem', color: 'rgba(235,232,225,0.55)', lineHeight: 1.7, fontWeight: 300, maxWidth: 520, margin: 0 }}>
              1 journée intensive · Hôtel 5★ Casablanca · 1 500 MAD<br />
              Certification + réseau + outils terrain.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <a href="/formation-rl/" className="btn-primary" target="_blank" rel="noopener noreferrer">
                Voir le programme complet →
              </a>
              <Link to="/contact" style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(235,232,225,0.4)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2px', alignSelf: 'center' }}>
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
