import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import SchemaScript from './SchemaHelper'
import PageMeta from './PageMeta'
import { VILLES } from '../data/villesFormation'
import { PROGRAMMES, FAQ, SESSIONS, programmesSchema } from '../data/formations'

/* ─── Brand constants ─────────────────────────────────────── */
const WA = `https://wa.me/212663449200?text=${encodeURIComponent('Bonjour Nextinotech, je souhaite des informations sur vos formations. Pouvez-vous me recontacter ?')}`
const EMAIL = 'mailto:contact@nextinotech.com?subject=Catalogue%20Formations%20Nextinotech'

/* ─── Hero carousel — decorative only, images as CSS backgrounds ── */
const CAROUSEL_IMAGES = [
  '/images/formation-carousel/formation-1.webp',
  '/images/formation-carousel/formation-2.webp',
  '/images/formation-carousel/formation-3.webp',
  '/images/formation-carousel/formation-4.webp',
  '/images/formation-carousel/formation-5.webp',
  '/images/formation-carousel/formation-6.webp',
  '/images/formation-carousel/formation-7.webp',
  '/images/formation-carousel/formation-8.webp',
]

function HeroCarousel() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % CAROUSEL_IMAGES.length), 5500)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', inset: 0, opacity: 0.9 }}>
        {CAROUSEL_IMAGES.map((src, i) => (
          <div
            key={src}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(1px)',
              opacity: i === active ? 1 : 0,
              transition: 'opacity 1s ease',
            }}
          />
        ))}
      </div>
      {/* Brand-colored veil — blue/white, not a flat black scrim */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(125deg, rgba(27,53,84,0.2) 0%, rgba(255,255,255,0.14) 45%, rgba(47,111,181,0.08) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, #ffffff 100%)',
      }} />
    </div>
  )
}

/* ─── Helpers ─────────────────────────────────────────────── */
function Tag({ label, format }: { label: string; format: string }) {
  const bg = format === 'inter'
    ? 'rgba(47,111,181,0.1)' : format === 'coaching'
    ? 'rgba(47,111,181,0.07)' : 'rgba(27,53,84,0.08)'
  const color = format === 'inter' || format === 'coaching' ? 'var(--blue-bright)' : 'var(--navy)'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '0.2rem 0.65rem',
      background: bg,
      fontFamily: 'DM Mono, monospace',
      fontSize: '0.52rem',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color,
    }}>
      {label}
    </span>
  )
}

