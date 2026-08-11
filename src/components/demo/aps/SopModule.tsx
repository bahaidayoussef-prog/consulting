import { useState } from 'react'
import { motion } from 'framer-motion'
import type { WeekPoint } from '../../../data/demoApsData'

const CHART_HEIGHT = 220

export default function SopModule({ forecastAdjusted, track }: { forecastAdjusted: WeekPoint[]; track: (id: string) => void }) {
  const defaultCapacite = Math.round((forecastAdjusted.reduce((s, f) => s + f.value, 0) / Math.max(1, forecastAdjusted.length)) / 50) * 50 || 1300
  const [capacite, setCapacite] = useState(defaultCapacite)

  const maxVal = Math.max(capacite, ...forecastAdjusted.map((f) => f.value)) * 1.15
  const weeksAtRisk = forecastAdjusted.filter((f) => f.value > capacite).length
  const weeksSurcapacite = forecastAdjusted.filter((f) => f.value < capacite * 0.75).length

  return (
    <div>
      <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--navy)', margin: '0 0 1rem' }}>
        Vue S&OP simplifiée.
      </h2>
      <p style={{ fontSize: '0.85rem', color: 'var(--dark-muted)', marginBottom: '2rem', maxWidth: 640, lineHeight: 1.7 }}>
        Rapprochement demande prévue / capacité de production disponible, semaine par semaine.
      </p>

      <div style={{ background: 'var(--dark-2)', border: '1px solid rgba(27,53,84,0.08)', padding: '1.5rem 1.75rem', marginBottom: '2rem', maxWidth: 420 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
          <label style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(27,53,84,0.6)' }}>
            Capacité de production / semaine
          </label>
          <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: 'var(--blue-bright)' }}>{capacite.toLocaleString('fr-FR')}</span>
        </div>
        <input
          type="range"
          min={600}
          max={2000}
          step={50}
          value={capacite}
          onChange={(e) => { track('capacite-slider'); setCapacite(Number(e.target.value)) }}
          className="demo-slider"
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        <SummaryCard label="Semaines en risque de rupture" value={String(weeksAtRisk)} color={weeksAtRisk > 0 ? 'rgb(190,60,50)' : 'var(--sage)'} />
        <SummaryCard label="Semaines en sous-capacité" value={String(weeksSurcapacite)} color="var(--navy)" />
      </div>

      <div style={{ background: '#fff', border: '1px solid rgba(27,53,84,0.1)', padding: '2rem' }}>
        <div style={{ position: 'relative', height: CHART_HEIGHT, marginBottom: '0.5rem' }}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: `${(capacite / maxVal) * 100}%`,
              borderTop: '2px dashed var(--navy)',
            }}
          />
          <div style={{ display: 'flex', height: '100%', alignItems: 'flex-end', gap: '0.75rem' }}>
            {forecastAdjusted.map((f) => {
              const atRisk = f.value > capacite
              return (
                <div key={f.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(f.value / maxVal) * 100}%` }}
                    transition={{ duration: 0.35 }}
                    style={{ width: '100%', background: atRisk ? 'rgb(190,60,50)' : 'var(--blue-bright)', minHeight: 2 }}
                    title={`${f.label} — demande ${f.value}`}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {forecastAdjusted.map((f) => (
            <div key={f.label} style={{ flex: 1, textAlign: 'center', fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', color: 'rgba(27,53,84,0.5)' }}>
              {f.label}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem' }}>
          <LegendDot color="var(--blue-bright)" label="Demande prévue ≤ capacité" />
          <LegendDot color="rgb(190,60,50)" label="Demande prévue > capacité" />
          <LegendDot color="var(--navy)" label="Capacité disponible" line />
        </div>
      </div>
    </div>
  )
}

function SummaryCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ background: '#fff', border: '1px solid rgba(27,53,84,0.1)', padding: '1.25rem 1.5rem', flex: '1 1 200px' }}>
      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(27,53,84,0.5)', marginBottom: '0.5rem' }}>{label}</div>
      <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.6rem', color }}>{value}</div>
    </div>
  )
}

function LegendDot({ color, label, line }: { color: string; label: string; line?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--dark-muted)' }}>
      {line ? <span style={{ width: 14, height: 0, borderTop: `2px dashed ${color}`, display: 'inline-block' }} /> : <span style={{ width: 12, height: 12, background: color, display: 'inline-block' }} />}
      {label}
    </div>
  )
}
