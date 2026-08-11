import { motion } from 'framer-motion'
import { ROUTES, type FleetVehicle, type FleetStatus } from '../../../data/demoTmsData'

const STATUS_COLOR: Record<FleetStatus, string> = {
  'En livraison': 'var(--blue-bright)',
  'En chargement': 'rgba(27,53,84,0.55)',
  'Retour dépôt': 'var(--mid)',
  Disponible: 'var(--sage)',
}

const STATUS_FILTERS: Array<FleetStatus | 'Tous'> = ['Tous', 'En livraison', 'En chargement', 'Retour dépôt', 'Disponible']

export default function FlotteModule({
  fleet,
  selectedRoute,
  statusFilter,
  onStatusFilter,
  track,
}: {
  fleet: FleetVehicle[]
  selectedRoute: string | null
  statusFilter: FleetStatus | 'Tous'
  onStatusFilter: (s: FleetStatus | 'Tous') => void
  track: (id: string) => void
}) {
  const filteredFleet = fleet.filter((v) => {
    if (selectedRoute && v.routeId !== selectedRoute) return false
    if (statusFilter !== 'Tous' && v.statut !== statusFilter) return false
    return true
  })

  const routeName = selectedRoute ? ROUTES.find((r) => r.id === selectedRoute)?.name : null

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.25rem' }}>
        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--navy)', margin: 0 }}>
          Statut de la flotte.
        </h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => {
                track(`status-${s}`)
                onStatusFilter(s)
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

      {routeName && (
        <div style={{ fontSize: '0.8rem', color: 'var(--blue-bright)', marginBottom: '1.25rem' }}>
          Filtré sur la tournée « {routeName} » — géré depuis l'onglet Planification.
        </div>
      )}

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
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.04em', color: STATUS_COLOR[v.statut] }}>
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
