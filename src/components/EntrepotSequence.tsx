import { useEffect, useRef, type CSSProperties, type MouseEvent, type Ref } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Step = { img: string; alt: string; title: string; desc: string; ctaLabel: string; ctaHref: string }

/* ctaHref: a mix of same-page anchors ("#conseil", "#systemes") and cross-route
   paths ("/contact"). The CTA element is mutated imperatively (see setText below)
   rather than re-rendered by React, so it's a plain <a> throughout — a route change
   costs a full page reload here, but every target is verified to actually resolve. */
const STEPS: Step[] = [
  {
    img: '/images/entrepot-sequence/etape-1-chaos-maximal.webp',
    alt: 'Entrepôt désorganisé, plusieurs chariots élévateurs, sol encombré',
    title: 'Le stade "papier" : invisible jusqu\'à ce qu\'il coûte cher',
    desc: "Zéro traçabilité, adressage à la mémoire de l'équipe, écarts de stock découverts trop tard. Chaque commande manquante ou en retard est un client qui doute. Chaque chariot mal utilisé est un coût qui n'apparaît sur aucun tableau de bord — parce qu'il n'y a pas de tableau de bord.",
    ctaLabel: 'Faire mon diagnostic',
    ctaHref: '#conseil',
  },
  {
    img: '/images/entrepot-sequence/etape-2-chaos-modere.webp',
    alt: 'Entrepôt avec un chariot élévateur et un tableau de management vide',
    title: "Excel a stoppé l'hémorragie, pas résolu le problème",
    desc: "Un fichier partagé donne l'illusion du contrôle. Mais sans gestion réelle des emplacements, chaque recherche de palette reste une loterie, et la donnée n'est fiable que jusqu'à la prochaine saisie oubliée.",
    ctaLabel: "Voir l'optimisation des stocks",
    ctaHref: '#conseil',
  },
  {
    img: '/images/entrepot-sequence/etape-3-transition.webp',
    alt: 'Chariot élévateur et robot AMR coexistant, marquage au sol partiel',
    title: 'DDMRP : la fin des prévisions qui se trompent',
    desc: "Des buffers de découplage calculés sur la consommation réelle (ADU), des zones vert/jaune/rouge qui pilotent la reconstitution automatiquement. On ne prévoit plus l'avenir — on réagit à la demande réelle, en continu.",
    ctaLabel: 'Découvrir DDMRP',
    ctaHref: '#conseil',
  },
  {
    img: '/images/entrepot-sequence/etape-4-amr-seul.webp',
    alt: 'Robot AMR autonome, marquage au sol complet, un seul opérateur',
    title: 'WMS, TMS, APS : trois systèmes, une seule vérité',
    desc: "Localisation temps réel, tournées optimisées, planification synchronisée. Ce que l'entrepôt sait, l'équipe le sait au même instant — et le client aussi, si besoin.",
    ctaLabel: 'Explorer nos déploiements WMS/TMS/APS',
    ctaHref: '#systemes',
  },
  {
    img: '/images/entrepot-sequence/etape-5-final.webp',
    alt: 'Cobot, poste de travail et écran de pilotage actif',
    title: "Ne plus gérer l'urgence — piloter la performance",
    desc: "Un SaaS qui prévoit, alerte, et n'a besoin de vous que pour les décisions qui comptent. Nos déploiements Control Tower divisent la détection d'anomalies par 5 à 10.",
    ctaLabel: 'Parler à un consultant',
    ctaHref: '/contact',
  },
]

// Measured after WebP optimization (5 × ~1600px-wide frames). If this ever grows
// past ~1.2MB (heavier source photos, more steps), mobile drops to 3 frames.
const MEASURED_TOTAL_KB = 758
const MOBILE_WEIGHT_THRESHOLD_KB = 1200
const REDUCED_STEP_INDICES = [0, 2, 4]

const ctaStyle: CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
  border: '1px solid rgba(255,255,255,0.6)', color: '#ffffff',
  padding: '0.85rem 1.6rem', fontFamily: 'Jost, sans-serif',
  fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.04em',
  textTransform: 'uppercase', textDecoration: 'none',
  background: 'rgba(0,0,0,0.15)', backdropFilter: 'blur(6px)',
  transition: 'background 0.25s, color 0.25s',
  width: 'fit-content',
}

function CtaLink({ href, label, elRef }: { href: string; label: string; elRef: Ref<HTMLAnchorElement> }) {
  const onEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = '#ffffff'
    e.currentTarget.style.color = 'var(--navy)'
  }
  const onLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = 'rgba(0,0,0,0.15)'
    e.currentTarget.style.color = '#ffffff'
  }
  return <a ref={elRef} href={href} style={ctaStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>{label} →</a>
}

