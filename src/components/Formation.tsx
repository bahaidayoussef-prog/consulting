import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const formations = [
  {
    num: '01',
    type: 'Programme phare · Inter-entreprises',
    title: 'Devenir Responsable Logistique',
    desc: "Journée intensive pour structurer votre pilotage logistique. Fondamentaux, stocks, transport, KPIs, WMS/TMS/ERP. Hôtel 5★ Casablanca, tout inclus.",
    duration: '1 jour',
    audience: 'Coordinateur — Responsable logistique',
    price: '1 500',
    unit: 'MAD TTC / participant',
    cta: 'Voir le programme →',
  },
  {
    num: '02',
    type: 'Intra-entreprise · Lean',
    title: 'Lean Management & 5S',
    desc: "Éliminer les gaspillages, structurer les espaces, installer le management visuel. 5S, VSM, Kaizen — un premier chantier terrain construit en salle.",
    duration: '2 jours',
    audience: 'Responsables production — Chefs de ligne',
    price: '18 000 – 28 000',
    unit: 'MAD HT / groupe',
    cta: 'Demander un devis →',
  },
  {
    num: '03',
    type: 'Intra-entreprise · Management',
    title: 'Manager ses Équipes Opérationnelles',
    desc: "Développer sa posture de manager, fixer des objectifs SMART, déléguer, donner du feedback. Cas pratiques sur mesure adaptés à votre secteur.",
    duration: '2 jours',
    audience: 'Managers nouvellement nommés',
    price: '18 000 – 28 000',
    unit: 'MAD HT / groupe',
    cta: 'Demander un devis →',
  },
  {
    num: '04',
    type: 'Intra-entreprise · Finance',
    title: 'Lire et Analyser les Chiffres Clés',
    desc: "Lire un bilan, un compte de résultat, un flux de trésorerie. Comprendre marges et EBITDA. Décrypter un budget et défendre ses ressources.",
    duration: '2 jours',
    audience: 'Managers non financiers',
    price: '18 000 – 28 000',
    unit: 'MAD HT / groupe',
    cta: 'Demander un devis →',
  },
  {
    num: '05',
    type: 'Inter-entreprises · Projet',
    title: 'Chef de Projet Opérationnel',
    desc: "Piloter un projet de bout en bout : cadrage, planning, risques, équipe. Gantt, chemin critique, reporting — la boîte à outils du chef de projet.",
    duration: '2 jours',
    audience: 'Chefs de projet débutants',
    price: '3 500',
    unit: 'MAD TTC / participant',
    cta: 'Voir le programme →',
  },
]

