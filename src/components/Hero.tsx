import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LINES = [
  { text: 'Transformez', italic: false },
  { text: 'votre Supply', italic: false },
  { text: 'Chain en', italic: false },
  { text: 'avantage compétitif.', italic: true },
]

const STATS = [
  { value: '110+', label: 'Missions réalisées' },
  { value: '20+', label: "Ans d'expérience" },
  { value: '0', label: 'Commission éditeurs' },
  { value: '~5', label: 'Consultants experts' },
]

const NODES = [
  { id: 'europe', x: 5, y: 4, r: 0.5 },
  { id: 'asie', x: 88, y: 7, r: 0.5 },
  { id: 'africa', x: 40, y: 76, r: 0.5 },
  { id: 'tanger', x: 16, y: 11, r: 1.1 },
  { id: 'rabat', x: 19, y: 27, r: 0.8 },
  { id: 'casa', x: 18, y: 38, r: 1.6 },
  { id: 'fes', x: 43, y: 20, r: 1.0 },
  { id: 'oujda', x: 70, y: 16, r: 0.8 },
  { id: 'marrakech', x: 27, y: 52, r: 0.9 },
  { id: 'agadir', x: 13, y: 63, r: 0.8 },
]
const EDGES: [string, string][] = [
  ['europe', 'tanger'], ['tanger', 'rabat'], ['rabat', 'casa'],
  ['casa', 'fes'], ['fes', 'oujda'], ['oujda', 'asie'],
  ['casa', 'marrakech'], ['marrakech', 'agadir'],
  ['tanger', 'fes'], ['casa', 'africa'], ['agadir', 'africa'],
]
function getNode(id: string) { return NODES.find((n) => n.id === id)! }

