import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import SchemaScript from './SchemaHelper'
import { type Programme, buildProgrammeSchema, programmeFaq, programmeIntro } from '../data/formations'

const ease = [0.16, 1, 0.3, 1] as const

const WA = `https://wa.me/212663449200?text=${encodeURIComponent(
  'Bonjour Nextinotech, je souhaite des informations sur une formation. Pouvez-vous me recontacter ?',
)}`
const EMAIL = 'mailto:contact@nextinotech.com?subject=Formation%20-%20demande%20d%27information'

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay }}>
      {children}
    </motion.div>
  )
}

const h2: React.CSSProperties = {
  fontFamily: 'Manrope, sans-serif',
  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
  fontWeight: 800,
  lineHeight: 0.98,
  letterSpacing: '-0.025em',
  color: 'var(--navy)',
  margin: '0 0 1.75rem',
}
const eyebrow: React.CSSProperties = {
  fontFamily: 'DM Mono, monospace',
  fontSize: '0.6rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--blue-bright)',
  marginBottom: '1rem',
}

function formatLabel(f: string): string {
  if (f === 'inter') return 'inter-entreprise'
  if (f === 'intra') return 'intra-entreprise'
  if (f === 'coaching') return 'accompagnement individuel'
  return f
}

export default function FormationProgramme({ p }: { p: Programme }) {
  const schema = buildProgrammeSchema(p)
  const faq = programmeFaq(p)

  return (
    <>
      <SchemaScript schema={schema} />

      {/* ── INTRO / MODALITÉS ─────────────────────────────── */}
      <section style={{ background: 'var(--paper)', padding: 'var(--sp-y) var(--sp-x)' }}>
        <div className="section-inner" style={{ maxWidth: 820 }}>
          <FadeUp>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', lineHeight: 1.8, color: 'var(--ink)', fontWeight: 300, margin: 0 }}>
              {programmeIntro(p)}
            </p>
          </FadeUp>

          <FadeUp delay={0.06}>
            <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
              {[
                { label: 'Durée', val: p.duration },
                { label: 'Format', val: formatLabel(p.format) },
                { label: 'Groupe', val: p.group },
                { label: 'Prix', val: `${p.price} · ${p.unit}` },
              ].map((m) => (
                <div key={m.label} style={{ background: '#fff', padding: '1.1rem 1.3rem' }}>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '0.35rem' }}>{m.label}</div>
                  <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', fontWeight: 500, color: 'var(--navy)' }}>{m.val}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── POUR QUI ──────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: 'var(--sp-y) var(--sp-x)', borderTop: '1px solid var(--border)' }}>
        <div className="section-inner" style={{ maxWidth: 820 }}>
          <FadeUp>
            <div style={eyebrow}>Public</div>
            <h2 style={h2}>À qui s&apos;adresse cette formation.</h2>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontFamily: 'Jost, sans-serif', fontSize: '1rem', lineHeight: 1.9, color: 'var(--ink)', fontWeight: 300 }}>
              {p.public.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </FadeUp>
        </div>
      </section>

      {/* ── PROGRAMME / MODULES ───────────────────────────── */}
      <section style={{ background: 'var(--cream, #f3f0e9)', padding: 'var(--sp-y) var(--sp-x)' }}>
        <div className="section-inner" style={{ maxWidth: 820 }}>
          <FadeUp>
            <div style={eyebrow}>Programme</div>
            <h2 style={h2}>Ce que couvre la formation « {p.title} ».</h2>
          </FadeUp>
          <div style={{ display: 'grid', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
            {p.modules.map((m, i) => (
              <FadeUp key={m} delay={i * 0.04}>
                <div style={{ background: '#fff', padding: '1.4rem clamp(1.25rem, 3vw, 2rem)', display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: 'var(--blue-bright)', minWidth: 24 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '1rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 300 }}>{m}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── INCLUS + FINANCEMENT ──────────────────────────── */}
      <section style={{ background: '#fff', padding: 'var(--sp-y) var(--sp-x)', borderTop: '1px solid var(--border)' }}>
        <div className="section-inner" style={{ maxWidth: 820 }}>
          <FadeUp>
            <div style={eyebrow}>Inclus</div>
            <h2 style={h2}>Ce qui est compris.</h2>
            <ul style={{ margin: '0 0 2.5rem', paddingLeft: '1.2rem', fontFamily: 'Jost, sans-serif', fontSize: '1rem', lineHeight: 1.9, color: 'var(--ink)', fontWeight: 300 }}>
              {p.inclus.map((x) => <li key={x}>{x}</li>)}
            </ul>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '1rem', lineHeight: 1.8, color: 'var(--ink)', fontWeight: 300, margin: 0 }}>
              <strong style={{ fontWeight: 600 }}>Financement.</strong> Convention de formation remise à l&apos;inscription
              pour prise en charge par votre entreprise, un Contrat Spécial de Formation (CSF) OFPPT ou un dossier GIAC.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section style={{ background: 'var(--cream, #f3f0e9)', padding: 'var(--sp-y) var(--sp-x)' }}>
        <div className="section-inner" style={{ maxWidth: 820 }}>
          <FadeUp>
            <div style={eyebrow}>Questions fréquentes</div>
            <h2 style={h2}>FAQ — {p.title}.</h2>
          </FadeUp>
          {faq.map((f, i) => (
            <FadeUp key={f.q} delay={i * 0.04}>
              <div style={{ borderTop: '1px solid var(--border)', padding: '1.6rem 0' }}>
                <h3 style={{ fontFamily: 'Jost, sans-serif', fontSize: '1.02rem', fontWeight: 600, color: 'var(--navy)', margin: '0 0 0.5rem' }}>{f.q}</h3>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.96rem', lineHeight: 1.75, color: 'var(--mid)', margin: 0, fontWeight: 300 }}>{f.a}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section style={{ background: 'var(--navy)', padding: 'var(--sp-y) var(--sp-x)' }}>
        <div className="section-inner" style={{ maxWidth: 820 }}>
          <FadeUp>
            <h2 style={{ ...h2, color: '#fff', margin: '0 0 1.25rem' }}>S&apos;inscrire ou demander un devis.</h2>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '1.05rem', lineHeight: 1.8, color: 'rgba(235,232,225,0.6)', fontWeight: 300, margin: '0 0 2rem' }}>
              Réponse sous 24h. Précisez votre besoin (inter-entreprise, intra, dates souhaitées).
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={WA} target="_blank" rel="noopener noreferrer" style={cta(true)}>Demander via WhatsApp →</a>
              <a href={EMAIL} style={cta(false)}>Par email</a>
            </div>
            <p style={{ marginTop: '2.5rem', fontFamily: 'Jost, sans-serif', fontSize: '0.95rem', color: 'rgba(235,232,225,0.55)', fontWeight: 300 }}>
              Voir le{' '}
              <Link to="/formation" style={{ color: 'var(--blue-bright-on-dark, #8fbce8)' }}>catalogue complet des 27 formations</Link>{' '}
              ou la{' '}
              <Link to="/formation-rl" style={{ color: 'var(--blue-bright-on-dark, #8fbce8)' }}>formation Responsable Logistique</Link>.
            </p>
          </FadeUp>
        </div>
      </section>
    </>
  )
}

function cta(primary: boolean): React.CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '1rem 2.25rem',
    background: primary ? 'var(--blue-bright)' : 'transparent',
    border: primary ? '1px solid var(--blue-bright)' : '1px solid rgba(255,255,255,0.25)',
    color: '#fff',
    fontFamily: 'Jost, sans-serif',
    fontSize: '0.9rem',
    fontWeight: 600,
    letterSpacing: '0.04em',
    textDecoration: 'none',
  }
}