function Reveal({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/* ─── FAQ Item ────────────────────────────────────────────── */
function FAQItem({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '1.75rem 0',
          textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '1.05rem', fontWeight: 600, color: 'var(--navy)' }}>
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: '1.4rem', color: 'var(--blue-bright)', flexShrink: 0, lineHeight: 1 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ fontSize: '0.95rem', color: 'var(--dark-muted)', lineHeight: 1.8, fontWeight: 300, paddingBottom: '1.75rem', maxWidth: 760 }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Programme Card ──────────────────────────────────────── */
function ProgramCard({ p }: { p: typeof PROGRAMMES[0] }) {
  const [open, setOpen] = useState(false)
  const isExternal = p.cta.startsWith('http') || p.cta.startsWith('mailto')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const isRemote = p.lieu.toLowerCase().includes('visio')
  const accent = p.domaine === 'lean' ? '#2a6b45' : 'var(--navy)'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderTop: `2px solid ${accent}`,
        borderLeft: '1px solid var(--border)',
        borderRight: '1px solid var(--border)',
        background: '#ffffff',
        marginBottom: 2,
      }}
    >
      {/* Card header — always visible */}
      <div className="pc-header" style={{ padding: '2.5rem 3rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.14em', color: accent, opacity: 0.7 }}>{p.num}</span>
            <Tag label={p.badge} format={p.format} />
            {isRemote && <Tag label="Visio possible" format="inter" />}
          </div>

          <h3 style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            color: 'var(--navy)',
            marginBottom: '0.6rem',
          }}>
            {p.title}
          </h3>

          <p style={{ fontSize: '0.9rem', color: 'var(--mid)', lineHeight: 1.6, fontWeight: 300, maxWidth: 540, marginBottom: '1.5rem' }}>
            {p.subtitle}
          </p>

          {/* Meta row */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Durée', val: p.duration },
              { label: 'Groupe', val: p.group },
              { label: 'Lieu', val: p.lieu },
            ].map(m => (
              <div key={m.label}>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: accent, opacity: 0.7, marginBottom: '0.2rem' }}>{m.label}</div>
                <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.82rem', fontWeight: 500, color: 'var(--navy)' }}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — price + CTA */}
        <div className="pc-header-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1.25rem', minWidth: 180 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, color: accent, lineHeight: 1, letterSpacing: '-0.02em' }}>
              {p.price}
            </div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mid)', marginTop: '0.25rem' }}>
              {p.unit}
            </div>
          </div>

          <a
            href={p.cta}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.75rem 1.5rem',
              background: p.format === 'inter' || p.format === 'coaching' ? 'var(--blue-bright)' : 'transparent',
              border: `1px solid ${p.format === 'inter' || p.format === 'coaching' ? 'var(--blue-bright)' : 'var(--border)'}`,
              color: p.format === 'inter' || p.format === 'coaching' ? '#ffffff' : 'var(--navy)',
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.62rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              if (p.format === 'inter' || p.format === 'coaching') {
                el.style.background = 'var(--navy)'
              } else {
                el.style.borderColor = 'var(--blue-bright)'; el.style.color = 'var(--blue-bright)'
              }
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              if (p.format === 'inter' || p.format === 'coaching') {
                el.style.background = 'var(--blue-bright)'
              } else {
                el.style.borderColor = 'var(--border)'; el.style.color = 'var(--navy)'
              }
            }}
          >
            {p.format === 'inter' ? 'Réserver →' : p.format === 'coaching' ? 'Planifier →' : 'Demander un devis →'}
          </a>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
            <button
              onClick={() => setOpen(o => !o)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mid)', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: 0, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--blue-bright)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--mid)'}
            >
              {open ? 'Réduire' : 'Aperçu rapide'}
              <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} style={{ display: 'inline-block', fontSize: '1rem', lineHeight: 1 }}>+</motion.span>
            </button>
            <Link
              to={p.id === 'rl' ? '/formation-rl' : `/formation/${p.id}`}
              style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mid)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--blue-bright)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--mid)')}
            >
              Fiche complète →
            </Link>
          </div>
        </div>
      </div>

      {/* Expandable programme details */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pc-detail-grid" style={{ borderTop: '1px solid var(--border)', padding: '2.5rem 3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
              {/* Modules */}
              <div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '1.25rem' }}>Programme</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {p.modules.map((m, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', color: 'var(--blue-bright)', minWidth: 20, paddingTop: '0.25rem', opacity: 0.7 }}>{String(i + 1).padStart(2, '0')}</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--dark-muted)', lineHeight: 1.5 }}>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Public + Inclus */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '1rem' }}>Pour qui</div>
                  {p.public.map((pub, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ color: 'var(--blue-bright)', fontSize: '0.4rem' }}>◆</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--dark-muted)' }}>{pub}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '1rem' }}>Inclus</div>
                  {p.inclus.map((inc, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ color: 'var(--blue-bright)', fontSize: '0.55rem' }}>✓</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--dark-muted)' }}>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Main Component ──────────────────────────────────────── */
