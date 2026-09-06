import { motion } from 'framer-motion'
import { SCENARIOS, type WeekPoint, type Scenario } from '../../../data/demoApsData'

const CHART_W = 900
const CHART_H = 380
const MARGIN = { top: 24, right: 16, bottom: 34, left: 52 }
const INNER_W = CHART_W - MARGIN.left - MARGIN.right
const INNER_H = CHART_H - MARGIN.top - MARGIN.bottom

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

export default function PrevisionModule({
  history,
  forecastAdjusted,
  demandVariation,
  supplierDelay,
  scenario,
  onScenario,
  onDemandChange,
  onDelayChange,
  track,
}: {
  history: WeekPoint[]
  forecastAdjusted: WeekPoint[]
  demandVariation: number
  supplierDelay: number
  scenario: Scenario
  onScenario: (s: Scenario) => void
  onDemandChange: (v: number) => void
  onDelayChange: (v: number) => void
  track: (id: string) => void
}) {
  const historyCount = history.length
  const totalCount = historyCount + forecastAdjusted.length

  const bandWidth = clamp(0.04 + Math.abs(demandVariation) / 100 * 0.18 + Math.max(0, supplierDelay - 14) / 45 * 0.16, 0.04, 0.42)
  const upper = forecastAdjusted.map((f) => f.value * (1 + bandWidth))
  const lower = forecastAdjusted.map((f) => f.value * (1 - bandWidth))

  const allPoints = [...history.map((h) => h.value), ...forecastAdjusted.map((f) => f.value), ...upper]
  const maxVal = Math.max(1, ...allPoints) * 1.1

  const xAt = (i: number) => MARGIN.left + (i / Math.max(1, totalCount - 1)) * INNER_W
  const yAt = (v: number) => MARGIN.top + INNER_H - (v / maxVal) * INNER_H

  const lastHistory = history[historyCount - 1]
  const historyPath = history.map((h, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i)} ${yAt(h.value)}`).join(' ')
  const forecastPath = lastHistory
    ? forecastAdjusted
        .map((f, i) => `${i === 0 ? `M ${xAt(historyCount - 1)} ${yAt(lastHistory.value)} L` : 'L'} ${xAt(historyCount + i)} ${yAt(f.value)}`)
        .join(' ')
    : ''

  const bandPath = lastHistory
    ? `M ${xAt(historyCount - 1)} ${yAt(lastHistory.value)} ` +
      upper.map((v, i) => `L ${xAt(historyCount + i)} ${yAt(v)}`).join(' ') +
      ` L ${xAt(totalCount - 1)} ${yAt(lower[lower.length - 1])} ` +
      [...lower].reverse().map((v, i) => `L ${xAt(totalCount - 1 - i)} ${yAt(v)}`).join(' ') +
      ' Z'
    : ''

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(maxVal * t))

  const serviceLevel = clamp(98 - Math.max(0, demandVariation) * 0.35 - Math.max(0, supplierDelay - 14) * 0.25, 62, 99)
  const safetyStockDays = clamp(7 + Math.abs(demandVariation) * 0.35 + Math.max(0, supplierDelay - 14) * 0.45, 5, 60)
  const rupture = serviceLevel >= 95 ? 'Faible' : serviceLevel >= 85 ? 'Modéré' : 'Élevé'
  const ruptureColor = rupture === 'Faible' ? 'var(--sage)' : rupture === 'Modéré' ? 'rgb(200,140,20)' : 'rgb(190,60,50)'

  return (
    <div>
      <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--navy)', margin: '0 0 2rem' }}>
        Prévision de la demande.
      </h2>

      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => { track('scenario'); onScenario(s) }}
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.68rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '0.65rem 1.1rem',
              background: scenario.id === s.id ? 'var(--navy)' : '#fff',
              color: scenario.id === s.id ? '#fff' : 'var(--navy)',
              border: '1px solid var(--navy)',
              cursor: 'none',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2.5rem' }} className="aps-layout">
        <div style={{ background: '#fff', border: '1px solid rgba(27,53,84,0.1)', padding: '1.5rem' }}>
          <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
            {yTicks.map((t, i) => (
              <g key={i}>
                <line x1={MARGIN.left} y1={yAt(t)} x2={CHART_W - MARGIN.right} y2={yAt(t)} stroke="rgba(27,53,84,0.07)" strokeWidth={1} />
                <text x={MARGIN.left - 10} y={yAt(t) + 4} fontSize={10} textAnchor="end" fontFamily="DM Mono, monospace" fill="rgba(27,53,84,0.45)">{t}</text>
              </g>
            ))}

            {[...history, ...forecastAdjusted].map((p, i) => (
              <text key={i} x={xAt(i)} y={CHART_H - MARGIN.bottom + 18} fontSize={9.5} textAnchor="middle" fontFamily="DM Mono, monospace" fill="rgba(27,53,84,0.45)">
                {p.label}
              </text>
            ))}

            {lastHistory && (
              <line x1={xAt(historyCount - 1)} y1={MARGIN.top} x2={xAt(historyCount - 1)} y2={CHART_H - MARGIN.bottom} stroke="rgba(27,53,84,0.15)" strokeDasharray="3 3" />
            )}

            {bandPath && <path d={bandPath} fill="rgba(47,111,181,0.12)" stroke="none" />}
            <path d={historyPath} fill="none" stroke="var(--navy)" strokeWidth={2.5} />
            {forecastPath && <path d={forecastPath} fill="none" stroke="var(--blue-bright)" strokeWidth={2.5} strokeDasharray="7 5" />}

            {history.map((h, i) => (
              <circle key={`h${i}`} cx={xAt(i)} cy={yAt(h.value)} r={3} fill="var(--navy)" />
            ))}
            {forecastAdjusted.map((f, i) => (
              <circle key={`f${i}`} cx={xAt(historyCount + i)} cy={yAt(f.value)} r={3} fill="var(--blue-bright)" />
            ))}
          </svg>

          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <LegendDot color="var(--navy)" label="Historique réel" />
            <LegendDot color="var(--blue-bright)" label="Prévision" dashed />
            <LegendDot color="rgba(47,111,181,0.35)" label="Intervalle de confiance" square />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ background: 'var(--dark-2)', border: '1px solid rgba(27,53,84,0.08)', padding: '1.75rem' }}>
            <SliderField label="Variation de la demande" value={demandVariation} displayValue={`${demandVariation > 0 ? '+' : ''}${demandVariation}%`} min={-30} max={30} step={5} onChange={(v) => { track('slider-demande'); onDemandChange(v) }} />
            <div style={{ height: '1.75rem' }} />
            <SliderField label="Délai fournisseur" value={supplierDelay} displayValue={`${supplierDelay} jours`} min={7} max={45} step={1} onChange={(v) => { track('slider-delai'); onDelayChange(v) }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <KpiCard label="Taux de service prévisionnel" value={`${serviceLevel.toFixed(1)}%`} color="var(--navy)" />
            <KpiCard label="Stock de sécurité recommandé" value={`${Math.round(safetyStockDays)} jours`} color="var(--navy)" />
            <KpiCard label="Risque de rupture" value={rupture} color={ruptureColor} />
          </div>
        </div>
      </div>
    </div>
  )
}

function LegendDot({ color, label, dashed, square }: { color: string; label: string; dashed?: boolean; square?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--dark-muted)' }}>
      {square ? (
        <span style={{ width: 14, height: 14, background: color, display: 'inline-block' }} />
      ) : (
        <svg width={20} height={8}>
          <line x1={0} y1={4} x2={20} y2={4} stroke={color} strokeWidth={2.5} strokeDasharray={dashed ? '5 3' : undefined} />
        </svg>
      )}
      {label}
    </div>
  )
}

function SliderField({
  label,
  value,
  displayValue,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  displayValue: string
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
        <label style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(27,53,84,0.6)' }}>{label}</label>
        <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: 'var(--blue-bright)' }}>{displayValue}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="demo-slider" style={{ width: '100%' }} />
    </div>
  )
}

function KpiCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ background: '#fff', border: '1px solid rgba(27,53,84,0.1)', padding: '1.25rem 1.5rem' }}>
      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(27,53,84,0.5)', marginBottom: '0.5rem' }}>{label}</div>
      <motion.div key={value} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.6rem', color }}>
        {value}
      </motion.div>
    </div>
  )
}
