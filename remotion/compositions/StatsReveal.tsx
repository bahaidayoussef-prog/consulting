import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion'

const DARK = '#0a1420'
const GOLD = '#c09a2f'

const STATS = [
  { value: 110, suffix: '+', label: "Missions réalisées" },
  { value: 20, suffix: '+', label: "Ans d'expérience terrain" },
  { value: 710, suffix: 'M', label: "MAD d'achats pilotés" },
  { value: 6, suffix: '', label: "Secteurs accompagnés" },
]

function useCountUp(target: number, frame: number, fps: number, delay: number, duration: number) {
  const progress = interpolate(frame, [delay, delay + duration * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: (t) => 1 - Math.pow(1 - t, 3),
  })
  return Math.round(progress * target)
}

export function StatsReveal() {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  const titleProgress = spring({ frame: frame - 5, fps, config: { damping: 18 } })
  const lineProgress = interpolate(frame, [20, 55], [0, 1], { extrapolateRight: 'clamp' })

  const fadeOut = interpolate(frame, [durationInFrames - fps, durationInFrames], [1, 0], { extrapolateLeft: 'clamp' })

  return (
    <AbsoluteFill style={{ background: DARK, padding: '80px 120px', opacity: fadeOut }}>
      {/* Header */}
      <div style={{ marginBottom: 72 }}>
        <div style={{
          opacity: titleProgress,
          transform: `translateY(${24 * (1 - titleProgress)}px)`,
          fontFamily: "'DM Mono', monospace",
          fontSize: 13,
          letterSpacing: '0.22em',
          color: GOLD,
          marginBottom: 20,
        }}>
          ESSOR CONSULTING · RÉSULTATS TERRAIN
        </div>
        <div style={{
          opacity: titleProgress,
          transform: `translateY(${32 * (1 - titleProgress)}px)`,
          fontFamily: "'Bodoni Moda', serif",
          fontSize: 72,
          fontWeight: 800,
          lineHeight: 0.92,
          letterSpacing: '-0.02em',
          color: 'rgba(235,232,225,0.95)',
        }}>
          20 ans.{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 400, color: GOLD }}>110+ missions.</span>
        </div>
        {/* Animated line */}
        <div style={{ height: 1, background: GOLD, opacity: 0.3, marginTop: 48, width: `${lineProgress * 100}%`, transformOrigin: 'left' }} />
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }}>
        {STATS.map(({ value, suffix, label }, i) => {
          const delay = 40 + i * 12
          const appear = spring({ frame: frame - delay, fps, config: { damping: 20 } })
          const count = useCountUp(value, frame, fps, delay, 2)

          return (
            <div
              key={label}
              style={{
                padding: '48px 40px',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                opacity: appear,
                transform: `translateY(${24 * (1 - appear)}px)`,
              }}
            >
              <div style={{
                fontFamily: "'Bodoni Moda', serif",
                fontSize: 88,
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: '-0.02em',
                color: GOLD,
                marginBottom: 16,
              }}>
                {count}{suffix}
              </div>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(235,232,225,0.3)',
                lineHeight: 1.5,
              }}>
                {label}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute',
        bottom: 60,
        left: 120,
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
        letterSpacing: '0.2em',
        color: 'rgba(192,154,47,0.35)',
        opacity: interpolate(frame, [fps * 3, fps * 4], [0, 1], { extrapolateRight: 'clamp' }),
      }}>
        ESSOR-CONSULTING.MA · CASABLANCA, MAROC
      </div>
    </AbsoluteFill>
  )
}
