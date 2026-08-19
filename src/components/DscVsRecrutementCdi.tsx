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

const COMPARE = [
  {
    critere: 'Coût annuel',
    cdi: '600 000 – 900 000 MAD\n+ charges sociales',
    essor: 'Mandat sur durée définie\nSans charges ni risque RH',
  },
  {
    critere: 'Délai de démarrage',
    cdi: '4 à 6 mois de recrutement',
    essor: 'Opérationnel en 2 semaines',
  },
  {
    critere: 'Engagement',
    cdi: 'Contrat de travail — rupture coûteuse',
    essor: 'Mandat délimité — exit propre inclus',
  },
  {
    critere: 'Résultat en sortie',
    cdi: 'Dépendance au profil recruté',
    essor: 'Équipe interne autonome et outillée',
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'DSC en CDI ou Mandat Essor ? Le Comparatif Complet',
  description: "Coût réel, délai de démarrage, engagement et résultat en sortie : le comparatif chiffré entre recruter un Directeur Supply Chain en CDI et confier un mandat à temps partagé.",
  author: { '@type': 'Organization', name: 'Essor Consulting' },
  publisher: { '@type': 'Organization', name: 'Essor Consulting' },
}

export default function DscVsRecrutementCdi() {
  return (
    <>
      <SchemaScript schema={schema} />

      {/* ── RÉPONSE RAPIDE ── */}
      <div style={{ background: 'var(--paper)', padding: 'var(--sp) var(--sp-x) var(--sp-y-sm)' }}>
        <div className="section-inner">
          <FadeUp>
            <div className="section-tag"><span>Comparatif · CDI vs Mandat</span></div>
            <p style={{ fontSize: '1.05rem', color: 'var(--ink)', lineHeight: 1.85, fontWeight: 300, maxWidth: 760, marginTop: '2rem' }}>
              <strong style={{ fontWeight: 600 }}>Un Directeur Supply Chain en CDI coûte 600 000 à 900 000 MAD par an charges comprises, avec 4 à 6 mois entre la décision et la prise de poste.</strong> Un mandat Essor démarre en 2 semaines, sans charges sociales ni risque RH, pour 180 000 à 550 000 MAD selon la taille de l&apos;entreprise et la durée du mandat — avec un exit propre prévu dès la signature. Les deux options répondent à des besoins différents, pas à un même problème avec deux prix.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* ── LE VRAI COÛT DU CDI ── */}
      <div style={{ background: 'var(--paper)', paddingBottom: 'var(--sp-y-sm)' }}>
        <div className="section-inner" style={{ padding: '0 var(--sp-x)', maxWidth: 860 }}>
          <FadeUp>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
              Le vrai coût d&apos;un recrutement DSC en CDI
            </h3>
            <p style={{ fontSize: '0.98rem', color: 'var(--mid)', lineHeight: 1.85, fontWeight: 300, marginBottom: '1.5rem' }}>
              Le salaire brut affiché n&apos;est jamais le coût réel. Au Maroc, les charges patronales représentent environ 21% du salaire brut — CNSS, AMO, prestations familiales, taxe de formation professionnelle. Pour un Directeur Supply Chain à 600 000 – 900 000 MAD brut annuel, le coût employeur réel dépasse sensiblement ce montant affiché.
            </p>
            <p style={{ fontSize: '0.98rem', color: 'var(--mid)', lineHeight: 1.85, fontWeight: 300 }}>
              Le délai de 4 à 6 mois n&apos;est pas non plus une moyenne pessimiste : c&apos;est le temps réaliste entre la définition du besoin, la recherche d&apos;un profil senior rare sur ce marché, le processus de sélection, et le préavis du candidat retenu chez son employeur actuel.
            </p>
          </FadeUp>
        </div>
      </div>

      <div style={{ background: 'var(--dark-2)', padding: '0 var(--sp-x) var(--sp-y-sm)' }}>
        <div className="section-inner" style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', maxWidth: 860 }}>
          <div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1 }}>21%</div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mid)', marginTop: '0.4rem' }}>Charges patronales (taux nominal)</div>
          </div>
          <div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1 }}>4-6 mois</div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mid)', marginTop: '0.4rem' }}>Délai de recrutement réaliste</div>
          </div>
          <div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, color: 'var(--blue-bright)', lineHeight: 1 }}>2 sem.</div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mid)', marginTop: '0.4rem' }}>Démarrage d&apos;un mandat Essor</div>
          </div>
        </div>
      </div>

      {/* ── LE MANDAT ── */}
      <div style={{ background: 'var(--paper)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
        <div className="section-inner" style={{ maxWidth: 860 }}>
          <FadeUp>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
              Le mandat Essor : un engagement délimité
            </h3>
            <p style={{ fontSize: '0.98rem', color: 'var(--mid)', lineHeight: 1.85, fontWeight: 300, marginBottom: '1.5rem' }}>
              Un Mandat Pilotage (PME, 50 à 200 personnes) coûte 180 000 à 280 000 MAD HT sur 4 à 6 mois. Un Mandat Stratégique (ETI, 200 à 800 personnes) coûte 320 000 à 550 000 MAD HT sur 7 à 10 mois. Dans les deux cas, aucune charge sociale, aucun risque prud&apos;homal, et une passation organisée dès la troisième phase du mandat — l&apos;objectif n&apos;est jamais de rester indéfiniment, mais de rendre votre équipe autonome.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <blockquote style={{ borderLeft: '3px solid var(--blue-bright)', paddingLeft: '1.75rem', fontSize: '1.05rem', color: 'var(--ink)', lineHeight: 1.75, fontWeight: 300, fontStyle: 'italic', margin: '2rem 0 0' }}>
              Un CDI a du sens quand le besoin de direction supply chain est permanent et que le budget le permet. Un mandat a du sens quand le besoin est une transformation à mener — après quoi la fonction doit pouvoir tourner sans un directeur à temps plein.
            </blockquote>
          </FadeUp>
        </div>
      </div>

      {/* ── TABLEAU COMPARATIF COMPLET ── */}
      <div style={{ background: 'var(--dark-2)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
        <div className="section-inner">
          <FadeUp>
            <div style={{ maxWidth: 960 }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(47,111,181,0.7)', marginBottom: '2.5rem' }}>
                Le comparatif, critère par critère
              </div>

              <div className="dsc-compare-scroll">
                <div className="dsc-compare-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(27,53,84,0.12)' }}>
                  <div />
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(27,53,84,0.4)', padding: '0 1.5rem' }}>DSC en CDI</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--blue-bright)', padding: '0 1.5rem' }}>Mandat Essor</div>
                </div>

                {COMPARE.map((row, i) => (
                  <motion.div
                    key={row.critere}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    className="dsc-compare-grid"
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '1.25rem 0', borderBottom: '1px solid rgba(27,53,84,0.08)' }}
                  >
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(27,53,84,0.45)', display: 'flex', alignItems: 'center' }}>
                      {row.critere}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'rgba(27,53,84,0.45)', fontWeight: 300, lineHeight: 1.55, padding: '0 1.5rem', whiteSpace: 'pre-line' }}>
                      {row.cdi}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--ink)', fontWeight: 400, lineHeight: 1.55, padding: '0 1.5rem', whiteSpace: 'pre-line' }}>
                      {row.essor}
                    </div>
                  </motion.div>
                ))}
              </div>
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
              <Link to="/directeur-logistique-mi-temps" style={{ fontSize: '0.88rem', color: 'var(--mid)', textDecoration: 'none', borderBottom: '1px solid rgba(27,53,84,0.15)', paddingBottom: '2px' }}>
                Direction Logistique →
              </Link>
              <Link to="/directeur-achats-mi-temps" style={{ fontSize: '0.88rem', color: 'var(--mid)', textDecoration: 'none', borderBottom: '1px solid rgba(27,53,84,0.15)', paddingBottom: '2px' }}>
                Direction Achats →
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
              <div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.5rem, 2.8vw, 2.8rem)', fontWeight: 700, fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.15, marginBottom: '0.5rem' }}>
                  Un besoin précis, pas encore tranché ?
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
