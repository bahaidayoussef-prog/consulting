import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import EntrepotSequence from '../components/EntrepotSequence'

const ease = [0.16, 1, 0.3, 1] as const

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease, delay }}>
      {children}
    </motion.div>
  )
}

// Article vedette tiré du blog existant (blog/01-audit-supply-chain-2026.md) — le
// chiffre et le titre sont repris verbatim, rien n'est inventé pour cette section.
const INSIGHT = {
  slug: 'audit-supply-chain-2026-les-10-erreurs-critiques-que-les-pme',
  title: 'Audit Supply Chain 2026 : Les 10 Erreurs Critiques que les PME/ME Marocaines Commettent',
  stat: '90%',
  statLabel: 'des PME/ME marocaines',
  lede: "perdent entre 15% et 40% de leur efficacité opérationnelle à cause d'erreurs structurelles non détectées. Notre analyse détaille les 10 erreurs les plus fréquentes — et comment les corriger.",
}

// Les deux familles d'offres, chacune avec sa page pilier dédiée (/conseil, /prestations).
const ACCOMPAGNEMENTS = [
  {
    num: '01',
    eyebrow: 'Vous ne savez pas encore quoi faire',
    title: 'Conseil & Expertise.',
    tagline: "Diagnostic, DDMRP, sélection et déploiement de systèmes SI & IA, direction supply chain à temps partagé. Un regard extérieur, indépendant, sans commission éditeur.",
    points: ['Diagnostic Express', 'DDMRP', 'Systèmes SI & IA (WMS/TMS/APS)', 'DSC à temps partagé'],
    href: '/conseil',
    cta: 'Découvrir le Conseil →',
  },
  {
    num: '02',
    eyebrow: 'Vous savez quoi faire, il faut l’exécuter',
    title: 'Prestations Opérationnelles.',
    tagline: "Pack Inventaire, services logistiques à valeur ajoutée, imprimantes industrielles Leibinger. Nos propres équipes, notre propre matériel, sur devis.",
    points: ['Pack Inventaire', '7 services à valeur ajoutée', 'Imprimantes Leibinger'],
    href: '/prestations',
    cta: 'Découvrir les Prestations →',
  },
]

