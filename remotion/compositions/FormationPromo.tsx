import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill, Sequence } from 'remotion'

const DARK = '#0a1420'
const GOLD = '#c09a2f'
const INK = '#0f1a25'

function easeOut(x: number) { return 1 - Math.pow(1 - x, 3) }

function SlideIn({ children, delay = 0, from = 40 }: { children: React.ReactNode; delay?: number; from?: number }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const progress = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 80 } })
  return (
    <div style={{ opacity: progress, transform: `translateY(${from * (1 - progress)}px)` }}>
      {children}
    </div>
  )
}

function WordReveal({ text, startFrame = 0 }: { text: string; startFrame?: number }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const words = text.split(' ')
  return (
    <span>
      {words.map((word, i) => {
        const progress = spring({ frame: frame - startFrame - i * 3, fps, config: { damping: 20 } })
        return (
          <span key={i} style={{ display: 'inline-block', marginRight: '0.25em', opacity: progress, transform: `translateY(${20 * (1 - progress)}px)` }}>
            {word}
          </span>
        )
      })}
    </span>
  )
}

/* ── Scene 1 — Hook (0–5s) ── */
function SceneHook() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const progress = interpolate(frame, [0, fps * 1.5], [0, 1], { extrapolateRight: 'clamp', easing: easeOut })

  return (
    <AbsoluteFill style={{ background: DARK, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 100px' }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, letterSpacing: '0.25em', color: GOLD, marginBottom: 32, opacity: progress }}>
        ESSOR CONSULTING · CASABLANCA
      </div>
      <div style={{ fontFamily: "'Bodoni Moda', serif", fontSize: 96, fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.03em', color: 'rgba(235,232,225,0.95)' }}>
        <WordReveal text="Votre Supply" startFrame={10} />
        <br />
        <span style={{ fontStyle: 'italic', fontWeight: 400, color: GOLD }}>
          <WordReveal text="Chain mérite mieux." startFrame={22} />
        </span>
      </div>
    </AbsoluteFill>
  )
}

/* ── Scene 2 — Problème (5–10s) ── */
function SceneProblem() {
  return (
    <AbsoluteFill style={{ background: INK, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 100px' }}>
      <SlideIn delay={5}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: '0.22em', color: GOLD, marginBottom: 32 }}>
          LE PROBLÈME
        </div>
      </SlideIn>
      <SlideIn delay={15}>
        <div style={{ fontFamily: "'Bodoni Moda', serif", fontSize: 72, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em', color: 'rgba(235,232,225,0.9)', marginBottom: 40 }}>
          Vos équipes logistiques<br />manquent de structure.
        </div>
      </SlideIn>
      <SlideIn delay={25}>
        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 24, color: 'rgba(235,232,225,0.45)', lineHeight: 1.7, fontWeight: 300, maxWidth: 700 }}>
          Rotation, réactivité faible, KPIs absents.<br />
          Sans formation terrain, les coûts s'accumulent silencieusement.
        </div>
      </SlideIn>
    </AbsoluteFill>
  )
}

/* ── Scene 3 — Solution (10–18s) ── */
function SceneSolution() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const features = [
    '✦  Gestion des stocks & flux',
    '✦  KPIs et tableaux de bord',
    '✦  Management terrain',
    '✦  Outils WMS/TMS pratiques',
  ]
  return (
    <AbsoluteFill style={{ background: DARK, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 100px' }}>
      <SlideIn delay={5}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: '0.22em', color: GOLD, marginBottom: 32 }}>
          LA FORMATION
        </div>
      </SlideIn>
      <SlideIn delay={12}>
        <div style={{ fontFamily: "'Bodoni Moda', serif", fontSize: 80, fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.02em', color: 'rgba(235,232,225,0.95)', marginBottom: 48 }}>
          Devenir<br />
          <span style={{ fontStyle: 'italic', fontWeight: 400, color: GOLD }}>Responsable Logistique.</span>
        </div>
      </SlideIn>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {features.map((f, i) => {
          const progress = spring({ frame: frame - 20 - i * 6, fps, config: { damping: 16 } })
          return (
            <div key={f} style={{ fontFamily: "'Jost', sans-serif", fontSize: 22, color: 'rgba(235,232,225,0.75)', opacity: progress, transform: `translateX(${-30 * (1 - progress)}px)` }}>
              {f}
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

/* ── Scene 4 — Détails (18–24s) ── */
function SceneDetails() {
  const details = [
    { label: 'DURÉE', value: '1 journée' },
    { label: 'LIEU', value: 'Hôtel 5★ · Casablanca' },
    { label: 'TARIF', value: '1 500 MAD' },
    { label: 'FORMAT', value: 'Terrain · Pratique' },
  ]
  return (
    <AbsoluteFill style={{ background: INK, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 100px' }}>
      <SlideIn delay={5}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: '0.22em', color: GOLD, marginBottom: 48 }}>
          PROGRAMME · ESSOR CONSULTING
        </div>
      </SlideIn>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
        {details.map(({ label, value }, i) => (
          <SlideIn key={label} delay={10 + i * 8}>
            <div style={{ background: 'rgba(192,154,47,0.06)', padding: '40px 48px', borderLeft: `2px solid ${GOLD}` }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.22em', color: GOLD, marginBottom: 12 }}>{label}</div>
              <div style={{ fontFamily: "'Bodoni Moda', serif", fontSize: 42, fontWeight: 700, color: 'rgba(235,232,225,0.9)', lineHeight: 1 }}>{value}</div>
            </div>
          </SlideIn>
        ))}
      </div>
    </AbsoluteFill>
  )
}

/* ── Scene 5 — CTA (24–30s) ── */
function SceneCTA() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const pulse = Math.sin(frame / fps * 3) * 0.08 + 1

  return (
    <AbsoluteFill style={{ background: DARK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 80px' }}>
      <SlideIn delay={5}>
        <div style={{ fontFamily: "'Bodoni Moda', serif", fontSize: 90, fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.03em', color: 'rgba(235,232,225,0.95)', marginBottom: 48 }}>
          Réservez<br />
          <span style={{ fontStyle: 'italic', fontWeight: 400, color: GOLD }}>votre place.</span>
        </div>
      </SlideIn>
      <SlideIn delay={20}>
        <div style={{
          display: 'inline-block',
          background: GOLD,
          color: DARK,
          fontFamily: "'DM Mono', monospace",
          fontSize: 18,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          padding: '24px 56px',
          transform: `scale(${pulse})`,
          marginBottom: 40,
        }}>
          wa.me/212663449200
        </div>
      </SlideIn>
      <SlideIn delay={28}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, letterSpacing: '0.18em', color: 'rgba(192,154,47,0.5)' }}>
          ESSOR CONSULTING · ESSOR-CONSULTING.MA
        </div>
      </SlideIn>
    </AbsoluteFill>
  )
}

export function FormationPromo() {
  const { fps } = useVideoConfig()
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={fps * 5}><SceneHook /></Sequence>
      <Sequence from={fps * 5} durationInFrames={fps * 5}><SceneProblem /></Sequence>
      <Sequence from={fps * 10} durationInFrames={fps * 8}><SceneSolution /></Sequence>
      <Sequence from={fps * 18} durationInFrames={fps * 6}><SceneDetails /></Sequence>
      <Sequence from={fps * 24} durationInFrames={fps * 6}><SceneCTA /></Sequence>
    </AbsoluteFill>
  )
}
