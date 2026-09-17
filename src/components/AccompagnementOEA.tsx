import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import SchemaScript from './SchemaHelper'

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

interface Activity {
  code: string
  title: string
  livrable: string
}

interface OeaPhase {
  num: string
  name: string
  duration: string
  activities: Activity[]
}

const PHASES: OeaPhase[] = [
  {
    num: '01',
    name: 'Diagnostic Initial & Cadrage OEA',
    duration: '3 à 5 semaines',
    activities: [
      {
        code: 'A',
        title: "Diagnostic d'éligibilité",
        livrable: "Rapport d'audit initial OEA (gap analysis) au regard du référentiel ADII.",
      },
      {
        code: 'B',
        title: 'Évaluation des acquis ISO',
        livrable: 'Analyse de l’intégration des exigences OEA (sûreté, processus) dans vos référentiels ISO 9001 / EN 9100 / ISO 14001 existants.',
      },
      {
        code: 'C',
        title: 'Solvabilité et conformité',
        livrable: 'Revue des 3 derniers exercices financiers et vérification du casier douanier et fiscal.',
      },
      {
        code: 'D',
        title: "Plan d'action",
        livrable: 'Planning détaillé de la mission OEA, incluant les actions correctives à mener en interne.',
      },
    ],
  },
  {
    num: '02',
    name: 'Mise en Conformité & Documentation',
    duration: '3 à 6 mois',
    activities: [
      {
        code: 'A',
        title: 'Documentation OEA',
        livrable: 'Création et mise à jour des procédures, manuels et modes opératoires OEA (gestion des stocks, sécurité de l’information, accès aux locaux).',
      },
      {
        code: 'B',
        title: 'Formation des équipes',
        livrable: 'Supports de formation et preuves de sensibilisation des équipes clés — logistique, achats, finance.',
      },
      {
        code: 'C',
        title: 'Préparation du dossier',
        livrable: 'Constitution et validation du dossier de candidature OEA complet, prêt à déposer auprès de l’ADII.',
      },
    ],
  },
  {
    num: '03',
    name: 'Assistance à l\'Audit ADII & Finalisation',
    duration: '2 à 4 mois',
    activities: [
      {
        code: 'A',
        title: 'Dépôt et suivi',
        livrable: 'Assistance au dépôt de la demande et suivi administratif auprès de l’ADII.',
      },
      {
        code: 'B',
        title: 'Pré-audit OEA (audit à blanc)',
        livrable: 'Rapport de pré-audit simulant l’audit réel de l’ADII, avec plan d’action d’amélioration immédiate.',
      },
      {
        code: 'C',
        title: 'Coaching audit ADII',
        livrable: 'Présence et assistance du consultant pendant l’audit sur site mené par l’ADII.',
      },
      {
        code: 'D',
        title: 'Finalisation',
        livrable: 'Assistance à la levée des réserves éventuelles et à la signature de la convention OEA.',
      },
    ],
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Accompagnement Statut OEA (Opérateur Économique Agréé)',
  serviceType: 'Conseil en conformité douanière — certification OEA',
  provider: { '@type': 'ProfessionalService', name: 'Nextinotech' },
  areaServed: { '@type': 'Country', name: 'Maroc' },
  description: "Accompagnement mandataire de résultat pour l'obtention du statut d'Opérateur Économique Agréé (OEA), catégorie Simplifications Douanières, délivré par l'Administration des Douanes et Impôts Indirects (ADII) du Maroc.",
}

function PhaseCard({ phase, index }: { phase: OeaPhase; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease, delay: index * 0.12 }}
      style={{ padding: '3rem 2.25rem', borderRight: index < 2 ? '1px solid rgba(27,53,84,0.08)' : 'none' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{
          width: 36, height: 36, border: '1px solid rgba(47,111,181,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.1em',
          color: 'var(--blue-bright)', flexShrink: 0,
        }}>
          {phase.num}
        </div>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(47,111,181,0.7)' }}>
          {phase.duration}
        </div>
      </div>

      <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.25rem, 2vw, 1.7rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--navy)', marginBottom: '1.75rem', minHeight: '3.2em' }}>
        {phase.name}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {phase.activities.map((a) => (
          <div key={a.code} style={{ paddingBottom: '1.1rem', borderBottom: '1px solid rgba(27,53,84,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: 'var(--blue-bright)', flexShrink: 0 }}>{a.code}.</span>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--ink)' }}>{a.title}</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--mid)', lineHeight: 1.6, fontWeight: 300, margin: 0, paddingLeft: '1.1rem' }}>
              {a.livrable}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function AccompagnementOEA() {
  return (
    <>
      <SchemaScript schema={schema} />

      {/* ── INTRO / RÉPONSE RAPIDE ── */}
      <div style={{ background: 'var(--paper)', padding: 'var(--sp) var(--sp-x) var(--sp-y-sm)' }}>
        <div className="section-inner">
          <FadeUp>
            <div className="section-tag"><span>Conformité Douanière · Accompagnement OEA</span></div>
          </FadeUp>
          <div className="dsc-header-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'end', marginTop: '1.5rem' }}>
            <FadeUp delay={0.05}>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.8rem, 5.5vw, 7rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--ink)', margin: 0 }}>
                Le statut OEA.
                <br />
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>Un mandat de résultat.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p style={{ fontSize: '1rem', color: 'var(--mid)', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.5rem' }}>
                Un accompagnement vers le statut d&apos;Opérateur Économique Agréé (OEA) n&apos;a de sens que s&apos;il aboutit à la notification d&apos;agrément de l&apos;Administration des Douanes et Impôts Indirects (ADII). C&apos;est l&apos;objectif principal et non négociable de la mission — pas une simple prestation de conseil documentaire.
              </p>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue-bright)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ display: 'block', width: 24, height: 1, background: 'var(--blue-bright)' }} />
                Diagnostic · Mise en conformité · Audit ADII
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* ── OBJECTIF DE RÉSULTAT / KPI ── */}
      <div style={{ background: 'var(--paper)', paddingBottom: 'var(--sp-y-sm)' }}>
        <div className="section-inner" style={{ padding: '0 var(--sp-x)' }}>
          <FadeUp>
            <div style={{ borderLeft: '3px solid var(--blue-bright)', padding: '0.5rem 0 0.5rem 1.75rem', maxWidth: 720 }}>
              <p style={{ fontSize: '1.05rem', color: 'var(--ink)', lineHeight: 1.75, fontWeight: 300, fontStyle: 'italic', margin: 0 }}>
                KPI principal : notification formelle du statut OEA — catégorie Simplifications Douanières A ou B — reçue de l&apos;ADII. Objectif secondaire : réduction mesurable des délais de dédouanement, quantifiée à l&apos;issue du diagnostic initial.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── 3 PHASES / LIVRABLES ── */}
      <div style={{ background: 'var(--paper)' }}>
        <div className="section-inner" style={{ padding: '0 var(--sp-x)' }}>
          <FadeUp>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(47,111,181,0.55)', marginBottom: '1rem' }}>
              Détail de la mission
            </div>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '2.5rem' }}>
              3 phases, chacune avec ses livrables.
            </h3>
          </FadeUp>
          <div className="dsc-phases-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {PHASES.map((p, i) => (
              <PhaseCard key={p.num} phase={p} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── OFFRE ── */}
      <div style={{ background: 'var(--paper)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
        <div className="section-inner">
          <FadeUp>
            <div
              style={{
                maxWidth: 480,
                background: '#fff',
                border: '1px solid rgba(27,53,84,0.1)',
                padding: '2.5rem',
                position: 'relative',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(95,102,114,0.6)', marginBottom: '0.6rem' }}>
                Toutes catégories A / B · Tous secteurs éligibles
              </div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '1.5rem' }}>
                Accompagnement Statut OEA
              </div>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', margin: '0 0 1.75rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(27,53,84,0.08)' }}>
                <div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(95,102,114,0.45)', marginBottom: '0.35rem' }}>Prix</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)' }}>Sur devis</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(95,102,114,0.45)', marginBottom: '0.35rem' }}>Durée</div>
                  <div style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--ink)' }}>8 à 15 mois selon écarts constatés</div>
                </div>
              </div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(95,102,114,0.5)', marginBottom: '0.75rem' }}>
                Inclus
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                {[
                  'Diagnostic d’éligibilité et gap analysis référentiel ADII',
                  'Mise en conformité documentaire et sensibilisation des équipes',
                  'Constitution du dossier de candidature complet',
                  'Pré-audit à blanc et coaching pendant l’audit ADII',
                  'Assistance jusqu’à la signature de la convention OEA',
                ].map((item) => (
                  <li key={item} style={{ fontSize: '0.85rem', padding: '0.5rem 0', borderBottom: '1px solid rgba(27,53,84,0.06)', display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'var(--mid)', lineHeight: 1.5, fontWeight: 300 }}>
                    <span style={{ color: 'var(--blue-bright)', flexShrink: 0 }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center' }}
              >
                Discuter de votre projet OEA →
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── POURQUOI NEXTINOTECH ── */}
      <div style={{ background: 'var(--dark-2)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
        <div className="section-inner">
          <FadeUp>
            <div style={{ maxWidth: 720 }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(47,111,181,0.7)', marginBottom: '1.5rem' }}>
                Pourquoi Nextinotech
              </div>
              <p style={{ fontSize: '1rem', color: 'var(--mid)', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.5rem' }}>
                Le référentiel OEA de l&apos;ADII évalue autant vos flux physiques et votre gestion des stocks que vos procédures documentaires. C&apos;est un terrain que nous connaissons déjà par notre accompagnement sur les régimes douaniers suspensifs — Admission Temporaire, Entrepôt Industriel Franc — où l&apos;écart entre stock théorique et stock réel est justement notre angle d&apos;expertise.
              </p>
              <Link
                to="/conseil"
                style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue-bright)', textDecoration: 'none', borderBottom: '1px solid rgba(47,111,181,0.3)', paddingBottom: '2px' }}
              >
                Voir l&apos;accompagnement régimes douaniers suspensifs →
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
              <Link to="/conseil" style={{ fontSize: '0.88rem', color: 'var(--mid)', textDecoration: 'none', borderBottom: '1px solid rgba(27,53,84,0.15)', paddingBottom: '2px' }}>
                ← Voir toutes nos offres Conseil & AMOA
              </Link>
              <Link to="/formation-import" style={{ fontSize: '0.88rem', color: 'var(--mid)', textDecoration: 'none', borderBottom: '1px solid rgba(27,53,84,0.15)', paddingBottom: '2px' }}>
                Voir aussi : Formation Réussir sa Première Importation →
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
              <div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.5rem, 2.8vw, 2.8rem)', fontWeight: 700, fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.15, marginBottom: '0.5rem' }}>
                  Prêt à cadrer votre dossier OEA ?
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
