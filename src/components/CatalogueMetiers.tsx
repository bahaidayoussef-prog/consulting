import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import SchemaScript from './SchemaHelper'
import { METIERS_CATALOGUE } from '../data/catalogueMetiers'

const ease = [0.16, 1, 0.3, 1] as const

function FadeUp({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease, delay }}>
      {children}
    </motion.div>
  )
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Catalogue de formation par métier — Ingénierie de Formation Nextinotech',
  itemListElement: METIERS_CATALOGUE.map((m, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: m.nom,
  })),
}

type Filtre = 'tous' | 'nextinotech' | 'partenaires'

export default function CatalogueMetiers() {
  const [filtre, setFiltre] = useState<Filtre>('tous')

  const metiers = filtre === 'tous' ? METIERS_CATALOGUE : METIERS_CATALOGUE.filter((m) => m.source === filtre)

  const tabs: { id: Filtre; label: string }[] = [
    { id: 'tous', label: `Tous les métiers (${METIERS_CATALOGUE.length})` },
    { id: 'nextinotech', label: 'Livrées par Nextinotech' },
    { id: 'partenaires', label: 'Réseau de partenaires' },
  ]

  return (
    <>
      <SchemaScript schema={schema} />

      {/* ── INTRO ── */}
      <div style={{ background: 'var(--paper)', padding: 'var(--sp) var(--sp-x) var(--sp-y-sm)' }}>
        <div className="section-inner">
          <FadeUp>
            <div className="section-tag"><span>Ingénierie de Formation · Catalogue par métier</span></div>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.4rem, 4.5vw, 5rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.025em', color: 'var(--ink)', margin: '1.5rem 0 1.5rem' }}>
              Un plan de formation
              <br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>pour tous vos métiers.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p style={{ fontSize: '1rem', color: 'var(--mid)', lineHeight: 1.8, fontWeight: 300, maxWidth: 760 }}>
              Notre diagnostic ne se limite pas à la Supply Chain. Il couvre l&apos;ensemble des métiers de votre entreprise. Les thèmes ci-dessous sont soit <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>livrés directement par Nextinotech</strong> — notre spécialité terrain — soit <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>sourcés auprès de notre réseau de partenaires formateurs</strong>, sans commission éditeur : nous vous orientons vers le meilleur organisme pour chaque besoin, pas vers celui qui nous rémunère.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* ── FILTRES ── */}
      <div style={{ background: 'var(--paper)', paddingBottom: 'var(--sp-y-sm)' }}>
        <div className="section-inner" style={{ padding: '0 var(--sp-x)' }}>
          <FadeUp>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setFiltre(t.id)}
                  style={{
                    padding: '0.6rem 1.25rem',
                    border: `1px solid ${filtre === t.id ? 'var(--blue-bright)' : 'var(--border)'}`,
                    background: filtre === t.id ? 'var(--blue-bright)' : 'transparent',
                    color: filtre === t.id ? '#fff' : 'var(--mid)',
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── GRILLE DES MÉTIERS ── */}
      <div style={{ background: 'var(--paper)', paddingBottom: 'var(--sp-y-sm)' }}>
        <div className="section-inner" style={{ padding: '0 var(--sp-x)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1px', background: 'rgba(27,53,84,0.08)' }}>
            {metiers.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease, delay: (i % 6) * 0.06 }}
                style={{ background: '#fff', padding: '2rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '1.7rem' }}>{m.icon}</div>
                  <div
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.55rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '0.3rem 0.6rem',
                      border: `1px solid ${m.source === 'nextinotech' ? 'rgba(47,111,181,0.4)' : 'rgba(95,102,114,0.3)'}`,
                      color: m.source === 'nextinotech' ? 'var(--blue-bright)' : 'var(--mid)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {m.source === 'nextinotech' ? 'Nextinotech' : 'Partenaires'}
                  </div>
                </div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.1rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.6rem' }}>
                  {m.nom}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--mid)', lineHeight: 1.6, fontWeight: 300, marginBottom: '1.25rem' }}>
                  {m.description}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {m.themes.map((t) => {
                    const content = (
                      <>
                        <span style={{ color: 'var(--blue-bright)', flexShrink: 0 }}>→</span>
                        <span style={{ flex: 1 }}>{t.titre}</span>
                        {t.tendance && (
                          <span
                            style={{
                              fontFamily: 'DM Mono, monospace',
                              fontSize: '0.5rem',
                              letterSpacing: '0.06em',
                              textTransform: 'uppercase',
                              padding: '0.15rem 0.4rem',
                              background: 'rgba(192,154,47,0.15)',
                              color: '#a97f1f',
                              flexShrink: 0,
                            }}
                          >
                            IA · Tendance
                          </span>
                        )}
                      </>
                    )
                    const itemStyle = {
                      fontSize: '0.82rem',
                      padding: '0.6rem 0',
                      borderBottom: '1px solid rgba(27,53,84,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      color: 'var(--mid)',
                      lineHeight: 1.5,
                      fontWeight: 300,
                    }
                    return t.programId ? (
                      <li key={t.titre}>
                        <Link to={`/formation/${t.programId}`} style={{ ...itemStyle, textDecoration: 'none' }}>
                          {content}
                        </Link>
                      </li>
                    ) : (
                      <li key={t.titre} style={itemStyle}>
                        {content}
                      </li>
                    )
                  })}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA FINAL ── */}
      <div style={{ background: 'var(--dark-2)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
        <div className="section-inner">
          <FadeUp>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
              <div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.5rem, 2.8vw, 2.8rem)', fontWeight: 700, fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.15, marginBottom: '0.5rem' }}>
                  Votre besoin ne figure pas dans la liste ?
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--mid)', fontWeight: 300 }}>
                  Le diagnostic identifie vos priorités réelles, au-delà de tout catalogue.
                </div>
              </div>
              <Link to="/ingenierie-formation#diagnostic" className="btn-primary">Demander mon diagnostic →</Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </>
  )
}
