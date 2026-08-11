import { useState } from 'react'
import { motion } from 'framer-motion'
import { READY_ORDERS, type ReadyOrder } from '../../../data/demoWmsData'

export default function ExpeditionModule({ track }: { track: (id: string) => void }) {
  const [selected, setSelected] = useState<ReadyOrder | null>(null)
  const [bordereau, setBordereau] = useState<{ order: ReadyOrder; tracking: string; date: string } | null>(null)

  function generate() {
    if (!selected) return
    track('expedition')
    setBordereau({
      order: selected,
      tracking: `EXP-${selected.id.replace('CMD-', '')}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    })
  }

  return (
    <div>
      <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--navy)', margin: '0 0 2rem' }}>
        Expédition & regroupement.
      </h2>

      <div style={{ overflowX: 'auto', marginBottom: '2.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--navy)' }}>
              <th style={thStyle}></th>
              <th style={thStyle}>Commande</th>
              <th style={thStyle}>Client</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Colis</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Poids</th>
              <th style={thStyle}>Transporteur</th>
            </tr>
          </thead>
          <tbody>
            {READY_ORDERS.map((order) => (
              <tr
                key={order.id}
                onClick={() => setSelected(order)}
                style={{ borderBottom: '1px solid rgba(27,53,84,0.08)', cursor: 'none', background: selected?.id === order.id ? 'rgba(47,111,181,0.06)' : 'transparent' }}
              >
                <td style={tdStyle}>
                  <input type="radio" checked={selected?.id === order.id} onChange={() => setSelected(order)} style={{ cursor: 'none' }} />
                </td>
                <td style={{ ...tdStyle, fontFamily: 'DM Mono, monospace', color: 'var(--navy)' }}>{order.id}</td>
                <td style={{ ...tdStyle, color: 'var(--dark-muted)' }}>{order.client}</td>
                <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 600, color: 'var(--navy)' }}>{order.nbColis}</td>
                <td style={{ ...tdStyle, textAlign: 'right', color: 'var(--dark-muted)' }}>{order.poidsKg} kg</td>
                <td style={{ ...tdStyle, color: 'var(--dark-muted)' }}>{order.transporteur}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={generate}
        disabled={!selected}
        className="btn-primary"
        style={{ padding: '0.9rem 2rem', fontSize: '0.8rem', opacity: selected ? 1 : 0.4, marginBottom: '2.5rem' }}
      >
        Générer le bordereau d'expédition →
      </button>

      {bordereau && (
        <motion.div
          key={bordereau.tracking}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ background: 'var(--dark-2)', border: '1px solid rgba(27,53,84,0.1)', padding: '2rem', maxWidth: 480 }}
        >
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(27,53,84,0.5)', marginBottom: '0.5rem' }}>
            Bordereau d'expédition
          </div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '1.25rem' }}>{bordereau.tracking}</div>
          <BordereauRow label="Commande" value={bordereau.order.id} />
          <BordereauRow label="Client" value={bordereau.order.client} />
          <BordereauRow label="Colis" value={String(bordereau.order.nbColis)} />
          <BordereauRow label="Poids total" value={`${bordereau.order.poidsKg} kg`} />
          <BordereauRow label="Transporteur" value={bordereau.order.transporteur} />
          <BordereauRow label="Date" value={bordereau.date} />
        </motion.div>
      )}
    </div>
  )
}

function BordereauRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.55rem 0', borderBottom: '1px solid rgba(27,53,84,0.08)', fontSize: '0.85rem' }}>
      <span style={{ color: 'var(--dark-muted)' }}>{label}</span>
      <span style={{ color: 'var(--navy)', fontWeight: 600 }}>{value}</span>
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
