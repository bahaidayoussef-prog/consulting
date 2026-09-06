import { useState } from 'react'
import { estimateRouteCost, type DeliveryRoute, type FleetVehicle } from '../../../data/demoTmsData'

export default function CoutsModule({ routes, fleet, track }: { routes: DeliveryRoute[]; fleet: FleetVehicle[]; track: (id: string) => void }) {
  const [fuelPrice, setFuelPrice] = useState(14.5)

  const estimates = routes.map((route) => {
    const vehicle = fleet.find((v) => v.routeId === route.id)
    return { route, vehicle, cost: estimateRouteCost(route, vehicle?.vehicule, fuelPrice) }
  })

  const totalCost = estimates.reduce((s, e) => s + e.cost.coutTotal, 0)
  const totalDeliveries = routes.reduce((s, r) => s + r.stops.length, 0)

  return (
    <div>
      <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--navy)', margin: '0 0 2rem' }}>
        Coûts de transport.
      </h2>

      <div style={{ background: 'var(--dark-2)', border: '1px solid rgba(27,53,84,0.08)', padding: '1.5rem 1.75rem', marginBottom: '2rem', maxWidth: 420 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
          <label style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(27,53,84,0.6)' }}>
            Prix du carburant
          </label>
          <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: 'var(--blue-bright)' }}>{fuelPrice.toFixed(1)} MAD/L</span>
        </div>
        <input
          type="range"
          min={10}
          max={20}
          step={0.5}
          value={fuelPrice}
          onChange={(e) => {
            track('fuel-slider')
            setFuelPrice(Number(e.target.value))
          }}
          className="demo-slider"
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        <SummaryCard label="Coût total du jour" value={`${totalCost.toLocaleString('fr-FR')} MAD`} />
        <SummaryCard label="Livraisons planifiées" value={String(totalDeliveries)} />
        <SummaryCard label="Coût moyen / livraison" value={`${Math.round(totalCost / Math.max(1, totalDeliveries))} MAD`} />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--navy)' }}>
              <th style={thStyle}>Tournée</th>
              <th style={thStyle}>Véhicule assigné</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Distance</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Durée est.</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Carburant</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Chauffeur</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {estimates.map(({ route, vehicle, cost }) => (
              <tr key={route.id} style={{ borderBottom: '1px solid rgba(27,53,84,0.08)' }}>
                <td style={tdStyle}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: route.color }} />
                    {route.name}
                  </span>
                </td>
                <td style={{ ...tdStyle, color: 'var(--dark-muted)' }}>{vehicle?.vehicule ?? 'Non assigné'}</td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>{cost.distanceKm} km</td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>{cost.dureeH} h</td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>{cost.coutCarburant.toLocaleString('fr-FR')} MAD</td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>{cost.coutChauffeur.toLocaleString('fr-FR')} MAD</td>
                <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 700, color: 'var(--navy)' }}>{cost.coutTotal.toLocaleString('fr-FR')} MAD</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: '0.75rem', color: 'var(--dark-muted)', marginTop: '1rem', lineHeight: 1.6 }}>
        Estimation simplifiée : distance réelle dépôt→arrêts, consommation moyenne par type de véhicule, taux horaire chauffeur fixe. À affiner avec vos données réelles en version Pro.
      </p>
    </div>
  )
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: '#fff', border: '1px solid rgba(27,53,84,0.1)', padding: '1.25rem 1.5rem', flex: '1 1 180px' }}>
      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(27,53,84,0.5)', marginBottom: '0.5rem' }}>{label}</div>
      <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: 'var(--navy)' }}>{value}</div>
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
