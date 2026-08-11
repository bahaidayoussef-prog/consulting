import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { DEPOT, ROUTES, FLEET, type FleetStatus } from '../../data/demoTmsData'
import { useDemoInteractions } from '../../hooks/useDemoInteractions'
import DemoUpsellBanner from './DemoUpsellBanner'

function routePath(routeId: string) {
  const route = ROUTES.find((r) => r.id === routeId)!
  const points = [DEPOT, ...route.stops]
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
}

const STATUS_COLOR: Record<FleetStatus, string> = {
  'En livraison': 'var(--blue-bright)',
  'En chargement': 'rgba(27,53,84,0.55)',
  'Retour dépôt': 'var(--mid)',
  Disponible: 'var(--sage)',
}

const STATUS_FILTERS: Array<FleetStatus | 'Tous'> = ['Tous', 'En livraison', 'En chargement', 'Retour dépôt', 'Disponible']

export default function DemoTms() {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<FleetStatus | 'Tous'>('Tous')
  const { track, show, dismiss } = useDemoInteractions(3)

  const roadLines = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = []
    for (let x = 60; x <= 740; x += 85) lines.push({ x1: x, y1: 30, x2: x, y2: 470 })
    for (let y = 40; y <= 460; y += 70) lines.push({ x1: 30, y1: y, x2: 770, y2: y })
    return lines
  }, [])

  const filteredFleet = FLEET.filter((v) => {
    if (selectedRoute && v.routeId !== selectedRoute) return false
    if (statusFilter !== 'Tous' && v.statut !== statusFilter) return false
    return true
  })

  return (
    <>
      <section style={{ background: 'var(--paper)', padding: '2rem var(--sp-x) 5rem' }}>
        <div className="section-inner">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(200,140,20,0.9)',
              border: '1px solid rgba(200,140,20,0.35)',
              background: 'rgba(200,140,20,0.06)',
              padding: '0.5rem 0.9rem',
              marginBottom: '3rem',
            }}
          >
            Données fictives — démonstration à but illustratif
          </div>

          <h2
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--navy)',
              margin: '0 0 2rem',
            }}
          >
            Tournées du jour.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '2.5rem', marginBottom: '5rem' }} className="tms-map-layout">
            <div style={{ background: '#fff', border: '1px solid rgba(27,53,84,0.1)', padding: '1.5rem' }}>
              <svg viewBox="0 0 800 500" style={{ width: '100%', height: 'auto', display: 'block' }}>
                {roadLines.map((l, i) => (
                  <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="rgba(27,53,84,0.06)" strokeWidth={1} />
                ))}

                {ROUTES.map((route) => {
                  const dimmed = selectedRoute && selectedRoute !== route.id
                  return (
                    <g key={route.id} opacity={dimmed ? 0.15 : 1} style={{ transition: 'opacity 0.3s' }}>
                      <path
                        d={routePath(route.id)}
                        fill="none"
                        stroke={route.color}
                        strokeWidth={selectedRoute === route.id ? 3.5 : 2.5}
                        strokeDasharray="6 5"
                        strokeLinecap="round"
                      />
                      {route.stops.map((stop, i) => (
                        <g key={i}>
                          <circle cx={stop.x} cy={stop.y} r={9} fill="#fff" stroke={route.color} strokeWidth={2} />
                          <text x={stop.x} y={stop.y + 3.5} fontSize={9} textAnchor="middle" fontFamily="DM Mono, monospace" fill={route.color}>
                            {i + 1}
                          </text>
                        </g>
                      ))}
                    </g>
                  )
                })}

                <circle cx={DEPOT.x} cy={DEPOT.y} r={13} fill="var(--navy)" />
                <text x={DEPOT.x} y={DEPOT.y + 4} fontSize={10} textAnchor="middle" fontFamily="DM Mono, monospace" fill="#fff">
                  D
                </text>
              </svg>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(27,53,84,0.5)',
                  marginBottom: '1rem',
                }}
              >
                Tournées actives
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {ROUTES.map((route) => {
                  const active = selectedRoute === route.id
                  return (
                    <button
                      key={route.id}
                      onClick={() => {
                        track(`route-${route.id}`)
                        setSelectedRoute(active ? null : route.id)
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        textAlign: 'left',
                        background: active ? 'rgba(47,111,181,0.08)' : '#fff',
                        border: `1px solid ${active ? 'var(--blue-bright)' : 'rgba(27,53,84,0.1)'}`,
                        padding: '0.85rem 1rem',
                        cursor: 'none',
                      }}
                    >
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: route.color, flexShrink: 0 }} />
                      <span style={{ fontSize: '0.82rem', color: 'var(--navy)', fontWeight: active ? 600 : 400 }}>{route.name}</span>
                    </button>
                  )
                })}
              </div>
              {selectedRoute && (
                <button
                  onClick={() => setSelectedRoute(null)}
                  style={{ marginTop: '0.75rem', background: 'none', border: 'none', color: 'var(--blue-bright)', fontSize: '0.75rem', cursor: 'none', padding: 0 }}
                >
                  × Réinitialiser
                </button>
              )}
            </div>
          </div>

          {/* --- Statut de flotte --- */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
              <h2
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: 'var(--navy)',
                  margin: 0,
                }}
              >
                Statut de la flotte.
              </h2>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {STATUS_FILTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      track(`status-${s}`)
                      setStatusFilter(s)
                    }}
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.65rem',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '0.5rem 0.9rem',
                      background: statusFilter === s ? 'var(--navy)' : 'transparent',
                      color: statusFilter === s ? '#fff' : 'var(--navy)',
                      border: '1px solid var(--navy)',
                      cursor: 'none',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--navy)' }}>
                    <th style={thStyle}>Véhicule</th>
                    <th style={thStyle}>Chauffeur</th>
                    <th style={thStyle}>Statut</th>
                    <th style={thStyle}>Prochaine livraison</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFleet.map((v) => (
                    <motion.tr key={v.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} style={{ borderBottom: '1px solid rgba(27,53,84,0.08)' }}>
                      <td style={{ ...tdStyle, fontFamily: 'DM Mono, monospace', fontSize: '0.8rem', color: 'var(--navy)' }}>{v.vehicule}</td>
                      <td style={{ ...tdStyle, color: 'var(--dark-muted)' }}>{v.chauffeur}</td>
                      <td style={tdStyle}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            fontFamily: 'DM Mono, monospace',
                            fontSize: '0.68rem',
                            letterSpacing: '0.04em',
                            color: STATUS_COLOR[v.statut],
                          }}
                        >
                          <span style={{ width: 7, height: 7, borderRadius: '50%', background: STATUS_COLOR[v.statut] }} />
                          {v.statut}
                        </span>
                      </td>
                      <td style={{ ...tdStyle, color: 'var(--dark-muted)' }}>{v.prochaineLivraison}</td>
                    </motion.tr>
                  ))}
                  {filteredFleet.length === 0 && (
                    <tr>
                      <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--dark-muted)', fontSize: '0.85rem' }}>
                        Aucun véhicule ne correspond aux filtres sélectionnés.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <DemoUpsellBanner show={show} onDismiss={dismiss} />
    </>
  )
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '0.9rem 0.75rem',
  fontFamily: 'DM Mono, monospace',
  fontSize: '0.65rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--navy)',
  whiteSpace: 'nowrap',
}

const tdStyle: React.CSSProperties = {
  padding: '0.9rem 0.75rem',
  fontSize: '0.85rem',
}
