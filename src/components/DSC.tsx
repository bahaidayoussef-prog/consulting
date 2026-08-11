import { motion } from 'framer-motion'

const PHASES = [
  {
    num: '01',
    name: 'État des lieux',
    duration: '4 semaines',
    items: [
      'Audit supply chain complet',
      'Cartographie équipes & gaps',
      'Feuille de route priorisée',
      'Restitution Comité de Direction',
    ],
    deliverable: 'Plan de transformation validé',
  },
  {
    num: '02',
    name: 'Pilotage & Fondations',
    duration: '3 à 5 mois',
    items: [
      'Direction opérationnelle 2 j/semaine',
      'KPIs & rituels CODIR en place',
      'Projets stocks / achats / SI',
      'Montée en compétences équipes',
    ],
    deliverable: 'Fonction SC pleinement opérationnelle',
  },
  {
    num: '03',
    name: 'Passation',
    duration: '4 à 6 semaines',
    items: [
      'Formation responsable SC interne',
      'Documentation processus clés',
      'Tableau de bord autonome livré',
      'Session de clôture avec DG',
    ],
    deliverable: 'Équipe autonome — exit propre',
  },
]

const MANDATS = [
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
    featured: false,
    cta: 'En savoir plus',
  },
  {
    tag: 'ETI · 200 à 800 personnes',
    name: 'Mandat Stratégique',
    price: '320 000 – 550 000',
    duration: '7 à 10 mois',
    rythme: '2 à 3 jours / semaine',
    includes: [
      '3 phases + accompagnement SI inclus',
      'Représentation CODIR / Comex possible',
      'Recrutement ou formation DSC interne',
      'Disponibilité étendue hors présentiel',
    ],
    featured: true,
    cta: 'Réserver un échange',
  },
]

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

