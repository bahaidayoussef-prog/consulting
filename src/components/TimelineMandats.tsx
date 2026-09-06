import { motion } from 'framer-motion'

export interface Phase {
  num: string
  name: string
  duration: string
  items: string[]
  deliverable: string
}

export interface Mandat {
  tag: string
  name: string
  price: string
  duration: string
  rythme: string
  includes: string[]
  featured?: boolean
  cta: string
}

/* Patron visuel repris de DSC.tsx (timeline 3 phases + cartes mandat) — accent bleu
   plutôt qu'or, conformément aux principes posés au lot 0 de l'audit design. Réutilisé
   par les pages Direction Logistique et Direction Achats à temps partagé : même offre,
   mêmes tarifs réels, contenu reformulé par métier. */
export default function TimelineMandats({ phases, mandats }: { phases: Phase[]; mandats: Mandat[] }) {
  return (
    <>
      {/* ── TIMELINE ── */}
      <div style={{ background: 'var(--paper)' }}>
        <div className="section-inner" style={{ padding: '0 var(--sp-x)' }}>
          <div className="dsc-phases-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {phases.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
                style={{ padding: '4rem 2.5rem', borderRight: i < 2 ? '1px solid rgba(27,53,84,0.08)' : 'none' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
                  <div style={{
                    width: 36, height: 36, border: '1px solid rgba(47,111,181,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.1em',
                    color: 'var(--blue-bright)', flexShrink: 0,
                  }}>
                    {p.num}
                  </div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(47,111,181,0.7)' }}>
                    {p.duration}
                  </div>
                </div>

                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.4rem, 2.2vw, 2.2rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.02em', color: 'var(--navy)', marginBottom: '1.5rem' }}>
                  {p.name}
                </div>

                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                  {p.items.map((item) => (
                    <li key={item} style={{ fontSize: '0.85rem', color: 'var(--mid)', padding: '0.35rem 0', display: 'flex', alignItems: 'flex-start', gap: '0.6rem', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--blue-bright)', flexShrink: 0 }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div style={{ paddingTop: '1.25rem', borderTop: '1px solid rgba(27,53,84,0.1)' }}>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(47,111,181,0.7)' }}>
                    Livrable ·&nbsp;
                  </span>
                  <span style={{ fontFamily: 'Manrope, sans-serif', fontStyle: 'italic', fontWeight: 400, fontSize: '0.85rem', color: 'var(--blue-bright)' }}>
                    {p.deliverable}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MANDATS ── */}
      <div style={{ background: 'var(--paper)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
        <div className="section-inner">
          <div className="dsc-mandats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', maxWidth: 960 }}>
            {mandats.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                style={{
                  background: m.featured ? 'var(--ink)' : '#fff',
                  border: `1px solid ${m.featured ? 'rgba(47,111,181,0.35)' : 'rgba(27,53,84,0.1)'}`,
                  padding: '3rem',
                  position: 'relative',
                  boxShadow: m.featured ? '0 24px 60px rgba(10,20,32,0.2)' : '0 4px 20px rgba(0,0,0,0.05)',
                }}
              >
                {m.featured && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--blue-bright)' }} />
                )}

                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: m.featured ? 'rgba(47,111,181,0.75)' : 'rgba(95,102,114,0.6)', marginBottom: '0.6rem' }}>
                  {m.tag}
                </div>

                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em', color: m.featured ? '#ffffff' : 'var(--ink)', marginBottom: '1.75rem' }}>
                  {m.name}
                </div>

                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.3rem, 2.2vw, 2rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.025em', color: m.featured ? 'var(--blue-bright)' : 'var(--ink)', marginBottom: '0.25rem' }}>
                  {m.price}
                </div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: m.featured ? 'rgba(227,226,226,0.3)' : 'rgba(95,102,114,0.45)' }}>
                  MAD HT
                </div>

                <div style={{ display: 'flex', gap: '2rem', margin: '1.75rem 0', paddingBottom: '1.75rem', borderBottom: `1px solid ${m.featured ? 'rgba(255,255,255,0.07)' : 'rgba(27,53,84,0.08)'}` }}>
                  {[{ label: 'Durée', val: m.duration }, { label: 'Rythme', val: m.rythme }].map((spec) => (
                    <div key={spec.label}>
                      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: m.featured ? 'rgba(227,226,226,0.28)' : 'rgba(95,102,114,0.45)', marginBottom: '0.25rem' }}>
                        {spec.label}
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 500, color: m.featured ? 'rgba(235,232,225,0.8)' : 'var(--ink)' }}>
                        {spec.val}
                      </div>
                    </div>
                  ))}
                </div>

                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem' }}>
                  {m.includes.map((item) => (
                    <li key={item} style={{ fontSize: '0.87rem', padding: '0.5rem 0', borderBottom: `1px solid ${m.featured ? 'rgba(255,255,255,0.05)' : 'rgba(27,53,84,0.06)'}`, display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: m.featured ? 'rgba(235,232,225,0.65)' : 'var(--mid)', lineHeight: 1.5, fontWeight: 300 }}>
                      <span style={{ color: 'var(--blue-bright)', flexShrink: 0 }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="/contact"
                  className={m.featured ? 'btn-primary' : undefined}
                  style={m.featured ? {} : {
                    display: 'inline-flex', alignItems: 'center', fontFamily: 'DM Mono, monospace', fontSize: '0.72rem',
                    fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
                    color: 'var(--ink)', borderBottom: '1px solid rgba(27,53,84,0.25)', paddingBottom: '2px', transition: 'opacity 0.2s',
                  }}
                >
                  {m.cta} →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
