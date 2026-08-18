import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const ROW1 = [
  'Renault-Nissan',
  "L'Oréal Maroc",
  'Nestlé Maroc',
  'P&G Maroc',
  'HP',
  'DHL Supply Chain',
  'Huawei',
  'Johnson & Johnson',
  'Centrale Laitière',
  'Cosumar',
  'Nexans',
  'Diana Holding',
  'Acima',
  'Groupe Addoha',
  'Mars',
  'OCP',
  'Marjane',
]

const ROW2 = [
  'Conseil Indépendant',
  '0 Commission Éditeur',
  'DDMRP Certifié',
  'PME & ETI Maroc',
  'AMOA Supply Chain',
  'WMS · TMS · APS',
  '20+ Ans Terrain',
  'S&OP · DDMRP · IBP',
  'Casablanca · Tanger · Rabat',
  'European Training Foundation',
  'Task Force Vaccination COVID-19',
  'Formation Grandes Écoles',
]

function MarqueeRow({
  items,
  direction = 1,
  accentEvery = 2,
}: {
  items: string[]
  direction?: 1 | -1
  accentEvery?: number
}) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current!
    const totalWidth = track.scrollWidth / 2

    const tween = gsap.to(track, {
      x: direction === 1 ? -totalWidth : totalWidth,
      duration: direction === 1 ? 32 : 28,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: string) => {
          const v = parseFloat(x) % totalWidth
          return direction === 1 ? v : v
        }),
      },
    })

    if (direction === -1) {
      gsap.set(track, { x: -totalWidth / 2 })
    }

    return () => { tween.kill() }
  }, [direction])

  const doubled = [...items, ...items]

  return (
    <div
      style={{
        overflow: 'hidden',
        padding: '0.65rem 0',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: i % accentEvery === 0 ? 'rgba(227,226,226,0.85)' : 'rgba(227,226,226,0.28)',
              whiteSpace: 'nowrap',
              padding: '0 2rem',
            }}
          >
            {item}
            <span style={{ marginLeft: '2rem', color: 'rgba(227,226,226,0.2)' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <div
      style={{
        background: 'var(--ink)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}
    >
      <MarqueeRow items={ROW1} direction={1} accentEvery={3} />
      <MarqueeRow items={ROW2} direction={-1} accentEvery={4} />
    </div>
  )
}
