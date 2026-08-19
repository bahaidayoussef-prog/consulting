import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import SchemaScript from './SchemaHelper'
import TimelineMandats, { type Phase, type Mandat } from './TimelineMandats'

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

const PHASES: Phase[] = [
  {
    num: '01',
    name: 'État des lieux',
    duration: '4 semaines',
    items: [
      'Audit entrepôts, transport et flux physiques',
      'Cartographie équipes logistiques & gaps',
      'Feuille de route priorisée',
      'Restitution Comité de Direction',
    ],
    deliverable: 'Plan de transformation logistique validé',
  },
  {
    num: '02',
    name: 'Pilotage & Fondations',
    duration: '3 à 5 mois',
    items: [
      'Direction opérationnelle entrepôts/transport 2 j/semaine',
      'KPIs terrain en place (OTIF, taux de service, coût/expédition)',
      'Projets WMS / TMS / adressage entrepôt',
      'Montée en compétences chefs d’équipe entrepôt',
    ],
    deliverable: 'Fonction logistique pleinement opérationnelle',
  },
  {
    num: '03',
    name: 'Passation',
    duration: '4 à 6 semaines',
    items: [
      'Formation responsable logistique interne',
      'Documentation processus entrepôt & transport',
      'Tableau de bord autonome livré',
      'Session de clôture avec DG',
    ],
    deliverable: 'Équipe logistique autonome — exit propre',
  },
]

const MANDATS: Mandat[] = [
  {
    tag: 'PME · 50 à 200 personnes',
    name: 'Mandat Pilotage',
    price: '180 000 – 280 000',
    duration: '4 à 6 mois',
    rythme: '2 jours / semaine',
    includes: [
      '3 phases incluses : Diagnostic, Pilotage, Passation',
      'Reporting mensuel Comité de Direction',
      'Disponibilité 4h/semaine hors présentiel',
      'Accès outils de pilotage Essor',
    ],
    cta: 'En savoir plus',
  },
  {
    tag: 'ETI · 200 à 800 personnes',
    name: 'Mandat Stratégique',
    price: '320 000 – 550 000',
    duration: '7 à 10 mois',
    rythme: '2 à 3 jours / semaine',
    includes: [
      '3 phases + accompagnement WMS/TMS inclus',
      'Représentation CODIR / Comex possible',
      'Recrutement ou formation responsable logistique interne',
      'Disponibilité étendue hors présentiel',
    ],
    featured: true,
    cta: 'Réserver un échange',
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Directeur Logistique à Temps Partagé',
  serviceType: 'Direction logistique externalisée',
  provider: { '@type': 'ProfessionalService', name: 'Essor Consulting' },
  areaServed: { '@type': 'Country', name: 'Maroc' },
  description: "Direction opérationnelle des entrepôts, du transport et des flux physiques à temps partagé, pour PME et ETI marocaines.",
}

export default function DirecteurLogistiqueMiTemps() {
  return (
    <>
      <SchemaScript schema={schema} />

      {/* ── INTRO / RÉPONSE RAPIDE ── */}
      <div style={{ background: 'var(--paper)', padding: 'var(--sp) var(--sp-x) var(--sp-y-sm)' }}>
        <div className="section-inner">
          <FadeUp>
            <div className="section-tag"><span>Direction Logistique · Temps Partagé</span></div>
          </FadeUp>
          <div className="dsc-header-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'end', marginTop: '1.5rem' }}>
            <FadeUp delay={0.05}>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.8rem, 5.5vw, 7rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--ink)', margin: 0 }}>
                Un directeur logistique.
                <br />
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>À temps partagé.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p style={{ fontSize: '1rem', color: 'var(--mid)', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.5rem' }}>
                Un directeur logistique à temps partagé pilote vos entrepôts, votre transport et vos flux physiques — pas l&apos;ensemble de la fonction supply chain. C&apos;est un mandat opérationnel, en 3 phases, avec un livrable garanti en sortie : une organisation logistique autonome et outillée.
              </p>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue-bright)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ display: 'block', width: 24, height: 1, background: 'var(--blue-bright)' }} />
                Entrepôts · Transport · Flux physiques
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* ── CAS RÉEL ── */}
      <div style={{ background: 'var(--paper)', paddingBottom: 'var(--sp-y-sm)' }}>
        <div className="section-inner" style={{ padding: '0 var(--sp-x)' }}>
          <FadeUp>
            <div style={{ borderLeft: '3px solid var(--blue-bright)', padding: '0.5rem 0 0.5rem 1.75rem', maxWidth: 720 }}>
              <p style={{ fontSize: '1.05rem', color: 'var(--ink)', lineHeight: 1.75, fontWeight: 300, fontStyle: 'italic', margin: 0 }}>
                Conception logistique greenfield du site industriel Renault-Nissan de Tanger — logistique amont, flux d&apos;assemblage, standards SPR Groupe Renault. Sur une plateforme 3PL de 21 000 m² gérée pour L&apos;Oréal, Nestlé et Mars, la productivité a progressé de 35% pour un taux de service de 98,5%.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>

      <TimelineMandats phases={PHASES} mandats={MANDATS} />

      {/* ── EXCERPT CDI vs MANDAT ── */}
      <div style={{ background: 'var(--dark-2)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
        <div className="section-inner">
          <FadeUp>
            <div style={{ maxWidth: 720 }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(47,111,181,0.7)', marginBottom: '1.5rem' }}>
                Recruter en CDI vs mandat
              </div>
              <p style={{ fontSize: '1rem', color: 'var(--mid)', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.5rem' }}>
                Un directeur logistique en CDI coûte entre 600 000 et 900 000 MAD par an, charges sociales incluses, avec 4 à 6 mois de recrutement avant la prise de poste. Un mandat Essor démarre en 2 semaines, sans charges ni risque RH, avec un exit propre inclus dès la signature.
              </p>
              <Link
                to="/dsc-vs-recrutement-cdi"
                style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue-bright)', textDecoration: 'none', borderBottom: '1px solid rgba(47,111,181,0.3)', paddingBottom: '2px' }}
              >
                Voir le comparatif complet →
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── LIENS CONNEXES + CTA ── */}
      <div style={{ background: 'var(--paper)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
        <div className="section-inner">
          <FadeUp>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
              <Link to="/direction-supply-chain-temps-partage" style={{ fontSize: '0.88rem', color: 'var(--mid)', textDecoration: 'none', borderBottom: '1px solid rgba(27,53,84,0.15)', paddingBottom: '2px' }}>
                ← Vue d&apos;ensemble Direction Supply Chain à Temps Partagé
              </Link>
              <Link to="/directeur-achats-mi-temps" style={{ fontSize: '0.88rem', color: 'var(--mid)', textDecoration: 'none', borderBottom: '1px solid rgba(27,53,84,0.15)', paddingBottom: '2px' }}>
                Voir aussi : Directeur Achats à temps partagé →
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
              <div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.5rem, 2.8vw, 2.8rem)', fontWeight: 700, fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.15, marginBottom: '0.5rem' }}>
                  Prêt à démarrer un mandat logistique ?
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--mid)', fontWeight: 300 }}>
                  Premier échange — 30 min — sans engagement.
                </div>
              </div>
              <Link to="/contact" className="btn-primary">Réserver un échange →</Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </>
  )
}
