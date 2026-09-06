import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const CHIFFRES = [
  { price: '180 000 – 280 000', unit: 'MAD HT', tag: 'Mandat Pilotage · PME 50-200 pers.' },
  { price: '320 000 – 550 000', unit: 'MAD HT', tag: 'Mandat Stratégique · ETI 200-800 pers.' },
]

/* Teaser condensé — le contenu complet (timeline 3 phases, paliers détaillés,
   comparatif CDI) vit sur /direction-supply-chain-temps-partage. Évite la
   duplication perçue entre cette page et le pilier dédié. */
export default function DSCTeaser() {
  return (
    <section id="dsc" style={{ background: 'var(--paper)', padding: 'var(--sp-y) var(--sp-x)' }}>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(47,111,181,0.55)',
            marginBottom: '1.5rem',
          }}
        >
          08 / Direction SC à Temps Partagé
        </motion.div>

        <div className="dsc-teaser-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'end' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(2.2rem, 4vw, 4.5rem)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-0.025em',
                color: 'var(--ink)',
                margin: '0 0 1.25rem',
              }}
            >
              Un mandat.
              <br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>
                Pas un recrutement.
              </span>
            </h2>
            <p style={{ fontSize: '0.98rem', color: 'var(--mid)', lineHeight: 1.8, fontWeight: 300, maxWidth: 480, marginBottom: '1.75rem' }}>
              Direction opérationnelle de votre supply chain en 3 phases — de l&apos;audit à la passation — sans les délais ni le coût fixe d&apos;un recrutement CDI.
            </p>
            <Link
              to="/direction-supply-chain-temps-partage"
              className="btn-primary"
              style={{ whiteSpace: 'normal', textAlign: 'center' }}
            >
              Découvrir la Direction Supply Chain à Temps Partagé →
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}
          >
            {CHIFFRES.map((c) => (
              <div key={c.tag} style={{ borderLeft: '2px solid var(--blue-bright)', paddingLeft: '1.25rem' }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.2rem, 2vw, 1.7rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)', lineHeight: 1 }}>
                  {c.price} <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', fontWeight: 400, letterSpacing: '0.08em', color: 'var(--mid)' }}>{c.unit}</span>
                </div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mid)', marginTop: '0.4rem' }}>
                  {c.tag}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
