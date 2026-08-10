import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const METRICS = [
  { value: '710', suffix: 'M', label: 'MAD d\'achats pilotés', sub: 'Groupe Addoha — transformation complète' },
  { value: '11', suffix: '%', label: "d'économies réalisées", sub: 'Sur le spend achats groupe' },
  { value: '31', suffix: '', label: 'chantiers simultanés', sub: 'Coordination multi-sites & multi-corps' },
  { value: '120', suffix: '+', label: 'collaborateurs dirigés', sub: '21 000 m² — DHL Supply Chain Maroc' },
]

function CountUp({ target, suffix = '', triggerRef }: {
  target: number; suffix?: string; triggerRef: React.RefObject<HTMLElement>
}) {
  const elRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (!elRef.current || !triggerRef.current) return
    const obj = { val: 0 }
    ScrollTrigger.create({
      trigger: triggerRef.current,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power3.out',
          onUpdate() {
            if (elRef.current) elRef.current.textContent = Math.round(obj.val) + suffix
          },
        })
      },
    })
  }, [target, suffix, triggerRef])
  return <span ref={elRef}>0{suffix}</span>
}

export default function Impact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef(null)
  const inView = useInView(headingRef, { once: true, margin: '-80px' })
  const statsVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = statsVideoRef.current
    if (!video) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(video)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="impact"
      style={{ background: 'var(--dark)', padding: 'var(--sp)', position: 'relative', overflow: 'hidden' }}
    >
      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: '6rem' }}>
          <div style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'rgba(47,111,181,0.55)',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            03 / Preuves terrain
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'end',
          }}>
            <motion.h2
              ref={headingRef}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(2.8rem, 5.5vw, 7.5rem)',
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: '-0.025em',
                color: 'var(--navy)',
                margin: 0,
              }}
            >
              Quinze ans.
              <br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>
                Des résultats mesurés.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{
                fontSize: '1rem',
                color: 'var(--dark-muted)',
                lineHeight: 1.8,
                fontWeight: 300,
                maxWidth: 420,
              }}
            >
              Chaque mission est livrée avec des indicateurs de performance convenus à l&apos;avance.
              Pas de rapport d&apos;étape — des résultats.
            </motion.p>
          </div>
        </div>

        {/* Metrics grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: '1px solid rgba(27,53,84,0.1)',
          marginBottom: '5rem',
        }}>
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              style={{
                padding: '3.5rem 2.5rem 3rem',
                borderRight: i < 3 ? '1px solid rgba(27,53,84,0.1)' : 'none',
              }}
            >
              <div style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(3.5rem, 5.5vw, 6.5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 0.9,
                color: 'var(--blue-bright)',
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
              }}>
                <CountUp
                  target={parseFloat(m.value)}
                  suffix={m.suffix}
                  triggerRef={sectionRef as React.RefObject<HTMLElement>}
                />
              </div>
              <div style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)',
                fontWeight: 600,
                color: 'var(--navy)',
                marginBottom: '0.5rem',
                lineHeight: 1.3,
              }}>
                {m.label}
              </div>
              <div style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(27,53,84,0.38)',
              }}>
                {m.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* StatsReveal video */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginBottom: '5rem',
            border: '1px solid rgba(27,53,84,0.1)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute',
            top: '1.25rem',
            left: '1.5rem',
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(47,111,181,0.5)',
            zIndex: 2,
            pointerEvents: 'none',
          }}>
            Résultats terrain · 20 ans
          </div>
          <video
            ref={statsVideoRef}
            src="/videos/stats-reveal.mp4"
            muted
            playsInline
            style={{
              width: '100%',
              display: 'block',
              aspectRatio: '16 / 9',
            }}
          />
        </motion.div>

        {/* Quote + certs row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '5rem',
          alignItems: 'center',
          paddingTop: '3rem',
          borderTop: '1px solid rgba(27,53,84,0.1)',
        }}>
          <div>
            <div style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(47,111,181,0.7)',
              marginBottom: '1.25rem',
            }}>
              Notre engagement
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['DDMRP Certifié', 'ENSA Agadir', 'KEDGE / UM6P', 'European Training Foundation'].map((tag) => (
                <span key={tag} style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.3rem 0.7rem',
                  border: '1px solid rgba(47,111,181,0.2)',
                  color: 'rgba(47,111,181,0.55)',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <blockquote style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(27,53,84,0.65)',
            lineHeight: 1.5,
            borderLeft: '2px solid var(--blue-bright)',
            paddingLeft: '2.5rem',
            margin: 0,
          }}>
            "Notre modèle : zéro commission sur les logiciels. Zéro conflit d&apos;intérêt.
            Cent pour cent aligné sur votre résultat opérationnel."
          </blockquote>
        </div>
      </div>
    </section>
  )
}