function StickyCard({
  item,
  index,
  total,
}: {
  item: (typeof formations)[0]
  index: number
  total: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div
      style={{
        position: 'sticky',
        top: `${80 + index * 24}px`,
        zIndex: index + 1,
        marginBottom: 2,
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: index % 2 === 0 ? 'var(--dark-2)' : 'var(--dark)',
          borderTop: index === 0 ? '2px solid var(--blue-bright)' : '1px solid rgba(27,53,84,0.1)',
          borderLeft: '1px solid rgba(27,53,84,0.1)',
          borderRight: '1px solid rgba(27,53,84,0.1)',
          borderBottom: index === total - 1 ? '1px solid rgba(27,53,84,0.1)' : 'none',
          padding: '3rem',
          display: 'grid',
          gridTemplateColumns: '220px 1fr 200px',
          gap: '2.5rem',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 -8px 40px rgba(27,53,84,0.08)',
        }}
      >
        {/* Watermark number */}
        <div style={{
          position: 'absolute',
          right: '2.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'Manrope, sans-serif',
          fontSize: 'clamp(5rem, 10vw, 9rem)',
          fontWeight: 900,
          color: 'rgba(47,111,181,0.04)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}>
          {item.num}
        </div>

        {/* Left — meta */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(47,111,181,0.65)',
            marginBottom: '0.75rem',
          }}>
            {item.type}
          </div>
          <h3 style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
            fontWeight: 800,
            color: 'var(--navy)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '1.25rem',
          }}>
            {item.title}
          </h3>

          {/* Duration + audience */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <span style={{
                display: 'block',
                width: 16,
                height: 1,
                background: 'rgba(47,111,181,0.4)',
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.62rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(27,53,84,0.55)',
              }}>
                {item.duration}
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <span style={{
                display: 'block',
                width: 16,
                height: 1,
                background: 'rgba(47,111,181,0.4)',
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.62rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(27,53,84,0.55)',
              }}>
                {item.audience}
              </span>
            </div>
          </div>
        </div>

        {/* Center — description */}
        <p style={{
          fontSize: '0.92rem',
          color: 'var(--dark-muted)',
          lineHeight: 1.8,
          fontWeight: 300,
          position: 'relative',
          zIndex: 2,
        }}>
          {item.desc}
        </p>

        {/* Right — prix + CTA */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0',
        }}>
          {/* Prix */}
          <div style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 'clamp(0.95rem, 1.4vw, 1.25rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: 'var(--blue-bright)',
            textAlign: 'right',
            marginBottom: '0.2rem',
            wordBreak: 'keep-all',
          }}>
            {item.price}
          </div>
          <div style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.56rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(27,53,84,0.4)',
            textAlign: 'right',
            marginBottom: '1.75rem',
          }}>
            {item.unit}
          </div>

          <Link
            to="/formation"
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--navy)',
              textDecoration: 'none',
              border: '1px solid rgba(27,53,84,0.2)',
              padding: '0.65rem 1.2rem',
              whiteSpace: 'nowrap',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.borderColor = 'rgba(47,111,181,0.5)'
              el.style.color = 'var(--blue-bright)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.borderColor = 'rgba(27,53,84,0.2)'
              el.style.color = 'var(--navy)'
            }}
          >
            {item.cta}
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default function Formation() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="formation" style={{ background: 'var(--paper)', padding: 'var(--sp-y) var(--sp-x) 0' }}>
      <div className="section-inner">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 32 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(47,111,181,0.5)',
            marginBottom: '1.5rem',
          }}>
            07 / Formation & Enseignement
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr auto',
            gap: '4rem',
            alignItems: 'center',
            marginBottom: '5rem',
          }}>
            <h2 style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 'clamp(2.8rem, 5.5vw, 7rem)',
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
              color: 'var(--navy)',
              margin: 0,
            }}>
              Former les équipes.
              <br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>
                Transmettre le terrain.
              </span>
            </h2>

            <div>
              <p style={{
                fontSize: '1rem',
                color: 'var(--dark-muted)',
                lineHeight: 1.8,
                fontWeight: 300,
                maxWidth: 440,
                margin: '0 0 1.25rem',
              }}>
                Une pédagogie ancrée dans la réalité terrain, pas dans les manuels.
                Des formations conçues par des praticiens, pour des praticiens.
              </p>
              <div style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(47,111,181,0.6)',
              }}>
                27 programmes · 7 domaines — Supply Chain, Opérationnel, Lean, Management, Finance, Projet, Carrière
              </div>
            </div>

            {/* FormationPromo reel — phone frame */}
            <div style={{
              width: 160,
              aspectRatio: '9 / 16',
              border: '1px solid rgba(47,111,181,0.3)',
              borderRadius: 18,
              overflow: 'hidden',
              background: '#0a1420',
              flexShrink: 0,
              boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: 10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 40,
                height: 4,
                background: 'rgba(47,111,181,0.35)',
                borderRadius: 2,
                zIndex: 2,
              }} />
              <video
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              >
                <source src="/videos/formation-promo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </motion.div>

        {/* Sticky cards */}
        <div>
          {formations.map((item, i) => (
            <StickyCard key={item.num} item={item} index={i} total={formations.length} />
          ))}
        </div>

        {/* Closing CTA — full catalogue */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}>
          <Link
            to="/formation"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1.1rem 2.75rem',
              background: 'var(--blue-bright)',
              color: '#ffffff',
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.9rem',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.04em',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--navy)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--blue-bright)')}
          >
            Voir les 27 programmes →
          </Link>
        </div>
      </div>

      <div style={{ height: '6rem' }} />
    </section>
  )
}