function NetworkSVG() {
  const svgRef = useRef<SVGSVGElement>(null)
  useEffect(() => {
    if (!svgRef.current) return
    const ctx = gsap.context(() => {
      const flows = svgRef.current!.querySelectorAll<SVGPathElement>('[data-flow]')
      flows.forEach((path, i) => {
        const len = path.getTotalLength()
        const dashLen = len * 0.22
        gsap.set(path, { strokeDasharray: `${dashLen} ${len - dashLen}`, strokeDashoffset: 0 })
        gsap.to(path, { strokeDashoffset: -len, repeat: -1, duration: 4 + (i % 3), ease: 'none' })
      })
      const pulses = svgRef.current!.querySelectorAll<SVGCircleElement>('[data-pulse]')
      pulses.forEach((circle) => {
        const baseR = parseFloat(circle.getAttribute('data-base-r') || '1')
        gsap.fromTo(circle,
          { attr: { r: baseR }, opacity: 0.7 },
          { attr: { r: baseR * 3.5 }, opacity: 0, repeat: -1, duration: 2.8, ease: 'power1.out' }
        )
      })
    }, svgRef)
    return () => ctx.revert()
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 80"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }}
    >
      {EDGES.map(([aId, bId]) => {
        const a = getNode(aId); const b = getNode(bId)
        return <line key={`base-${aId}-${bId}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(192,154,47,0.4)" strokeWidth="0.25" />
      })}
      {EDGES.map(([aId, bId], idx) => {
        const a = getNode(aId); const b = getNode(bId)
        return <path key={`flow-${aId}-${bId}`} data-flow={idx} d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} stroke="rgba(192,154,47,1)" strokeWidth="0.5" fill="none" />
      })}
      {NODES.map((node) => (
        <g key={node.id}>
          <circle cx={node.x} cy={node.y} r={node.r} fill="rgba(192,154,47,0.9)" />
          <circle data-pulse={node.id} data-base-r={node.r} cx={node.x} cy={node.y} r={node.r} fill="none" stroke="rgba(192,154,47,0.5)" strokeWidth="0.25" />
        </g>
      ))}
    </svg>
  )
}

export default function Hero() {
  const [textVisible, setTextVisible] = useState(true)
  const heroRef = useRef<HTMLElement>(null)

  /* ─ Heading text appear once ─ */
  useEffect(() => {
    setTextVisible(true)
  }, [])

  /* ─ Parallax on scroll ─ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('[data-hero-bg]', {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        minHeight: '100svh',
        background: 'var(--dark)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: 88,
        paddingBottom: 120,
      }}
    >
      {/* ── Video background ── */}
      <div data-hero-bg style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-warehouse.jpg"
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: 0.28,
            filter: 'grayscale(20%) contrast(1.05)',
          }}
        >
          <source src="/videos/network-loop.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(120deg, rgba(10,20,32,0.93) 0%, rgba(10,20,32,0.72) 55%, rgba(10,20,32,0.90) 100%)',
        }} />

        {/* Morocco network */}
        <NetworkSVG />

        {/* Bottom vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(10,20,32,0.97) 100%)',
        }} />
      </div>

      {/* ── Side label ── */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '3rem',
        transform: 'translateY(-50%)',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <div style={{
          writingMode: 'vertical-rl',
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.58rem',
          letterSpacing: '0.18em',
          color: 'rgba(235,232,225,0.2)',
          textTransform: 'uppercase',
        }}>
          Logistique · Maroc
        </div>
        <div style={{ width: 1, height: 40, background: 'rgba(192,154,47,0.25)' }} />
      </div>

      {/* ── Main content ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1300, margin: '0 auto',
        padding: '0 var(--sp-x)', width: '100%',
      }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(192,154,47,0.8)',
            marginBottom: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <span style={{ display: 'block', width: 32, height: 1, background: 'var(--gold)', opacity: 0.5 }} />
          Cabinet indépendant · Supply Chain · Casablanca, Maroc
        </motion.div>

        {/* ── Headline — 4 lines mask-reveal ── */}
        <h1 style={{ margin: 0, marginBottom: '3.5rem' }}>
          {LINES.map((line, i) => (
            <div
              key={i}
              style={{
                overflow: 'hidden',
                lineHeight: 0.88,
                marginBottom: '0.08em',
              }}
            >
              <motion.div
                initial={{ y: '110%', opacity: 0 }}
                animate={textVisible ? { y: '0%', opacity: 1 } : {}}
                transition={{
                  duration: 1.0,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.3 + i * 0.14,
                }}
                style={{
                  display: 'block',
                  fontFamily: 'Bodoni Moda, serif',
                  fontSize: 'clamp(4rem, 10.5vw, 14rem)',
                  fontWeight: line.italic ? 400 : 900,
                  fontStyle: line.italic ? 'italic' : 'normal',
                  letterSpacing: '-0.03em',
                  color: line.italic ? 'var(--gold)' : 'var(--dark-text)',
                }}
              >
                {line.text}
              </motion.div>
            </div>
          ))}
        </h1>

        {/* ── Description + CTAs ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '4rem',
          alignItems: 'end',
        }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
            style={{
              fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
              fontWeight: 300,
              color: 'var(--dark-muted)',
              maxWidth: 460,
              lineHeight: 1.85,
              letterSpacing: '0.01em',
              margin: 0,
            }}
          >
            Cabinet indépendant de conseil et d&apos;AMOA en Supply Chain, dédié aux PME et ETI marocaines.
            Notre seule allégeance est à votre business case.
          </motion.p>

          <motion.div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
          >
            <Link to="/contact" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
              Réserver un échange gratuit →
            </Link>
            <Link to="/services" className="btn-ghost" style={{ whiteSpace: 'nowrap' }}>
              Nos offres
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          background: 'rgba(10,20,32,0.82)',
          backdropFilter: 'blur(24px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            style={{
              padding: '1.4rem 1.8rem',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
            }}
          >
            <div style={{
              fontFamily: 'Bodoni Moda, serif',
              fontSize: 'clamp(1.5rem, 2.4vw, 2.2rem)',
              fontWeight: 700,
              color: 'var(--gold)',
              lineHeight: 1,
              marginBottom: '0.3rem',
              letterSpacing: '-0.01em',
            }}>
              {s.value}
            </div>
            <div style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(235,232,225,0.3)',
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
