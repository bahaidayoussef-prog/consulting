import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion'

const DARK = '#0a1420'
const GOLD = '#c09a2f'
const GOLD_DIM = 'rgba(192,154,47,0.35)'

const NODES = [
  { id: 'europe', x: 120, y: 90, r: 6, label: 'Europe' },
  { id: 'asie', x: 1700, y: 130, r: 6, label: 'Asie' },
  { id: 'africa', x: 780, y: 820, r: 6, label: 'Afrique' },
  { id: 'tanger', x: 310, y: 200, r: 12, label: 'Tanger' },
  { id: 'rabat', x: 370, y: 370, r: 10, label: 'Rabat' },
  { id: 'casa', x: 350, y: 520, r: 22, label: 'Casablanca' },
  { id: 'fes', x: 820, y: 270, r: 14, label: 'Fès' },
  { id: 'oujda', x: 1340, y: 215, r: 10, label: 'Oujda' },
  { id: 'marrakech', x: 510, y: 670, r: 12, label: 'Marrakech' },
  { id: 'agadir', x: 240, y: 800, r: 10, label: 'Agadir' },
]

const EDGES: [string, string][] = [
  ['europe', 'tanger'], ['tanger', 'rabat'], ['rabat', 'casa'],
  ['casa', 'fes'], ['fes', 'oujda'], ['oujda', 'asie'],
  ['casa', 'marrakech'], ['marrakech', 'agadir'],
  ['tanger', 'fes'], ['casa', 'africa'], ['agadir', 'africa'],
]

function getNode(id: string) { return NODES.find(n => n.id === id)! }

export function NetworkAnimation() {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  const fadeIn = interpolate(frame, [0, fps * 1.5], [0, 1], { extrapolateRight: 'clamp' })
  const fadeOut = interpolate(frame, [durationInFrames - fps, durationInFrames], [1, 0], { extrapolateLeft: 'clamp' })
  const opacity = Math.min(fadeIn, fadeOut)

  return (
    <div style={{ width: '100%', height: '100%', background: DARK, position: 'relative', overflow: 'hidden' }}>
      {/* Grain texture */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
        opacity: 0.6,
      }} />

      {/* Network SVG */}
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity }}
      >
        {/* Base edges */}
        {EDGES.map(([aId, bId]) => {
          const a = getNode(aId); const b = getNode(bId)
          return (
            <line
              key={`base-${aId}-${bId}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={GOLD_DIM} strokeWidth="1"
            />
          )
        })}

        {/* Animated flow dots along edges */}
        {EDGES.map(([aId, bId], idx) => {
          const a = getNode(aId); const b = getNode(bId)
          const offset = (frame / 30 + idx * 1.3) % 3
          const t = (offset / 3)
          const x = a.x + (b.x - a.x) * t
          const y = a.y + (b.y - a.y) * t
          return (
            <circle key={`dot-${aId}-${bId}`} cx={x} cy={y} r={3} fill={GOLD} opacity={0.9} />
          )
        })}

        {/* Nodes */}
        {NODES.map((node, i) => {
          const appear = spring({ frame: frame - i * 4, fps, config: { damping: 14 } })
          const pulse = Math.sin(frame / fps * 2 + i) * 0.3 + 0.7
          return (
            <g key={node.id}>
              {/* Pulse ring */}
              <circle
                cx={node.x} cy={node.y}
                r={node.r * (1 + (1 - pulse) * 2.5)}
                fill="none" stroke={GOLD}
                strokeWidth="0.8"
                opacity={(pulse - 0.4) * 0.4 * appear}
              />
              {/* Core */}
              <circle
                cx={node.x} cy={node.y}
                r={node.r * appear}
                fill={GOLD} opacity={0.9 * appear}
              />
              {/* Label for major nodes */}
              {node.r > 10 && (
                <text
                  x={node.x + node.r + 8}
                  y={node.y + 4}
                  fontFamily="'DM Mono', monospace"
                  fontSize={node.id === 'casa' ? 16 : 11}
                  fill={GOLD}
                  opacity={0.6 * appear}
                  letterSpacing="2"
                >
                  {node.label.toUpperCase()}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {/* Gradient overlay — top and bottom */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: `linear-gradient(to bottom, ${DARK} 0%, transparent 20%, transparent 80%, ${DARK} 100%)`,
      }} />

      {/* Brand text */}
      <div style={{
        position: 'absolute', bottom: 80, left: 100, zIndex: 3,
        fontFamily: "'Bodoni Moda', serif",
        fontSize: 14,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: `rgba(192,154,47,${opacity * 0.5})`,
      }}>
        ESSOR CONSULTING · SUPPLY CHAIN · CASABLANCA
      </div>
    </div>
  )
}
