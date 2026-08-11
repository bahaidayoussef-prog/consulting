import { DEPOT, routeDistanceKm, type DeliveryRoute, type PendingOrder } from '../../../data/demoTmsData'

function routePath(route: DeliveryRoute) {
  const points = [DEPOT, ...route.stops]
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
}

export default function PlanificationModule({
  routes,
  pending,
  selectedRoute,
  onSelectRoute,
  onOptimize,
  onAssign,
  optimizedGains,
  track,
}: {
  routes: DeliveryRoute[]
  pending: PendingOrder[]
  selectedRoute: string | null
  onSelectRoute: (id: string | null) => void
  onOptimize: (routeId: string) => void
  onAssign: (orderId: string, routeId: string) => void
  optimizedGains: Record<string, number>
  track: (id: string) => void
}) {
  const roadLines: { x1: number; y1: number; x2: number; y2: number }[] = []
  for (let x = 60; x <= 740; x += 85) roadLines.push({ x1: x, y1: 30, x2: x, y2: 470 })
  for (let y = 40; y <= 460; y += 70) roadLines.push({ x1: 30, y1: y, x2: 770, y2: y })

  const activeRoute = routes.find((r) => r.id === selectedRoute) ?? null

  return (
    <div>
      <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--navy)', margin: '0 0 2rem' }}>
        Planification de tournées.
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2.5rem', marginBottom: '3rem' }} className="tms-map-layout">
        <div style={{ background: '#fff', border: '1px solid rgba(27,53,84,0.1)', padding: '1.5rem' }}>
          <svg viewBox="0 0 800 500" style={{ width: '100%', height: 'auto', display: 'block' }}>
            {roadLines.map((l, i) => (
              <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="rgba(27,53,84,0.06)" strokeWidth={1} />
            ))}

            {routes.map((route) => {
              const dimmed = selectedRoute && selectedRoute !== route.id
              return (
                <g key={route.id} opacity={dimmed ? 0.15 : 1} style={{ transition: 'opacity 0.3s' }}>
                  <path d={routePath(route)} fill="none" stroke={route.color} strokeWidth={selectedRoute === route.id ? 3.5 : 2.5} strokeDasharray="6 5" strokeLinecap="round" />
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

            {pending.map((p) => (
              <g key={p.id} opacity={selectedRoute ? 0.35 : 1}>
                <circle cx={p.x} cy={p.y} r={7} fill="#fff" stroke="rgba(27,53,84,0.4)" strokeWidth={2} strokeDasharray="2 2" />
              </g>
            ))}

            <circle cx={DEPOT.x} cy={DEPOT.y} r={13} fill="var(--navy)" />
            <text x={DEPOT.x} y={DEPOT.y + 4} fontSize={10} textAnchor="middle" fontFamily="DM Mono, monospace" fill="#fff">D</text>
          </svg>
        </div>

        <div>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(27,53,84,0.5)', marginBottom: '1rem' }}>
            Tournées actives
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
            {routes.map((route) => {
              const active = selectedRoute === route.id
              const gain = optimizedGains[route.id]
              return (
                <button
                  key={route.id}
                  onClick={() => {
                    track(`route-${route.id}`)
                    onSelectRoute(active ? null : route.id)
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                    textAlign: 'left',
                    background: active ? 'rgba(47,111,181,0.08)' : '#fff',
                    border: `1px solid ${active ? 'var(--blue-bright)' : 'rgba(27,53,84,0.1)'}`,
                    padding: '0.85rem 1rem',
                    cursor: 'none',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: route.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.82rem', color: 'var(--navy)', fontWeight: active ? 600 : 400 }}>{route.name}</span>
                  </span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--dark-muted)', paddingLeft: '1.6rem' }}>
                    {routeDistanceKm(route.stops)} km {gain !== undefined ? `· optimisée (−${gain}%)` : ''}
                  </span>
                </button>
              )
            })}
          </div>

          {activeRoute && (
            <button
              onClick={() => onOptimize(activeRoute.id)}
              disabled={optimizedGains[activeRoute.id] !== undefined}
              className="btn-primary"
              style={{ padding: '0.7rem 1.2rem', fontSize: '0.72rem', width: '100%', opacity: optimizedGains[activeRoute.id] !== undefined ? 0.4 : 1 }}
            >
              {optimizedGains[activeRoute.id] !== undefined ? 'Déjà optimisée' : 'Optimiser cette tournée →'}
            </button>
          )}

          {selectedRoute && (
            <button
              onClick={() => onSelectRoute(null)}
              style={{ marginTop: '0.75rem', background: 'none', border: 'none', color: 'var(--blue-bright)', fontSize: '0.75rem', cursor: 'none', padding: 0 }}
            >
              × Réinitialiser
            </button>
          )}
        </div>
      </div>

      {pending.length > 0 && (
        <div>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(27,53,84,0.5)', marginBottom: '1rem' }}>
            Commandes à planifier ({pending.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {pending.map((order) => (
              <div key={order.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', border: '1px solid rgba(27,53,84,0.1)', padding: '0.85rem 1.1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--navy)' }}>{order.label} <span style={{ color: 'var(--dark-muted)', fontFamily: 'DM Mono, monospace', fontSize: '0.7rem' }}>({order.id})</span></span>
                <select
                  defaultValue=""
                  onChange={(e) => {
                    if (e.target.value) {
                      track('assign-order')
                      onAssign(order.id, e.target.value)
                    }
                  }}
                  style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', padding: '0.5rem 0.75rem', border: '1px solid rgba(27,53,84,0.2)', background: '#fff', color: 'var(--navy)' }}
                >
                  <option value="" disabled>Assigner à une tournée…</option>
                  {routes.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