// Même 4 logos et même patron visuel que la section "Ils nous font confiance" de References.tsx.
const PROOF_LOGOS = [
  { name: 'Diana Holding', file: '/images/logos/diana-holding.svg', height: 34 },
  { name: 'Safari Groupe', file: '/images/logos/safari-groupe.png', height: 40 },
  { name: 'Maghreb Steel', file: '/images/logos/maghreb-steel.svg', height: 26 },
  { name: 'Casanet', file: '/images/logos/casanet.png', height: 46 },
]

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />

      {/* ── Insight éditorial — avant tout argumentaire commercial ── */}
      <section style={{ background: 'var(--paper)', padding: 'var(--sp)' }}>
        <div className="section-inner">
          <FadeUp>
            <div className="section-tag">
              <span>Analyse · Supply Chain Maroc</span>
            </div>
          </FadeUp>
          <div className="home-insight-grid" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4rem', alignItems: 'start', marginTop: '2.5rem' }}>
            <FadeUp delay={0.05}>
              <div style={{ minWidth: 200 }}>
                <div className="stat-value-lg">{INSIGHT.stat}</div>
                <div className="stat-label">{INSIGHT.statLabel}</div>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div>
                <h2
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: 'clamp(1.7rem, 3vw, 2.6rem)',
                    fontWeight: 700,
                    lineHeight: 1.15,
                    letterSpacing: '-0.015em',
                    color: 'var(--navy)',
                    margin: '0 0 1.25rem',
                    maxWidth: 720,
                  }}
                >
                  {INSIGHT.title}
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--dark-muted)', lineHeight: 1.8, fontWeight: 300, maxWidth: 560, margin: '0 0 1.5rem' }}>
                  {INSIGHT.lede}
                </p>
                <Link
                  to={`/blog/${INSIGHT.slug}`}
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.75rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--blue-bright)',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(47,111,181,0.3)',
                    paddingBottom: '2px',
                  }}
                >
                  Lire l&apos;analyse →
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Séquence Entrepôt avant/après (déplacée depuis /services) ── */}
      <EntrepotSequence />

      {/* ── Nos deux façons de vous accompagner ── */}
      <section style={{ background: '#ffffff', padding: 'var(--sp)' }}>
        <div className="section-inner">
          <FadeUp>
            <div className="section-tag">
              <span>Ce que nous faisons</span>
            </div>
            <h2
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(2.5rem, 4vw, 5rem)',
                fontWeight: 400,
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                color: 'var(--navy)',
                margin: '1.5rem 0 0',
                maxWidth: 720,
              }}
            >
              Nos deux façons de vous accompagner.
            </h2>
          </FadeUp>

          <div
            className="home-accompagnements-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2px',
              background: 'var(--border)',
              marginTop: '3rem',
            }}
          >
            {ACCOMPAGNEMENTS.map((a, i) => (
              <FadeUp key={a.num} delay={i * 0.1}>
                <div style={{ background: '#ffffff', padding: 'clamp(2rem, 3vw, 3rem)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '1.25rem' }}>
                    {a.num} · {a.eyebrow}
                  </div>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.5rem, 2.4vw, 2rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--navy)', marginBottom: '1rem', lineHeight: 1.1 }}>
                    {a.title}
                  </div>
                  <div style={{ fontSize: '0.92rem', color: 'var(--mid)', lineHeight: 1.7, fontWeight: 300, marginBottom: '1.75rem' }}>
                    {a.tagline}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {a.points.map((p) => (
                      <li key={p} style={{ fontSize: '0.82rem', color: 'var(--navy)', display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
                        <span style={{ color: 'var(--blue-bright)', flexShrink: 0 }}>→</span> {p}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={a.href}
                    style={{
                      marginTop: 'auto',
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      color: 'var(--navy)',
                      borderBottom: '1px solid rgba(27,53,84,0.2)',
                      paddingBottom: '2px',
                      alignSelf: 'flex-start',
                      transition: 'color 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--blue-bright)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--blue-bright)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--navy)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(27,53,84,0.2)' }}
                  >
                    {a.cta}
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Résumé de preuve sociale ── */}
      <section style={{ background: 'var(--ink)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
        <div className="section-inner">
          <FadeUp>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '2.5rem' }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,243,238,0.5)' }}>
                Ils nous font confiance
              </div>
              <div style={{ display: 'flex', gap: '3rem' }}>
                <div>
                  <div className="stat-value" style={{ color: '#ffffff' }}>110+</div>
                  <div className="stat-label" style={{ color: 'rgba(245,243,238,0.5)' }}>Missions réalisées</div>
                </div>
                <div>
                  <div className="stat-value" style={{ color: '#ffffff' }}>0</div>
                  <div className="stat-label" style={{ color: 'rgba(245,243,238,0.5)' }}>Commission éditeurs</div>
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div
              className="logo-wall-grid"
              style={{ display: 'grid', gridTemplateColumns: `repeat(${PROOF_LOGOS.length}, 1fr)`, gap: '2px', background: 'var(--dark-border)' }}
            >
              {PROOF_LOGOS.map((logo) => (
                <div
                  key={logo.name}
                  className="logo-wall-tile"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 120, background: 'var(--dark)', padding: '1.5rem' }}
                >
                  <img src={logo.file} alt={logo.name} style={{ height: logo.height, width: 'auto', maxWidth: '100%', objectFit: 'contain' }} />
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div style={{ marginTop: '2rem' }}>
              <Link
                to="/references"
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--blue-bright-on-dark)',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(90,154,214,0.35)',
                  paddingBottom: '2px',
                }}
              >
                Voir toutes nos références →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Aperçu Formation ── */}
      <section style={{ background: 'var(--paper)', padding: 'var(--sp)' }}>
        <div className="section-inner">
          <div className="home-formation-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'center' }}>
            <FadeUp>
              <div>
                <div className="section-tag">
                  <span>Formation</span>
                </div>
                <h2
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: 'clamp(2rem, 3.4vw, 3.4rem)',
                    fontWeight: 700,
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                    color: 'var(--navy)',
                    margin: '1.5rem 0 1rem',
                  }}
                >
                  Devenir Responsable Logistique.
                </h2>
                <p style={{ fontSize: '0.92rem', color: 'var(--mid)', lineHeight: 1.75, fontWeight: 300, maxWidth: 480, margin: '0 0 1.75rem' }}>
                  Des programmes animés par des consultants de terrain, pas des formateurs académiques.
                </p>
                <Link to="/formation" className="btn-primary">
                  Découvrir nos formations →
                </Link>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div style={{ display: 'flex', gap: '2.5rem' }}>
                <div>
                  <div className="stat-value">26</div>
                  <div className="stat-label">Programmes</div>
                </div>
                <div>
                  <div className="stat-value">7</div>
                  <div className="stat-label">Domaines</div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section style={{ background: 'var(--ink)', padding: 'var(--sp-y-md) var(--sp-x)' }}>
        <div className="section-inner">
          <FadeUp>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,243,238,0.5)', marginBottom: '1.5rem' }}>
              Prochaine étape
            </div>
            <h2
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                margin: '0 0 1.5rem',
                maxWidth: 640,
              }}
            >
              Parlons de votre Supply Chain.
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(245,243,238,0.55)', lineHeight: 1.8, fontWeight: 300, maxWidth: 480, margin: '0 0 2.5rem' }}>
              Un premier échange gratuit, sans engagement, pour évaluer si nous pouvons vous aider.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">
                Réserver un échange gratuit →
              </Link>
              <Link to="/blog" className="btn-ghost-dark">
                Lire nos articles →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