export default function FormationCatalogue() {
  const [activeTab, setActiveTab] = useState<'all' | 'sc' | 'lean' | 'management' | 'finance' | 'projet' | 'carriere' | 'operationnel'>('all')

  const filtered = activeTab === 'all' ? PROGRAMMES : PROGRAMMES.filter(p => p.domaine === activeTab)

  const tabs: { id: typeof activeTab; label: string }[] = [
    { id: 'all', label: `Tous (${PROGRAMMES.length})` },
    { id: 'sc', label: 'Supply Chain' },
    { id: 'operationnel', label: 'Opérationnel' },
    { id: 'lean', label: 'Lean & Amélioration' },
    { id: 'management', label: 'Management' },
    { id: 'finance', label: 'Finance Ops' },
    { id: 'projet', label: 'Gestion de Projet' },
    { id: 'carriere', label: 'Carrière & Bien-être' },
  ]

  return (
    <>
      <PageMeta
        title="Formations Supply Chain, Lean, Management, Finance, Projet & Carrière — Nextinotech"
        description="27 programmes de formation sur 7 domaines : Supply Chain, Opérationnel, Lean, Management, Finance, Gestion de Projet, Carrière & Bien-être. Inter et intra-entreprise. Catalogue et calendrier 2026."
        canonical="https://nextinotech.com/formation"
      />
      <SchemaScript schema={programmesSchema} />

      {/* ══ SECTION 1 — HERO AVEC CARROUSEL DISCRET ═══════════ */}
      <section style={{ position: 'relative', background: '#ffffff', padding: '8rem 4rem 0', overflow: 'hidden' }}>
        <HeroCarousel />
        <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '2.5rem' }}>
              01 / Académie · Terrain · Résultats
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 'clamp(3.5rem, 9vw, 11rem)',
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: '-0.025em',
              color: 'var(--navy)',
              margin: '0 0 4rem',
            }}>
              Former.<br />
              Certifier.<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>Transformer.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.09}>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'var(--mid)', lineHeight: 1.8, fontWeight: 300, maxWidth: 660, margin: '0 0 2rem' }}>
              Nextinotech forme les professionnels de la logistique et de la supply chain au Maroc :
              27 programmes sur 7 domaines, du{' '}
              <Link to="/formation-rl" style={{ color: 'var(--blue-bright)', textDecoration: 'none' }}>responsable logistique</Link>{' '}
              à l&apos;acheteur, en inter-entreprise à Casablanca et en intra-entreprise partout au Maroc.
              Prise en charge CSF (OFPPT) / GIAC possible — convention de formation remise à l&apos;inscription.
            </p>
          </Reveal>

        </div>

        {/* Stats strip — floating blurred glass card, same pattern as the Hero stats bar */}
        <Reveal delay={0.12}>
          <div
            className="formation-stats-grid"
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(24px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
              borderTop: '1px solid var(--border)',
              marginTop: '4rem',
            }}
          >
            {[
              { val: '27', label: 'programmes disponibles' },
              { val: '7', label: 'domaines de formation' },
              { val: '20+', label: 'ans de terrain formateur' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '1.4rem 1.8rem', borderRight: i < 2 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.5rem, 2.4vw, 2.2rem)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1, marginBottom: '0.3rem', letterSpacing: '-0.01em' }}>{s.val}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mid)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ══ STATEMENT LINE ════════════════════════════════════ */}
      <div style={{ background: 'var(--dark-2)', padding: '5rem 4rem', borderTop: '1px solid var(--border)' }}>
        <div className="section-inner">
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2rem, 5vw, 6.5rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', fontStyle: 'italic', color: 'var(--navy)' }}>
            "Le bon formateur ne vous apprend pas le métier.<br />Il vous fait voir ce que vous faites déjà — autrement."
          </div>
        </div>
      </div>

      {/* ══ SECTION 2 — CATALOGUE + CALENDRIER ════════════════ */}
      <section style={{ background: '#ffffff', padding: '8rem 4rem' }}>
        <div className="section-inner">
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
              <div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '1.5rem' }}>
                  02 / Catalogue & calendrier
                </div>
                <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--navy)', margin: 0 }}>
                  27 programmes.<br />
                  <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>7 domaines d'expertise.</span>
                </h2>
              </div>

              {/* Filter tabs */}
              <div style={{ display: 'flex', gap: '2px', background: 'var(--dark-2)', padding: '4px', flexWrap: 'wrap' }}>
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      background: activeTab === tab.id ? 'var(--blue-bright)' : 'transparent',
                      border: 'none',
                      padding: '0.6rem 1.25rem',
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.58rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: activeTab === tab.id ? '#ffffff' : 'var(--mid)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {filtered.map(p => (
                <ProgramCard key={p.id} p={p} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Calendrier 2026 (fait partie de la Section 2) ── */}
      <section style={{ background: 'var(--dark-2)', padding: '6rem 4rem 8rem', color: 'var(--navy)' }}>
        <div className="section-inner">
          <Reveal>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '1.5rem' }}>
              Prochaines sessions programmées
            </div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--navy)', margin: '0 0 5rem' }}>
              Calendrier<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>Septembre — Décembre 2026.</span>
            </h2>
          </Reveal>

          <div className="formation-calendar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }}>
            {SESSIONS.map((month, mi) => (
              <Reveal key={month.mois} delay={mi * 0.08}>
                <div style={{ background: '#fff', padding: '2.5rem', minHeight: 300 }}>
                  {/* Month header */}
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', fontWeight: 800, color: 'var(--navy)', lineHeight: 1, marginBottom: '2rem', borderBottom: '2px solid var(--blue-bright)', paddingBottom: '1rem' }}>
                    {month.mois}
                    <span style={{ display: 'block', fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mid)', fontWeight: 400, marginTop: '0.4rem', fontStyle: 'normal' }}>
                      {month.sessions.length} session{month.sessions.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  {/* Sessions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {month.sessions.map((s, si) => (
                      <div key={si} style={{ borderLeft: `2px solid ${s.format === 'inter' ? 'var(--blue-bright)' : 'var(--border)'}`, paddingLeft: '0.9rem' }}>
                        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', color: s.format === 'inter' ? 'var(--blue-bright)' : 'var(--mid)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                          {s.date} · {s.format === 'inter' ? 'Inter' : 'Intra'}
                        </div>
                        <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', lineHeight: 1.3, marginBottom: '0.3rem' }}>
                          {s.titre}
                        </div>
                        {s.places !== null && (
                          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.08em', color: s.places <= 4 ? 'var(--blue-bright)' : 'var(--mid)', textTransform: 'uppercase' }}>
                            {s.places} place{s.places > 1 ? 's' : ''} disponible{s.places > 1 ? 's' : ''}
                          </div>
                        )}
                        {s.places === null && (
                          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.08em', color: 'var(--mid)', textTransform: 'uppercase' }}>
                            Sur demande
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Legend + note */}
          <Reveal delay={0.2}>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-block', width: 12, height: 12, background: 'var(--blue-bright)' }} />
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mid)' }}>Inter-entreprises</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-block', width: 12, height: 12, background: 'var(--border)' }} />
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mid)' }}>Intra-entreprise (sur devis)</span>
              </div>
              <div style={{ marginLeft: 'auto', fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--mid)', textTransform: 'uppercase' }}>
                Planning 2027 disponible sur demande
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ SECTION 3 — DÉTAIL : PROGRAMME PHARE ══════════════ */}
      <section style={{ background: '#ffffff', padding: '8rem 4rem', color: 'var(--navy)' }}>
        <div className="section-inner">
          <Reveal>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '1.5rem' }}>
              03 / Détail — programme phare
            </div>
          </Reveal>

          <div className="phare-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>
            {/* Left */}
            <Reveal delay={0.05}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--blue-bright)', padding: '0.3rem 0.9rem', marginBottom: '2rem' }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>★ Programme phare</span>
              </div>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--navy)', margin: '0 0 1.5rem' }}>
                Devenir<br />
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>Responsable<br />Logistique.</span>
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--dark-muted)', lineHeight: 1.8, fontWeight: 300, maxWidth: 480, marginBottom: '2.5rem' }}>
                Une journée intensive pour structurer votre pilotage logistique. Formateur expert 20+ ans terrain. Hôtel 5★ Casablanca. Tout inclus — déjeuner, support 60 pages, attestation, suivi WhatsApp 30 jours.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                <Link to="/formation-rl" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '1rem 2.5rem', background: 'var(--navy)', color: '#ffffff', fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.04em', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--blue-bright)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--navy)'}
                >
                  Voir le programme complet →
                </Link>
                <a href={WA} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '1rem 2.5rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--navy)', fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.04em', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--blue-bright)'; (e.currentTarget as HTMLElement).style.color = 'var(--blue-bright)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--navy)' }}
                >
                  Réserver via WhatsApp
                </a>
              </div>
              {/* Key facts */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {[
                  { l: 'Tarif', v: '1 500 MAD TTC' },
                  { l: 'Format', v: 'Inter-entreprises' },
                  { l: 'Durée', v: '1 journée (8h30–17h30)' },
                  { l: 'Lieu', v: 'Hôtel 5★ Casablanca' },
                  { l: 'Places', v: '8 à 16 participants' },
                  { l: 'Suivi', v: 'WhatsApp 30 jours inclus' },
                ].map((f, i) => (
                  <div key={i} style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '0.2rem' }}>{f.l}</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--navy)' }}>{f.v}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right — upcoming dates */}
            <Reveal delay={0.12}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '1.5rem' }}>
                Prochaines sessions 2026
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {[
                  { date: '18 Septembre 2026', places: 5, status: 'Ouvert' },
                  { date: '23 Octobre 2026', places: 6, status: 'Ouvert' },
                  { date: '13 Novembre 2026', places: 8, status: 'Ouvert' },
                  { date: '11 Décembre 2026', places: 4, status: 'Dernières places' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', background: i % 2 === 0 ? '#fff' : 'var(--dark-2)', borderLeft: `2px solid ${s.places <= 4 ? 'var(--blue-bright)' : 'var(--border)'}` }}>
                    <div>
                      <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', fontWeight: 600, color: 'var(--navy)' }}>{s.date}</div>
                      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.1em', color: 'var(--mid)', marginTop: '0.2rem', textTransform: 'uppercase' }}>{s.places} places disponibles</div>
                    </div>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: s.places <= 4 ? 'var(--blue-bright)' : 'var(--mid)', fontWeight: s.places <= 4 ? 700 : 400 }}>
                      {s.status}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(47,111,181,0.06)', borderLeft: '2px solid var(--blue-bright)' }}>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '0.5rem' }}>Session intra disponible</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--dark-muted)', lineHeight: 1.6, fontWeight: 300 }}>
                  Vous avez 5+ collaborateurs ? Nous organisons cette formation dans vos locaux, adaptée à votre secteur. Contactez-nous pour un devis.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ FORMATIONS PAR VILLE ═════════════════════════════ */}
      <section style={{ background: 'var(--paper)', padding: '8rem 4rem', color: 'var(--navy)' }}>
        <div className="section-inner">
          <Reveal>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '1.5rem' }}>
              Couverture · Maroc
            </div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--navy)', margin: '0 0 2rem' }}>
              Formation logistique<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>par ville.</span>
            </h2>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--mid)', fontWeight: 300, maxWidth: 620, margin: '0 0 2.5rem' }}>
              Sessions inter-entreprise en présentiel à Casablanca, format intra-entreprise partout au Maroc.
              Contexte économique local et programmes recommandés pour chaque région.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
              {VILLES.map(v => (
                <Link key={v.slug} to={`/formation-logistique-${v.slug}`} style={{ flex: '1 1 220px', background: '#ffffff', padding: '1.5rem 1.75rem', textDecoration: 'none' }}>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)' }}>{v.nom}</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mid)', marginTop: '0.3rem' }}>{v.region}</div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════ */}
      <section style={{ background: '#ffffff', padding: '8rem 4rem', color: 'var(--navy)' }}>
        <div className="section-inner">
          <Reveal>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '1.5rem' }}>
              04 / Questions fréquentes
            </div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--navy)', margin: '0 0 4rem' }}>
              Vos questions,<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>nos réponses.</span>
            </h2>
          </Reveal>

          <div style={{ maxWidth: 900 }}>
            {FAQ.map((item, i) => (
              <FAQItem key={i} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL ════════════════════════════════════════ */}
      <section style={{ background: 'var(--dark-2)', padding: '8rem 4rem' }}>
        <div className="section-inner">
          <div className="cta-final-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '6rem', alignItems: 'center' }}>
            <Reveal>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '1.5rem' }}>
                05 / Inscription & contact
              </div>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--navy)', margin: '0 0 1.5rem' }}>
                Réserver votre<br />
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>prochaine session.</span>
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--dark-muted)', lineHeight: 1.8, fontWeight: 300, maxWidth: 520, margin: 0 }}>
                Réponse sous 24h. Aucun engagement avant confirmation écrite. Annulation gratuite jusqu'à 7 jours avant la session.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
                <a href={WA} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1.25rem 3rem', background: 'var(--blue-bright)', color: '#ffffff', fontFamily: 'Jost, sans-serif', fontSize: '1rem', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.04em', transition: 'background 0.2s', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--navy)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--blue-bright)'}
                >
                  Réserver via WhatsApp →
                </a>
                <a href={EMAIL}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1.25rem 3rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--dark-muted)', fontFamily: 'Jost, sans-serif', fontSize: '1rem', fontWeight: 400, textDecoration: 'none', letterSpacing: '0.04em', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--blue-bright)'; (e.currentTarget as HTMLElement).style.color = 'var(--blue-bright)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--dark-muted)' }}
                >
                  Écrire par email
                </a>
                <Link to="/contact"
                  style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mid)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--blue-bright)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--mid)'}
                >
                  Ou via le formulaire de contact →
                </Link>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--mid)', marginTop: '0.5rem' }}>
                  +212 06 63 44 92 00 · contact@nextinotech.com
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