export default function EntrepotSequence() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRefs = useRef<(HTMLImageElement | null)[]>([])
  const dotRefs = useRef<(HTMLDivElement | null)[]>([])
  const titleRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
  const useReducedSet = isMobile && MEASURED_TOTAL_KB > MOBILE_WEIGHT_THRESHOLD_KB
  const activeSteps = useReducedSet ? REDUCED_STEP_INDICES.map((i) => STEPS[i]) : STEPS
  const segments = activeSteps.length - 1

  useEffect(() => {
    // Preload all frames as soon as the section is within ~600px of the viewport.
    const preload = () => {
      activeSteps.forEach((s) => { const i = new Image(); i.src = s.img })
    }
    if (!sectionRef.current) return
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { preload(); io.disconnect() } },
      { rootMargin: '600px 0px' }
    )
    io.observe(sectionRef.current)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const images = imgRefs.current.filter(Boolean) as HTMLImageElement[]
    const dots = dotRefs.current.filter(Boolean) as HTMLDivElement[]
    const easeFn = gsap.parseEase('power1.inOut')

    const applyStepContent = (idx: number) => {
      const step = activeSteps[idx]
      if (titleRef.current) titleRef.current.textContent = step.title
      if (descRef.current) descRef.current.textContent = step.desc
      if (ctaRef.current) {
        ctaRef.current.textContent = `${step.ctaLabel} →`
        ctaRef.current.setAttribute('href', step.ctaHref)
      }
    }

    if (reduceMotion) {
      // Show the end state — no scroll-jacked crossfade for users who opted out of motion.
      images.forEach((img, i) => gsap.set(img, { opacity: i === images.length - 1 ? 1 : 0 }))
      dots.forEach((d, i) => d.setAttribute('data-active', String(i === dots.length - 1)))
      applyStepContent(activeSteps.length - 1)
      return
    }

    gsap.set(images[0], { opacity: 1 })
    images.slice(1).forEach((img) => gsap.set(img, { opacity: 0 }))

    let dominant = 0
    const setText = (idx: number) => {
      dominant = idx
      // Title/desc/CTA fade together, briefly, right at the crossover — the CTA
      // stays opaque and clickable for the rest of the segment either side of that.
      const tl = gsap.timeline()
      tl.to([titleRef.current, descRef.current, ctaRef.current], { opacity: 0, y: -6, duration: 0.18, ease: 'power1.in' })
        .call(() => applyStepContent(idx))
        .to([titleRef.current, descRef.current, ctaRef.current], { opacity: 1, y: 0, duration: 0.22, ease: 'power1.out' })
      dots.forEach((d, i) => d.setAttribute('data-active', String(i === idx)))
    }

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const segProgress = self.progress * segments
          const activeIndex = Math.min(Math.floor(segProgress), segments - 1)
          const localT = easeFn(segProgress - activeIndex)

          images.forEach((img, i) => {
            if (i === activeIndex) gsap.set(img, { opacity: 1 - localT })
            else if (i === activeIndex + 1) gsap.set(img, { opacity: localT })
            else gsap.set(img, { opacity: 0 })
          })

          const newDominant = localT < 0.5 ? activeIndex : Math.min(activeIndex + 1, segments)
          if (newDominant !== dominant) setText(newDominant)
        },
      })
      return () => st.kill()
    }, sectionRef)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section
      ref={sectionRef}
      id="entrepot-sequence"
      style={{ position: 'relative', height: `${activeSteps.length * 100}vh` }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {activeSteps.map((step, i) => (
          <img
            key={step.img}
            ref={(el) => { imgRefs.current[i] = el }}
            src={step.img}
            alt={step.alt}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              opacity: i === 0 ? 1 : 0,
            }}
          />
        ))}

        {/* Voile — garantit la lisibilité du texte sur toutes les étapes */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />

        {/* Contenu overlay */}
        <div
          style={{
            position: 'relative', zIndex: 2,
            height: '100%',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            padding: 'var(--sp-y) var(--sp-x)',
            maxWidth: 1300, margin: '0 auto',
          }}
        >
          <div
            className="section-tag"
            style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.2rem' }}
          >
            <span>Comment nous intervenons sur le terrain</span>
          </div>
          <div
            ref={titleRef}
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 'clamp(1.7rem, 2.8vw, 2.75rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              color: '#ffffff',
              maxWidth: 720,
            }}
          >
            {activeSteps[0].title}
          </div>
          <div
            ref={descRef}
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.85)',
              marginTop: '0.85rem',
              maxWidth: 560,
            }}
          >
            {activeSteps[0].desc}
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <CtaLink href={activeSteps[0].ctaHref} label={activeSteps[0].ctaLabel} elRef={ctaRef} />
          </div>
        </div>

        {/* Indicateur de progression */}
        <div
          style={{
            position: 'absolute', bottom: '2rem', right: '2rem', zIndex: 2,
            display: 'flex', gap: '0.6rem',
          }}
        >
          {activeSteps.map((step, i) => (
            <div
              key={step.img}
              ref={(el) => { dotRefs.current[i] = el }}
              data-active={i === 0 ? 'true' : 'false'}
              style={{
                width: 8, height: 8,
                background: 'rgba(255,255,255,0.35)',
                transition: 'background 0.25s, transform 0.25s',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        #entrepot-sequence [data-active="true"] {
          background: var(--blue-bright) !important;
          transform: scale(1.3);
        }
      `}</style>
    </section>
  )
}
