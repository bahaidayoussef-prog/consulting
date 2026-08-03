import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: '01',
    title: 'Diagnostic terrain',
    desc: 'Avant toute recommandation, nous comprenons. 2 à 5 jours d\'immersion : entretiens, observation des flux, analyse des données. Aucun rapport passe-partout.',
    tag: '2-5 jours',
    icon: '⟳',
  },
  {
    num: '02',
    title: 'Architecture de la solution',
    desc: 'Nous concevons une solution sur mesure avec livrables fermes, délai engagé et résultat cible chiffré. Le business case est validé avant tout démarrage.',
    tag: '1-3 semaines',
    icon: '◈',
  },
  {
    num: '03',
    title: 'Déploiement maîtrisé',
    desc: 'Accompagnement terrain aux côtés de vos équipes. Pas de consulting depuis Paris. Nous sommes présents sur vos sites, dans vos entrepôts, avec vos planificateurs.',
    tag: '1-6 mois',
    icon: '→',
  },
  {
    num: '04',
    title: 'Pilotage des résultats',
    desc: 'Les KPIs définis en phase 1 sont mesurés à chaque étape. Revue mensuelle avec le Comex. Nous restons jusqu\'à ce que les gains soient pérennisés.',
    tag: 'Continu',
    icon: '◆',
  },
]

export default function Methode() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    // Animate the connecting line
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.6,
          ease: 'power2.inOut',
          transformOrigin: 'left',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            once: true,
          },
        }
      )
    }

    // Animate each step card
    stepsRef.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          delay: i * 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            once: true,
          },
        }
      )
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="methode"
      style={{
        background: 'var(--dark)',
        padding: 'var(--sp-y-md) var(--sp-x)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid background */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.025, pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <defs>
          <pattern id="m-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M60 0 L0 0 0 60" fill="none" stroke="#fff" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#m-grid)" />
      </svg>

      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'end',
            marginBottom: '5rem',
          }}
        >
          <div>
            <div className="section-tag" style={{ color: 'var(--gold)' }}>Méthode Essor</div>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--dark-text)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
              }}
            >
              Une méthode.
              <br />
              <span style={{ fontStyle: 'normal', fontWeight: 600 }}>Un résultat mesurable.</span>
            </h2>
          </div>
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--dark-muted)',
              lineHeight: 1.8,
              alignSelf: 'end',
            }}
          >
            Quatre étapes invariables. Chaque mission démarre par un diagnostic terrain
            indépendant — jamais par une solution pré-packagée. C&apos;est notre différence
            structurelle vis-à-vis des grands cabinets.
          </p>
        </div>

        {/* Connecting line */}
        <div style={{ position: 'relative', marginBottom: '0' }}>
          <div
            ref={lineRef}
            style={{
              position: 'absolute',
              top: '4.5rem',
              left: '3%',
              right: '3%',
              height: 1,
              background: 'linear-gradient(90deg, var(--gold) 0%, rgba(184,146,42,0.2) 100%)',
              zIndex: 0,
            }}
          />

          {/* Steps grid */}
          <div
            className="method-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => { stepsRef.current[i] = el }}
                className="method-step"
                style={{
                  padding: '0 2rem 3rem',
                  borderRight: i < STEPS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  opacity: 0,
                  cursor: 'default',
                }}
              >
                {/* Number */}
                <span className="method-step-number">{step.num}</span>

                {/* Connector dot */}
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: 'var(--gold)',
                    border: '2px solid var(--dark)',
                    boxShadow: '0 0 0 3px rgba(184,146,42,0.2)',
                    margin: '1rem 0 1.5rem',
                  }}
                />

                {/* Tag */}
                <div
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.62rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(184,146,42,0.5)',
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span style={{ color: 'var(--gold)' }}>{step.icon}</span>
                  {step.tag}
                </div>

                {/* Title */}
                <div
                  style={{
                    fontFamily: 'Bodoni Moda, serif',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: 'var(--dark-text)',
                    marginBottom: '0.75rem',
                    lineHeight: 1.3,
                  }}
                >
                  {step.title}
                </div>

                {/* Description */}
                <div
                  style={{
                    fontSize: '0.86rem',
                    color: 'var(--dark-muted)',
                    lineHeight: 1.8,
                  }}
                >
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgba(227,226,226,0.5)',
            }}
          >
            Prêt à démarrer votre diagnostic ?
          </div>
          <a
            href="#contact"
            className="btn-primary"
            style={{ background: 'var(--gold)', color: 'var(--dark)', fontWeight: 700 }}
          >
            Réserver un échange gratuit →
          </a>
        </div>
      </div>
    </section>
  )
}