export default function DSC() {
  return (
    <section id="dsc">

      {/* ── HEADER ── */}
      <div style={{ background: 'var(--paper)', padding: 'var(--sp-y) var(--sp-x) var(--sp-y-sm)' }}>
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

          <div className="dsc-header-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'end',
          }}>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(2.8rem, 5.5vw, 7rem)',
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: '-0.025em',
                color: 'var(--ink)',
                margin: 0,
              }}
            >
              Un mandat.
              <br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>
                Une transformation.
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <p style={{
                fontSize: '1rem',
                color: 'var(--mid)',
                lineHeight: 1.8,
                fontWeight: 300,
                marginBottom: '1.5rem',
              }}>
                Pas de régie ouverte. Pas d&apos;abonnement mensuel sans fin.
                Un engagement délimité, en 3 phases, avec un livrable garanti en sortie :
                votre équipe autonome.
              </p>
              <div style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.62rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--blue-bright)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
              }}>
                <span style={{ display: 'block', width: 24, height: 1, background: 'var(--blue-bright)' }} />
                Disponible PME et ETI · Maroc et Europe
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── TIMELINE — 3 phases ── */}
      <div style={{ background: 'var(--paper)' }}>
        <div className="section-inner" style={{ padding: '0 var(--sp-x)' }}>
          <div className="dsc-phases-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
          }}>
            {PHASES.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
                style={{
                  padding: '4rem 2.5rem',
                  borderRight: i < 2 ? '1px solid rgba(27,53,84,0.08)' : 'none',
                }}
              >
                {/* Number + duration */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.75rem',
                }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    border: '1px solid rgba(47,111,181,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    color: 'var(--blue-bright)',
                    flexShrink: 0,
                  }}>
                    {p.num}
                  </div>
                  <div style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.58rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(47,111,181,0.7)',
                  }}>
                    {p.duration}
                  </div>
                </div>

                {/* Phase name */}
                <div style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: 'clamp(1.4rem, 2.2vw, 2.2rem)',
                  fontWeight: 800,
                  lineHeight: 1.0,
                  letterSpacing: '-0.02em',
                  color: 'var(--navy)',
                  marginBottom: '1.5rem',
                }}>
                  {p.name}
                </div>

                {/* Items */}
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                  {p.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--mid)',
                        padding: '0.35rem 0',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.6rem',
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ color: 'var(--blue-bright)', flexShrink: 0 }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Deliverable */}
                <div style={{
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(27,53,84,0.1)',
                }}>
                  <span style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.58rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(47,111,181,0.7)',
                  }}>
                    Livrable ·&nbsp;
                  </span>
                  <span style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: '0.85rem',
                    color: 'var(--blue-bright)',
                  }}>
                    {p.deliverable}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MANDATS — 2 cards ── */}
      <div style={{ background: 'var(--paper)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
        <div className="section-inner">
          <div className="dsc-mandats-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2rem',
            maxWidth: 960,
            marginBottom: '1.5rem',
          }}>
            {MANDATS.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                style={{
                  background: m.featured ? 'var(--ink)' : '#fff',
                  border: `1px solid ${m.featured ? 'rgba(192,154,47,0.3)' : 'rgba(27,53,84,0.1)'}`,
                  padding: '3rem',
                  position: 'relative',
                  boxShadow: m.featured
                    ? '0 24px 60px rgba(10,20,32,0.2)'
                    : '0 4px 20px rgba(0,0,0,0.05)',
                }}
              >
                {m.featured && (
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: 3,
                    background: 'var(--gold)',
                  }} />
                )}

                {/* Tag */}
                <div style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.58rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: m.featured ? 'rgba(192,154,47,0.65)' : 'rgba(95,102,114,0.6)',
                  marginBottom: '0.6rem',
                }}>
                  {m.tag}
                </div>

                {/* Name */}
                <div style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: m.featured ? '#ffffff' : 'var(--ink)',
                  marginBottom: '1.75rem',
                }}>
                  {m.name}
                </div>

                {/* Price */}
                <div style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: 'clamp(1.3rem, 2.2vw, 2rem)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: '-0.025em',
                  color: m.featured ? 'var(--gold)' : 'var(--ink)',
                  marginBottom: '0.25rem',
                }}>
                  {m.price}
                </div>
                <div style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.58rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: m.featured ? 'rgba(227,226,226,0.3)' : 'rgba(95,102,114,0.45)',
                  marginBottom: '0',
                }}>
                  MAD HT
                </div>

                {/* Duration + rythme */}
                <div style={{
                  display: 'flex',
                  gap: '2rem',
                  margin: '1.75rem 0',
                  paddingBottom: '1.75rem',
                  borderBottom: `1px solid ${m.featured ? 'rgba(255,255,255,0.07)' : 'rgba(27,53,84,0.08)'}`,
                }}>
                  {[
                    { label: 'Durée', val: m.duration },
                    { label: 'Rythme', val: m.rythme },
                  ].map((spec) => (
                    <div key={spec.label}>
                      <div style={{
                        fontFamily: 'DM Mono, monospace',
                        fontSize: '0.52rem',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: m.featured ? 'rgba(227,226,226,0.28)' : 'rgba(95,102,114,0.45)',
                        marginBottom: '0.25rem',
                      }}>
                        {spec.label}
                      </div>
                      <div style={{
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        color: m.featured ? 'rgba(235,232,225,0.8)' : 'var(--ink)',
                      }}>
                        {spec.val}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Includes */}
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem' }}>
                  {m.includes.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontSize: '0.87rem',
                        padding: '0.5rem 0',
                        borderBottom: `1px solid ${m.featured ? 'rgba(255,255,255,0.05)' : 'rgba(27,53,84,0.06)'}`,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.6rem',
                        color: m.featured ? 'rgba(235,232,225,0.65)' : 'var(--mid)',
                        lineHeight: 1.5,
                        fontWeight: 300,
                      }}
                    >
                      <span style={{ color: m.featured ? 'var(--gold)' : 'var(--blue-bright)', flexShrink: 0 }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="/contact"
                  className={m.featured ? 'btn-primary-gold' : undefined}
                  style={m.featured ? {} : {
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: 'var(--ink)',
                    borderBottom: '1px solid rgba(27,53,84,0.25)',
                    paddingBottom: '2px',
                    transition: 'opacity 0.2s',
                  }}
                >
                  {m.cta} →
                </a>
              </motion.div>
            ))}
          </div>

          {/* Sur mesure strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
              padding: '1.75rem 2.5rem',
              border: '1px solid var(--border)',
              maxWidth: 960,
            }}
          >
            <div>
              <div style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.55rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(47,111,181,0.7)',
                marginBottom: '0.3rem',
              }}>
                Grands groupes · +800 personnes
              </div>
              <div style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--ink)',
              }}>
                Mandat Sur Mesure
              </div>
            </div>
            <div style={{
              fontSize: '0.88rem',
              color: 'var(--mid)',
              fontWeight: 300,
              flex: '0 1 340px',
              lineHeight: 1.6,
            }}>
              Programmes multi-équipes, intégration SI, management de transition senior.
              Durée et format adaptés à votre contexte.
            </div>
            <a
              href="/contact"
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.68rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '2px',
                whiteSpace: 'nowrap',
                transition: 'opacity 0.2s',
              }}
            >
              Parlons-en →
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── COMPARATIF — vs CDI ── */}
      <div style={{ background: 'var(--dark-2)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: 960 }}
          >
            <div style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(47,111,181,0.7)',
              marginBottom: '2.5rem',
            }}>
              Recruter un DSC en CDI vs Mandat Essor
            </div>

            <div className="dsc-compare-scroll">
            {/* Table header */}
            <div className="dsc-compare-grid" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid rgba(27,53,84,0.12)',
            }}>
              <div />
              <div style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.58rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(27,53,84,0.4)',
                padding: '0 1.5rem',
              }}>
                DSC en CDI
              </div>
              <div style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.58rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--blue-bright)',
                padding: '0 1.5rem',
              }}>
                Mandat Essor
              </div>
            </div>

            {COMPARE.map((row, i) => (
              <motion.div
                key={row.critere}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="dsc-compare-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  padding: '1.25rem 0',
                  borderBottom: '1px solid rgba(27,53,84,0.08)',
                }}
              >
                <div style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(27,53,84,0.45)',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  {row.critere}
                </div>
                <div style={{
                  fontSize: '0.88rem',
                  color: 'rgba(27,53,84,0.45)',
                  fontWeight: 300,
                  lineHeight: 1.55,
                  padding: '0 1.5rem',
                  whiteSpace: 'pre-line',
                }}>
                  {row.cdi}
                </div>
                <div style={{
                  fontSize: '0.88rem',
                  color: 'var(--ink)',
                  fontWeight: 400,
                  lineHeight: 1.55,
                  padding: '0 1.5rem',
                  whiteSpace: 'pre-line',
                }}>
                  {row.essor}
                </div>
              </motion.div>
            ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ background: 'var(--paper)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '2rem',
            }}
          >
            <div>
              <div style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(1.5rem, 2.8vw, 2.8rem)',
                fontWeight: 700,
                fontStyle: 'italic',
                color: 'var(--ink)',
                lineHeight: 1.15,
                marginBottom: '0.5rem',
              }}>
                Prêt à démarrer un mandat ?
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: 'var(--mid)',
                fontWeight: 300,
              }}>
                Premier échange — 30 min — sans engagement.
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="/contact" className="btn-primary">Réserver un échange →</a>
              <a
                href="mailto:essor.consulting.maroc@gmail.com"
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--mid)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: '2px',
                  transition: 'color 0.2s',
                }}
              >
                essor.consulting.maroc@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
