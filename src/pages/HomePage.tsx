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

// Reprend le libellé et le lien de chaque service depuis Nav.tsx / Conseil.tsx / Systemes.tsx.
const OFFERS = [
  {
    num: '01',
    title: 'Diagnostic',
    tagline: "Un regard extérieur en 2 à 6 semaines : cartographie de l'existant, causes racines, leviers chiffrés.",
    href: '/services#conseil',
  },
  {
    num: '02',
    title: 'DDMRP',
    tagline: 'Buffers de découplage calculés sur la consommation réelle — on réagit à la demande, pas aux prévisions.',
    href: '/services#conseil',
  },
  {
    num: '03',
    title: 'Systèmes SI & IA',
    tagline: 'WMS · TMS · APS · Control Tower — sélection et déploiement indépendants, sans commission éditeur.',
    href: '/services#systemes',
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
                  to={`/blog?post=${INSIGHT.slug}`}
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

      {/* ── Teaser resserré des offres ── */}
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
              }}
            >
              Nos offres.
            </h2>
          </FadeUp>

          <div
            className="home-offers-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2px',
              background: 'var(--border)',
              marginTop: '3rem',
            }}
          >
            {OFFERS.map((o, i) => (
              <FadeUp key={o.num} delay={i * 0.08}>
                <Link
                  to={o.href}
                  style={{
                    display: 'block',
                    background: '#ffffff',
                    padding: '2.5rem 2rem',
                    textDecoration: 'none',
                    height: '100%',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                >
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--mid)', marginBottom: '1.5rem' }}>
                    {o.num}
                  </div>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.75rem' }}>
                    {o.title}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--mid)', lineHeight: 1.65, fontWeight: 300, marginBottom: '1.5rem', minHeight: '3.3em' }}>
                    {o.tagline}
                  </div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue-bright)' }}>
                    En savoir plus →
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3}>
            <div style={{ marginTop: '2.5rem' }}>
              <Link
                to="/services"
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--mid)',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(27,53,84,0.15)',
                  paddingBottom: '2px',
                }}
              >
                Voir tous nos services →
              </Link>
            </div>
          </FadeUp>
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
                  <div className="stat-value">22</div>
                  <div className="stat-label">Programmes</div>
                </div>
                <div>
                  <div className="stat-value">6</div>
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
