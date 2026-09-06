import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import SchemaScript from './SchemaHelper'
import { VILLES, buildVilleSchema, type VilleFormation } from '../data/villesFormation'

const ease = [0.16, 1, 0.3, 1] as const

const WA = `https://wa.me/212663449200?text=${encodeURIComponent(
  'Bonjour Nextinotech, je souhaite des informations sur vos formations logistique. Pouvez-vous me recontacter ?',
)}`
const EMAIL = 'mailto:contact@nextinotech.com?subject=Formation%20Logistique%20-%20demande%20d%27information'

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

const h2Style: React.CSSProperties = {
  fontFamily: 'Manrope, sans-serif',
  fontSize: 'clamp(2rem, 4vw, 3.4rem)',
  fontWeight: 800,
  lineHeight: 0.95,
  letterSpacing: '-0.025em',
  color: 'var(--navy)',
  margin: '0 0 2rem',
}

const eyebrow: React.CSSProperties = {
  fontFamily: 'DM Mono, monospace',
  fontSize: '0.6rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--blue-bright)',
  marginBottom: '1rem',
}

export default function FormationVille({ ville }: { ville: VilleFormation }) {
  const autresVilles = VILLES.filter((v) => v.slug !== ville.slug)
  const schema = buildVilleSchema(ville)

  return (
    <>
      <SchemaScript schema={schema} />

      {/* ── CONTEXTE LOCAL ─────────────────────────────────── */}
      <section style={{ background: 'var(--paper)', padding: 'var(--sp-y) var(--sp-x)' }}>
        <div className="section-inner" style={{ maxWidth: 820 }}>
          <FadeUp>
            <div style={eyebrow}>Contexte · {ville.region}</div>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', lineHeight: 1.8, color: 'var(--ink)', fontWeight: 300, margin: 0 }}>
              {ville.intro}
            </p>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {ville.secteurs.map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.62rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--navy)',
                    border: '1px solid var(--border)',
                    padding: '0.4rem 0.8rem',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PROGRAMMES RECOMMANDÉS ─────────────────────────── */}
      <section style={{ background: '#ffffff', padding: 'var(--sp-y) var(--sp-x)', borderTop: '1px solid var(--border)' }}>
        <div className="section-inner">
          <FadeUp>
            <div style={eyebrow}>Programmes</div>
            <h2 style={h2Style}>Formations recommandées à {ville.nom}.</h2>
          </FadeUp>

          <div style={{ display: 'grid', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', marginTop: '1rem' }}>
            {ville.programmes.map((p, i) => (
              <FadeUp key={p.titre} delay={i * 0.05}>
                <div style={{ background: '#ffffff', padding: '2rem clamp(1.5rem, 3vw, 2.5rem)' }}>
                  <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)', margin: '0 0 0.5rem' }}>
                    {p.titre}
                  </h3>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--mid)', margin: 0, fontWeight: 300 }}>
                    {p.pourquoi}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.1}>
            <p style={{ marginTop: '2rem', fontFamily: 'Jost, sans-serif', fontSize: '1rem', lineHeight: 1.8, color: 'var(--mid)', fontWeight: 300 }}>
              Voir le{' '}
              <Link to="/formation" style={{ color: 'var(--blue-bright)', textDecoration: 'none' }}>catalogue complet des 27 programmes</Link>{' '}
              ou le programme phare{' '}
              <Link to="/formation-rl" style={{ color: 'var(--blue-bright)', textDecoration: 'none' }}>Devenir Responsable Logistique</Link>.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── FORMATS & FINANCEMENT ──────────────────────────── */}
      <section style={{ background: 'var(--cream, #f3f0e9)', padding: 'var(--sp-y) var(--sp-x)' }}>
        <div className="section-inner" style={{ maxWidth: 820 }}>
          <FadeUp>
            <div style={eyebrow}>Modalités</div>
            <h2 style={h2Style}>Présentiel, intra-entreprise & financement.</h2>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--ink)', fontWeight: 300, margin: '0 0 1.5rem' }}>
              {ville.formats}
            </p>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--ink)', fontWeight: 300, margin: 0 }}>
              <strong style={{ fontWeight: 600 }}>Financement.</strong> Une convention de formation est remise à l&apos;inscription
              pour toute prise en charge par votre entreprise, un Contrat Spécial de Formation (CSF) OFPPT ou un dossier GIAC.
              Nous accompagnons les DRH dans le montage du dossier.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: 'var(--sp-y) var(--sp-x)', borderTop: '1px solid var(--border)' }}>
        <div className="section-inner" style={{ maxWidth: 820 }}>
          <FadeUp>
            <div style={eyebrow}>Questions fréquentes</div>
            <h2 style={h2Style}>Formation logistique à {ville.nom} — FAQ.</h2>
          </FadeUp>
          {ville.faq.map((f, i) => (
            <FadeUp key={f.q} delay={i * 0.05}>
              <div style={{ borderTop: '1px solid var(--border)', padding: '1.75rem 0' }}>
                <h3 style={{ fontFamily: 'Jost, sans-serif', fontSize: '1.05rem', fontWeight: 600, color: 'var(--navy)', margin: '0 0 0.6rem' }}>
                  {f.q}
                </h3>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.98rem', lineHeight: 1.75, color: 'var(--mid)', margin: 0, fontWeight: 300 }}>
                  {f.a}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section style={{ background: 'var(--navy)', padding: 'var(--sp-y) var(--sp-x)' }}>
        <div className="section-inner" style={{ maxWidth: 820 }}>
          <FadeUp>
            <h2 style={{ ...h2Style, color: '#ffffff', margin: '0 0 1.25rem' }}>
              Organiser une formation à {ville.nom}.
            </h2>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '1.05rem', lineHeight: 1.8, color: 'rgba(235,232,225,0.6)', fontWeight: 300, margin: '0 0 2rem' }}>
              Session inter-entreprise à Casablanca ou formation intra-entreprise dans vos locaux à {ville.nom}. Réponse sous 24h.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={WA} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>Demander via WhatsApp →</a>
              <a href={EMAIL} style={ctaGhost}>Par email</a>
            </div>
            <p style={{ marginTop: '2.5rem', fontFamily: 'Jost, sans-serif', fontSize: '0.95rem', lineHeight: 1.9, color: 'rgba(235,232,225,0.55)', fontWeight: 300 }}>
              À lire :{' '}
              <Link to={`/blog/${ville.blog.post}`} style={{ color: 'var(--blue-bright-on-dark, #8fbce8)' }}>{ville.blog.label}</Link>.
              {' '}Autres villes :{' '}
              {autresVilles.map((v, i) => (
                <span key={v.slug}>
                  <Link to={`/formation-logistique-${v.slug}`} style={{ color: 'var(--blue-bright-on-dark, #8fbce8)' }}>{v.nom}</Link>
                  {i < autresVilles.length - 1 ? ', ' : '.'}
                </span>
              ))}
            </p>
          </FadeUp>
        </div>
      </section>
    </>
  )
}

const ctaPrimary: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '1rem 2.25rem',
  background: 'var(--blue-bright)',
  color: '#ffffff',
  fontFamily: 'Jost, sans-serif',
  fontSize: '0.9rem',
  fontWeight: 600,
  letterSpacing: '0.04em',
  textDecoration: 'none',
}

const ctaGhost: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '1rem 2.25rem',
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.25)',
  color: '#ffffff',
  fontFamily: 'Jost, sans-serif',
  fontSize: '0.9rem',
  fontWeight: 600,
  letterSpacing: '0.04em',
  textDecoration: 'none',
}
